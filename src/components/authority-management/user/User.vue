<template>
	<table-container>
        <div slot="header" class="operation-panel">
            <el-button type="primary" @click="handleAdd">添加管理员</el-button>
        </div>
        <div>
            <el-table :data="tableData" stripe>
                <el-table-column prop="userPin" label="名称" min-width="120">
                </el-table-column>
                <el-table-column prop="creator" label="操作用户" min-width="180">
                </el-table-column>
                <el-table-column label="操作" min-width="250">
                    <template slot-scope="scope">
                        <el-button type="link" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div slot="footer">
            <el-pagination @size-change="onSizeChange" @current-change="onCurrentChange" :current-page="currentPage" :page-sizes="[10, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <user-form ref="form" :visible="formVisible" @submit="handleSubmit" @cancel="handleCancel">
        </user-form>
    </table-container>
</template>
<script>
import { Button, Table, TableColumn, Pagination, Message, MessageBox } from 'jcloud-ele-ui';
import TableContainer from '../../common/TableContainer';
import UserForm from './UserForm';
import { getAdminList,deleteAdmin } from '@/api/authority';

export default {
    components: {
        'el-button': Button,
        'el-table': Table,
        'el-table-column': TableColumn,
        'el-pagination': Pagination,
        TableContainer,
        UserForm
    },
    created () {
        this.getData();
        this.$confirm = MessageBox.confirm;
        this.$message = Message;
    },
    data () {
        return {
            formVisible: false,
            tableData: [],
            currentPage: 1,
            pageSize: 10,
            total:0
        };
    },
    computed: {
    },
    methods: {
        getData () {
            getAdminList([],{pageNo:this.currentPage,pageSize:this.pageSize}).then(dataObj => {
                this.total = dataObj.message.PageResult.total;
                this.tableData = dataObj.message.PageResult.list;
            }).catch(err => {
                this.$message({
                    type: 'error',
                    message: '获取数据失败: ' + err.message
                });
            });
        },
        // 添加
        handleAdd () {
            this.$refs.form.$emit('init');
            this.formVisible = true;
        },
        // 取消
        handleCancel () {
            this.formVisible = false;
        },
        // 提交
        handleSubmit () {
            this.formVisible = false;
            this.getData();
        },
        handleDelete (row) {
            this.$confirm('确认删除此角色？', '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                deleteAdmin([row.userPin]).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getData();
                }).catch(err => {
                    this.$message({
                        type: 'error',
                        message: '操作失败: ' + err.message
                    });
                });
            });
        },
        // 分页
        onCurrentChange (pageNo) {
            this.currentPage = pageNo;
            this.getData();
        },
        onSizeChange (pageSize) {
            this.currentPage = 1;
            this.pageSize = pageSize;
            this.getData();
        }
    }
};
</script>