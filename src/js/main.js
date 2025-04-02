

// -----------------------------------------
// もっと見るボタン
// -----------------------------------------
// const viewMore = (root) => {
//     let flag = false;
//     const viewMore = root;
//     const viewMoreItem = viewMore.querySelectorAll('.js-viewMore-item');
//     const btn = viewMore.querySelector('.js-viewMore-btn');
//     const btnText = viewMore.querySelector('.js-viewMore-btn-text');
//     const initialVisibleItems = 5;

//     if (!viewMoreItem.length || !btn || !btnText) {
//         return;
//     } else if (viewMoreItem.length < initialVisibleItems) {
//         btn.style.display = "none";
//         return;
//     }

//     // 初期表示以外の要素を非表示にする
//     for (let i = initialVisibleItems; i < viewMoreItem.length; i++) {
//         viewMoreItem[i].classList.add("hidden");
//     }

//     btn.addEventListener('click', () => {
//         if (flag) {
//             for (let i = initialVisibleItems; i < viewMoreItem.length; i++) {
//                 viewMoreItem[i].classList.add("hidden");
//             }
//             flag = false;
//             btnText.textContent = "もっと見る";
//         } else {
//             for (let i = initialVisibleItems; i < viewMoreItem.length; i++) {
//                 viewMoreItem[i].classList.remove("hidden");
//             }
//             flag = true;
//             btnText.textContent = "閉じる";
//         }
//         btn.classList.toggle('close');
//     });
// };

// (() => {
//     const roots = document.querySelectorAll(".js-viewMore");
//     for (let i = 0; i < roots.length; i++) {
//         viewMore(roots[i]);
//     }
// })();


// -----------------------------------------
// もっと見るボタン２
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


const kokiHeader = document.querySelector('.kokiHeader');
const nav = document.querySelector('.kokiHeader__nav');
const hamburger = document.getElementById("hamburger");
const btn = document.getElementById("hamburger__btn");
const main = document.querySelector(".background");
console.log(main);

btn.addEventListener("click", () => {
    const active = hamburger.classList.contains('active');
    if(active) {
        kokiHeader.classList.remove('active');
        hamburger.classList.remove('active');
        main.classList.remove('active');
        const alertmsg = function(){
            // nav.classList.remove('active');
          }
          setTimeout(alertmsg, 10);
    } else {
        kokiHeader.classList.add('active');
        hamburger.classList.add('active');
        main.classList.add('active');
    }
});



document.addEventListener("DOMContentLoaded", () => {
    setUpAccordion();
  });
  
  /**
   * ブラウザの標準機能(Web Animations API)を使ってアコーディオンのアニメーションを制御します
   */
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
  
  /**
   * アニメーションの時間とイージング
   */
  const animTiming = {
    duration: 400,
    easing: "ease-out"
  };
  
  /**
   * アコーディオンを閉じるときのキーフレーム
   */
  const closingAnimKeyframes = (content) => [
    {
      height: content.offsetHeight + 'px', // height: "auto"だとうまく計算されないため要素の高さを指定する
      opacity: 1,
    }, {
      height: 0,
      opacity: 0,
    }
  ];
  
  /**
   * アコーディオンを開くときのキーフレーム
   */
  const openingAnimKeyframes = (content) => [
    {
      height: 0,
      opacity: 0,
    }, {
      height: content.offsetHeight + 'px',
      opacity: 1,
    }
  ];


  window.addEventListener('DOMContentLoaded',function(){
    gsap.registerPlugin(ScrollTrigger); // ← これが必要！
    const tl = gsap.timeline({
        scrollTrigger:{
        trigger:'.circle',
        start:'top 70%',
    }});
    tl
    .fromTo('.message__content > *',{autoAlpha:0,y:20},{autoAlpha:1,y:0,stagger:.3})
    .fromTo('.gradient-circle-container',{rotate:'-120deg',x:'-50%',y:'-50%'},{duration:1.5,rotate:'0deg',x:'-50%',y:'-50%'},'<')
    .fromTo('.gradient-stroke-circle',{autoAlpha:0,'stroke-dasharray':'0 1413'},{autoAlpha:1,'stroke-dasharray':'1060 1413',duration:1},'<')
})