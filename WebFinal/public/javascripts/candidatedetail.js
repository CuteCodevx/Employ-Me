/**
 * This function handles the candidatedetail.ejs view. If the invite button is clicked, the employee will be notified
 * that the Employer is interested in his JobRequest. If the evaluate button is clicked, create a review respectively
 */
$(function () {
    var companyaccount= $('#companyAccount').text().trim();
    var career = $('#career').text().trim();
    var username=$('#employeeUsername').text().trim();
    var name=$('#employeeName').text().trim();

    $('#invite').click(function () {

        if(!companyaccount){
            alert('Please login to your account first!');
        }else{

            var date = new Date();
            var data = {'employee':username,'employer':companyaccount,'date':date.toLocaleString(),'job':career};

            $.ajax({
                url:'/candidatedetail',
                type:'post',
                data:data,
                success:function (result) {
                    //console.log(result);
                    alert('invite successfully!');
                    location.href='candidatedetail?name='+name+'&career='+career+'';
                },
                error:function (err,result) {
                    // console.log(err.statusText);
                    alert("You have already invited this person!");
                }
            })
        }
    });

    $('#evaluate').click(function () {

        var date = new Date();

        if(!companyaccount){
            alert('Please Login to your account first!');
        }else{
            $('#reviewModal').css('display','block');

            $('#comment').submit(function () {
                //get review
                var evaluator=$('#realName').val().trim();
                var score = $('#score').val().trim();
                var content=$('#content');

                //upload file
                var file=$('#file')[0];

                var formData = new FormData();
                formData.append('file',file.files[0]);
                formData.append('username',username);
                formData.append('name',name);
                formData.append('score',score);
                formData.append('realName',evaluator);
                formData.append('content',content);
                formData.append('date',date.toLocaleString());
                //console.log(typeof formData);

                //var data={username:username,name:name,realName:evaluator,score:score,content:content,date:date.toLocaleString()};
                $.ajax({
                    url:'comment',
                    type:'formData',
                    contentType: false,
                    processData: false,
                    data:data,
                    success:function (result) {
                        alert('review successfully!');
                        location.href='candidatedetail?name='+name+'&career='+career+'';
                    },
                    error:function (err) {
                        console.log(err);
                    }
                })
            })
        }
    })
});