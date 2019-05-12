<template>
    <div>
      <div>
        <div id="chart_example"></div>
      </div>
      <div>
        <div id="chart_2"></div>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    mounted() {
      
      let myChart = this.$echarts.init(document.getElementById('chart_example'));
      let option = {
    title : {
        text: '设备高峰时段基础数据分析',
        subtext: '数据分析',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x : 'center',
        y : 'bottom',
        data:['粉碎机','超细粉碎机','中草药粉碎机','炒药机','压片机','制丸机','多功能提取罐','泡罩式包装机']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: true,
                type: ['pie', 'funnel']
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
        {
            name:'半径模式',
            type:'pie',
            radius : [20, 110],
            center : ['25%', '50%'],
            roseType : 'radius',
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            lableLine: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            data:[
                {value:10, name:'粉碎机'},
                {value:5, name:'超细粉碎机'},
                {value:15, name:'中草药粉碎机'},
                {value:25, name:'炒药机'},
                {value:20, name:'压片机'},
                {value:35, name:'制丸机'},
                {value:30, name:'多功能提取罐'},
                {value:40, name:'泡罩式包装机'}
            ]
        },
        {
            name:'面积模式',
            type:'pie',
            radius : [30, 110],
            center : ['75%', '50%'],
            roseType : 'area',
            data:[
                {value:10, name:'粉碎机'},
                {value:5, name:'超细粉碎机'},
                {value:15, name:'中草药粉碎机'},
                {value:25, name:'炒药机'},
                {value:20, name:'压片机'},
                {value:35, name:'制丸机'},
                {value:30, name:'多功能提取罐'},
                {value:40, name:'泡罩式包装机'}
            ]
        }
    ]
};
      myChart.setOption(option);
 
    //   //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
    //   window.addEventListener('resize',function() {myChart.resize()});
    let myChart2 = this.$echarts.init(document.getElementById('chart_2'));
      let option2 = {
    title: {
        text: '堆叠区域图'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data:['药用粉碎机械','药用切割机械','药用制作机械','医疗器械','中药辅助器械']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['周一','周二','周三','周四','周五','周六','周日']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'药用粉碎机械',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'药用切割机械',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'药用制作机械',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
            name:'医疗器械',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
            name:'中药辅助器械',
            type:'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {normal: {}},
            data:[820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
};
      myChart2.setOption(option2);
    },
    methods: {},
    watch: {},
    created() {
 
    }
  }
</script>


<style scoped>
  h2{
    text-align: center;
    padding: 30px;
    font-size: 18px;
  }
  #chart_example{
    float: left;
    width: 100%;
    height: 300px;
    margin: 0 auto;
  }
  #chart_2{
    float: left;
    width: 100%;
    height: 320px;
    margin: 40px auto;
  }
</style>
