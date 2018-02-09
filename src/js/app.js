$(() => {
  console.log('JS Loaded');
  const $boxes = $('.box');
  let currentIndex = $('.player').index();

  // check if key is pressed
  $(document).on('keyup', (e) => {
    $('.user-input').html( event.type + ': ' + event.which );
    console.log('key');
    // check which key has been pressed
    if(e.which === 87) {
      console.log('up');
      // if (index - width < 0) #player can’t go up
      if (currentIndex - 3 < 0) {
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
      if (currentIndex % 3 === 0) {
        currentIndex +=1;
      }
      console.log('left');
      $boxes.removeClass('player');
      currentIndex -= 1;
      $boxes.eq(currentIndex).addClass('player');
    } else if (e.which === 83) {
      // if (index + width > (width x height) - 1 #player can’t go down
      if (currentIndex + 3 >= (3 * 3)) {
        currentIndex -= 3;
      }
      console.log('down');
      $boxes.removeClass('player');
      currentIndex += 3;
      $boxes.eq(currentIndex).addClass('player');
    } else if (e.which === 68) {
      console.log('right');
      // if (index % width === width -1) #player can’t move right
      if (currentIndex % 3 === 3 - 1) {
        currentIndex -=1;
      }
      $boxes.removeClass('player');
      currentIndex += 1;
      $boxes.eq(currentIndex).addClass('player');
    }
  });
});
