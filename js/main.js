
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


    $(".mask").on("click", function () {
      $("header").removeClass("open");
    });

      $(".header-nav a, .header-inner-list a").on("click", function () {
      $("header").removeClass("open");
    });
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
let sections = gsap.utils.toArray(".card-item"); // 横スクロールさせるパネルのセレクタを調整
gsap.to(sections, {
  xPercent: -100 * (sections.length - 1), // 各パネルを横に移動させる 左に100%移動 × (6-1) カード５枚分左に移動すれば、最後のカードまで表示されるという計算
  ease: "none", // イージングなしでリニア(直線的)に移動
  scrollTrigger: {
    trigger: ".guide", // スクロール開始のトリガー要素 .guideに入ったら横スクロール開始
    pin: true, // (.guide) が、スクロールアニメーション中、画面の決まった位置に固定（ピン留め）される
    scrub: 1, // スクロールにアニメーションを連動 (1は少し遅れて追従)
    snap: 1 / (sections.length - 1), // 各パネルの終点でスナップ スクロールを止めたときに、アニメーションが「カチッ」と区切りの良い位置に自動的に移動
    end: () => "+=" + document.querySelector(".guide").offsetWidth //.guide 要素の幅分だけ下にスクロールしたところで、アニメーションが終了
  }
});


/*=================================================
//guide sp時カードのクリックイベント
===================================================*/

document.addEventListener('DOMContentLoaded', () => {
  const cardItems = document.querySelectorAll('.card-item');  // 全てのカードアイテムを取得

   // タッチデバイス判定をせずに、常にクリックイベントを設定する
    cardItems.forEach(cardItem => {
      const card = cardItem.querySelector('.card');
       // クリックイベントリスナーを追加
      card.addEventListener('click', () => {
           // 'is-flipped' クラスをトグルする (あれば削除、なければ追加)
          card.classList.toggle('is-flipped');
      });

       // カードの裏面をクリックしたときに、リンクが反応するように考慮
      const cardBackText = card.querySelector('.card-back-text');
      if (cardBackText) {
          cardBackText.addEventListener('click', (e) => {
               e.stopPropagation(); // イベントのバブリングを停止
               // ここでリンクのデフォルト動作（ページ遷移）は維持される
          });
      }
  });
});

/*=================================================
 event
===================================================*/

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.matchMedia({

  "(min-width: 856px)": function () {
    const cards = gsap.utils.toArray(".event-card-wrapper");

    cards.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top 4%",
        endTrigger: cards[index + 1] || card,
        end: "+=450",
        pin: true,
        pinSpacing: false,
        toggleActions: "restart none none reverse",
      });
    });
  },
}),

  ScrollTrigger.matchMedia({
    // 856px未満
    "(max-width: 855px)": function () {
      gsap.utils.toArray(".event-card-wrapper").forEach((card, i) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          delay: i * 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }
  });

/*=================================================
voice
===================================================*/

$(window).scroll(function () {
  $(".voice-item").each(function () {
    var scroll = $(window).scrollTop();
    var target = $(this).offset().top;
    var windowHeight = $(window).height();
    if (scroll > target - windowHeight + $(this).outerHeight() * 0.5) {
      $(this).find(".balloon").addClass("inView-balloon"); 
    }
  });
});



/*=================================================
  Q&A アコーディオン
===================================================*/

$('.accordion-header').click(function () {
  $(this).next().slideToggle();
  $(this).toggleClass('active');
});

/*=================================================
  背景波線のスクロールアニメーション
===================================================*/
$(window).on('scroll', function () {
  // 現在のスクロール量を取得
  let scrollTop = $(this).scrollTop();

  // スクロール量に応じて背景の位置を計算
  // 例: スクロール量1pxにつき、背景を0.5px上に動かす（速度調整）
  // 数値を調整して「流れる」速度を変えられます
  let backgroundY = -scrollTop * 1; // スクロールダウンで背景が上に動く

  // bodyのbackground-position-yを更新
  $('main').css('background-position-y', backgroundY + 'px');
});
