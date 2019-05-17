/**
 * This function handles the login of the application
 */
$(function () {
    $('#register').click(function () {
        //jump web page
        location.href = 'register';
    });
    $('#login').click(function () {
        var username = $('#username').val();
        var psw1 = $('#psw1').val();

        var data = {'username':username,'password':psw1};
        //console.log(data);  //will show in url in browser
        // if(!username){
        //     $('body').prepend('<div style="color:green;">username cannot be empty</div>');
        // }else{
            $.ajax({
                url:'/login',
                type:'post',
                data:data,
                success:function (result) {
                    //String
                    // var res = JSON.stringify(result);
                    //console.log(typeof res);

                    //is company
                    if(result.isCompany!=null){
                        location.href = 'company';
                    }else{
                        location.href = 'home';
                    }
                },
                error:function (data,err) {
                    location.href='login';
                }
            })
        // }
    });
});