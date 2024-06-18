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
                            <!-- <img class="check-code" :src="checkCodeUrl" @click="getCode"> -->
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
<script src="./script.js"></script>
<style scoped src="./style.css"></style>