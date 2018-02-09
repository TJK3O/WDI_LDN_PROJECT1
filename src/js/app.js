$(() => {
  console.log('JS Loaded');
  const $boxes = $('.box');
  let currentIndex = $('.player').index();

  $(document).on('keyup', (e) => {
    $('.user-input').html( event.type + ': ' + event.which );
    console.log('key');
    if(e.which === 87) {
      $boxes.removeClass('.player');
      console.log('up');
    } else if (e.which === 65) {
      console.log('left');
    } else if (e.which === 83) {
      console.log('down');
    } else if (e.which === 68) {
      console.log('right');
    }
    // if right key is pressed
    // remove player class from cell
    // add 1 to currentIndex
    // find cell $boxes.eq(currentIndex)
    // add player class to cell
  });
});
