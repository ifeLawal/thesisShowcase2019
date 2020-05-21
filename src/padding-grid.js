window.shuffleInstance = new window.Shuffle(document.getElementById('grid'), {
  itemSelector: '.grid__brick',
  sizer: '.my-sizer-element',
  initialSort: {randomize:true}
});


$(document).ready(function() {

});


$(window).resize(function() {
  window.shuffleInstance.sort({randomize:false});
})

var loaded = false;

if(!loaded) {
  $(window).on("load", function() {
    window.shuffleInstance.sort({randomize:true});
  });

  console.log("running");
}
