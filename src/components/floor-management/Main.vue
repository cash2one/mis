<template>
    <div class="floor-management">
        <title-bar title="楼层管理" class="bar">
            <h1 class="sub-name">{{ storeName }}</h1>
            <div class="button-panel">
                <el-button type="default" @click="handleBack">返回</el-button>
            </div>
        </title-bar>
        <div class="content">
            <table-container>
                <div slot="header" class="operation-panel">
                    <el-button type="primary" @click="handleAdd">添加楼层</el-button>
                </div>
                <div>
                    <el-table :data="tableData" stripe tooltip-effect="light" style="width: 100%">
                        <el-table-column prop="id" label="ID" min-width="50" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column prop="name" label="楼层名" min-width="150" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column prop="floor" label="楼层号" min-width="150" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column label="操作" min-width="150">
                            <template slot-scope="scope">
                                <el-button type="link" @click="handleDelete(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div slot="footer">
                    <el-pagination @size-change="handleSizeChange" :current-page.sync="currentPage" :page-sizes="pageSizeConfig" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="data.length" v-show="data.length">
                    </el-pagination>
                </div>
            </table-container>
        </div>
        <floor-form ref="form" :visible="dialogFormVisible" :edit="false" @submit="handleSubmit" @cancel="handleCancel">
        </floor-form>
    </div>
</template>

<script>
import { Button, Table, TableColumn, Pagination, Message, MessageBox } from 'jcloud-ele-ui';

import TitleBar from '../common/TitleBar';
import TableContainer from '../common/TableContainer';

import FloorForm from './FloorForm';

import { getFloorList, addFloor, deleteFloor } from '@/api/floor';

const pageSizeConfig = [10, 30, 50];

export default {
    name: 'floor-management',
    components: {
        'el-button': Button,
        'el-table': Table,
        'el-table-column': TableColumn,
        'el-pagination': Pagination,
        TitleBar,
        TableContainer,
        FloorForm
    },
    created () {
        this.$confirm = MessageBox.confirm;
        this.$message = Message;
        const regId = new RegExp('(?:^|&)id=([^&]*)(?:&|$)', 'i');
        const regName = new RegExp('(?:^|&)name=([^&]*)(?:&|$)', 'i');
        const searchStr = window.location.search.substr(1);
        const idResult = searchStr.match(regId);
        this.storeId = idResult && Number(idResult[1]);
        const nameResult = searchStr.match(regName);
        this.storeName = nameResult ? decodeURI(nameResult[1]) : '';
        this.queryData();
    },
    data () {
        return {
            dialogFormVisible: false,
            currentPage: 1,
            pageSize: pageSizeConfig[0],
            pageSizeConfig: pageSizeConfig,
            data: [],
            storeId: null,
            storeName: ''
        };
    },
    computed: {
        tableData () {
            const pageSize = this.pageSize;
            const currentPage = this.currentPage;
            const l = (currentPage - 1) * pageSize;
            const r = l + pageSize;
            return this.data.slice(l, r);
        }
    },
    methods: {
        queryData () {
            if (this.storeId !== null) {
                getFloorList([this.storeId]).then(dataObj => {
                    this.data = dataObj.message.list;
                }).catch(err => {
                    this.$message({
                        type: 'error',
                        message: '获取数据失败: ' + err.message
                    });
                });
            } else {
                this.$message({
                    type: 'error',
                    message: '获取数据失败: 请求参数不完整'
                });
            }
        },
        handleAdd () {
            this.$refs.form.$emit('init');
            this.dialogFormVisible = true;
        },
        handleDelete (row) {
            // console.log(row);
            this.$confirm('确认删除此楼层？', '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                deleteFloor([row.id]).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.queryData();
                }).catch(err => {
                    this.$message({
                        type: 'error',
                        message: '操作失败: ' + err.message
                    });
                });
            });
        },
        handleSubmit (data) {
            // console.log(data);
            // this.dialogFormEdit = true;
            data.mallId = this.storeId;
            data.floor = Number(data.floor);
            addFloor([], data).then(() => {
                this.$message({
                    type: 'success',
                    message: '新增成功!'
                });
                this.dialogFormVisible = false;
                this.queryData();
            }).catch(err => {
                this.$message({
                    type: 'error',
                    message: '操作失败: ' + err.message
                });
            });
        },
        handleCancel () {
            this.dialogFormVisible = false;
        },
        handleBack () {
            history.go(-1);
        },
        handleSizeChange (pageSize) {
            this.currentPage = 1;
            this.pageSize = pageSize;
        }
    }
};
</script>
<style>
.floor-management {
    min-width: 1130px;
}

.floor-management .bar h1 {
    float: left;
    padding-right: 10px;
}

.floor-management .bar .button-panel {
    float: right;
}

.floor-management .bar .sub-name {
    padding-left: 10px;
    position: relative;
}

.floor-management .bar .sub-name::before {
    content: '';
    display: block;
    position: absolute;
    width: 1px;
    background-color: #fff;
    left: 0;
    top: 10px;
    bottom: 10px;
    border-left: 1px solid #999;
}

.floor-management .content {
    padding: 20px;
}

.floor-management td.show-overflow .cell {
    white-space: nowrap;
    min-width: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.floor-management td.show-overflow:hover .cell {
    display: inline-block;
    overflow: visible;
    position: relative;
    z-index: 10;
    background-color: #f9f8e8;
    transition: background-color .25s ease;
}

.floor-management .operation-panel {
    padding: 10px 20px;
}

.floor-management .el-pagination {
    float: right;
    padding: 10px;
}
</style>
