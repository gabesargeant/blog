
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

//Helper Function to walk the response dataset.
function getRegionNameFromID(data, regionID) {
    var rtn = "region name not found"
    for (var i = 0; i < data.MapData.length; i++) {
        rtn = data.MapData[i].RegionName;
        if (data.MapData[i].RegionID == regionID) {
            return rtn;
        }
    }
    return rtn;
}

// var mockdataResponse = {
//     "MapData": [
//         {
//             "RegionID": "SSC20384",
//             "RegionName": "Bulleen",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.7,
//                 "Average_num_psns_per_bedroom": 0.8,
//                 "Median_age_persons": 45,
//                 "Median_mortgage_repay_monthly": 2000,
//                 "Median_rent_weekly": 400,
//                 "Median_tot_fam_inc_weekly": 1812,
//                 "Median_tot_hhd_inc_weekly": 1501,
//                 "Median_tot_prsnl_inc_weekly": 603
//             }
//         },
//         {
//             "RegionID": "SSC22302",
//             "RegionName": "South Wharf",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.5,
//                 "Average_num_psns_per_bedroom": 1.3,
//                 "Median_age_persons": 34,
//                 "Median_mortgage_repay_monthly": 2750,
//                 "Median_rent_weekly": 686,
//                 "Median_tot_fam_inc_weekly": 3374,
//                 "Median_tot_hhd_inc_weekly": 3250,
//                 "Median_tot_prsnl_inc_weekly": 1792
//             }
//         },
//         {
//             "RegionID": "SSC21734",
//             "RegionName": "Moorabbin",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.5,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 39,
//                 "Median_mortgage_repay_monthly": 2000,
//                 "Median_rent_weekly": 380,
//                 "Median_tot_fam_inc_weekly": 1906,
//                 "Median_tot_hhd_inc_weekly": 1474,
//                 "Median_tot_prsnl_inc_weekly": 687
//             }
//         },
//         {
//             "RegionID": "SSC22743",
//             "RegionName": "West Melbourne",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.2,
//                 "Average_num_psns_per_bedroom": 1.1,
//                 "Median_age_persons": 30,
//                 "Median_mortgage_repay_monthly": 2006,
//                 "Median_rent_weekly": 450,
//                 "Median_tot_fam_inc_weekly": 2246,
//                 "Median_tot_hhd_inc_weekly": 1766,
//                 "Median_tot_prsnl_inc_weekly": 852
//             }
//         },
//         {
//             "RegionID": "SSC21308",
//             "RegionName": "Keilor East",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.7,
//                 "Average_num_psns_per_bedroom": 0.8,
//                 "Median_age_persons": 43,
//                 "Median_mortgage_repay_monthly": 2000,
//                 "Median_rent_weekly": 360,
//                 "Median_tot_fam_inc_weekly": 1752,
//                 "Median_tot_hhd_inc_weekly": 1484,
//                 "Median_tot_prsnl_inc_weekly": 610
//             }
//         },
//         {
//             "RegionID": "SSC22308",
//             "RegionName": "Spotswood",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.5,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 37,
//                 "Median_mortgage_repay_monthly": 2167,
//                 "Median_rent_weekly": 396,
//                 "Median_tot_fam_inc_weekly": 2384,
//                 "Median_tot_hhd_inc_weekly": 1976,
//                 "Median_tot_prsnl_inc_weekly": 938
//             }
//         },
//         {
//             "RegionID": "SSC20923",
//             "RegionName": "Flemington",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.2,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 33,
//                 "Median_mortgage_repay_monthly": 2000,
//                 "Median_rent_weekly": 250,
//                 "Median_tot_fam_inc_weekly": 1553,
//                 "Median_tot_hhd_inc_weekly": 1171,
//                 "Median_tot_prsnl_inc_weekly": 604
//             }
//         },
//         {
//             "RegionID": "SSC20361",
//             "RegionName": "Brunswick West",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.2,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 34,
//                 "Median_mortgage_repay_monthly": 2000,
//                 "Median_rent_weekly": 323,
//                 "Median_tot_fam_inc_weekly": 1970,
//                 "Median_tot_hhd_inc_weekly": 1423,
//                 "Median_tot_prsnl_inc_weekly": 742
//             }
//         },
//         {
//             "RegionID": "SSC22620",
//             "RegionName": "Viewbank",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.8,
//                 "Average_num_psns_per_bedroom": 0.8,
//                 "Median_age_persons": 42,
//                 "Median_mortgage_repay_monthly": 2000,
//                 "Median_rent_weekly": 400,
//                 "Median_tot_fam_inc_weekly": 1979,
//                 "Median_tot_hhd_inc_weekly": 1746,
//                 "Median_tot_prsnl_inc_weekly": 684
//             }
//         },
//         {
//             "RegionID": "SSC20536",
//             "RegionName": "Cheltenham (Vic.)",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.5,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 40,
//                 "Median_mortgage_repay_monthly": 2000,
//                 "Median_rent_weekly": 365,
//                 "Median_tot_fam_inc_weekly": 1997,
//                 "Median_tot_hhd_inc_weekly": 1502,
//                 "Median_tot_prsnl_inc_weekly": 716
//             }
//         },
//         {
//             "RegionID": "SSC21930",
//             "RegionName": "Niddrie",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.6,
//                 "Average_num_psns_per_bedroom": 0.8,
//                 "Median_age_persons": 39,
//                 "Median_mortgage_repay_monthly": 2000,
//                 "Median_rent_weekly": 376,
//                 "Median_tot_fam_inc_weekly": 2198,
//                 "Median_tot_hhd_inc_weekly": 1764,
//                 "Median_tot_prsnl_inc_weekly": 775
//             }
//         },
//         {
//             "RegionID": "SSC20213",
//             "RegionName": "Bentleigh",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.7,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 39,
//                 "Median_mortgage_repay_monthly": 2167,
//                 "Median_rent_weekly": 421,
//                 "Median_tot_fam_inc_weekly": 2279,
//                 "Median_tot_hhd_inc_weekly": 1848,
//                 "Median_tot_prsnl_inc_weekly": 752
//             }
//         },
//         {
//             "RegionID": "SSC22182",
//             "RegionName": "Rosanna",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.6,
//                 "Average_num_psns_per_bedroom": 0.8,
//                 "Median_age_persons": 41,
//                 "Median_mortgage_repay_monthly": 2048,
//                 "Median_rent_weekly": 360,
//                 "Median_tot_fam_inc_weekly": 2183,
//                 "Median_tot_hhd_inc_weekly": 1720,
//                 "Median_tot_prsnl_inc_weekly": 744
//             }
//         },
//         {
//             "RegionID": "SSC21357",
//             "RegionName": "Kingsville",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.3,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 35,
//                 "Median_mortgage_repay_monthly": 2026,
//                 "Median_rent_weekly": 300,
//                 "Median_tot_fam_inc_weekly": 2259,
//                 "Median_tot_hhd_inc_weekly": 1665,
//                 "Median_tot_prsnl_inc_weekly": 855
//             }
//         },
//         {
//             "RegionID": "SSC21144",
//             "RegionName": "Hawthorn East",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.4,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 34,
//                 "Median_mortgage_repay_monthly": 2358,
//                 "Median_rent_weekly": 396,
//                 "Median_tot_fam_inc_weekly": 2709,
//                 "Median_tot_hhd_inc_weekly": 1976,
//                 "Median_tot_prsnl_inc_weekly": 981
//             }
//         },
//         {
//             "RegionID": "SSC22223",
//             "RegionName": "Sandringham (Vic.)",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.5,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 44,
//                 "Median_mortgage_repay_monthly": 2500,
//                 "Median_rent_weekly": 421,
//                 "Median_tot_fam_inc_weekly": 2842,
//                 "Median_tot_hhd_inc_weekly": 2124,
//                 "Median_tot_prsnl_inc_weekly": 927
//             }
//         },
//         {
//             "RegionID": "SSC22004",
//             "RegionName": "Ormond",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.6,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 35,
//                 "Median_mortgage_repay_monthly": 2167,
//                 "Median_rent_weekly": 360,
//                 "Median_tot_fam_inc_weekly": 2194,
//                 "Median_tot_hhd_inc_weekly": 1599,
//                 "Median_tot_prsnl_inc_weekly": 762
//             }
//         },
//         {
//             "RegionID": "SSC22902",
//             "RegionName": "Yarraville",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.5,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 36,
//                 "Median_mortgage_repay_monthly": 2167,
//                 "Median_rent_weekly": 400,
//                 "Median_tot_fam_inc_weekly": 2516,
//                 "Median_tot_hhd_inc_weekly": 2047,
//                 "Median_tot_prsnl_inc_weekly": 924
//             }
//         },
//         {
//             "RegionID": "SSC21837",
//             "RegionName": "Murrumbeena",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.4,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 36,
//                 "Median_mortgage_repay_monthly": 2000,
//                 "Median_rent_weekly": 346,
//                 "Median_tot_fam_inc_weekly": 2194,
//                 "Median_tot_hhd_inc_weekly": 1641,
//                 "Median_tot_prsnl_inc_weekly": 780
//             }
//         },
//         {
//             "RegionID": "SSC21666",
//             "RegionName": "Middle Park (Vic.)",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.3,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 42,
//                 "Median_mortgage_repay_monthly": 3000,
//                 "Median_rent_weekly": 522,
//                 "Median_tot_fam_inc_weekly": 3213,
//                 "Median_tot_hhd_inc_weekly": 2353,
//                 "Median_tot_prsnl_inc_weekly": 1219
//             }
//         },
//         {
//             "RegionID": "SSC22095",
//             "RegionName": "Port Melbourne",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.1,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 40,
//                 "Median_mortgage_repay_monthly": 2500,
//                 "Median_rent_weekly": 496,
//                 "Median_tot_fam_inc_weekly": 2851,
//                 "Median_tot_hhd_inc_weekly": 2190,
//                 "Median_tot_prsnl_inc_weekly": 1223
//             }
//         },
//         {
//             "RegionID": "SSC20451",
//             "RegionName": "Camberwell (Vic.)",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.7,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 41,
//                 "Median_mortgage_repay_monthly": 2500,
//                 "Median_rent_weekly": 440,
//                 "Median_tot_fam_inc_weekly": 2772,
//                 "Median_tot_hhd_inc_weekly": 2196,
//                 "Median_tot_prsnl_inc_weekly": 852
//             }
//         },
//         {
//             "RegionID": "SSC20518",
//             "RegionName": "Caulfield",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.5,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 41,
//                 "Median_mortgage_repay_monthly": 2167,
//                 "Median_rent_weekly": 420,
//                 "Median_tot_fam_inc_weekly": 2301,
//                 "Median_tot_hhd_inc_weekly": 1792,
//                 "Median_tot_prsnl_inc_weekly": 774
//             }
//         },
//         {
//             "RegionID": "SSC20520",
//             "RegionName": "Caulfield North",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.5,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 37,
//                 "Median_mortgage_repay_monthly": 2167,
//                 "Median_rent_weekly": 400,
//                 "Median_tot_fam_inc_weekly": 2634,
//                 "Median_tot_hhd_inc_weekly": 1990,
//                 "Median_tot_prsnl_inc_weekly": 934
//             }
//         },
//         {
//             "RegionID": "SSC20861",
//             "RegionName": "Elwood",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 35,
//                 "Median_mortgage_repay_monthly": 2167,
//                 "Median_rent_weekly": 390,
//                 "Median_tot_fam_inc_weekly": 2626,
//                 "Median_tot_hhd_inc_weekly": 1892,
//                 "Median_tot_prsnl_inc_weekly": 1164
//             }
//         },
//         {
//             "RegionID": "SSC22559",
//             "RegionName": "Travancore",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.1,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 29,
//                 "Median_mortgage_repay_monthly": 1812,
//                 "Median_rent_weekly": 381,
//                 "Median_tot_fam_inc_weekly": 1746,
//                 "Median_tot_hhd_inc_weekly": 1452,
//                 "Median_tot_prsnl_inc_weekly": 751
//             }
//         },
//         {
//             "RegionID": "SSC22167",
//             "RegionName": "Ripponlea",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.2,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 31,
//                 "Median_mortgage_repay_monthly": 2000,
//                 "Median_rent_weekly": 360,
//                 "Median_tot_fam_inc_weekly": 2127,
//                 "Median_tot_hhd_inc_weekly": 1507,
//                 "Median_tot_prsnl_inc_weekly": 892
//             }
//         },
//         {
//             "RegionID": "SSC20824",
//             "RegionName": "East Melbourne",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 1.9,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 38,
//                 "Median_mortgage_repay_monthly": 2192,
//                 "Median_rent_weekly": 451,
//                 "Median_tot_fam_inc_weekly": 3120,
//                 "Median_tot_hhd_inc_weekly": 2285,
//                 "Median_tot_prsnl_inc_weekly": 1341
//             }
//         },
//         {
//             "RegionID": "SSC20492",
//             "RegionName": "Carlton (Vic.)",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 1.9,
//                 "Average_num_psns_per_bedroom": 1.1,
//                 "Median_age_persons": 24,
//                 "Median_mortgage_repay_monthly": 1894,
//                 "Median_rent_weekly": 385,
//                 "Median_tot_fam_inc_weekly": 1372,
//                 "Median_tot_hhd_inc_weekly": 572,
//                 "Median_tot_prsnl_inc_weekly": 336
//             }
//         },
//         {
//             "RegionID": "SSC20336",
//             "RegionName": "Brighton East",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.6,
//                 "Average_num_psns_per_bedroom": 0.8,
//                 "Median_age_persons": 44,
//                 "Median_mortgage_repay_monthly": 2500,
//                 "Median_rent_weekly": 500,
//                 "Median_tot_fam_inc_weekly": 2698,
//                 "Median_tot_hhd_inc_weekly": 2065,
//                 "Median_tot_prsnl_inc_weekly": 837
//             }
//         },
//         {
//             "RegionID": "SSC20722",
//             "RegionName": "Deepdene (Vic.)",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.6,
//                 "Average_num_psns_per_bedroom": 0.8,
//                 "Median_age_persons": 47,
//                 "Median_mortgage_repay_monthly": 2500,
//                 "Median_rent_weekly": 400,
//                 "Median_tot_fam_inc_weekly": 2630,
//                 "Median_tot_hhd_inc_weekly": 1895,
//                 "Median_tot_prsnl_inc_weekly": 778
//             }
//         },
//         {
//             "RegionID": "SSC22384",
//             "RegionName": "Sunshine North",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 3,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 35,
//                 "Median_mortgage_repay_monthly": 1600,
//                 "Median_rent_weekly": 300,
//                 "Median_tot_fam_inc_weekly": 1166,
//                 "Median_tot_hhd_inc_weekly": 1094,
//                 "Median_tot_prsnl_inc_weekly": 441
//             }
//         },
//         {
//             "RegionID": "SSC21385",
//             "RegionName": "Kooyong",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.5,
//                 "Average_num_psns_per_bedroom": 0.8,
//                 "Median_age_persons": 45,
//                 "Median_mortgage_repay_monthly": 2500,
//                 "Median_rent_weekly": 522,
//                 "Median_tot_fam_inc_weekly": 3365,
//                 "Median_tot_hhd_inc_weekly": 2625,
//                 "Median_tot_prsnl_inc_weekly": 1147
//             }
//         },
//         {
//             "RegionID": "SSC21593",
//             "RegionName": "Maribyrnong",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.6,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 33,
//                 "Median_mortgage_repay_monthly": 2000,
//                 "Median_rent_weekly": 380,
//                 "Median_tot_fam_inc_weekly": 2024,
//                 "Median_tot_hhd_inc_weekly": 1765,
//                 "Median_tot_prsnl_inc_weekly": 779
//             }
//         },
//         {
//             "RegionID": "SSC21306",
//             "RegionName": "Keilor",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.8,
//                 "Average_num_psns_per_bedroom": 0.8,
//                 "Median_age_persons": 44,
//                 "Median_mortgage_repay_monthly": 2000,
//                 "Median_rent_weekly": 360,
//                 "Median_tot_fam_inc_weekly": 2023,
//                 "Median_tot_hhd_inc_weekly": 1742,
//                 "Median_tot_prsnl_inc_weekly": 692
//             }
//         },
//         {
//             "RegionID": "SSC21160",
//             "RegionName": "Heidelberg West",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.5,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 34,
//                 "Median_mortgage_repay_monthly": 1517,
//                 "Median_rent_weekly": 246,
//                 "Median_tot_fam_inc_weekly": 1133,
//                 "Median_tot_hhd_inc_weekly": 916,
//                 "Median_tot_prsnl_inc_weekly": 455
//             }
//         },
//         {
//             "RegionID": "SSC22334",
//             "RegionName": "St Kilda West",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 1.9,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 37,
//                 "Median_mortgage_repay_monthly": 2167,
//                 "Median_rent_weekly": 360,
//                 "Median_tot_fam_inc_weekly": 2716,
//                 "Median_tot_hhd_inc_weekly": 1853,
//                 "Median_tot_prsnl_inc_weekly": 1153
//             }
//         },
//         {
//             "RegionID": "SSC22239",
//             "RegionName": "Seaholme",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.5,
//                 "Average_num_psns_per_bedroom": 0.8,
//                 "Median_age_persons": 44,
//                 "Median_mortgage_repay_monthly": 2000,
//                 "Median_rent_weekly": 351,
//                 "Median_tot_fam_inc_weekly": 2121,
//                 "Median_tot_hhd_inc_weekly": 1762,
//                 "Median_tot_prsnl_inc_weekly": 745
//             }
//         },
//         {
//             "RegionID": "SSC21954",
//             "RegionName": "North Melbourne",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.1,
//                 "Average_num_psns_per_bedroom": 1.1,
//                 "Median_age_persons": 28,
//                 "Median_mortgage_repay_monthly": 2100,
//                 "Median_rent_weekly": 385,
//                 "Median_tot_fam_inc_weekly": 1943,
//                 "Median_tot_hhd_inc_weekly": 1236,
//                 "Median_tot_prsnl_inc_weekly": 586
//             }
//         },
//         {
//             "RegionID": "SSC22573",
//             "RegionName": "Tullamarine",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.3,
//                 "Average_num_psns_per_bedroom": 0.8,
//                 "Median_age_persons": 38,
//                 "Median_mortgage_repay_monthly": 1550,
//                 "Median_rent_weekly": 320,
//                 "Median_tot_fam_inc_weekly": 1439,
//                 "Median_tot_hhd_inc_weekly": 1192,
//                 "Median_tot_prsnl_inc_weekly": 624
//             }
//         },
//         {
//             "RegionID": "SSC20493",
//             "RegionName": "Carlton North",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.3,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 33,
//                 "Median_mortgage_repay_monthly": 2000,
//                 "Median_rent_weekly": 500,
//                 "Median_tot_fam_inc_weekly": 2641,
//                 "Median_tot_hhd_inc_weekly": 2039,
//                 "Median_tot_prsnl_inc_weekly": 991
//             }
//         },
//         {
//             "RegionID": "SSC22106",
//             "RegionName": "Prahran",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 1.9,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 33,
//                 "Median_mortgage_repay_monthly": 2200,
//                 "Median_rent_weekly": 401,
//                 "Median_tot_fam_inc_weekly": 2581,
//                 "Median_tot_hhd_inc_weekly": 1850,
//                 "Median_tot_prsnl_inc_weekly": 1094
//             }
//         },
//         {
//             "RegionID": "SSC21328",
//             "RegionName": "Kew (Vic.)",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.6,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 39,
//                 "Median_mortgage_repay_monthly": 2513,
//                 "Median_rent_weekly": 438,
//                 "Median_tot_fam_inc_weekly": 2786,
//                 "Median_tot_hhd_inc_weekly": 2206,
//                 "Median_tot_prsnl_inc_weekly": 923
//             }
//         },
//         {
//             "RegionID": "SSC20076",
//             "RegionName": "Ashburton",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.9,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 39,
//                 "Median_mortgage_repay_monthly": 2500,
//                 "Median_rent_weekly": 400,
//                 "Median_tot_fam_inc_weekly": 2754,
//                 "Median_tot_hhd_inc_weekly": 2251,
//                 "Median_tot_prsnl_inc_weekly": 818
//             }
//         },
//         {
//             "RegionID": "SSC20918",
//             "RegionName": "Fitzroy (Vic.)",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.1,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 33,
//                 "Median_mortgage_repay_monthly": 2286,
//                 "Median_rent_weekly": 400,
//                 "Median_tot_fam_inc_weekly": 2223,
//                 "Median_tot_hhd_inc_weekly": 1715,
//                 "Median_tot_prsnl_inc_weekly": 925
//             }
//         },
//         {
//             "RegionID": "SSC22109",
//             "RegionName": "Preston (Vic.)",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.5,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 36,
//                 "Median_mortgage_repay_monthly": 1950,
//                 "Median_rent_weekly": 350,
//                 "Median_tot_fam_inc_weekly": 1764,
//                 "Median_tot_hhd_inc_weekly": 1427,
//                 "Median_tot_prsnl_inc_weekly": 637
//             }
//         },
//         {
//             "RegionID": "SSC21986",
//             "RegionName": "Oak Park",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.6,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 35,
//                 "Median_mortgage_repay_monthly": 1900,
//                 "Median_rent_weekly": 350,
//                 "Median_tot_fam_inc_weekly": 2023,
//                 "Median_tot_hhd_inc_weekly": 1670,
//                 "Median_tot_prsnl_inc_weekly": 755
//             }
//         },
//         {
//             "RegionID": "SSC20495",
//             "RegionName": "Carnegie",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.3,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 34,
//                 "Median_mortgage_repay_monthly": 2000,
//                 "Median_rent_weekly": 358,
//                 "Median_tot_fam_inc_weekly": 2049,
//                 "Median_tot_hhd_inc_weekly": 1478,
//                 "Median_tot_prsnl_inc_weekly": 727
//             }
//         },
//         {
//             "RegionID": "SSC20122",
//             "RegionName": "Balwyn",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.7,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 42,
//                 "Median_mortgage_repay_monthly": 2500,
//                 "Median_rent_weekly": 410,
//                 "Median_tot_fam_inc_weekly": 2153,
//                 "Median_tot_hhd_inc_weekly": 1715,
//                 "Median_tot_prsnl_inc_weekly": 710
//             }
//         },
//         {
//             "RegionID": "SSC22742",
//             "RegionName": "West Footscray",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.5,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 34,
//                 "Median_mortgage_repay_monthly": 1950,
//                 "Median_rent_weekly": 301,
//                 "Median_tot_fam_inc_weekly": 1843,
//                 "Median_tot_hhd_inc_weekly": 1449,
//                 "Median_tot_prsnl_inc_weekly": 694
//             }
//         },
//         {
//             "RegionID": "SSC21124",
//             "RegionName": "Hampton East",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.4,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 40,
//                 "Median_mortgage_repay_monthly": 2300,
//                 "Median_rent_weekly": 317,
//                 "Median_tot_fam_inc_weekly": 2154,
//                 "Median_tot_hhd_inc_weekly": 1425,
//                 "Median_tot_prsnl_inc_weekly": 706
//             }
//         },
//         {
//             "RegionID": "SSC20002",
//             "RegionName": "Abbotsford (Vic.)",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.1,
//                 "Average_num_psns_per_bedroom": 1.1,
//                 "Median_age_persons": 32,
//                 "Median_mortgage_repay_monthly": 2142,
//                 "Median_rent_weekly": 426,
//                 "Median_tot_fam_inc_weekly": 2459,
//                 "Median_tot_hhd_inc_weekly": 2001,
//                 "Median_tot_prsnl_inc_weekly": 1068
//             }
//         },
//         {
//             "RegionID": "SSC20335",
//             "RegionName": "Brighton (Vic.)",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.5,
//                 "Average_num_psns_per_bedroom": 0.8,
//                 "Median_age_persons": 45,
//                 "Median_mortgage_repay_monthly": 2913,
//                 "Median_rent_weekly": 522,
//                 "Median_tot_fam_inc_weekly": 3337,
//                 "Median_tot_hhd_inc_weekly": 2410,
//                 "Median_tot_prsnl_inc_weekly": 1048
//             }
//         },
//         {
//             "RegionID": "SSC22110",
//             "RegionName": "Princes Hill",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.3,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 36,
//                 "Median_mortgage_repay_monthly": 2383,
//                 "Median_rent_weekly": 420,
//                 "Median_tot_fam_inc_weekly": 2426,
//                 "Median_tot_hhd_inc_weekly": 1857,
//                 "Median_tot_prsnl_inc_weekly": 889
//             }
//         },
//         {
//             "RegionID": "SSC20197",
//             "RegionName": "Bellfield (Banyule - Vic.)",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.6,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 35,
//                 "Median_mortgage_repay_monthly": 2000,
//                 "Median_rent_weekly": 323,
//                 "Median_tot_fam_inc_weekly": 1571,
//                 "Median_tot_hhd_inc_weekly": 1327,
//                 "Median_tot_prsnl_inc_weekly": 536
//             }
//         },
//         {
//             "RegionID": "SSC21629",
//             "RegionName": "Melbourne",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 1.9,
//                 "Average_num_psns_per_bedroom": 1.2,
//                 "Median_age_persons": 27,
//                 "Median_mortgage_repay_monthly": 1800,
//                 "Median_rent_weekly": 456,
//                 "Median_tot_fam_inc_weekly": 1716,
//                 "Median_tot_hhd_inc_weekly": 1148,
//                 "Median_tot_prsnl_inc_weekly": 532
//             }
//         },
//         {
//             "RegionID": "SSC20074",
//             "RegionName": "Ascot Vale",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.4,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 35,
//                 "Median_mortgage_repay_monthly": 2178,
//                 "Median_rent_weekly": 326,
//                 "Median_tot_fam_inc_weekly": 2313,
//                 "Median_tot_hhd_inc_weekly": 1757,
//                 "Median_tot_prsnl_inc_weekly": 824
//             }
//         },
//         {
//             "RegionID": "SSC20880",
//             "RegionName": "Essendon Fields",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 0,
//                 "Average_num_psns_per_bedroom": 0,
//                 "Median_age_persons": 0,
//                 "Median_mortgage_repay_monthly": 0,
//                 "Median_rent_weekly": 0,
//                 "Median_tot_fam_inc_weekly": 0,
//                 "Median_tot_hhd_inc_weekly": 0,
//                 "Median_tot_prsnl_inc_weekly": 0
//             }
//         },
//         {
//             "RegionID": "SSC22369",
//             "RegionName": "Strathmore (Vic.)",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.9,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 40,
//                 "Median_mortgage_repay_monthly": 2167,
//                 "Median_rent_weekly": 400,
//                 "Median_tot_fam_inc_weekly": 2445,
//                 "Median_tot_hhd_inc_weekly": 2107,
//                 "Median_tot_prsnl_inc_weekly": 828
//             }
//         },
//         {
//             "RegionID": "SSC20858",
//             "RegionName": "Elsternwick",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.4,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 37,
//                 "Median_mortgage_repay_monthly": 2167,
//                 "Median_rent_weekly": 391,
//                 "Median_tot_fam_inc_weekly": 2595,
//                 "Median_tot_hhd_inc_weekly": 1921,
//                 "Median_tot_prsnl_inc_weekly": 972
//             }
//         },
//         {
//             "RegionID": "SSC20033",
//             "RegionName": "Alphington",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.5,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 38,
//                 "Median_mortgage_repay_monthly": 2037,
//                 "Median_rent_weekly": 370,
//                 "Median_tot_fam_inc_weekly": 2802,
//                 "Median_tot_hhd_inc_weekly": 2123,
//                 "Median_tot_prsnl_inc_weekly": 915
//             }
//         },
//         {
//             "RegionID": "SSC21176",
//             "RegionName": "Highett",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.4,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 39,
//                 "Median_mortgage_repay_monthly": 2100,
//                 "Median_rent_weekly": 375,
//                 "Median_tot_fam_inc_weekly": 2173,
//                 "Median_tot_hhd_inc_weekly": 1613,
//                 "Median_tot_prsnl_inc_weekly": 794
//             }
//         },
//         {
//             "RegionID": "SSC20958",
//             "RegionName": "Gardenvale",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.1,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 37,
//                 "Median_mortgage_repay_monthly": 2500,
//                 "Median_rent_weekly": 280,
//                 "Median_tot_fam_inc_weekly": 2353,
//                 "Median_tot_hhd_inc_weekly": 1509,
//                 "Median_tot_prsnl_inc_weekly": 892
//             }
//         },
//         {
//             "RegionID": "SSC20819",
//             "RegionName": "Eaglemont",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.7,
//                 "Average_num_psns_per_bedroom": 0.8,
//                 "Median_age_persons": 44,
//                 "Median_mortgage_repay_monthly": 2500,
//                 "Median_rent_weekly": 396,
//                 "Median_tot_fam_inc_weekly": 2903,
//                 "Median_tot_hhd_inc_weekly": 2348,
//                 "Median_tot_prsnl_inc_weekly": 946
//             }
//         },
//         {
//             "RegionID": "SSC20919",
//             "RegionName": "Fitzroy North",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.2,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 36,
//                 "Median_mortgage_repay_monthly": 2167,
//                 "Median_rent_weekly": 440,
//                 "Median_tot_fam_inc_weekly": 2603,
//                 "Median_tot_hhd_inc_weekly": 1920,
//                 "Median_tot_prsnl_inc_weekly": 1001
//             }
//         },
//         {
//             "RegionID": "SSC21237",
//             "RegionName": "Ivanhoe (Vic.)",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.5,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 40,
//                 "Median_mortgage_repay_monthly": 2167,
//                 "Median_rent_weekly": 371,
//                 "Median_tot_fam_inc_weekly": 2437,
//                 "Median_tot_hhd_inc_weekly": 1914,
//                 "Median_tot_prsnl_inc_weekly": 875
//             }
//         },
//         {
//             "RegionID": "SSC22030",
//             "RegionName": "Pascoe Vale South",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.8,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 38,
//                 "Median_mortgage_repay_monthly": 2000,
//                 "Median_rent_weekly": 380,
//                 "Median_tot_fam_inc_weekly": 2153,
//                 "Median_tot_hhd_inc_weekly": 1828,
//                 "Median_tot_prsnl_inc_weekly": 721
//             }
//         },
//         {
//             "RegionID": "SSC21002",
//             "RegionName": "Glen Huntly",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.3,
//                 "Average_num_psns_per_bedroom": 1.1,
//                 "Median_age_persons": 32,
//                 "Median_mortgage_repay_monthly": 1800,
//                 "Median_rent_weekly": 360,
//                 "Median_tot_fam_inc_weekly": 1945,
//                 "Median_tot_hhd_inc_weekly": 1498,
//                 "Median_tot_prsnl_inc_weekly": 739
//             }
//         },
//         {
//             "RegionID": "SSC22534",
//             "RegionName": "Toorak",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.2,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 45,
//                 "Median_mortgage_repay_monthly": 2500,
//                 "Median_rent_weekly": 431,
//                 "Median_tot_fam_inc_weekly": 3339,
//                 "Median_tot_hhd_inc_weekly": 2311,
//                 "Median_tot_prsnl_inc_weekly": 1217
//             }
//         },
//         {
//             "RegionID": "SSC21565",
//             "RegionName": "Maidstone",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.6,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 32,
//                 "Median_mortgage_repay_monthly": 1950,
//                 "Median_rent_weekly": 342,
//                 "Median_tot_fam_inc_weekly": 1705,
//                 "Median_tot_hhd_inc_weekly": 1457,
//                 "Median_tot_prsnl_inc_weekly": 645
//             }
//         },
//         {
//             "RegionID": "SSC22779",
//             "RegionName": "Williamstown North",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.3,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 42,
//                 "Median_mortgage_repay_monthly": 1915,
//                 "Median_rent_weekly": 300,
//                 "Median_tot_fam_inc_weekly": 2283,
//                 "Median_tot_hhd_inc_weekly": 1451,
//                 "Median_tot_prsnl_inc_weekly": 765
//             }
//         },
//         {
//             "RegionID": "SSC20416",
//             "RegionName": "Burnley",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.2,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 32,
//                 "Median_mortgage_repay_monthly": 2113,
//                 "Median_rent_weekly": 401,
//                 "Median_tot_fam_inc_weekly": 2555,
//                 "Median_tot_hhd_inc_weekly": 2013,
//                 "Median_tot_prsnl_inc_weekly": 1127
//             }
//         },
//         {
//             "RegionID": "SSC22298",
//             "RegionName": "South Kingsville",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.3,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 36,
//                 "Median_mortgage_repay_monthly": 2000,
//                 "Median_rent_weekly": 325,
//                 "Median_tot_fam_inc_weekly": 2245,
//                 "Median_tot_hhd_inc_weekly": 1622,
//                 "Median_tot_prsnl_inc_weekly": 914
//             }
//         },
//         {
//             "RegionID": "SSC20929",
//             "RegionName": "Footscray",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.2,
//                 "Average_num_psns_per_bedroom": 1.1,
//                 "Median_age_persons": 32,
//                 "Median_mortgage_repay_monthly": 1842,
//                 "Median_rent_weekly": 310,
//                 "Median_tot_fam_inc_weekly": 1660,
//                 "Median_tot_hhd_inc_weekly": 1314,
//                 "Median_tot_prsnl_inc_weekly": 623
//             }
//         },
//         {
//             "RegionID": "SSC22496",
//             "RegionName": "Thornbury",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.3,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 36,
//                 "Median_mortgage_repay_monthly": 2000,
//                 "Median_rent_weekly": 340,
//                 "Median_tot_fam_inc_weekly": 2060,
//                 "Median_tot_hhd_inc_weekly": 1535,
//                 "Median_tot_prsnl_inc_weekly": 776
//             }
//         },
//         {
//             "RegionID": "SSC20088",
//             "RegionName": "Avondale Heights",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.7,
//                 "Average_num_psns_per_bedroom": 0.8,
//                 "Median_age_persons": 44,
//                 "Median_mortgage_repay_monthly": 1950,
//                 "Median_rent_weekly": 346,
//                 "Median_tot_fam_inc_weekly": 1531,
//                 "Median_tot_hhd_inc_weekly": 1318,
//                 "Median_tot_prsnl_inc_weekly": 526
//             }
//         },
//         {
//             "RegionID": "SSC22385",
//             "RegionName": "Sunshine West",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.9,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 36,
//                 "Median_mortgage_repay_monthly": 1500,
//                 "Median_rent_weekly": 300,
//                 "Median_tot_fam_inc_weekly": 1214,
//                 "Median_tot_hhd_inc_weekly": 1147,
//                 "Median_tot_prsnl_inc_weekly": 445
//             }
//         },
//         {
//             "RegionID": "SSC22299",
//             "RegionName": "South Melbourne",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 36,
//                 "Median_mortgage_repay_monthly": 2167,
//                 "Median_rent_weekly": 438,
//                 "Median_tot_fam_inc_weekly": 2650,
//                 "Median_tot_hhd_inc_weekly": 1842,
//                 "Median_tot_prsnl_inc_weekly": 1049
//             }
//         },
//         {
//             "RegionID": "SSC20123",
//             "RegionName": "Balwyn North",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 3,
//                 "Average_num_psns_per_bedroom": 0.8,
//                 "Median_age_persons": 41,
//                 "Median_mortgage_repay_monthly": 2500,
//                 "Median_rent_weekly": 480,
//                 "Median_tot_fam_inc_weekly": 2268,
//                 "Median_tot_hhd_inc_weekly": 1996,
//                 "Median_tot_prsnl_inc_weekly": 703
//             }
//         },
//         {
//             "RegionID": "SSC20895",
//             "RegionName": "Fairfield (Vic.)",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.3,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 35,
//                 "Median_mortgage_repay_monthly": 2052,
//                 "Median_rent_weekly": 329,
//                 "Median_tot_fam_inc_weekly": 2332,
//                 "Median_tot_hhd_inc_weekly": 1710,
//                 "Median_tot_prsnl_inc_weekly": 830
//             }
//         },
//         {
//             "RegionID": "SSC20214",
//             "RegionName": "Bentleigh East",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.7,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 40,
//                 "Median_mortgage_repay_monthly": 2117,
//                 "Median_rent_weekly": 425,
//                 "Median_tot_fam_inc_weekly": 2057,
//                 "Median_tot_hhd_inc_weekly": 1735,
//                 "Median_tot_prsnl_inc_weekly": 712
//             }
//         },
//         {
//             "RegionID": "SSC21319",
//             "RegionName": "Kensington (Vic.)",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.2,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 33,
//                 "Median_mortgage_repay_monthly": 2019,
//                 "Median_rent_weekly": 392,
//                 "Median_tot_fam_inc_weekly": 2480,
//                 "Median_tot_hhd_inc_weekly": 1956,
//                 "Median_tot_prsnl_inc_weekly": 1012
//             }
//         },
//         {
//             "RegionID": "SSC21329",
//             "RegionName": "Kew East",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.8,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 40,
//                 "Median_mortgage_repay_monthly": 2500,
//                 "Median_rent_weekly": 430,
//                 "Median_tot_fam_inc_weekly": 2604,
//                 "Median_tot_hhd_inc_weekly": 2149,
//                 "Median_tot_prsnl_inc_weekly": 836
//             }
//         },
//         {
//             "RegionID": "SSC20879",
//             "RegionName": "Essendon",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.5,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 37,
//                 "Median_mortgage_repay_monthly": 2167,
//                 "Median_rent_weekly": 341,
//                 "Median_tot_fam_inc_weekly": 2366,
//                 "Median_tot_hhd_inc_weekly": 1775,
//                 "Median_tot_prsnl_inc_weekly": 859
//             }
//         },
//         {
//             "RegionID": "SSC20003",
//             "RegionName": "Aberfeldie",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.9,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 40,
//                 "Median_mortgage_repay_monthly": 2200,
//                 "Median_rent_weekly": 351,
//                 "Median_tot_fam_inc_weekly": 2602,
//                 "Median_tot_hhd_inc_weekly": 2200,
//                 "Median_tot_prsnl_inc_weekly": 877
//             }
//         },
//         {
//             "RegionID": "SSC22383",
//             "RegionName": "Sunshine (Vic.)",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.7,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 34,
//                 "Median_mortgage_repay_monthly": 1600,
//                 "Median_rent_weekly": 300,
//                 "Median_tot_fam_inc_weekly": 1305,
//                 "Median_tot_hhd_inc_weekly": 1185,
//                 "Median_tot_prsnl_inc_weekly": 494
//             }
//         },
//         {
//             "RegionID": "SSC21123",
//             "RegionName": "Hampton (Vic.)",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.7,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 42,
//                 "Median_mortgage_repay_monthly": 2500,
//                 "Median_rent_weekly": 450,
//                 "Median_tot_fam_inc_weekly": 2921,
//                 "Median_tot_hhd_inc_weekly": 2226,
//                 "Median_tot_prsnl_inc_weekly": 865
//             }
//         },
//         {
//             "RegionID": "SSC20036",
//             "RegionName": "Altona North",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.6,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 38,
//                 "Median_mortgage_repay_monthly": 2000,
//                 "Median_rent_weekly": 340,
//                 "Median_tot_fam_inc_weekly": 1478,
//                 "Median_tot_hhd_inc_weekly": 1240,
//                 "Median_tot_prsnl_inc_weekly": 503
//             }
//         },
//         {
//             "RegionID": "SSC22333",
//             "RegionName": "St Kilda East",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.2,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 32,
//                 "Median_mortgage_repay_monthly": 2000,
//                 "Median_rent_weekly": 365,
//                 "Median_tot_fam_inc_weekly": 2297,
//                 "Median_tot_hhd_inc_weekly": 1691,
//                 "Median_tot_prsnl_inc_weekly": 961
//             }
//         },
//         {
//             "RegionID": "SSC22245",
//             "RegionName": "Seddon (Vic.)",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.4,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 35,
//                 "Median_mortgage_repay_monthly": 2167,
//                 "Median_rent_weekly": 380,
//                 "Median_tot_fam_inc_weekly": 2446,
//                 "Median_tot_hhd_inc_weekly": 2006,
//                 "Median_tot_prsnl_inc_weekly": 936
//             }
//         },
//         {
//             "RegionID": "SSC21143",
//             "RegionName": "Hawthorn (Vic.)",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.2,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 32,
//                 "Median_mortgage_repay_monthly": 2167,
//                 "Median_rent_weekly": 371,
//                 "Median_tot_fam_inc_weekly": 2645,
//                 "Median_tot_hhd_inc_weekly": 1813,
//                 "Median_tot_prsnl_inc_weekly": 950
//             }
//         },
//         {
//             "RegionID": "SSC20360",
//             "RegionName": "Brunswick East",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.2,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 32,
//                 "Median_mortgage_repay_monthly": 2000,
//                 "Median_rent_weekly": 400,
//                 "Median_tot_fam_inc_weekly": 2215,
//                 "Median_tot_hhd_inc_weekly": 1726,
//                 "Median_tot_prsnl_inc_weekly": 916
//             }
//         },
//         {
//             "RegionID": "SSC21618",
//             "RegionName": "McKinnon",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.9,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 39,
//                 "Median_mortgage_repay_monthly": 2167,
//                 "Median_rent_weekly": 446,
//                 "Median_tot_fam_inc_weekly": 2402,
//                 "Median_tot_hhd_inc_weekly": 2016,
//                 "Median_tot_prsnl_inc_weekly": 729
//             }
//         },
//         {
//             "RegionID": "SSC22791",
//             "RegionName": "Windsor (Vic.)",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 1.9,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 33,
//                 "Median_mortgage_repay_monthly": 2090,
//                 "Median_rent_weekly": 390,
//                 "Median_tot_fam_inc_weekly": 2403,
//                 "Median_tot_hhd_inc_weekly": 1755,
//                 "Median_tot_prsnl_inc_weekly": 997
//             }
//         },
//         {
//             "RegionID": "SSC20571",
//             "RegionName": "Clifton Hill",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.4,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 36,
//                 "Median_mortgage_repay_monthly": 2383,
//                 "Median_rent_weekly": 475,
//                 "Median_tot_fam_inc_weekly": 2857,
//                 "Median_tot_hhd_inc_weekly": 2272,
//                 "Median_tot_prsnl_inc_weekly": 1127
//             }
//         },
//         {
//             "RegionID": "SSC21003",
//             "RegionName": "Glen Iris (Vic.)",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.6,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 37,
//                 "Median_mortgage_repay_monthly": 2500,
//                 "Median_rent_weekly": 395,
//                 "Median_tot_fam_inc_weekly": 2834,
//                 "Median_tot_hhd_inc_weekly": 2195,
//                 "Median_tot_prsnl_inc_weekly": 965
//             }
//         },
//         {
//             "RegionID": "SSC20359",
//             "RegionName": "Brunswick (Vic.)",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.2,
//                 "Average_num_psns_per_bedroom": 1,
//                 "Median_age_persons": 33,
//                 "Median_mortgage_repay_monthly": 2058,
//                 "Median_rent_weekly": 401,
//                 "Median_tot_fam_inc_weekly": 2206,
//                 "Median_tot_hhd_inc_weekly": 1724,
//                 "Median_tot_prsnl_inc_weekly": 817
//             }
//         },
//         {
//             "RegionID": "SSC22332",
//             "RegionName": "St Kilda (Vic.)",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 1.8,
//                 "Average_num_psns_per_bedroom": 1.1,
//                 "Median_age_persons": 34,
//                 "Median_mortgage_repay_monthly": 2000,
//                 "Median_rent_weekly": 371,
//                 "Median_tot_fam_inc_weekly": 2298,
//                 "Median_tot_hhd_inc_weekly": 1594,
//                 "Median_tot_prsnl_inc_weekly": 1011
//             }
//         },
//         {
//             "RegionID": "SSC21576",
//             "RegionName": "Malvern (Vic.)",
//             "PartitionID": "G02",
//             "GeoLevel": "SSC",
//             "KVPairs": {
//                 "Average_household_size": 2.4,
//                 "Average_num_psns_per_bedroom": 0.9,
//                 "Median_age_persons": 41,
//                 "Median_mortgage_repay_monthly": 3000,
//                 "Median_rent_weekly": 411,
//                 "Median_tot_fam_inc_weekly": 3213,
//                 "Median_tot_hhd_inc_weekly": 2288,
//                 "Median_tot_prsnl_inc_weekly": 1118
//             }
//         }
//     ],
//     "Metadata": {
//         "Average_household_size": "Average household size",
//         "Average_num_psns_per_bedroom": "Average number of Persons per bedroom",
//         "Median_age_persons": "Median age of persons",
//         "Median_mortgage_repay_monthly": "Median mortgage repayment monthly",
//         "Median_rent_weekly": "Median rent weekly",
//         "Median_tot_fam_inc_weekly": "Median total family income weekly",
//         "Median_tot_hhd_inc_weekly": "Median total household income weekly",
//         "Median_tot_prsnl_inc_weekly": "Median total personal income weekly"
//     }
// }
