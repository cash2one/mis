<template>
    <div class="conversion-rate-view">
        <title-bar title="商场人流匹配率统计" class="bar">
            <h1 class="sub-name">{{ storeName }}</h1>
            <div class="button-panel">
                <el-button type="default" @click="handleBack">返回</el-button>
            </div>
        </title-bar>
        <div class="content">
            <table-container>
                <div>
                    <el-table :data="tableData" stripe tooltip-effect="light" style="width: 100%">
                        <el-table-column prop="date" label="时间" min-width="60" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column prop="total" label="人流总数" min-width="60" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column prop="iosTotal" label="IOS用户数" min-width="80" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column label="iOS mac->idfa匹配率" min-width="100" class-name="show-overflow">
                            <template slot-scope="scope">
                                {{ scope.row.iosApiRate | rate }}
                            </template>
                        </el-table-column>
                        <el-table-column label="iOS mac->UserPin匹配率" min-width="120" class-name="show-overflow">
                            <template slot-scope="scope">
                                {{ scope.row.iosUserRate | rate }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="androidTotal" label="Android用户数" min-width="80" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column label="Android mac->UserPin匹配率" min-width="150" class-name="show-overflow">
                            <template slot-scope="scope">
                                {{ scope.row.androidUserRate | rate }}
                            </template>
                        </el-table-column>
                        <el-table-column label="整体匹配率" min-width="80" class-name="show-overflow">
                            <template slot-scope="scope">
                                {{ scope.row.totalRate | rate }}
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
    </div>
</template>

<script>
import { Button, Table, TableColumn, Pagination, Message, MessageBox } from 'jcloud-ele-ui';

import TitleBar from '../common/TitleBar';
import TableContainer from '../common/TableContainer';

import { getRateList } from '@/api/store';

const pageSizeConfig = [10, 30, 50];

export default {
    name: 'floor-management',
    components: {
        'el-button': Button,
        'el-table': Table,
        'el-table-column': TableColumn,
        'el-pagination': Pagination,
        TitleBar,
        TableContainer
    },
    filters: {
        rate (val) {
            if(!val) {
                val = 0;
            }
            return (val * 100).toFixed(2) +'%';
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
                getRateList([this.storeId]).then(dataObj => {
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
.conversion-rate-view {
    min-width: 1220px;
}

.conversion-rate-view .bar h1 {
    float: left;
    padding-right: 10px;
}

.conversion-rate-view .bar .button-panel {
    float: right;
}

.conversion-rate-view .bar .sub-name {
    padding-left: 10px;
    position: relative;
}

.conversion-rate-view .bar .sub-name::before {
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

.conversion-rate-view .content {
    padding: 20px;
}

.conversion-rate-view td.show-overflow .cell {
    white-space: nowrap;
    min-width: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.conversion-rate-view td.show-overflow:hover .cell {
    display: inline-block;
    overflow: visible;
    position: relative;
    z-index: 10;
    background-color: #f9f8e8;
    transition: background-color .25s ease;
}

.conversion-rate-view .el-table .cell,
.conversion-rate-view .el-table th>div {
    padding-left: 12px;
    padding-right: 12px;
}

.conversion-rate-view .el-pagination {
    float: right;
    padding: 10px;
}
</style>
