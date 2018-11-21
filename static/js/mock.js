
Zr.add("./js/mock",function(zr,Mock){var tools=zr.tools,dom=zr.dom;var router=[{url:"/dashboard/workboard.json",type:"post",data:[{"type":1,"name":2},{"type":1,"name":2}]}]
tools.each(router,function(i,n){Mock.mock(n.url,n.type,n.data);})
return{}},{requires:["mock"]})