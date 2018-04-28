<template>
    <div id="app">
        <top-bar></top-bar>
        <side-nav active="message-management"></side-nav>
        <message-management class="right-content"></message-management>
    </div>
</template>
<script>
import TopBar from '@/components/common/TopBar';
import SideNav from '@/components/common/SideNav';
import MessageManagement from '@/components/message-management/Main';

export default {
    components: {
        MessageManagement,
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
