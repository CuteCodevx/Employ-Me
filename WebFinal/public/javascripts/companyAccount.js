function change() {
    var x = document.getElementById("first");
    var y = document.getElementById("second");
    y.options.length = 0;
    if(x.selectedIndex == 0)
    {
        y.options.add(new Option("Java Development", "0"));
        y.options.add(new Option("PHP Development", "1", false, true));
        y.options.add(new Option("Web Development", "2"));
        y.options.add(new Option("Python Development", "3"));
        y.options.add(new Option("Database Development", "4"));
        y.options.add(new Option("AI Development", "5"));
        y.options.add(new Option("None", "6"));
    }

    if(x.selectedIndex == 1)
    {
        y.options.add(new Option("Bank", "0"));
        y.options.add(new Option("Marketing", "1", false, true));
        y.options.add(new Option("Securities", "2"));
        y.options.add(new Option("Stock", "3"));
        y.options.add(new Option("Insurance", "4"));
        y.options.add(new Option("The credit", "5"));
        y.options.add(new Option("None", "6"));
    }

    if(x.selectedIndex == 2)
    {
        y.options.add(new Option("Biology engineer", "0"));
        y.options.add(new Option("Biology assistant", "1", false, true));
        y.options.add(new Option("Biology education", "2"));
        y.options.add(new Option("None", "3"));
    }

    if(x.selectedIndex == 3)
    {
        y.options.add(new Option("The fine arts", "0"));
        y.options.add(new Option("Music arts", "1", false, true));
        y.options.add(new Option("Arts education", "2"));
        y.options.add(new Option("None", "3"));
    }

    if(x.selectedIndex == 4)
    {
        y.options.add(new Option("English literature", "0"));
        y.options.add(new Option("Foreign literature", "1", false, true));  // 默认选中省会城市
        y.options.add(new Option("Literature education", "2"));
        y.options.add(new Option("None", "3"));
    }
}
//autocomplete address form
var placeSearch, autocomplete;

var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'), {types: ['geocode']});

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    autocomplete.setFields(['address_component']);

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    for (var component in componentForm) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    }

    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
        }
    }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle(
                {center: geolocation, radius: position.coords.accuracy});
            autocomplete.setBounds(circle.getBounds());
        });
    }
}
$(function () {

    $('#public').click(function () {
        $('#publicJob').css("display","block");
    })

    //check publication
    $('.checkPublic').each(function (index,ele) {
        $(this).click(function () {
            var name = $('#companyAccount').text();
            var career= $('.career')[index].innerHTML;
            career=career.trim();
            name=name.trim();
            location.href='/careerdetail?name='+name+'&career='+career+'';
        })
    })

    //check employee information
    $('.checkEmployee').each(function (i,ele) {
        $(this).click(function () {
            var name = $('.applicant')[i].innerHTML;
            name=name.trim();
            $(this).attr('href','/users/userdetail?username='+name+'');
        })
    })
    $('.checkInvite').each(function (i,ele) {
        $(this).click(function () {
            var career = $('.recordJob')[i].innerHTML;
            var name = $('.recordCandidate')[i].innerHTML;
            career=career.trim();
            name=name.trim();
            $(this).attr('href',"/candidatedetail?name="+name+"&career="+career+"");
        })
    })

    //post new job
    $('#postForm').submit(function () {
        var account = $('#companyAccount').text();
        var name = $('#companyName').text();
        var career = $('#career').val();
        var pay = $('#pay').val();
        var desc=$('#desc').val();
        var requ = $('#requ').val();
        var date= new Date();
        var type=[$('#first').find("option:selected").text(),$('#second').find("option:selected").text()];
        //address
        var streetAddress = $('#street_number').val()+', '+$('#route').val();
        var postcode = $('#postal_code').val();
        var city = $('#locality').val();
        var state=$('#administrative_area_level_1').val();
        var country = $('#country').val();
        //upload file
        var file=$('#file')[0];

        var formData = new FormData();
        formData.append('file',file.files[0]);
        formData.append('name',name);
        formData.append('career',career);
        formData.append('city',city);
        formData.append('pay',pay);
        formData.append('description',desc);
        formData.append('requ',requ);
        formData.append('date',date.toLocaleString());
        formData.append('type',type);
        formData.append('account',account);
        formData.append('streetAddress',streetAddress);
        formData.append('postcode',postcode);
        formData.append('state',state);
        formData.append('country',country);

        $.ajax({
            url:'/company/companyAccount',
            type:'post',
            contentType: false,
            processData: false,
            data:formData,
            success:function (res) {
                alert('post success');
                //back the current page
                location.href="/company/companyAccount?username="+account+"";
            },
            error:function (err) {
                console.log(err);
            }

        })
    })

    //delete application
    $('.delete').each(function (index,ele) {
        $(this).click(function () {
            var username = $('#companyAccount').text();
            var name = $('#companyName').text();
            var career= $('.career')[index].innerHTML;
            career=career.trim();
            username=username.trim();
            name=name.trim();
            var data={username:username,name:name,career:career};
            $.ajax({
                url:'/company/deletePublication',
                type:'post',
                data:data,
                success:function (data) {
                    alert('delete success');
                    //back the current page
                    location.href="/company/companyAccount?username="+username+"";
                },
                error:function (err) {
                    console.log(err)
                }
            })

        })
    })
})