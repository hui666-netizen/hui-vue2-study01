<template>
    <div class="manage">
        <el-dialog title="提示" :visible.sync="dialogVisible" :before-close="handleClose" width="50%">
            <el-form ref="form" :rules="rules" :model="form" label-width="80px" :inline="true">
                <el-form-item label="姓名" prop="name">
                    <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择性别">
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth">
                    <el-col>
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.birth" style="width: 100%;"
                            value-format="yyyy-MM-DD"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <div class="manage-header">
            <el-button type="primary" @click="handelAdd">+ 新增</el-button>
            <el-form :model="userForm" :inline="true">
                <el-form-item>
                    <el-input v-model="userForm.name" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="common-table">
            <el-table height="90%" :data="tableData" style="width: 100%" stripe>
                <el-table-column prop="name" label="姓名">

                </el-table-column>
                <el-table-column prop="sex" label="性别">
                    <template slot-scope="scope">
                        <span>{{ scope.row.sex === 1 ? "男" : "女" }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="age" label="年龄">

                </el-table-column>
                <el-table-column prop="birth" label="出生日期">

                </el-table-column>
                <el-table-column prop="addr" label="地址">

                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pager">
                <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePage">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { getUser, addUser, editUser, delUser } from '../api'
export default {
    name: 'USER',
    data() {
        return {
            dialogVisible: false,
            form: {
                name: '',
                age: '',
                sex: '',
                birth: '',
                addr: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名' }
                ],
                age: [
                    { required: true, message: '请输入年龄' }
                ],
                sex: [
                    { required: true, message: '请输入性别' }
                ],
                birth: [
                    { required: true, message: '请输入生日' }
                ],
                addr: [
                    { required: true, message: '请输入地址' }
                ],
            },
            tableData: [
                this.getList()
            ],
            modalType: 0,
            total: 0,
            pageData: {
                page: 1,
                limit: 10
            },
            userForm:{
                name:''
            }
        }
    },
    methods: {
        submit() {
            this.$refs.form.validate(valid => {
                if (valid === true) {
                    if (this.modalType === 0) {
                        addUser(this.form).then(() => {
                            this.getList()
                        })
                    } else {
                        editUser(this.form).then(() => {
                            this.getList()
                        })
                    }
                    this.dialogVisible = false
                    this.$refs.form.resetFields()
                }
            }
            )
        },
        handleClose() {
            this.$refs.form.resetFields()
            this.dialogVisible = false
        },
        cancel() {
            this.handleClose()
        },
        handleEdit(row) {
            this.modalType = 1
            this.dialogVisible = true
            this.form = JSON.parse(JSON.stringify(row))
        },
        handleDelete(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delUser({ id: row.id }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getList()
                })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        handelAdd() {
            this.modalType = 0
            this.dialogVisible = true
        },
        handlePage(val) {
            this.pageData.page = val
            this.getList()
        },
        onSubmit(){
            this.getList()
        },
        getList() {
            getUser({ params:{...this.userForm, ...this.pageData} }).then(({ data }) => {
                this.tableData = data.list
                this.total = data.count || 0
            })
        }
    }
}
</script>

<style lang="less" scoped>
.manage {
    height: 90%;
    .manage-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .common-table {
        position: relative;
        height: calc(100% - 64px);

        .pager {
            position: absolute;
            right: 20px;
            bottom: 0;
        }
    }

}
</style>