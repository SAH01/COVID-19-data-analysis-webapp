var ec_left1 = echarts.init(document.getElementById('l1'),"dark");

var ec_left1_Option = {
    title: {
        text: '全国累计趋势',
        textStyle:{
            color:'yellow',
			fontSize: 16
        },
        left:'left',
    },
    tooltip: {
        trigger: 'axis',
        //指示器:
        axisPointer:{
            type:'line',
            lineStyle:{
                color: '#7171C6'
            }
        },
    },
    //这里面里的 data 一定是 series 里name
    legend: {
        data: ['累计确诊', '现有疑似', '累计治愈', '累计死亡'],
        left: "right"
    },

    grid: {
        left: '4%',
        right: '6%',
        bottom: '4%',
        top:50,
        containLabel: true
    },
    // toolbox: {
    //     feature: {
    //         saveAsImage: {}
    //     }
    // },
    xAxis: [{
        type: 'category',
        // boundaryGap: false,
        data: []
    }],

    yAxis: [{
        type: 'value',
        axisLabel:{
            show:true,
            color:'white',
            fontSize: 12,
            formatter:function (value) {
                if(value >= 1000)
                {
                    value=value/1000 + 'k';
                }
                return value;
            }
    },
    //y轴线设置
    axisLine: {
        show: true
    },
    //与x平行的线设置
    spiltLine: {
        lingStyle: {
            color:'#172738',
            width: 1,
            type: 'solid',
        }
    }
}],
    series: [
        {
            name: '累计确诊',
            type: 'line',
            smooth:true,
            // stack: '总量',
            data: []
        },
        {
            name: '现有疑似',
            type: 'line',
            smooth:true,
            // stack: '总量',
            data: []
        },
        {
            name: '累计治愈',
            type: 'line',
            smooth:true,
            // stack: '总量',
            data: []
        },
        {
            name: '累计死亡',
            type: 'line',
            // stack: '总量',
            smooth:true,
            data: []
        }]
};
ec_left1.setOption(ec_left1_Option)