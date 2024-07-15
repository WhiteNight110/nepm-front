<template>
    <div class="content bg">
        <dv-full-screen-container>
            <div class="title"
                style="display: flex; flex-direction: row; margin-top: 10px; margin-bottom: 4px; margin-left: 12px;">
                <div small-bg style="flex: 0 1 30%;">
                    <dv-decoration10 style="width:100%;height:5px;" />
                </div>
                <div class="title-middle" style="flex:0 1 40%; display: flex; flex-direction: row;">

                    <dv-decoration8 style="width:150px;height:50px; flex:1 20%" />

                    <dv-decoration-11 style="width:180px;height:50px;flex:1 60%">
                        <div color-green font-600 bg="~ dark/0" style="color:aliceblue">
                            东软空气质量环保公众监督平台
                        </div>
                    </dv-decoration-11>

                    <dv-decoration8 :reverse="true" style="width:150px;height:50px; flex:1 20%" />

                </div>

                <div small-bg style="flex: 0 1 30%; transform: rotateY(180deg)">
                    <dv-decoration10 :reverse="true" style="width:100%;height:5px;" />
                </div>
            </div>

            <div class="grid-container" style="display: flex; flex-direction: row; margin-left: 12px;">
                <!-- 第一列 -->
                <div class="grid-item" style="flex:0 1 25%;">
                    <div class="module-box" style="width: 100%; height: 200px;">
                        <dv-border-box9 style="height: 200px; display: flex; flex-direction: row;">
                            <div w50rem h25rem flex="~ row" justify-center items-center bg-dark
                                style="display: flex; flex-direction: row; margin-left: 20px">
                                <dv-charts :option="option1" style="width:11rem;height:11rem; margin-top: 25px" />
                                <dv-charts :option="option2" style="width:11rem;height:11rem; margin-top: 25px" />
                            </div>
                        </dv-border-box9>
                    </div>

                    <div class="module-box" style="width: 100%; height: 200px;">
                        <dv-border-box8 :dur="5" style="height: 200px">
                            <div style="display: inline-flex; margin-top: -34px">
                                <dv-charts id="chart3" style="width:250px;height:200px; margin-top: 40px" />
                            </div>

                        </dv-border-box8>
                    </div>

                    <div class="module-box" style="width: 100%; height: 250px;">
                        <dv-border-box10>
                            <div style="display: inline-flex;">
                                <dv-charts id="chart4" style="width:350px;height:280px; margin-top: 10px" />
                            </div>
                        </dv-border-box10>
                    </div>
                </div>

                <!-- 第二列 -->
                <div class="grid-item" style="flex:0 1 50%">
                    <div class="module-box" style="width: 100%; height: 500px;">
                        <dv-border-box8 :dur="5" style="height: 500px; display: flex; justify-content: center; align-items: center;">
                            <div id="map" style="width: 100%; height: 100%"> </div>
                        </dv-border-box8>
                    </div>

                    <div class="module-box" style="width: 100%; height: 150px; ">
                        <dv-border-box10 >
                            <div style="height: 10%; color: white;"> 空气质量检测实时统计 </div>
                            <div class="Feedback" style="height: 90%; display: flex; justify-content: space-between; align-items: center;">
                                <div style="width: 33%;  display: flex; flex-direction: row; justify-content: center; align-items: center;">
                                    <img src="../assets/detect.png" alt="Your Image" style="width: 50px; height: 50px; margin-right: 10px;">
                                    <span style="white-space: pre-line; display: flex; flex-direction: column;">
                                        <span style="font-size: 16px; color: white">{{ totalCount }}</span>
                                        <span style="font-size: 12px; color: white">空气质量检测总数量</span>
                                    </span>
                                </div>

                                <div style="width: 33%;  display: flex; flex-direction: row; justify-content: center; align-items: center;">
                                    <img src="../assets/AQI.png" alt="Your Image" style="width: 50px; height: 50px; margin-right: 10px;">
                                    <span style="white-space: pre-line; display: flex; flex-direction: column;">
                                        <span style="font-size: 16px; color: white">{{ goodCount }}</span>
                                        <span style="font-size: 12px; color: white">空气质量良好数量</span>
                                    </span>
                                </div>

                                <div style="width: 33%;  display: flex; flex-direction: row; justify-content: center; align-items: center;">
                                    <img src="../assets/pollution.png" alt="Your Image" style="width: 50px; height: 50px; margin-right: 10px;">
                                    <span style="white-space: pre-line; display: flex; flex-direction: column;">
                                        <span style="font-size: 16px; color: white">{{ totalCount-goodCount }}</span>
                                        <span style="font-size: 12px; color: white">空气质量污染数量</span>
                                    </span>
                                </div>
                            </div>
                        </dv-border-box10>
                    </div>
                </div>

                <!-- 第三列 -->
                <div class="grid-item" style="flex:0 1 25% ">
                    <div class="module-box" style="width: 100%; height: 200px">
                        <dv-border-box9 style="height: 200px">
                            <dv-charts :option="option5" style="width:350px;height:230px;" />
                        </dv-border-box9>
                    </div>

                    <div class="module-box" style="width: 100%; height: 200px;">
                        <dv-border-box8 :dur="5" style="height: 200px">
                            <dv-charts :option="option6" style="width:350px;height:230px; " />
                        </dv-border-box8>
                    </div>

                    <div class="module-box" style="width: 100%; height: 250px;">
                        <dv-border-box10>
                            <dv-charts :option="option7" style="width:350px;height:280px; " />
                        </dv-border-box10>
                    </div>
                </div>

            </div>


        </dv-full-screen-container>


    </div>

</template>

<component :is="'script'" type="text/javascript">
	<!-- 使用明文设置安全密钥（不安全），https://lbs.amap.com/api/javascript-api-v2/guide/abc/jscode  -->
    window._AMapSecurityConfig = {securityJsCode: '372e0103ee80eeefbde02a8767d9d2dd'}
</component>

<script setup>
import { reactive, onUnmounted, onMounted, ref, nextTick} from 'vue';
import { changeDefaultConfig } from '@jiaminghi/charts'
import { styleType } from 'element-plus/es/components/table-v2/src/common';
import { otherDataCount,aqiLevelCount,countByMonth } from '@/api/data.js';
import * as echarts from '../assets/echarts@5.5.0/echarts.min.js';
const totalCount = ref(0);
const goodCount = ref(0);

import chinaMap from '@/assets/maps/china.json'; // 静态导入 JSON 文件
const aqiLevel = ref([
    '优', '良', '轻度污染', '中度污染', '重度污染', '严重污染'
]);
const aqiLvCount = ref([]);
const aqiCountChartData = ref([]);
const aqiCountByMonth = ref([
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
const chart4XData = ref([]);
const chart4YData = ref([]);
const fetchData = async () => {
    await otherDataCount().then(res => {
        totalCount.value = res.data.data.totalCount;
        goodCount.value = res.data.data.goodCount;
    });
    await aqiLevelCount().then(res => {
        aqiLvCount.value = Object.keys(res.data.data).map(key => {
            const [aqiDescribtion, aqiCount] = Object.entries(res.data.data[key])[0];
            return {
                aqiCount: aqiCount,
                aqiDescribtion: aqiLevel.value[aqiDescribtion]
            };
        });
        console.log('aqiLvCount:', aqiLvCount);
    })
    // 将 aqiCount 数据转换为 ECharts 所需的格式
    aqiCountChartData.value = aqiLvCount.value.map(item => {
        return {
            name: item.aqiDescribtion,
            value: item.aqiCount
        }
    });
    console.log('aqiCountChartData:', aqiCountChartData.value);

    // 获取 12 个月内空气质量超标趋势
    await countByMonth().then(res => {
        console.log('countByMonth:', res.data.data);
        res.data.data.map((item, index) => {
            for(let key in item) {
                aqiCountByMonth.value[index].month = key;
                aqiCountByMonth.value[index].aqiCount = item[key];
            }
        })
    });
    const chart4Data = aqiCountByMonth.value.map(item => [item.month, item.aqiCount]);
    // 指定图表的配置项和数据
    chart4XData.value = chart4Data.map(function (item) {
        return item[0].substring(5,7);
    });
    chart4YData.value = chart4Data.map(function (item) {
        return item[1];
    });
    console.log('chart4XData:', chart4XData.value);
    console.log('chart4YData:', chart4YData.value);
}
onMounted(async() => {
  await fetchData();
  nextTick(() => {
    setTimeout(() => {
        setMap();
        setChart3();
        setChart4();
    });
  })
  
});

const setMap = () => {
    const map = document.querySelector('#map');
    console.log(map); // 检查是否能选择到 map 元素

    if (map) {
        
        const myMap = echarts.init(map);

        myMap.showLoading();

        myMap.hideLoading();
        echarts.registerMap('china', chinaMap);
        myMap.setOption({
        title: {
            sublink: ''
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
            if (isNaN(params.data.value)) {
                return null;
            } else {
                return params.name + '<br/>' + params.data.value + '千公顷';
            }
            }
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
            }
        },
        visualMap: {
            min: 0,
            max: 4000,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            inRange: {
            color: ['lightskyblue', 'yellow', 'orangered']
            }
        },
        series: [
            {
            name: '全国稻谷播种面积',
            type: 'map',
            map: 'china',
            roam: true,
            label: {
                show: true,
                formatter: function (params) {
                return params.name.replace(/省|市|自治区|自治州|特别行政区/g, '');
                }
            },
            data: [
                { name: '河北省', value: 76.59, label: { position: ['center', '50%'], offset: [0, 20] } },
                { name: '天津', value: 55.26, label: { position: ['center', '50%'] } },
                { name: '北京', value: 0.42, label: { position: ['center', '50%'] } },
                { name: "湖南省", value: 3967.67 },
                { name: "黑龙江省", value: 3601.37 },
                { name: "江西省", value: 3403.00 },
                { name: "安徽省", value: 2496.48 },
                { name: "湖北省", value: 2263.96 },
                { name: "江苏省", value: 2221.42 },
                { name: "四川省", value: 1874.00 },
                { name: "广东省", value: 1835.90 },
                { name: "广西", value: 1758.03 },
                { name: "吉林省", value: 833.18 },
                { name: "云南省", value: 709.46 },
                { name: "重庆市", value: 659.19 },
                { name: "浙江省", value: 629.19 },
                { name: "贵州省", value: 613.77 },
                { name: "河南省", value: 601.70 },
                { name: "福建省", value: 599.45 },
                { name: "辽宁省", value: 516.39 },
                { name: "海南省", value: 228.69 },
                { name: "内蒙古自治区", value: 117.23 },
                { name: "山东省", value: 106.43 },
                { name: "陕西省", value: 106.09 },
                { name: "上海省", value: 103.70 },
                { name: "新疆维吾尔自治区", value: 36.71 },
                { name: "宁夏", value: 29.37 },
                { name: "甘肃省", value: 2.49 },
                { name: "山西省", value: 2.16 },
                { name: "西藏自治区", value: 0.83 },
            ]
            }
        ]
        });
    } else {
        console.error("Cannot find map element");
    }
}

const setChart3 = () => {
    const chart3 = echarts.init(document.getElementById('chart3'));
    var option3 = {
        title: {
            text: '空气质量指数级别分布',
            //标题居中
            left: 'center',
            style: {
                fill: '#fff',
                verticalAlign: 'top',
            },
            textStyle:{
                color: 'white'
            },
            offset: [0, 0],

        },
        series: [
            {
                type: 'pie',
                data: aqiCountChartData.value,
                insideLabel: {
                    show: true
                },
                roseType: false,
                radius: ['30%', '60%'],
                avoidLabelOverlap: false,
                label:{
                    align: 'center',
                    fontSize: 8,
                },
            }
        ]
    }
    chart3.setOption(option3);
}

const option1 = reactive({
    title: {
        text: '省会城市网格覆盖率',
        offset: [0, -40],
        style: {

            fill: '#fff'
        }
    },
    //环的颜色
    color: ["#67c23a", "#293a54"],
    series: [
        {
            type: 'gauge',
            data: [{ name: 'itemA', value: 47 }],
            center: ['50%', '55%'],
            axisLabel: {
                formatter: '{value}%',
                style: {
                    fill: '#fff'
                }
            },
            axisTick: {
                style: {
                    stroke: '#fff'
                }
            },
            animationCurve: 'easeInOutBack',
            details: {
                show: true,
                offset: [0, 50],
                formatter: '{value}%'
            },
            animationCurve: 'easeOutBack'
        },


    ]
})

const option2 = reactive({
    title: {
        text: '大城市网格覆盖率',
        offset: [0, -40],
        style: {
            fill: '#fff'
        }
    },
    //环的颜色
    color: ["#f56c6c", "#293a54"],
    series: [
        {
            type: 'gauge',
            data: [{ name: 'itemA', value: 16 }],
            center: ['50%', '55%'],
            axisLabel: {
                formatter: '{value}%',
                style: {
                    fill: '#fff'
                }
            },

            axisTick: {
                style: {
                    stroke: '#fff'
                }
            },
            details: {
                show: true,
                offset: [0, 50],
                formatter: '{value}%'
            },
            animationCurve: 'easeInOutBack'
        }
    ]
})

const setChart4 = () => {
    const chart4 = echarts.init(document.getElementById('chart4'));
    const option4 = {
        title: {
            text: '12个月内空气质量超标趋势',
            //标题居中
            left: 'center',
            textStyle: {
                color: '#fff'
            },
            offset: [0, -24],
        },
        grid: {
            right: 50
        },
        xAxis: {
            show: true,
            name: '月份',
            data: chart4XData.value,
            axisLabel: {
                show: true,
                // interval: 0,
                color: '#fff',
            },
            axisTick: {
                show: true,
                style: {
                    fill: '#fff',
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    stroke: '#fff',
                    lineWidth: 1,
                }
            },
            nameTextStyle: {
                color: '#fff',
                fontSize: 10
            }
        },
        yAxis: {
            name: '统计',
            axisLabel: {
                show: true,
                color: '#fff',
            },
            axisTick: {
                show: true,
                style: {
                    fill: '#fff',
                }
            },
            axisLine: {
                show: true,
                style: {
                    stroke: '#fff',
                }
            },
            nameTextStyle: {
                color: '#fff',
                fontSize: 10
            }
        },
        series: [
            {
                data: chart4YData.value,
                type: 'line',
                lineArea: {
                    show: true,
                    smooth: true,
                    gradient: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 0)'],
                    label: {
                        show: true,
                        style: {
                            fill: '#fff',
                            color: '#fff'
                        }
                    }
                }
            }
        ]
    }
    chart4.setOption(option4);
}

const option5 = {
    title: {
        text: '悬浮颗拉物(PM2.5)浓度超标累计',
        style: {
            fill: '#fff'
        },
        offset:[0, -28]
    },
    grid: {
        left: 60,
        right: 10
    },

    xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisLabel: {
            show: true,
            style: {
                fill: '#fff',
            }
        },
        axisTick: {
            show: true,
            style: {
                fill: '#fff',
            }
        },
        axisLine: {
            show: true,
            style: {
                stroke: '#fff'
            }
        },
        
    },
    yAxis: {
        name: '销售额',
        data: 'value',
        axisLabel: {
            show: true,
            style: {
                fill: '#fff',
            }
        },
        axisTick: {
            show: true,
            style: {
                fill: '#fff',
            }
        },
        axisLine: {
            show: true,
            style: {
                stroke: '#fff'
            }
        },
        splitNumber: 4,
        nameTextStyle: {
            fill: '#fff',
            fontSize: 10
        },

    },
    series: [
        {
            data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
            type: 'bar',
            gradient: {
                color: ['#37a2da', '#67e0e3']
            }
        }
    ]
}

const option6 = {
    title: {
        text: '二氧化硫(SO2)浓度超标累计',
        style: {
            fill: '#fff'
        },
        offset:[0, -28]
    },
    grid: {
        left: 60,
        right: 10
    },

    xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisLabel: {
            show: true,
            style: {
                fill: '#fff',
            }
        },
        axisTick: {
            show: true,
            style: {
                fill: '#fff',
            }
        },
        axisLine: {
            show: true,
            style: {
                stroke: '#fff'
            }
        },
        
    },
    yAxis: {
        name: '销售额',
        data: 'value',
        axisLabel: {
            show: true,
            style: {
                fill: '#fff',
            }
        },
        axisTick: {
            show: true,
            style: {
                fill: '#fff',
            }
        },
        axisLine: {
            show: true,
            style: {
                stroke: '#fff'
            }
        },
        splitNumber: 4,
        nameTextStyle: {
            fill: '#fff',
            fontSize: 10
        },

    },
    series: [
        {
            data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
            type: 'bar',
            gradient: {
                color: ['#37a2da', '#67e0e3']
            }
        }
    ]
}

const option7 = {
    title: {
        text: '—氧化碳(CO)浓度超标累计',
        style: {
            fill: '#fff'
        },
        offset:[0, -28]
    },
    grid: {
        left: 60,
        right: 10
    },

    xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisLabel: {
            show: true,
            style: {
                fill: '#fff',
            }
        },
        axisTick: {
            show: true,
            style: {
                fill: '#fff',
            }
        },
        axisLine: {
            show: true,
            style: {
                stroke: '#fff'
            }
        },
        
    },
    yAxis: {
        name: '销售额',
        data: 'value',
        axisLabel: {
            show: true,
            style: {
                fill: '#fff',
            }
        },
        axisTick: {
            show: true,
            style: {
                fill: '#fff',
            }
        },
        axisLine: {
            show: true,
            style: {
                stroke: '#fff'
            }
        },
        splitNumber: 4,
        nameTextStyle: {
            fill: '#fff',
            fontSize: 10
        },

    },
    series: [
        {
            data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
            type: 'bar',
            gradient: {
                color: ['#37a2da', '#67e0e3']
            }
        }
    ]
}

</script>




<style>
.grid-container {
    display: flex;
    flex-direction: row;
    height: 100%;
    /* width: 100%; */

}

.grid-item {
    flex-grow: 0;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
}

.content.bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('../assets/background.jpg');
    background-size: cover;
    background-position: center;
    z-index: 0;
    justify-content: center;
    align-items: center;
}
</style>
