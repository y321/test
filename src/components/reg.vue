<template>
    <el-row type="flex" justify="center">
        <el-form :model="currentuser" ref="todoEditForm" :rules="rules" status-icon  label-width="80px">
            <el-form-item label="用户名" prop="name">
            <el-input v-model="user.name" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="user.pass" placeholder="密码" ></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="mail">
                <el-input type="mail"  placeholder="邮箱" ></el-input>
            </el-form-item>
            </el-form-item>
            <el-form-item>
                    <el-button type="primary" icon="el-icon-upload" @click="reg">注册</el-button>
            </el-form-item>
        </el-form>
    </el-row>
</template>
``
<script>
export default{
    data() {
        return{
            data: [],
            searchStr: '',
            filterType: '',
            filterDates: null,  // 新增
            user: {},
                
        }
    },
    methods: {
        
        reg(){
             this.$ajax.post('/users/reg',this.user).then((res)=>{
                  if (res.data) this.data.push(res.data)
                  this.$notify({
                                type:'success',
                                message:'注册成功！'+ this.user.name,
                                duration:2000
                            })
                  this.$router.replace('/')
             }).catch((err) => this.$notify({
                type: 'error',
                message: err
             }))
        },
        
    }
   
}
</script>