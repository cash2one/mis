<template>
    <div id="app">
        <top-bar></top-bar>
        <side-nav active="position-management"></side-nav>
        <position-management class="right-content"></position-management>
    </div>
</template>
<script>
import TopBar from '@/components/common/TopBar';
import SideNav from '@/components/common/SideNav';
import PositionManagement from '@/components/position-management/Main';

export default {
    components: {
        PositionManagement,
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
