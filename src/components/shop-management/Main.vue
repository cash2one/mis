<template>
    <div class="shop-management">
        <title-bar title="店铺管理" class="bar">
            <h1 class="sub-name">{{ storeName }}</h1>
            <div class="button-panel">
                <el-button type="default" @click="handleBack">返回</el-button>
            </div>
        </title-bar>
        <div class="content">
            <table-container>
                <div slot="header" class="operation-panel">
                    <el-button type="primary" @click="addShop">添加店铺</el-button>
                </div>
                <div>
                    <el-table :data="tableData" stripe tooltip-effect="light" style="width: 100%">
                        <el-table-column prop="name" label="店铺名称" min-width="200" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column label="行业" min-width="180">
                            <template slot-scope="scope">
                                {{ scope.row.industry | industry }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="categoryName" label="店铺品类" min-width="180"></el-table-column>
                        <el-table-column prop="incharge" label="负责人" min-width="150">
                        </el-table-column>
                        <el-table-column prop="userPins" label="店铺管理员" min-width="150" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column prop="contact" label="联系方式" min-width="200">
                        </el-table-column>
                        <el-table-column label="操作" min-width="180">
                            <template slot-scope="scope">
                                <el-button type="link" @click="handleAssign(scope.row)">分配管理员</el-button>
                                <el-button type="link" @click="onEdit(scope.row)">编辑</el-button>
                                <el-button type="link" @click="onDelete(scope.row)">删除</el-button>
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
        <shop-form ref="form" :visible="dialogFormVisible" :edit="dialogFormEdit" :categoryList="categoryList" @submit="onSubmit" @cancel="onCancel"></shop-form>
        <assign-users ref="assign" :visible="AssignVisible" @submit="AssignSubmit" @cancel="AssignCancel">
        </assign-users>
    </div>
</template>

<script>
import { Button, Table, TableColumn, Pagination, Message, MessageBox } from 'jcloud-ele-ui';
import TitleBar from '../common/TitleBar';
import TableContainer from '../common/TableContainer';
import ShopForm from './ShopForm';
import AssignUsers from './AssignUsers';
import { industryConfig } from '../config';
import { getShopList,getCategoryList,createShop,updateShop,deleteShop } from '@/api/promotion';

const pageSizeConfig = [10, 30, 50];

export default {
    name: 'shop-management',
    components: {
        'el-button': Button,
        'el-table': Table,
        'el-table-column': TableColumn,
        'el-pagination': Pagination,
        'shop-form': ShopForm,
        TitleBar,
        TableContainer,
        AssignUsers
    },
    filters: {
        industry (val) {
            return industryConfig[val] || '';
        }
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
            dialogFormEdit: false,
            currentPage: 1,
            pageSize: pageSizeConfig[0],
            pageSizeConfig: pageSizeConfig,
            data: [],
            categoryList: [],
            storeId: null,
            storeName: '',
            AssignVisible: false
        };
    },
    computed: {
        tableData () {
            const pageSize = this.pageSize;
            const currentPage = this.currentPage;
            const l = (currentPage - 1) * pageSize;
            const r = l + pageSize;
            return this.data.slice(l, r).map(row => {
                row.categoryName = this.id2Category(row.categoryId);
                return row;
            });
        }
    },
    methods: {
        queryData () {
            if (this.storeId !== null) {
                const promiseList = [
                    getShopList([this.storeId]), getCategoryList()];
                Promise.all(promiseList).then(dataObjs => {
                    this.categoryList = dataObjs[1].message.list;
                    this.data = dataObjs[0].message.list;
                }).catch(err => {
                    if(err.message) {
                        this.$message({
                            type: 'error',
                            message: '获取数据失败: ' + err.message
                        });
                    }
                });
            }
        },
        id2Category (val) {
            const target = this.categoryList.find(category => {
                return category.id === val;
            });
            return (target? target.name: '');
        },
        handleBack () {
            history.go(-1);
        },
        handleSizeChange (pageSize) {
            this.currentPage = 1;
            this.pageSize = pageSize;
        },
        addShop () {
            this.$refs.form.$emit('init');
            this.dialogFormEdit = false;
            this.dialogFormVisible = true;
        },
        onSubmit (form) {
            // console.log(form);
            const req = {
                name: form.name,
                industry: form.industry,
                incharge: form.incharge,
                contact: form.contact,
                categoryId: form.categoryId
            };
            if (this.dialogFormEdit) {
                req.id = form.id;
                updateShop([],req).then(() => {
                    this.$message({
                        type: 'success',
                        message: '修改店铺成功!'
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
                createShop([this.storeId],req).then(() => {
                    this.$message({
                        type: 'success',
                        message: '新增店铺成功!'
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
        onCancel () {
            this.dialogFormVisible = false;
        },
        onEdit (row) {
            this.$refs.form.$emit('set', row);
            this.dialogFormEdit = true;
            this.dialogFormVisible = true;
        },
        onDelete (row) {
            this.$confirm(`确认删除店铺：${row.name}？`, '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                deleteShop([row.id]
                ).then(() => {
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
.shop-management {
    min-width: 1220px;
}
.shop-management .operation-panel{
    padding: 10px 20px;
}
.shop-management .bar h1 {
    float: left;
    padding-right: 10px;
}

.shop-management .bar .button-panel {
    float: right;
}

.shop-management .bar .sub-name {
    padding-left: 10px;
    position: relative;
}

.shop-management .bar .sub-name::before {
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

.shop-management .content {
    padding: 20px;
}

.shop-management td.show-overflow .cell {
    white-space: nowrap;
    min-width: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.shop-management td.show-overflow:hover .cell {
    display: inline-block;
    overflow: visible;
    position: relative;
    z-index: 10;
    background-color: #f9f8e8;
    transition: background-color .25s ease;
}

.shop-management .el-table .cell,
.shop-management .el-table th>div {
    padding-left: 12px;
    padding-right: 12px;
}

.shop-management .el-pagination {
    float: right;
    padding: 10px;
}
</style>
