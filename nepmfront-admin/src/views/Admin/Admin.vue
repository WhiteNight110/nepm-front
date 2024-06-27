<script setup>
import avatar from '@/assets/logo.png'
import { ArrowRight, Grid, List, UserFilled } from '@element-plus/icons-vue'
import { getFeedbackList } from '@/api/feedback';

</script>

<template>
    <el-container class="layout-container">
        <!-- 左侧菜单 -->
        <el-aside width="200px">
            <div class="el-aside__logo"></div>
            <el-menu active-text-color="#ffd04b" background-color="#232323" text-color="#fff" router>
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon>
                            <UserFilled/>
                        </el-icon>
                        <span>公众监督数据管理</span>
                    </template>
                    <el-menu-item index="/data/publicSupervisor">
                        <span>公众监督数据列表</span>
                    </el-menu-item>
                    <el-menu-item index="/data/requiredAQI">
                        <span>确认AQI数据列表</span>
                    </el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="2">
                    <template #title>
                        <el-icon>
                            <List />
                        </el-icon>
                        <span>统计数据管理</span>
                    </template>
                    <el-menu-item index="/count/provincialGrouping">
                        <span>省分组检查统计</span>
                    </el-menu-item>
                    <el-menu-item index="/count/aqiExponential">
                        <span>AQI指数分布统计</span>
                    </el-menu-item>
                    <el-menu-item index="/count/aqiTrend">
                        <span>AQI趋势分布统计</span>
                    </el-menu-item>
                    <el-menu-item index="/count/otherData">
                        <span>其他数据统计</span>
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item index="3">
                    <template #title>
                        <el-icon>
                            <Grid />
                        </el-icon>
                        <span>网格数据管理</span>
                    </template>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <!-- 右侧主区域 -->
        <el-container style="background-color: #f0f0f0;">
            <!-- 头部区域 -->
            <el-header class="header">
              <el-breadcrumb :separator-icon="ArrowRight" style="margin-bottom: 10px;" class="index">
                <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
                <el-breadcrumb-item>公众监督数据管理</el-breadcrumb-item>
                <el-breadcrumb-item>公众监督数据列表</el-breadcrumb-item>
              </el-breadcrumb>
              <div class="user-info">
                <div class="user-text">用户：<strong>acc</strong></div>
                <el-dropdown placement="bottom-end" class="dropdown-right">
                    <span class="el-dropdown__box">
                        <el-avatar :src="avatar" />
                        <el-icon>
                            <CaretBottom />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
                            <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
                            <el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
                            <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
              </div>
            </el-header>
            <!-- 中间区域 -->
            <el-main style="padding: 10px;">
                
                <router-view />
            </el-main>
            <!-- 底部区域 -->
            <el-footer style="height: 30px;">neusoft ©2024</el-footer>
        </el-container>
    </el-container>
</template>

<style scoped src="./style.css"></style>
