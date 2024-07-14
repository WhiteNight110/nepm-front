<script setup>
	import { ref, onMounted } from "vue";
	import { otherDataCount } from "@/api/data";
	import * as echarts from "echarts";
	const tootalCount = ref(0);
	const goodCount = ref(0);
	onMounted(async () => {
		var response = await otherDataCount();
		tootalCount.value = response.data.data.totalCount;
		goodCount.value = response.data.data.goodCount;
		init();
	});
	function init() {
		// 基于准备好的dom，初始化echarts实例
		var chartDom = document.getElementById('main');
		var myChart = echarts.init(chartDom);
		var option = {
			title: {
				text: '空气质量检测统计图',
				left: 'center'
			},
			tooltip: {
				trigger: 'item'
			},
			legend: {
				orient: 'vertical',
				left: 'left'
			},
			series: [{
				name: 'Access From',
				type: 'pie',
				radius: '50%',
				data: [
					{ value: tootalCount.value-goodCount.value, name: '空气质量检测不良数量' },
					{ value: goodCount.value, name: '空气质量检测良好数量' },
				],
				emphasis: {
					itemStyle: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}]};
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
	}
</script>

<template>
	<div class="wrapper">
		<el-descriptions
                :title=dialogTitle
                :column="1"
                border
				class="descriptions"
            >
                <el-descriptions-item >
                    <template #label>
                        <div class="cell-item">
                            <span class="dialog-text">空气质量检测总数量</span>
                        </div>
                    </template>
					<div class="cell-item">{{ tootalCount }}</div>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <span class="dialog-text">空气质量检测良好数量</span>
                        </div>
                    </template>
					<div class="cell-item">{{ goodCount }}</div>
                </el-descriptions-item>
				<el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <span class="dialog-text">省会城市网格覆盖范围</span>
                        </div>
                    </template>
					<div class="cell-item">52.23%</div>
                </el-descriptions-item>
				<el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <span class="dialog-text">大城市网格覆盖范围</span>
                        </div>
                    </template>
                    <div class="cell-item">67.56%</div>
                </el-descriptions-item>
                
            </el-descriptions>
			<div id="main" class="charts" ></div>
	</div>
</template>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.descriptions{
	padding-left: 50px;
	width: 40%;
}
:deep(.el-descriptions__cell.el-descriptions__label.is-bordered-label) {
    width: 200px;
}
:deep(.el-descriptions__body){
	width: 300px;
}
.cell-item{
	text-align: center;
}
.charts{
	width: 55%; height: 400px;
}
</style>

