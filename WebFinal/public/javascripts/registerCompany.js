$(function () {
    $('#changeRegisterType').click(function () {
        location.href = 'register';
    });

    $('#login').click(function () {
        location.href = 'loginCompany';
    });
    $('#register').click(function () {
        var username = $('#username').val();
        var psw1 = $('#psw1').val();
        var psw2 = $('#psw2').val();
        if(!username||psw1!==psw2){
            $('#psw1').addClass("w3-border-red");
            $('#psw2').addClass("w3-border-red");

            //$('body').prepend('<div style="color:green;">Confirm Password should be consistent with Password</div>');
        }else{
            //req.body.name, req.body.psw
            var data = {'username':username,'password':psw1};
            $.ajax({
                url:'/registercompany',
                type:'post',
                data:data,
                success:function (data,status) {
                    if (status=='success'){
                        location.href = 'loginCompany';
                    }
                },
                error:function (data,err) {
                    console.log(data);
                    console.log('ajax fail');
                    //location.href='registercompany';
                }
            })
        }
    })
})