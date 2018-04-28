<template>
    <el-dialog class="dialog" :title="title" :visible.sync="visible" :before-close="handleClose">
        <el-form :model="form" class="form" v-loading="loading">
            <el-form-item label="模板名称" :label-width="formLabelWidth" >
                <el-input v-model="form.name" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="短信内容" :label-width="formLabelWidth">
                <el-input v-model="form.message" type="textarea" auto-complete="off" :autosize="{ minRows: 2 }" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item v-show="isAppeal" label="申诉理由" :label-width="formLabelWidth">
                <el-input v-model="form.appealReason" type="textarea" auto-complete="off" :autosize="{ minRows: 2 }" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="申诉" :label-width="formLabelWidth">
                <span>{{ isAppeal ? '是' : '否' }}</span>
            </el-form-item>
            <!-- <el-form-item label="审批时间" :label-width="formLabelWidth" class="form-text-item">
                <span>{{ form.approvalTime | time }}</span>
            </el-form-item>
            <el-form-item label="审批人" :label-width="formLabelWidth" class="form-text-item">
                <span>{{ form.approvaler }}</span>
            </el-form-item> -->
            <el-form-item label="审批意见" :label-width="formLabelWidth">
                <el-select v-model="form.approvalResult" placeholder="" class="select">
                    <el-option v-for="result in resultOptions" :key="result.value" :label="result.label" :value="result.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="form.approvalResult" label="驳回原因" :label-width="formLabelWidth">
                <el-select allow-create filterable v-model="form.approvalReason" placeholder="" class="select">
                    <el-option v-for="(reason, i) in reasonOptions" :key="i" :label="reason" :value="reason"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleCancel">取 消</el-button>
            <el-button :loading="submitting" type="success" @click="handleSubmit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { Dialog, Form, FormItem, Button, Input, Select, Option, Message } from 'jcloud-ele-ui';

import { approvalMessage,getAppealMessage } from '@/api/shortMessage';

const resultOptions = [{
    value: 0,
    label: '通过'
}, {
    value: 1,
    label: '驳回'
}];

const reasonOptions = [
    '短信内容涉及营销',
    '内容涉及违法',
    '内容不符合要求文档描述'
];
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
    props: ['visible'],
    filters: {
        time (val) {
            if(!val)
                return '';
            const date = new Date(val);
            const Y = date.getFullYear();
            const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
            const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            const h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
            const m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
            const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return `${Y}-${M}-${D} ${h}:${m}:${s}`;
        }
    },
    data () {
        return {
            formLabelWidth: '100px',
            submitting: false,
            loading: false,
            resultOptions,
            reasonOptions,
            form: {
                id: undefined,
                mallId: undefined,
                name: '',
                message: '',
                approvalTime: '',
                status: '',
                appealReason: '',
                approvaler: '',
                approvalResult: resultOptions[0].value,
                approvalReason: ''
            }
        };
    },
    created () {
        this.$message = Message;
        this.initForm();
        this.$on('set', item => {
            if(item.modelStatus != 3) {
                this.initForm({
                    id: item.id,
                    mallId: item.mallid,
                    name: item.modelName || '',
                    message: item.modelContent || '',
                    approvalTime: item.approvalTime || '',
                    status: item.modelStatus,
                    approvaler: item.approvalerPin || ''
                });
                return;
            }
            this.loading = true;
            getAppealMessage([], {
                shortMessageId: item.id
            }).then(data => {
                const appeal = data.message.RejectShortMessage;
                this.initForm({
                    id: item.id,
                    mallId: item.mallid,
                    name: appeal.smName || '',
                    message: appeal.smContent || '',
                    approvalTime: appeal.approvalTime || '',
                    status: item.modelStatus,
                    approvaler: appeal.approvaler || '',
                    appealReason: appeal.appealReason || ''
                });
                this.$nextTick(() => this.loading = false);
            }).catch(err => {
                if(err.message) {
                    const message = err.message.exception === undefined ? err.message : err.message.exception;
                    this.$message({
                        type: 'error',
                        message: '获取申诉理由失败: ' + message
                    });
                }
                this.initForm({
                    id: item.id,
                    mallId: item.mallid,
                    name: item.modelName || '',
                    message: item.modelContent || '',
                    approvalTime: item.approvalTime || '',
                    status: item.modelStatus,
                    approvaler: item.approvalerPin || ''
                });
                this.$nextTick(() => this.loading = false);
            });
        });
    },
    computed: {
        title () {
            return `短信审批`;
        },
        isAppeal () {
            return this.form.status == 3;
        }
    },
    methods: {
        initForm (data = {}) {
            this.form = Object.assign({
                id: undefined,
                name: '',
                message: '',
                approvalTime: '',
                status: '',
                appealReason: '',
                approvaler: '',
                approvalResult: 0,
                approvalReason: ''
            }, data);
        },
        handleClose () {
            this.handleCancel();
        },
        handleCancel () {
            this.$nextTick(() => this.loading = false);
            this.initForm();
            this.$emit('close');
        },
        handleSubmit () {
            if(this.loading) {
                return;
            }
            this.submitting = true;
            const form = {
                shortMessageId: this.form.id,
                approvalStatus: this.form.approvalResult
            };
            // if(this.form.approvalResult) {
            form.approvalSug = this.form.approvalReason;
            // }
            approvalMessage([this.form.mallId], form).then(() => {
                this.$nextTick(() => this.submitting = false);
                this.initForm();
                this.$emit('close', true);
            }).catch(err => {
                if(err.message) {
                    const message = err.message.exception === undefined ? err.message : err.message.exception;
                    this.$message({
                        type: 'error',
                        message: '审批失败:' + message
                    });
                }
                this.$nextTick(() => this.submitting = false);
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
.dialog .el-form-item.form-text-item {
    margin-bottom: 0;
}
</style>
