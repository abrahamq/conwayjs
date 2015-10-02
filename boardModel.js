//This file holds the board model which can:
//Access cell at (x, y) coordinate 
//  kill();
//  revive();
//  toggle(); 
//
//inBounds(x, y)
//holds cell class

var boardModel = function(width, length){

  var that = Object.create(boardModel.prototype); 

  that.getWidth = function(){
    return width; 
  }; 
  that.getLength = function(){
    return length; 
  };

  var grid = []; 

  var initialize  = function(){
    for(var  x = 0; x < width; x++){
      grid[x] = []; //make the column
      for(var  y = 0; y < length; y++){
        grid[x][y] =  cell(x,y);
      }
    }
  };

  that.inBounds = function(x, y){
    return x< width && y < length && x >= 0 && y >= 0 ;
  }; 

  that.kill = function(x, y){
    grid[x][y].kill(); 
  };

  that.revive = function(x, y){
    grid[x][y].revive(); 
  };

  that.toggleCell = function(x, y){
    if(that.isAlive(x, y)){
      that.kill(x, y); 
    } else {
      that.revive(x, y); 
    }
  };

  that.setNumNeighbors = function(x, y, num){
    grid[x][y].setNumNeighbors(num);
  }; 

  that.getNumNeighbors = function(x, y){
    return grid[x][y].getNumNeighbors(); 
  }; 

  that.isAlive = function(x, y){
    return grid[x][y].isAlive(); 
  }; 

  //takes in a function( x, y, cell) 
  that.forEachCell = function( fn){
    for(var x = 0; x< width; x++){
      for(var y = 0; y< length; y++){
        fn(x, y, grid[x][y]); 
      }
    }
  }; 

  initialize(); 
  return Object.freeze(that); 
};


var cell = function(x, y){
  var that = Object.create(cell.prototype);
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
