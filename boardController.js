var boardController = function(width, length){
  'use strict'; 
  var that = Object.create(boardController.prototype); 

  var board = boardModel(width, length); 
  
  var updateNeighbors = function(){
    board.forEachCell( function(x, y, cell){
        board.setNumNeighbors(x, y, numNeighbors(x, y)); 
    }); 
  };

  var numNeighbors = function(x, y){
    var result = 0;
    if (board.inBounds(x,y)){// inside the grid
      var upLeft = [x-1, y+1];
      var up = [x, y+1];
      var upRight = [x+1, y+1];
      var downLeft = [x-1, y-1];
      var down = [x, y-1];
      var downRight = [x+1, y-1];
      var right = [x+1, y];
      var left = [x-1, y];
      
      var list = [ upLeft, up, upRight, downLeft, down, downRight, right, left]; 
      list.forEach( function(elem){
        if (board.inBounds(elem[0], elem[1]) && board.isAlive(elem[0], elem[1])){
          result += 1;
        }
      }); 
    }
    return result;
  };


  that.update = function(){ //does one step of game of life
    //first go through and update each cell with how many neighbors it has
    updateNeighbors();
    board.forEachCell(function(x, y, cell){
      var numberOfNeighbors = board.getNumNeighbors(x, y); //use the cached number of neighbors
        if( numberOfNeighbors < 2){ //die of lonelyness
          board.kill(x, y);
        }else if ( numberOfNeighbors > 3 ){ //die of over population
          board.kill(x, y);
        }else if ( numberOfNeighbors === 3 ){
          board.revive(x, y); 
        }
    }); 
  };

  that.toggleCell = function(x, y){
    board.toggleCell(x, y);
  }; 

  that.isAlive = function(x, y){
    return board.isAlive(x, y); 
  };
  return Object.freeze(that); 
};
