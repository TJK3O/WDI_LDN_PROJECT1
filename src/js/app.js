$(() => {
  console.log('JS Loaded');
  const $container = $('.container');
  let $boxes = $('.box');
  let gridWidth;
  let gridHeight;
  let boxWidth;
  let boxHeight;
  let currentIndex = 0;
  let $finish;
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
  const $countdown = $('#time-remaining');
  const $tutorial = $('.tutorial');
  let timerTime = 30;
  let timerId;
  let timerRunning;
  let gameOver;
  let currentLevel = 0;
  const levels = [{
    levelOneCantStand: [1, 3, 4, 5, 6, 7, 9, 11, 21, 22 ,23, 25, 27, 28, 31, 35, 37, 43, 45, 47, 49, 50, 51, 52, 53, 55, 57, 65, 67, 68, 69, 71, 73, 75, 77, 79, 83, 84, 85, 86, 87, 89, 90, 91],
    levelTwoCantStand: [1, 4, 5, 6, 7, 11, 17, 21, 23, 24, 25, 27, 31, 35, 38, 41, 43, 45, 48, 53, 55, 57, 58, 60, 61, 62, 63, 65, 71, 73, 75, 77, 81, 83, 87, 95, 97]
  }];
  let score = 0;
  const $displayScore = $('.display-score');

  function generateLevel() {
    $container.empty();
    gridWidth = 10;
    gridHeight = 10;
    boxWidth = ($container.width() / gridWidth - 2);
    boxHeight = ($container.width() / gridHeight - 2);
    for (var i = 0; i < (gridWidth * gridHeight); i++) {
      $container.append('<div></div>');
      $('.container > div').addClass('box');
      $('.container div:first-child').addClass('player');
    }
    $boxes = $('.box');
    $('.container div:last-child').addClass('finish');
    $finish = $('.finish');
    $boxes.width(boxWidth);
    $boxes.height(boxHeight);
    $('img').height(boxWidth);
    if (currentLevel === 0) {
      $('.container div:nth-child(9)').addClass('interact');
      $boxes.filter((i) => {
        return levels[0].levelOneCantStand.includes(i);
      }).addClass('cant-stand');
    } else if (currentLevel === 1) {
      $boxes.filter((i) => {
        return levels[0].levelTwoCantStand.includes(i);
      }).addClass('cant-stand');
    }
  }

  function startStopTimer() {
    if (!timerRunning) {
      timerId = setInterval(() => {
        if (timerTime >= 1){
          if ($finish.hasClass('player')) {
            clearInterval(timerId);
            timerRunning = false;
            score += 1;
            $displayScore.text(`Your score is ${score}`);
            $status.text('You win!');
            gameOver = true;
            console.log(score);
            setTimeout(nextLevel, 1000);
          }
          timerTime --;
          $countdown.text(timerTime);
          timerRunning = true;
        } else if (timerTime === 0) {
          $status.text('You lose');
          clearInterval(timerId);
          timerRunning = false;
          gameOver = true;
          console.log(gameOver);
        }
      }, 1000);
    } else {
      clearInterval(timerId);
      timerRunning = false;
      gameOver = true;
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
    $boxes.removeClass('player');
    // add 1 to currentIndex
    currentIndex -= gridWidth;
    // find cell $boxes.eq(currentIndex) and add player class to cell
    // rotate player background image
    $boxes.eq(currentIndex).addClass('player').css({'transform': 'rotate(180deg)'});
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
    $boxes.removeClass('player');
    currentIndex -= 1;
    $boxes.eq(currentIndex).addClass('player').css({'transform': 'rotate(90deg)'});
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
    $boxes.removeClass('player');
    currentIndex += gridWidth;
    $boxes.eq(currentIndex).addClass('player').css({'transform': 'rotate(0deg)'});
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
    $boxes.eq(currentIndex).addClass('player').css({'transform': 'rotate(270deg)'});
  }

  function arrowKeyFunction(e){
    // check if key is pressed
    if (!gameOver) {
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
      } else if (e.which === 191 && $('.interact').hasClass('player')) {
        $('.interact').css({'background-color': 'red'});
        score += 1;
        $displayScore.text(`Your score is ${score}`);
        console.log(score);
      }
    } else {
      $(document).off(e);
      nextLevel();
    }
  }

  function arrowKeys(){
    document.addEventListener('keydown', arrowKeyFunction);
  }

  function play() {
    $play.on('click', () => {
      $tutorial.hide();
      $play.hide();
      generateLevel();
      $status.show();
      startStopTimer();
      arrowKeys();
    });
  }

  function nextLevel() {
    timerTime = 30;
    timerRunning = false;
    gameOver = false;
    $play.text('Play next level');
    currentLevel += 1;
    timerTime = 30;
    $container.empty();
    $status.text('');
    $countdown.text(timerTime);
    $finish.removeClass('player');
    $play.show();
  }

  play();
});
