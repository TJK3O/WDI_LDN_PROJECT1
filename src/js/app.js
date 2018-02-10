$(() => {
  console.log('JS Loaded');
  const $boxes = $('.box');
  let currentIndex = 0;

  let aboveCurrentBox = -3;
  let currentIndexMinusThree;
  let belowCurrentBox = 3;
  let currentIndexPlusThree;
  let leftOfCurrentBox = -1;
  let currentIndexPlusOne;
  let rightOfCurrentBox = +1;
  let currentIndexMinusOne;


  // check if key is pressed
  $(document).on('keyup', (e) => {
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
      if (currentIndex - 3 < 0 || aboveCurrentBox.hasClass('cant-stand')) {
        currentIndex += 3;
      }
      // remove player class from cell
      $boxes.removeClass('player');
      // add 1 to currentIndex
      currentIndex -= 3;
      // find cell $boxes.eq(currentIndex) and add player class to cell
      $boxes.eq(currentIndex).addClass('player');
    } else if (e.which === 65) {
      // if (index % width === 0) #player can’t move left
      if (leftOfCurrentBox.hasClass('cant-stand')) {
        // aboveCurrentBox.removeClass('cant-stand');
        console.log('can\'t stand left');
      }
      if (currentIndex % 3 === 0 || leftOfCurrentBox.hasClass('cant-stand')) {
        currentIndex +=1;
      }
      console.log('left');
      $boxes.removeClass('player');
      currentIndex -= 1;
      $boxes.eq(currentIndex).addClass('player');
    } else if (e.which === 83) {
      // if (index + width > (width x height) - 1 #player can’t go down
      if (currentIndex + 3 >= (3 * 3) || belowCurrentBox.hasClass('cant-stand')) {
        currentIndex -= 3;
      }
      if (belowCurrentBox.hasClass('cant-stand')) {
        // aboveCurrentBox.removeClass('cant-stand');
        console.log('can\'t stand below');
      }
      console.log('down');
      $boxes.removeClass('player');
      currentIndex += 3;
      $boxes.eq(currentIndex).addClass('player');
    } else if (e.which === 68) {
      console.log('right');
      // if (index % width === width -1) #player can’t move right
      if (currentIndex % 3 === 3 - 1 || rightOfCurrentBox.hasClass('cant-stand')) {
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
