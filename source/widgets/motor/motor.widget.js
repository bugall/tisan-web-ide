!function(){
  if (!window.iotboard){
    console.log("iotboard not initialized!");
    return;
  }

  var widgetName='motor';
  window.iotboard.defineWidget(widgetName, {
    status: {
        speed:'-'
    },
    render: function(dataset){
        var dataset=clone(dataset);
        dataset.status=this.status;
        return template('template-'+widgetName,dataset);
    },
    listeners: [
      {
        selector: ".motor-range",
        event: "change",
        behavior: "set"
      },{
        selector: ".btn-refresh",
        event: "click",
        behavior: "get"
      }
    ],
    parseStatus: function(dom){
      return {
        speed: dom.find(".motor-range").val()
      }
    },
    onRendered:function(dom){
        dom.find('.motor-range').on('input',function(){
            dom.find('.motor-speed').text($(this).val());
        });
		dom.find('.btn-reset').on('click',function(){
			dom.find('.motor-range').val(0);
            dom.find('.motor-speed').text(0);
			dom.find('.motor-range').change();
		});
    }
  });
}();
