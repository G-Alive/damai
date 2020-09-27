define([], function() {
    return {
        init: function() {
            console.log(1);
            $.ajax({
                url: 'http://localhost/damai/php/damaiindexli.php',
                dataType: 'json'
            }).done(function(data) {
                console.log(data);
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
                console.log($strhtml);
                $(".box-right").html(($strhtml));
            })
        }
    }
});