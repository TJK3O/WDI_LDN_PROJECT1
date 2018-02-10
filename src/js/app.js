$(() => {
  console.log('JS Loaded');
  const $boxes = $('.box');
  const width = 3;
  const height = 3;
  let currentIndex = 0;

  let aboveCurrentBox = -3;
  let currentIndexMinusThree;
  let belowCurrentBox = 3;
  let currentIndexPlusThree;
  let leftOfCurrentBox = -1;
  let currentIndexPlusOne;
  let rightOfCurrentBox = +1;
  let currentIndexMinusOne;

  const $countdown = $('#time-remaining');
  let timerTime = 10;
  let timerId;
  let timerRunning;

  function startStopTimer() {
    if (!timerRunning) {
      timerId = setInterval(() => {
        if (timerTime >= 1){
          timerTime --;
          $countdown.text(timerTime);
          timerRunning = true;
        }
      }, 1000);
    } else {
      clearInterval(timerId);
      timerRunning = false;
    }
  }












  // check if key is pressed
  $(document).on('keyup', (e) => {
    startStopTimer();
    currentIndex = $('.player').index();
    currentIndexMinusThree = parseFloat(currentIndex - 3);
    currentIndexPlusThree = parseFloat(currentIndex + 3);
    currentIndexPlusOne = parseFloat(currentIndex + 1);
    currentIndexMinusOne = parseFloat(currentIndex - 1);
    belowCurrentBox = $boxes.eq(currentIndexPlusThree);
    aboveCurrentBox = $boxes.eq(currentIndexMinusThree);
    leftOfCurrentBox = $boxes.eq(currentIndexMinusOne);
    rightOfCurrentBox = $boxes.eq(currentIndexPlusOne);
    // console.log(aboveCurrentBox);
    $('.user-input').html( event.type + ': ' + event.which );
    // check which key has been pressed
    if(e.which === 87) {
      console.log('up');

      if (aboveCurrentBox.hasClass('cant-stand')) {
        // aboveCurrentBox.removeClass('cant-stand');
        console.log('can\'t stand above');
      }
      // if (index - width < 0) #player can’t go up
      if (currentIndex - width < 0 || aboveCurrentBox.hasClass('cant-stand')) {
        currentIndex += width;
      }
      // remove player class from cell
      $boxes.removeClass('player');
      // add 1 to currentIndex
      currentIndex -= width;
      // find cell $boxes.eq(currentIndex) and add player class to cell
      $boxes.eq(currentIndex).addClass('player');
    } else if (e.which === 65) {
      // if (index % width === 0) #player can’t move left
      if (leftOfCurrentBox.hasClass('cant-stand')) {
        // aboveCurrentBox.removeClass('cant-stand');
        console.log('can\'t stand left');
      }
      if (currentIndex % width === 0 || leftOfCurrentBox.hasClass('cant-stand')) {
        currentIndex +=1;
      }
      console.log('left');
      $boxes.removeClass('player');
      currentIndex -= 1;
      $boxes.eq(currentIndex).addClass('player');
    } else if (e.which === 83) {
      // if (index + width > (width x height) - 1 #player can’t go down
      if (currentIndex + width >= (width * height) || belowCurrentBox.hasClass('cant-stand')) {
        currentIndex -= width;
      }
      if (belowCurrentBox.hasClass('cant-stand')) {
        // aboveCurrentBox.removeClass('cant-stand');
        console.log('can\'t stand below');
      }
      console.log('down');
      $boxes.removeClass('player');
      currentIndex += width;
      $boxes.eq(currentIndex).addClass('player');
    } else if (e.which === 68) {
      console.log('right');
      // if (index % width === width -1) #player can’t move right
      if (currentIndex % width === width - 1 || rightOfCurrentBox.hasClass('cant-stand')) {
        currentIndex -=1;
      }
      if (rightOfCurrentBox.hasClass('cant-stand')) {
        // aboveCurrentBox.removeClass('cant-stand');
        console.log('can\'t stand right');
      }
      $boxes.removeClass('player');
      currentIndex += 1;
      $boxes.eq(currentIndex).addClass('player');
    }
  });
});
