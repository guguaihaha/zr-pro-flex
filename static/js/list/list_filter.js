
Zr.add("./js/list/list_filter",function(zr,$,modal){var tools=zr.tools,dom=zr.dom;var list={init:function(config){this.events.btnToolsEvent();},options:{},events:{btnToolsEvent:function(){var prompt=modal.init(".zr-modal-prompt"),imports=modal.init(".zr-modal-import");$("#newModal").on("click",function(){prompt.show();})
$("#newImport").on("click",function(){imports.show();})}},eventsFn:{},ajax:{}}
list.init();return{}},{requires:["jquery","modal"]})