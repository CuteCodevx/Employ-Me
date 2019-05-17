/**
 * This function directs the search to results to search by JobTitle and JobCity
 */
$(function () {
    $('section a').click(function () {
        var text = $(this).text();
        location.href='/results?keyword='+text+'';
    });

    $('#findJob').click(function () {
        var text=$('#findJobByTitle').val();
        location.href='/results?findJobByTitle='+text+'';
    });

    $('#findCity').click(function () {
        var text=$('#findJobByCity').val();
        location.href='/results?findJobByCity='+text+'';
    })
});
