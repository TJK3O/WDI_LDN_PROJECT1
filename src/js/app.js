$(() => {
  console.log('JS Loaded');

  // *********************** //
  // Maze building variables //
  // *********************** //

  const $container = $('.container');
  let $boxes = $('.box');
  let gridWidth;
  let gridHeight;
  let boxWidth;
  let boxHeight;
  let $finish;
  const levels = [
    [1, 3, 4, 5, 6, 7, 9, 11, 21, 22 ,23, 25, 27, 28, 31, 35, 37, 43, 45, 47, 49, 50, 51, 52, 53, 55, 57, 65, 67, 68, 69, 71, 73, 75, 77, 79, 83, 84, 85, 86, 87, 89, 90, 91],
    [1, 4, 5, 6, 7, 11, 17, 21, 23, 24, 25, 27, 31, 35, 38, 41, 43, 45, 48, 53, 55, 57, 58, 60, 61, 62, 63, 65, 71, 73, 75, 77, 81, 83, 87, 95, 97],
    [7,8,9,11,12,13,14,15,17,19,21,23,25,30,31,35,37,38,41,43,53,55,56,57,58,59,60,62,63,65,66,68,69,73,74,75,80,81,83,87,95,97]
  ];

  // *********************** //
  // Navigation variables //
  // *********************** //

  let aboveCurrentBox = -3;
  let currentIndexMinusWidth;
  let belowCurrentBox = 3;
  let currentIndexPlusWidth;
  let leftOfCurrentBox = -1;
  let currentIndexPlusOne;
  let rightOfCurrentBox = +1;
  let currentIndexMinusOne;
  let currentIndex = 0;

  // *********************** //
  // Gameplay variables //
  // *********************** //

  let timerTime = 30;
  let timerId;
  let levelOver;
  let gameOver;
  let currentLevel = 0;
  let score = 0;
  let hasKey;
  let lives = 3;

  // ************************ //
  // User display and buttons //
  // ************************ //

  const $displayFinalScore = $('.display-final-score');
  const $displayScore = $('.display-score');
  const $displayTimeRemaining = $('.time');
  const $displayLives = $('.lives');
  const $status = $('.status');
  const $play = $('.play');
  const $replay = $('.replay');
  const $countdown = $('#time-remaining');
  const $tutorial = $('.tutorial');

  // ************************ //
  // Sound variables //
  // ************************ //

  const $coinSound = $('.coin-sound');
  const $keySound = $('.key-sound');
  const $locked = $('.locked');
  const $openDoor = $('.open-door');
  const $lavaSound = $('.lava');

  // *********************** //
  // Maze building functions //
  // *********************** //

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
      $('.container div:nth-child(27)').addClass('lava');
      $('.container div:nth-child(89)').addClass('lava');

    } else if (currentLevel === 1) {
      $('.container div:nth-child(71)').addClass('interactKey');
      $('.interactKey').html('<img src="/images/key.png" class="key">');
      $('.container div:nth-child(3)').addClass('interactCoin');
      $('.container div:nth-child(9)').addClass('interactCoin');
      $('.interactKey').html('<img src="/images/key.png" class="key">');
      $('.interactCoin').html('<img src="/images/coin.png" class="coin">');
      $('.container div:nth-child(23)').addClass('lava');
      $('.container div:nth-child(27)').addClass('lava');
      $('.container div:nth-child(30)').addClass('lava');

    } else if (currentLevel === 2) {
      $('.container div:nth-child(19)').addClass('interactKey');
      $('.interactKey').html('<img src="/images/key.png" class="key">');
      $('.container div:nth-child(65)').addClass('interactCoin');
      $('.container div:nth-child(91)').addClass('interactCoin');
      $('.interactKey').html('<img src="/images/key.png" class="key">');
      $('.interactCoin').html('<img src="/images/coin.png" class="coin">');
      $('.container div:nth-child(55)').addClass('lava');
      $('.container div:nth-child(92)').addClass('lava');
    }
    $('.container div:last-child').addClass('finish');
    $finish = $('.finish');
    $boxes.width(boxWidth);
    $boxes.height(boxHeight);
    $('img').not('.key').not('.coin').height(boxWidth);
    createMazeElements();
  }

  // ************** //
  // Game functions //
  // ************** //

  function shakeStatusText() {
    $status.addClass(' animated').addClass(' tada').delay(3000).queue(() => {
      $status.removeClass('animated').removeClass('tada');
    });
  }

  function startTimer() {
    numberOfLives();
    $replay.hide();
    timerId = setInterval(() => {
      $status.removeClass('animated').removeClass('tada');
      if (timerTime >= 1){
        lavaDeath();
        if ($finish.hasClass('player') && !hasKey) {
          $locked.get(0).play();
          $status.text('You need to find the key first!');
          shakeStatusText();
        } else if ($finish.hasClass('player') && hasKey) {
          $openDoor.get(0).play();
          clearInterval(timerId);
          score += 1;
          $displayScore.text(`Score: ${score}`);
          $status.text('You made it!');
          shakeStatusText();
          levelOver = true;
          endGame();
          setTimeout(nextLevel(), 1000);
        }
        timerTime --;
        $countdown.text(timerTime);
      } else if (timerTime === 0) {
        lives -= 1;
        numberOfLives();
        $status.text('You ran out of time!');
        shakeStatusText();
        endGame();
        nextLevel();
        clearInterval(timerId);
        // levelOver = true;
      }
    }, 1000);
  }

  // ************************ //
  // Player control functions //
  // ************************ //

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

  function playerPressesA() {
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
      $('.user-input').html( event.type + ': ' + event.which );
      // check which key has been pressed
      if (e.which === 87) {
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
        $status.text('You found the key. Now head for the gate!');
        shakeStatusText();
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
    if (currentLevel < 3) {
      $displayTimeRemaining.show();
      $displayScore.show();
      $displayLives.show();
      $play.hide();
      generateLevel();
      $status.show();
      startTimer();
      $replay.hide();
      arrowKeys();
    }
  }

  function replay() {
    timerTime = 30;
    levelOver = false;
    gameOver = false;
    currentLevel = 0;
    score = 0;
    hasKey = false;
    lives = 3;
    $displayFinalScore.hide();
    $displayScore.text(`Your score is ${score}`);
    $status.text('');
    shakeStatusText();
    $play.hide();
    generateLevel();
    $tutorial.show();
    $displayTimeRemaining.show();
    $status.show();
    arrowKeys();
    startTimer();
  }

  function lavaDeath() {
    if ($('.player').hasClass('lava')) {
      $status.text('AGHH THAT HURTS!!');
      shakeStatusText();
      $lavaSound.get(0).play();
      lives -= 1;
      numberOfLives();
    }
  }

  function endGame() {
    if (currentLevel === 3) {
      gameOver = true;
      $container.empty();
      replay.show();
    }
  }

  function numberOfLives() {
    if (lives === 3) {
      $('.display-lives').html('<i class="fas fa-heart"></i><i class="fas fa-heart"></i><i class="fas fa-heart"></i>');
    } else if (lives === 2) {
      $('.display-lives').html('<i class="fas fa-heart"></i><i class="fas fa-heart"></i>');
    } else if (lives === 1) {
      $('.display-lives').html('<i class="fas fa-heart"></i>');
    } else{
      $('.display-lives').html('');
      clearInterval(timerId);
      gameOver = true;
      $displayTimeRemaining.hide();
      $tutorial.hide();
      $container.empty();
      $status.hide();
      $displayFinalScore.show();
      $displayFinalScore.html(`Your final score is ${score}`);
      $replay.show();
    }
  }

  function nextLevel() {
    clearInterval(timerId);
    $status.removeClass('animated').removeClass('tada');
    hasKey = false;
    if (!gameOver && currentLevel < 2) {
      timerTime = 30;
      levelOver = false;
      $play.text('Play next level');
      currentLevel += 1;
      timerTime = 30;
      $container.empty();
      $status.text('');
      shakeStatusText();
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
      $replay.show();
    }
  }

  // ***************** //
  // Invoked functions //
  // ***************** //


  $replay.on('click', replay);
  $play.on('click', playGame);
});
