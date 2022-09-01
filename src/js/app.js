import * as globalFunctions from './modules/functions.js';
globalFunctions.isWebp();

import Vue from 'vue/dist/vue.js';
import $ from 'jquery';
import 'slick-carousel';

import MainContent from '../blocks/modules/content/content.js';

// $(function () {
//     var header = document.getElementById("quiz1");
//     var btns = header.getElementsByClassName("section_bl__label");
//     for (var i = 0; i < btns.length; i++) {
//       btns[i].addEventListener("click", function() {
//         var current = document.getElementsByClassName("isActive");
//         current[0].className = current[0].className.replace(" isActive", "");
//         this.className += " isActive";
//       });
//     };
// });
$(document).ready(function () {

    var slideEl = $('.review').find('.review__block');
    var slideBt = $('.review').find('.review__btn');
    slideBt.click(function () {
        $(this).parent().find('.review__btn').removeClass('isActive');
        $(this).addClass('isActive');
        $(this).parents('.review').find('.review__block').hide();
        $(this).parents('.review').find('.review__block').removeClass('isActive');
        console.log(this.id)
        $(this).parents('.review').find($('.' + this.id)).show();
        $(this).parents('.review').find($('.' + this.id)).addClass('isActive');
    });
    $('.review__tabs ul li:nth-child(2)').one('click', function () {
        setTimeout(function() {
            $('.sl_js').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                dots: true,
                infinite: false
              });
        }, 100);
    });
});
$(function () {
    $('.review__close').on('click', function () {
        $(this).toggleClass('isActive');
        $('.review__tabs').toggleClass('isActive');
        $('.review__btn').toggleClass('isOpened');
    });
    $(document).on('click', function(e){
        if( $(e.target).closest('.review__close').length)
        return
        
        $(this).removeClass('isActive');
        $('.review__tabs').removeClass('isActive');
        $('.review__btn').removeClass('isOpened');
    });

    $('.section_bl__title').on('click', function () {
        $(this).toggleClass('isActive');
        $(this).parents('.section_bl__l-side').find('.section_bl__form').toggleClass('isHide');
        $(this).parents('.section_bl__l-side').find('.section_bl__list').toggleClass('isHide');
    })
})

window.app = new Vue({
    el: '#app',
    data() {
      return {
        isMounted: false,
        sizes: {
            tablet: 1024,
            mobile: 768,
            window: window.innerWidth
        },
        mainContent: new MainContent(),
        data: [{QUESTIONS: []}, {QUESTIONS: []}, {QUESTIONS: []}, {QUESTIONS: []}, {QUESTIONS: []}, {QUESTIONS: []}, {QUESTIONS: []}, {QUESTIONS: []}],
        selected: {
          STONE_CUT: {name: null, id: null},
          STONE_STYLE: {name: null, id: null},
          OWN_STONE_STYLE: {name: null, id: null},
          STONE_FOOTBOARD: {name: null, id: null},
          DIAMONDS_ON_SHINKO: {name: null, id: null},
          MATERIAL: {name: null, id: null},
          COLOR_OF_PAWS: {name: null, id: null},
          TEXT: {name: null, id: null},
          SIZE: {name: null, id: null},
        },
        url: "http://satepais.fvds.ru",
      }
    },
    mounted() {
        this.getData()
        this.mainContent.init();
    },
    beforeCreate() {        
        window.addEventListener('resize', () => {
            this.sizes.window = window.innerWidth;
        });
    },
    beforeMount() {
        this.isMounted = true;
    },
    computed: {
        isMobile: function () {
            return this.sizes.window < this.sizes.mobile;
        },
        isTablet: function () {
            return this.sizes.window < this.sizes.tablet && this.sizes.window > this.sizes.mobile;
        }
    },
    methods: {
      async getData() {
        this.data = await this.mainContent.getData();
        this.setDefaultValues()
      },
      setSelectedData(key, id = null, name = null) {
        if (!key) return;
        this.selected[key].id = id
        this.selected[key].name = name
      },
      setDefaultValues() {
        this.data.forEach(i => {
          switch(i.NAME) {
            case "ВЫБОР ОГРАНКИ КАМНЯ":
              this.setSelectedData('STONE_CUT', i.QUESTIONS[0].ID, i.QUESTIONS[0].NAME)
              break;
            case "ВЫБОР СТИЛЯ":
              this.setSelectedData('STONE_STYLE', i.QUESTIONS[0].ID, i.QUESTIONS[0].NAME)
              break;
            case "ВНАЛИЧИЕ ПОДНОЖКИ":
              this.setSelectedData('STONE_FOOTBOARD', i.QUESTIONS[0].ID, i.QUESTIONS[0].NAME)
              break;
            case "НАЛИЧИЕ БРИЛЛИАНТОВ НА ШИНКЕ":
              this.setSelectedData('DIAMONDS_ON_SHINKO', i.QUESTIONS[0].ID, i.QUESTIONS[0].NAME)
              break;
            case "ВЫБЕРИТЕ МАТЕРИАЛ":
              this.setSelectedData('MATERIAL', i.QUESTIONS[0].ID, i.QUESTIONS[0].NAME)
              break;
            case "ЦВЕТ ЛАПОК НА КАМНЕ":
              this.setSelectedData('COLOR_OF_PAWS', i.QUESTIONS[0].ID, i.QUESTIONS[0].NAME)
              break;
            case "РАЗМЕР КОЛЬЦА":
              this.setSelectedData('SIZE', i.QUESTIONS[0].ID, i.QUESTIONS[0].NAME)
              break;
          }
        })
      },
      setOwnStyle(e) {
        if (e.target.value) {
          console.dir(e.target.value)
          console.dir(e.target.files[0])
          this.selected.STONE_STYLE.id = null
          this.selected.STONE_STYLE.name = null
          this.selected.OWN_STONE_STYLE.id = e.target.files[0]
          this.selected.OWN_STONE_STYLE.name = 'свой стиль'
        } else {
          this.selected.OWN_STONE_STYLE.id = null
          this.selected.OWN_STONE_STYLE.name = null
        }
      },
      async sendSelected() {
        console.log(this.selected)
        const formData = new FormData()
        for (let key in this.selected) {
          if (key === 'TEXT') {
            formData.set(key, this.selected[key].name);
          } else {
            formData.set(key, this.selected[key].id);
          }
        }
        const res = await this.mainContent.sendFormData(formData)
        console.log(res)
        this.mainContent.chooseScreen('step_9')
      }
    }
});