<template>
    <div class="message-management">
        <title-bar title="短信审核">
        </title-bar>
        <div class="content">
            <table-container>
                <div>
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column prop="id" label="ID" min-width="50" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column prop="modelName" label="模板名称" min-width="150" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column label="创建时间" min-width="200" class-name="show-overflow">
                            <template slot-scope="scope">
                                {{ scope.row.createDate | time }}
                            </template>
                        </el-table-column>
                        <el-table-column label="状态" min-width="100" class-name="show-overflow">
                            <template slot-scope="scope">
                                <div :style="getStatusStyle(scope.row.modelStatus)">
                                {{ scope.row.modelStatus | status }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="approvalSug" label="审批意见" min-width="200" class-name="show-overflow">
                        </el-table-column>
                        <el-table-column label="操作" min-width="150">
                            <template slot-scope="scope">
                                <el-button v-show="scope.row.modelStatus != 1 && scope.row.modelStatus != 2" type="link" @click="handleAppeal(scope.row)">审批</el-button>
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
        <message-form ref="form" :visible="dialogFormVisible" @close="handleClose">
        </message-form>
    </div>
</template>

<script>
import { Button, Table, TableColumn, Pagination, Message, MessageBox } from 'jcloud-ele-ui';

import TitleBar from '../common/TitleBar';
import TableContainer from '../common/TableContainer';

import MessageForm from './MessageForm';

import { getMessageList } from '@/api/shortMessage';

const pageSizeConfig = [10, 30, 50];

const statusMap = {
    '0': {
        text: '待审批',
        color: '#fab418'
    },
    '1': {
        text: '通过',
        color: '#51d2b7'
    },
    '2': {
        text: '驳回',
        color: '#e15a5f'
    },
    '3': {
        text: '申诉中',
        color: '#fab418'
    }
};

export default {
    name: 'wifi-management',
    components: {
        'el-button': Button,
        'el-table': Table,
        'el-table-column': TableColumn,
        'el-pagination': Pagination,
        TitleBar,
        TableContainer,
        MessageForm
    },
    filters: {
        time (val) {
            if(!val)
                return '';
            const date = new Date(val);
            const Y = date.getFullYear();
            const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
            const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            const h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
            const m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
            const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return `${Y}-${M}-${D} ${h}:${m}:${s}`;
        },
        status (val) {
            return (statusMap[val] && statusMap[val].text) || '未知';
        }
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
        init () {
            this.data = [];
            this.currentPage = 1;
        },
        queryData () {
            getMessageList().then(data => {
                this.data = data.message.list;
            }).catch(err => {
                if(err.message) {
                    const message = err.message.exception === undefined ? err.message : err.message.exception;
                    this.$message({
                        type: 'error',
                        message: '获取短信列表失败:' + message
                    });
                }
            });
        },
        getStatusStyle (val) {
            return {
                color: (statusMap[val] && statusMap[val].color) || 'red'
            };
        },
        handleAppeal (item) {
            this.$refs.form.$emit('set', item);
            this.dialogFormVisible = true;
        },
        handleClose (refresh) {
            this.dialogFormVisible = false;
            if(refresh) {
                this.init();
                this.queryData();
            }
        },
        handleSizeChange (pageSize) {
            this.currentPage = 1;
            this.pageSize = pageSize;
        }
    }
};
</script>
<style>
.message-management {
    min-width: 1130px;
}
.message-management .content {
    padding: 10px;
}
.message-management td.show-overflow .cell {
    white-space: nowrap;
    min-width: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
}
.message-management td.show-overflow:hover .cell {
    display: inline-block;
    overflow: visible;
    position: relative;
    z-index: 10;
    background-color: #f9f8e8;
    transition: background-color .25s ease;
}
.message-management .operation-panel {
    padding: 10px 20px;
}
.message-management .el-pagination {
    float: right;
    padding: 10px;
}
</style>