$(function () {
    $('#changeRegisterType').click(function () {
        location.href = 'registercompany';
    });
    $('#login').click(function () {
        location.href = 'login';
    });
    $('#register').submit(function () {
        var username = $('#username').val();
        var psw1 = $('#psw1').val();
        var psw2 = $('#psw2').val();

        if(!username||psw1!==psw2){
            $('#psw1').addClass("w3-border-red");
            $('#psw2').addClass("w3-border-red");
            //$('body').prepend('<div style="color:green;">Confirm Password should be consistent with Password</div>');
        }else{
            $.ajax({
                url:'/register',
                type:'post',
                data:$('#register').serialize(),
                success:function (data,status) {
                    if (status==='success'){
                        alert($('#msg'));
                        location.href = 'login';
                    }
                },
                error:function (data,err) {
                    console.log('ajax fail');
                    location.href='register';
                }
            })
       }
    })
})