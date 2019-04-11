$(function () {
    $('#register').click(function () {
        //jump web page
        location.href = 'registercompany';
    });
    $('#login').click(function () {
        var username = $('#username').val();
        var psw1 = $('#psw1').val();

        var data = {'username':username,'password':psw1};
        //console.log(data);  //will show in url in browser
        if(!username){
            $('body').prepend('<div style="color:green;">username cannot be empty</div>');
        }else{
            $.ajax({
                url:'/loginCompany',
                type:'post',
                data:data,
                success:function (data,status) {
                    // if (data){
                    console.log(status);
                    location.href = 'companyAccount';
                    //}
                },
                error:function (data,err) {
                    alert('ajax fail.....please try again');
                    //console.log('aaaaaaaajax fail');

                    //location.href='login';
                }
            })
        }
    });
})