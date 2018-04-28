<template>
    <div class="title-bar">
        <h1>{{ title }}</h1>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: ['title']
};
</script>
<style>
.title-bar {
    line-height: 45px;
    padding: 0 20px;
    background-color: rgb(208, 222, 228);
    overflow: hidden;
}
</style>
