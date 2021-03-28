'use strict';

;
(function () {
    $(function () {
        // 导航点击事件
        $('.nav-bar').on('click', '.nav-item', function () {
            var nav_index = $(this).index();
            if (nav_index) {
                $('.nav2-show').addClass('show');
                $('.nav1-show').hide();
            } else {
                $('.nav1-show').show();
                $('.nav2-show').removeClass('show');
            }
            $('#tel, #pwd, #code').val('');
        });

        // input 右侧清空按钮显示控制
        $('.input-close input').on('keyup', function () {
            var _this = $(this);
            var val = _this.val();
            if (val) {
                _this.siblings('.icon-close-circle').show();
            } else {
                _this.siblings('.icon-close-circle').hide();
            }
        });

        // input 右侧清空按钮事件
        $('.input-close .icon-close-circle').on('click', function () {
            var _this = $(this);
            _this.siblings('input').val('');
            _this.hide();
        });

        // 获取验证码时手机号验证
        $('#getCode').on('click', function () {
            var tel = $('#tel').val();
            isEmpty(tel, '请输入手机号码');
            if (!dsTools.isTel(tel)) {
                $.dialog({
                    type: 'tips',
                    contentHtml: '请输入有效手机号码',
                    autoClose: 2000
                });
                return false;
            }
        });

        // 提交时数据验证
        $('#submit').on('click', function () {
            var type = $('.nav-bar .active').index();
            var tel = $('#tel').val();

            isEmpty(tel, '请输入手机号码');

            if (!dsTools.isTel(tel)) {
                $.dialog({
                    type: 'tips',
                    contentHtml: '请输入有效手机号码',
                    autoClose: 2000
                });
                return false;
            }

            if (type === 0) {
                var pwd = $('#pwd').val();
                isEmpty(pwd, '请输入密码');
            }
            if (type === 1) {
                var code = $('#code').val();
                isEmpty(code, '请输入验证码');
            }
        });

        // 字段是否为空判断
        function isEmpty(val, msg) {
            if (!val) {
                $.dialog({
                    type: 'tips',
                    contentHtml: msg,
                    autoClose: 2000
                });
                return false;
            }
        }
    });
})();