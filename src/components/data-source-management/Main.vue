<template>
    <div class="data-source-management">
        <title-bar title="数据源管理" class="bar">
        </title-bar>
        <div class="content">
            <table-container>
                <div slot="header" class="operation-panel">
                    <el-button type="primary" @click="handleAdd">添加数据源</el-button>
                </div>
                <div>
                    <el-table :data="tableData" stripe tooltip-effect="light" style="width: 100%">
                        <el-table-column prop="id" label="ID" min-width="50" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column prop="name" label="数据源" min-width="150" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column prop="connectionUrl" label="URL" min-width="220" class-name="show-overflow-long">
                        </el-table-column>
                        <el-table-column prop="connectionUser" label="用户名" min-width="150" class-name="show-overflow">
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
        <data-source-form ref="form" :visible="dialogFormVisible" :edit="dialogFormEdit" @submit="handleSubmit" @cancel="handleCancel">
        </data-source-form>
    </div>
</template>

<script>
import { Button, Table, TableColumn, Pagination, Message, MessageBox } from 'jcloud-ele-ui';

import TitleBar from '../common/TitleBar';
import TableContainer from '../common/TableContainer';

import DataSourceForm from './DataSourceForm';

import { getDataSrcList, updateDataSrc, addDataSrc, deleteDataSrc } from '@/api/data-src';

const pageSizeConfig = [10, 30, 50];

export default {
    name: 'data-source-management',
    components: {
        'el-button': Button,
        'el-table': Table,
        'el-table-column': TableColumn,
        'el-pagination': Pagination,
        TitleBar,
        TableContainer,
        DataSourceForm
    },
    created () {
        this.$confirm = MessageBox.confirm;
        this.$message = Message;
        this.queryData();
    },
    data () {
        return {
            dialogFormVisible: false,
            dialogFormEdit: false,
            currentPage: 1,
            pageSize: pageSizeConfig[0],
            pageSizeConfig: pageSizeConfig,
            data: []
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
            getDataSrcList().then(dataObj => {
                this.data = dataObj.message.list;
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
            this.$confirm('确认删除此数据源？', '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                deleteDataSrc([row.id]).then(() => {
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
                connectionUrl: row.connectionUrl,
                connectionUser: row.connectionUser,
                connectionPwd: row.connectionUser
            });
            this.dialogFormEdit = true;
            this.dialogFormVisible = true;
        },
        handleSubmit (data) {
            // console.log(data);
            // this.dialogFormEdit = true;
            if (this.dialogFormEdit) {
                updateDataSrc([], data).then(() => {
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
                addDataSrc([], data).then(() => {
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
.data-source-management {
    min-width: 1130px;
}

.data-source-management .content {
    padding: 10px;
}

.data-source-management td.show-overflow .cell {
    white-space: nowrap;
    min-width: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.data-source-management td.show-overflow:hover .cell {
    display: inline-block;
    overflow: visible;
    position: relative;
    z-index: 10;
    background-color: #f9f8e8;
    transition: background-color .25s ease;
}
.data-source-management td.show-overflow-long .cell {
    white-space: nowrap;
    min-width: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.data-source-management td.show-overflow-long:hover .cell {
    display: inline-block;
    overflow: visible;
    position: absolute;
    top: 8px;
    right: -450px;
    z-index: 10;
    background-color: #f9f8e8;
    transition: background-color .25s ease;
}
.data-source-management .operation-panel {
    padding: 10px 20px;
}

.data-source-management .el-pagination {
    float: right;
    padding: 10px;
}
</style>
