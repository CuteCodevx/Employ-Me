$(function () {
//    var username = $("account").val();
    $('.tabbox a').click(function () {
        $(this).addClass('active').siblings().removeClass('active');

        var index = $(this).index();
        $('section').hide().eq(index).show();
    })

    //show publication in the page
        var data = {};
        $.ajax({
            url:'/companyAccount',
            type:'post',
            data:data,
            success:function (data) {
               // var result = JSON.stringify(data);
                //console.log(data);
                for(var i =0;i<data.length;i++){
                    // console.log(data[i]);
                    if(data[i].employeeAccount==null){
                        $('#previous').append(` <div class="w3-panel w3-container w3-border w3-border-gray w3-round-xlarge">
                    <div class="w3-row">
                        <div class="w3-col m3">
                            <p>`+data[i].name+`</p>
                        </div>
                        <div class="w3-col m3">
                            <p><a href="">`+data[i].description+`</a></p>
                        </div>
                        <div class="w3-col m3">
                            <p>`+data[i].date+`</p>
                        </div>
                        <div class="w3-col m3">
                            <p><a class="w3-btn w3-white w3-border w3-round-xlarge" id="edit">Edit</a> / <a class="w3-btn w3-white w3-border w3-round-xlarge" id="delete">Delete</a> </p>
                        </div>
                    </div>
                </div>`);
                        //can try get element by class
                        $('#edit').click(function () {
                            console.log('edit');
                        })
                        $('#delete').click(function () {
                            console.log('delete');
                        })

                    }else{
                        $('#received').append(` <div class="w3-panel w3-container w3-border w3-border-gray w3-round-xlarge">
                        <div class="w3-row">
                            <div class="w3-col m3">
                            <p>`+data[i].date+`</p></div>
                            <div class="w3-col m3">
                                <p>`+data[i].employeeAccount+`</p>
                            </div>
                            <div class="w3-col m3">
                                <p>`+data[i].career+`</p>
                            </div>
                            <div class="w3-col m3">
                                <p class="w3-right"><a href="customerExhibition.html">Check</a></p>
                            </div>
                        </div>
                    </div>`);
                    }


                }




            },
            error:function (data,err) {
                console.log(data);
                console.log('ajax fail');
            }
        })






})