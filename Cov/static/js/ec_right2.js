var myChart = echarts.init(document.querySelector(".map .chart"));
$('<div class="back">返回</div>').appendTo(
    $('#r2')
);

$('.back').css({
    'position': 'absolute',
    'left': '17px',
    'top': '25px',
    'color': 'rgb(222,222,222)',
    'font-size': '15px',
    'cursor': 'pointer',
    'z-index': '100'
})

$('.back').click(function() {
    if (parentInfo.length === 1) {
        return;
    }
    parentInfo.pop()
    getGeoJson(parentInfo[parentInfo.length - 1].code)
})

var parentJson = null
var parentInfo = [{
    cityName: '全国',
    level: 'china',
    code: 100000
}]
var parent
getGeoJson(100000)

/**
 *  利用高德api获取行政区边界geoJson
 *   adcode 行政区code 编号
 **/

//此版本不再维护，准备在写另一个新版本

function getGeoJson(adcode) {
    AMapUI.loadUI(['geo/DistrictExplorer'], DistrictExplorer => {
        var districtExplorer = new DistrictExplorer()
        districtExplorer.loadAreaNode(adcode, function(error, areaNode) {
            if (error) {
                console.error(error);
                return;
            }
            parent = areaNode
            let Json = areaNode.getSubFeatures()
            if (Json.length > 0) {
                parentJson = Json
            } else if (Json.length === 0) {
                Json = parentJson.filter(item => {
                    if (item.properties.adcode == adcode) {
                        return item
                    }
                })
                if (Json.length === 0) return
            }
            //去获取数据
            getMapData(Json)
        });
    })
}

//获取数据，这里我们用随机数模拟数据

function getMapData(Json) {
    // let mapData = [{
    //         name: '广东省',
    //         value: 1000,
    //         level: 'province',
    //         cityCode: 440000
    // },
    // {
    //         name: '湖南省',
    //         value: 2000,
    //         level: 'province',
    //         cityCode: 430000
    // }]
     var mapData
            $.ajax({
                url:"/r2",
                data: {name: parent.getName() },
                success: function (data) {
                    mapData=data.data;
                    let pointData = Json.map(item => {
                        return ({
                            name: item.properties.name,
                            value: ['118.83531246', '32.0267395887', Math.random() * 1000],
                            cityCode: item.properties.adcode
                        })
                    })
                    let mapJson = {}
                    //geoJson必须这种格式
                    mapJson.features = Json
                    //去渲染echarts
                    initEcharts(mapData, pointData, mapJson)
                },
                error: function (xhr, type, errorThrown) {
                }
            })

    let pointData = Json.map(item => {
        return ({
            name: item.properties.name,
            value: ['118.83531246', '32.0267395887', Math.random() * 1000],
            cityCode: item.properties.adcode
        })
    })
    let mapJson = {}
    //geoJson必须这种格式
    mapJson.features = Json

    //去渲染echarts
    initEcharts(mapData, pointData, mapJson)
}

function initEcharts(mapData, pointData, mapJson) {
    //注册
    echarts.registerMap('Map', mapJson);

    //这里加true是为了让地图重新绘制，不然如果你有筛选的时候地图会飞出去
    myChart.setOption({
        backgroundColor: 'rgb(20,28,52)',
        // tooltip: {
        //     trigger: "item",
        //     formatter: p => {
        //         let val = p.value;
        //         if (window.isNaN(val)) {
        //             val = 0;
        //         }
        //         let txtCon =
        //             "<div style='text-align:center'>" + p.name + ":<br />台量：" + val.toFixed(2) + '</div>';
        //         return txtCon;
        //     }
        // },
         tooltip: {
                    formatter: function(params, ticket, callback) {
                        return params.data.name + "<br />" + "累计确诊" + "：" + params.data.value +
                            "<br />" + "累计治愈" + "：" + params.data.heal + "<br />"
                            + "累计死亡" + "：" + params.data.dead + "<br />" + "疑似病例：" + 0
                    }
                },
        title: {
            show: true,
            x: "center",
            y: "top",
            text: parentInfo[parentInfo.length - 1].cityName + "地图实现点击下钻",
            textStyle: {
                color: "#fff",
                fontSize: 16
            }
        },
        //这里可以添加echarts内置的，例如下载图片等
        toolbox: {
            feature: {
                dataView: {
                    show: false,
                    readOnly: true
                },
                magicType: {
                    show: false,
                    type: ["line", "bar"]
                },
                restore: {
                    show: false
                },
                saveAsImage: {
                    show: true,
                    name: parentInfo[parentInfo.length - 1].cityName + "地图",
                    pixelRatio: 2
                }
            },
            iconStyle: {
                normal: {
                    borderColor: "#41A7DE"
                }
            },
            itemSize: 15,
            top: 20,
            right: 22
        },

        visualMap: {
        show:true,
        size:16,
        x:'left',
        y:'bottom',
        textStyle: {
            fontSize:14
        },  //这是那个图例的文字和颜色配置
        splitList: [{start:1,end:9},
                {start:10,end:99},
                {start:100,end:999},
                {start:1000,end:9999},
                {start:10000}],
        color:['#8A3310','#C64918','#E55B25','#F2AD92','#F9DCD1']
    },
        series: [{
                name: "地图",
                type: "map",
                map: "Map",
                roam: true, //是否可缩放
                zoom: 1.1, //缩放比例
                data: mapData,
                itemStyle: {
                    normal: {
                        show: true,
                        areaColor: '#2E98CA',
                        borderColor: 'rgb(185, 220, 227)',
                        borderWidth: '1',
                    },
                },
                label: {
                    normal: {
                        show: true, //显示省份标签
                        textStyle: {
                            color: "rgb(249, 249, 249)", //省份标签字体颜色
                            fontSize: 12
                        },
                        formatter: p => {
                            let val = p.value;
                            if (window.isNaN(val)) {
                                val = 0;
                            }
                            //
                            switch (p.name) {
                                case '内蒙古自治区':
                                    p.name = "内蒙古"
                                    break;
                                case '西藏自治区':
                                    p.name = "西藏"
                                    break;
                                case '新疆维吾尔自治区':
                                    p.name = "新疆"
                                    break;
                                case '宁夏回族自治区':
                                    p.name = "宁夏"
                                    break;
                                case '广西壮族自治区':
                                    p.name = "广西"
                                    break;
                                case '香港特别行政区':
                                    p.name = "香港"
                                    break;
                                case '澳门特别行政区':
                                    p.name = "澳门"
                                    break;
                                default:
                                    // code
                            }
                            if (p.name === "内蒙古自治区") {
                                p.name = "内蒙古";
                            }
                            let txtCon =
                                p.name;
                            return txtCon;
                        }
                    },
                    emphasis: {
                        //对应的鼠标悬浮效果
                        show: true,
                        textStyle: {
                            color: "#000"
                        }
                    }
                }
                },
            {
                name: '散点',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                rippleEffect: {
                    brushType: 'fill'
                },
                itemStyle: {
                    normal: {
                        color: '#F4E925',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                data: pointData,
                symbolSize: 8,
                showEffectOn: 'render', //加载完毕显示特效
            },
        ]
    }, true)

    //点击前解绑，防止点击事件触发多次
    myChart.off('click');
    myChart.on('click', echartsMapClick);
}

//echarts点击事件

function echartsMapClick(params) {
    console.log("=========params===========")
    console.log(params)
    console.log("=========params===========")
    //如果当前是最后一级，那就直接return
    if (parentInfo[parentInfo.length - 1].code == params.data.cityCode) {
        return
    }
    let data = params.data
    parentInfo.push({
        cityName: data.name,
        level: data.level,
        code: data.cityCode
    })
    getGeoJson(data.cityCode)
}