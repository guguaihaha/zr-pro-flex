//此文件会压缩到static目录下
Zr.add("./js/mock",function(zr,Mock){
        //常用工具类
    var tools = zr.tools,
        //常用节点控制方法
        dom = zr.dom;
    var router = [
        {
            url:"/dashboard/workboard.json",
            type:"post",
            data:[
                {
                    "type":1,
                    "name":2
                },
                {
                    "type":1,
                    "name":2
                }
            ]
        }
    ]
    tools.each(router,function(i,n){
        Mock.mock(n.url,n.type,n.data);
    })

    return{}
},{requires:["mock"]})