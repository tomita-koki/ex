// import SetNewsLabel from './news-label.js';

class SetNewsLabel {
    constructor(elm, options) {
        const defOptions = {
            selector: {
                item: ':scope > li',
                content: '.content',
                date: '.date'
            },
            cls: {
                label: 'new'
            },
            txt: {
                label: 'NEW'
            },
            patternDate: /^\d{4}\/\d{1,2}\/\d{1,2}$/,
            latest: 7
        };

        if (!elm) {
            return;
        }

        this.o = Object.assign(defOptions, options);

        this.ui = {
            root: elm,
            today: new Date()
        };

        this.init();
    }

    init() {
        const {o} = this;
        const {root} = this.ui;
        const items = root.querySelectorAll(o.selector.item);
        const contents = root.querySelectorAll(o.selector.content);

        if (!contents) {
            return;
        }

        items.forEach((item) => {
            this.setLabel(item);
        });
    }

    /**
     * setLabel - latest の日数以内であれば、 item にラベルを追加する
     * @param {HTMLElement} item - ラベルを追加する element
     * @return {void}
     */
    setLabel(item) {
        const {o} = this;
        const dateToday = new Date().getTime();
        const dateItem = this.getDateItem(item.querySelector(o.selector.date));
        const content = item.querySelector(o.selector.content);
        const datePast = dateToday - (o.latest * 86400000); // NEWを表示させる期日
        const label = $.ce('em', {
            class: o.cls.label
        }, o.txt.label);

        if (!dateItem || datePast > dateItem || dateItem > dateToday) {
            return;
        }

        // item content がリストであれば、そのそれぞれにラベルを追加する
        if (/^[uo]l$/.test(content.tagName.toLowerCase())) {
            content.children.forEach((elm) => {
                elm.insertBefore(label.cloneNode(true), elm.firstChild);
            });
        } else {
            content.insertBefore(label, content.firstChild);
        }
    }

    /**
     * getDateItem - テキストが YYYY/MM/DD の記法であれば date に変換して戻す
     * @param {HTMLElement} elmDate - テキストが記述された element
     * @return {number|null} - date の数値 or null
     */
    getDateItem(elmDate) {
        const {o} = this;
        let date = null;
        let strDate = '';

        if (!elmDate) {
            return date;
        }

        strDate = elmDate.textContent;

        if (o.patternDate.test(strDate)) {
            date = Number(new Date(strDate).getTime());
        }

        return date;
    }
}

const win = window;
const doc = win.document;


doc.querySelectorAll('.js-label-01').forEach((elm) => {
    new SetNewsLabel(elm, {
        selector: {
            item: '.js-label-01 > li',
            content: '.content',
            date: '.date'
        }
    });
});

console.log('testgfds');