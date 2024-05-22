$(window).on('load', function () {

   // ファーストビューテキストアニメーション設定 --------------------------------------------------
   const CLASSNAME = "-visible";
   const DELAY = 800;
   const DELAY2 = 400;
   const $target1 = $(".title");
   const $target2 = $(".sentence");

   setInterval(() => {
      $target1.addClass(CLASSNAME);
      setTimeout(() => {
         $target2.addClass(CLASSNAME);
      }, DELAY2);
   }, DELAY);
});

$(function () {

   // 目次ハイライト設定 --------------------------------------------------
   let elemTop = [];

   // スクロールポイント取得 --------------------------------------------------
   function PositionCheck(scrollPoint) {
      let marginT = parseInt($('.content-title').css('margin-top'), 10); // margin-topを取得
      console.log(marginT);
      if (scrollPoint == '.scroll-point') {
         $(scrollPoint).each(function (i) { // i回繰り返す。0から1ずつ増える。
            elemTop[i] = Math.round(parseInt($(this).offset().top - marginT)); // elemTop2のi番目にポイントの画面上からの距離を四捨五入して代入
         });
      }
   }

   // .onを付与 --------------------------------------------------
   function ScrollAnime(onClass) {
      let scroll = Math.round($(window).scrollTop()); // webページ全体の上から表示中の画面上までの距離を代入
      let NavElem = $(onClass); // NavElemという変数に代入
      if (onClass == '.nav-category-s li') {
         $(onClass).removeClass('on'); // 今ついているonクラスを削除
         if (scroll >= 0 && scroll < elemTop[2]) { // スクロール位置が0以上・2つ目のポイントの画面上からの距離以下
            $(NavElem[0]).addClass('on');
            $(NavElem[4]).addClass('on');
         }
         else if (scroll >= elemTop[2] && scroll < elemTop[3]) {
            $(NavElem[1]).addClass('on');
            $(NavElem[5]).addClass('on');
         }
         else if (scroll >= elemTop[3] && scroll < elemTop[4]) {
            $(NavElem[2]).addClass('on');
            $(NavElem[6]).addClass('on');
         }
         else if (scroll >= elemTop[4]) {
            $(NavElem[3]).addClass('on');
            $(NavElem[7]).addClass('on');
         }
      }
   }

   function fadeIn(fadePoint) {
      $(fadePoint).each(function () { //smoothTextTriggerというクラス名が
         let elemPos = $(this).offset().top - 50;//要素より、50px上の
         let scroll = $(window).scrollTop();
         let windowHeight = $(window).height();
         if (scroll >= elemPos - windowHeight) {
            $(this).addClass('on');// 画面内に入ったらsmoothTextAppearというクラス名を追記
         }
      });
   }

   // スムーススクロール --------------------------------------------------
   $('.nav-category-s li a').click(function () {
      let elmHash = $(this).attr('href'); //hrefの内容を取得
      let bodyH = Math.round($('body').offset().top);  //bodyの高さを取得
      let idH = Math.round($(elmHash).offset().top);  //idの高さを取得
      let marginT2 = parseInt($('.content-title').css('margin-top'), 10);
      let idH2 = idH - marginT2;
      let bodyH2 = bodyH - marginT2 - 44;
      if (elmHash == '#sharechan') {
         $('body,html').animate({ scrollTop: bodyH2 }, 600);
      }
      else {
         $('body,html').animate({ scrollTop: idH2 }, 600);//取得した位置にスクロール※数値が大きいほどゆっくりスクロール
      }

      return false;//リンクの無効化
   });

   // ページが読み込まれる or スクロールする → 開始
   $(window).on('load scroll', function () {
      PositionCheck('.scroll-point');
      ScrollAnime('.nav-category-s li');
      fadeIn('.in-box');
      fadeIn('.content-title');
   });

   // ページのサイズを変える → 開始
   $(window).resize(function () {
      PositionCheck()
   });
});



// ハンバーガーメニュータップ時 --------------------------------------------------
$('.openbtn').click(function () {
   $(this).toggleClass('active');
   $('#g-nav').toggleClass('panelactive');
   $('.circle-bg').toggleClass('circleactive');
});

// ナビのリンクがタップされたら
$('#g-nav a').click(function () {
   $('.openbtn').removeClass('active');
   $('#g-nav').removeClass('panelactive');
   $('.circle-bg').removeClass('circleactive');
});

var state = false;
var pos;
$('.openbtn').click(function () {
   if (state == false) {
      pos = $(window).scrollTop();
      $('body').addClass('fixed').css({ 'top': - pos });
      state = true;
   } else {
      $('body').removeClass('fixed').css({ 'top': 0 });
      window.scrollTo(0, pos);
      state = false;
   }
});

// YouTubeの埋め込みと画像の比率調整
$(window).on('load resize', function () {
   let charm4W = parseInt($('.c4-iframe').css('width'), 10);
   let charm4H = charm4W * 0.5625 + 'px';
   $('.c4-iframe').css('height', charm4H);
   let contentBorderW = parseInt($('.content-box').css('width'), 10);
   let contentBorderY = contentBorderW * 0.5625;
   $('.content-box').css('height', contentBorderY);
});