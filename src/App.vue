<template>
  <el-container>
    <el-header class="header" height="60px">
      <el-row :gutter="20">
        <el-col :span="6"><h3>我的网站</h3></el-col>
        <el-col :span="6" :offset="12">
          <span v-if="user"> {{user.name}}
            <el-button class="login" type="warning"  @click="logout">注销</el-button>
        </span>
          <el-button class="login" v-else type="success" @click="login">登录</el-button>        
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <router-view/>
      <!-- <data-table></data-table> -->
    </el-main>
  </el-container>
</template>

<script>
import DataTable from './components/DataTable'
export default {


  name: 'App',
  methods: {
            login () {
                this.$router.replace('/login')
            },
            logout(){
                this.$store.dispatch('logout').then(()=>{
                    this.$router.replace('/')
                })
            }
        },
        computed:{
            user(){
                return this.$store.state.user
            }
        },
        components: {
    DataTable
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
.header{
 background-color: #409EFF;
    color: white;
  
}
.login{
 margin: 10px;
}
.data-table{
  background-color: white
}
</style>
