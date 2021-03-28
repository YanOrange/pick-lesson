'use strict';

;
(function () {
    $(function () {
        // 数量加减
        $('#btn-reduce').on('click', function () {
            var val = $('#buyno').val();
            if (val <= 1) {
                val = 1;
            } else {
                val--;
            }
            $('#buyno').val(val);
        });
        $('#btn-add').on('click', function () {
            var val = $('#buyno').val();
            val++;
            $('#buyno').val(val);
        });

        // 立即购买
        $('.wrap').on('click', '#buy', function () {
            $('.pay-box').addClass('show');
            $('.wrap').append('<div id="pay-mask" class="pay-mask"></div>');
        }).on('click', '#close_paybox, #pay-mask', function () {
            $('.pay-box').removeClass('show');
            $('#pay-mask').remove();
        });
    });
})();
