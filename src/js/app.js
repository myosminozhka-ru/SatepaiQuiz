import * as globalFunctions from './modules/functions.js';
globalFunctions.isWebp();

import Vue from 'vue/dist/vue.js';
import $ from 'jquery';
import 'slick-carousel';


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
    var slideEl = $('.review__block');
    var slideBt = $('.review__btn');
    slideBt.click(function () {
        slideBt.removeClass('isActive');
        slideBt.removeClass('isActive');
        $(this).addClass('isActive');
        slideEl.hide();
        slideEl.removeClass('isActive');
        $('.' + this.id).show();
        $('.' + this.id).addClass('isActive');
    });
    $('#review__block-2').one('click', function () {
        setTimeout(function() {
            $('.sl_js').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                dots: true,
                infinite: false
              });
        }, 100);
    })
});

window.app = new Vue({
    el: '#app',
    data: () => ({
        isMounted: false,
        sizes: {
            tablet: 1024,
            mobile: 768,
            window: window.innerWidth
        }
    }),
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
});