//
//Partition for board test space: 
//
//tests on rules:
//live: 
//a dead cell with 3 neighbors becomes alive after an update 
//a live cell with 2 neighbors stays alive 
//
//Kill: 
//one cell by itself dies. 
//a cell sorounded by more than 3 cells dies after an update 
//
//test for success after many updates: 
//simple oscilator over 3 updates. 


QUnit.test( 'one cell dies by itself ', function(assert){
  board = boardController(1,1); 
  board.toggleCell(0,0); 

  board.update(); 

  assert.ok(board.isAlive(0,0) === false, 'should not be alive'); 
}); 


QUnit.test( 'dead cell with 2 neighbors stays alive', function( assert ) {
  board = boardController(5, 5); 

  board.toggleCell(0,0); 
  board.toggleCell(1,0); 
  board.toggleCell(0,1); 

  board.update(); 
  assert.ok(board.isAlive(0,1) === true, 'should stay alive'); 
}); 

QUnit.test( 'dead cell with 3 neighbors becomes alive after update', function( assert ) {
  board = boardController(5, 5); 

  board.toggleCell(0,0); 
  board.toggleCell(1,0); 
  board.toggleCell(0,1); 

  assert.ok(board.isAlive(1,1) === false, 'should not be alive before update'); 
  board.update(); 
  assert.ok(board.isAlive(1,1) === true, 'dead cell with 3 live neighbors becomes alive'); 
}); 

QUnit.test( 'simple oscillator', function( assert ) {
  board = boardController(5, 5); 
  board.toggleCell(1,3);
  board.toggleCell(2,3);
  board.toggleCell(3,3);


  board.update();
  assert.ok(board.isAlive(1,3) === false, ''); 
  assert.ok(board.isAlive(2,3) === true, 'should always be alive'); 
  assert.ok(board.isAlive(3,3) === false, ''); 

  assert.ok(board.isAlive(2,2) === true, ''); 
  assert.ok(board.isAlive(2,3) === true, 'should always be alive'); 
  assert.ok(board.isAlive(2,4) === true, ''); 

  board.update(); 
  assert.ok(board.isAlive(1,3) === true, ''); 
  assert.ok(board.isAlive(2,3) === true, 'should always be alive'); 
  assert.ok(board.isAlive(3,3) === true, ''); 

  assert.ok(board.isAlive(2,2) === false, ''); 
  assert.ok(board.isAlive(2,3) === true, 'should always be alive'); 
  assert.ok(board.isAlive(2,4) === false, ''); 

  board.update();
  assert.ok(board.isAlive(1,3) === false, ''); 
  assert.ok(board.isAlive(2,3) === true, 'should always be alive'); 
  assert.ok(board.isAlive(3,3) === false, ''); 

  assert.ok(board.isAlive(2,2) === true, ''); 
  assert.ok(board.isAlive(2,3) === true, 'should always be alive'); 
  assert.ok(board.isAlive(2,4) === true, ''); 

  board.update(); 
  assert.ok(board.isAlive(1,3) === true, ''); 
  assert.ok(board.isAlive(2,3) === true, 'should always be alive'); 
  assert.ok(board.isAlive(3,3) === true, ''); 

  assert.ok(board.isAlive(2,2) === false, ''); 
  assert.ok(board.isAlive(2,3) === true, 'should always be alive'); 
  assert.ok(board.isAlive(2,4) === false, ''); 
});
