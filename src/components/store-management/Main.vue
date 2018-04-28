<template>
    <div class="store-management">
        <title-bar title="商场管理">
        </title-bar>
        <div class="content">
            <table-container>
                <div slot="header" class="operation-panel">
                    <el-button type="primary" @click="handleAdd">添加商场</el-button>
                </div>
                <div>
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column prop="id" label="ID" min-width="50" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column prop="name" label="商场" min-width="100" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column prop="address" label="地址" min-width="100" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column prop="datasourceName" label="数据源" min-width="100" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column prop="operators" label="商场管理员" min-width="100" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column prop="topicName" label="数据主题" min-width="100" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column prop="owner" label="主题创建者" min-width="100" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column label="操作" min-width="300">
                            <template slot-scope="scope">
                                <el-button type="link" @click="handleRate(scope.row)">查看匹配率</el-button>
                                <el-button type="link" @click="handleFloor(scope.row)">查看楼层</el-button>
                                <el-button type="link" @click="handleShop(scope.row)">店铺管理</el-button>
                                <el-button type="link" @click="handleAssign(scope.row)">分配管理员</el-button>
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
        <store-form ref="form" :visible="dialogFormVisible" :edit="dialogFormEdit" :datasourceList="dataSrcData" @submit="handleSubmit" @cancel="handleCancel">
        </store-form>
        <assign-users ref="assign" :visible="AssignVisible" @submit="AssignSubmit" @cancel="AssignCancel">
        </assign-users>
    </div>
</template>

<script>
import { Button, Table, TableColumn, Pagination, Message, MessageBox } from 'jcloud-ele-ui';
import TitleBar from '../common/TitleBar';
import TableContainer from '../common/TableContainer';
import StoreForm from './StoreForm';
import AssignUsers from './AssignUsers';
import { getStoreList, updateStore, addStore, deleteStore } from '@/api/store';
import { getDataSrcList } from '@/api/data-src';

const pageSizeConfig = [10, 30, 50];

export default {
    name: 'store-management',
    components: {
        'el-button': Button,
        'el-table': Table,
        'el-table-column': TableColumn,
        'el-pagination': Pagination,
        TitleBar,
        TableContainer,
        StoreForm,
        AssignUsers
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
            dataSrcData: [],
            AssignVisible: false
        };
    },
    computed: {
        tableData () {
            const pageSize = this.pageSize;
            const currentPage = this.currentPage;
            const l = (currentPage - 1) * pageSize;
            const r = l + pageSize;
            return this.data.slice(l, r).map(item => {
                item.datasourceName = this.datasourceId2Name(item.datasourceId);
                return item;
            });
        }
    },
    methods: {
        datasourceId2Name (id) {
            const datasrc = this.dataSrcData.find(dataSrc => dataSrc.id === id);
            return (datasrc ? datasrc.name : '');
        },
        queryData () {
            Promise.all([getDataSrcList(), getStoreList()]).then(dataObjs => {
                this.dataSrcData = dataObjs[0].message.list;
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
            this.$confirm('确认删除此商场？', '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                deleteStore([row.id]).then(() => {
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
                name: row.name,
                address: row.address,
                id: row.id,
                datasourceId: row.datasourceId,
                owner: row.owner,
                topicName: row.topicName,
                operators: row.operators
            });
            this.dialogFormEdit = true;
            this.dialogFormVisible = true;
        },
        handleFloor (row) {
            window.location.href = `/mis/floor-management.html?id=${row.id}&name=${row.name}`;
        },
        handleRate (row) {
            window.location.href = `/mis/conversion-rate-view.html?id=${row.id}&name=${row.name}`;
        },
        handleShop (row) {
            window.location.href = `/mis/shop-management.html?id=${row.id}&name=${row.name}`;
        },
        handleSubmit (data) {
            if (this.dialogFormEdit) {
                updateStore([], data).then(() => {
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
                addStore([], data).then(() => {
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
            this.queryData();
        }
    }
};
</script>
<style>
.store-management {
    min-width: 1130px;
}
.store-management .content {
    padding: 10px;
}
.store-management .operation-panel {
    padding: 10px 20px;
}
.store-management td.show-overflow .cell {
    white-space: nowrap;
    min-width: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
}
.store-management td.show-overflow:hover .cell {
    display: inline-block;
    overflow: visible;
    position: relative;
    z-index: 10;
    background-color: #f9f8e8;
    transition: background-color .25s ease;
}
.store-management .el-pagination {
    float: right;
    padding: 10px;
}
</style>