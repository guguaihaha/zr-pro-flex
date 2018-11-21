//此文件会压缩到static目录下
Zr.add("./js/demo",function(zr,$){
        //常用工具类
    var tools = zr.tools,
        //常用节点控制方法
        dom = zr.dom;
    var demo = {
       init:function(config){
           //初始化方法
           this.events.domClickEvent();
       },
       //临时变量存放处
       options:{
           index:0,
       },
       //事件方法,建议以event结尾，e.g: domClick => domClickEvent
       events:{
           domClickEvent:function(){
               //jquery 语法
               $("body").off("click",demo.eventsFn.domClickFn).on("click",demo.eventsFn.domClickFn)
           }
       },
       //事件引用方法或者静态方法，建议以fn结尾，e.g: domClick => domClickFn
       eventsFn:{
           domClickFn:function(){
               demo.options.index++;
               console.log(demo.options.index);
           }
       },
        //数据请求方法，建议以ajax结尾，e.g: domReload => domReloadAjax
       ajax:{
           domReloadAjax:function(){}
       }


    }
    //返回暴露的公共方法或者公共变量
   return {
       init:demo.init,
       setIndex:function(number){
           demo.options.index = number;
       },
       getIndex:function(){
           return demo.options.index;
       }
   }
},{requires:["jquery"]})