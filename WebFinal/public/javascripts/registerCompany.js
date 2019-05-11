$(function () {
    $('#changeRegisterType').click(function () {
        location.href = 'register';
    });

    $('#login').click(function () {
        location.href = 'login';
    });
    $('#registerCompany').submit(function () {
        var username = $('#username').val();
        var psw1 = $('#psw1').val();
        var psw2 = $('#psw2').val();
        if(!username||psw1!==psw2){
            $('#psw1').addClass("w3-border-red");
            $('#psw2').addClass("w3-border-red");

            //$('body').prepend('<div style="color:green;">Confirm Password should be consistent with Password</div>');
        }else{
            $.ajax({
                url:'/registercompany',
                type:'post',
                data:$('#registerCompany').serialize(),
                success:function (data,status) {
                    if (status=='success'){
                        location.href = 'loginCompany';
                    }
                },
                error:function (data,err) {
                    location.href='register';
                }
            })
        }
    })
})