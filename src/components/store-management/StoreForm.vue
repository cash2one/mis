<template>
    <el-dialog class="dialog" :title="title" :visible.sync="visible" :before-close="handleClose">
        <el-form ref="form" :model="form" class="form" :rules="rules">
            <el-form-item label="商场名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="地址" :label-width="formLabelWidth">
                <el-input v-model="form.address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商场管理员" :label-width="formLabelWidth">
                <el-input v-model="form.operators" auto-complete="off" placeholder="多个管理员用逗号隔开"></el-input>
                <!-- <span class="info-text">多个管理员用逗号隔开</span> -->
            </el-form-item>
            <el-form-item label="数据源" :label-width="formLabelWidth">
                <el-select v-model="form.datasourceId" placeholder="" class="select">
                    <el-option v-for="datasrc in datasourceList" :key="datasrc.id" :label="datasrc.name" :value="datasrc.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="数据主题" :label-width="formLabelWidth" prop="topicName">
                <el-input v-model="form.topicName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="主题创建者" :label-width="formLabelWidth">
                <el-input v-model="form.owner" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleCancel">取 消</el-button>
            <el-button type="success" @click="handleSubmit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { Dialog, Form, FormItem, Button, Input, Select, Option } from 'jcloud-ele-ui';

export default {
    components: {
        'el-dialog': Dialog,
        'el-form': Form,
        'el-form-item': FormItem,
        'el-button': Button,
        'el-input': Input,
        'el-select': Select,
        'el-option': Option
    },
    props: ['visible', 'edit', 'datasourceList'],
    data () {
        return {
            formLabelWidth: '100px',
            form: {},
            rules: {
                topicName: [
                    { type: 'string', required: true, message: '请输入采集数据主题名称', trigger: 'change' }
                ]
            }
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
            return `${this.edit ? '编辑' : '添加'}商场信息`;
        }
    },
    methods: {
        initForm () {
            this.form = {
                id: undefined,
                name: '',
                address: '',
                datasourceId: '',
                owner: this.$cookie.get('pin'),
                topicName: ''
            };
            if(this.$refs.form)
                this.$refs.form.resetFields();
        },
        handleClose () {
            this.handleCancel();
        },
        handleCancel () {
            this.$emit('cancel');
        },
        handleSubmit () {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.$emit('submit', this.form);
                }
            });
        }
    }
};
</script>

<style>
.dialog .form {
    margin: 20px 40px 0 0;
}

.dialog .select {
    width: 100%;
}
.dialog .el-form-item .info-text {
    position: absolute;
    color: red;
    left: 0;
    top: 30px;
}
</style>
