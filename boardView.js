var rows = 40; 
var columns = 40; 




$(document).ready(function(){
  var board = Board(rows, columns); 

  var pause = false; 

  var toggle =  function(x, y){
    board.toggleCell(x, y); 
  };

  var render = function(){
    if (!pause){
      board.update();
      updateRender();
      window.setTimeout(render, 500); //put self on event list again
    }
  }; 

  var updateRender = function(){
      $('#grid tr').each(function() {
        $(this).children("td").each( function(){
          var x = $(this).attr('x'); 
          var y = $(this).attr('y'); 
          if( board.isAlive(x,y)) {
            $(this).attr('class', 'cellAlive');
          }else{
            $(this).attr('class', 'cellDead');
          }
        });
      });
  };



  for (var y = 0; y < rows; y++){
    var $row = $("<tr />", {
      class: 'row'
    }); 
    for (var x = 0; x < columns; x++){
      var $cell = $("<td />", {
        class: 'cellDead',
        'x': x,
        'y': y
      }); //toggle in the model, now render
      $row.append($cell.clone() ); 
       //select class= row, append cell 
    }
    $("#grid").append($row.clone());  //select id='grid'
  }

  $('td').click(function(){
    var x = $(this).attr('x'); 
    var y = $(this).attr('y'); 
    toggle(x,y); 
    updateRender();
  });

  //view should subscribe to the board changing, 
  //if board changes, then there's a callback with what changed where 
  //so view can update. 


  //register listeners for the buttons 
  var $play = $('#playButton').click( function(){
    pause = false; 
    render(); 
  });
  var $pause = $('#pauseButton').click( function(){
    pause = true; 
  });
  $('#glider').click( function(){
    pause = true; 
    board = Board(rows, columns); 
    board.toggleCell(1,3);
    board.toggleCell(2,3);
    board.toggleCell(3,3);
    board.toggleCell(3,2);
    board.toggleCell(2,1);
    updateRender(); 
    pause = false; 
    render(); 
  });
  $('#simpleO').click( function(){
    pause = true; 
    board = Board(rows, columns); 
    board.toggleCell(1,3);
    board.toggleCell(2,3);
    board.toggleCell(3,3);
    updateRender(); 
    pause = false; 
    render(); 
  });

}); 
