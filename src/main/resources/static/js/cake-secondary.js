'use strict';

;
(function () {
    $(function () {
        // banner轮播初始化
        ds.banner_swiper_init();

        // 导航轮播初始化
        ds.nav_swiper_init();

        // header自动显隐
        // ds.header_auto_hide();

        // 品牌街初始化
        var brandSwiper = new Swiper('#brand-swiper', {
            freeMode: true,
            slidesPerView: 'auto'
        });
    });
})();
