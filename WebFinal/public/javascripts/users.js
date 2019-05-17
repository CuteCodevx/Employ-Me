function change() {
    var x = document.getElementById("first");
    var y = document.getElementById("second");
    y.options.length = 0; // clear all content
    if(x.selectedIndex == 0)
    {
        y.options.add(new Option("Java Development", "0"));
        y.options.add(new Option("PHP Development", "1", false, true));  //
        y.options.add(new Option("Web Development", "2"));
        y.options.add(new Option("Python Development", "3"));
        y.options.add(new Option("Database Development", "4"));
        y.options.add(new Option("AI Development", "5"));
        y.options.add(new Option("None", "6"));
    }

    if(x.selectedIndex == 1)
    {
        y.options.add(new Option("Bank", "0"));
        y.options.add(new Option("Marketing", "1", false, true));  //
        y.options.add(new Option("Securities", "2"));
        y.options.add(new Option("Stock", "3"));
        y.options.add(new Option("Insurance", "4"));
        y.options.add(new Option("The credit", "5"));
        y.options.add(new Option("None", "6"));
    }

    if(x.selectedIndex == 2)
    {
        y.options.add(new Option("Biology engineer", "0"));
        y.options.add(new Option("Biology assistant", "1", false, true));  //
        y.options.add(new Option("Biology education", "2"));
        y.options.add(new Option("None", "3"));
    }

    if(x.selectedIndex == 3)
    {
        y.options.add(new Option("The fine arts", "0"));
        y.options.add(new Option("Music arts", "1", false, true));  //
        y.options.add(new Option("Arts education", "2"));
        y.options.add(new Option("None", "3"));
    }

    if(x.selectedIndex == 4)
    {
        y.options.add(new Option("English literature", "0"));
        y.options.add(new Option("Foreign literature", "1", false, true));  //
        y.options.add(new Option("Literature education", "2"));
        y.options.add(new Option("None", "3"));
    }

}
$(function () {
    $('#public').click(function () {
        //open public request page
        $('#publicRequest').css("display","block");

        $('#requestForm').submit(function () {
            //get the information
            var account = $('#account').text();
            var name = $('#realName').val();
            var job = $('#job').val();
            var city=$('#city').val();
            var intro = $('#intro').val();
            var date= new Date();
            var type=[$('#first').find("option:selected").text(),$('#second').find("option:selected").text()];
            var data = {account:account,name:name,job:job,city:city,date:date.toLocaleString(),intro:intro,type:type};
            $.ajax({
                url:'/users',
                type:'post',
                data:data,
                success:function (result) {
                    alert("submit successfully!");
                    location.href="/users?username="+account+"";
                },
                error:function (err) {
                    alert(err);
                }
            })
        })
    })

    $('.checkInvitationDetail').each(function (index,ele) {
        $(this).click(function () {
            var employer = $('.InviteEmployer')[index].innerHTML;
            $(this).attr('href','/company/companydetail?username='+employer+'');

        })
    })
    $('.checkRecord').each(function (index,ele) {
        $(this).click(function () {
            var job = $('.recordJob')[index].innerHTML;
            var employer = $('.recordCompany')[index].innerHTML;
            $(this).attr('href','careerdetail?name='+employer+'&career='+job+'');
            // location.href='careerdetail?name='+employer+'&career='+job+'';
        })
    })


    //display public request detail
    $('.checkPublic').each(function (index,ele) {
        $(this).click(function () {
            $('.publicDetail')[index].style.display='block';
        })

    })

    $('.close').each(function (index,ele) {
        $(this).click(function () {
            $('.publicDetail')[index].style.display='none';
        })
    })
})