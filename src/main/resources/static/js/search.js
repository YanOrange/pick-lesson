;
(function () {
    $(function () {
        $('#clearHistory').on('click', function () {
            $('.history-list').html('');
        });
        $('.history-box .icon-close-1').on('click', function () {
            $(this).parents('.history-item').remove()
        })
    });
})();
