/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9029513888888889, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "100_users_recent"], "isController": false}, {"data": [0.8041666666666667, 500, 1500, "200_users_unpopular"], "isController": false}, {"data": [0.7741666666666667, 500, 1500, "200_users_login"], "isController": false}, {"data": [1.0, 500, 1500, "10_users_view_page"], "isController": false}, {"data": [1.0, 500, 1500, "100_users_view_page"], "isController": false}, {"data": [0.93, 500, 1500, "50_users_recent"], "isController": false}, {"data": [0.975, 500, 1500, "100_users_input_data"], "isController": true}, {"data": [0.8433333333333334, 500, 1500, "200_users_recent"], "isController": false}, {"data": [0.9966666666666667, 500, 1500, "100_users_posts"], "isController": true}, {"data": [1.0, 500, 1500, "10_users_popular"], "isController": false}, {"data": [1.0, 500, 1500, "50_users_view_page"], "isController": false}, {"data": [0.7766666666666666, 500, 1500, "200_users_posts"], "isController": true}, {"data": [0.7741666666666667, 500, 1500, "200_users_input_data"], "isController": true}, {"data": [0.9833333333333333, 500, 1500, "10_users_input_data"], "isController": true}, {"data": [1.0, 500, 1500, "10_users_posts"], "isController": true}, {"data": [0.8933333333333333, 500, 1500, "50_users_posts"], "isController": true}, {"data": [1.0, 500, 1500, "10_users_recent"], "isController": false}, {"data": [0.9983333333333333, 500, 1500, "100_users_unpopular"], "isController": false}, {"data": [0.9166666666666666, 500, 1500, "50_users_unpopular"], "isController": false}, {"data": [0.93, 500, 1500, "50_users_popular"], "isController": false}, {"data": [1.0, 500, 1500, "100_users_popular"], "isController": false}, {"data": [1.0, 500, 1500, "JSR223 Sampler - Script Report 100 users"], "isController": false}, {"data": [1.0, 500, 1500, "10_users_unpopular"], "isController": false}, {"data": [0.8466666666666667, 500, 1500, "50_users_login"], "isController": false}, {"data": [0.9766666666666667, 500, 1500, "100_users_login"], "isController": false}, {"data": [1.0, 500, 1500, "200_users_view_page"], "isController": false}, {"data": [1.0, 500, 1500, "JSR223 Sampler - Script Report 50 users"], "isController": false}, {"data": [0.8466666666666667, 500, 1500, "50_users_input_data"], "isController": true}, {"data": [1.0, 500, 1500, "JSR223 Sampler - Script Report 200 users"], "isController": false}, {"data": [0.9333333333333333, 500, 1500, "JSR223 Sampler - Script Report 10 users"], "isController": false}, {"data": [0.9833333333333333, 500, 1500, "10_users_login"], "isController": false}, {"data": [0.8208333333333333, 500, 1500, "200_users_popular"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 12960, 0, 0.0, 340.18611111111056, 0, 8822, 11.0, 424.6999999999989, 2868.7999999999956, 5581.0, 9.890932624890196, 32.54473564937102, 3.551334207439416], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["100_users_recent", 600, 0, 0.0, 14.503333333333334, 7, 273, 11.0, 18.0, 24.899999999999864, 80.70000000000027, 0.5589996142902661, 3.0259129511825638, 0.2571179866510892], "isController": false}, {"data": ["200_users_unpopular", 1200, 0, 0.0, 782.1516666666661, 7, 8822, 13.0, 3699.800000000001, 4957.100000000008, 6798.720000000001, 1.1142288886123952, 6.012338460024253, 0.5157661066428469], "isController": false}, {"data": ["200_users_login", 1200, 0, 0.0, 1206.198333333333, 231, 8822, 268.0, 4762.0, 5903.600000000003, 7852.6, 1.1140695847862656, 1.6754562114949698, 0.7289322478582012], "isController": false}, {"data": ["10_users_view_page", 60, 0, 0.0, 2.8000000000000007, 1, 6, 3.0, 4.899999999999999, 5.0, 6.0, 0.05966207401279155, 0.12445135751105738, 0.006933385554220893], "isController": false}, {"data": ["100_users_view_page", 600, 0, 0.0, 2.8233333333333333, 1, 32, 2.0, 4.0, 5.0, 8.0, 0.5589787830286589, 1.1659948052238431, 0.06495944841836954], "isController": false}, {"data": ["50_users_recent", 300, 0, 0.0, 170.81999999999996, 7, 3505, 13.0, 427.2000000000088, 1399.0, 3365.0, 0.29594058302267795, 1.6019518082956092, 0.13612110801140753], "isController": false}, {"data": ["100_users_input_data", 600, 0, 0.0, 298.8566666666668, 233, 2676, 259.0, 348.9, 494.549999999998, 1171.650000000003, 0.5586430931695641, 2.0054414164954273, 0.43043886768631445], "isController": true}, {"data": ["200_users_recent", 1200, 0, 0.0, 531.2866666666666, 7, 7224, 13.0, 2726.8, 4022.700000000004, 5229.310000000002, 1.1140251119827327, 6.030313667695593, 0.5124080349061202], "isController": false}, {"data": ["100_users_posts", 600, 0, 0.0, 46.13333333333332, 24, 1238, 34.5, 54.0, 67.89999999999986, 349.30000000000155, 0.5589829491567742, 9.025245533260417, 0.7735144911671378], "isController": true}, {"data": ["10_users_popular", 60, 0, 0.0, 13.96666666666667, 8, 51, 11.0, 20.9, 24.0, 51.0, 0.059661184135295656, 0.3186979269727219, 0.027500077062362842], "isController": false}, {"data": ["50_users_view_page", 300, 0, 0.0, 3.726666666666666, 1, 47, 3.0, 5.0, 7.0, 32.0, 0.2959481735558469, 0.6173293932766494, 0.03439241470033767], "isController": false}, {"data": ["200_users_posts", 1200, 0, 0.0, 1969.4133333333323, 23, 20713, 38.0, 10046.900000000003, 13273.000000000002, 17033.82, 1.1139744379998961, 17.997493586524254, 1.5415056432088405], "isController": true}, {"data": ["200_users_input_data", 1200, 0, 0.0, 1210.2316666666661, 234, 8828, 271.0, 4767.8, 6073.400000000008, 7854.610000000001, 1.1140654476314968, 3.9993208842708814, 0.858396131036378], "isController": true}, {"data": ["10_users_input_data", 60, 0, 0.0, 306.33333333333314, 239, 1172, 262.5, 359.5, 385.0, 1172.0, 0.059566179514595204, 0.2138332772418476, 0.04589620667677306], "isController": true}, {"data": ["10_users_posts", 60, 0, 0.0, 45.56666666666666, 29, 137, 40.5, 59.0, 62.0, 137.0, 0.05965928581868946, 0.9636372924229724, 0.08255586719246384], "isController": true}, {"data": ["50_users_posts", 300, 0, 0.0, 553.8066666666665, 23, 8410, 44.0, 1877.600000000022, 5194.0, 7421.0, 0.29593357672225945, 4.779365797082292, 0.4095096466947672], "isController": true}, {"data": ["10_users_recent", 60, 0, 0.0, 14.099999999999998, 8, 75, 11.5, 16.9, 20.0, 75.0, 0.059661184135295656, 0.32295111685736705, 0.02744181418723072], "isController": false}, {"data": ["100_users_unpopular", 600, 0, 0.0, 17.956666666666656, 8, 950, 11.0, 17.0, 21.0, 304.3600000000024, 0.5589912815993113, 3.0134943406790997, 0.2587518237090562], "isController": false}, {"data": ["50_users_unpopular", 300, 0, 0.0, 206.40000000000003, 8, 3400, 14.0, 678.6000000000015, 2118.0, 2844.0, 0.29594437824059094, 1.5966931360140633, 0.13698987820902356], "isController": false}, {"data": ["50_users_popular", 300, 0, 0.0, 176.57999999999998, 8, 3497, 14.0, 591.1000000000054, 1324.0, 2725.0, 0.2959446701844623, 1.5808763143642666, 0.1364119964131506], "isController": false}, {"data": ["100_users_popular", 600, 0, 0.0, 13.67333333333333, 8, 119, 11.0, 18.899999999999977, 23.0, 79.63000000000034, 0.5589980518917892, 2.986054046726647, 0.25766316454387156], "isController": false}, {"data": ["JSR223 Sampler - Script Report 100 users", 600, 0, 0.0, 1.4099999999999997, 0, 60, 1.0, 2.0, 3.0, 36.75000000000023, 0.5587544246366002, 0.0, 0.0], "isController": false}, {"data": ["10_users_unpopular", 60, 0, 0.0, 17.500000000000004, 9, 40, 15.0, 36.8, 38.0, 40.0, 0.0596613027840947, 0.3220195512575111, 0.027616657734043832], "isController": false}, {"data": ["50_users_login", 300, 0, 0.0, 621.206666666667, 239, 5422, 299.0, 1601.5000000000086, 2897.0, 4146.0, 0.2958393158617208, 0.444914596120166, 0.19356673987046183], "isController": false}, {"data": ["100_users_login", 600, 0, 0.0, 296.03000000000014, 231, 2672, 256.0, 346.0, 491.549999999998, 1169.640000000003, 0.5586477744403746, 0.8401538795294696, 0.365521493042042], "isController": false}, {"data": ["200_users_view_page", 1200, 0, 0.0, 4.031666666666665, 1, 271, 3.0, 5.0, 7.0, 17.0, 1.114627347567744, 2.32504298281709, 0.12953188902398585], "isController": false}, {"data": ["JSR223 Sampler - Script Report 50 users", 300, 0, 0.0, 3.3333333333333344, 0, 110, 1.0, 3.900000000000034, 6.0, 100.0, 0.2959005931820558, 0.0, 0.0], "isController": false}, {"data": ["50_users_input_data", 300, 0, 0.0, 624.9333333333333, 241, 5426, 302.0, 1634.4000000000096, 2900.0, 4149.0, 0.2958384406553019, 1.0620137771961813, 0.2279458297627277], "isController": true}, {"data": ["JSR223 Sampler - Script Report 200 users", 1200, 0, 0.0, 1.649999999999999, 0, 68, 1.0, 2.0, 4.0, 30.980000000000018, 1.116913892454223, 0.0, 0.0], "isController": false}, {"data": ["JSR223 Sampler - Script Report 10 users", 60, 0, 0.0, 128.13333333333335, 0, 1872, 1.0, 832.0999999999987, 1010.0, 1872.0, 0.05947265595960617, 0.0, 0.0], "isController": false}, {"data": ["10_users_login", 60, 0, 0.0, 303.5333333333333, 237, 1170, 259.5, 355.6, 382.0, 1170.0, 0.059589369653716244, 0.0896168254557842, 0.03898913834764637], "isController": false}, {"data": ["200_users_popular", 1200, 0, 0.0, 655.975, 7, 6745, 13.0, 3389.7000000000085, 4451.900000000003, 6306.68, 1.1140850993903169, 5.957080480811277, 0.5135236005002243], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 12960, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
