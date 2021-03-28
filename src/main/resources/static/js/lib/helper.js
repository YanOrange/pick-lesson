;
(function (window, $) {

    var $template = $('#template');

    bind();

    function bind() {
        $(document).on('blur', '#template', function () {
            if ($(this).val() !== $('#password').val()) {
                am.tip('确认密码与密码不同');
            }
        });
    }

    function template() {
        $.ajax({
            type: 'POST',
            url: 's/template.php',
            dataType: 'json',
            data: loginParam,
            success: function (data) {
                if (data.errno == 0) {
                    window.location.assign('index.html');
                } else {
                    am.tip(data.err);
                }
            }
        });
    }

    //$.getJSON 默认 type: 'POST', dataType: 'json'
    function getTemplate() {
        $.getJSON('s/shippingAddr/showAddrs.php',
            function (data) {
                if (data.errno == 0) {
                    var source = $("#myaddressTmpl").html();
                    var template = Handlebars.compile(source);
                    console.info(typeof data);
                    $("#myAddress").html(template(data));
                } else {
                    am.tip(data.err);
                }
            });
    }

    function getTemplate() {
        $.ajax({
            type: 'GET',
            url: 's/template.php',
            dataType: 'json',
            data: loginParam,
            success: function (data) {
                if (data.errno == 0) {

                } else {
                    am.tip(data.err);
                }
            }
        });
    }

})(window, Zepto);