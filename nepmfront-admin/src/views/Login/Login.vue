<template>
	<div class="wrapper">
		<div class="login-body">
            <div class="login-panel">
                <div class="login-title">登录</div>
                <el-form :model="loginForm">
                    <el-form-item label="手机号码" prop="userId">
                        <el-input v-model="loginForm.userId" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="验证码" prop="code">
                        <el-input v-model="loginForm.code" placeholder="请输入验证码"></el-input>
                        <el-button type="info" @click="getCode" :disabled="isDisabled">{{codeText}}</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-model="loginForm.checked">记住密码</el-checkbox>
                    </el-form-item> -->
                    <el-form-item>
                        <el-button type="success" @click="register">注册</el-button>
                        <el-button type="primary" @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
	</div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>