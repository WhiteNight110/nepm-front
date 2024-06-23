<script setup>
import {
    Pointer,
    Document,
    User,
    Iphone,
    Location,
    Notebook,
    Calendar,
    Warning,
    
} from '@element-plus/icons-vue'
import { ref } from 'vue'
import { provinceAndCityData } from 'element-china-area-data';
    const radio = ref(0)
    const aqiLevel = ref('')
    const feedbackDate = ref('')
    const selectedOptions = ref([])
    const dialogVisible = ref(false)
    const selectItem = ref([{id:13,realName:'李四',province:'辽宁省',city:'大连市',estimatedGrade:'优',afDate:'2021-09-02',afTime:'13:00'}])
    const feedbackList = ref([{id:12,province:'辽宁省',city:'沈阳市',aqiGrade:'良（一）',afDate:'2021-09-01',afTime:'12:00',gridName:'李四',supervisorName:'张三'},
        {id:13,province:'辽宁省',city:'大连市',aqiGrade:'优（一）',afDate:'2021-09-02',afTime:'13:00',gridName:'李四',supervisorName:'张三'},
        {id:14,province:'辽宁省',city:'鞍山市',aqiGrade:'轻度污染（三）',afDate:'2021-09-03',afTime:'14:00',gridName:'李四',supervisorName:'张三'},
        {id:11,province:'辽宁省',city:'抚顺市',aqiGrade:'中度污染（四）',afDate:'2021-09-04',afTime:'15:00',gridName:'李四',supervisorName:'张三'},
        {id:15,province:'辽宁省',city:'本溪市',aqiGrade:'重度污染（五）',afDate:'2021-09-05',afTime:'16:00',gridName:'李四',supervisorName:'张三'},
        {id:16,province:'辽宁省',city:'丹东市',aqiGrade:'严重污染（六）',afDate:'2021-09-06',afTime:'17:00',gridName:'李四',supervisorName:'张三'},
        {id:17,province:'辽宁省',city:'锦州市',aqiGrade:'优（一）',afDate:'2021-09-07',afTime:'18:00',gridName:'李四',supervisorName:'张三'},
        {id:18,province:'辽宁省',city:'营口市',aqiGrade:'良（二）',afDate:'2021-09-08',afTime:'19:00',gridName:'李四',supervisorName:'张三'},
    ])
    const handleChangeGrid = () =>{
        //获取列表
        let list = selectedOptions.value
        console.log(list)
        if(list === undefined || list.length == 0){
            console.log("省市未选择")
        }else if(list.length == 1){
            console.log("省市选择了省,代码为",list[0])
        }else if(list.length == 2){
            console.log("省市选择了市,省代码为",list[0],"市代码为",list[1])
        }
    }
    const aqiLevelOptions = [
        {value: '1',label: '优（一级）'},
        {value: '2',label: '良（二级）'},
        {value: '3',label: '轻度污染（三级）'},
        {value: '4',label: '中度污染（四级）'},
        {value: '5',label: '重度污染（五级）'},
        {value: '6',label: '严重污染（六级）'}
    ]
    const handleDetail = (row) =>{
        dialogVisible.value = true;
        console.log("详情",row)
    }
    const handleAssign = (row) =>{
        console.log("指派",row)
    }
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <div class="cascader">
                    <span class="text">省市</span>
                    <el-cascader
                        size="default"
                        placeholder="全部"
                        :options="provinceAndCityData"
                        clearable="true"
                        v-model="selectedOptions"
                        :props="{ expandTrigger: 'hover', checkStrictly: true }"
                        @change="handleChangeGrid">
                    </el-cascader>
                </div>
                <div class="flex-item">
                    <span class="text">确认日期</span>
                    <el-date-picker
                        v-model="feedbackDate"
                        type="date"
                        placeholder="全部"
                        style="width: 130px"
                    />
                </div>
                <div class="button">
                    <el-button type="danger">清空</el-button>
                    <el-button type="primary">查询</el-button>
                </div>
				
				<el-radio-group v-model="radio">
					<el-radio :value="0">未指派</el-radio>
					<el-radio :value="1">已指派</el-radio>
				</el-radio-group>
            </div>
        </template>
        <el-table :data="feedbackList" class="table">
            <el-table-column label="编号" width="100" prop="id" align="center"> </el-table-column>
            <el-table-column label="所在省" prop="province" align="center"></el-table-column>
            <el-table-column label="所在市" prop="city" align="center"></el-table-column>
            <el-table-column label="AQI等级" prop="aqiGrade" align="center"></el-table-column>
            <el-table-column label="确认日期" prop="afDate" align="center"></el-table-column>
            <el-table-column label="确认时间" prop="afTime" align="center"></el-table-column>
            <el-table-column label="网格员" prop="gridName" align="center"></el-table-column>
            <el-table-column label="反馈者" prop="supervisorName" align="center"></el-table-column>
            <el-table-column label="操作" width="100" align="center">
                <template #default="scope">
                    <el-button :icon="Document" circle plain type="primary" @click="handleDetail(scope.row)" ></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>

        <el-dialog v-model="dialogVisible">
            <el-descriptions
                title="Vertical list with border"
                :column="1"
                :size="size"
                border
            >
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon style="margin: 5px;"><user /></el-icon>
                            <span class="dialog-text">公众监督反馈者编号</span>
                        </div>
                    </template>
                    kooriookami
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon style="margin: 5px;"><document /></el-icon>
                            <span class="dialog-text">反馈者信息</span>
                        </div>
                    </template>
                    18100000000
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon style="margin: 5px;"><iphone /></el-icon>
                            <span class="dialog-text">反馈者联系电话</span>
                        </div>
                    </template>
                    18100000000
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon style="margin: 5px;"><Location /></el-icon>
                            <span class="dialog-text">反馈信息所在地址</span>
                        </div>
                    </template>
                    18100000000
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon style="margin: 5px;"><Notebook /></el-icon>
                            <span class="dialog-text">反馈信息描述</span>
                        </div>
                    </template>
                    18100000000
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon style="margin: 5px;"><Warning /></el-icon>
                            <span class="dialog-text">预估等级</span>
                        </div>
                    </template>
                    18100000000
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon style="margin: 5px;"><Calendar /></el-icon>
                            <span class="dialog-text">反馈日期时间</span>
                        </div>
                    </template>
                    <el-tag size="small">2024-07-19</el-tag>
                </el-descriptions-item>
            </el-descriptions>
        </el-dialog>

        <template #footer>
            <div class="footer">
                <el-pagination background layout="prev, pager, next" hide-on-single-page:true :page-size="7" :total="11" />
            </div>
        </template>
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
.cascader{
    display: flex;
    align-items: center;
}
.text{
    margin-right: 10px;
}
.button{
    display: flex;
    align-items: center;
    gap: 20px;
}
.footer{
    display: flex;
    justify-content: center;
    padding-top: 0px;
    padding-bottom: 0px;
    padding-left: 20px;
    padding-right: 20px;
}
.table{
    width: 100%;
    padding-top: 0px;
    padding-bottom: 0px;
}
#footer{
    padding-top: 0px;
    padding-bottom: 0px;
}
.dialog-text{
    align-self: center;
}
.cell-item{
    display: flex;
}
</style>
