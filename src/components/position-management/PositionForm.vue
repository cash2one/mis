<template>
    <el-dialog class="dialog" :title="title"  :visible.sync="visible" :before-close="handleClose">
        <el-form ref="form" class="form" :model="form" :rules="rules">
            <el-form-item label="位置名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商场" :label-width="formLabelWidth" prop="mallId">
                <el-select v-model="form.mallId" placeholder="" @change="handleStoreChange" class="select">
                    <el-option v-for="store in storeList" :key="store.id" :label="store.name" :value="store.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="楼层" :label-width="formLabelWidth">
                <el-select v-model="form.floorId" placeholder="" class="select">
                    <el-option v-for="floor in floorList" :key="floor.id" :label="floor.name" :value="floor.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="店铺" :label-width="formLabelWidth">
                <el-select v-model="form.shopId" placeholder="" class="select">
                    <el-option v-for="shop in shopList" :key="shop.id" :label="shop.name" :value="shop.id"></el-option>
                </el-select>
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
import { getFloorList } from '@/api/floor';
import { getShopList } from '@/api/shop';

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
    props: ['visible', 'edit', 'storeList'],
    data () {
        return {
            formLabelWidth: '100px',
            form: {},
            shopList: [],
            floorList: [],
            rules: {
                mallId: [
                    { type: 'integer', required: true, message: '请选择此位置所属商场', trigger: 'change' }
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
            return `${this.edit ? '编辑' : '添加'}位置信息`;
        }
    },
    methods: {
        initForm () {
            this.form = {
                id: undefined,
                name: '',
                mallId: '',
                floorId: '',
                shopId: ''
            };
            if(this.$refs.form)
                this.$refs.form.resetFields();
        },
        handleStoreChange () {
            const mallId = this.form.mallId;
            if (Number.isInteger(mallId)) {
                this.form.shopId = this.form.floorId = '';
                Promise.all([getFloorList([mallId]), getShopList([mallId])]).then(dataObjs => {
                    this.floorList = dataObjs[0].message.list;
                    this.shopList = dataObjs[1].message.list;
                });
            }
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
</style>
