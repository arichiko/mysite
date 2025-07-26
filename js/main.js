
//toggle-btn
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

// guide

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

// event
