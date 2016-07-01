
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {

  var pre_text = "";

  console.log("content");
  // if (msg.command && (msg.command == "change_title")) {
  //   var src = document.getElementsByTagName("title")[0].innerHTML;
  //   var dst = msg.title;
  //   document.getElementsByTagName("title")[0].innerHTML = dst;
  //   sendResponse("the page title's changed: '" + src + "' -> '" + dst + "'");
  // }
  sendResponse("やっほー");

  $('body').prepend('<div class="empty"></div>');//これなしでheader固定すると変になる。
  $('body').prepend('<div class="fixfixfix"><div class="extension-controller"></div></div>');
  $('body').css({'padding':'0','margin':'0'});

  $('.empty')
  .css({'width':'100%',
        'height':'70px',
        'background-color':'black'
      });

  $('.fixfixfix')
  .css({'width':'100%',
        'height':'70px',
        'background-color':'black',
        'position':'fixed',
        'z-index':'10000000'
      });

  $('.extension-controller')
  .css({'width':'100%',
        'height':'70px',
        'background-color':'black',
        'font-size':'20px',
        'color':'white'
      })
  .append('<div class="text-highlighting">text-highlighting( select text + Enter )</div>')
  .append('<div class="image-capturing">image-capturing( click here + select area )</div>');

  $('.text-highlighting')
  .css({'width':'50%','float':'left',
         'text-align':'center','line-height':'70px',
         'cursor':'pointer','background-color':'#550000'
       });

  $('.image-capturing')
  .css({'width':'50%','float':'left',
        'text-align':'center','line-height':'70px',
        'cursor':'pointer','background-color':'#000055'
      })
  .click(capture);

  document.onkeydown = function (e){
    if(!e) e = window.event; // レガシー
    if( e.keyCode == 13) getText();
  };

  function getText(){
    //selectした文章の取得
    // console.log(window.getSelection().toString());
    var text = window.getSelection().toString();
    if( text == pre_text || text === "" ) return;
    console.log(text);
    //content.jsから送るとhttpsのページでエラーが出るので、background.jsから送る。
    chrome.runtime.sendMessage(
      {
        func: "text",
        content: text,
        page_id: msg.page_id
      },
      function(response){
        console.log(response);
      });
  }

  function capture(){
    chrome.runtime.sendMessage( {func: "capture" ,page_id: msg.page_id},
      function(response){
        console.log(response);
      }
    );
  }






  // $('img').draggable().css('opacity','0.5').click(function(){
  //   var $selected = $(this);
  //   var w = $selected.width();
  //   var h = $selected.height();
  //   console.log($selected);
  //   console.log($selected[0]);
  //
  //   if( $selected.hasClass('selected-image') ){
  //     $selected.css({ "border":"none", "opacity":0.5 });
  //     $selected.width(w+4);
  //     $selected.height(h+4);
  //   }
  //   else{
  //     $selected.css({ "border":"2px solid #ff0000", "opacity":1.0 });
  //     $selected.width(w-4);
  //     $selected.height(h-4);
  //   }
  //   $selected.toggleClass('selected-image');
  //
  //   return false;//これでimgをクリックした時のリンクを無効にできる。
  // });

});
