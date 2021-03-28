'use strict';

;
(function () {
    $(function () {
        // banner轮播初始化
        ds.banner_swiper_init();

        // 精选商家滑动初始化
        var brands_swiper = new Swiper('#brands-swiper', {
            freeMode: true,
            slidesPerView: 'auto'
        });

        // 限时抢滑动初始化
        var limit_swiper = new Swiper('#limit-swiper', {
            freeMode: true,
            slidesPerView: 'auto'
        });

        // 专题轮播初始化
        var topic_swiper = new Swiper('#topic-swiper', {
            slidesPerView: 'auto',
            spaceBetween: 8
        });

        // 实现限时抢购的时间
        function setTime() {
            var nowTime = new Date().getTime() + localServerInterval;
            var timeLeft = endTime - nowTime;
            if (timeLeft < 0 || isNaN(timeLeft)) {
                timeLeft = 0;
                // setTimeout('reset_buy_limit()', 2000);
                return;
            }
            // let dd = parseInt(timeLeft / 1000 / 60 / 60 / 24, 10);//计算剩余的天数
            var hh = parseInt(timeLeft / 1000 / 60 / 60 % 24, 10); //计算剩余的小时数
            var mm = parseInt(timeLeft / 1000 / 60 % 60, 10); //计算剩余的分钟数
            var ss = parseInt(timeLeft / 1000 % 60, 10); //计算剩余的秒数
            hh = checkTime(hh);
            mm = checkTime(mm);
            ss = checkTime(ss);
            $("#endHour").html(hh);
            $("#endMinute").html(mm);
            $("#endSecond").html(ss);
        };
        // 小于10前面加0
        var checkTime = function checkTime(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        };

        /* 设置限时抢倒计时 begin */
        var endTime = $('#leftSecond').data('leftsecond'); // 存储结束时间
        var localServerInterval = 1533611525000 - new Date().getTime(); // 服务器和本地时间差
        setTime();
        setInterval(function () {
            setTime();
        }, 1000);
        /* 设置限时抢倒计时 end */
    });
})();
