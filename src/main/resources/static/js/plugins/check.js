// JavaScript Document
var InterValObj; //timer变量，控制时间
var count = 120; //间隔函数，1秒执行
var curCount; //当前剩余秒数
function sendMessage(status, propmstatus) {
    if (status == 2) {
        if (propmstatus == "1") {
            $.MsgBox.Alert("图形验证码错误", '', '', function () {
                $.MsgBox.Prompt('图形验证码', '', '', '请输入验证码', '<img id="vCode" src="getRandomVCode.jhtm?now=' + new Date() + '" width="80" alt="验证码" style="display:inline;margin-top:-4px;" onclick="updateCode()">',
                    function (e) {
                        if (e.index == 1) {
                            var tel = $("#telphone").val();
                            sendCode(tel, e.value);
                        } else {
                            $("#sendCode").removeAttr("disabled");
                        }
                    });
            });
            return;
        } else {
            $.MsgBox.Prompt('图形验证码', '', '', '请输入验证码', '<img id="vCode" src="getRandomVCode.jhtm?now=' + new Date() + '" width="80" alt="验证码" style="display:inline;margin-top:-4px;" onclick="updateCode()">',
                function (e) {
                    if (e.index == 1) {
                        var tel = $("#telphone").val();
                        sendCode(tel, e.value);
                    } else {
                        $("#sendCode").removeAttr("disabled");
                    }
                });
            return;
        }
    }
    curCount = count;
    $("#sendCode").val(curCount + "秒后重发");
    InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
}

function sendCode(tel, vCode) {
    //向后台发送处理数据
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: "getCheckCode.jhtm", //目标地址
        data: {
            telphone: tel,
            vCode: vCode
        },
        success: function (data) {
            if (data.resultCode == "SUCCESS") {
                sendMessage(data.status, 0);
                if (data.status == 1) {
                    $.MsgBox.Alert('已发送', '', '', function () {
                        $("#dCode").focus();
                    });
                }
            } else if (data.resultCode == "IMAGE_CODE_ERROR") {
                sendMessage(2, 1);
                $("#sendCode").removeAttr("disabled");
            } else {
                $.MsgBox.Alert(data.resultDesc);
                $("#sendCode").removeAttr("disabled");
            }
        }
    });
}

//timer处理函数
function SetRemainTime() {
    if (curCount == 0) {
        window.clearInterval(InterValObj); //停止计时器
        $("#sendCode").removeAttr("disabled"); //启用按钮
        $("#sendCode").val("发送验证码");
        code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效
    } else {
        curCount--;
        $("#sendCode").val(curCount + "秒后重发");
    }
}

function updateCode() {
    //var src = $("#vCode").attr("src");
    $("#vCode").attr("src", "getRandomVCode.jhtm?now=" + new Date());
}
