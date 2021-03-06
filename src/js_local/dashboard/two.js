Zr.add("./js/dashboard/two",function(zr,$,echarts){
    //拒收退货柱形图
    var bar = echarts.init(document.getElementById('bar'));
    var boption  = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        grid:{
            width:"100%",
            height:"100%",
            left:0,
            top:0
        },
        xAxis: [
            {
                show:false,
                type: 'category',
                data: ['1','2','3','4','5','6','7'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                show:true,
                type: 'value',
                min: 0,
                max: 250,
                interval: 50,
                axisLine:{
                    show:false
                },
                splitLine:{
                    show:true,
                    lineStyle:{
                        color: ['#f0f0f0', '#dddddd']
                    }

                },
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        series: [
            {
                name:'品类一',
                type:'bar',
                barMaxWidth:34,
                itemStyle:{
                    color:"#B4BFDC"
                },
                data:[120.0, 114.9, 117.0, 123.2, 125.6, 176.7, 135.6]
            },
            {
                name:'品类二',
                type:'bar',
                barMaxWidth:34,
                itemStyle:{
                    color:"#7C8DBE"
                },
                data:[90.6, 95.9, 99.0, 96.4, 98.7, 90.7, 175.6, 182.2]
            }
        ]
    };

    bar.setOption(boption);
    //双折线
    var line = echarts.init(document.getElementById('line'));

    var loption = {
        tooltip: {
            trigger: 'none',
            axisPointer: {
                type: 'cross'
            }
        },
        color:['#3b66d4','#0081cc'],
        grid:{
            width:"90%",
            height:"90%",
            left:"0",
            top:"0"
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    show:false,
                    alignWithLabel: true
                },
                axisLine: {
                    lineStyle: {
                        color: "#777"
                    }
                },
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            return '降水量  ' + params.value
                                + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                        }
                    }
                },
                data: ["2012", "2013", "2014", "2015", "2016", "2017", "2018"]
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: "#999"
                    }
                },
            }
        ],
        series: [
            {
                name:'2015 降水量',
                type:'line',
                smooth: true,
                lineStyle:{
                    width:3
                },
                symbol:"circle",
                symbolSize:8,
                data: [22,21,8,32,38,21,19]
            },
            {
                name:'2016 降水量',
                type:'line',
                lineStyle:{
                    width:3
                },
                symbol:"circle",
                symbolSize:8,
                smooth: true,
                data: [19,25,6,38,39,28,18]
            }
        ]
    };

    line.setOption(loption);






    zr.dom.resizeQueen.push(function(){
        bar.resize();
        line.resize();
    })
    $.ajax({
        url:"/dashboard/workboard.json",
        type:"post",
        success:function(data){
            console.log(JSON.parse(data));
        }
    })

    return {}

},{requires:["jquery","echarts","./mock"]})