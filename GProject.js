
$(document).ready(function () {
    $.getJSON("./data.json", function (result) {

        //data is result

        console.log(result);
        var byFieldOffice = [];

        var sortedResult = result.sort(compare);

        console.log('Sorted ', sortedResult);
        //sortedResult.forEach(function(i){console.log(i.Field_x0020_Office);});

        sortedResult.forEach(function (item) {
            if (search(item.Office_x0020_Routing, byFieldOffice)) {
                search(item.Office_x0020_Routing, byFieldOffice).items.push(item.Field_x0020_Office);
            } else {
                var a = [];
                a.push(item.Field_x0020_Office);
                byFieldOffice.push({ name: item.Office_x0020_Routing, items: a })
            }
        });

        console.log(byFieldOffice);

        var myHtml = '';


        byFieldOffice.forEach(function(form){
            console.log(form.name);
            myHtml += '<h2>' + form.name +  '- Totals: ' + form.items.length + '</h2><b>Offices:</b><ul>';
            var grouped = groupItems(form.items);
            console.log(grouped);
            grouped.forEach(function(office){
                myHtml += '<li> ' + office.name + ' - Count: ' + office.count +  '</li>';
            });
            myHtml += '</ul>';
        });

        $('#socItems').html(myHtml);

        function groupItems(items){
            if(items.length == 0){
                return [];
            }

            var ret = [];
            var prev = items[0];
            var count = 0;
            for(var i = 0; i< items.length; i++){
                if(prev === items[i]) {
                    count++;
                    if(i == items.length - 1){
                        ret.push({name:prev,count:count});
                    }
                } else{
                    ret.push({name:prev,count:count});
                    count = 1;
                    prev = items[i];
                    if(i == items.length - 1){
                        ret.push({name:prev,count:count});
                    }
                }
            }
            return ret;
        }

        function search(nameKey, myArray) {
            for (var i = 0; i < myArray.length; i++) {
                if (myArray[i].name === nameKey) {
                    return myArray[i];
                }
            }
            return null;
        }

        //Comparison by field name
        function compare(a, b) {
            if (a.Field_x0020_Office < b.Field_x0020_Office) {
                return -1;
            }
            if (a.Field_x0020_Office > b.Field_x0020_Office) {
                return 1;
            }
            return 0;
        }


        //end of operation for the result data
    });
});
