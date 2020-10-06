//This is the basis for the Map Request Objects
var mapRequests = [];
var selectedRegions = [];
latestRequestData = [];
var map;

require([
    "dojo/dom",
    "dojo/on",
    "esri/map",
    "esri/graphic",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/Color",
    "esri/InfoTemplate",
    "esri/layers/FeatureLayer",
    "esri/toolbars/draw",
    "esri/tasks/query",
    "dojo/domReady!"
], function (
    dom,
    on,
    Map,
    Graphic,
    SimpleFillSymbol,
    SimpleLineSymbol,
    Color,
    InfoTemplate,
    FeatureLayer,
    Draw,
    Query,
    Ready
) {
    map = new Map("mapDiv", {
        basemap: "osm",
        center: [133.25, -24.15],
        zoom: 4,
    });


    loading = dom.byId("loadingImg");

    on(map, "update-start", showLoading);
    on(map, "update-end", hideLoading);

    function showLoading() {
        esri.show(loading);
        //map.disableMapNavigation();
        map.hideZoomSlider();
    }

    function hideLoading(error) {
        esri.hide(loading);
        //map.enableMapNavigation();
        map.showZoomSlider();
    }

    var aus = new FeatureLayer("https://geo.abs.gov.au/arcgis/rest/services/ASGS2016/SEARCH/MapServer/1", {
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        visible: false
    });
    var ste = new FeatureLayer("https://geo.abs.gov.au/arcgis/rest/services/ASGS2016/SEARCH/MapServer/18", {
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],

    });
    var sa4 = new FeatureLayer("https://geo.abs.gov.au/arcgis/rest/services/ASGS2016/SEARCH/MapServer/15", {
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        visible: false
    });
    var sa3 = new FeatureLayer("https://geo.abs.gov.au/arcgis/rest/services/ASGS2016/SEARCH/MapServer/14", {
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        visible: false
    });
    var sa2 = new FeatureLayer("https://geo.abs.gov.au/arcgis/rest/services/ASGS2016/SEARCH/MapServer/13", {
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        visible: false
    });
    var ssc = new FeatureLayer("https://geo.abs.gov.au/arcgis/rest/services/ASGS2016/SEARCH/MapServer/17", {
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        visible: false
    });
    var poa = new FeatureLayer("https://geo.abs.gov.au/arcgis/rest/services/ASGS2016/SEARCH/MapServer/11", {
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        visible: false
    });
    var gccsa = new FeatureLayer("https://geo.abs.gov.au/arcgis/rest/services/ASGS2016/SEARCH/MapServer/4", {
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        visible: false
    });
    var ced = new FeatureLayer("https://geo.abs.gov.au/arcgis/rest/services/ASGS2016/SEARCH/MapServer/2", {
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        visible: false
    });
    var sed = new FeatureLayer("https://geo.abs.gov.au/arcgis/rest/services/ASGS2016/SEARCH/MapServer/16", {
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        visible: false
    });
    var lga = new FeatureLayer("https://geo.abs.gov.au/arcgis/rest/services/ASGS2016/SEARCH/MapServer/8", {
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        visible: false
    });


    var currentSelection;
    var currentLayer;
    drawToolbar = new Draw(map);
    drawToolbar.on('draw-complete', function (e) {

        drawToolbar.deactivate();
        var query = new Query();
        query.geometry = e.geometry;

        currentLayer.selectFeatures(query);
        currentSelection = query;

    });
    var selectionSymbol = new SimpleFillSymbol(
        SimpleFillSymbol.STYLE_SOLID,
        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
            new Color([255, 0, 0]), 4),
        new Color([255, 0, 0, 0.4])
    );
    aus.setSelectionSymbol(selectionSymbol);
    ste.setSelectionSymbol(selectionSymbol);
    sa4.setSelectionSymbol(selectionSymbol);
    sa3.setSelectionSymbol(selectionSymbol);
    sa2.setSelectionSymbol(selectionSymbol);
    ssc.setSelectionSymbol(selectionSymbol);
    poa.setSelectionSymbol(selectionSymbol);
    gccsa.setSelectionSymbol(selectionSymbol);
    ced.setSelectionSymbol(selectionSymbol);
    sed.setSelectionSymbol(selectionSymbol);
    lga.setSelectionSymbol(selectionSymbol);


    map.addLayer(aus);
    map.addLayer(ste);
    map.addLayer(sa4);
    map.addLayer(sa3);
    map.addLayer(sa2);
    map.addLayer(ssc);
    map.addLayer(poa);
    map.addLayer(gccsa);
    map.addLayer(ced);
    map.addLayer(sed);
    map.addLayer(lga);

    //aus.hide();current
    currentLayer = ste;

    on(dom.byId('selectAreaBtn'), 'click', function () {
        clearSelectedAreas();
        drawToolbar.activate(Draw.POLYGON);
    });

    on(dom.byId('selectLayer'), 'change', function (e) {
        //make sure map is in focus
        mapUp()

        var layer;
        var layerID
        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
            layerID = map.graphicsLayerIds[i];
            layer = map.getLayer(layerID);
            layer.setVisibility(false);
            layer.clearSelection();

        }
        layerID = map.graphicsLayerIds[e.target.value];
        layer = map.getLayer(layerID);
        layer.setVisibility(true);

        currentLayer = layer;
        currentSelection = null;

    });



    on(dom.byId('resetBtn'), 'click', function () {
        drawToolbar.deactivate();
        clearSelectedAreas();

    });


    on(dom.byId('queryBtn'), 'click', function () {

        showLoading();
        document.getElementById('errorMsg').innerHTML = "";
        document.getElementById("queryBtn").disabled = true;

        selectedRegions.length = 0;
        mapRequests.length = 0;

        var layer = currentLayer;
        selection = layer.getSelectedFeatures();
        var code;
        //get the attributes for the first Object in the selected graphics
        //then search it for its CODE element. Take substring search result.
        //then build an array of all of those codes from the selected features.
        var layer;
        var layerID
        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
            layerID = map.graphicsLayerIds[i];
            layer = map.getLayer(layerID);
            //console.log("this layer is number" + i + "and it is visible?" + layer.visible); 
            if (layer.visible) {
                layerNum = i;
            }

        }

        code = getLayerAttributesGIS(layerNum);
        //hard 100 geo limit!
        mapRequests = [];
        //get the topic selected in the topic div
        var topic = document.querySelector('input[name="topic"]:checked').value;

        if (selection.length == 0) {
            document.getElementById('errorMsg').innerHTML = "No Selection Made. Select over Australia";
            hideLoading();
            document.getElementById("queryBtn").disabled = false;
            return;
        }

        for (var i = 0; i < selection.length && i < 100; i++) {

            value = selection[i].attributes[code];
            selectedRegions.push(value);
            mr = new MapRequest(value, topic);
            mapRequests.push(mr);

        }

        console.log(mapRequests)
        console.log(JSON.stringify(mapRequests))

        document.getElementById("queryBtn").disabled = false;


        getDataFromAPI(hideLoading)

    });

    function getLayerAttributesGIS(layerNum) {
        var code;
        switch (layerNum) {
            case 0:
                code = "AUS_CODE_2016";
                break;

            case 1:
                code = "STATE_CODE_2016";
                break;

            case 2:
                code = "SA4_CODE_2016";
                break;

            case 3:
                code = "SA3_CODE_2016";
                break;

            case 4:
                code = "SA2_MAINCODE_2016";
                break;

            case 5:
                code = "SSC_CENSUSCODE_2016";
                break;

            case 6:
                code = "POA_CENSUSCODE_2016";
                break;

            case 7:
                code = "GCCSA_CODE_2016";
                break;

            case 8:
                code = "CED_CENSUSCODE_2016";
                break;

            case 9:
                code = "SED_CENSUSCODE_2016";
                break;

            case 10:
                code = "LGA_CENSUSCODE_2016";
                break;

        }
        return code;
    };

    function clearSelectedAreas() {
        var layer;
        var layerID
        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
            layerID = map.graphicsLayerIds[i];
            layer = map.getLayer(layerID);
            layer.clearSelection();
        }
    }

});