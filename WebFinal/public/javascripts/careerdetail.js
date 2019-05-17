function initMap() {
    let postcode = $('#postcode').text();
    //console.log(postcode);
    let latitude=0;
    let longitude=0;
    $.ajax({
        url:'/company/getGeocode',
        type:'post',
        data:{postcode:postcode},
        success:function (result) {
            //the result should be lat and lng;
            latitude = result.latitude;
            longitude = result.longitude;
            let myLatLng = {lat: latitude, lng: longitude};

            let map = new google.maps.Map(document.getElementById('map'), {
                zoom: 12,
                center: myLatLng
            });

            let marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: 'Hello World!'
            });
        },
        error:function (err) {
            $('#map').text('No Map here, Please check whether your postcode or address is correct or not');
        }
    })


}
$(function(){
    //apply a job
    $('#apply').click(function(){
        var username = $('#account').text();
        var career = $('#career').text();
        var companyName = $('#companyName').text();
        var date = new Date();
        var data = {'employeeAccount':username,'employerAccount':companyName,'date':date.toLocaleString(),'career':career};
        if(!username){
            alert('please login your account first!');
        }else{
            $.ajax({
                url:'/careerdetail',
                type:'post',
                data:data,
                success:function (result) {
                    //console.log(result);
                    alert('apply successfully!');
                    location.href='careerdetail?name='+companyName+'&career='+career+'';
                },
                error:function (err,result) {
                    // console.log(err.statusText);
                    alert("You cannot apply for the same job more than once!");
                }
            })
        }

    })

    $('#evaluate').click(function () {
        var account= $('#account').text();
        var username = $('#companyUserName').text();
        var name=$('#companyName').text();
        var career = $('#career').text();
        var date = new Date();
        if(!account){
            alert('\'Please login to your account first!\'');
        }else{
            $('#reviewModal').css("display","block");
            $('#comment').submit(function () {
                var realName=$('#realName').val();
                var score = $('#score').val();
                var content=$('#content').val();
                //upload file
                var file=$('#file')[0];

                var formData = new FormData();
                formData.append('file',file.files[0]);
                formData.append('username',username.trim());
                formData.append('name',name.trim());
                formData.append('realName',realName.trim());
                formData.append('score',score);
                formData.append('content',content);
                formData.append('date',date.toLocaleString());
                //var data={username:username,name:name,realName:realName,score:score,content:content,date:date.toLocaleString()};
                $.ajax({
                    url:'comment',
                    type:'post',
                    contentType: false,
                    processData: false,
                    data:formData,
                    success:function (result) {
                        alert('review successfully!');
                        location.href='careerdetail?name='+name+'&career='+career+'';
                    },
                    error:function (err) {
                        alert(err);
                    }
                })
            })
        }

    })
})