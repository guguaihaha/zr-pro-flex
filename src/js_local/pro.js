//此文件会压缩到static目录下
Zr.add("./js/pro",function(zr,$){
        //常用工具类
    var tools = zr.tools,
        //常用节点控制方法
        dom = zr.dom;
    var $side = $(".zr-layout-side"),
        $nav = $side.find(".zr-nav"),
        $bg = $(".zr-layout").first().find(".zr-layout-side"),
        $layout = $(".zr-layout > .zr-layout"),
        $trigger = $(".zr-layout-trigger"),
        $headerNav = $(".zr-layout-header .zr-nav"),
        $menuIcon = "",
        $sideBg = "";
    /**
    * @Author: zhangjinglin
    * @Email: zhangjinglin@jd.com
    * @Date: Created in 2018/7/16 下午9:26
    * @Description:IE检测
    * @params <String> paramName
    * @paramsDescription  paramName :
    */

    function IEVersion() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
        var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
        if(isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if(fIEVersion == 7) {
                return 7;
            } else if(fIEVersion == 8) {
                return 8;
            } else if(fIEVersion == 9) {
                return 9;
            } else if(fIEVersion == 10) {
                return 10;
            } else {
                return 6;//IE版本<=7
            }
        } else if(isEdge) {
            return 'edge';//edge
        } else if(isIE11) {
            return 11; //IE11
        }else{
            return -1;//不是ie浏览器
        }
    }

    var pro = {
       init:function(config){
           var _v = IEVersion();
           if( _v <= 9 && _v > -1){
               $("body").prepend(pro.options.warning);
               return false;
           }
           //初始化方法
           this.events.resizeEvent();
       },
       //临时变量存放处
       options:{
           warning:"<div class='pro-warning-top'>" +
           "<div class=\"zr-alert zr-alert-warning zr-alert-with-icon\">\n" +
           "        <i class=\"zricon-info\"></i>\n" +
           "        <span class=\"zr-alert-message\">您正在使用的浏览器版本过低，不能正常浏览和使用本系统，请使用<a href='https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads'>IE10以上</a>系统或者<a href='http://www.firefox.com.cn/'>火狐</a>、<a href='https://en.softonic.com/s/chrome?'>Chrome</a></span>\n" +
           "    </div>" +
           "</div>"
       },
       events:{
           resizeEvent:function(){
               var width = $(window).width();
               pro.eventsFn.resizeFn(width);
               $bg.append("<div class='zr-bgground-shadow zr-bgground-show'></div>");
               $headerNav.before("<i class='zricon-classify-empty'></i>");
               //
               //
               tools.later(function(){
                   $sideBg = $(".zr-bgground-shadow");
                   $menuIcon = $(".zricon-classify-empty");
                   $sideBg.off("click").on("click",function(){
                       $trigger.click();
                   })
                   $menuIcon.off("click").on("click",function(ev){
                       ev.stopPropagation();
                       if($headerNav.hasClass("zr-nav-block")){
                           $headerNav.removeClass("zr-nav-block");
                       }else{
                           $headerNav.addClass("zr-nav-block");
                       }

                   })
                   $headerNav.on("click",function(ev){
                       ev.stopPropagation();
                   })
                   zr.dom.clickQueen.push(function(){
                       $headerNav.removeClass("zr-nav-block");
                   })



               },0)
               dom.resizeQueen.push(pro.eventsFn.resizeFn)
           }
       },
       eventsFn:{
           resizeFn:function(width){
               if(width <= 479){
                   //手机
                   $side.addClass("zr-layout-collapsedClassName");
                   $nav.addClass("zr-nav-collapsed");
                   $layout.addClass("zr-layout-low")
               }
               if(width >= 480){
                   //pad
                   $side.addClass("zr-layout-collapsedClassName");
                   $nav.addClass("zr-nav-collapsed");
                   $layout.addClass("zr-layout-low");
               }
               if(width >= 992){
                   //pc端
                   $side.removeClass("zr-layout-collapsedClassName");
                   $nav.removeClass("zr-nav-collapsed");
               }

           }
       },
       ajax:{

       }


    }
    //
    pro.init();
   return {
   }
},{requires:["jquery"]})