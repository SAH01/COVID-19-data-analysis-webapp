var ec_center = echarts.init(document.getElementById('c2'),"dark");
// var mydata = [{'name':'上海','value':318},{'name':'云南','value':162}]
var map_data = [{ name: '河北', value: 900 , heal:200 , dead:20 }];
var ec_center_option = {
    title: {
        text:  '全国疫情地图',
        subtext: '',
        x: 'center',
        y: 80,
        // y: ''
      textStyle:{
            color: '#EEEE00',
            size: 18
      }
    },
    //工具栏
    tooltip: {
        trigger: 'item',
        formatter: function(params, ticket, callback) {
            return  params.data.name + "：" + "<br />" + "累计确诊" + "：" + params.data.value +
                "<br />" + "累计治愈" + "：" + params.data.heal + "<br />" + "累计死亡" + "：" +
                params.data.dead + "<br />" + "疑似病例：" + "暂无信息"
        }
    },
    //左侧小导航
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
    //配置属性  这是鼠标点到地图要显示什么东西
    series: [{
        name:'累计确诊人数',
        type:'map',
        mapType:'china',
        zoom: 1.2,
        roam:false,  //禁止拖动缩放
        //itemStyle 每一块地图的样式 emphasis鼠标放到上面的样式
        itemStyle: {
            normal: {
                borderWidth:.5,  //边框宽度
                borderColor:'#009fe8',  //区域边框颜色
                areaColor:'#ffefd5',  //区域颜色
            },
            emphasis: {  //鼠标滑过高亮
                borderWidth: .5,
                borderColor: '4b0082',
                areaColor: '#fff',
            }
        },
        // 具体的在每一块地图里面的文字
        label: {//每个省里面的字号的大小以及其他的东西
            normal: {
                show:true,//省份名称
                fontSize: 12,
            },
            emphasis: {
                show: true ,//省份名称
                fontSize: 16,
            }
        },
            data: map_data
        }]
};
ec_center.setOption(ec_center_option)
