/**
 * This function handles the search result
 */
$(function(){

    $('.tr').each(function () {
        $(this).click(function () {
            //console.log($(this).text());
            var text = $(this).text();

            var dataArr = text.split("\r\n");
            dataArr = dataArr[0].split("\n");
            var dataFinal=[];
            for(var i=0;i<dataArr.length;i++){
                if(dataArr[i]){
                    dataFinal.push(dataArr[i].trim());
                }
            }
            //console.log(dataFinal);
            var name = dataFinal[0];
            var career= dataFinal[1];

            if($('#judge').text()){
                location.href='careerdetail?name='+name+'&career='+career+'';
            }else{
                location.href='candidatedetail?name='+name+'&career='+career+'';
            }

        })
    })

});
