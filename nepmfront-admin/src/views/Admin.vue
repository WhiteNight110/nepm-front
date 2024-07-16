<script setup>
import avatar from '@/assets/logo.png'
import { ArrowRight, Grid, List, UserFilled } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router';
import { useTokenStore } from '@/stores/token';
import router from "@/router";
import { computed, onMounted } from 'vue'
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/user';
const route = useRoute()
const username = ref('')
const pathList = ref()
const avatarUrl = ref('https://avatars.githubusercontent.com/u/37282000?v=4')
const previewAvatarUrl = ref(avatarUrl.value);
onMounted(() => {
  username.value = useUserStore().userCode
  getCurrentPath()
})

const getCurrentPath = () => {
    console.log('route.matched',route.matched);
    pathList.value = route.matched.filter(item => item.meta && item.meta.title);
    console.log('pathList',pathList.value);
}

watch(route, (to, from) => {
    pathList.value = to.matched.filter(item => item.meta && item.meta.title);
    console.log('to',to);
    console.log('from',from);
    console.log('pathList',pathList.value);
}, { immediate: true });
const isRouteMatched = computed(() => {
  const matchedRoutes = ['/data/publicSupervisor', '/data/requiredAQI', '/count/provincialGrouping', '/count/aqiExponential', '/count/aqiTrend', '/count/otherData']
  return matchedRoutes.includes(route.path)
})
const handleCommand = async (command) => {
  switch (command) {
    case 'avatar':        
        const files = await window.showOpenFilePicker({
            types: [{
                description: 'Images',
                accept: {
                    'image/*': ['.png', '.gif', '.jpeg', '.jpg', '.webp']
                }
            }],
            multiple: false
        });
        if (!files || files.length === 0) {
          console.error('请选择要上传的文件');
          return;
        }

        const fileHandle = files[0];
        const file = await fileHandle.getFile();
        console.log('选中文件:', file);

        const reader = new FileReader();
        reader.onload = (e) => {
          previewAvatarUrl.value = e.target.result;
          avatarUrl.value = previewAvatarUrl.value;
        };
        reader.readAsDataURL(file);

        
        break
    case 'logout':
        router.push('/login')
        useTokenStore().removeToken()
        useUserStore().removeuserCode()
        break
  }
}
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
            </el-menu>
        </el-aside>
        <!-- 右侧主区域 -->
        <el-container style="background-color: #f0f0f0;">
            <!-- 头部区域 -->
            <el-header class="header">
              <!-- 面包屑 -->
              <el-breadcrumb :separator-icon="ArrowRight" style="margin-bottom: 10px;" class="breadcrumb">
                <el-breadcrumb-item :to="item.path" v-for="item in pathList" :key="item.id">{{ item.meta.title }}</el-breadcrumb-item>
              </el-breadcrumb>

              <div class="user-info">
                <div class="user-text">用户：<strong>{{ username }}</strong></div>
                <el-dropdown placement="bottom-end" class="dropdown-right">
                    <span class="el-dropdown__box">
                        <el-avatar :src="avatarUrl" />
                        <el-icon>
                            <CaretBottom />
                        </el-icon>
                    </span>
                    <template #dropdown >
                        <el-dropdown @command="handleCommand">
                            <el-dropdown-menu >
                                <el-dropdown-item command="avatar">更换头像</el-dropdown-item>
                                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        
                    </template>
                </el-dropdown>
              </div>
            </el-header>
            <!-- 中间区域 -->
            <el-main style="padding: 0;">
                <div v-if="!isRouteMatched" class="background-image-container">
                    <div class="background-image"></div>
                </div>
                <router-view v-else style="margin: 5px;" />
            </el-main>
            <!-- 底部区域 -->
            <el-footer style="height: 30px;">neusoft ©2024</el-footer>
        </el-container>
    </el-container>
</template>

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
.layout-container {
    height: 100vh;
}
.breadcrumb{
    cursor: pointer;
    margin: 10px 0; 
    display:inline-block;
    margin-left: 10px; 
}
.el-aside {
    background-color: #232323;
}

.el-aside__logo {
    height: 120px;
    background: url('@/assets/logo.png') no-repeat center / 120px auto;
    text-align: center;
    margin-top: 10px;
}

.el-aside .el-menu {
    border-right: none;
}

.el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    padding-right: 20px;
    justify-content: space-between;
}

.el-header .index {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-grow: 1;
  margin-top: 10px;
}

.user-info {
    display: flex;
    align-items: center;
}

.user-text {
    margin-right: 30px;
}

.el-header .el-dropdown__box {
    display: flex;
    align-items: center;
}

.el-header .el-dropdown__box .el-icon {
    color: #999;
    margin-left: 10px;
}

.el-header .el-dropdown__box:active,
.el-header .el-dropdown__box:focus {
    outline: none;
}

.el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
}
.background-image-container {
    display: flex; 
    justify-content: center; 
    align-items: center;
}
.background-image{
    position: absolute;
    top: 50%;
    left: 57%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 50%;
    background-image: url('@/assets/background.png');
    background-size: contain; /* 使图片包含在容器内 */
    background-position: center; /* 使图片居中 */
    background-repeat: no-repeat; /* 不重复图片 */
}
</style>
