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
                            <img class="check-code" :src="codeValue" @click="changeCheckCode">
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
    import { onMounted } from "vue"
    import { login, getCaptcha, checkCaptcha } from "@/api/login";
    import router from "@/router";
    import { ElMessage } from "element-plus";
    import { useTokenStore } from "@/stores/token";
    import { useUserStore } from "@/stores/user";

    const tokenStore = useTokenStore();
    const userStore = useUserStore();
    const codeValue = ref('');
    const loginForm = reactive({
        username: '',
        password: '',
        checkCode: '',
        codeKey: '',
        checked: false
    });
    const formDataRef = ref(null);

    onMounted(() => {
        getCaptcha().then(response => {
            console.log("response:",response);
            const { data } = response;
            loginForm.codeKey = data.codeKey;
            codeValue.value = data.codeValue;
        })
    })

    const submitForm = () => {
        console.log("loginForm:",loginForm);
        formDataRef.value.validate(async(valid) => {
            if(!valid) return;
            //验证验证码
            var isChecked = false;
            // login(loginForm).then(response => {
            //             console.log("response:",response);
            //             const { data } = response;
            //             if(data.code === 200) {
            //                 //登陆成功则记录token并跳转到主页
            //                 tokenStore.setToken(data.data);
            //                 router.push('/admin');
            //             }else{
            //                 //登陆失败则提示错误信息
            //                 ElMessage({message: data.message,type: 'error',})
            //             }
            //             }).catch(error => {
            //             console.log(error);
            //             });
            checkCaptcha(loginForm).then(response => {
                console.log("response:",response);
                const { data,status } = response;
                if(status === 200) {
                    if(data==true){
                        login(loginForm).then(response => {
                        console.log("response:",response);
                        const { data } = response;
                        if(data.code === 200) {
                            //登陆成功则记录token并跳转到主页
                            tokenStore.setToken(data.data);
                            userStore.setuserCode(loginForm.username);
                            router.push('/admin');
                        }else{
                            //登陆失败则提示错误信息
                            ElMessage({message: data.message,type: 'error',})
                        }
                        }).catch(error => {
                        console.log(error);
                        });
                    }else{
                        ElMessage({message: '验证码错误',type: 'error',})
                    }
                }else{
                    ElMessage({message: data.message,type: 'error',})
                    return;
                }
            })
        });
    };

    const changeCheckCode = (event) => {
        getCaptcha().then(response => {
            console.log("response:",response);
            const { data } = response;
            loginForm.codeKey = data.codeKey;
            codeValue.value = data.codeValue;
        })
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
<style scoped>
.wrapper {
    width: 100%;
    height: 100%;
}
.login-body {
    width: 100%;
    height: 100%;
    background-image: url('@/assets/login-bg.png');
    background-size: cover;
    background-position: center;
}
.login-body .login-panel {
    width: 300px;
    height: calc(50vh);
    float: right;
    margin-top: 200px;
    margin-right: 200px;
    padding: 20px;
    border-radius: 5px;
    background-color: rgb(255, 255, 255,0.7);
    box-shadow: 2px 2px 10px #ddd;
}

.login-body .login-title{
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
    flex: 0.7;
    cursor: pointer;
    height: 38px;
}
</style>