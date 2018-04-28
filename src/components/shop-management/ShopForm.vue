<template>
    <el-dialog :title="title" :visible.sync="visible" :before-close="handleClose">
        <el-form :model="form">
            <el-form-item label="店铺名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="行业" :label-width="formLabelWidth">
                <el-select v-model="form.industry" placeholder="请选择行业" style="width: 100%;">
                    <el-option v-for="(industry,index) in industryOptions" :key="index" :label="industry.label" :value="industry.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="店铺品类" :label-width="formLabelWidth">
                <el-select v-model="form.categoryId" filterable placeholder="请选择店铺品类" style="width: 100%;">
                    <el-option v-for="(category,index) in categoryList" :key="index" :label="category.name" :value="category.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="责任人" :label-width="formLabelWidth">
                <el-input v-model="form.incharge" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" :label-width="formLabelWidth">
                <el-input v-model="form.contact" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="onCancel">取 消</el-button>
            <el-button type="success" @click="onSubmit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { Dialog, Form, FormItem, Button, Input,Select, Option } from 'jcloud-ele-ui';
import { industryConfig } from '../config';

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
    props: ['visible', 'edit', 'categoryList'],
    data () {
        const industryOptions = Object.keys(industryConfig).map(key => {
            return {
                value: key,
                label: industryConfig[key]
            };
        });
        return {
            industryOptions,
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
            return `${this.edit ? '编辑' : '添加'}店铺`;
        }
    },
    methods: {
        initForm () {
            this.form = {
                id: -1,
                name: '',
                industry: '',
                incharge: '',
                contact: '',
                categoryId: null
            };
        },
        handleClose () {
            this.onCancel();
        },
        onCancel () {
            this.$emit('cancel');
        },
        onSubmit () {
            this.$emit('submit', this.form);
        }
    }
};
</script>
