// -----------------------------------------
// もっと見るボタン
// -----------------------------------------
const viewMore = (root) => {
    let flag = false;
    const viewMore = root;
    const viewMoreItem = viewMore.querySelectorAll('.js-viewMore-item');
    const btn = viewMore.querySelector('.js-viewMore-btn');
    const btnText = viewMore.querySelector('.js-viewMore-btn-text');
    const initialVisibleItems = 5;

    if (!viewMoreItem.length || !btn || !btnText) {
        return;
    } else if (viewMoreItem.length < initialVisibleItems) {
        btn.style.display = "none";
        return;
    }

    // 初期表示以外の要素を非表示にする
    for (let i = initialVisibleItems; i < viewMoreItem.length; i++) {
        viewMoreItem[i].classList.add("hidden");
    }

    btn.addEventListener('click', () => {
        if (flag) {
            for (let i = initialVisibleItems; i < viewMoreItem.length; i++) {
                viewMoreItem[i].classList.add("hidden");
            }
            flag = false;
            btnText.textContent = "もっと見る";
        } else {
            for (let i = initialVisibleItems; i < viewMoreItem.length; i++) {
                viewMoreItem[i].classList.remove("hidden");
            }
            flag = true;
            btnText.textContent = "閉じる";
        }
        btn.classList.toggle('close');
    });
};

(() => {
    const roots = document.querySelectorAll(".js-viewMore");
    for (let i = 0; i < roots.length; i++) {
        viewMore(roots[i]);
    }
})();

// -----------------------------------------
// アコーディオン（アニメーション）
// -----------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  setUpAccordion();
});

const setUpAccordion = () => {
  const details = document.querySelectorAll(".js-details");
  const RUNNING_VALUE = "running"; // アニメーション実行中のときに付与する予定のカスタムデータ属性の値
  const IS_OPENED_CLASS = "is-opened"; // アイコン操作用のクラス名

  details.forEach((element) => {
    const summary = element.querySelector(".js-summary");
    const content = element.querySelector(".js-content");

    summary.addEventListener("click", (event) => {
      // デフォルトの挙動を無効化
      event.preventDefault();

      // 連打防止用。アニメーション中だったらクリックイベントを受け付けないでリターンする
      if (element.dataset.animStatus === RUNNING_VALUE) {
        return;
      }

      // detailsのopen属性を判定
      if (element.open) {
        // アコーディオンを閉じるときの処理
        // アイコン操作用クラスを切り替える(クラスを取り除く)
        element.classList.toggle(IS_OPENED_CLASS);

        // アニメーションを実行
        const closingAnim = content.animate(closingAnimKeyframes(content), animTiming);
        // アニメーション実行中用の値を付与
        element.dataset.animStatus = RUNNING_VALUE;

        // アニメーションの完了後に
        closingAnim.onfinish = () => {
          // open属性を取り除く
          element.removeAttribute("open");
          // アニメーション実行中用の値を取り除く
          element.dataset.animStatus = "";
        };
      } else {
        // アコーディオンを開くときの処理
        // open属性を付与
        element.setAttribute("open", "true");

        // アイコン操作用クラスを切り替える(クラスを付与)
        element.classList.toggle(IS_OPENED_CLASS);

        // アニメーションを実行
        const openingAnim = content.animate(openingAnimKeyframes(content), animTiming);
        // アニメーション実行中用の値を入れる
        element.dataset.animStatus = RUNNING_VALUE;

        // アニメーション完了後にアニメーション実行中用の値を取り除く
        openingAnim.onfinish = () => {
          element.dataset.animStatus = "";
        };
      }
    });
  });
}

const animTiming = {
  duration: 400,
  easing: "ease-out"
};

const closingAnimKeyframes = (content) => [
  {
    height: content.offsetHeight + 'px', // height: "auto"だとうまく計算されないため要素の高さを指定する
    opacity: 1,
  }, {
    height: 0,
    opacity: 0,
  }
];

const openingAnimKeyframes = (content) => [
  {
    height: 0,
    opacity: 0,
  }, {
    height: content.offsetHeight + 'px',
    opacity: 1,
  }
];

// -----------------------------------------
// m-circleアニメーション
// -----------------------------------------

window.addEventListener('DOMContentLoaded',function(){
  gsap.registerPlugin(ScrollTrigger);
  const tl = gsap.timeline({
      scrollTrigger:{
      trigger:'.m-circle',
      start:'top 70%',
  }});
  tl
  .fromTo('.m-circle__content > *',{autoAlpha:0,y:20},{autoAlpha:1,y:0,stagger:.3})
  .fromTo('.m-circle__circle',{rotate:'-120deg',x:'-50%',y:'-50%'},{duration:1.5,rotate:'0deg',x:'-50%',y:'-50%'},'<')
  .fromTo('.m-circle__circleInner',{autoAlpha:0,'stroke-dasharray':'0 1413'},{autoAlpha:1,'stroke-dasharray':'1060 1413',duration:1},'<')
})

// -----------------------------------------
// スライドショー
// -----------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    let splide = new Splide('.loop-splide', {
        type: 'loop',
        drag: 'free',
        focus: 'center',
        perPage: 3,
        autoScroll: {
            speed: 2,
        },
        arrows: false,
        pagination: false,
        autoplay: true,
        interval: 0,
        speed: 30000,
        easing: 'linear',
        waitForTransition: false,
        updateOnMove: true,
    });

    splide.mount();
});

// -----------------------------------------
// ローディング
// -----------------------------------------
(function () {
  /* 文字列を分割しspanで囲む */
  (function () {
    const jsText = document.querySelectorAll('.js-mv_title-item');
    jsText.forEach(target => {
      let newText = '';
      const text = target.textContent;
      const result = text.split('');
      for (let i = 0; i < result.length; i++) {
        newText += '<span>' + result[i] + '</span>';
      }
      target.innerHTML = newText;
    });
  })();

  /* MVアニメーション */
  (function () {
    /* 以下アニメーション */
    const jsLoaderBg = '.js-loader-bg'; // カーテン（黒い背景）
    const jsDot = '.js-loader-dot-wrap > span'; // ドット
    const jsBubble = '.js-mv-bubble [id*=item]'; // バブル（丸い図形）
    const jsText = '.js-mv_title-item span'; // メインビジュアルのタイトル
    const jsLeadText = '.js-mv_title-lead'; // メインビジュアルのリード文
    const jsHeader = '.js-header'; // ヘッダー
    
    //初期状態をセット
    gsap.set(
      [jsBubble, jsText, jsLeadText],
      //アニメーションさせない静止状態を指定する
      {
        opacity: 0,
        y: 30
      },
    );

    /* ドット */
    gsap.set(jsDot, {
      opacity: 0,
      y: -50
    });

    /* ヘッダー */
    gsap.set(jsHeader, {
      opacity: 0,
      y: -50
    });

    gsap.set(['.hoge', '.fuga', '.bar'], {
      opacity: 0
    });

    // timelineを作成
    const tl = gsap.timeline();

    tl.to(
      /* ドット */
      /* 0.8秒後に起動 */
      jsDot, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.8,
        stagger: {
          amount: 0.5,
          from: "start",
          ease: 'power4.inOut'
        }
      },
    ).to(
      /* ドット */
      jsDot, {
        opacity: 0
      }
    ).to(
      /* カーテン */
      jsLoaderBg, {
        y: '100%'
      },
      '+=0.5'
    ).to(jsBubble, {
      /* バブル */
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: {
        amount: 0.6,
        from: "start",
        ease: "sine.in"
      }
    }, '+=0.2').to(
      /* タイトル */
      jsText, {
        /* 前のアニメーションが完了する0.1秒前に実行 */
        opacity: 1,
        y: 0,
        stagger: {
          amount: 1,
          from: "start",
          ease: "sine.in"
        }
      },
      "-=0.1"
    ).to(
      /* リード文 */
      jsLeadText, {
        /* 前のアニメーションが完了する0.1秒前に実行 */
        opacity: 1,
        y: 0,
      },
      "-=0.2"
    ).to(
      /* ヘッダー */
      jsHeader, {
        opacity: 1,
        y: 0,
      },
      '<'
    );
  })();

})();

// -----------------------------------------
// hedder
// -----------------------------------------

const header = document.querySelector('.header');
const hamburger = document.getElementById("hamburger");
const background = document.querySelector(".header__background");
// const nav = document.querySelector('.header__nav');
const btn = document.getElementById("hamburger__btn");
const texts = document.querySelectorAll(".header__text");
const caption = document.querySelector(".hamburger__caption");
const elements = [header, hamburger, background];
const toggleTabIndex = (disable) => {
  const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]');
  focusableElements.forEach(el => {
      if (!hamburger.contains(el) && el !== btn && !el.classList.contains('header__text')) {
          el.tabIndex = disable ? -1 : 0;
      }
  });
};
btn.setAttribute("aria-expanded", "false");
btn.setAttribute("aria-controls", "hamburger");
btn.setAttribute("aria-label", "メニューを開く");

btn.addEventListener("click", () => {
    const active = hamburger.classList.contains('active');
    if(active) {
        elements.forEach(el => el.classList.remove('active'));
        caption.textContent = "メニュー";
        btn.setAttribute("aria-expanded", "false");
        btn.setAttribute("aria-label", "メニューを開く");
        toggleTabIndex(false);

        setTimeout(() => {
            // nav.classList.remove('active');
        }, 10);
    } else {
        elements.forEach(el => el.classList.add('active'));
        caption.textContent = "閉じる";
        btn.setAttribute("aria-expanded", "true");
        btn.setAttribute("aria-label", "メニューを閉じる");
        toggleTabIndex(true);
    }
});

texts.forEach(text => {
    text.addEventListener("click", () => {
        elements.forEach(el => el.classList.remove('active'));
        caption.textContent = "メニュー";
        btn.setAttribute("aria-expanded", "false");
        btn.setAttribute("aria-label", "メニューを開く");
        toggleTabIndex(false);
    });
});

background.addEventListener("click", () => {
  const active = hamburger.classList.contains('active');
  if(active) {
    elements.forEach(el => el.classList.remove('active'));
    caption.textContent = "メニュー";
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "メニューを開く");
    toggleTabIndex(false);
  } else {
    elements.forEach(el => el.classList.add('active'));
    caption.textContent = "閉じる";
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-label", "メニューを閉じる");
    toggleTabIndex(true);
  }
});

// -----------------------------------------
// js-scroll-fadeinup
// -----------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const targets = document.querySelectorAll(".js-scroll-fadeinup");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  targets.forEach((target) => {
    observer.observe(target);
  });
});