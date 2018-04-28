<template>
    <div class="wifi-management">
        <title-bar title="wifi探针管理">
        </title-bar>
        <div class="content">
            <table-container>
                <div slot="header" class="operation-panel">
                    <el-button type="primary" @click="handleAdd">添加探针</el-button>
                </div>
                <div>
                    <el-table :data="tableData" stripe tooltip-effect="light" style="width: 100%">
                        <el-table-column prop="id" label="ID" min-width="50" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column prop="name" label="探针" min-width="150" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column prop="mmac" label="MAC地址" min-width="200" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column prop="lng" label="经度" min-width="100" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column prop="lat" label="纬度" min-width="100" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column prop="locationName" label="位置" min-width="200" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column prop="mark" label="备注" min-width="200" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column label="操作" min-width="150">
                            <template slot-scope="scope">
                                <el-button type="link" @click="handleEdit(scope.row)">编辑</el-button>
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
        <wifi-form ref="form" :visible="dialogFormVisible" :edit="dialogFormEdit" :positionList="positionData" @submit="handleSubmit" @cancel="handleCancel">
        </wifi-form>
    </div>
</template>

<script>
import { Button, Table, TableColumn, Pagination, Message, MessageBox } from 'jcloud-ele-ui';

import TitleBar from '../common/TitleBar';
import TableContainer from '../common/TableContainer';

import WifiForm from './WifiForm';

import { getWifiList, updateWifi, addWifi, deleteWifi } from '@/api/wifi';
import { getPositionList } from '@/api/position';

const pageSizeConfig = [10, 30, 50];

export default {
    name: 'wifi-management',
    components: {
        'el-button': Button,
        'el-table': Table,
        'el-table-column': TableColumn,
        'el-pagination': Pagination,
        TitleBar,
        TableContainer,
        WifiForm
    },
    created () {
        this.queryData();
        this.$confirm = MessageBox.confirm;
        this.$message = Message;
    },
    data () {
        return {
            dialogFormVisible: false,
            dialogFormEdit: false,
            currentPage: 1,
            pageSize: pageSizeConfig[0],
            pageSizeConfig: pageSizeConfig,
            data: [],
            positionData: []
        };
    },
    computed: {
        tableData () {
            const pageSize = this.pageSize;
            const currentPage = this.currentPage;
            const l = (currentPage - 1) * pageSize;
            const r = l + pageSize;
            return this.data.slice(l, r).map(item => {
                item.locationName = this.locationId2Name(item.locationId);
                return item;
            });
        }
    },
    methods: {
        locationId2Name (id) {
            const position = this.positionData.find(position => position.id === id);
            return (position ? position.name : '');
        },
        queryData () {
            Promise.all([getPositionList(), getWifiList()]).then(dataObjs => {
                this.positionData = dataObjs[0].message.list;
                this.data = dataObjs[1].message.list;
            }).catch(err => {
                this.$message({
                    type: 'error',
                    message: '获取数据失败: ' + err.message
                });
            });
        },
        handleAdd () {
            this.$refs.form.$emit('init');
            this.dialogFormEdit = false;
            this.dialogFormVisible = true;
        },
        handleDelete (row) {
            // console.log(row);
            this.$confirm('确认删除此探针？', '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                deleteWifi([row.id]).then(() => {
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
        handleEdit (row) {
            // console.log(row);
            this.$refs.form.$emit('set', {
                id: row.id,
                name: row.name,
                mmac: row.mmac,
                locationId: row.locationId,
                mark: row.mark
            });
            this.dialogFormEdit = true;
            this.dialogFormVisible = true;
        },
        handleSubmit (data) {
            // console.log(data);
            // this.dialogFormEdit = true;
            if (this.dialogFormEdit) {
                updateWifi([], data).then(() => {
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                    this.dialogFormVisible = false;
                    this.queryData();
                }).catch(err => {
                    this.$message({
                        type: 'error',
                        message: '操作失败: ' + err.message
                    });
                });
            } else {
                addWifi([], data).then(() => {
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
            }
        },
        handleCancel () {
            this.dialogFormVisible = false;
        },
        handleSizeChange (pageSize) {
            this.currentPage = 1;
            this.pageSize = pageSize;
        }
    }
};
</script>
<style>
.wifi-management {
    min-width: 1130px;
}
.wifi-management .content {
    padding: 10px;
}
.wifi-management td.show-overflow .cell {
    white-space: nowrap;
    min-width: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
}
.wifi-management td.show-overflow:hover .cell {
    display: inline-block;
    overflow: visible;
    position: relative;
    z-index: 10;
    background-color: #f9f8e8;
    transition: background-color .25s ease;
}
.wifi-management .operation-panel {
    padding: 10px 20px;
}
.wifi-management .el-pagination {
    float: right;
    padding: 10px;
}
</style>