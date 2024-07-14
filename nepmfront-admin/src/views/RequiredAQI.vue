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
import { ref,onMounted, reactive } from 'vue'
import { provinceAndCityData, codeToText } from 'element-china-area-data';
import { getListStatisticsPage } from '@/api/data';
import { ElMessage } from 'element-plus';
    onMounted(() => {
        query({});
    });
    const aqiLevel = ref('')
    const requiredDate = ref('')
    const selectedOptions = ref([])
    const dialogSelectedOptions = ref([])
    const dialogVisible = ref(false)
    const currentPage = ref(1)
    const pageSize = ref(0)
    const total = ref(0)
    const selectItem = ref(null)
    const statisticsList = ref([])
    const dialogTitle = ref('数据详情')
    const queryForm = reactive({
        province: '',
        city: '',
        aqiGrade: '',
        confirmDate: ''
    })
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
        '优（一级）',
        '良（二级）',
        '轻度污染（三级）',
        '中度污染（四级）',
        '重度污染（五级）',
        '严重污染（六级）'
    ]
    const query = (data) =>{
        console.log("data:",data)
        getListStatisticsPage(data).then(res => {
            pageSize.value = res.data.data.pageSize;
            total.value = res.data.data.total;
            currentPage.value = res.data.data.pageNum;
            statisticsList.value = res.data.data.list;
            console.log("statisticsList",statisticsList.value)
            //将列表中的省市代码转换为文字
            statisticsList.value.forEach(item => {
                item.province = codeToText[item.province]
                item.city = codeToText[item.city]
            })
        })
    }
    const handleDetail = (row) =>{
        console.log("详情",row)
        selectItem.value = row;
        dialogTitle.value = '反馈详情';
        dialogVisible.value = true;
    }
    const handlepageChange = (newPage) => {
        currentPage.value = newPage;
        let data = { page: currentPage.value, size: pageSize.value }
        if(selectedOptions.value.length==1){
            data.provinceId = selectedOptions.value[0]
        }else{
            data.cityId = selectedOptions.value[1]
        }
        if(requiredDate.value!=''){
            data.confirmDate = requiredDate.value
        }
        if(queryForm.estimatedGrade!=''){
            data.estimatedGrade = queryForm.estimatedGrade
        }
        query(data);
    };
    const handleSizeChange = (newSize) => {
        pageSize.value = newSize;
        let data = { page: currentPage.value, size: pageSize.value }
        if(selectedOptions.value.length==1){
            data.provinceId = selectedOptions.value[0]
        }else{
            data.cityId = selectedOptions.value[1]
        }
        if(requiredDate.value!=''){
            data.confirmDate = requiredDate.value
        }
        if(queryForm.estimatedGrade!=''){
            data.estimatedGrade = queryForm.estimatedGrade
        }
        query(data);
    };
    const getAqiLevelColor = (level) => {
        switch (level) {
            case 0: return 'lightgreen';
            case 1: return 'lightblue';
            case 2: return 'orange';
            case 3: return 'brown';
            case 4: return 'red';
            case 5: return 'purple';
            default: return 'black';
        }
    }
    //重置查询表单数据
    const reset = () => {
        queryForm.province = ''
        queryForm.city = ''
        queryForm.aqiGrade = ''
        queryForm.confirmDate = ''
        requiredDate.value = ''
        selectedOptions.value = []
        query({})
    }
    //根据查询表单查询
    const queryByForm = () => {
        let data = {size: pageSize.value}
        if(selectedOptions.value.length==1){
            data.provinceId = selectedOptions.value[0]
        }else{
            data.cityId = selectedOptions.value[1]
        }
        if(requiredDate.value!=''){
            data.confirmDate = requiredDate.value
            console.log(data.confirmDate)
        }
        console.log('aqiGrade:',queryForm.aqiGrade)
        if(queryForm.aqiGrade !== null && queryForm.aqiGrade !== undefined && queryForm.aqiGrade !== ''){
            data.aqiLevel = queryForm.aqiGrade
        }
        console.log(data)
        query(data)
    }
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <el-form :inline="true" :model="queryForm" class="demo-form-inline" style="width: 100%">
                    <el-form-item class="flex-item" label="省市">
                        <el-cascader
                            size="default"
                            placeholder="全部"
                            :options="provinceAndCityData"
                            clearable
                            v-model="selectedOptions"
                            :props="{ expandTrigger: 'hover', checkStrictly: true }"
                            @change="handleChangeGrid">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item class="flex-item" label="AQI等级">
                            <el-select v-model="queryForm.aqiGrade" clearable placeholder="全部" style="width: 180px">
                                <el-option v-for="(item,index) in aqiLevelOptions" :key="index" :label="item" :value="index" />
                            </el-select>
                    </el-form-item>
                    <el-form-item class="flex-item" label="确认日期">
                        <el-date-picker
                            v-model="requiredDate"
                            type="date"
                            placeholder="全部"
                            style="width: 130px"
                        />
                    </el-form-item>
                    <el-form-item class="flex-item button-item">
                        <el-button type="danger" @click="reset">清空</el-button>
                        <el-button type="primary" @click="queryByForm">查询</el-button>
                    </el-form-item>
                </el-form>
                
            </div>
        </template>
        <el-table :data="statisticsList" class="table">
            <el-table-column label="编号" width="100" prop="id" align="center"> </el-table-column>
            
            <el-table-column label="所在省" align="center">
                <template v-slot:default="scope">
                    <span>{{ codeToText[scope.row.provinceId] }}</span>
                </template>
            </el-table-column>
            <el-table-column label="所在市" align="center">
                <template v-slot:default="scope">
                    <span>{{ codeToText[scope.row.cityId] }}</span>
                </template>
            </el-table-column>
            <el-table-column label="AQI等级" align="center">
                <template v-slot:default="scope">
                    <span :style="{ color: getAqiLevelColor(scope.row.aqiLevel) }">{{ aqiLevelOptions[scope.row.aqiLevel] }}</span>
                </template>
            </el-table-column>
            <el-table-column label="确认日期" prop="afDate" align="center">
                <template v-slot:default="scope">
                    <span>{{ scope.row.confirmDate.substr(0,10) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="确认时间" prop="confirmTime" align="center"></el-table-column>
            <el-table-column label="网格员" prop="gridMember.gmName" align="center"></el-table-column>
            <el-table-column label="反馈者" prop="supervisor.realName" align="center"></el-table-column>
            <el-table-column label="操作" width="100" align="center">
                <template #default="scope">
                    <el-button :icon="Document" circle plain type="primary" @click="handleDetail(scope.row)" ></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
        <!--详情弹窗-->
        <el-dialog v-model="dialogVisible">
            <el-descriptions
                :title=dialogTitle
                :column="1"
                border
            >
                <el-descriptions-item >
                    <template #label>
                        <div class="cell-item">
                            <el-icon style="margin: 5px;"><user /></el-icon>
                            <span class="dialog-text">确认信息编号</span>
                        </div>
                    </template>
                    {{ selectItem.id }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon style="margin: 5px;"><Location /></el-icon>
                            <span class="dialog-text">确认信息所在地址</span>
                        </div>
                    </template>
                    <el-tag size="small" class="info-tag">{{ codeToText[selectItem.provinceId] }}</el-tag>
                    <el-tag size="small" class="info-tag">{{ codeToText[selectItem.cityId] }}</el-tag>
                    <el-tag size="small" class="info-tag">{{ selectItem.address }}</el-tag>
                </el-descriptions-item>
                
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon style="margin: 5px;"><Warning /></el-icon>
                            <span class="dialog-text">确认AQI等级</span>
                        </div>
                    </template>
                    <el-tag size="small" class="info-tag">{{ aqiLevelOptions[selectItem.aqiLevel] }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon style="margin: 5px;"><Calendar /></el-icon>
                            <span class="dialog-text">确认日期时间</span>
                        </div>
                    </template>
                    <el-tag size="small" class="info-tag">{{ selectItem.confirmDate }}</el-tag>
                    <el-tag size="small" class="info-tag">{{ selectItem.confirmTime }}</el-tag>
                </el-descriptions-item>
                
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon style="margin: 5px;"><document /></el-icon>
                            <span class="dialog-text">网格员信息</span>
                        </div>
                    </template>
                    <el-tag size="small" class="info-tag">{{ selectItem.gridMember.gmName }}</el-tag>
                    <el-tag size="small" class="info-tag">{{ selectItem.gridMember.sex==1?'男':'女' }}</el-tag>
                </el-descriptions-item>
                
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon style="margin: 5px;"><document /></el-icon>
                            <span class="dialog-text">公众监督员信息</span>
                        </div>
                    </template>
                    <el-tag size="small" class="info-tag">{{ selectItem.supervisor.realName }}</el-tag>
                    <el-tag size="small" class="info-tag">{{ selectItem.supervisor.sex==1?'男':'女' }}</el-tag>
                    <el-tag size="small" class="info-tag">{{ selectItem.supervisor.birthday.substr(0,10) }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon style="margin: 5px;"><Notebook /></el-icon>
                            <span class="dialog-text">公众监督员反馈信息描述</span>
                        </div>
                    </template>
                    {{ selectItem.information }}
                </el-descriptions-item>
                
            </el-descriptions>
        </el-dialog>

        <template #footer>
            <div class="footer">
                <el-pagination background layout="sizes,prev, pager, next"
                 hide-on-single-page:true
                 :page-size=pageSize
                 :page-sizes="[5, 7, 10, 15]"
                 :total=total
                 :current-page="currentPage"
                 @size-change="handleSizeChange"
                 @current-change="handlepageChange"/>
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
.dialog-select {
    width: 150px;
}
.cell-item{
    display: flex;
    width: 200px;
}
.flex-item{
    margin-bottom: 0px;
}
.button-item{
    position: absolute;
    right: 20px;
}
.info-tag{
    margin-right: 10px;
}
.dialog-footer-item{
    margin-left: 15px;
    margin-right: 15px;
}
.dialog-footer-button{
    position:absolute;
    right: 20px;
    bottom: 20px;
}
</style>
