var Start = (function(){
  $(function(){
    $('[data-role="add-item"]').click(addItem);
  });
  
  var addItem = function(e){
    var selection = $(this).parent().find('select');
    var output = $('[ data-role="output-items"]').find('output');
    selected = [];
    selection.each(function(){
      var text = $(this).find(':selected').text();
      selected.push(text);
    });
    if(output.text() == '') {
      output.text(selected[1] + ' ' + selected[0].toLowerCase());
    } else {
      $('[ data-role="output-items"]').append('<li><output>'+ selected[1] + ' ' + selected[0].toLowerCase() +'</output></li>');
    }
    
  };
  
  return {
    addItem: addItem
  };
})();