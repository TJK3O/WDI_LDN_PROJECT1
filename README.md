# ![image](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) WDI_LDN_PROJECT1

Individual JavaScript project

# GA WDI-32 Project 1 - Maze Explorer JavaScript Game

For my first project, I decided to create a top-down maze game called "Maze Explorer" using JavaScript, HTML, and CSS.

Inspired by retro exploration games like Zelda I tried to emulate the gameplay and style in a maze game of my own. As the player moves through the three levels a different maze loads into the DOM, each with unique challenges and items to collect. The user must collect the key before they can get through the exit door. Along the way they can also collect coins to increase their score, but they need to avoid standing on lava for too long otherwise they will lose a life.

##### The app utilises the following technologies:

- CSS
- Express
- GitHub to manage version control.
- Heroku to host the final web application.
- HTML
- jQuery to take advantage of the library's functions and save time.

##### The app is designed to be played on desktop and is not mobile-optimized, so please [click here](https://maze-explorer-game.herokuapp.com/) if you would like to play the game. The game has audio, so please use headphones for the best experience.

*Please be aware that Heroku apps go to sleep after 30 mins of inactivity and may take a little time to load*

---

###### The game loads to an animated splash screen telling the user how to play - "Reach the door within the time limit to progress to the next maze. Find the key before you go through the door. Look out for coins along the way and avoid the lava!" - and letting them know the controls:

###### W - UP
###### A - LEFT
###### S - DOWN
###### D - RIGHT
###### / - PICK UP ITEM

</br>

<p align="center">
<img src="https://i.imgur.com/PHxtURy.png" height="400">
</p>

</br>

###### The player can then work their way through 3 levels.

</br>

<p align="center"><img src="https://i.imgur.com/a9LAuIQ.png" height="400"></p>

</br>

###### If a player loses all their lives by standing on lava or running out of time they lose and another splash screen loads displaying their final score. They are also given the change to play again which resets the game.

</br>

<p align="center">
<img src="https://i.imgur.com/vp4un0Z.png" height="400">
</p>

---
###### The controls are W to move up, A for left, S for down, and D to move right. I used the following code to move the user up for example:

```
function playerPressesW() {
  if (aboveCurrentBox.hasClass('cant-stand')) {
    console.log('can\'t stand above');
  }
  if (currentIndex - gridWidth < 0 || aboveCurrentBox.hasClass('cant-stand')) {
    currentIndex += gridWidth;
  }
  $boxes.removeClass('player up down left right');
  currentIndex -= gridWidth;
  $boxes.eq(currentIndex).addClass('player up');
}
```
</br>

###### The grid is a collection of divs, and when a user moves I work out the index of the current div, and previous div and adjust the classes so that the current div shows an image of the user. I also ensure that the user can't walk outside the maze by checking that they are not stood at the edge based on the width of the grid and their current index.

</br>

<p align="center"><img src="https://i.imgur.com/SraVC4f.png" width="700"></p>

---

###### Installation Instructions
- You'll need run your package manager for example yarn, to install the necessary dependencies which are already listed in the package.json.

---


###### Enhancements:
Although I was pleased with the games appearance and playability I would like to have been able to add more variety and difficulty in the levels. I briefly experimented with much larger grid sizes but found the build process very manual. I would have liked to create a map builder to streamline this process.
