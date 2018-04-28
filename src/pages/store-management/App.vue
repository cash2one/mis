<template>
    <div id="app">
        <top-bar></top-bar>
        <side-nav active="store-management"></side-nav>
        <store-management class="right-content"></store-management>
    </div>
</template>
<script>
import TopBar from '@/components/common/TopBar';
import SideNav from '@/components/common/SideNav';
import StoreManagement from '@/components/store-management/Main';

export default {
    components: {
        StoreManagement,
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
