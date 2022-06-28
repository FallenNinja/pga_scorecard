# This project is made to track the games played at a PGA golf course.

* Ruby version: ruby 2.7.3p183
* Rails version: 5.1.7
* Demo hosted on heroku: https://pga-scorecard.herokuapp.com

Intent:
- User is able to select desired golf course, set player information such as name and handicap.
- User is able to track the progress of the game and see who is winning on a per hole basis. 
- User can save the game onced finished to view the final winner of the game. The total points is based on which player wins more holes.
- User is also able to view previous games played.
- The application auto calculates winner and keeps track of player handicap on a per hole basis.
- Per game data can be pulled using the game id and a get function and the appropriate url.
- All game data can be pulled using a get function and the appropriate url.

Consideration:
- Write code around the players using the course and holes to build up the player data.
- Keep parts of the code dynamic, therefore additional courses can be added.
- In order to maintain simplicity do not implement dyncamic player counts.
- In order to maintain simplicity do not implement too many dynamic components around players, its only 2.
- Reuse as much code as possible, for example, reuse the 'Previous Games' modal to render the newly finished game.
- Although not needed, react was used to display the application. (Having too much fun.)

Points of Improvement:
- Write cleaner, easier to read code (limit shorthand and long lines used).
- Write tests before writing code (TDD).
