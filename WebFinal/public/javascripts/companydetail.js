/**
 * This function helps to initialise the GoogleMaps in the Companydetail.ejs view with respective latitude and longitude.
 */
function initMap() {
    let postcode = $('#postcode').text();
    let latitude=0;
    let longitude=0;
    $.ajax({
        url:'getGeocode',
        type:'post',
        data:{postcode:postcode},
        success:function (result) {
            //the result should be lat and lng;
            latitude = result.latitude;
            longitude = result.longitude;
            let myLatLng = {lat: latitude, lng: longitude};

            let map = new google.maps.Map(document.getElementById('map'), {
                zoom: 8,
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