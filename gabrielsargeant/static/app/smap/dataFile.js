
function buildTableFromMapDataResponse(response) {

    var tableString = "<table class='dataTable'>"

    results = buildTableHeaderString(response.Metadata, response.MapData[0].KVPairs)

    tableString += results[0]
    headerSequenceMap = results[1];
    console.log(headerSequenceMap)

    //Do something with the partition


    response.MapData.forEach(function (obj) {
        row = "<tr><td id='RegionID'>" + obj.RegionName + " (" + obj.RegionID + ")</td>"

        var i = 0;
        for (const [key, value] of Object.entries(obj.KVPairs)) {

            row += "<td id='" + headerSequenceMap[i] + "'>" + value + "</td>"
            i++;
        }
        row += "</tr>"
        tableString += row
    });

    tableString += "</table>"
    return tableString

}

function buildTableHeaderString(metadata, metadataMap) {
    var header = "<tr><th id='RegionID'>Region Name (Region ID)</th>"
    var headerSequenceMap = {};
    var sequence = 0;

    for (const [key, value] of Object.entries(metadataMap)) {
        //console.log(key, value);

        headerSequenceMap[sequence] = key;
        var val = metadata[key]

        header += "<th id='" + key + "'>"
        // header += "<input id='" + key + "' type='button' value='Visualize this data' onclick='visualizeCol(this.id)'/></th>"
        header += "<a id='" + key + "' href='#' onclick='visualizeCol(this.id)'>" + val + "</a></th>"
        sequence++
    }

    header += "</tr>"
    return [header, headerSequenceMap]
}

var mockdataResponse = {
    "MapData": [{
        "RegionID": "2",
        "PartitionID": "G02",
        "GeoLevel": "STE",
        "KVPairs": {
            "Average_household_size": 2.6,
            "Average_num_psns_per_bedroom": 0.9,
            "Median_age_persons": 37,
            "Median_mortgage_repay_monthly": 1728,
            "Median_rent_weekly": 325,
            "Median_tot_fam_inc_weekly": 1715,
            "Median_tot_hhd_inc_weekly": 1419,
            "Median_tot_prsnl_inc_weekly": 644
        }
    }, {
        "RegionID": "8",
        "PartitionID": "G02",
        "GeoLevel": "STE",
        "KVPairs": {
            "Average_household_size": 2.5,
            "Average_num_psns_per_bedroom": 0.8,
            "Median_age_persons": 35,
            "Median_mortgage_repay_monthly": 2058,
            "Median_rent_weekly": 380,
            "Median_tot_fam_inc_weekly": 2445,
            "Median_tot_hhd_inc_weekly": 2070,
            "Median_tot_prsnl_inc_weekly": 998
        }
    }, {
        "RegionID": "5",
        "PartitionID": "G02",
        "GeoLevel": "STE",
        "KVPairs": {

            "Average_household_size": 2.6,
            "Average_num_psns_per_bedroom": 0.8,
            "Median_age_persons": 36,
            "Median_mortgage_repay_monthly": 1993,
            "Median_rent_weekly": 347,
            "Median_tot_fam_inc_weekly": 1910,
            "Median_tot_hhd_inc_weekly": 1595,
            "Median_tot_prsnl_inc_weekly": 724
        }
    }, {
        "RegionID": "7",
        "PartitionID": "G02",
        "GeoLevel": "STE",
        "KVPairs": {
            "Average_household_size": 2.9,
            "Average_num_psns_per_bedroom": 1,
            "Median_age_persons": 32,
            "Median_mortgage_repay_monthly": 2167,
            "Median_rent_weekly": 315,
            "Median_tot_fam_inc_weekly": 2105,
            "Median_tot_hhd_inc_weekly": 1983,
            "Median_tot_prsnl_inc_weekly": 871
        }
    }, {
        "RegionID": "6",
        "PartitionID": "G02",
        "GeoLevel": "STE",
        "KVPairs": {
            "Average_household_size": 2.3,
            "Average_num_psns_per_bedroom": 0.8,
            "Median_age_persons": 42,
            "Median_mortgage_repay_monthly": 1300,
            "Median_rent_weekly": 230,
            "Median_tot_fam_inc_weekly": 1399,
            "Median_tot_hhd_inc_weekly": 1100,
            "Median_tot_prsnl_inc_weekly": 573
        }
    }, {
        "RegionID": "4",
        "PartitionID": "G02",
        "GeoLevel": "STE",
        "KVPairs": {
            "Average_household_size": 2.4,
            "Average_num_psns_per_bedroom": 0.8,
            "Median_age_persons": 40,
            "Median_mortgage_repay_monthly": 1491,
            "Median_rent_weekly": 260,
            "Median_tot_fam_inc_weekly": 1510,
            "Median_tot_hhd_inc_weekly": 1206,
            "Median_tot_prsnl_inc_weekly": 600
        }
    }, {
        "RegionID": "9",
        "PartitionID": "G02",
        "GeoLevel": "STE",
        "KVPairs": {
            "Average_household_size": 2.6,
            "Average_num_psns_per_bedroom": 0.9,
            "Median_age_persons": 42,
            "Median_mortgage_repay_monthly": 1400,
            "Median_rent_weekly": 140,
            "Median_tot_fam_inc_weekly": 1568,
            "Median_tot_hhd_inc_weekly": 1377,
            "Median_tot_prsnl_inc_weekly": 712
        }
    }, {
        "RegionID": "3",
        "PartitionID": "G02",
        "GeoLevel": "STE",
        "KVPairs": {
            "Average_household_size": 2.6,
            "Average_num_psns_per_bedroom": 0.8,
            "Median_age_persons": 37,
            "Median_mortgage_repay_monthly": 1733,
            "Median_rent_weekly": 330,
            "Median_tot_fam_inc_weekly": 1661,
            "Median_tot_hhd_inc_weekly": 1402,
            "Median_tot_prsnl_inc_weekly": 660
        }
    }, {
        "RegionID": "1",
        "PartitionID": "G02",
        "GeoLevel": "STE",
        "KVPairs": {
            "Average_household_size": 2.6,
            "Average_num_psns_per_bedroom": 0.9,
            "Median_age_persons": 38,
            "Median_mortgage_repay_monthly": 1986,
            "Median_rent_weekly": 380,
            "Median_tot_fam_inc_weekly": 1780,
            "Median_tot_hhd_inc_weekly": 1486,
            "Median_tot_prsnl_inc_weekly": 664
        }
    }],
    "Metadata": {
        "Average_household_size": "Average household size",
        "Average_num_psns_per_bedroom": "Average number of Persons per bedroom",
        "Median_age_persons": "Median age of persons",
        "Median_mortgage_repay_monthly": "Median mortgage repayment monthly",
        "Median_rent_weekly": "Median rent weekly",
        "Median_tot_fam_inc_weekly": "Median total family income weekly",
        "Median_tot_hhd_inc_weekly": "Median total household income weekly",
        "Median_tot_prsnl_inc_weekly": "Median total personal income weekly"
    }
}