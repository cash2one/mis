<template>
    <div id="app">
        <top-bar></top-bar>
        <side-nav active="log-management"></side-nav>
        <log-management class="right-content"></log-management>
    </div>
</template>
<script>
import TopBar from '@/components/common/TopBar';
import SideNav from '@/components/common/SideNav';
import LogManagement from '@/components/log-management/Main';

export default {
    components: {
        TopBar,
        SideNav,
        LogManagement
    },
    name: 'app'
};
</script>
<style>
body {
    background-color: rgb(243, 243, 243);
}
#app {
    min-height: 100%;
}
.right-content {
    margin-left: 140px;
    margin-top: 60px;
}
</style>