<template>
    <el-dialog class="dialog" title="分配账号" :visible.sync="visible" :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="form">
            <el-form-item label="商场名称" label-width="100px">
                <el-input v-model="mallName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="账号" prop="userPins" label-width="100px">
                <el-input v-model="ruleForm.userPins"></el-input>
                <p class="note">注：多个用英文半角逗号隔开</p>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleCancel">取 消</el-button>
            <el-button type="success" @click="handleSubmit('ruleForm')">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { Dialog, Form, FormItem, Button, Input, Message } from 'jcloud-ele-ui';
import { assignAdmin } from '@/api/store';
export default {
    components: {
        'el-dialog': Dialog,
        'el-form': Form,
        'el-form-item': FormItem,
        'el-button': Button,
        'el-input': Input
    },
    props: ['visible'],
    data () {
        return {
            id:'',
            ruleForm: {
                userPins:''
            },
            // 校验规则
            rules: {
                userPins: [
                    {required: true, message: '请输入账号名称', trigger: 'blur'}
                ]
            },
            mallName:''
        };
    },
    created () {
        this.$message = Message;
        this.$on('init', (row) => {
            this.initForm(row);
            this.id = row.id;
            this.mallName = row.name;
        });
    },
    methods: {
        initForm (row) {
            if (this.$refs['ruleForm']!==undefined) {
                this.$refs['ruleForm'].resetFields();
            }
            this.ruleForm.userPins =row.operators;
        },
        // 关闭
        handleClose () {
            this.handleCancel();
        },
        // 取消
        handleCancel () {
            this.$emit('cancel');
        },
        // 确定
        handleSubmit (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    assignAdmin([this.id],this.ruleForm,'form').then(dataObj => {
                        if(dataObj.status == 'success') {
                            this.$emit('submit');
                        }
                    }).catch(err => {
                        this.$message({
                            type: 'error',
                            message: '操作失败: ' + err.message
                        });
                    });
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
.note{
    color: #dedede;
}
</style>
