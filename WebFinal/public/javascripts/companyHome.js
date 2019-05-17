/**
 * This function direct the search to results with keywords and address
 */
$(function () {
    $('#findCv').submit(function () {
        var keyword = $('#keyword').val();
        var address = $('#address').val();
        location.href='/results?keywordJob='+keyword+'&address='+address+'';
    })
});
