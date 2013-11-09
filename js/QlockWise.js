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
        { title: 'tanden poetsen',  colorType: 'red', type: 'brushTeeth', duration: 2, skippable: 0},
        { title: 'opruimen', colorType: 'gold', type: 'clean', duration: 1, skippable: 1},
        { title: 'TV kijken', colorType: 'blue', type: 'watchTV', duration: 2, skippable: 1},
        { title: 'Aankleden', colorType: 'green', duration: 5, type: 'dress' },
        { title: 'Eten', colorType: 'orange', duration: 15, type: 'eat' }
      ],
      
      /*
      Tanden poetsen          blauw
      Opruimen                   oranje
      Aankleden                  groen
      Eten                            roze
      Schooltas inpakken    paars
      TV kijken                   rood
      Spelen                         geel
      Bezig zijn                   oranje
      */
      taskTypes: {
        'brushTeeth': {title: 'Tanden poetsen', skippable: 0},
        'clean': {title: 'Opruimen', skippable: 1},
        'dress': {title: 'Aankleden', skippable: 1},
        'eat': {title: 'Eten', skippable: 1},
        'pack': {title: 'Schooltas inpakken', skippable: 1},
        'watchTV': {title: 'TV kijken', skippable: 1},
        'play': {title: 'Spelen', skippable: 1}
      },
      videos: {
        'red': {src: 'red.mp4'},
        'gold': {src: 'gold.mp4'},
        'blue': {src: 'blue.mp4'}
      },
      
      timeUnit: 10 // in seconds
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
      
      setupTaskScreen();
      $.mousedirection();
      $('body').on('mousedirection', parallaxBg);
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
    
    var parallaxBg = function(e){
      var dir = e.direction;
      if(dir == 'right') {
        $('.bg').css('backgroundPosition', '+=30px 100%');
        $('.dock').delay(1000).css('backgroundPosition', '+=10px 100%');
      } else if (dir == 'left') {
        $('.bg').css('backgroundPosition', '-=30px 100%');
        $('.dock').delay(1000).css('backgroundPosition', '-=10px 100%');
      }
      $('.bg, .dock').css('background-size', '100% 100%');
    };
    
    // for edit screen
    
    
    var setupTaskScreen = function(){
      // when task list screen is entered?
      
      clearTaskList();
      
      $("button[data-role='add-item']").on('click touchend',
        function(){
          addTask.call(this);
        }
      );
    };
    
    var addTask = function(e){
      var selection = $(this).parent().find('select');
      var output = $('[ data-role="output-items"]').find('output');
      var selected = [];
      selection.each(function(){
        var text = $(this).find(':selected').text();
        selected.push(text);
      });
      if(output.text() == '') {
        output.text(selected[1] + ' ' + selected[0].toLowerCase());
      } else {
        $('[ data-role="output-items"]').append('<li><output>'+ selected[1] + ' ' + selected[0].toLowerCase() +'</output></li>');
      }
      
      settings.taskList.push({
        type: $(selection[0]).val(), 
        duration: $(selection[1]).val()
      });
      
      console.log(settings.taskList);
      
    };
    
    var clearTaskList = function(){
      // when task list screen is entered?
      settings.taskList = [];
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