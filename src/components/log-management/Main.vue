<template>
    <div class="log-management">
        <title-bar title="日志管理" class="bar"></title-bar>
        <div class="content">
            <table-container>
                <div slot="header" class="operation-panel">
                    <el-date-picker
                        v-model="dateRange"
                        type="daterange"
                        placeholder="选择日期范围"
                        style="display: inline-block;"
                        @change="queryLogs">
                    </el-date-picker>
                    <el-select v-model="moduleName" @change="queryLogs">
                        <el-option v-for="item in moduleList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column prop="moduleName" label="所属模块" min-width="60">
                        </el-table-column>
                        <el-table-column prop="operator" label="操作人" min-width="70">
                        </el-table-column>
                        <el-table-column prop="operation" label="操作" min-width="70">
                        </el-table-column>
                        <el-table-column prop="dtOperate" label="操作时间" min-width="80">
                        </el-table-column>
                        <el-table-column prop="detail" label="操作详情" min-width="250">
                        </el-table-column>
                    </el-table>
                </div>
                <div slot="footer">
                    <el-pagination @size-change="onSizeChange" @current-change="onCurrentChange" :current-page="currentPage" :page-sizes="[10, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </table-container>
        </div>
    </div>
</template>

<script>
import {Table,TableColumn,Pagination,DatePicker,Select,Option} from 'jcloud-ele-ui';
import TitleBar from '../common/TitleBar';
import TableContainer from '../common/TableContainer';
import {getLogs} from '@/api/log';
import {dateFormatter,timeFormatter} from '@/utils';

export default {
    name: 'log-management',
    components: {
        'el-table': Table,
        'el-table-column': TableColumn,
        'el-pagination': Pagination,
        'el-date-picker': DatePicker,
        'el-select': Select,
        'el-option': Option,
        TitleBar,
        TableContainer
    },
    created () {
        this.queryLogs();
    },
    data () {
        return {
            tableData:[],
            currentPage: 1,
            pageSize: 10,
            total:0,
            moduleList:[
                {
                    name:'短信审核',
                    id:'SMS'
                },
                {
                    name:'短信营销',
                    id:'SMS_SALE'
                },
                {
                    name:'商场管理',
                    id:'MALL'
                },
                {
                    name:'WIFI管理',
                    id:'WIFI'
                },
                {
                    name:'地址管理',
                    id:'LOCATION'
                },
                {
                    name:'客流概览',
                    id:'CUSTOMER_FLOW'
                },
                {
                    name:'客流画像',
                    id:'CUSTOMER_PROFILE'
                },
                {
                    name:'定制画像',
                    id:'CUSTOMIZE_PROFILE'
                },
                {
                    name:'DSP投放',
                    id:'DSP'
                },
                {
                    name:'权限管理',
                    id:'PERMISSION'
                },
                {
                    name:'人群包管理',
                    id:'USER_PACKAGE'
                },
                {
                    name:'数据源管理',
                    id:'DATASOURCE'
                }
            ],
            moduleName:'',
            dateRange:''
        };
    },
    methods: {
        // 查询日志列表接口
        queryLogs () {
            getLogs([],{
                pageNo:this.currentPage,
                pageSize:this.pageSize,
                beginTime:dateFormatter(this.dateRange[0]),
                endTime:dateFormatter(this.dateRange[1]),
                moduleName:this.moduleName
            }).then(dataObj => {
                if(dataObj.status=="success") {
                    this.tableData = dataObj.message.PageResult.list;
                    this.total = dataObj.message.PageResult.total;
                    this.tableData.forEach((item) => {
                        item.dtOperate = timeFormatter(new Date(item.dtOperate));
                    });
                }
            }).catch(err => {
                throw err;
            });
        },
        // 分页操作
        onCurrentChange (pageNo) {
            this.currentPage = pageNo;
            this.queryLogs();
        },
        onSizeChange (pageSize) {
            this.currentPage = 1;
            this.pageSize = pageSize;
            this.queryLogs();
        }
    }
};
</script>
<style>
.log-management {
    min-width: 1130px;
}
.log-management .content {
    padding: 10px;
}
.log-management .operation-panel {
    padding: 10px 20px;
}
.log-management .el-pagination {
    float: right;
    padding: 10px;
}
</style>