<template>
	<div class="wrapper">
		<el-table :data="aqiCount" style="width: 1200px; text-align: center; margin: auto" height="518px">
			<el-table-column prop="index" label="序号" width="300px" align="center"/>
			<el-table-column prop="month" label="月份" width="450px" align="center"/>
			<el-table-column prop="aqiCount" label="AQI指数超标数量统计" align="center"/>
		</el-table>
		<el-card style="width: 1200px; margin: auto; padding: 0%;">
			<div id="main" style="width: 100%; height: 400px; margin: auto;"></div>
		</el-card>
	</div>
</template>
<script setup>
	import { ref,onMounted } from 'vue';
	//  按需引入 echarts
	import * as echarts from "echarts";
	const aqiCount = ref([
		{ index: '1', month: '2022-10', aqiCount: '3' },
		{ index: '2', month: '2022-11', aqiCount: '11' },
		{ index: '3', month: '2022-12', aqiCount: '12' },
		{ index: '4', month: '2023-01', aqiCount: '14' },
		{ index: '5', month: '2023-02', aqiCount: '10' },
		{ index: '6', month: '2023-03', aqiCount: '8' },
		{ index: '7', month: '2023-04', aqiCount: '20' },
		{ index: '8', month: '2023-05', aqiCount: '21' },
		{ index: '9', month: '2023-06', aqiCount: '18' },
		{ index: '10', month: '2023-07', aqiCount: '14' },
		{ index: '11', month: '2023-08', aqiCount: '9' },
		{ index: '12', month: '2023-09', aqiCount: '6' }
		
	]);

	onMounted(() => {
		init()
	})
	function init() {
		// 基于准备好的dom，初始化echarts实例
		var chartDom = document.getElementById('main');
		var myChart = echarts.init(chartDom);
		const data = aqiCount.value.map(item => [item.month, item.aqiCount]);
		// 指定图表的配置项和数据
		var data1 = data.map(function (item) {
			return item[0];
		});
		var data2 = data.map(function (item) {
			return item[1];
		});
		var option = {
			title: {
				text: 'AQI趋势分布统计',
				left: 'center'
			},
			xAxis: {
				type: 'category',
				data: data1
			},
			yAxis: {
				type: 'value'
			},
			series: [{
				data: data2,
				type: 'bar',
				itemStyle: {
					color: function (params) {
						if (params.data < 5){
							return '#b1ff14';
						} else if (params.data < 10){
							return '#8fd600';
						} else if	(params.data < 15){
							return '#f7d600';
						} else if	(params.data < 20){
							return '#ff8c00';
						} else {
							return '#ff0000';
						}
					}
				}
			}]
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