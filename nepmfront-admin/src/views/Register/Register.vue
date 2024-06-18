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
                </el-form>
            </div>
        </div>
	</div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>