<template>
    <div id="app">
        <top-bar></top-bar>
        <side-nav active="wifi-management"></side-nav>
        <wifi-management class="right-content"></wifi-management>
    </div>
</template>
<script>
import TopBar from '@/components/common/TopBar';
import SideNav from '@/components/common/SideNav';
import WifiManagement from '@/components/wifi-management/Main';

export default {
    components: {
        WifiManagement,
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
