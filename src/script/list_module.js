define(['pagination', 'jlazyload'], function() { //依赖分页和懒加载
    return {
        init: function() {
            //点击回到顶部
            var $top = $('.sidebox .backtop')
            $top.on('click', function() {
                $(window).scrollTop(0);
                return false;
            });
            //1.渲染列表页的数据-默认渲染第一页
            //排序的变量
            let array_default = []; //排序前的li数组，默认数组
            let array = []; //排序中的数组
            let prev = null; //前一个价格
            let next = null; //后一个价格
            const $list = $('.box-content');
            $.ajax({
                url: 'http://192.168.13.45/damai/php/listdata.php',
                dataType: 'json'
            }).done(function(data) {
                let $strhtml = '';
                $.each(data, function(index, value) {
                    $strhtml += `<li>    
                    <a href="detail.html?sid=${value.sid}">
                        <div class="iteming1">
                            <img src="${value.url}" alt="">
                        </div>
                        <div class="iteming2">
                            <title>${value.title}</title>
                            <strong>${value.address}</strong>
                            <p>${value.showtime}</p>
                            <span class="price">￥${value.price}</span>
                        </div>
                    </a>
                </li>
                `;
                });
                $(".box-content").html(($strhtml));

                //重置数组
                array_default = []; //排序前的li数组
                array = []; //排序中的数组
                prev = null;
                next = null;
                //将页面的li元素追加到两个数组中。
                $('.box-content li').each(function(index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });

                //懒加载
                $(function() {
                    $("img.lazy").lazyload({ effect: "fadeIn" });
                });
            });

            //2.分页思路
            //告知后端当前请求的是第几页数据。将当前的页面页码传递给后端(get)
            $('.page').pagination({
                pageCount: 3, //总的页数 - 后端传入的。
                jump: true, //是否开启跳转到指定的页数，布尔值。
                coping: true, //是否开启首页和尾页，布尔值。
                prevContent: '上一页',
                nextContent: '下一页',
                homePage: '首页',
                endPage: '尾页',
                callback: function(api) {
                    //console.log(api.getCurrent()); //获取的页码给后端
                    $.ajax({
                        url: 'http://192.168.13.45/damai/php/listdata.php',
                        data: {
                            page: api.getCurrent() //传输页面
                        },
                        dataType: 'json'
                    }).done(function(data) {
                        let $strhtml = '';
                        $.each(data, function(index, value) {
                            $strhtml += `<li>    
                            <a href="detail.html?sid=${value.sid}">
                                <div class="iteming1">
                                    <img src="${value.url}" alt="">
                                </div>
                                <div class="iteming2">
                                    <title>${value.title}</title>
                                    <strong>${value.address}</strong>
                                    <p>${value.showtime}</p>
                                    <span class="price">￥${value.price}</span>
                                </div>
                            </a>
                        </li>
                        `;
                        });
                        $(".box-content").html(($strhtml));

                        //重置数组
                        array_default = []; //排序前的li数组
                        array = []; //排序中的数组
                        prev = null;
                        next = null;
                        //将页面的li元素追加到两个数组中。
                        $('.box-content li').each(function(index, element) {
                            array[index] = $(this);
                            array_default[index] = $(this);
                        });
                    });
                }
            });


            //3.排序
            //默认排序：如果已经排序了，恢复最初的排序。
            $('button').eq(0).on('click', function() {
                //array_default = [li,li,li,li......]
                $.each(array_default, function(index, value) {
                    $('.box-content').append(value);
                });
                return;
            });

            //升序
            $('button').eq(1).on('click', function() {
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        prev = parseFloat(array[j].find('.price').html().substring(1)); //获取上一个价格
                        console.log(prev);
                        next = parseFloat(array[j + 1].find('.price').html().substring(1)); //获取下一个价格
                        //通过价格的判断，改变的是li的位置。
                        if (prev > next) {
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }
                $.each(array, function(index, value) {
                    $('.box-content').append(value);
                });
            });
        }
    }
});