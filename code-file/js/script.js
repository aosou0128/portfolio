$(function () {

  // 目次ハイライト設定 --------------------------------------------------
  let elemTop = [];
  //現在地を取得するための設定を関数でまとめる
  function PositionCheck() {
    //headerの高さを取得
    let headerH = parseInt($('.section-title').css('margin-top'), 10);
    //.scroll-pointというクラス名がついたエリアの位置を取得する設定
    $('.scroll-point').each(function (i) {//.scroll-pointクラスがついたエリアからトップまでの距離を計算して設定
      elemTop[i] = Math.round(parseInt($(this).offset().top - headerH));//追従するheader分の高さ（70px）を引き小数点を四捨五入
    });
  }

  function ScrollAnime() {//スクロールした際のナビゲーションの関数にまとめる
    let scroll = Math.round($(window).scrollTop());
    let NavElem = $('.nav-category-s li');//ナビゲーションのliの何番目かを定義するための準備
    $('.nav-category-s li').removeClass('on');//全てのナビゲーションの現在地クラスを除去
    if (scroll >= 0 && scroll < elemTop[1]) {
      $(NavElem[0]).addClass('on');
      $(NavElem[3]).addClass('on');
    }
    else if (scroll >= elemTop[1] && scroll < elemTop[2]) {
      $(NavElem[1]).addClass('on');
      $(NavElem[4]).addClass('on');
    }
    else if (scroll >= elemTop[2] && scroll < elemTop[3]) {
      $(NavElem[2]).addClass('on');
      $(NavElem[5]).addClass('on');
    }
  }

  // スムーススクロール --------------------------------------------------
  $('.nav-category-s li a').click(function () {
    let elmHash = $(this).attr('href'); //hrefの内容を取得
    let x = Math.round($(elmHash).offset().top);  //headerの高さを引き小数点を四捨五入
    let y = parseInt($('.section-title').css('margin-top'), 10);
    let pos = x - y;
    $('body,html').animate({ scrollTop: pos }, 600);//取得した位置にスクロール※数値が大きいほどゆっくりスクロール
    return false;//リンクの無効化
  });

  // 画面をスクロールをしたら動かしたい場合の記述
  $(window).scroll(function () {
    PositionCheck();/* 現在地を取得する関数を呼ぶ*/
    ScrollAnime();/* ナビゲーションに現在地のクラスをつけるための関数を呼ぶ*/
  });

  // ページが読み込まれたらすぐに動かしたい場合の記述
  $(window).on('load', function () {
    PositionCheck();/* 現在地を取得する関数を呼ぶ*/
    ScrollAnime();/* ナビゲーションに現在地のクラスをつけるための関数を呼ぶ*/
  });

  $(window).resize(function () {
    //リサイズされたときの処理
    PositionCheck()
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

  // -main-カルーセル設定 ----------------------------------------

  $('.slider').slick({
    autoplay: true, // 自動再生を設定
    autoplaySpeed: 3000, // スライド切り替えの時間を設定
    fade: true,
    dots: false, // インジケーターを表示
    responsive: [
      {
        breakpoint: 832.999,
        settings: {
          dots: true,
        }
      },
    ]
  });
  $('.thumb').slick({
    asNavFor: '.slider',
    focusOnSelect: true,
    slidesToShow: 6,
    slidesToScroll: 0,
    centerMode: true,
  });

  $(window).on('load resize', function () {
    let categoryBorderW = parseInt($('#category>.list>.box-1>.box').css('width'), 10);
    let categoryBorderY = categoryBorderW * 0.5625;
    $('#category>.list>.box-1>.box').css('height', categoryBorderY);
    $('#category>.list>.box-2>.box').css('height', categoryBorderY);
    console.log(categoryBorderW);
    let receptionBorderW = parseInt($('#reception>.box').css('width'), 10);
    let receptionBorderY = receptionBorderW * 0.5625;
    $('#reception>.box').css('height', receptionBorderY);
  });
});
