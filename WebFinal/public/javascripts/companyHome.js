$(function () {
    $('#findCv').submit(function () {
        var keyword = $('#keyword').val();
        var address = $('#address').val();
        location.href='/results?keywordJob='+keyword+'&address='+address+'';
    })
})
