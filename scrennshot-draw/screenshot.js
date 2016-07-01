// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function setScreenshotUrl(url) {

  var start = {};
  var end = {};
  var isSelecting = false;
  var undo_img;

  var w = $(window).width();
  var h = $(window).height();
  $('#mycanvas').attr('width',w).attr('height',h);

  var canvas = document.getElementById('mycanvas');
  if(!canvas || !canvas.getContext) return false;
  var ctx = canvas.getContext('2d');

  var img = new Image();
  img.src = url;
  img.onload = function(){
    ctx.drawImage(img,0,0);
    // console.log(img.width);
  }

  $(window)
  // Listen for selection
  .on('mousedown', function($event) {
    // Update our state
    isSelecting = true;
    $('#selection').removeClass('complete');
    start.x = $event.pageX;
    start.y = $event.pageY;


    // Display data in UI
    $('#start').text('(' + start.x + ',' + start.y + ')');

    // Add selection to screen
    $('#selection').css({
      left: start.x,
      top: start.y
    });
  })
  // Listen for movement
  .on('mousemove', function($event) {
    // Ignore if we're not selecing
    if (!isSelecting) { return; }

    // Update our state
    end.x = $event.pageX;
    end.y = $event.pageY;

    // Move & resize selection to reflect mouse position
    $('#selection').css({
      left: start.x < end.x ? start.x : end.x,
      top: start.y < end.y ? start.y : end.y,
      width: Math.abs(start.x - end.x),
      height: Math.abs(start.y - end.y)
    });
  })
  // listen for end
  .on('mouseup', function($event) {
    // Update our state
    isSelecting = false;
    $('#selection').addClass('complete');

    // Display data in UI
    $('#end').text('(' + end.x + ',' + end.y + ')');

    ctx.clearRect(0,0,w,h);

    var left;
    var top;
    var sw;
    var sh;

    if(end.x > start.x){
      left = start.x;
      sw =  end.x - start.x;
    }
    else{
      left = end.x;
      sw =  start.x - end.x;
    }

    if(end.y > start.y){
      top = start.y;
      sh =  end.y - start.y;
    }
    else{
      top = end.y;
      sh =  start.y - end.y;
    }

    $(window).off();

    var resize_width = (sw > 300) ? sw : 300;

    $('#mycanvas').attr('width',sw).attr('height',sh);
    $('#content').width(resize_width).height(sh);
    $('#relative-div').width(resize_width).height(sh);

    $('#title-area').fadeIn(300);
    $('#button-area').fadeIn(300);
    $('#color-area').fadeIn(300);


    $('#save-button')
    .on('click',function(){
      var img_title = $('#title-text').val().replace(/\s+/g, '_');
      if( img_title == "" ){
        img_title = "no_name";
      }
      console.log(img_title);
      var base64_resized = canvas.toDataURL( "image/png" );
      var a = document.createElement('a');
      a.download = img_title + ".png";
      a.href = base64_resized;
      var evt = document.createEvent('MouseEvent');
      evt.initEvent("click", true, false);
      a.dispatchEvent( evt );
      // chrome.tabs.getCurrent(function(tab) {
      //   chrome.tabs.remove(tab.id, function() { });
      // });
    });

    $('#delete-button')
    .on('click',function(){
      ctx.drawImage(img, left , top , sw, sh, 0, 0, sw, sh);
    });

    $('#undo-button').click(function(){
      ctx.putImageData(undo_img,0,0);
    });

    $('#color-area button')
    .click(function(){
      ctx.strokeStyle = $(this).css('background-color');
      $(this).toggleClass('selected-color');
    });

    var date = new Date();
    var day = date.getFullYear() + "_" + (date.getMonth()+1) + "" +date.getDate() + "_";
    $('#title-text').val(day);

    $('#mycanvas').css('border','1px solid #000');
    $('#selection').fadeOut(300);

    ctx.drawImage(img, left , top , sw, sh, 0, 0, sw, sh);
    undo_img = ctx.getImageData(0,0,sw,sh);

    var offset = 2;
    var startX;
    var startY;
    var flag = false;

    $('#mycanvas').mousedown(function(e) {
      undo_img = ctx.getImageData(0,0,sw,sh);
      flag = true;
      startX = e.pageX - $(this).offset().left - offset;
      startY = e.pageY - $(this).offset().top - offset;
      return false; // for chrome
    })
    .mousemove(function(e) {
      if (flag) {
        var endX = e.pageX - $('canvas').offset().left - offset;
        var endY = e.pageY - $('canvas').offset().top - offset;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.closePath();
        startX = endX;
        startY = endY;
      }
    })
    .on('mouseup', function() {
      flag = false;
    })
    .on('mouseleave', function() {
      flag = false;
    });

  });

}
