<template>
	<div class="wrapper">
		<div class="register-body">
            <div class="register-panel">
                <div class="register-title">注册</div>
                <el-form :model="registerForm" :rules="rules" ref="formDataRef">
                    <el-form-item prop="username">
                        <el-input v-model="registerForm.username"
                         placeholder="请输入用户名"
                          size="large">
                            <template #prefix>
                                <span class="iconfont icon-account"></span>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="registerForm.password" placeholder="请输入密码" size="large">
                            <template #prefix>
                                <span class="iconfont icon-password"></span>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="passwordCheck">
                        <el-input type="password" v-model="registerForm.passwordCheck" placeholder="请再次输入密码" size="large">
                            <template #prefix>
                                <span class="iconfont icon-password"></span>
                            </template>
                        </el-input>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(formDataRef)" :style="{width:'100%'}" >注册</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="goBack" :style="{width:'100%'}" >返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
	</div>
</template>
<script setup>
import { reactive, ref } from "vue"
import router from "@/router";
import { register } from "@/api/login";
import { ElMessage } from "element-plus";
const registerForm = reactive({
    username: '',
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

const goBack = () => {
    router.go(-1);
};
const rules = {
    username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    passwordCheck: [
    { required: true, message: '请再次输入密码', trigger: 'blur' }
    ]
};
</script>
<style scoped>
.wrapper {
    width: 100%;
    height: 100%;
}
.register-body {
    width: 100%;
    height: 100%;
    background-image: url('@/assets/login-bg.png');
    background-size: cover;
    background-position: center;
}
.register-body .register-panel {
    width: 300px;
    height: calc(43vh);
    float: right;
    margin-top: 200px;
    margin-right: 200px;
    padding: 20px;
    border-radius: 5px;
    background-color: rgb(255, 255, 255,0.7);
    box-shadow: 2px 2px 10px #ddd;
}

.register-body .register-title{
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
}

.check-code-panel {
    width: 100%;
    display: flex;
    text-align: center;
    
}
.input-panel{
    flex: 1;
    margin-right: 5px;
}
.check-code{
    cursor: pointer;
}

</style>