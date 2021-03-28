'use strict';

;
(function () {
    $(function () {
        // 导航点击事件
        $('.nav-bar').on('click', '.nav-item', function () {
            var id = $(this).data('id');
            $(this).addClass('active').siblings('.nav-item').removeClass('active');
            $('#' + id).show().siblings('.channel-item').hide();
        });

        // 券码充值-券码输入框输入监听
        $('#code').on('keyup', function () {
            var _this = $(this);
            var val = _this.val();
            if (val) {
                $('#clearCode').show();
            } else {
                $('#clearCode').hide();
            }
        });

        // 券码充值-券码输入框右侧清空按钮事件
        $('#clearCode').on('click', function () {
            $(this).hide();
            $('#code').val('');
        });

        // 充值卡-卡列表点击
        $('.channel-3 .card-list li').on('click', function () {
            var _this = $(this);
            var total = _this.find('.rmb').find('span').html();
            $('#total').html(total);
        });

        var cardUnit = 0;  // 充值卡单价
        var cardNum = 0; // 充值卡数量
        var cardSum = 0; // 充值卡总计S

        // 充值卡-立即购买
        $('.channel-3').on('click', '#buy', function () {
            $('.pay-box').addClass('show');
            $('.channel-3').append('<div id="pay-mask" class="pay-mask"></div>');
            cardUnit = $('.card-list .card-item.active .rmb span').html();
            $('#unit').html('¥' + cardUnit);
            $('#sum').html('¥' + cardUnit);
        }).on('click', '#pay-mask, #close_paybox', function () {
            $('.pay-box').removeClass('show');
            $('#pay-mask').remove();
        });

        // 数量加减
        $('.num-group').on('click', '#reduceBtn', function () {
            cardNum = $('#num').val(); // 购买数量
            cardNum--;
            if (cardNum < 1) {
                cardNum = 1
            }
            cardSum = (cardUnit * cardNum).toFixed(2);
            $('#num').val(cardNum);
            $('#sum').html('¥' + cardSum);
        }).on('click', '#addBtn', function () {
            cardNum = $('#num').val();
            cardNum++;
            cardSum = (cardUnit * cardNum).toFixed(2);
            $('#num').val(cardNum);
            $('#sum').html('¥' + cardSum);
        });
    });
})();