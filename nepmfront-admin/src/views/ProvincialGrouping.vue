<template>
	<div class="wrapper">
		<el-table :data="provinceData" style="width: 95%; text-align: center; margin: auto" height="600px">
			<el-table-column prop="province_id" label="省编号" width="100px" align="center"/>
			<el-table-column prop="province_abbr" label="省简称" width="150px" align="center"/>
			<el-table-column prop="province_name" label="省名称" width="150px" align="center"/>
			<el-table-column prop="so2Times" label="SO2超标累计" width="225px" align="center"/>
			<el-table-column prop="coTimes" label="CO超标累计" width="225px" align="center"/>
			<el-table-column prop="spmTimes" label="PM2.5超标累计" width="225px" align="center"/>
			<el-table-column prop="aqiTimes" label="AQI超标累计" align="center"/>
		</el-table>
	</div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { provincialGrouping } from '@/api/data';
onMounted(async () => {
	const res = await provincialGrouping();
	provinceData.value = res.data.data;
	console.log('provinceData',provinceData.value);
});
const provinceData = ref([
	{ provinceId: '11', provinceAbbreviation: '京', provinceName: '北京市', so2Count: '1', coCount:'1', pmCount: '1', aqiCount: '2' },
	{ provinceId: '12', provinceAbbreviation: '津', provinceName: '天津市', so2Count: '0', coCount:'2', pmCount: '1', aqiCount: '2' },

]);
</script>
<style scoped >
.wrapper {
    width: 100%;
    height: 100%;
}
</style>