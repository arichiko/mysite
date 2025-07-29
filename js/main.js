
/*=================================================
  toggle-btn
===================================================*/
$(function () {
  $(".toggle-btn").on("click", function () {
    if ($("header").hasClass("open")) {
      $("header").removeClass("open");
    } else {
      $("header").addClass("open");
    }
  });

  $(".mask").on("click", function () {
    $("header").removeClass("open");
  });

    $(".header-nav a, .header-inner-list a").on("click", function () {
    $("header").removeClass("open");
  });
});

/*=================================================
  スムーススクロール
===================================================*/
 $('a[href^="#"]').click(function () {
    // クリックしたaタグのリンクを取得
    let href = $(this).attr("href");
    // ジャンプ先のid名をセット hrefの中身が#もしくは空欄なら,htmlタグをセット
    let target = $(href == "#" || href == "" ? "html" : href);
    // ページトップからジャンプ先の要素までの距離を取得
    let position = target.offset().top;
    // animateでスムーススクロールを行う   ページトップからpositionだけスクロールする
    // 600はスクロール速度で単位はミリ秒  swingはイージングのひとつ
    $("html, body").animate({ scrollTop: position  }, 1600, "swing");
    // urlが変化しないようにfalseを返す
    return false;
  });

/*=================================================
  guide
===================================================*/

gsap.registerPlugin(ScrollTrigger);

// 横スクロールさせるパネルのセレクタを調整
let sections = gsap.utils.toArray(".card-item");

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1), // 各パネルを横に移動させる
  ease: "none", // イージングなしでリニアに
  scrollTrigger: {
    trigger: ".guide", // スクロール開始のトリガー要素
    pin: true,
    scrub: 1, // スクロールにアニメーションを連動 (1は少し遅れて追従)
    snap: 1 / (sections.length - 1), // 各パネルの終点でスナップ
    end: () => "+=" + document.querySelector(".guide").offsetWidth
  }
});

/*=================================================
//guide　sp時カードのクリックイベント
===================================================*/


document.addEventListener('DOMContentLoaded', () => {
   // 全てのカードアイテムを取得
   const cardItems = document.querySelectorAll('.card-item');

   // タッチデバイスかどうかを判定する関数
   const isTouchDevice = () => {
       return ('ontouchstart' in window) ||
              (navigator.maxTouchPoints > 0) ||
              (navigator.msMaxTouchPoints > 0);
   };

   if (isTouchDevice()) {
       // タッチデバイスの場合
       cardItems.forEach(cardItem => {
           const card = cardItem.querySelector('.card');
           
           // クリックイベントリスナーを追加
           card.addEventListener('click', () => {
               // 'is-flipped' クラスをトグルする (あれば削除、なければ追加)
               card.classList.toggle('is-flipped');
           });

           // カードの裏面をクリックしたときに、リンクが反応するように考慮
           // 例えば、card-back-text 内の a タグがクリックされた場合は、カードを裏返さない
           const cardBackText = card.querySelector('.card-back-text');
           if (cardBackText) {
               cardBackText.addEventListener('click', (e) => {
                   e.stopPropagation(); // イベントのバブリングを停止
                   // ここでリンクのデフォルト動作（ページ遷移）は維持される
               });
           }
       });
   } else {
       // デスクトップ（ホバー可能なデバイス）の場合、JavaScriptでの操作は不要
       // CSSの @media (hover: hover) で制御されるため
   }
});

/*=================================================
 event
===================================================*/
// $(function () {
//   let cards = gsap.utils.toArray(".event-card-wrapper");

//   let stickDistance = '100px';

//   let lastCardST = ScrollTrigger.create({
//     trigger: cards[cards.length - 1],
//     start: "bottom bottom"
//   });

//   cards.forEach((card, index) => {

//     ScrollTrigger.create({
//       trigger: card,
//       start: "top top",
//       end: () => "+=450",
//       endTrigger: cards[index + 1] || card, // 次のカードがあれば、それまでで終了
//       pin: true,
//       pinSpacing: false,
//       ease: "none",
//       toggleActions: "restart none none reverse"
//     });
//   });
// });
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.matchMedia({

  // 💻 PC表示（幅801px以上）
  "(min-width: 856px)": function () {
    const cards = gsap.utils.toArray(".event-card-wrapper");

    cards.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        endTrigger: cards[index + 1] || card,
        end: "+=450",
        pin: true,
        pinSpacing: false,
        toggleActions: "restart none none reverse",
      });
    });
  },

  // 📱 モバイル表示（幅800px以下）
  "(max-width: 856px)": function () {
    const cards = gsap.utils.toArray(".event-card-wrapper");

    cards.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top+=300 top", // ← テキスト下に出てくるように調整
        endTrigger: cards[index + 1] || card,
        end: "+=400",
        pin: true,
        pinSpacing: false,
        toggleActions: "restart none none reverse",
      });
    });
  }

});

/*=================================================
voice
===================================================*/
$(window).scroll(function () {
  $(".slide-left").each(function () {
    var scroll = $(window).scrollTop();
    var target = $(this).offset().top;
    var windowHeight = $(window).height();
    if (scroll > target - windowHeight + $(this).outerHeight()) {
      $(this).addClass("inview-slide-left");
    }
  });
});

$(window).scroll(function () {
  $(".slide-right").each(function () {
    var scroll = $(window).scrollTop();
    var target = $(this).offset().top;
    var windowHeight = $(window).height();
    if (scroll > target - windowHeight + $(this).outerHeight()) {
      $(this).addClass("inview-slide-right");
    }
  });
});

$(window).scroll(function () {
  $(".voice-item").each(function () {
    var scroll = $(window).scrollTop();
    var target = $(this).offset().top;
    var windowHeight = $(window).height();
    if (scroll > target - windowHeight + $(this).outerHeight()) {
      $(this).addClass("inview-voice-item");
    }
  });
});



/*=================================================
  Q&A アコーディオン
===================================================*/

$('.accordion-header').click(function() {
  $(this).next().slideToggle();
  $(this).toggleClass('active');
});

/*=================================================
  背景波線のスクロールアニメーション
===================================================*/
$(window).on('scroll', function() {
    // 現在のスクロール量を取得
    let scrollTop = $(this).scrollTop();

    // スクロール量に応じて背景の位置を計算
    // 例: スクロール量1pxにつき、背景を0.5px上に動かす（速度調整）
    // 数値を調整して「流れる」速度を変えられます
    let backgroundY = -scrollTop * 1; // スクロールダウンで背景が上に動く

    // bodyのbackground-position-yを更新
    $('main').css('background-position-y', backgroundY + 'px');
});
