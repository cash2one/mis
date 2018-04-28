<template>
    <div id="app">
        <top-bar></top-bar>
        <side-nav active="authority-management"></side-nav>
        <authority-management class="right-content"></authority-management>
    </div>
</template>
<script>
import TopBar from '@/components/common/TopBar';
import SideNav from '@/components/common/SideNav';
import AuthorityManagement from '@/components/authority-management/Main';

export default {
    components: {
        TopBar,
        SideNav,
        AuthorityManagement
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