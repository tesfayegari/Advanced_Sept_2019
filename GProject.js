
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

        var id = 1;
        byFieldOffice.forEach(function (form) {
            console.log(form.name);
            myHtml += '<div class="bulletted-list"><div ><h2>' + form.name + '- Totals: ' + form.items.length + '</h2><b>Offices:</b><ul>';
            var grouped = groupItems(form.items);
            console.log(grouped);
            grouped.forEach(function (office) {
                myHtml += '<li> ' + office.name + ' - Count: ' + office.count + '</li>';
            });
            myHtml += '</ul></div>' + '<canvas id="myChart' + id++ + '" width="400" height="400"></canvas></div>';
        });

        $('#socItems').html(myHtml);
        var graphIndex = 1;
        byFieldOffice.forEach(function (form) {
            var grouped = groupItems(form.items);
            drawGraph(grouped, graphIndex++, form.name)
            
        });

        function drawGraph(coll, index, graphName) {
            var names = [];
            var data = [];
            coll.forEach(function (d) {
                names.push(d.name);
                data.push(d.count);
            });

            var ctx = document.getElementById("myChart" + index);
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: names,
                    datasets: [{
                        label: graphName,
                        data: data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: false,
                    scales: {
                        xAxes: [{
                            ticks: {
                                maxRotation: 90,
                                minRotation: 80
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }


        function groupItems(items) {
            if (items.length == 0) {
                return [];
            }

            var ret = [];
            var prev = items[0];
            var count = 0;
            for (var i = 0; i < items.length; i++) {
                if (prev === items[i]) {
                    count++;
                    if (i == items.length - 1) {
                        ret.push({ name: prev, count: count });
                    }
                } else {
                    ret.push({ name: prev, count: count });
                    count = 1;
                    prev = items[i];
                    if (i == items.length - 1) {
                        ret.push({ name: prev, count: count });
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

<style>
        div#socItems {
            display: table;
            width: 100%;
        }

        .bulletted-list {
            display: table-cell
        }
    </style>

    <div id="socItems"></div>


    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.1.6/Chart.js"></script>

    <script src="./custom.js"></script>
