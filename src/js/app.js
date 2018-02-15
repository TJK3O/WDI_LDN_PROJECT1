$(() => {
  console.log('JS Loaded');
  const $container = $('.container');
  const $rightContainer = $('.right-container');
  let $boxes = $('.box');
  let gridWidth;
  let gridHeight;
  let boxWidth;
  let boxHeight;
  let currentIndex = 0;
  let $finish;
  const $displayFinalScore = $('.display-final-score');
  let aboveCurrentBox = -3;
  let currentIndexMinusWidth;
  let belowCurrentBox = 3;
  let currentIndexPlusWidth;
  let leftOfCurrentBox = -1;
  let currentIndexPlusOne;
  let rightOfCurrentBox = +1;
  let currentIndexMinusOne;
  const $status = $('.status');
  const $play = $('.play');
  const $replay = $('.replay');
  const $countdown = $('#time-remaining');
  const $tutorial = $('.tutorial');
  let timerTime = 30;
  let timerId;
  let timerRunning;
  let levelOver;
  let gameOver;
  let currentLevel = 0;
  let score = 0;
  let hasKey;
  let lives = 3;
  const $coinSound = $('.coin-sound');
  const $keySound = $('.key-sound');
  const $locked = $('.locked');
  const $openDoor = $('.open-door');
  const $lavaSound = $('.lava');
  const $playerImage = $('<img src="/images/man.png" class="playerImage">');
  const $displayScore = $('.display-score');
  const $displayTimeRemaining = $('.time');
  const $displayLives = $('.lives');
  const levels = [
    [1, 3, 4, 5, 6, 7, 9, 11, 21, 22 ,23, 25, 27, 28, 31, 35, 37, 43, 45, 47, 49, 50, 51, 52, 53, 55, 57, 65, 67, 68, 69, 71, 73, 75, 77, 79, 83, 84, 85, 86, 87, 89, 90, 91],
    [1, 4, 5, 6, 7, 11, 17, 21, 23, 24, 25, 27, 31, 35, 38, 41, 43, 45, 48, 53, 55, 57, 58, 60, 61, 62, 63, 65, 71, 73, 75, 77, 81, 83, 87, 95, 97],
    [7,8,9,11,12,13,14,15,17,19,21,23,25,30,31,35,37,38,41,43,53,55,56,57,58,59,60,62,63,65,66,68,69,73,74,75,80,81,83,87,95,97]
  ];

  function gridSize() {
    if (currentLevel < 3) {
      gridWidth = 10;
      gridHeight = 10;
    } else if (currentLevel < 6) {
      gridWidth = 15;
      gridHeight = 15;
    }
  }

  function createMazeElements() {
    $boxes.filter((i) => {
      return levels[currentLevel].includes(i);
    }).addClass('cant-stand');
  }


  function generateLevel() {
    console.log(`current level ${currentLevel}`);
    $container.empty();
    gridSize();
    gridWidth;
    gridHeight;
    boxWidth = ($container.width() / gridWidth - 2);
    boxHeight = ($container.width() / gridHeight - 2);
    for (var i = 0; i < (gridWidth * gridHeight); i++) {
      $container.append('<div></div>');
      $('.container > div').addClass('box');
      $('.container div:first-child').addClass('player');
    }
    $boxes = $('.box');
    if (currentLevel === 0) {
      $('.container div:nth-child(9)').addClass('interactKey');
      $('.container div:nth-child(77)').addClass('interactCoin');
      $('.container div:nth-child(79)').addClass('interactCoin');
      $('.container div:nth-child(3)').addClass('interactCoin');
      $('.interactKey').html('<img src="/images/key.png" class="key">');
      $('.interactCoin').html('<img src="/images/coin.png" class="coin">');
      $('.container div:nth-child(14)').addClass('lava');
    } else if (currentLevel === 1) {
      $('.container div:nth-child(68)').addClass('interactKey');
      $('.interactKey').html('<img src="/images/key.png" class="key">');
      $('.container div:nth-child(77)').addClass('interactCoin');
      $('.container div:nth-child(79)').addClass('interactCoin');
      $('.container div:nth-child(3)').addClass('interactCoin');
      $('.interactKey').html('<img src="/images/key.png" class="key">');
      $('.interactCoin').html('<img src="/images/coin.png" class="coin">');
      $('.container div:nth-child(3)').addClass('lava');
    } else if (currentLevel === 2) {
      $('.container div:nth-child(19)').addClass('interactKey');
      $('.interactKey').html('<img src="/images/key.png" class="key">');
      $('.container div:nth-child(77)').addClass('interactCoin');
      $('.container div:nth-child(79)').addClass('interactCoin');
      $('.container div:nth-child(3)').addClass('interactCoin');
      $('.interactKey').html('<img src="/images/key.png" class="key">');
      $('.interactCoin').html('<img src="/images/coin.png" class="coin">');
      $('.container div:nth-child(3)').addClass('lava');
    }
    $('.container div:last-child').addClass('finish');
    $finish = $('.finish');
    $boxes.width(boxWidth);
    $boxes.height(boxHeight);
    $('img').not('.key').not('.coin').height(boxWidth);
    createMazeElements();
  }

  function lavaDeath() {
    if ($('.player').hasClass('lava')) {
      $lavaSound.get(0).play();
      lives -= 1;
      numberOfLives();
    }
  }

  function endGame() {
    if (currentLevel === 2) {
      gameOver = true;
      $container.empty();

    }
  }

  function startStopTimer() {
    numberOfLives();
    $replay.hide();
    if (!timerRunning) {
      timerId = setInterval(() => {
        if (timerTime >= 1){
          lavaDeath();
          if ($finish.hasClass('player') && !hasKey) {
            $locked.get(0).play();
            $status.text('You need to find the key first!');
          } else if ($finish.hasClass('player') && hasKey) {
            $openDoor.get(0).play();
            clearInterval(timerId);
            timerRunning = false;
            score += 1;
            $displayScore.text(`Score: ${score}`);
            $status.text('You win!');
            levelOver = true;
            endGame();
            setTimeout(nextLevel, 1000);
          }
          timerTime --;
          $countdown.text(timerTime);
          timerRunning = true;
        } else if (timerTime === 0) {
          lives -= 1;
          numberOfLives();
          $status.text('You lose');
          nextLevel();
          clearInterval(timerId);
          timerRunning = false;
          levelOver = true;
        }
      }, 1000);
    } else {
      clearInterval(timerId);
      timerRunning = false;
      levelOver = true;
    }
  }

  function playerPressesW() {
    if (aboveCurrentBox.hasClass('cant-stand')) {
      console.log('can\'t stand above');
    }
    // if (index - width < 0) #player can’t go up
    if (currentIndex - gridWidth < 0 || aboveCurrentBox.hasClass('cant-stand')) {
      currentIndex += gridWidth;
    }
    // remove player class from cell
    $boxes.removeClass('player up down left right');
    // add 1 to currentIndex
    currentIndex -= gridWidth;
    // find cell $boxes.eq(currentIndex) and add player class to cell
    // rotate player background image
    $boxes.eq(currentIndex).addClass('player up');
    // $boxes.eq(currentIndex).prepend('<img src="/images/car-down.png" class="playerImage">');
    // $('.playerImage').css({'transform': 'rotate(180deg)'});
  }

  function playerPressesA() {
    // if (index % width === 0) #player can’t move left
    if (leftOfCurrentBox.hasClass('cant-stand')) {
      console.log('can\'t stand left');
    }
    if (currentIndex % gridWidth === 0 || leftOfCurrentBox.hasClass('cant-stand')) {
      currentIndex +=1;
    }
    console.log('left');
    $boxes.removeClass('player up down left right');
    currentIndex -= 1;
    $boxes.eq(currentIndex).addClass('player left');
  }

  function playerPressesS() {
    // if (index + width > (width x height) - 1 #player can’t go down
    if (currentIndex + gridWidth >= (gridWidth * gridHeight) || belowCurrentBox.hasClass('cant-stand')) {
      currentIndex -= gridWidth;
    }
    if (belowCurrentBox.hasClass('cant-stand')) {
      console.log('can\'t stand below');
    }
    console.log('down');
    $boxes.removeClass('player up down left right');
    currentIndex += gridWidth;
    $boxes.eq(currentIndex).addClass('player down');
  }

  function playerPressesD() {
    // if (index % width === width -1) #player can’t move right
    if (currentIndex % gridWidth === gridWidth - 1 || rightOfCurrentBox.hasClass('cant-stand')) {
      currentIndex -=1;
    }
    if (rightOfCurrentBox.hasClass('cant-stand')) {
      console.log('can\'t stand right');
    }
    $boxes.removeClass('player');
    currentIndex += 1;
    $boxes.eq(currentIndex).addClass('player right');
  }

  function arrowKeyFunction(e){
    // check if key is pressed
    if (!levelOver) {
      currentIndex = $('.player').index();
      currentIndexMinusWidth = parseFloat(currentIndex - gridWidth);
      currentIndexPlusWidth = parseFloat(currentIndex + gridWidth);
      currentIndexPlusOne = parseFloat(currentIndex + 1);
      currentIndexMinusOne = parseFloat(currentIndex - 1);
      belowCurrentBox = $boxes.eq(currentIndexPlusWidth);
      aboveCurrentBox = $boxes.eq(currentIndexMinusWidth);
      leftOfCurrentBox = $boxes.eq(currentIndexMinusOne);
      rightOfCurrentBox = $boxes.eq(currentIndexPlusOne);
      // console.log(aboveCurrentBox);
      $('.user-input').html( event.type + ': ' + event.which );
      // check which key has been pressed
      if(e.which === 87) {
        console.log('up');
        playerPressesW();
      } else if (e.which === 65) {
        playerPressesA();
      } else if (e.which === 83) {
        playerPressesS();
      } else if (e.which === 68) {
        console.log('right');
        playerPressesD();
      } else if (e.which === 191 && $('.interactKey').hasClass('player')) {
        $('.player .key').hide();
        $keySound.get(0).play();
        score += 1;
        hasKey = true;
        $displayScore.text(`Your score is ${score}`);
      } else if (e.which === 191 && $('.interactCoin').hasClass('player')) {
        $('.player .coin').hide();
        $coinSound.get(0).play();
        score += 1;
        $displayScore.text(`Your score is ${score}`);
      }
    } else {
      $(document).off(e);
    }
  }

  function arrowKeys(){
    document.addEventListener('keydown', arrowKeyFunction);
  }




  function playGame() {
    if (currentLevel < 2) {
      $displayTimeRemaining.show();
      $displayScore.show();
      $displayLives.show();
      $play.hide();
      generateLevel();
      $status.show();
      startStopTimer();
      $replay.hide();
      arrowKeys();
    }
  }


  function replay() {
    currentLevel = 0;
    gameOver = false;
    hasKey = false;
    timerRunning = false;
    timerTime = 30;
    lives = 3;
    score = 0;
    levelOver = false;
    $play.hide();
    generateLevel();
    $status.show();
    startStopTimer();
    arrowKeys();
  }

  function numberOfLives() {
    if (lives === 3) {
      $('.display-lives').html('<i class="far fa-heart"></i><i class="far fa-heart"></i><i class="far fa-heart"></i>');
    } else if (lives === 2) {
      $('.display-lives').html('<i class="far fa-heart"></i><i class="far fa-heart"></i>');
    } else if (lives === 1) {
      $('.display-lives').html('<i class="far fa-heart"></i>');
    } else{
      $('.display-lives').html('');
      gameOver = true;
      $displayTimeRemaining.hide();
      $tutorial.hide();
      $container.empty();
      $status.hide();
      $displayFinalScore.show();
      $displayFinalScore.html(`Your final score is ${score}`);
      console.log(`Your final score is ${score}`);
    }
  }



  function nextLevel() {
    hasKey = false;
    if (!gameOver && currentLevel < 1) {
      timerTime = 30;
      timerRunning = false;
      levelOver = false;
      $play.text('Play next level');
      currentLevel += 1;
      timerTime = 30;
      $container.empty();
      $status.text('');
      $countdown.text(timerTime);
      $finish.removeClass('player');
      $play.show();
    } else {
      gameOver = true;
      $displayTimeRemaining.hide();
      $tutorial.hide();
      $container.empty();
      $status.hide();
      $displayFinalScore.show();
      $displayFinalScore.html(`Your final score is ${score}`);
      console.log(`Your final score is ${score}`);
    }
  }

  $play.on('click', playGame);
  $replay.on('click', replay);
});
