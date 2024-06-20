<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'
import { ref } from 'vue'
import { provinceAndCityData } from 'element-china-area-data';
    const radio = ref(0)
    const categorys = ref([
        {
            "id": 3,
            "categoryName": "美食",
            "categoryAlias": "my",
            "createTime": "2023-09-02 12:06:59",
            "updateTime": "2023-09-02 12:06:59"
        },
        {
            "id": 4,
            "categoryName": "娱乐",
            "categoryAlias": "yl",
            "createTime": "2023-09-02 12:08:16",
            "updateTime": "2023-09-02 12:08:16"
        },
        {
            "id": 5,
            "categoryName": "军事",
            "categoryAlias": "js",
            "createTime": "2023-09-02 12:08:33",
            "updateTime": "2023-09-02 12:08:33"
        }
    ])
    const handleChange = () =>{
        console.log(selectedOptions)
    }
    const selectedOptions = ref([])
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <div class="cascader">
                    <span>省市</span>
                    <el-cascader
                        size="default"
                        placeholder="全部"
                        :options="provinceAndCityData"
                        clearable="true"
                        v-model="selectedOptions"
                        :props="{ expandTrigger: 'hover', checkStrictly: true }"
                        @change="handleChange">
                    </el-cascader>
                </div>
                <div class="flex-item">
                    <span>预估等级</span>
                    <el-select v-model="value" clearable placeholder="Select" style="width: 100px">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </div>
                <div class="flex-item">
                    <span>反馈日期</span>
                    <el-select v-model="value" clearable placeholder="Select" style="width: 100px">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </div>
				<el-button type="danger">清空</el-button>
				<el-button type="primary">查询</el-button>
				<el-radio-group v-model="radio">
					<el-radio :value="0">未指派</el-radio>
					<el-radio :value="1">已指派</el-radio>
				</el-radio-group>
            </div>
        </template>
        <el-table :data="categorys" style="width: 100%">
            <el-table-column label="序号" width="100" type="index"> </el-table-column>
            <el-table-column label="反馈者姓名" prop="??????"></el-table-column>
            <el-table-column label="所在省" prop="??????"></el-table-column>
            <el-table-column label="所在市" prop="??????"></el-table-column>
            <el-table-column label="预估污染等级" prop="??????"></el-table-column>
            <el-table-column label="反馈日期" prop="??????"></el-table-column>
            <el-table-column label="反馈时间" prop="??????"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" ></el-button>
                    <el-button :icon="Delete" circle plain type="danger"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
    </el-card>
</template>
 
<style scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;
}

.page-container .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}



</style>
