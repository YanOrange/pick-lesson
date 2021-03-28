'use strict';

;
(function () {
    $(function () {
        var isOPen = true; // 密码框是否明文显示

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

        // 密码框明文显示控制
        $('.icon-eye-close, .icon-eye-open').on('click', function () {
            $(this).hide().siblings('i').show();
            if (isOPen) {
                $('#pwd').attr('type', 'text');
            } else {
                $('#pwd').attr('type', 'password');
            }
            isOPen = !isOPen;
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

            // 手机号空验证
            var tel = $('#tel').val();
            isEmpty(tel, '请输入手机号码');

            // 手机号有效性验证
            if (!dsTools.isTel(tel)) {
                $.dialog({
                    type: 'tips',
                    contentHtml: '请输入有效手机号码',
                    autoClose: 2000
                });
                return false;
            }

            // 验证码空验证
            if (type === 1) {
                var code = $('#code').val();
                isEmpty(code, '请输入验证码');
            }

            // 密码空验证
            if (type === 0) {
                var pwd = $('#pwd').val();
                isEmpty(pwd, '请输入密码');
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