$(function () {
    $('section a').click(function () {
        var text = $(this).text();
        var data = {'value':text};
        $.ajax({
            url:'/home',
            type:'post',
            data:data,
            success:function (result) {
                var data = JSON.stringify(result)
                localStorage.setItem("result",data);
                //console.log(localStorage);
                location.href = 'results';
            },
            error:function (err,result) {
                alert("wrong");
            }
        })
        // console.log($(this).text());
    })

})