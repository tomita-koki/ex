

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