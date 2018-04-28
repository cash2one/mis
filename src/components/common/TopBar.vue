<style>
    .clear:after{content:'';display:block;clear:both;height:0;overflow:hidden;visibility:hidden;}
    .top-nav {
        background-color: #09393b;
        width: 100%;
        height: 60px;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
    }
    .logo {
        display: block;
        padding: 8px 10px 0;
        float: left;
    }
    .top-nav .nav-r {
        float: right;
        font-family: Microsoft YaHei, Arial,sans-serif;
    }
    .nav-r li {
        float: left;
    }
    .nav-menu-hd {
        z-index: 10000;
        position: relative;
        padding: 0 25px;
        height: 60px;
        line-height: 60px;
        font-size: 16px;
        margin-right: 30px;
        color: #fff;
    }
    .nav-menu-hd:hover {
        background-color: #0e3d3e;
    }
    .nav-menu-hd a {
        color: #fff;
    }
    .name {
        display: block;
        max-width: 100px;
        overflow:hidden;
        text-overflow:ellipsis; 
        float: left;
    }
    .icon-arrow {
        float: left;
        position: relative;
        top: 25px;
        right: -10px;
        font-size: 12px;
    }
    .nav-sub-menu {
        background-color: #0e3d3e;
        width: 152px;
        min-height: 42px;
        position: absolute;
        top: 60px;
        left: 0;
        text-align: center;
        z-index: 1010;
    }
    .nav-sub-menu-item a {
        display: block;
        width: inherit;
        line-height: 42px;
        font-size: 14px;
    }
    .nav-sub-menu-item a:hover {
        background-color: #155a6a;
    }
</style>
<template>
    <div class="top-nav clear">
        <a href="/" class="logo"><img src="../../assets/zk_logo.png" alt="京东知客"></a>
        <ul class="nav-r">
            <li>
                <div class="nav-menu-hd clear" @mouseover="showSub = 1" @mouseout="showSub = 0">
                    <span class="icon-user"></span>
                    <a href="#" class="name">{{ username }}</a>
                    <span class="icon-arrow">
                        <i class="el-icon-caret-bottom" v-if="!showSub"></i>
                        <i class="el-icon-caret-top" v-else></i>
                    </span>
                    <div class="nav-sub-menu" v-show="showSub">
 <!--                        <div class="nav-sub-menu-item" v-if="username == 'datajingdo_m'">
                            <a href="/store-management.html" target="_blank">后台配置</a>
                        </div> -->
                        <div class="nav-sub-menu-item">
                            <a @click.prevent="handleExit">退出</a>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    import { exit } from '@/api/account';
    export default {
        name: 'top-bar',
        data () {
            return {
                username: '',
                showSub: false
            };
        },
        created () {
            this.username = this.$cookie.get('unick');
        },
        methods: {
            handleExit () {
                sessionStorage.clear();
                exit().then(() => {
                    location.reload(true);
                }).catch(() => {
                    location.reload(true);
                });
            }
        }
    };
</script>