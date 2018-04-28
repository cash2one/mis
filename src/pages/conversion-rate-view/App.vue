<template>
    <div id="app">
        <top-bar></top-bar>
        <side-nav active="store-management"></side-nav>
        <conversion-rate-view class="right-content"></conversion-rate-view>
    </div>
</template>
<script>
import TopBar from '@/components/common/TopBar';
import SideNav from '@/components/common/SideNav';
import ConversionRateView from '@/components/conversion-rate-view/Main';

export default {
    components: {
        ConversionRateView,
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
