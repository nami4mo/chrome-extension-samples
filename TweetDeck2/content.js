// window.onload = function(){
//     console.log("aaaa");
// }
// $(window).load(function(){
//   console.log("win");
// });
//
$(window).ready(function(){
  var observer1 = new MutationObserver(setMuteButton);
  observer1.observe( document.getElementsByTagName('html')[0], {childList: true, subtree:true} );
});

// $(function(){
//   var observer1 = new MutationObserver(setMuteButton);
//   observer1.observe( document.getElementsByTagName('html')[0], {childList: true, subtree:true} );
// });

function setMuteButton(){
  var added_elem = '<li class="mute-btn tweet-action-item icon tweet-action pull-left" style="padding-top:2px; height:18px;">x</li>';
  $('.js-tweet-actions').append('<li class="myex tweet-action-item icon tweet-action pull-left" style="padding-top:2px; height:18px;">x</li>');
}
