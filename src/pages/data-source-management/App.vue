<template>
    <div id="app">
        <top-bar></top-bar>
        <side-nav active="data-source-management"></side-nav>
        <data-source-management class="right-content"></data-source-management>
    </div>
</template>
<script>
import TopBar from '@/components/common/TopBar';
import SideNav from '@/components/common/SideNav';
import DataSourceManagement from '@/components/data-source-management/Main';

export default {
    components: {
        DataSourceManagement,
        SideNav,
        TopBar
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
