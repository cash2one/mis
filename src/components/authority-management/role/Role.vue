<template>
	<table-container>
        <div slot="header" class="operation-panel">
            <el-button type="primary" @click="addRole">添加角色</el-button>
        </div>
        <div>
            <el-table :data="tableData" stripe>
                <el-table-column prop="name" label="角色名称" min-width="120">
                </el-table-column>
                <el-table-column prop="userPins" label="用户账号" min-width="180">
                </el-table-column>
                <el-table-column label="操作" min-width="250">
                    <template slot-scope="scope">
                        <el-button type="link" @click="handleAssign(scope.row)"  :disabled="scope.row.isDefault=='1'">分配用户</el-button>
                        <el-button type="link" @click="handlePms(scope.row)">分配权限</el-button>
                        <el-tooltip content="系统内置角色不能删除" placement="top" effect="light" v-if="scope.row.isDefault=='1'">
                            <el-button type="link" class="disBtn">删除</el-button>
                        </el-tooltip>
                        <el-button type="link" @click="handleDelete(scope.row)" v-else>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div slot="footer">
            <el-pagination @size-change="onSizeChange" @current-change="onCurrentChange" :current-page="currentPage" :page-sizes="[10, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <role-form ref="form" :visible="formVisible" @submit="handleSubmit" @cancel="handleCancel">
        </role-form>
        <assign-users ref="assign" :visible="AssignVisible" @submit="AssignSubmit" @cancel="AssignCancel">
        </assign-users>
        <assign-pms ref="pms" :visible="pmsVisible" @submit="PmsSubmit" @cancel="PmsCancel">
        </assign-pms>
    </table-container>
</template>
<script>
import { Button, Table, TableColumn, Pagination, Message, MessageBox,Tooltip } from 'jcloud-ele-ui';
import TableContainer from '../../common/TableContainer';
import RoleForm from './RoleForm';
import AssignUsers from './AssignUsers';
import AssignPms from './AssignPms';
import { getRoleList,deleteRole } from '@/api/authority';
export default {
    components: {
        'el-button': Button,
        'el-table': Table,
        'el-table-column': TableColumn,
        'el-pagination': Pagination,
        'el-tooltip': Tooltip,
        TableContainer,
        RoleForm,
        AssignUsers,
        AssignPms
    },
    created () {
        this.getData();
        this.$confirm = MessageBox.confirm;
        this.$message = Message;
    },
    data () {
        return {
            formVisible: false,
            AssignVisible: false,
            pmsVisible: false,
            tableData: [],
            currentPage: 1,
            pageSize: 10,
            total:0
        };
    },
    methods: {
        // 获取列表
        getData () {
            getRoleList([],{
                pageNo:this.currentPage,
                pageSize:this.pageSize
            }).then(dataObj => {
                if(dataObj.status == 'success') {
                    this.tableData = dataObj.message.PageResult.list;
                    this.total = dataObj.message.PageResult.total;
                }
            }).catch(err => {
                this.$message({
                    type: 'error',
                    message: '获取数据失败: ' + err.message
                });
            });
        },
        // 添加角色
        addRole () {
            this.$refs.form.$emit('init');
            this.formVisible = true;
        },
        // 添加角色取消
        handleCancel () {
            this.formVisible = false;
        },
        // 添加角色提交
        handleSubmit () {
            this.formVisible = false;
            this.getData();
        },
        // 分配用户
        handleAssign (row) {
            this.$refs.assign.$emit('init',row);
            this.AssignVisible = true;
        },
        // 分配用户取消
        AssignCancel () {
            this.AssignVisible = false;
        },
        // 分配用户提交
        AssignSubmit () {
            this.AssignVisible = false;
            this.getData();
        },
        // 分配权限
        handlePms (row) {
            this.$refs.pms.$emit('init',row.id);
            this.pmsVisible = true;
        },
        // 分配权限取消
        PmsCancel () {
            this.pmsVisible = false;
        },
        // 分配权限提交
        PmsSubmit () {
            this.pmsVisible = false;
            this.getData();
        },
        // 删除
        handleDelete (row) {
            this.$confirm('确认删除此角色？', '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                deleteRole([row.id]).then(() => {
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
<style>
    .disBtn{
        color: #999;
        cursor: not-allowed;
    }
    .disBtn:hover{
        color: #999;
        cursor: not-allowed;
    }
</style>