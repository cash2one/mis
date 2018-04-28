<template>
    <div id="app">
        <top-bar></top-bar>
        <side-nav active="store-management"></side-nav>
        <floor-management class="right-content"></floor-management>
    </div>
</template>
<script>
import TopBar from '@/components/common/TopBar';
import SideNav from '@/components/common/SideNav';
import FloorManagement from '@/components/floor-management/Main';

export default {
    components: {
        FloorManagement,
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
