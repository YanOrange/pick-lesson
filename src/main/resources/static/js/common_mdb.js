'use strict';

if (!window.ds) {
    window.ds = {};
}

(function (ds, $) {
    /* 两级header时，向上滑动时隐藏一级header，向下滑动时显示一级header 功用相关参数 -->begin */
    var mainHeader = '',
        secondaryNavigation = '',

        // 仅当二级header低于main部分时才适用
        belowNavHeroContent = '',
        headerHeight = 0;
    // 滚动所需参数初始化
    var scrolling = false,
        previousTop = 0,
        currentTop = 0,
        scrollDelta = 10,
        scrollOffset = 150;
    /* 两级header时，向上滑动时隐藏一级header，向下滑动时显示一级header 功用相关参数 -->end */

    $.extend(ds, {
        // banner轮播初始化
        banner_swiper_init: function banner_swiper_init() {
            var bannerSwiper = new Swiper('#banner-swiper', {
                pagination: '.swiper-pagination',
                autoplayDisableOnInteraction: false,
                autoplay: 3000,
                loop: true
            });
        },

        // 导航轮播初始化
        nav_swiper_init: function nav_swiper_init() {
            var navSwiper = new Swiper('#top-nav', {
                freeMode: true,
                freeModeMomentumRatio: 0.5,
                slidesPerView: 'auto'
            });
            var swiperWidth = navSwiper.container[0].clientWidth;
            var maxTranslate = navSwiper.maxTranslate();
            var maxWidth = -maxTranslate + swiperWidth / 2;
            navSwiper.on('tap', function (swiper) {
                var slideCenter = void 0;
                var slide = swiper.slides[swiper.clickedIndex];
                if (slide) {
                    var slideLeft = slide.offsetLeft;
                    var slide_width = $(slide).find('.text').width();
                    $('.underline').css({
                        left: slideLeft,
                        width: slide_width
                    });
                    var slideWidth = slide.clientWidth;
                    slideCenter = slideLeft + slideWidth / 2;
                }
                // 被点击slide的中心点
                navSwiper.setWrapperTransition(300);
                if (slideCenter < swiperWidth / 2) {
                    navSwiper.setWrapperTranslate(0);
                } else if (slideCenter > maxWidth) {
                    navSwiper.setWrapperTranslate(maxTranslate);
                } else {
                    var nowTlanslate = slideCenter - swiperWidth / 2;
                    navSwiper.setWrapperTranslate(-nowTlanslate);
                }
                $("#top-nav  .active").removeClass('active');
                $("#top-nav .swiper-slide").eq(swiper.clickedIndex).addClass('active');
            });
        },

        // 点击添加active
        click_active_init: function click_active_init() {
            $('.click-active-list').on('click', 'li', function () {
                $(this).addClass('active').siblings('li').removeClass('active');
            });
        },

        /* 两级header时，向上滑动时隐藏一级header，向下滑动时显示一级header -->begin */
        header_auto_hide: function header_auto_hide() {
            mainHeader = $('.search-header');
            secondaryNavigation = $('.top-nav');
            // 仅当二级header低于main部分时才适用
            belowNavHeroContent = $('.main-content');
            headerHeight = mainHeader.height();

            mainHeader.on('click', '.nav-trigger', function (event) {
                // open primary navigation on mobile
                event.preventDefault();
                mainHeader.toggleClass('nav-open');
            });

            $(window).on('scroll', function () {
                if (!scrolling) {
                    scrolling = true;
                    !window.requestAnimationFrame ? setTimeout(ds.autoHideHeader, 250) : requestAnimationFrame(ds.autoHideHeader);
                }
            });

            $(window).on('resize', function () {
                headerHeight = mainHeader.height();
            });
        },
        autoHideHeader: function autoHideHeader() {
            currentTop = $(window).scrollTop();

            belowNavHeroContent.length > 0 ? ds.checkStickyNavigation(currentTop) // secondary navigation below intro
                : ds.checkSimpleNavigation(currentTop);

            previousTop = currentTop;
            scrolling = false;
        },
        checkSimpleNavigation: function checkSimpleNavigation(currentTop) {
            //there's no secondary nav or secondary nav is below primary nav
            if (previousTop - currentTop > scrollDelta) {
                //if scrolling up...
                mainHeader.removeClass('is-hidden');
            } else if (currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
                //if scrolling down...
                mainHeader.addClass('is-hidden');
            }
        },
        checkStickyNavigation: function checkStickyNavigation(currentTop) {
            //secondary nav below intro section - sticky secondary nav
            var secondaryNavOffsetTop = belowNavHeroContent.offset().top - secondaryNavigation.height() - mainHeader.height();

            if (previousTop >= currentTop) {
                //if scrolling up...
                if (currentTop < secondaryNavOffsetTop) {
                    //secondary nav is not fixed
                    mainHeader.removeClass('is-hidden');
                    secondaryNavigation.removeClass('fixed slide-up');
                    belowNavHeroContent.removeClass('secondary-nav-fixed');
                } else if (previousTop - currentTop > scrollDelta) {
                    //secondary nav is fixed
                    mainHeader.removeClass('is-hidden');
                    secondaryNavigation.removeClass('slide-up').addClass('fixed');
                    belowNavHeroContent.addClass('secondary-nav-fixed');
                }
            } else {
                //if scrolling down...
                if (currentTop > secondaryNavOffsetTop + scrollOffset) {
                    //hide primary nav
                    mainHeader.addClass('is-hidden');
                    secondaryNavigation.addClass('fixed slide-up');
                    belowNavHeroContent.addClass('secondary-nav-fixed');
                } else if (currentTop > secondaryNavOffsetTop) {
                    //once the secondary nav is fixed, do not hide primary nav if you haven't scrolled more than scrollOffset
                    mainHeader.removeClass('is-hidden');
                    secondaryNavigation.addClass('fixed').removeClass('slide-up');
                    belowNavHeroContent.addClass('secondary-nav-fixed');
                }
            }
        }
        /* 两级header时，向上滑动时隐藏一级header，向下滑动时显示一级header -->end */
    });

    // 图片懒加载
    $("img.lazy").lazyload();
    // 点击添加active
    ds.click_active_init();
})(ds, Zepto);
