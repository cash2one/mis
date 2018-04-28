<template>
    <div class="position-management">
        <title-bar title="位置管理">
        </title-bar>
        <div class="content">
            <table-container>
                <div slot="header" class="operation-panel">
                    <el-button type="primary" @click="handleAdd">添加位置</el-button>
                </div>
                <div>
                    <el-table :data="tableData" stripe tooltip-effect="light" style="width: 100%">
                        <el-table-column prop="id" label="ID" min-width="50" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column prop="name" label="位置" min-width="150" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column prop="mallName" label="商场" min-width="150" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column prop="floorName" label="楼层" min-width="150" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column prop="shopName" label="店铺" min-width="150" class-name="show-overflow">
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
        <position-form ref="form" :visible="dialogFormVisible" :edit="false" :storeList="storeData" @submit="handleSubmit" @cancel="handleCancel">
        </position-form>
    </div>
</template>

<script>
import { Button, Table, TableColumn, Pagination, Message, MessageBox } from 'jcloud-ele-ui';

import TitleBar from '../common/TitleBar';
import TableContainer from '../common/TableContainer';

import PositionForm from './PositionForm';

import { getPositionList, addPosition, deletePosition } from '@/api/position';
import { getFloorList } from '@/api/floor';
import { getShopList } from '@/api/shop';
import { getStoreList } from '@/api/store';

const pageSizeConfig = [10, 30, 50];

export default {
    name: 'position-management',
    components: {
        'el-button': Button,
        'el-table': Table,
        'el-table-column': TableColumn,
        'el-pagination': Pagination,
        TitleBar,
        TableContainer,
        PositionForm
    },
    created () {
        this.queryData();
        this.$confirm = MessageBox.confirm;
        this.$message = Message;
    },
    data () {
        return {
            dialogFormVisible: false,
            currentPage: 1,
            pageSize: pageSizeConfig[0],
            pageSizeConfig: pageSizeConfig,
            data: [],
            partFloorData: [],
            partShopData: [],
            storeData: []
        };
    },
    computed: {
        tableData () {
            const pageSize = this.pageSize;
            const currentPage = this.currentPage;
            const l = (currentPage - 1) * pageSize;
            const r = l + pageSize;
            return this.data.slice(l, r).map(item => {
                item.mallName = this.mallId2Name(item.mallId);
                item.shopName = this.shopId2Name(item.shopId);
                item.floorName = this.floorId2Name(item.floorId);
                return item;
            });
        }
    },
    methods: {
        mallId2Name (id) {
            const store = this.storeData.find(store => store.id === id);
            return (store ? store.name : '');
        },
        shopId2Name (id) {
            const shop = this.partShopData.find(shop => shop.id === id);
            return (shop ? shop.name : '');
        },
        floorId2Name (id) {
            const floor = this.partFloorData.find(floor => floor.id === id);
            return (floor ? floor.name : '');
        },
        queryData () {
            getPositionList().then(dataObj => {
                const shopMallIds = {}, floorMallIds = {};
                dataObj.message.list.forEach(position => {
                    if (position.shopId) {
                        shopMallIds[position.mallId] = true;
                    }
                    if (position.floorId) {
                        floorMallIds[position.mallId] = true;
                    }
                });

                const floorPromiseList = Object.keys(floorMallIds).map(mallId => getFloorList([mallId]));
                const shopPromiseList = Object.keys(shopMallIds).map(mallId => getShopList([mallId]));

                const floorResultPromise = Promise.all(floorPromiseList).then(dataObjs => {
                    this.partFloorData = dataObjs.reduce((result, dataObj) => {
                        return result.concat(dataObj.message.list);
                    }, []);
                    return Promise.resolve();
                }).catch(err => Promise.reject(err));
                const shopResultPromise = Promise.all(shopPromiseList).then(dataObjs => {
                    this.partShopData = dataObjs.reduce((result, dataObj) => {
                        return result.concat(dataObj.message.list);
                    }, []);
                    return Promise.resolve();
                }).catch(err => Promise.reject(err));
                const storeResultPromise = getStoreList().then(dataObj => {
                    this.storeData = dataObj.message.list;
                    return Promise.resolve();
                }).catch(err => Promise.reject(err));

                Promise.all([floorResultPromise, shopResultPromise, storeResultPromise]).then(() => {
                    this.data = dataObj.message.list;
                }).catch(err => {
                    this.$message({
                        type: 'error',
                        message: '获取数据失败: ' + err.message
                    });
                });
            });
        },
        handleAdd () {
            this.$refs.form.$emit('init');
            this.dialogFormVisible = true;
        },
        handleDelete (row) {
            // console.log(row);
            this.$confirm('确认删除此位置？', '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                deletePosition([row.id]).then(() => {
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
            if (!data.floorId)
                data.floorId = undefined;
            if (!data.shopId)
                data.shopId = undefined;
            addPosition([], data).then(() => {
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
        handleSizeChange (pageSize) {
            this.currentPage = 1;
            this.pageSize = pageSize;
        }
    }
};
</script>
<style>
.position-management {
    min-width: 1130px;
}

.position-management .content {
    padding: 10px;
}

.position-management td.show-overflow .cell {
    white-space: nowrap;
    min-width: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.position-management td.show-overflow:hover .cell {
    display: inline-block;
    overflow: visible;
    position: relative;
    z-index: 10;
    background-color: #f9f8e8;
    transition: background-color .25s ease;
}

.position-management .operation-panel {
    padding: 10px 20px;
}

.position-management .el-pagination {
    float: right;
    padding: 10px;
}
</style>
