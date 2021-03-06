﻿var ECharts = {

    DefaultTheme:"macarons",

    ChartConfig: function (container, option) {
        this.option = { chart: {}, option:option, container:container };
        return this.option;
    },





    ChartDataFormate: {
        FormateNOGroupData: function (data) {
            //data的格式 [{"name":"文件档案管理类","value":5},{"name":"青菜类","value":4}]
            var categories = [];
            var datas = [];
            for (var i = 0; i < data.length; i++) {
                categories.push(data[i].name || "");
                datas.push({ name: data[i].name, value: data[i].value || 0 });
            }
            return { category: categories, data: datas };
        },



        FormateGroupData: function (data, chart_type, isstack, showarea) {
            //data [{"name":"9月","value":23.50,"group":"采购数量"},{"name":"5月","value":7.00,"group":"申领数量"},{"name":"9月","value":16.25,"group":"申领数量"}]
            var xAxis = [];
            var group = [];
            var series = [];

            for (var i = 0; i < data.length; i++) {


                for (var j = 0; j < xAxis.length && xAxis[j] != data[i].name; j++);

                if (j == xAxis.length)
                    xAxis.push(data[i].name);

                for (var k = 0; k < group.length && group[k] != data[i].group; k++);

                if (k == group.length)
                    group.push(data[i].group);
            }



            var itemStyle = { normal: { areaStyle: { type: 'default'}} };
            if (showarea) {
                itemStyle = { normal: { areaStyle: { type: {}}} };
            }


            //在temp里初始化所有值为0，并设置temp的个数和坐标轴个数一样。
            for (var i = 0; i < group.length; i++) {

                var temp = [];
                for (var m = 0; m < xAxis.length; m++) {
                    temp.push(0);
                }

                for (var k = 0; k < xAxis.length; k++) {
                    for (var j = 0; j < data.length; j++) {
                        if ((xAxis[k] == data[j].name) && (group[i] == data[j].group)) {
                            temp[k] = data[j].value;
                        }
                    }
                }

                var series_temp = "";

                if (showarea) {

                    if (isstack) {
                        series_temp = { name: group[i], stack: 'stack', data: temp, type: chart_type, itemStyle: itemStyle };
                    }
                    else {
                        series_temp = { name: group[i], data: temp, type: chart_type, itemStyle: itemStyle };
                    }
                }
                else {
                    if (isstack) {
                        series_temp = { name: group[i], stack: 'stack', data: temp, type: chart_type };
                    }
                    else {
                        series_temp = { name: group[i], data: temp, type: chart_type };

                    }

                }


                series.push(series_temp);
            }



            return { name: group, data: series, xAxis: xAxis };
        }
    }
    ,

    ChartOptionTemplates: {
        CommonOption: {
            tooltip: {
                trigger: 'axis'//tooltip触发方式:axis以X轴线触发,item以每一个数据项触发 
            },
            calculable: true,
            toolbox: {
                show: true, //是否显示工具栏 
                feature: { 
                    saveAsImage: {}
                }
            }
        }

    }
    ,




    Pie: function (data, name) {
        var pie_datas = ECharts.ChartDataFormate.FormateNOGroupData(data);
        var option = {
            legend: {    
                data: pie_datas.category
               },

            series: [
                    {
                        name: name || "",
                        type: 'pie',
                        center: ['50%', '50%'],
                        data: pie_datas.data
                    }
            ]
        };

        return $.extend({}, ECharts.ChartOptionTemplates.CommonOption, option);
    }
        ,

    Pie2: function (data, name) {
        var pie_datas = ECharts.ChartDataFormate.FormateNOGroupData(data);
        var option = {
            legend: {
                
                data: pie_datas.category
            },

            series: [
                    {
                        name: name || "",

                        label: { normal: {  show: false  } },
                        radius: ['50%', '70%'],
                        type: 'pie',
                        center: ['50%', '50%'],
                        data: pie_datas.data
                    }
            ]
        };

        return $.extend({}, ECharts.ChartOptionTemplates.CommonOption, option);
    }
        ,

     


    Gauge: function(data,name){

        var   option = {
            tooltip: {
                formatter: "{a} <br/>{b} : {c}%"
            },
          
         series: [
        {
            name: '数据指标',
            type: 'gauge',
           
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: [[0.09, 'lime'], [0.82, '#1e90ff'], [1, '#ff4500']],
                    width:10,
                    shadowColor: '#fff', //默认透明
                    shadowBlur: 10
                }
            },

            detail: { formatter: '{value}%' },
            data: [{ value: data , name: name}]
        }
            ]
        };

        return $.extend({}, ECharts.ChartOptionTemplates.CommonOption, option);
    
    
    }
    ,












    Ld: function (data, name) {
        var pie_datas = ECharts.ChartDataFormate.FormateNOGroupData(data);
        var option = {
            legend: {
                data: pie_datas.category
            },

            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}%"
            },

            series: [
                    {
                        name: name || "",
                        type: 'funnel',

                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            },
                            emphasis: {
                                textStyle: {
                                    fontSize: 20
                                }
                            }
                        },

                        center: ['50%', '50%'],
                        data: pie_datas.data
                    }
            ]
        };

        return $.extend({}, ECharts.ChartOptionTemplates.CommonOption, option);
    }
        ,


















    Bars: function (data, name, _is_stack, _showarea, _chart_type) {

         

        var is_stack = false;
        var showarea = false;
        var chart_type = 'line';

        if (_is_stack) {
            is_stack = _is_stack;
        }

        if (_showarea) {
            showarea = _showarea;
        }

        if (_chart_type) {
            chart_type = _chart_type;
        }

        var source_data = ECharts.ChartDataFormate.FormateGroupData(data, chart_type, is_stack, showarea);


        var bars_dates = { category: source_data.name, data: source_data.data, xAxis: source_data.xAxis, type: chart_type };



        var option = {
            legend: {
                orient: 'horizontal',
                data: bars_dates.category
            },

            toolbox: {
                show: true,
                feature: {
                    mark: { show: false },
                    dataView: { show: false, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                    restore: { show: false },
                    saveAsImage: { show: true }
                }
            },

            xAxis: [{
                type: 'category',
                data: bars_dates.xAxis,
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    rotate: 0,
                    margion: 8
                }
            }],

            yAxis: [{
                type: 'value',
                name: name || '',
                splitArea: { show: true }
            }],
            series: bars_dates.data
        };


        return $.extend({}, ECharts.ChartOptionTemplates.CommonOption, option);

    }

    ,











    Charts: {
        RenderChart: function (option) { 
             
            if (option.chart && option.chart.dispose)
                option.chart.dispose();

            option.chart = echarts.init(option.container, ECharts.DefaultTheme);
            window.onresize = option.chart.resize;
            option.chart.setOption(option.option,true);
             
        }
    }



  

}
 
  