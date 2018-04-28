<template>
    <div class="table-container">
        <div class="t-header">
            <slot name="header"></slot>
        </div>
        <div class="t-body">
            <slot></slot>
        </div>
        <div class="t-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<style>
.table-container .t-header {
    border: 1px solid rgb(218, 226, 233);
    border-bottom: 0;
    padding-bottom: 1px;
    height: 50px;
    background-color: rgb(228, 245, 247);
}

.table-container .t-footer {
    border: 1px solid rgb(218, 226, 233);
    border-top: 0;
    height: 50px;
    background-color: rgb(228, 245, 247);
}
</style>
