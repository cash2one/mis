<style>
    .side-nav-wrap {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
        width: 140px;
        height: 100%;
        overflow: auto;
        background-color: #09393b;
    }
    .side-nav {
        margin-top: 60px;
    }
    .side-nav-item {
        display: block;
        text-align: center;
        width: 100%;
        height: 80px;
        line-height: 80px;
        border-bottom: 1px solid #627f82;
    }
    .side-nav-item.active,
    .side-nav-item:hover {
        background: rgba(29, 97, 95, 0.5);
    }
    .side-nav-item-title {
        font-size: 16px;
        color: #fff;
    }
    .side-nav li:last-child .side-nav-item {
        border-bottom: 0;
    }
    .icon-nav {
        width: 24px;
        height: 24px;
        display: inline-block;
        position: relative;
        top: 5px;
    }
</style>
<template>
    <div class="side-nav-wrap">
        <ul class="side-nav">
            <li v-for="nav in navs" :key="nav.en ">
                <a :href="`/${nav.en == 'big-screen' ? '' : 'mis/'}${nav.en}.html`" :target="nav.en == 'big-screen' ? '_blank' : '_self'" class="side-nav-item" :class="{'active': active === nav.en}">
                    <span class="side-nav-item-title">{{nav.zh}}</span>
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'side-nav',
        data () {
            return {
                navs: [
                    {
                        zh: '短信审核',
                        en: 'message-management'
                    },
                    {
                        zh: '商场管理',
                        en: 'store-management'
                    },
                    // {
                    //     zh: '监控中心',
                    //     en: 'big-screen'
                    // },
                    {
                        zh: 'wifi探针',
                        en: 'wifi-management'
                    },
                    {
                        zh: '位置管理',
                        en: 'position-management'
                    },
                    {
                        zh: '数据源管理',
                        en: 'data-source-management'
                    },
                    {
                        zh: '日志管理',
                        en: 'log-management'
                    },
                    {
                        zh: '权限管理',
                        en: 'authority-management'
                    }
                ]
            };
        },
        props: {
            active: {
                type: String,
                default: 'store-management'
            }
        }
    };
</script>