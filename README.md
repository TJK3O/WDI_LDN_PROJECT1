## Setup instructions

- Clone or download the repo
- Install dependencies with `yarn install`
- Launch the app with `gulp`

>**NB**: You will need to have installed `gulp-cli` globally

![image](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)
# GA WDI-32 Project 1 - Maze Explorer
Our first project at General Assembly was to create a game using Javascript, HTML and CSS. Inspired by retro exploration games like Zelda I tried to emulate the gameplay and style in a maze game of my own. As the player moves through the three levels a different maze loads into the DOM, each with unique challenges and items to collect. The user must collect the key before they can get through the exit door. Along the way they can also collect coins to increase their score, but they need to avoid standing on lava for too long otherwise they will lose a life.
##### [Visit website](https://maze-explorer-game.herokuapp.com/) for best playing experience (the game was not designed for mobile).
---
###### The controls are W to move up, A for left, S for down, and D to move right. I used the following code to move the user up:

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

###### The grid is a collection of divs, when a user moves I work out the index of the current div, and previous div and adjust the classes so that the current div shows an image of the user. I also ensure that the user can't walk outside the maze by checking that they are not stood at the edge based on the width of the grid and their current index.

<p align="center"><img src="https://i.imgur.com/SraVC4f.png" width="700"></p>

###### Players have three lives and when these are lost their final score is displayed and they have to start again from level one.

<p align="center"><img src="https://i.imgur.com/fUbZhgo.png" width="700"></p>

---
Although I was pleased with the games appearance and playability I would like to have been able to add more variety and difficulty in the levels. I briefly experimented with much larger grid sizes but found the build process very manual. I would have liked to create a map builder to streamline this process.
