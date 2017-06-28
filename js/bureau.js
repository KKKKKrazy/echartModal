//test0606
var chart1=echarts.init($("#city_situation")[0]);
var option1=new Op(['常口', '暂口', '驾驶员', '机动车', '电动车'],[10, 52, 5, 16,8],['#B22222']).option;
console.log(option1);

chart1.setOption(option1);

var chart2=echarts.init($("#local")[0]);
var option2=new Op(['越城', '柯桥', '上虞', '诸暨', '嵊州', '新昌', '袍江','滨海'],[10, 52, 5, 16,8,19,20,18],['#3398DB']).option;
chart2.setOption(option2);

var chart3=echarts.init($("#dirver")[0]);
var chart4=echarts.init($("#vehicle")[0]);
var chart5=echarts.init($("#elecMobile")[0]);

chart3.setOption(option2);
chart4.setOption(option2);
chart5.setOption(option2);

chart2.on('click',function(params){
//	console.log(params);
	var label=['稽山派出所', '东湖派出所','皋埠派出所','陶堰派出所', '富盛派出所', '蕺山派出所', '水上派出所', '塔山派出所', '府山派出所', '北海派出所', '城南派出所', '鉴湖派出所', '车站派出所', '东浦派出所','灵芝派出所'];
	var data=[10, 52, 5, 16,8,19,20,18,10, 52, 5, 16,8,19,20];
	//data 实际应该动态获取
	var place=params.name;
	
	var bar=new Bar(label,data,['#3398DB'],place,'常口');
	bar.show();
});






window.onresize=function(){
	var ocan=document.getElementsByTagName("canvas");
	var wid1=$(".item").eq(0).css("width");
	var wid2=$(".item2").eq(0).css("width");
	$("canvas").eq(0).css("width",wid1);
	for(var i=1;i<$("canvas").length;i++){
		$("canvas").eq(i).css("width",wid2);
	}
}
