//页面的每一张大表
function Op(xLabel,xData,color){
//	this.xLabel=xLabel;
//	this.xData=xData;
//	this.color=color;
	this.option={
		 color: color,
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
    	top:18,
        left: '5%',
        right: '5%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : xLabel,
            axisTick: {
                alignWithLabel: true
            },
            axisLabel:{
            	interval:0	
            },
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'数量',
            type:'bar',
            barWidth: '60%',
            label:{
            	normal:{
            		show:true,
            		position:'top',
            		textStyle:{
            			color:'#333'
            		}
            	}
            },
            data:xData
        }
    ]
	};
	console.log(this.color)
}


//每一个可以点击的条
function Bar(xLabel,xData,color,place,type){
	this.xLabel=xLabel;
	this.xData=xData;
	this.color=color||['#3398DB'];
	this.place=place;
	this.type=type;
	var option=new Op(xLabel,xData,color).option;
	this.option=option;
}
Bar.prototype.status='户在人不在';
Bar.prototype.show=function(){
	zeroModal.show({
            title: this.place+'-'+this.type+'-'+this.status,
			content: '加载中...',
            width: '90%',
            height: '450px',
            opacity: 0.8,
            esc:true
        });
        var con=echarts.init($('.zeromodal-body')[0]);
        con.setOption(this.option);
}
//window.onresize=function(){
////	var ocan=document.getElementsByTagName('canvas');
//	var ocan=$('canvas');
//	for(var i in ocan){
//		ocan.eq(i).resize();
//	}
//}
