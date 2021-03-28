(function () {
    $.MsgBox = {
        Alert: function (msg, tit, ok, callback) {
            GenerateHtml("alert", msg, tit, ok, '', '', '');
            btnOk("alert", callback); //alert只是弹出消息，因此没必要用到回调函数callback
            btnNo(callback);
            document.ontouchmove = function () {
                return false;
            };
        },
        Confirm: function (msg, tit, ok, no, callback) {
            GenerateHtml("confirm", msg, tit, ok, no, '', '');
            btnOk("confirm", callback);
            btnNo(callback);
            document.ontouchmove = function () {
                return false;
            };
        },
        Prompt: function (msg, ok, no, inputmsg, lastmsg, callback) {
            GenerateHtml("prompt", msg, '', ok, no, inputmsg, lastmsg);
            btnOk("prompt", callback);
            btnNo(callback);
            document.ontouchmove = function () {
                return false;
            };
        },
        Notice: function (callback) {
            var div;
            div = ['<div id="noticeBox" class="shade"><div id="noticeContent"><span id="close">&times;</span><img id="noticeImg" src="../images/WDTZ.jpg" style="width:100%;height:100%;"><div class="noticeText"><div style="text-indent:0;">尊敬的浦发银行贵宾客户：</div><div style="text-indent:2em;">您好，因春节期间国家法定节假日，故2018年2月6日-2018年3月2日止，盛大汽车服务网点部分暂时休业。期间将无法提供服务，过程中如有疑问请致电<a href="tel:4008801768">4008001768-3</a>进行咨询，对此给您带来的不便，还请谅解。感谢。</div><div style="text-align:right;">上海盛世大联汽车服务有限公司</div><div style="text-align:right;">2018年2月5日</div></div></div></div>'].join("");
            var now = new Date();
            var endTime = new Date('2018/03/02 23:59:59');
            if (now <= endTime) {
                $("body").append(div);
                document.ontouchmove = function () {
                    return false;
                };
                $("#noticeImg").get(0).onload = function () {
                    NoticeCss();
                    btnClose(callback);
                };
                $("#noticeImg").get(0).onerror = function () {
                    $("#noticeBox").remove();
                }
            }
        }
    };
    //Html
    var GenerateHtml = function (type, msg, tit, ok, no, inputmsg, lastmsg) {

        var _html = "";
        _html += '<div id="mb_box"></div><div id="mb_con">';
        if (type == "prompt") {
            _html += '<div id="mb_msg_prompt">' + msg + '</div><div id="mb_input"><input type="text" id="myinput" placeholder=' + inputmsg + ' />' + lastmsg + '</div><div id="mb_btnbox">';
        } else {
            var tit = tit ? tit : '';
            _html += '<div id="mb_title">' + tit + '</div><div id="mb_msg"><p>' + msg + '</p></div><div id="mb_btnbox">';
        }
        var okText = ok ? ok : '确定';
        var noText = no ? no : '取消';
        if (type == "alert") {
            _html += '<div id="mb_btn_ok1">' + okText + '</div>';
        }
        if (type == "confirm" || type == "prompt") {
            _html += '<div id="mb_btn_ok2">' + okText + '</div>';
            _html += '<div id="mb_btn_no">' + noText + '</div>';
            _html += '<div class="clearfix"></div>';
        }
        _html += '</div></div>';

        $("body").append(_html);
        GenerateCss();
    };
    //notice  css
    var NoticeCss = function () {
        $(".shade").css({
            position: 'fixed',
            top: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            width: '100%',
            height: '100%',
            zIndex: 999999
        });
        $(".noticeText").css({
            position: 'absolute',
            top: '40%',
            left: 0,
            right: 0,
            width: '100%',
            padding: '0 25px',
            textIndent: '2em',
            fontSize: '1.4rem',
            lineHeight: '1.6',
            wordBreak: 'break-all'
        });
        $("#noticeContent").css({
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            maxWidth: '90%',
            maxHeight: '90%',
            transform: 'translate(0, -50% )',
            margin: '0 auto'
        });
        $("#close").css({
            position: 'absolute',
            top: 2,
            left: 10,
            fontSize: '20px',
            cursor: 'pointer'
        });
        $("#noticeMsg").css({
            position: 'absolute',
            width: '100%',
            bottom: 15,
            //right: 10,
            textAlign: 'center',
            fontSize: '14px',
            cursor: 'pointer'
        });
    }
    //Css
    var GenerateCss = function () {

        $("#mb_box").css({
            width: '100%',
            height: '100%',
            zIndex: '99999',
            position: 'fixed',
            filter: 'Alpha(opacity=60)',
            backgroundColor: 'black',
            top: '0',
            left: '0',
            opacity: '0.6'
        });

        $("#mb_con").css({
            zIndex: '999999',
            minWidth: '241px',
            maxWidth: '300px',
            //              height: '122px',
            position: 'fixed',
            backgroundColor: '#f7f7f7',
            borderRadius: '15px'
        });
        $("#mb_title").css({
            textAlign: 'center',
            fontSize: '18px',
            padding: '20px 0 0',
            color: '#3F4246',
            marginBottom: '-15px'
        });
        $("#mb_msg").css({
            padding: '30px',
            lineHeight: '20px',
            textAlign: 'center',
            letterSpacing: '1px',
            fontFamily: '"微软雅黑"',
            fontSize: '16px',
            borderBottom: '1px solid #e8e7e7',
            color: '#63666B'
        });
        $("#mb_msg p").css({
            wordBreak: 'break-all',
            textAlign: 'left',
            marginBottom: 0,
            display: 'inline-block'
        });
        $("#mb_msg_prompt").css({
            padding: '10px 0px',
            lineHeight: '20px',
            textAlign: 'center',
            letterSpacing: '2px',
            fontFamily: '"微软雅黑"',
            fontSize: '16px',
            color: '#3a3a48'
        });

        $("#mb_input").css({
            padding: '4px 0px 16px',
            lineHeight: '20px',
            textAlign: 'center',
            letterSpacing: '2px',
            fontFamily: '"微软雅黑"',
            borderBottom: '1px solid #e8e7e7',
            color: '#3a3a48'
        });

        $("#mb_input input").css({
            width: '110px',
            marginRight: '10px',
            padding: '3px'
        });

        $("#mb_btnbox").css({
            lineHeight: '50px',
            textAlign: 'center'
        });
        $("#mb_btn_ok1,#mb_btn_no,#mb_btn_ok2").css({
            color: '#0271C3',
            fontSize: '16px',
            letterSpacing: '2px'
        });
        $(".clearfix").css({
            clear: 'both'
        });
        $("#mb_btn_ok2").css({
            float: 'right',
            width: '50%'
        });
        $("#mb_btn_no").css({
            color: '#a2a0a0',
            float: 'left',
            width: '50%',
            borderRight: '1px solid #e8e7e7'
        });

        var _width = document.documentElement.clientWidth; //屏幕宽
        var _height = document.documentElement.clientHeight; //屏幕高
        var boxWidth = $("#mb_con").width();
        var boxHeight = $("#mb_con").height();
        //让提示框居中
        $("#mb_con").css({
            top: (_height - boxHeight) / 2 + "px",
            left: (_width - boxWidth) / 2 + "px"
        });
    };
    //确定按钮事件
    var btnOk = function (type, callback) {
        $("#mb_btn_ok1,#mb_btn_ok2").click(function () {
            var e = {value: "", index: 1};
            if (type == "prompt") {
                e.value = $("#myinput").val();
            }
            $("#mb_box,#mb_con").remove();
            if (typeof (callback) == 'function') {
                callback(e);
            }
            document.ontouchmove = function () {
                return true;
            };
        });
    };

    //取消按钮事件
    var btnNo = function (callback) {
        $("#mb_btn_no,#mb_ico").click(function () {
            var e = {value: "", index: 0};
            $("#mb_box,#mb_con").remove();
            if (typeof (callback) == 'function') {
                callback(e);
            }
            document.ontouchmove = function () {
                return true;
            };
        });
    };
    //取消按钮事件
    var btnClose = function (callback) {
        $("#close").click(function () {
            $("#noticeBox").remove();
            if (typeof (callback) == 'function') {
                callback();
            }
            document.ontouchmove = function () {
                return true;
            };
        });
    };
})();