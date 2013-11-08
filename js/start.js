var Start = (function(){
  $(function(){
    $('[data-role="add-item"]').click(addItem);
    $('[data-role="start-btn"]').click(startGame);
    $('[data-role="remove-btn"]').click(removeItem);
  });
  
  var addItem = function(e){
    var selection = $(this).parent().find('select');
    var output = $('[ data-role="output-items"]').find('output');
    selected = [];
    
    $('.tasks li.hidden, [data-role=start-btn]').fadeIn(500).removeClass('hidden');
    
    selection.each(function(){
      var text = $(this).find(':selected').text();
      if($(this).find(':selected').val() == 0) {
        $(this).addClass('inactive');
        return;
      } else {
        selected.push(text);
      }
    });
    
    if(output.text() == '') {
      output.text(selected[1] + ' ' + selected[0].toLowerCase());
    } else {
      $(this).parents('li').before('<li class="contain"><output>'+ selected[1] + ' ' + selected[0].toLowerCase() +'</output><button class="btn secondary pictogram right" data-role="remove-btn">X</button></li>');
      $('.tasks select').val(0);
      if($('.tasks li.contain').length == 4) {
        $(this).fadeOut(300);
        $('.tasks select').val(0);
      }
    }
  };
  
  var removeItem = function(){
    var item = $(this).parents('li');
    item.slideUp(300, function(){
      $('.tasks select').val(0);
      $(this).remove();
    });
  };
  
  var startGame = function(){
    
  };
  
  return {
    addItem: addItem,
    startGame: startGame
  };
})();