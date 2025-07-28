
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
    pin: true, // トリガー要素をビューポートに固定
    scrub: 1, // スクロールにアニメーションを連動 (1は少し遅れて追従)
    snap: 1 / (sections.length - 1), // 各パネルの終点でスナップ
    end: () => "+=" + document.querySelector(".guide").offsetWidth // アニメーション終了のスクロール量
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
$(function () {
  let cards = gsap.utils.toArray(".event-card-wrapper");

  let stickDistance = '100px';

  let lastCardST = ScrollTrigger.create({
    trigger: cards[cards.length - 1],
    start: "bottom bottom"
  });

  cards.forEach((card, index) => {

    ScrollTrigger.create({
      trigger: card,
      start: "top top",
      end: () => "+=450",
      // end: nextCard ? "top top" : "bottom top",
      // end: () => lastCardST.start + stickDistance,
      endTrigger: cards[index + 1] || card, // 次のカードがあれば、それまでで終了
    // end: cards[index + 1] ? "top center" : "bottom center", // 最後だけ特別
      pin: true,
      pinSpacing: false,
      ease: "none",
      toggleActions: "restart none none reverse"
    });
  });
});

/*=================================================
Inview（画面に表示されたタイミングで処理を実行）
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
