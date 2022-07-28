import * as globalFunctions from './modules/functions.js';
globalFunctions.isWebp();

import Vue from 'vue/dist/vue.js';
import $ from 'jquery';
import 'slick-carousel';

import MainContent from '../blocks/modules/content/content.js';

$(function () {
    var header = document.getElementById("quiz1");
    var btns = header.getElementsByClassName("section_bl__label");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("isActive");
        current[0].className = current[0].className.replace(" isActive", "");
        this.className += " isActive";
      });
    };
});
$(document).ready(function () {
    var slideEl = $('.review').find('.review__block');
    var slideBt = $('.review').find('.review__btn');
    slideBt.click(function () {
        slideBt.removeClass('isActive');
        slideBt.removeClass('isActive');
        $(this).addClass('isActive');
        slideEl.hide();
        slideEl.removeClass('isActive');
        $('.' + this.id).show();
        $('.' + this.id).addClass('isActive');
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
    data: () => ({
        isMounted: false,
        sizes: {
            tablet: 1024,
            mobile: 768,
            window: window.innerWidth
        },
        mainContent: new MainContent()
    }),
    mounted() {
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
    }
});