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
import { getFeedbackList, getGridMemberList, assignAqiFeedback } from '@/api/data';
import { ElMessage } from 'element-plus';
    onMounted(() => {
        query({});
    });
    const radio = ref(-1)
    const aqiLevel = ref('')
    const feedbackDate = ref('')
    const selectedOptions = ref([])
    const dialogSelectedOptions = ref([])
    const dialogVisible = ref(false)
    const currentPage = ref(1)
    const pageSize = ref(0)
    const total = ref(0)
    const selectItem = ref()
    const feedbackList = ref([])
    const dialogTitle = ref('反馈详情')
    const dialogProvinceCity = ref('')
    const dialogState = ref(0)
    const remoteAssign = ref(false)
    const gridMemberList = ref([])
    const selectGridMember = ref('')
    const dialogProvinceId = ref('')
    const dialogCityId = ref('')
    const queryForm = reactive({
        province: '',
        city: '',
        estimatedGrade: '',
        afDate: ''
    })
    const handleChangeGrid = () =>{
        //获取列表
        let list = dialogSelectedOptions.value
        selectGridMember.value = ''
        console.log(list)
        if(list === undefined || list.length == 0){
            return;
        }else if(list.length == 1){
            ElMessage({
                message: '请选择市',
                type: 'warning'
            });
        }else if(list.length == 2){
            console.log("省市选择了市,省代码为",list[0],"市代码为",list[1])
            getGridMemberListByCity({ cityId : list[1] })
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
        getFeedbackList(data).then(res => {
            pageSize.value = res.data.data.pageSize;
            total.value = res.data.data.total;
            currentPage.value = res.data.data.pageNum;
            feedbackList.value = res.data.data.list;
            console.log(feedbackList.value)
            //将列表中的省市代码转换为文字
            feedbackList.value.forEach(item => {
                item.province = codeToText[item.province]
                item.city = codeToText[item.city]
            })
        })
    }
    //显示详情弹窗
    const handleDetail = (row) =>{
        console.log("详情",row)
        dialogTitle.value = '反馈详情';
        dialogVisible.value = true;
        selectItem.value = row;
    }
    //显示指派任务弹窗
    const handleAssign = async (row) =>{
        if(row.state==1){
            ElMessage({
                message: '该任务已指派',
                type: 'info'
            });
            return
        }
        dialogTitle.value = '任务指派';
        dialogCityId.value = row.cityId;
        dialogProvinceId.value = row.provinceId;
        dialogProvinceCity.value = codeToText[dialogProvinceId.value] + '/' + codeToText[dialogCityId.value];
        gridMemberList.value = []
        dialogSelectedOptions.value = [dialogProvinceId.value, dialogCityId.value]
        dialogVisible.value = true;
        selectItem.value = row;
        getGridMemberListByCity({ cityId : dialogCityId.value })
    }
    //根据省市获取网格员列表
    const getGridMemberListByCity = (data) =>{
        //获取网格员列表
        getGridMemberList(data).then(res => {
            console.log('网格员列表',res.data.data)
            gridMemberList.value = res.data.data.map(item => ({
                value: item.gmId,
                label: item.gmName
            }));
        })
        console.log('gridMemberList:',gridMemberList)
    }
    //点击指派按钮事件
    const handleAssignTask = () => {
        console.log("selectGridMember:",selectGridMember.value)
        console.log("selectItem:",selectItem.value)
        if(selectGridMember.value.length==0){
            ElMessage({
                message: '请选择指派网格员',
                type: 'warning'
            });
            return
        }
        let data = {
            afId: selectItem.value.afId,
            gmId: selectGridMember.value
        }
        console.log(data)
        //指派任务
        assignAqiFeedback(data).then(res => {
            console.log('指派结果',res);
            ElMessage({
                message: '指派成功',
                type: 'success'
            });
            dialogVisible.value = false;
            selectGridMember.value = '';
            query({})
        })
    }
    const handlepageChange = (newPage) => {
        currentPage.value = newPage;
        let data = { page: currentPage.value, size: pageSize.value }
        if(selectedOptions.value.length==1){
            data.provinceId = selectedOptions.value[0]
        }else{
            data.cityId = selectedOptions.value[1]
        }
        if(feedbackDate.value!=''){
            data.afDate = feedbackDate.value
        }
        if(queryForm.estimatedGrade!=''){
            data.estimatedGrade = queryForm.estimatedGrade
        }
        if(radio.value!=''){
            data.isAssign = radio.value
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
        if(feedbackDate.value!=''){
            data.afDate = feedbackDate.value
        }
        if(queryForm.estimatedGrade!=''){
            data.estimatedGrade = queryForm.estimatedGrade
        }
        if(radio.value!=''){
            data.isAssign = radio.value
        }
        query(data);
    };
    const getAqiLevelColor = (level) => {
        switch (level) {
            case 0: return 'rgb(0, 228, 0)';
            case 1: return 'rgb(255, 220, 0)';
            case 2: return 'rgb(255, 126, 0)';
            case 3: return 'rgb(255, 0, 0)';
            case 4: return 'rgb(153, 0, 76)';
            case 5: return 'rgb(126, 0, 35)';
            default: return 'black';
        }
    }
    //重置查询表单数据
    const reset = () => {
        queryForm.province = ''
        queryForm.city = ''
        queryForm.estimatedGrade = ''
        queryForm.afDate = ''
        feedbackDate.value = ''
        selectedOptions.value = []
        radio.value = 2
        query({})
    }
    //根据查询表单查询
    const queryByForm = () => {
        let data = {pageSize: pageSize.value}
        if(selectedOptions.value.length==1){
            data.provinceId = selectedOptions.value[0]
        }else{
            data.cityId = selectedOptions.value[1]
        }
        if(feedbackDate.value!=''){
            data.afDate = feedbackDate.value
            console.log(data.afDate)
        }
        if(queryForm.estimatedGrade!=''){
            data.estimatedGrade = queryForm.estimatedGrade
        }
        if(radio.value!=-1){
            data.state = radio.value
        }
        console.log(data)
        query(data)
    }
    const handleClose = (done) => {
        selectGridMember.value = ''
        done()
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
                            :props="{ expandTrigger: 'hover', checkStrictly: true }">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item class="flex-item" label="预估等级">
                        <el-select v-model="queryForm.estimatedGrade"
                         clearable placeholder="全部" style="width: 180px">
                            <el-option v-for="(item,index) in aqiLevelOptions"
                             :key="index" :label="item" :value="index+1" />
                        </el-select>
                    </el-form-item>
                    <el-form-item class="flex-item" label="反馈日期">
                        <el-date-picker
                            v-model="feedbackDate"
                            type="date"
                            placeholder="全部"
                            style="width: 130px"
                        />
                    </el-form-item>
                    <el-form-item class="flex-item">
                        <el-radio-group v-model="radio">
                            <el-radio :value="0">未指派</el-radio>
                            <el-radio :value="1">已指派</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item class="flex-item button-item">
                        <el-button type="danger" @click="reset">清空</el-button>
                        <el-button type="primary" @click="queryByForm">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </template>
        <el-table :data="feedbackList" class="table">
            <el-table-column label="编号" width="100" prop="afId" align="center"> </el-table-column>
            <el-table-column label="反馈者姓名" prop="supervisor.realName" align="center"></el-table-column>
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
            <el-table-column label="预估污染等级" align="center">
                <template v-slot:default="scope">
                    <span :style="{ color: getAqiLevelColor(scope.row.estimatedGrade-1) }">{{ aqiLevelOptions[scope.row.estimatedGrade-1] }}</span>
                </template>
            </el-table-column>
            <el-table-column label="反馈日期" prop="afDate" align="center">
                <template v-slot:default="scope">
                    <span>{{ scope.row.afDate.substr(0,10) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="反馈时间" prop="afTime" align="center"></el-table-column>
            <el-table-column label="操作" width="100" align="center">
                <template #default="scope">
                    <el-button :icon="Document" circle plain type="primary" @click="handleDetail(scope.row)" ></el-button>
                    <el-button :icon="Pointer" circle plain type="success" @click="handleAssign(scope.row)" ></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
        <!--详情和指派弹窗-->
        <el-dialog v-model="dialogVisible" :before-close="handleClose">
            <el-descriptions
                :title=dialogTitle
                :column="1"
                border
            >
                <el-descriptions-item >
                    <template #label>
                        <div class="cell-item">
                            <el-icon style="margin: 5px;"><user /></el-icon>
                            <span class="dialog-text">公众监督反馈者编号</span>
                        </div>
                    </template>
                    {{ selectItem.afId }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon style="margin: 5px;"><document /></el-icon>
                            <span class="dialog-text">反馈者信息</span>
                        </div>
                    </template>
                    <el-tag size="small" class="info-tag">{{ selectItem.supervisor.realName }}</el-tag>
                    <el-tag size="small" class="info-tag">{{ selectItem.supervisor.sex==1?'男':'女' }}</el-tag>
                    <el-tag size="small" class="info-tag">{{ selectItem.supervisor.birthday.substr(0,10) }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon style="margin: 5px;"><iphone /></el-icon>
                            <span class="dialog-text">反馈者联系电话</span>
                        </div>
                    </template>
                    {{ selectItem.supervisor.telId}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon style="margin: 5px;"><Location /></el-icon>
                            <span class="dialog-text">反馈信息所在地址</span>
                        </div>
                    </template>
                    <el-tag size="small" class="info-tag">{{ codeToText[selectItem.provinceId] }}</el-tag>
                    <el-tag size="small" class="info-tag">{{ codeToText[selectItem.cityId] }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon style="margin: 5px;"><Notebook /></el-icon>
                            <span class="dialog-text">反馈信息描述</span>
                        </div>
                    </template>
                    {{ selectItem.information }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon style="margin: 5px;"><Warning /></el-icon>
                            <span class="dialog-text">预估等级</span>
                        </div>
                    </template>
                    {{ aqiLevelOptions[selectItem.estimatedGrade-1] }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon style="margin: 5px;"><Calendar /></el-icon>
                            <span class="dialog-text">反馈日期时间</span>
                        </div>
                    </template>
                    <el-tag size="small" class="info-tag">{{ selectItem.afDate.substr(0,10) }}</el-tag>
                </el-descriptions-item>
            </el-descriptions>
            <!-- 操作栏 -->
            <div class="dialog-footer" v-if="dialogTitle === '任务指派'">
                <span>是否异地指派</span>
                <el-switch
                    class="dialog-footer-item"
                    v-model="remoteAssign"
                    size="large"
                />
                <el-cascader
                    class="dialog-footer-item"
                    size="default"
                    :placeholder=dialogProvinceCity
                    :options="provinceAndCityData"
                    clearable
                    v-model="dialogSelectedOptions"
                    :disabled="!remoteAssign"
                    :props="{ expandTrigger: 'hover', checkStrictly: true }"
                    @change="handleChangeGrid">
                </el-cascader>
                <el-select
                    class="dialog-footer-item dialog-select" 
                    size="default"
                    placeholder="指派网格员"
                    v-model="selectGridMember"
                    clearable
                >
                    <el-option
                    v-for="member in gridMemberList"
                    :key="member.value"
                    :label="member.label"
                    :value="member.value"
                    />
                </el-select>
                <el-button
                    class="dialog-footer-button"
                    type="primary"
                    @click="handleAssignTask">指派</el-button>
            </div>
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
    margin-left: 80px;
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
:deep(el-descriptions__cell el-descriptions__label is-bordered-label){
    width: 100px;
}

</style>
