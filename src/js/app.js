$(() => {
  console.log('JS Loaded');
  const $container = $('.container');
  let $boxes = $('.box');
  let gridWidth = 3;
  let gridHeight = 3;
  let boxWidth = (100 / gridWidth);
  let boxHeight = (100 / gridHeight);
  let currentIndex = 0;
  const $finish = $('.finish');
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
  let timerTime = 10;
  let timerId;
  let timerRunning;
  let gameOver;

  function generateLevelOne() {
    gridWidth = 3;
    gridHeight = 3;
    for (var i = 0; i < 9; i++) {
      $container.append('<div></div>');
      $('.container > div').addClass('box');
      $('.container div:nth-child(1)').addClass('player');
      $('.container div:nth-child(9)').addClass('finish');
      $('.container div:nth-child(3)').addClass('cant-stand');
      $('.container div:nth-child(5)').addClass('cant-stand');
    }
    $boxes = $('.box');
  }


  function startStopTimer() {
    if (!timerRunning) {
      timerId = setInterval(() => {
        if (timerTime >= 1){
          if ($finish.hasClass('player')) {
            clearInterval(timerId);
            timerRunning = false;
            $status.text('You win!');
            gameOver = true;
            console.log(gameOver);
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
      console.log(gameOver);
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
    $boxes.eq(currentIndex).addClass('player');
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
    $boxes.eq(currentIndex).addClass('player');
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
    $boxes.eq(currentIndex).addClass('player');
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
    $boxes.eq(currentIndex).addClass('player');
  }

  $play.on('click', () => {
    $play.hide();
    $status.show();
    startStopTimer();
    generateLevelOne();
    $(document).on('keydown', (e) => {
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
        }
      }
    });
  });
});
