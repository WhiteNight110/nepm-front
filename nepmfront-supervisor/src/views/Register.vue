<template>
  <div class="wrapper">
    <!-- 手机端注册界面 -->
    <el-col :span="24" style="text-align: center">
      <img src="../assets/bg.png" alt="bg" class="img-bg" />
    </el-col>
    <div>
      <el-row>
        <el-col :span="24" style="text-align: center" >
          <h1 class="title">东软环保公众监督平台</h1>
          <div class="subtitle">
            <span class="line"></span>
            <span class="little-text">公众监督员端</span>
            <span class="line"></span>
          </div>
          
        </el-col>
      </el-row>
    </div>
    <div class="register-panel">
        <el-form :model="registerForm" label-width="auto" :rules="rules" ref="formDataRef">
            <el-form-item class="form-item" prop="telId" label="手机号" >
                <el-input v-model="registerForm.telId"
                  placeholder="请输入手机号"
                  size="large">
                </el-input>
            </el-form-item>
            <el-form-item class="form-item" prop="realName" label="真实姓名" >
                <el-input v-model="registerForm.realName"
                  placeholder="请输入真实姓名"
                  size="large">
                </el-input>
            </el-form-item>
            <el-form-item class="form-item" prop="age" label="年龄" >
                <el-input v-model="registerForm.age"
                  placeholder="请输入年龄"
                  size="large">
                </el-input>
            </el-form-item>
            <el-form-item class="form-item" prop="sex" label="性别">
              <el-radio-group v-model="registerForm.sex" class="ml-4" >
                <el-radio value="1" size="large">男</el-radio>
                <el-radio value="2" size="large">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="form-item" prop="birthday" label="出生日期">
              <el-date-picker
                v-model="registerForm.birthday"
                type="date"
                format="YYYY-MM-DD"
                placeholder="请选择出生日期"
              />
            </el-form-item>
            <el-form-item class="form-item" prop="password" label="密码">
                <el-input type="password" v-model="registerForm.password" placeholder="请输入密码" size="large">
                </el-input>
            </el-form-item>
            <el-form-item class="form-item" prop="passwordCheck" label="确认密码">
                <el-input type="password" v-model="registerForm.passwordCheck" placeholder="请再次输入密码" size="large">
                </el-input>
            </el-form-item>
            
            <el-form-item class="form-item">
                <el-button type="primary" @click="submitForm(formDataRef)" :style="{width:'100%'}" >注册</el-button>
            </el-form-item>
            <el-form-item class="form-item">
                <el-button type="primary" @click="back" :style="{width:'100%'}" >返回</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>
<script setup>
  import { reactive, ref } from 'vue';
  import { register } from '@/api/login';
  import { ElMessage } from 'element-plus';
  import router from '@/router';
  const registerForm = reactive({
      telId: '',
      realName: '',
      age: '',
      sex: '',
      birthday: '',
      password: '',
      passwordCheck: ''
  });
  const formDataRef = ref(null);

  const submitForm = () => {
    if(registerForm.password !== registerForm.passwordCheck) {
      console.log('两次密码不一致');
      return;
    }
    formDataRef.value.validate(async(valid) => {
      if(!valid) return;
      //验证通过则发送登录请求
      register(registerForm).then(response => {
        console.log("response:",response);
        const { data } = response;
        if(data.code === 200) {
          ElMessage({message: data.message,type: 'success',})
          router.push('/login');
        }else{
          ElMessage({message: data.message,type: 'error',})
        }
        
      }).catch(error => {
        console.log(error);
      });
    });
  };
  const rules = {
    telId: [
      { required: true, message: '请输入手机号', trigger: 'blur' }
    ],
    realName: [
      { required: true, message: '请输入真实姓名', trigger: 'blur' }
    ],
    age: [
      { required: true, message: '请输入年龄', trigger: 'blur' }
    ], 
    sex: [
      { required: true, message: '请选择性别', trigger: 'blur' }
    ],
    birthday: [
      { required: true, message: '请选择出生日期', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    passwordCheck: [
      { required: true, message: '请再次输入密码', trigger: 'blur' }
    ]
  };
  const back = () => {
    router.go(-1);
  };
</script>
<style scoped>
.wrapper {
  background-color: #c5e9ea;
  width: 100vw;
  height: 100vh;
  display: relative;
}
.img-bg{
  width: 100vw;
  border-radius: 0 0 50% 50% / 0 0 20% 20%;;
}
.register-panel{
  
  width:90vw;
  margin: 0 auto;
}

.form-item{
  margin-bottom: 1vh;
}
.input{
  height: 5vh;
}
.title{
  color: #04e35a;

}
.subtitle{
  margin: 2vh 0;
}
.line{
    border:1px solid #04a0e3;
    vertical-align: middle;
    display:inline-block;
    width:70px;
}
.little-text{
  font-size: 18px;
  color: #04a0e3;
  margin:0 1vw;
}
</style>