proj2
=====

A) What concerns you identified, and how you separated them
I separated into a model, a controller, and a view. My boardModel has the representation 
of the grid that holds cells. My controller has all of the business logic of running 
the game, while the view handles rendering the model onto the browser. 

B) What the program modules are and what dependencies exist between them. Are there any
dependencies that should be eliminated? 
The Controller depends on the model, the view depends on the controller. There are no dependencies that shouldn't be there. 


C) How you exploited functionals in code
I wrote a lot of functionals to be able to access every cell in the boardModel. I also used 
forEach in order to avoid using for loops that could have indexing problems.

D) interesting design ideas or tradeoffs that you made 
I liked the way that I wrote my boardModel.forEachCell structure. 
