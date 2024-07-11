<template>
	<div class="wrapper">
		<el-table :data="aqiCount" style="width: 1200px; text-align: center; margin: auto" height="280px">
			<el-table-column prop="aqiLevel" label="AQI指数等级" width="300px" align="center"/>
			<el-table-column prop="aqiDescribtion" label="AQI指数等级描述" width="450px" align="center"/>
			<el-table-column prop="aqiCount" label="AQI指数等级分布统计" align="center"/>
		</el-table>
		<el-card style="width: 1200px; margin: auto">
			<div id="main" style=" height: 300px; margin: auto;"></div>
		</el-card>
	</div>
</template>
<script setup>
	import { ref,onMounted } from 'vue';
	//  按需引入 echarts
	import * as echarts from "echarts";
	const aqiCount = ref([
		{ aqiLevel: '1', aqiDescribtion: '优', aqiCount: '1' },
		{ aqiLevel: '2', aqiDescribtion: '良', aqiCount: '2' },
		{ aqiLevel: '3', aqiDescribtion: '轻度污染', aqiCount: '1' },
		{ aqiLevel: '4', aqiDescribtion: '中度污染', aqiCount: '2' },
		{ aqiLevel: '5', aqiDescribtion: '重度污染', aqiCount: '1' },
		{ aqiLevel: '6', aqiDescribtion: '严重污染', aqiCount: '2' },
	]);

	onMounted(() => {
		init()
	})
	function init() {
		// 基于准备好的dom，初始化echarts实例
		var chartDom = document.getElementById('main');
		var myChart = echarts.init(chartDom);
		// 将 aqiCount 数据转换为 ECharts 所需的格式
		const chartData = aqiCount.value.map(item => ({
			value: item.aqiCount,
			name: item.aqiDescribtion
		}));
		// 指定图表的配置项和数据
		var option = {
			tooltip: {
				trigger: 'item'
			},
			legend: {
				top: '5%',
				left: 'center'
			},
			series: [{
				name: 'Access From',
				type: 'pie',
				radius: ['40%', '70%'],
				center: ['50%', '70%'],
				// adjust the start and end angle
				startAngle: 180,
				endAngle: 360,
				data: chartData}]
		};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}
</script>
<style scoped>
.wrapper {
    width: 100%;
    height: 100%;
}

</style>