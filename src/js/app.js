import * as globalFunctions from './modules/functions.js';
globalFunctions.isWebp();

import Vue from 'vue/dist/vue.js';
import $ from 'jquery';
import 'slick-carousel';
import ionRangeSlider from 'ion-rangeslider';
import mask from 'jquery-inputmask'

import MainContent from '../blocks/modules/content/content.js';

// $(function () {
//     let header = document.getElementById("quiz1");
//     let btns = header.getElementsByClassName("section_bl__label");
//     for (let i = 0; i < btns.length; i++) {
//       btns[i].addEventListener("click", function() {
//         let current = document.getElementsByClassName("isActive");
//         current[0].className = current[0].className.replace(" isActive", "");
//         this.className += " isActive";
//       });
//     };
// });
$(document).ready(function () {

    let slideEl = $('.review').find('.review__block');
    let slideBt = $('.review').find('.review__btn');
    slideBt.click(function () {
        $(this).parent().find('.review__btn').removeClass('isActive');
        $(this).addClass('isActive');
        $(this).parents('.review').find('.review__block').hide();
        $(this).parents('.review').find('.review__block').removeClass('isActive');
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
        mainContent: new MainContent('https://satepais.fvds.ru/local/ajax'),
        data: [{QUESTIONS: []}, {QUESTIONS: []}, {QUESTIONS: []}, {QUESTIONS: []}, {QUESTIONS: []}, {QUESTIONS: []}, {QUESTIONS: []}, {QUESTIONS: []}],
        selected: {
          STONE_CUT: {name: null, id: null, price: 0},
          STONE_STYLE: {name: null, id: null, price: 0},
          OWN_STONE_STYLE: {name: null, id: null, price: 0},
          STONE_FOOTBOARD: {name: null, id: null, price: 0},
          DIAMONDS_ON_SHINKO: {name: null, id: null, price: 0},
          MATERIAL: {name: null, id: null, price: 0},
          COLOR_OF_PAWS: {name: null, id: null, price: 0},
          TEXT: {name: null, id: null, price: 0},
          SIZE: {name: null, id: null, price: 0},
        },
        selectedStone: {
          name: null,
          id: null,
          PRICE: {
            PRICE: null,
            CURRENCY: null
          }
        },
        response: [],
        selectedFilter: {
          color: null,
          price1: 1000,
          price2: 500000,
          karat1: 0.1,
          karat2: 20,
        },
        limit: {
          value: 6,
          start: 0,
          end: 6,
          limit: true,
        },
        filter: {
          colors: ['D', 'E', 'G', 'H', 'I'],
          acc: {
            price: true,
            color: true,
            karat: true,
          },
          default: {
            price1: 1000,
            price2: 500000,
            color: 'D',
            karat1: 0.1,
            karat2: 20,
          },
          modalIsOpen: false
        },
        url: "https://satepais.fvds.ru",
        configuratorFormData: new FormData(),
        feedbackIsOpen: false,
        mediaURLs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        finalDataResponse: {
          message: null,
          hasError: null
        },
        modalFileName: null,
        screen: 'step_1'
      }
    },
    mounted() {
        this.getData()
        this.mainContent.init();
        this.selectedFilter.color = this.filter.default.color
        this.initRange()
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
        },
        getSelectedFilter() {
          return this.selectedFilter
        },
        getMediumPrice() {
          let res = 0
          for(var [key, value] of Object.entries(this.selected)) {
            res += +value.price
          }
          return res
        }
    },
    methods: {
      initRange() {
        const setRangeValue = (data, from, to) => {
          this.selectedFilter[from] = +data.from
          this.selectedFilter[to] = +data.to
        }
        if (this.screen === 'step_9') {
          $("#rangePrice").ionRangeSlider({
            type: "double",
            min: 1000,
            max: 500000,
            onChange: function (data) {
              setRangeValue(data, 'price1', 'price2')
            },
          });
          window.rangePriceInstance = $("#rangePrice").data("ionRangeSlider");

          window.rangeKaratInstance = $("#rangeKarat").ionRangeSlider({
            type: "double",
            min: 0.1,
            max: 20,
            step: 0.1,   
            onChange: function (data) {
              setRangeValue(data, 'karat1', 'karat2')
            },
          });
          window.rangeKaratInstance = $("#rangeKarat").data("ionRangeSlider");

          $(".modal__input[name='tel']").mask("+7(999)999-99-99",{placeholder:"+7(___)___-__-__"});
        }
      },
      async getData() {
        this.data = await this.mainContent.getData();
        this.setDefaultValues()
      },
      setSelectedData(key, id = null, name = null, price = 0, step, index) {
        if (!key) return;
        this.selected[key].id = id
        this.selected[key].name = name
        this.selected[key].price = price
        this.setMediaURL(step, index)
      },
      setMediaURL(step, index) {
        if (!(typeof +step === 'number' && typeof +index === 'number')) return;
        this.mediaURLs[step] = index
      },
      getMediaURL(step, type) {
        if (step === null) {
          if (type === 'image') {
            return this.url + '/upload/config/imgs/0.jpg'
          } else if (type === 'video') {
            return this.url + '/upload/config/video/0.mp4'
          } else if (type === 'html') {
            return this.url + '/local/quiz/soliter.html'
          }
        }
        if (type === 'image') {
          return this.url + '/upload/config/imgs/' + this.mediaURLs.slice(0, step + 1).join('_') + '.jpg'
        } else if (type === 'video') {
          return this.url + '/upload/config/video/' + this.mediaURLs.slice(0, step + 1).join('_') + '.mp4'
        } else if (type === 'html') {
          return this.url + '/local/quiz/soliter.html' // временно
          return this.url + '/upload/config/interact/' + this.mediaURLs.slice(0, step + 1).join('_') + '.html'
        } else if (type === 'final') {
          return this.url + '/upload/config/imgs/' + this.mediaURLs.slice(0, step + 1).join('_') + '.jpg'
        }
        return this.url + '/upload/config/imgs/0.jpg'
      },
      getPrice(prop) {
        if (prop.PRICE === undefined) return 0;
        const num = typeof parseInt(prop.PRICE.VALUE, 10) === 'number'
        return num ? prop.PRICE.VALUE : 0;
      },
      setDefaultValues() {
        this.data.forEach(i => {
          switch(i.NAME) {
            case "ВЫБОР ОГРАНКИ КАМНЯ":
              this.setSelectedData('STONE_CUT', i.QUESTIONS[0].ID, i.QUESTIONS[0].NAME, this.getPrice(i.QUESTIONS[0].PROPERIES))
              break;
            case "ВЫБОР СТИЛЯ":
              this.setSelectedData('STONE_STYLE', i.QUESTIONS[0].ID, i.QUESTIONS[0].NAME, this.getPrice(i.QUESTIONS[0].PROPERIES))
              break;
            case "ВНАЛИЧИЕ ПОДНОЖКИ":
              this.setSelectedData('STONE_FOOTBOARD', i.QUESTIONS[0].ID, i.QUESTIONS[0].NAME, this.getPrice(i.QUESTIONS[0].PROPERIES))
              break;
            case "НАЛИЧИЕ БРИЛЛИАНТОВ НА ШИНКЕ":
              this.setSelectedData('DIAMONDS_ON_SHINKO', i.QUESTIONS[0].ID, i.QUESTIONS[0].NAME, this.getPrice(i.QUESTIONS[0].PROPERIES))
              break;
            case "ВЫБЕРИТЕ МАТЕРИАЛ":
              this.setSelectedData('MATERIAL', i.QUESTIONS[0].ID, i.QUESTIONS[0].NAME, this.getPrice(i.QUESTIONS[0].PROPERIES))
              break;
            case "ЦВЕТ ЛАПОК НА КАМНЕ":
              this.setSelectedData('COLOR_OF_PAWS', i.QUESTIONS[0].ID, i.QUESTIONS[0].NAME, this.getPrice(i.QUESTIONS[0].PROPERIES))
              break;
            case "РАЗМЕР КОЛЬЦА":
              this.setSelectedData('SIZE', i.QUESTIONS[0].ID, i.QUESTIONS[0].NAME, this.getPrice(i.QUESTIONS[0].PROPERIES))
              break;
          }
        })
      },
      setOwnStyle(e) {
        if (e === null) {
          this.selected.OWN_STONE_STYLE.id = null
          this.selected.OWN_STONE_STYLE.name = null
          const question = this.data[1].QUESTIONS[0]
          this.setSelectedData('STONE_STYLE', question.ID, question.NAME, 1, 0)
          return;
        }
        if (e.target && e.target.value) {
          this.selected.STONE_STYLE.id = null
          this.selected.STONE_STYLE.name = null
          this.selected.OWN_STONE_STYLE.id = 'свой стиль'
          this.selected.OWN_STONE_STYLE.name = e.target.files[0]
        }
      },
      setModalFile(e) {
        if (e.target.value) {
          console.dir(e.target.files[0])
          this.modalFileName = e.target.files[0].name
          this.configuratorFormData.set('modalFile', e.target.files[0]);
        } else {
          this.modalFileName = null
          this.configuratorFormData.set('modalFile', null);
        }
      },
      async sendSelected() {
        for (let key in this.selected) {
          if (key === 'STONE_CUT') {
            this.configuratorFormData.set('shape', this.selected[key].name);
          } else {
            this.configuratorFormData.set(key, this.selected[key].name);
          }
        }
        this.configuratorFormData.set('start', this.limit.start);
        this.configuratorFormData.set('end', this.limit.end);
        this.configuratorFormData.set('price1', this.filter.default.price1);
        this.configuratorFormData.set('price2', this.selectedFilter.price2);
        this.configuratorFormData.set('color', this.selectedFilter.color);
        this.configuratorFormData.set('karat1', this.selectedFilter.karat1);
        this.configuratorFormData.set('karat2', this.selectedFilter.karat2);

        try {
          this.response = await this.mainContent.sendFormData(this.configuratorFormData)
        } catch (error) {
          console.error(error)
        }
        this.chooseScreen('step_9')
      },
      getPropFromProps(props, code) {
        if (!(props && props.length)) return {};
        const prop = props.find(i => i.CODE.toLowerCase() === code.toLowerCase());
        return prop ? prop : {};
      },
      filterHandler() {
        this.limit.start = 0;
        this.limit.end = 6;
        this.selectStone({id: null, name: null})
        this.sendFilter()
      },
      async sendFilter() {
        for (let key in this.selectedFilter) {
          this.configuratorFormData.set(key, this.selectedFilter[key]);
        }
        try {
          this.response = await this.mainContent.sendFormData(this.configuratorFormData)
          
        } catch (error) {
          console.error(error)
        }
      },
      async dowloadMore() {
        this.limit.start = this.limit.start + 6;
        this.limit.end = this.limit.end + 6;
        this.configuratorFormData.set('start', this.limit.start);
        this.configuratorFormData.set('end', this.limit.end);
        try {
          const additionData = await this.mainContent.sendFormData(this.configuratorFormData)
          this.response = [...this.response, ...additionData]
          if (additionData.length < this.limit.value) {
            this.limit.limit = false
          } else {
            this.limit.limit = true
          }
        } catch (error) {
          console.error(error)
        }
      },
      stoneSelected() {
        if (this.selectedStone.id && this.selectedStone.name) {
          this.chooseScreen('step_10')
        }
      },
      selectStone(obj) {
        if (obj === null) {
          this.selectedStone = {}
          return
        }
        this.selectedStone = {...obj}
        this.selectedStone.id = obj.ID
        this.selectedStone.name = obj.NAME
      },
      resetFilter() {
        this.selectedFilter.price1 = this.filter.default.price1;
        this.selectedFilter.price2 = this.filter.default.price2;
        this.selectedFilter.karat1 = this.filter.default.karat1;
        this.selectedFilter.karat2 = this.filter.default.karat2;
        this.selectedFilter.color = this.filter.default.color;
        window.rangePriceInstance.reset()
        window.rangeKaratInstance.reset()
      },
      async sendFinalFormData(e) {
        const modalFormData = new FormData(e.target)
        for(let pair of modalFormData.entries()) {
          this.configuratorFormData.append(pair[0], pair[1]);
        }
        this.configuratorFormData.set('selectedStone', JSON.stringify(this.selectedStone));
        this.finalDataResponse = await this.mainContent.sendStone(this.configuratorFormData)
        this.feedbackIsOpen = false
      },
      dropHandler(ev) {
        ev.preventDefault();
      
        if (ev.dataTransfer.items) {
          [...ev.dataTransfer.items].forEach((item, i) => {
            if (item.kind === 'file') {
              const file = item.getAsFile();
              this.configuratorFormData.set('modalFile', file);
            }
          });
        } 
      },
      chooseScreen(step) {
        if (!step) return;
        this.screen = step
      }
    },
    updated() {
      this.initRange()
    },
});