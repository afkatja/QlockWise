/*jslint browser:true, sloppy:true, vars:true, indent:2 */
/*global jQuery, $ */
/*#jslint devel:true, debug:true */
(function ($) {
  "use strict";

  // TODO: set suitable name:
  var pluginName = 'BallKeeper';

  $[pluginName] = function (element, options) {

    var plugin = this;
    var $element = $(element);

    // defaults
    var defaultOptions = {
    
    
    };

    // (internal) settings
    var settings = {
      setOfBalls: [],
      onColorChanged: function () { },
      onContainerEmpty: function () { },
      currentColor: null
    };
  
    //constructor
    var init = function () {

      settings = $.extend({}, settings, defaultOptions, options);
      
      fillContainer();
      //

    }; // end init()

    var fillContainer = function(){
    
      //dummy code, yikes
      var html = '';
      $.each(settings.setOfBalls, function( index, value ) {
        if (index === 0){
          settings.currentColor = value.colorType;
        };
        for (var i = 0; i < value.duration; i++){
          html += '<span style="float:left;width:30px;height:30px;background:' + value.colorType + '" data-color-type="' + value.colorType + '">' + value.duration + '</span>';
        }
      });
      $element.html(html);
    };

    this.spitBall = function(ballNumber){
      // ballNumber not used yet, but can come in handy
      
      //dummy code
      //var $el = $element.find(':first-child');

      $element.find(':first-child').remove();
      
      var $el = $element.find(':first-child');
      
      if (!$el.length){
        //done!
        settings.onContainerEmpty.call(plugin);
        return;
      }
      
      if ($el.data('colorType') != settings.currentColor){
        settings.currentColor = $el.data('colorType');
        settings.onColorChanged.call(plugin);
      }
      
    };
    
    // initialize
    init();

  };
  

  $.fn[pluginName] = function (options) {
    var plugin = new $[pluginName](this, options);
    return plugin;
  };

}(jQuery)); 