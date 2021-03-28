'use strict';

;
(function () {
    $(function () {
        $('.additional-bar').on('click', function () {
            var _this = $(this),
                list = _this.siblings('.additional-list');
            if (_this.hasClass('open')) {
                _this.removeClass('open');
                list.hide();
            } else {
                _this.addClass('open');
                list.show();
            }
        });
        // 全选按钮
        $('#all-checkbox').on('click', function () {
            if ($(this).prop('checked')) {
                $('.checkbox').prop('checked', true);
            } else {
                $('.checkbox').prop('checked', false);
            }
        });
        // 品牌按钮
        $('.lead-checkbox').on('click', function () {
            var _this = $(this),
                _thisParent = _this.parents('.dl');
            if (_this.prop('checked')) {
                _thisParent.find('.checkbox').prop('checked', true);
            } else {
                _thisParent.find('.checkbox').prop('checked', false);
            }
        });
        // 除全选外的所有按钮
        $('.checkbox').on('click', function () {
            var _thisParent = $(this).parents('.dl');
            if (_thisParent.find('.item-checkbox').length === _thisParent.find('.item-checkbox:checked').length) {
                _thisParent.find('.lead-checkbox').prop('checked', true);
            } else {
                _thisParent.find('.lead-checkbox').prop('checked', false);
            }
            if ($('.checkbox').length === $('.checkbox:checked').length) {
                $('#all-checkbox').prop('checked', true);
            } else {
                $('#all-checkbox').prop('checked', false);
            }
        });
        // 所有
        $('input[type="checkbox"]').on('click', function () {
            set_sum();
        });
        // 数量加减
        $('.ctrl-group').on('click', '.btn-reduce', function () {
            var _this = $(this);
            var num = _this.siblings('input').val();
            if (num > 1) {
                num--;
            } else {
                num = 1;
            }
            _this.siblings('input').val(num);

            set_sum();
        }).on('click', '.btn-add', function () {
            var _this = $(this);
            var num = _this.siblings('input').val();
            num++;
            _this.siblings('input').val(num);

            set_sum();
        });

        var edit_flag = true;
        $('#cart-edit').on('click', function () {
            if (edit_flag) {
                $(this).text('完成');
                $('.fixed-footer .cal-box').hide();
                $('.fixed-footer .del-box').show();
            } else {
                $(this).text('编辑')
                $('.fixed-footer .cal-box').show();
                $('.fixed-footer .del-box').hide();
            }
            edit_flag = !edit_flag;
        });

        // 计算总计并设置底部bar值
        function set_sum() {
            var sum = 0, // 总计
                c_sum = 0, // 商品总计
                a_sum = 0; // 配件总计
            $('.item-checkbox:checked').each(function () {
                var _thisParent = $(this).parents('.dd');
                c_sum += parseFloat(_thisParent.find('.c-price').text()).toFixed(2) * parseInt(_thisParent.find('.c-no').val());
                _thisParent.find('.additional-item').each(function () {
                    var _this = $(this);
                    a_sum += parseFloat(_this.find('.a-price').text()).toFixed(2) * parseInt(_this.find('.a-no').val());
                });
            });
            sum += c_sum + a_sum;

            $('#sum').text(sum.toFixed(2));
        }
    });
})();
