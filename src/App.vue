<template>
  <el-container>
    <el-header class="header" height="60px">
      <h3>我的网站</h3>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
.el-header{
 background-color: #409EFF;
    color: white;
  
}
</style>
