'use strict';

if (!window.ds) {
    window.ds = {};
}

(function (ds, $) {
    $.extend(ds, {
        // banner轮播初始化
        copy_to_board: function (id) {
            var copy_obj = document.getElementById(id);
            var val = copy_obj.value;
            var len = val.length;

            // 兼容苹果，选中文字
            ds.select_text(copy_obj, 0, len);

            if (document.execCommand('copy', false, null)) {
                document.execCommand('copy', false, null); // 执行复制命令
                $.dialog({
                    type: 'tips',
                    contentHtml: '复制成功',
                    autoClose: 2000
                })
            } else {
                alert('不兼容')
            }
        },
        select_text: function (textbox, startIndex, endIndex) {
            if (textbox.createTextRange) {
                var range = textbox.createTextRange();
                range.collapse(true);
                range.moveStart('character', startIndex);
                range.moveEnd('character', endIndex - startIndex);
                range.select();
            } else {
                textbox.setSelectionRange(startIndex, endIndex);
                textbox.focus();
            }
        }
    });
})(ds, Zepto);
