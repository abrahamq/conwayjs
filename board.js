//can update board
//can update neighbors
var Board = function(width, length){
  'use strict'; 
  var that = Object.create(Board.prototype); 

  that.width = width; 
  that.length = length; 

  var updateNeighbors = function(){
    for(var  x = 0; x < width; x++){
      for(var  y = 0; y < length; y++){
        that.grid[x][y].setNumNeighbors(numNeighbors(x, y));
      }
    }
  };

  that.update = function(){ //does one step of game of life 
    //first go through and update each cell with how many neighbors it has 
    updateNeighbors(); 

    for (var x = 0; x < width; x++){
      for(var  y = 0; y < length; y++){
        var numberOfNeighbors = that.grid[x][y].getNumNeighbors(); //use the cached number of neighbors 
        if( numberOfNeighbors < 2){ //die of lonelyness 
          that.grid[x][y].kill(); 
        }else if ( numberOfNeighbors > 3 ){ //die of over population
          that.grid[x][y].kill(); 
        }else if ( numberOfNeighbors === 3 ){
          that.grid[x][y].revive(); 
        }
      }
    }
    that.print(); 
  }; 

  that.print = function(){
    for(var  y = 0; y < length; y++){
      var row = ''; 
      for (var x = 0; x < width; x++){
        if ( that.grid[x][y].isAlive()){
          row = row+'1'; 
        } else {
          row = row+'0'; 
        }
      }
    }
  };

  var numNeighbors = function(x, y){
    var result = 0; 
    if (insideGrid(x,y)){// inside the grid 
      var upLeft = [x-1, y+1]; 
      var up = [x, y+1]; 
      var upRight = [x+1, y+1]; 
      var downLeft = [x-1, y-1]; 
      var down = [x, y-1]; 
      var downRight = [x+1, y-1]; 
      var right = [x+1, y]; 
      var left = [x-1, y]; 
      //TODO: refactor into nested forEach; 
      if (insideGrid(upLeft[0], upLeft[1]) && that.grid[upLeft[0]][upLeft[1]].isAlive()){
        result += 1; 
      }
      if (insideGrid(up[0], up[1]) && that.grid[up[0]][up[1]].isAlive()){
        result += 1; 
      }
      if (insideGrid(upRight[0], upRight[1]) && that.grid[upRight[0]][upRight[1]].isAlive()){
        result += 1; 
      }
      if (insideGrid(downLeft[0], downLeft[1]) && that.grid[downLeft[0]][downLeft[1]].isAlive()){
        result += 1; 
      }
      if (insideGrid(down[0], down[1]) && that.grid[down[0]][down[1]].isAlive()){
        result += 1; 
      }
      if (insideGrid(downRight[0], downRight[1]) && that.grid[downRight[0]][downRight[1]].isAlive()){
        result += 1; 
      }
      if (insideGrid(right[0], right[1]) && that.grid[right[0]][right[1]].isAlive()){
        result += 1; 
      }
      if (insideGrid(left[0], left[1]) && that.grid[left[0]][left[1]].isAlive()){
        result += 1; 
      }
    }
    return result; 
  }; 

  var insideGrid = function(x, y){
    return x< width && y < length && x >= 0 && y >= 0 ; 
  }; 

  that.setAlive = function(x, y){
    if(insideGrid(x,y)){
      that.grid[x][y].revive(); 
    }
  }; 

  that.toggleCell = function(x, y){
    if(that.isAlive(x, y)){
      that.grid[x][y].kill(); 
    } else {
      that.grid[x][y].revive(); 
    }
  }; 


  var Cell = function(x, y){
    var that = Object.create(Cell.prototype); 
    var isAlive = false; 

    that.x = x; 
    that.y = y; 

    var neighbors = 0; 
    var listeners = []; //array of functions to call when state changes 

    that.isAlive = function(){
      return isAlive; 
    };

    that.kill = function(){
      isAlive = false;
      listeners.forEach( function(e){
        e(isAlive); 
      }); 
    };

    that.revive = function(){
      isAlive = true; 
      listeners.forEach( function(e){
        e(isAlive); 
      }); 
    };

    that.setNumNeighbors = function(num){
      neighbors = num;
    };

    that.getNumNeighbors = function(){
      return neighbors;
    };

    that.addListener = function(fn){
      listeners.push(fn); 
    }; 


    return Object.freeze(that); 
  }; 

  var initialize  = function(){
    that.grid = []; //object with {x, y} keys to a cell 
    for(var  x = 0; x < width; x++){
      that.grid[x] = []; //make the column 
      for(var  y = 0; y < length; y++){
        that.grid[x][y] =  Cell(x,y); 
      }
    }
  }; 

  that.addListener = function( x, y, fn){ //registers function fn to listen to state changes on (x, y) coordinate
    that.grid[x][y].addListener(fn); 
  }; 

  that.isAlive = function(x, y){
    return that.grid[x][y].isAlive(); 
  }; 


  initialize(); 
  return Object.freeze(that); 
}; 

