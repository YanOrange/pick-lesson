"use strict";

if (!window.dsListener) {
    window.dsListener = {};
}

(function (dsListener, $) {
    var _this = this;
    $.extend(dsListener, {
        // 用户浏览某页面事件监听
        viewListener: function (listName) {
            var channelNo = $('#channel_no').val(); // 渠道号，后台提前在页面隐藏域写好
            var userFinger = $('#ids').val(); // 用户唯一标识，当页面有后台提前写好的用户id隐藏域时(id是ids)则取该值，否则取浏览器唯一标识

            // 判断页面是否有用户id，有则取其值，没有则取浏览器唯一标识
            if (userFinger) {
                postData(userFinger, listName, channelNo) // 存库
            } else {
                Fingerprint2.get({}, function (components) {
                    var values = components.map(function (component) {
                        return component.value
                    });
                    userFinger = Fingerprint2.x64hash128(values.join(''), 31);
                    postData(userFinger, listName, channelNo) // 存库
                });
            }
        },
        // 用户浏览详情页监听：获取了当前商品id和来源活动的topic_id
        viewDetailListener: function () {
            var productId = dsTools.getQuery('id'); // 商品id
            var topicId = (dsTools.getUrlQuery(document.referrer, 'topic_id')) || ''; // 来源活动id
            var productName = $('.cake-info h1').text(); // 商品名称
            var brandName = $('#to_brand_list h3').text(); // 品牌名称
            var channelNo = '<?=$this->channel_no?>'; // 渠道号
            var userFinger = '<?=$this->user_id?>'; // 用户唯一标识

            if (userFinger) {
                postProductData(productId, topicId, productName, brandName, channelNo, userFinger)
            } else {
                Fingerprint2.get({}, function (components) {
                    var values = components.map(function (component) {
                        return component.value
                    });
                    userFinger = Fingerprint2.x64hash128(values.join(''), 31);
                    postProductData(productId, topicId, productName, brandName, channelNo, userFinger)
                });
            }

            postProductData(productId, topicId, productName, brandName)
        },
        // 模块点击统计
        tapListener: function (elName, elId) {
            var channelNo = $('#channel_no').val(); // 渠道号，后台提前在页面隐藏域写好
            var userFinger = $('#ids').val(); // 用户唯一标识，当页面有后台提前写好的用户id隐藏域时(id是ids)则取该值，否则取浏览器唯一标识
            // 判断页面是否有用户id，有则取其值，没有则取浏览器唯一标识
            if (userFinger) {
                postTapData(elName, elId, userFinger, channelNo) // 存库
            } else {
                Fingerprint2.get({}, function (components) {
                    var values = components.map(function (component) {
                        return component.value
                    });
                    userFinger = Fingerprint2.x64hash128(values.join(''), 31);
                    postTapData(elName, elId, userFinger, channelNo) // 存库
                });
            }
        }
    });

    // 浏览页面信息入库
    function postData(userFinger, listName, channelNo) {
        $.ajax({
            url: '/pvapi/pv/pv_index',
            type: 'POST',
            data: {
                userfinger: userFinger,
                list_name: listName,
                channel_no: channelNo
            }
        })

    }

    // 商品详情页浏览信息入库
    function postProductData(productId, topicId, productName, brandName, channelNo, userFinger) {
        $.ajax({
            url: '/pvapi/pv/product_index',
            type: 'POST',
            data: {
                product_id: productId,
                top_id: topicId,
                product_name: productName,
                brand_name: brandName,
                channel_no: channelNo,
                userfinger: userFinger
            }
        })

    }

    // 模块被点击次数信息入库
    function postTapData(elName, elId, userFinger, channelNo) {
        $.ajax({
            url: '/pvapi/pv/banner_index',
            type: 'POST',
            data: {
                el_name: elName,
                el_id: elId,
                userfinger: userFinger,
                channel_no: channelNo
            }
        })
    }
})(dsListener, Zepto);