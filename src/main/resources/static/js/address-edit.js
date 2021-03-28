'use strict';

;
(function () {
    $(function () {
        $('#formSubmit').on('click', function () {
            formValidate();
        });

        // 数据校验
        function formValidate() {
            var name = $('#name').val();
            if (!name) {
                $.dialog({
                    type: 'tips',
                    contentHtml: '请输入收货人姓名',
                    autoClose: 2000
                });
                return false;
            }
            var tel = $('#tel').val();
            if (!tel) {
                $.dialog({
                    type: 'tips',
                    contentHtml: '请输入手机号码',
                    autoClose: 2000
                });
                return false;
            }
            if (!dsTools.isTel(tel)) {
                $.dialog({
                    type: 'tips',
                    contentHtml: '请输入有效手机号码',
                    autoClose: 2000
                });
                return false;
            }
            var city = $('#select-city').html();
            if (city === '选择所在省份、城市、区县') {
                $.dialog({
                    type: 'tips',
                    contentHtml: '请选择所在省份、城市、区县',
                    autoClose: 2000
                });
                return false;
            }
            var addressDetail = $('#addressDetail').val();
            if (!addressDetail) {
                $.dialog({
                    type: 'tips',
                    contentHtml: '请输入详细地址',
                    autoClose: 2000
                });
                return false;
            }
            alert('success');
        }

        // 选择城市初始化fn
        var selectEl = document.getElementById('select-city');

        var first = []; /* 省，直辖市 */
        var second = []; /* 市 */
        var third = []; /* 区县 */

        var selectedIndex = [0, 0, 0]; /* 默认选中的地区 */

        var checked = [0, 0, 0]; /* 已选选项 */

        function createList(obj, list) {
            obj.forEach(function (item, index, arr) {
                var temp = new Object();
                temp.text = item.name;
                temp.value = index;
                list.push(temp);
            })
        }

        createList(city, first);

        if (city[selectedIndex[0]].hasOwnProperty('sub')) {
            createList(city[selectedIndex[0]].sub, second);
        } else {
            second = [{text: '', value: 0}];
        }

        if (city[selectedIndex[0]].sub[selectedIndex[1]].hasOwnProperty('sub')) {
            createList(city[selectedIndex[0]].sub[selectedIndex[1]].sub, third);
        } else {
            third = [{text: '', value: 0}];
        }

        var picker = new Picker({
            data: [first, second, third],
            selectedIndex: selectedIndex,
            title: '地址选择'
        });

        picker.on('picker.select', function (selectedVal, selectedIndex) {
            var text1 = first[selectedIndex[0]].text;
            var text2 = second[selectedIndex[1]].text;
            var text3 = third[selectedIndex[2]] ? third[selectedIndex[2]].text : '';

            selectEl.innerText = text1 + ' ' + text2 + ' ' + text3;
        });

        picker.on('picker.change', function (index, selectedIndex) {
            if (index === 0) {
                firstChange();
            } else if (index === 1) {
                secondChange();
            }

            function firstChange() {
                second = [];
                third = [];
                checked[0] = selectedIndex;
                var firstCity = city[selectedIndex];
                if (firstCity.hasOwnProperty('sub')) {
                    createList(firstCity.sub, second);

                    var secondCity = city[selectedIndex].sub[0];
                    if (secondCity.hasOwnProperty('sub')) {
                        createList(secondCity.sub, third);
                    } else {
                        third = [{text: '', value: 0}];
                        checked[2] = 0;
                    }
                } else {
                    second = [{text: '', value: 0}];
                    third = [{text: '', value: 0}];
                    checked[1] = 0;
                    checked[2] = 0;
                }

                picker.refillColumn(1, second);
                picker.refillColumn(2, third);
                picker.scrollColumn(1, 0);
                picker.scrollColumn(2, 0)
            }

            function secondChange() {
                third = [];
                checked[1] = selectedIndex;
                var first_index = checked[0];
                if (city[first_index].sub[selectedIndex].hasOwnProperty('sub')) {
                    var secondCity = city[first_index].sub[selectedIndex];
                    createList(secondCity.sub, third);
                    picker.refillColumn(2, third);
                    picker.scrollColumn(2, 0)
                } else {
                    third = [{text: '', value: 0}];
                    checked[2] = 0;
                    picker.refillColumn(2, third);
                    picker.scrollColumn(2, 0)
                }
            }

        });

        picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
            var elValue = selectEl.innerHTML;
            if (elValue === '选择所在省份、城市、区县') {
                selectEl.style.color = '#a9a9a9'
            } else {
                selectEl.style.color = '#333333'
            }
            console.log(selectedVal);
            console.log(selectedIndex);
        });

        selectEl.addEventListener('click', function () {
            picker.show();
        });

        $('.picker-mask').on('click', function () {
            picker.hide();
        })
    });
})();
