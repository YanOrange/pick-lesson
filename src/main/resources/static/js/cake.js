'use strict';

;
(function () {
    $(function () {
        // banner轮播初始化
        banner_init();
    });

    function banner_init() {
        var slide_len = $('.swiper-wrapper .swiper-slide').length;
        return new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            loop: true,
            autoplay: 3000,
            autoplayDisableOnInteraction: false, // 滑动后继续轮播
            paginationBulletRender: function (swiper, index, className) {
                return '<span class="' + className + '">' + (index + 1) + '/' + slide_len + '</span>';
            }
        })
    }
})();
