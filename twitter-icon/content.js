window.onload = function(){
  setMouseEvent();
  var observer1 = new MutationObserver(setMouseEvent);
  observer1.observe( document.getElementById('stream-items-id'), {childList: true} );
  var observer2 = new MutationObserver(setMouseEvent);
  observer2.observe( document.body, {attributes: true} );
}

function setMouseEvent(){
  $('.avatar')
  .unbind("mouseenter")
  .unbind("mouseleave")
  .mouseenter(function(){
    $(this).animate({width:'+=10px',height:'+=10px'},300);
  })
  .mouseleave(function(){
    $(this).animate({width:'-=10px',height:'-=10px'},300);
  });
}
