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


QUnit.test( 'simple oscillator', function( assert ) {
  board = Board(5, 5); 
  board = Board(5,5);
  board.setAlive(1,1);
  board.setAlive(1,2);
  board.setAlive(1,3);

  board.addListener( 1, 2, function(isAlive){
    assert.ok(  isAlive === true  , '(1,2) should always be alive' );
  });  //(1, 2) should always be alive 

  var counter = 0; 
  board.addListener( 1, 1, function(isAlive){
    (function(){
      counter++; 
    })(); 
    if (counter%2 !== 0){ //odd, we should be dead 
      assert.ok(  isAlive === false  ,
                'should be dead on odd number: counter: ' + counter.toString() );
    }else{
      assert.ok(  isAlive === true  , 
                'should be alive on even number: counter: ' + counter.toString());
    }
  }); 

  var counter13 = 0; 
  board.addListener( 1, 3, function(isAlive){
    (function(){
      counter13++; 
    })(); 
    if (counter13%2 !== 0){ //odd, we should be dead 
      assert.ok(  isAlive === false  , 
                'should be dead on odd number: counter: ' + counter13.toString() );
    }else{
      assert.ok(  isAlive === true  , 
                'should be alive on even number: counter: ' + counter13.toString());
    }
  }); 

  board.update();
  board.update();
  board.update();
  board.update();
});
