<template>
    <el-dialog class="dialog" title="分配权限" :visible.sync="visible" :before-close="handleClose">
        <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :default-checked-keys="[]"
            :props="defaultProps"
            ref="tree">
        </el-tree>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleCancel">取 消</el-button>
            <el-button type="success" @click="handleSubmit('ruleForm')">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { Dialog, Button, Tree } from 'jcloud-ele-ui';
import { getPmsTree,getRolePms,configPms } from '@/api/authority';
export default {
    components: {
        'el-dialog': Dialog,
        'el-button': Button,
        'el-tree': Tree
    },
    props: ['visible'],
    data () {
        return {
            id:'',
            data: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        };
    },
    created () {
        this.$on('init', (id) => {
            this.id = id;
            this.getRolePms();
        });
        this.getPmsTree();
    },
    methods: {
        // 获取权限树
        getPmsTree () {
            getPmsTree().then(dataObj => {
                if(dataObj.status == 'success') {
                    this.data = dataObj.message.list;
                }
            }).catch(err => {
                throw err;
            });
        },
        // 获取用户权限
        getRolePms () {
            getRolePms([this.id]).then(dataObj => {
                if(dataObj.status == 'success') {
                    this.$refs.tree.setCheckedKeys(dataObj.message.list);
                }
            }).catch(err => {
                throw err;
            });
        },
        initForm () {
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
        handleSubmit () {
            configPms([this.id],{permissionIds:this.$refs.tree.getCheckedKeys()},'form').then(dataObj => {
                if(dataObj.status == 'success') {
                    this.$emit('submit');
                }
            }).catch(err => {
                throw err;
            });
        }
    }
};
</script>

<style>
.dialog .form {
    margin: 20px 40px 0 0;
}
</style>
