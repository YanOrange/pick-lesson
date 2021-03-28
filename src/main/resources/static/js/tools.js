"use strict";

if (!window.dsTools) {
    window.dsTools = {};
}

(function (dsTools, $) {
    var _this = this;

    $.extend(dsTools, {
        // 获取地址栏参数
        // 示例： 地址栏为 http://localhost/a.html?b=1&c=2
        // getQuery('b'); // 输出1
        getQuery: function getQuery(name) {
            var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
            var matcher = pattern.exec(window.location.search);
            var items = null;
            if (matcher) {
                items = decodeURIComponent(matcher[1]);
            }
            return items;
        },
        // 根据传入的地址获取地址栏参数
        // 示例： 地址栏为 http://localhost/a.html?b=1&c=2
        // getQuery('b'); // 输出1
        getUrlQuery: function getUrlQuery(url, name) {
            var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
            var urlArr = url.split('?');
            if (urlArr.length > 1) {
                var matcher = pattern.exec('?' + urlArr[1]);
                var items = null;
                if (matcher) {
                    items = decodeURIComponent(matcher[1]);
                }
                return items;
            } else {
                return null;
            }
        },
        // 日期格式化
        dateFormat: function dateFormat(date, format) {
            var self = _this;
            //判断时间是否毫秒，秒则*1000
            if (date < 10000000000) {
                date = date.getTime ? date * 1000 : new Date(date * 1000);
            } else {
                date = date.getTime ? date : new Date(date);
            }
            var _date = "",
                now = new Date();
            if (format) {
                var o = {
                    "M+": date.getMonth() + 1, //month
                    "d+": date.getDate(), //day
                    "h+": date.getHours(), //hour
                    "m+": date.getMinutes(), //minute
                    "s+": date.getSeconds(), //second
                    //quarter
                    "q+": Math.floor((date.getMonth() + 3) / 3),
                    "S": date.getMilliseconds() //millisecond
                };
                if (/(y+)/.test(format)) {
                    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                }
                for (var k in o) {
                    if (new RegExp("(" + k + ")").test(format)) {
                        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                    }
                }
                _date = format;
            } else {
                // +1000, 用来忽略掉小于1秒的情况
                var differ = (now - date + 1000) / 1000;
                if (differ < 0) {
                    return self.dateFormat(date, now.getFullYear() === date.getFullYear() ? 'MM-dd hh:mm' : 'yyyy-MM-dd hh:mm');
                }
                if (differ < 60) {
                    _date = parseInt(differ, 10) + '秒前';
                } else if (differ < 60 * 60) {
                    _date = parseInt(differ / 60, 10) + '分钟前';
                } else {
                    var formater = void 0;
                    if (differ < 24 * 60 * 60 && now.getDate() === date.getDate()) {
                        formater = '今天 hh:mm';
                    } else {
                        formater = now.getFullYear() === date.getFullYear() ? 'MM-dd hh:mm' : 'yyyy-MM-dd hh:mm';
                    }
                    _date = self.dateFormat(date, formater);
                }
            }
            return _date;
        },
        // 手机号校验
        isTel: function (num) {
            return (/^1[3456789]\d{9}$/.test(num));
        }
    });
})(dsTools, Zepto);
