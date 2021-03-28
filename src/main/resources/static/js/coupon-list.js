;
(function () {
    $(function () {
        // 点击“立即领取”
        $('.coupon-list').on('click', '.btn-info', function () {
            var _this = $(this);
            var text = _this.html();
            if (text === '立即领取') {
                $.dialog({
                    type: 'tips',
                    infoText: '领取成功',
                    autoClose: 1500
                });
                _this.html('立即使用');
            }
        });

        // 详细信息显隐
        $('.touch-area').on('click', function () {
            $(this).toggleClass('show');
            $(this).parents('.coupon').siblings('.explain').toggle();
        });
    });
})();
