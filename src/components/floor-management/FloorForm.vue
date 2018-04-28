<template>
    <el-dialog class="dialog" :title="title" :visible.sync="visible" :before-close="handleClose">
        <el-form :model="form" class="form">
            <el-form-item label="楼层名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="楼层编号" :label-width="formLabelWidth">
                <el-input v-model="form.floor" auto-complete="off" step="1" type="number"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleCancel">取 消</el-button>
            <el-button type="success" @click="handleSubmit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { Dialog, Form, FormItem, Button, Input } from 'jcloud-ele-ui';

export default {
    components: {
        'el-dialog': Dialog,
        'el-form': Form,
        'el-form-item': FormItem,
        'el-button': Button,
        'el-input': Input
    },
    props: ['visible', 'edit'],
    data () {
        return {
            formLabelWidth: '100px',
            form: {}
        };
    },
    created () {
        this.initForm();
        this.$on('set', val => {
            this.initForm();
            this.form = Object.assign(this.form, val || {});
        });
        this.$on('init', () => {
            this.initForm();
        });
    },
    computed: {
        title () {
            return `${this.edit ? '编辑' : '添加'}楼层信息`;
        }
    },
    methods: {
        initForm () {
            this.form = {
                id: undefined,
                name: '',
                floor: ''
            };
        },
        handleClose () {
            this.handleCancel();
        },
        handleCancel () {
            this.$emit('cancel');
        },
        handleSubmit () {
            this.$emit('submit', this.form);
        }
    }
};
</script>

<style>
.dialog .form {
    margin: 20px 40px 0 0;
}
</style>
