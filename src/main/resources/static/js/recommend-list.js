'use strict';

;
(function () {
    $(function () {
        var nav_top = $('.nav-bar').offset().top;
        var global_header_hieght = $('.global-header').height();
        var dom_dis = nav_top - global_header_hieght;
        $(window).on('scroll', function () {
            var scroll_top = $(window).scrollTop();
            if (dom_dis < scroll_top) {
                $('.nav-bar').addClass('fixed');
                $('body').css('padding-top', '1.69rem');
            } else {
                $('.nav-bar').removeClass('fixed');
                $('body').css('padding-top', '.79rem');
            }
        });
    });
})();
