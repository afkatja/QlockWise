/*jslint browser:true, sloppy:true, vars:true, indent:2 */
/*global jQuery, $ */
/*#jslint devel:true, debug:true */
(function ($) {
  "use strict";

  // TODO: set suitable name:
  var pluginName = 'QlockWise';

  $[pluginName] = function (element, options) {

    var plugin = this;
    var $element = $(element);

    // defaults
    var defaultOptions = {
      taskList: [
        { title: 'tanden poetsen', iconSrc : 'src/sdfsd.png', colorType: 'red', duration: 2, skippable: 0},
        { title: 'spelen', iconSrc : 'src/sdfsd.png', colorType: 'gold', duration: 1, skippable: 1},
        { title: 'spelen', iconSrc : 'src/sdfsd.png', colorType: 'blue', duration: 2, skippable: 1}
      ],
      videos: {
        'red': {src: 'red.mp4'},
        'gold': {src: 'gold.mp4'},
        'blue': {src: 'blue.mp4'}
      },
      
      timeUnit: 3 // in seconds
    };

    // (internal) settings
    var settings = {
      startTimeStamp: null,
      clockIntervalObj: null,
      currentTimeUnit: 0 
    };
    
     // objects
    var objects = {
      ballKeeper: null,
      filmDirector: null
    };
    


    //constructor
    var init = function () {

      settings = $.extend({}, settings, defaultOptions, options);
      
      onPlayScreenEntered();
      
    }; // end init()
    
    
    // when going form start screen to play screen
    var onPlayScreenEntered = function(){
      
      
      /*objects.filmDirector = $('#video').FilmDirector({
        videos: settings.videos
      });*/
      
      objects.ballKeeper = $('#balls-container').BallKeeper({
        setOfBalls: convertTaskListToSetOfBalls(settings.taskList),
        onColorChanged: onTaskFinished,
        onContainerEmpty: onAllTasksFinished
      });
      
      
      startClock();
      
    };
    
    var startClock = function(){
      settings.currentTimeUnit = 0;
      settings.startTimeStamp = new Date();
      settings.clockIntervalObj = setInterval(onClockTick, 100);
    };
    
    var onClockTick = function(){
      var timeDiff = Math.floor((new Date() - settings.startTimeStamp) / 1000);
      if (timeDiff % settings.timeUnit == 0 && timeDiff != settings.currentTimeUnit){
        settings.currentTimeUnit = timeDiff;
        console.log(timeDiff + 'new balls');
        onNewTimeUnitFetched(settings.currentTimeUnit);
      }
    };
    
    var onNewTimeUnitFetched = function(timeUnit){
      objects.ballKeeper.spitBall(timeUnit);
    };
    
    
    // helper for later: to do some handy preparing
    var convertTaskListToSetOfBalls = function(taskList){
      return taskList;
    }
    
    var onTaskFinished = function(){
      
      console.log('task finished');
    
    };
    
    var onAllTasksFinished = function(){
      
      console.log('all tasks finished');
    
    };
    
    // for edit screen
    
    this.clearTaskList = function(){
      // when task list screen is entered?
      
    };
    
    this.createTaskList = function(){
      // create whole set
      /*
        for (){
          this.createTask(...);
        }
      */
      
    };
    
    this.createTask = function(){
    
    };
    
    // end for edit screen
    
    
    //external calls
    plugin.getObject = function(name){
      if (!objects[name]){
        return null;
      }
      return objects[name];
    };

    // initialize
    init();

  };

  $.fn[pluginName] = function (options) {
    var plugin = new $[pluginName](this, options);
    return plugin;
  };

}(jQuery)); 