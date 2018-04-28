<template>
    <el-dialog class="dialog" :title="title" :visible.sync="visible" :before-close="handleClose">
        <el-form :model="form" class="form">
            <el-form-item label="数据源" :label-width="formLabelWidth">
                <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="URL" :label-width="formLabelWidth">
                <el-input v-model="form.connectionUrl" auto-complete="off" type="url"></el-input>
            </el-form-item>
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="form.connectionUser" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="form.connectionPwd" auto-complete="off" type="password"></el-input>
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
            return `${this.edit ? '编辑' : '添加'}数据源信息`;
        }
    },
    methods: {
        initForm () {
            this.form = {
                id: undefined,
                name: '',
                connectionUrl: '',
                connectionUser: '',
                connectionPwd: ''
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
