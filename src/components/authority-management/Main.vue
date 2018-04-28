<template>
    <div class="authority-management">
        <title-bar title="权限管理"></title-bar>
        <div class="content">
            <el-tabs v-model="activeName">
                <el-tab-pane label="角色管理" name="first">
                    <role v-if="activeName === 'first'"></role>
                </el-tab-pane>
                <el-tab-pane label="超级管理员管理" name="second">
                    <user v-if="activeName === 'second'"></user>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { Tabs,TabPane } from 'jcloud-ele-ui';
import TitleBar from '../common/TitleBar';
import Role from './role/Role';
import User from './user/User';
export default {
    name: 'authority-management',
    components: {
        'el-tabs': Tabs,
        'el-tab-pane': TabPane,
        TitleBar,
        Role,
        User
    },
    data () {
        return {
            activeName: 'first'
        };
    }
};
</script>
<style>
.authority-management {
    min-width: 1130px;
}
.authority-management .content {
    padding: 10px;
}
.authority-management .operation-panel {
    padding: 10px 20px;
}
.authority-management .table-container{
    margin-top: 10px;
}
.authority-management .el-pagination {
    float: right;
    padding: 10px;
}
</style>