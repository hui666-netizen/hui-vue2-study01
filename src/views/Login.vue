<template>
  <div>
    <el-card class="loginCard">
      <h3>系统登录</h3>
      <el-form ref="form" :model="LoginForm" :rules="rules" label-width="100px" class="loginForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="LoginForm.username" placeholder="请输入用户名" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="LoginForm.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submit">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// import Mock from 'mockjs'
import Cookie from 'js-cookie'
import { getMenu } from '@/api'
export default {
    name:'loginPage',
    data(){
        return{
            LoginForm:{
                username: '',
                password: ''
            },
            rules:{
              username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
              password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        }
    },
  methods:{
    submit() {
      // const token = Mock.Random.guid()
      // Cookie.set('token',token)
      this.$refs.form.validate((valid)=>{
        if(valid){
          getMenu(this.LoginForm).then(({data})=>{
            if(data.code === 20000){
              Cookie.set('token',data.data.token)
              this.$store.commit('setMenu',data.data.menu)
              this.$store.commit('addMenu', this.$router)
              this.$router.push({name:'home'})
            }else{
              this.$message({
                showClose: true,
                message: data.data.message,
                type: 'error'
              })
            }
          })
        }
      })
      
    }
  }
}
</script>

<style lang="less" scoped>
    .loginCard{
      width: 480px;
      padding: 20px;
      padding-left: 0;
      margin: 200px auto;
      text-align: center;
        h3 {
        
            margin-bottom: 30px;
          }
    }
</style>