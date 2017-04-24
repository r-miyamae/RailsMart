//= require jquery
//= require jquery_ujs
var keep1 = 0;//預り金用変数（フォームの値で初期化）
var keep2 = 0;//万券ボタン使用時に使用
var receive = 0;//預り金を入れる変数
var itemcode = 0;//商品コードを入れる変数
var itemjudge = 0;//商品コードを読み取り判定
var usernum = 0;//会員番号を入れる変数
var userjudge = 0;//会員番号読み取り判定用
var reducejudge = 0;//
var reduce =0;//値引き（ポイント使用)
var change = 0;//お釣り
var subtotal = 0;//小計
var ghugo = 0;//利用可能ポイント用
var deljudge = 0;//指定取消判定
var reinum = 0;//リピートする商品番号を格納
var len = 0;
var miyamae=1;//客層ボタン連打対策
//キーコード//////リ/入力/ク・/万・/ポ/取消/男・・・・・・・・・・・・・・・・・/女・・・・・・・・・・・・・・・・・・・・/中止/ス/値引き
var keyline = [82,79,46,77,80,84,73,79,80,219,221,77,188,190,191,220,106,83,78];
var num_key = [48,57];
document.onkeydown = keypush;

//金額を区切る関数
function separate(num){
    return String(num).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}
//jsonファイルを取得
var ngo=new Array();
onload=function testtt(){
  //タブ処理--------------------------------------------------------
  $(".hotters li").click(function() {
    var index = $(".hotters li").index(this);
    $(".content li").css("display","none");
    $('.content li').eq(index).css('display','block');
    $('.hotters li').removeClass('current');
    $(this).addClass('current');
  });
  //会員情報を表示
  var hogo=gon.user;
  if(hogo!="")
  var hugo=eval( '(' + hogo + ')' );
  if(hugo){
    ghugo=hugo.points;
    document.getElementById("customer_num").value=hugo.cnum;
    document.getElementById("u_num").textContent=hugo.cnum;
    document.getElementById("u_poin").textContent=hugo.points+"ポイント";
  }
  //スキャンした商品を表示
  len=gon.commit.length;
  if(len<7){
    for(i=0;i<7-len;i++){
      $(function(){
        $(".content0").after("<tr><td class='del'><span></span></td><td class='item'><span></span></td><td class='cnt'><span></span></td><td class='price'><span></span></td></tr>");
      });
    }
  }
  if(gon.commit.length){
  var iaia= (eval( '(' + gon.commit[(len-1)] + ')' ));
  reinum=iaia.inum;
}
  for(var i = 0;i < len; i++){
    ngo[i] =gon.commit[(len-1)-i];
    var huga = eval( '(' + ngo[i] + ')' );
    subtotal+=huga.price;
    var del="";
    if(huga.price<0)
      del="消";
    $(function(){
      $(".content0").after("<tr><td class='del' id='del"+((len)-i)+"'><span>"+del+"</span></td><td class='item'><span>"+huga.iname+"</span></td><td class='cnt' id='cnt"+((len)-i)+"'>1<span></span></td><td class='price'><span>"+separate(huga.price)+"円"+"</span></td></tr>");
    });
  }
  document.getElementById("subtota").textContent=separate(subtotal)+"円";
  document.getElementById("discoun").textContent=separate(subtotal+reduce)+"円";
  //一番下までスクロール
  $(function(){
      $(".tables").scrollTop($(".tables")[0].scrollHeight);
  });
    $(".hot").click(function(){
    hotnum=$(this).attr("value");
    document.getElementById("inum").value=(eval(hotnum));
    document.getElementById("deletejudge").value=deljudge;
    var a = document.getElementById("isubmit");
    a.click();
  });
}
//キーを押したときの処理
function keypush(){
  if(miyamae){
    var repeat=0;//リピートの判定用（ボタン押毎に初期化）
    var generation= 0 ; //客層ボタン判定
    var keynum=parseInt(event.keyCode);
    console.log(keynum);
    for(var i=0;i<19;i++){
      if(keynum==keyline[i]){
        break;
      }
    }
    //-------------------------------------バーコードスキャン--------------------
    if(i!=1){   //入力ボタンを押した時実行されないように
      if(itemjudge||userjudge||reducejudge){
        if(keynum >= num_key[0] && keynum <= num_key[1]){
          if(itemjudge){//商品番号入力
            itemcode=itemcode*10+(keynum-num_key[0]);
            if(itemcode>=10000)itemcode=9999;
            document.getElementById("i_code").textContent=itemcode;
            document.getElementById("inum").value=itemcode;
          }else if(userjudge){//会員番号入力
            usernum=usernum*10+(keynum-num_key[0]);
            if(usernum>=1000000)usernum=999999;
            document.getElementById("u_num").textContent=usernum;
            document.getElementById("cnum").value=usernum;
          }else if(reducejudge){//ポイント使用金額入力
            reduce=reduce*10-(keynum-num_key[0]);
            if(-reduce>ghugo)
              reduce=-ghugo;
            if(-reduce>subtotal)
              reduce=-subtotal;
            document.getElementById("reduc").textContent=separate(reduce)+"円";
          }
        }
      }
      else if(keynum >= num_key[0] && keynum <= num_key[1] || i== 3){    //-----預り金入力--------
        // num_key[0]-num_key[1]
        if(i != 3){   //数字ボタン
          keep1=keep1*10+(keynum-num_key[0]);
        }else{      //万券ボタン
          if(keep1 == 0){
            keep1=1;
          }
          keep2+=keep1*10000;
          keep1=0;
        }
        receive=keep1+keep2;
        if(receive>=1000000000000)
          receive=999999999999;
        document.getElementById("receiv").textContent=separate(receive)+"円";
        receive=keep1+keep2;
      }
    }
    //-----------------------------------処理判定----------------------------
      if(i==0){
        repeat=1;
      }
      if(i==1||i==16){   //入力・中止
        if(i==16){//中止ーーーーーーーーーーーーーーーーーーーー
          if(itemjudge){
            itemcode=0;
            document.getElementById("i_code").textContent="";
            if(deljudge){
              $('.registers').css('background-color','#F8F8FF');
            }
          }else if(userjudge){
            usernum=0;
            document.getElementById("u_num").textContent="";
          }else if(reducejudge){
            reduce=0;
            document.getElementById("reduc").textContent="";
          }
        }else{//入力ーーーーーーーーーーーーーーーーーーーーーーー
          if(itemjudge){
            var a = document.getElementById("isubmit");
            document.getElementById("deletejudge").value=deljudge;
            a.click();
            testtt();
          }else if(userjudge){
            var a = document.getElementById("csubmit");
            a.click();
            testtt();
          }else if(reducejudge){
            document.getElementById("discoun").textContent=separate(subtotal+reduce)+"円";
          }
        }
        itemjudge=0;
        userjudge=0;
        reducejudge=0;
        deljudge=0;
        $('#tred1').css('background-color','#f5f5f5');
        $('.user_num').css('background-color','#f5f5f5');
        $('.itemcodebox').css('background-color','#ffffff');
      }else if(i==2){   //クリア
        if(itemjudge==0&&userjudge==0&&reducejudge==0){
          receive=0;
          keep1=0;
          keep2=0;
          document.getElementById("receiv").textContent="";
        }else if(itemjudge==1){
          itemcode=0;
          document.getElementById("i_code").textContent="";
        }else if(userjudge==1){
          usernum=0;
          document.getElementById("u_num").textContent="";
        }else if(reducejudge==1){
          reduce=0;
          document.getElementById("reduc").textContent="";
        }
      }else if(i==4){   //会員ボタン
        if(itemjudge||reducejudge){
          window.alert("間違った操作です");
        }else{
          usernum=0;
          userjudge=1;
          $('.user_num').css('background-color','#00FF00');
        }
      }else if(i==17){//スキャンボタン
        if(userjudge||reducejudge){
          window.alert("間違った操作です");
        }else{
          itemcode=0;
          itemjudge=1;
          $('.itemcodebox').css('background-color','#00FF00');
        }
      }else if(i==18){//値引きボタン（ポイント使用）

        if(userjudge||itemjudge){
          window.alert("間違った操作です");
        }else{
          reduce=0;
          reducejudge=1;
          $('#tred1').css('background-color','#00FF00');
          document.getElementById("reduc").textContent=separate(reduce)+"円"
        }
      }else if(i>5&&i<16&&len){  //客層ボタン
        miyamae=0;
        if(receive==0||receive>=subtotal+reduce){
          if(!receive){
            receive=subtotal+reduce;
            document.getElementById("receiv").textContent=separate(receive)+"円";
          }
          change=receive-(subtotal+reduce)
          document.getElementById("chang").textContent=separate(change)+"円";
          var generation=i-5;
          document.getElementById("gene").value=generation;
          document.getElementById("redu").value=reduce;
          var a = document.getElementById("set");
          a.click();
        }else{
          window.alert("預かり金額が間違っています");
        }
      }else if(i==5){
        deljudge=1;
        $('.registers').css('background-color','#ff9999');
        itemcode=0;
        itemjudge=1;
        $('.itemcodebox').css('background-color','#00FF00');
      }else if(i==0){
        document.getElementById("inum").value=reinum;
        document.getElementById("deletejudge").value=deljudge;
        var a = document.getElementById("isubmit");
        a.click();
      }
    }
}
