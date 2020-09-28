define([], function() {
    return {
        init: function() {

            //二级菜单移入鼠标显示，移除隐藏
            const $location = $('.header .header-location');
            const $wrap = $('.header .header-location .city-header-wrap');
            const $span = $('.header .header-location .city-header-wrap .city-header .list-other .name-city')
            $location.on('mouseover', function() {
                $(this).addClass('active');
                $wrap.show();
                // $.each(data, (index, value) => {
                //     $location.append(`<span index=${index}>${value.name}</span>`)
                // });
                // console.log(item);
            });
            $location.on('mouseout', function() {
                $wrap.hide();
            });

            //轮播图
            const $img = $('.banner ul li');
            const $circle = $(".banner ol li");
            const $right = $(".banner .right");
            const $left = $(".banner .left");
            const $banner = $(".banner")
            let num = 0;
            let timer = '';
            $circle.eq(0).addClass("active").siblings().removeClass("active");
            start();
            $circle.on('mouseover', function() {
                num = $(this).index();
                animate();
            });
            $banner.on('mouseover', () => {
                clearTimeout(timer);
            });
            $banner.on("mouseout", () => {
                start();
            })
            $right.on('click', function() {
                num++;
                if (num == 3) {
                    num = 0
                }
                animate();
            });
            $left.on('click', function() {
                num--;
                if (num == -1) {
                    num = 1
                }
                animate();
            });

            function start() {
                timer = setInterval(function() {
                    num++;
                    if (num == 3) {
                        num = 0
                    }
                    animate();

                }, 2000);
            }

            function animate() {
                $img.eq(num).fadeIn("slow").siblings().stop(true, true).fadeOut("slow");
                $circle.eq(num).addClass("active").siblings().removeClass("active");
            }
            //点击回到顶部
            var $top = $('.sidebox .backtop')
            $top.on('click', function() {
                $(window).scrollTop(0);
                return false;
            });
            //渲染
            $.ajax({
                url: 'http://192.168.13.71/damai/php/damaiindexli.php',
                dataType: 'json'
            }).done(function(data) {
                let $strhtml = '';
                $.each(data, function(index, value) {
                    $strhtml += `<li>    
                        <a href="">
                        <div class="iteming1">
                                <img src="${value.url}" alt="">
                            </div>
                        <div class="iteming2">
                                <title>${value.title}</title>
                                <strong>${value.address}</strong>
                                <p>${value.showtime}</p>
                                <span>￥${value.price}起</span>
                            </div>
                            </a>
                        </li>
                    `;
                });
                $(".box-right").html(($strhtml));
            })
        }
    }
});