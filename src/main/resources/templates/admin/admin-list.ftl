<!DOCTYPE html>
<html class="x-admin-sm">

<head>
    <meta charset="UTF-8">
    <title>欢迎页面-X-admin2.2</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport"
          content="width=device-width,user-scalable=yes, minimum-scale=0.4, initial-scale=0.8,target-densitydpi=low-dpi"/>
    <link rel="stylesheet" href="/css/font.css">
    <link rel="stylesheet" href="/css/xadmin.css">
    <script src="/lib/layui/layui.js" charset="utf-8"></script>
    <script type="text/javascript" src="/js/jquery.min.js"></script>
    <script type="text/javascript" src="/js/xadmin.js"></script>
    <!--[if lt IE 9]>
    <script src="/js/html5.min.js"></script>
    <script src="/js/respond.min.js"></script>
    <![endif]-->
    <style>
        .iconfont {
            font-family: "iconfont" !important;
            font-size: 16px;
            font-style: normal;
            -webkit-font-smoothing: antialiased;
            -webkit-text-stroke-width: 0.2px;
            -moz-osx-font-smoothing: grayscale;
        }
    </style>
</head>

<body>
<div class="x-nav">
            <span class="layui-breadcrumb">
                <a href="">首页</a>
                <a href="">演示</a>
                <a><cite>导航元素</cite></a>
            </span>
    <a class="layui-btn layui-btn-small" style="line-height:1.6em;margin-top:3px;float:right"
       onclick="location.reload()" title="刷新">
        <i class="layui-icon layui-icon-refresh" style="line-height:30px"></i>
    </a>
</div>
<div class="layui-fluid">
    <div class="layui-row layui-col-space15">
        <div class="layui-col-md12">
            <div class="layui-card">
                <div class="layui-card-body ">

                    <form class="layui-form layui-col-space5">
                        <div class="layui-inline layui-show-xs-block">
                            <input class="layui-input" autocomplete="off" placeholder="开始日" name="start" id="start">
                        </div>
                        <div class="layui-inline layui-show-xs-block">
                            <input class="layui-input" autocomplete="off" placeholder="截止日" name="end" id="end"></div>
                        <div class="layui-inline layui-show-xs-block">
                            <input type="text" name="username" placeholder="请输入用户名" autocomplete="off"
                                   class="layui-input"></div>
                        <div class="layui-inline layui-show-xs-block">
                            <button class="layui-btn" lay-submit="" lay-filter="sreach">
                                <i class="layui-icon">&#xe615;</i></button>
                        </div>
                    </form>
                </div>
                <div class="layui-card-header">
                    <button class="layui-btn layui-btn-danger" onclick="xadmin.open('新增','/page/add?status=3',800,600)"
                            href="javascript:;">
                        <i class="layui-icon iconfont">&#xe6b9;</i>新增管理员
                    </button>
                </div>
                <div class="layui-card-body ">
                    <table id="LAY_table_user" class="layui-table">

                    </table>
                </div>

            </div>
        </div>
    </div>
</div>
</body>

<script>
    layui.use('laydate',
        function () {
            var laydate = layui.laydate;

            //执行一个laydate实例
            laydate.render({
                elem: '#start' //指定元素
            });

            //执行一个laydate实例
            laydate.render({
                elem: '#end' //指定元素
            });

        });
</script>
<script>
    layui.use('table', function () {
        var table = layui.table;

    });
</script>
<script>
    /*操作数据*/

    /*用户-删除*/
    function member_del(obj, id) {
        var arr = [];
        arr.push(id);
        layer.confirm('确认要永久删除吗？', function (index) {
            //发异步删除数据
            $.ajax({
                url: '/user/delete',
                data: JSON.stringify(arr),
                type: 'post',
                dataType: 'json',
                contentType: "application/json",
                success: function (res) {
                    if (res.success) {
                        $(obj).parents("tr").remove();
                        layer.msg('已删除!', {icon: 1, time: 1000});
                    } else {
                        layer.msg(res.msg, {icon: 2, time: 1000});
                    }
                }
            })
        });
    }

    /*用户-删除全部*/
    function delAll(argument) {
        var checkStatus = layui.table.checkStatus('checkboxTable').data;
        var ids = [];
        // 获取选中的id
        $.each(checkStatus, function (index, el) {
            ids.push(el.id)
        });

        layer.confirm('确认要删除吗？' + ids.toString(),
            function () {
                //捉到所有被选中的，发异步进行删除
                $.ajax({
                    url: '/essay/delete',
                    data: JSON.stringify(ids),
                    dataType: 'json',
                    type: 'post',
                    contentType: 'application/json',
                    success: function (res) {
                        if (res.success) {
                            layer.msg('删除成功', {
                                icon: 1
                            });
                            $(".layui-form-checked").not('.header').parents('tr').remove();
                            xadmin.father_reload();
                        } else {
                            layer.msg(res.msg, {
                                icon: 2
                            });
                        }
                    }

                })

            });
    }

    //通过
    function pass(id) {
        layer.confirm('确认通过嘛？', {
            btn: ['确认', '取消'] //按钮
        }, function () {
            $.ajax({
                url: '/essay/setState',
                data: {
                    essayId: id,
                    state: 1
                },
                dataType: 'json',
                success: function (res) {
                    if (res.success) {
                        layer.msg('审核通过，稿件已发布', {icon: 1});
                        xadmin.father_reload();
                    } else {
                        layer.msg(res.msg, {icon: 2});
                    }

                }
            })

        }, function () {

        });
    }

    function refuse(id) {
        //prompt层
        layer.prompt({title: '打回意见', formType: 2}, function (text, index) {
            $.ajax({
                url: '/essay/refuse',
                data: {
                    essayId: id,
                    remark: text
                },
                type: 'post',
                dataType: 'json',
                success: function (res) {
                    if (res.success) {
                        layer.close(index);
                        layer.msg('已打回<br>提交意见：' + text);
                    } else {
                        layer.close(index);
                        layer.msglayer.msg(res.msg, {icon: 2});
                    }
                }
            })

        });
    }

</script>
<script th:inline="none">
    /*数据查询*/

    $(function () {
        getAllEssay();
    })

    /*获取全部文章*/
    function getAllEssay() {
        layui.use('table',
            function () {
                var table = layui.table;
                table.render({
                    id: "checkboxTable",
                    url: '/user/findAllByStatus?status=3',
                    elem: '#LAY_table_user',
                    page: true,
                    cols: [[
                        {checkbox: true},
                        {field: 'id', title: 'ID', width: 80},
                        {field: 'name', title: '姓名', sort: true, width: 120},
                        {field: 'sex', width: 80, title: '性别', sort: true},
                        {field: 'age', width: 80, title: '年龄', sort: true},
                        {field: 'phone', title: '联系方式', sort: true, width: 150},
                        {field: 'idCard', title: '身份证', sort: true, width: 150},
                        {field: 'address', title: '地址', sort: true, width: 150},
                        {field: 'email', title: '电子邮箱', sort: true, width: 120},
                        {toolbar: '#barTeacher', title: '操作', width: 120}

                    ]]
                })

            });
    }


    /**
     * 判断字段是否为空
     * @param o
     * @returns {*}
     */
    function isNullFormat(o) {
        if (o) {
            return o;
        } else {
            return '暂无';
        }
    }

</script>
<script type="text/html" id="barTeacher">
    <a title="编辑" onclick="xadmin.open('编辑','/user/getInfo?authorId={{d.id}}',800,600)" href="javascript:;">
        <i class="layui-icon">&#xe642;</i>
    </a>
    <a title="移除" onclick="member_del(this,{{d.id}})" href="javascript:;">
        <i class="layui-icon">&#xe640;</i>
    </a>
</script>

</html>