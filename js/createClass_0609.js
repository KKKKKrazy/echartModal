//创建类模拟库
var Class=function(){
	var klass=function(){
		this.init.apply(this,arguments);
	};
	klass.prototype.init=function(){};
	return klass;
};

var Person=new Class();

Person.prototype.init=function(){
	//基于Person的实例做初始化
};

var person1=new Person;

//给类添加函数
//a:在构造函数中给类添加函数（和给对象添加属性一样）
Person.find=function(id){
	console.log(id);
}
var person2=Person.find(2);
//b:给构造函数添加实例函数
Person.prototype.breath=function(){
	console.log('I am breathing!!!');
};
var person3=new Person;
person3.breath();
//---常用模式\n
Person.fn=Person.prototype;
Person.fn.run=function(){
	console.log('I am running!');
}

//给类库2添加方法
//用到extend()和include()--可以方便分辨类的静态属性和实例的属性
var Class2=function(){
	var klass=function(){
		this.init.apply(this,arguments);
	};
klass.prototype.init=function(){};
klass.fn=klass.prototype;
//定义类的别名
klass.fn.parent=klass;
//给类添加属性
klass.extend=function(obj){
	var extended=obj.extended;
	for(var i in obj){
		klass[i]=obj[i];
	}
	if(extended) extended(klass);
}

//给实例添加属性
klass.include=function(obj){
	var included=obj.included;
	for(var i in obj){
		klass.fn[i]=obj[i];
	}
	if(included) included(klass);
}

return klass;
};

//类库增强版 通过迭代将参数对象的属性直接复制到类上
var Person3=new Class2;
Person3.extend({
	find:function(id){
		console.log(id);
	},
	exists:function(id){
		console.log(id+' is exists!')
	}
});
var person3=Person.find(3);

var Person3=new Class2();
Person3.extend({//类实例的属性 而不是类的静态属性
	find:function(id){
		console.log('extend find id is '+id);
	},
	exists:function(id){
		console.log('extend exists id is '+id);
	}
});
var  person4=Person3.find(4);
Person3.include({
	save:function(id){
		console.log('include save id '+id);
	},
	destroy:function(id){
		console.log('include destroy id '+id);
		
	}
});
var person5=new Person3;
person5.save();
person5.save(5);
