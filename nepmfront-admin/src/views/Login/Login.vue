<template>
	<div class="wrapper">
		<div class="login-body">
            <div class="login-panel">
                <div class="login-title">登录</div>
                <el-form :model="loginForm" :rules="rules" ref="formDataRef">
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username"
                         placeholder="请输入用户名"
                          size="large">
                            <template #prefix>
                                <span class="iconfont icon-account"></span>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" size="large">
                            <template #prefix>
                                <span class="iconfont icon-password"></span>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="checkCode">
                        <div class="check-code-panel">
                            <el-input v-model="loginForm.checkCode" class="input-panel" placeholder="请输入验证码" size="large"></el-input>
                            <img class="check-code" :src="checkCodeUrl" @click="changeCheckCode">
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-model="loginForm.checked">记住密码</el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(formDataRef)" :style="{width:'100%'}" >登录</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="register" :style="{width:'100%'}" >注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
	</div>
</template>
<script setup>
    import { reactive, ref } from "vue"
    import { login, checkCaptcha } from "@/api/login";
    import router from "@/router";
    import { ElMessage } from "element-plus";
    import { useGlobalStore } from "@/stores/globalStore";
    import { useTokenStore } from "@/stores/token";

    const globalStore = useGlobalStore();
    const tokenStore = useTokenStore();

    const loginForm = reactive({
        username: '',
        password: '',
        checkCode: '',
        checked: false
    });
    const formDataRef = ref(null);

    const submitForm = () => {
        console.log("loginForm:",loginForm);
        formDataRef.value.validate(async(valid) => {
        if(!valid) return;
        //验证验证码
        let isChecked = false;
        checkCaptcha(loginForm).then(response => {
            console.log("response:",response);
            const { data,status } = response;
            if(status === 200) {
            isChecked = data;
            }else{
            ElMessage({message: data.data,type: 'error',})
            return;
            }
        })

        //验证码通过则发送登录请求
        if(!isChecked){
            login(loginForm).then(response => {
            console.log("response:",response);
            const { data } = response;
            if(data.code === 200) {
                //登陆成功则记录token并跳转到主页
                tokenStore.setToken(data.data);
                router.push('/admin');
            }else{
                //登陆失败则提示错误信息
                ElMessage({message: data.data,type: 'error',})
            }
            }).catch(error => {
            console.log(error);
            });
        }else{
            ElMessage({message: '验证码错误',type: 'error',})
            // changeCheckCode();
        }
        });
    };

    const checkCodeUrl = ref(globalStore.baseUrl + "admins/getCaptcha")

    const changeCheckCode = (event) => {
        checkCodeUrl.value = globalStore.baseUrl + "admins/getCaptcha?t="+new Date().getTime();
    }

    const register = () => {
        router.push('/register');
    }

    const rules = {
        username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        checkCode: [
        { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
    };  
</script>
<style scoped src="./style.css"></style>