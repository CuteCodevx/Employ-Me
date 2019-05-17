/**
 * This file handles the overall functions when registering a company/Employer
 */
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
                    if (status==='success'){
                        location.href = 'login';
                    }
                },
                error:function (data,err) {
                    location.href='registercompany';
                }
            })
        }
    })
});