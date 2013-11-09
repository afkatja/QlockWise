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
      currentType: null
    };
  
    //constructor
    var init = function () {

      settings = $.extend({}, settings, defaultOptions, options);
      
      fillContainer();
      //

    }; // end init()

    var fillContainer = function(){
      var count = 0;
      settings.setOfBalls = settings.setOfBalls.reverse();
      $.each(settings.setOfBalls, function( index, value ) {
        
        
        for (var i = 0; i < value.duration; i++){
          var ball = $('<div class="ball rotating" data-type="' + value.type + '"/>');
          $('.balls').append(ball.addClass('delayed-'+ count + ' ' + value.type));
          count++;
        }
      });
      $($('.ball').get().reverse()).each(function(i, val) {
        $(this).css('animation-duration', (i + 1) + 's');
      });
      
      settings.currentType = settings.setOfBalls[settings.setOfBalls.length - 1].type;
      //console.log('first' + settings.currentType);
      //$element.html(html);
    };

    this.spitBall = function(ballNumber){
      //return;
      // ballNumber not used yet, but can come in handy
      //dummy code
      var $ball = $element.find('.ball');
      
      //$ball.last().remove();
      
      
      $ball.last().fadeOut(600, function(){
        $(this).removeClass('rotating').appendTo('.rolloff-container');
      });
      
      //again
      var $ball = $element.find('.ball:not(:last)');
      
      if (!$ball.length){
        //done!
        settings.onContainerEmpty.call(plugin);
        return;
      }
      
      
      if ($ball.last().data('type') != settings.currentType){
        settings.currentType = $ball.last().data('type');
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