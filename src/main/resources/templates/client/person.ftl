<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta id="viewport" name="viewport"
          content="width=device-width,height=device-height,initial-scale=1,user-scalable=no,viewport-fit=cover">
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="grey"/>
    <meta name="format-detection" content="telephone=no,address=no,email=no"/>
    <title>个人中心</title>
    <script>
        var deviceWidth = document.documentElement.clientWidth;
        // if (deviceWidth > 640) deviceWidth = 640;
        document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
    </script>
    <link rel="stylesheet" href="../css/common.css">
    <style>
        .push-nav {
            width: 95%;
            margin: 0 auto;
            position: fixed;
            /*height:1.3rem;*/
            left: 0;
            right: 0;
            background: #fff;
            box-shadow: 0 0px 12px rgb(0 0 0 / 25%);
            top: 0.2rem;
            z-index: 999;
            border-radius: 0.3rem;
            border: 1px solid #f9f9f9;
            padding: 0.35rem 0.3rem 0.2rem 0.3rem;
            box-sizing: border-box;
        }

        .push-title {
            padding-bottom: 0.1rem;
            font-size: 0.34rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .push-description {
            padding-top: 0.1rem;
            color: #b3b3b3;
        }
    </style>
</head>
<body>
<div class="wrap">
    <header class="global-header">
        <div class="center-area" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">个人中心</div>
    </header>
    <div onclick="location.href='/page/myFav'" style="margin-top: 1rem;width:100%;test-align:center;">我的收藏</div>
</div>
</body>
<script type="text/javascript" src="../js/jquery.js"></script>
<script type="text/javascript">

    $(function () {
        initType();
    })

    function initType() {
        $.ajax({
            url: '/type/getAll',
            dataType: 'json',
            success: function (res) {
                if (res.success) {
                    var data = res.data;
                    var html = '';
                    $.each(data, function (index, arr) {
                        html += '<li data-id="' + arr.id + '">' + arr.name + '</li>';
                    })
                    $('.newsClass').html(html);
                } else {
                    alert(res.msg)
                }
            }
        })
    }

    $('.newsClass').on('click', 'li', function () {
        var typeId = $(this).data('id');
        $.ajax({
            url: '/essay/findByType',
            data: {
                typeId: typeId
            },
            dataType: 'json',
            success: function (res) {
                if (res.success) {
                    var data = res.data;
                    var html = '';
                    $.each(data, function (index, arr) {
                        html += '<li data-id="' + arr.id + '">' + arr.title + '</li>';
                    })
                    $('#newsContent').html(html);
                } else {
                    alert(res.msg)
                }
            }
        })
    })


</script>
<script type="text/javascript">
    var websocket = null;

    //判断当前浏览器是否支持WebSocket, 主要此处要更换为自己的地址
    if ('WebSocket' in window) {
        websocket = new WebSocket("ws://localhost:8084/websocket/oneToMany");
    } else {
        alert('Not support websocket')
    }
    //连接发生错误的回调方法
    websocket.onerror = function () {
        // setMessageInnerHTML("error");
    };

    //连接成功建立的回调方法
    websocket.onopen = function (event) {
        //setMessageInnerHTML("open");
    }

    //接收到消息的回调方法
    websocket.onmessage = function (event) {
        setMessageInnerHTML(event.data);
    }

    //连接关闭的回调方法
    websocket.onclose = function () {
        setMessageInnerHTML("close");
    }

    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function () {
        websocket.close();
    }

    //将消息显示在网页上
    function setMessageInnerHTML(innerHTML) {
        var data = JSON.parse(innerHTML);
        var html = '';
        html += '<div class="push-nav">\n' +
            '    <a href="/page/findById?essayId=' + data.essayId + '">\n' +
            '        <div class="push-title">\n' +
            '            ' + data.text + '\n' +
            '        </div>\n' +
            '        <div class="push-description">\n' +
            '            点击查看详情\n' +
            '        </div>\n' +
            '    </a>\n' +
            '</div>';
        $('body').append(html);
        setTimeout(function () {
            $('.push-nav').remove();
        }, 5000);
    }


    //关闭连接
    function closeWebSocket() {
        websocket.close();
    }

    //发送消息
    function send(data) {
        websocket.send(data);
    }
</script>
</html>