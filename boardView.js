var rows = 40; 
var columns = 40; 


$(document).ready(function(){
  //var board = Board(rows, columns); 

  var boardCont = boardController(rows, columns); 

  var pause = false; 

  var toggle =  function(x, y){
    boardCont.toggleCell(x, y); 
  };

  var render = function(){
    if (!pause){
      boardCont.update();
      updateRender();
      window.setTimeout(render, 500); //put self on event list again
    }
  }; 

  var updateRender = function(){
      $('#grid tr').each(function() {
        $(this).children("td").each( function(){
          var x = $(this).attr('row'); 
          var y = $(this).attr('col'); 
          if( boardCont.isAlive(x,y)) {
            $(this).attr('class', 'cellAlive');
            console.log("alive at (" + x + ","+y+ ")"); 
          }else{
            $(this).attr('class', 'cellDead');
          }
        });
      });
  };



  for (var row = 0; row < rows; row++){
    var $row = $("<tr />", {
      class: 'row'
    }); 
    for (var col = 0; col < columns; col++){
      var $cell = $("<td />", {
        class: 'cellDead',
        'row': row,
        'col': col
      }); //toggle in the model, now render
      $row.append($cell.clone() ); 
       //select class= row, append cell 
    }
    $("#grid").append($row.clone());  //select id='grid'
  }

  $('td').click(function(){
    var x = $(this).attr('row'); 
    var y = $(this).attr('col'); 
    console.log('clicked'); 
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
    boardCont = boardController(rows, columns); 
    boardCont.toggleCell(1,3);
    boardCont.toggleCell(2,3);
    boardCont.toggleCell(3,3);
    boardCont.toggleCell(3,2);
    boardCont.toggleCell(2,1);
    updateRender(); 
    pause = false; 
    render(); 
  });
  $('#simpleO').click( function(){
    pause = true; 
    boardCont = boardController(rows, columns); 
    boardCont.toggleCell(1,3);
    boardCont.toggleCell(2,3);
    boardCont.toggleCell(3,3);
    updateRender(); 
    pause = false; 
    render(); 
  });

}); 
