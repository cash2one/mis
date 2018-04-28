<template>
    <el-dialog class="dialog" title="添加角色" :visible.sync="visible" :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="form">
            <el-form-item label="角色名称" prop="roleName" label-width="100px">
                <el-input v-model="ruleForm.roleName"></el-input>
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
import { addRole } from '@/api/authority';
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
            ruleForm: {
                roleName:''
            },
            // 校验规则
            rules: {
                roleName: [
                    {required: true, message: '请输入角色名称', trigger: 'blur'}
                ]
            }
        };
    },
    created () {
        this.$message = Message;
        this.$on('init', () => {
            this.initForm();
        });
    },
    methods: {
        initForm () {
            if (this.$refs['ruleForm']!==undefined) {
                this.$refs['ruleForm'].resetFields();
            }
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
                    addRole([],this.ruleForm,'form').then(dataObj => {
                        if(dataObj.status == 'success') {
                            this.$emit('submit');
                        }
                    }).catch(err => {
                        this.$message({
                            showClose: true,
                            message: err.message.exception,
                            type: 'error'
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
.el-message{left:50%;transform: translate(-50%);padding: 9px 10px;}
.el-message img{display: inherit;}
.el-message__group{padding-left: 40px;}
</style>