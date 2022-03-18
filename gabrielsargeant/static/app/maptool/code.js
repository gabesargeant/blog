var map;
var thematic_code_name = thematic_region;

var map_colors = [
  [56, 168, 0, 0.5],
  [139, 209, 0, 0.5],
  [255, 255, 0, 0.5],
  [255, 128, 0, 0.5],
  [254, 0, 0, 0.5],

  [237, 248, 251, 0.5],
  [178, 226, 226, 0.5],
  [102, 194, 164, 0.5],
  [44, 162, 95, 0.5],
  [0, 109, 44, 0.5],

  [255, 255, 178, 0.5],
  [254, 204, 92, 0.5],
  [253, 141, 60, 0.5],
  [240, 59, 32, 0.5],
  [189, 0, 38, 0.5],

  [252, 197, 192, 0.5],
  [250, 159, 181, 0.5],
  [247, 104, 161, 0.5],
  [197, 27, 138, 0.5],
  [122, 1, 119, 0.5],

  [44, 123, 182, 0.5],
  [171, 217, 233, 0.5],
  [255, 255, 191, 0.5],
  [253, 174, 97, 0.5],
  [215, 25, 28, 0.5],

  [141, 211, 199, 0.5],
  [255, 255, 179, 0.5],
  [190, 186, 218, 0.5],
  [251, 128, 114, 0.5],
  [128, 177, 211, 0.5],

  [247, 247, 247, 0.5],
  [204, 204, 204, 0.5],
  [150, 150, 150, 0.5],
  [99, 99, 99, 0.5],
  [37, 37, 37, 0.5]
];
require([
  "dojo/on",
  "esri/map",
  "esri/layers/FeatureLayer",
  "esri/geometry/Extent",
  "esri/InfoTemplate",
  "esri/symbols/TextSymbol",
  "esri/layers/LabelClass",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleFillSymbol",
  "esri/renderers/SimpleRenderer",
  "esri/renderers/ClassBreaksRenderer",
  "esri/Color",
  "dojo/domReady!"
], function(
  on,
  Map,
  FeatureLayer,
  Extent,
  InfoTemplate,
  TextSymbol,
  LabelClass,
  SimpleLineSymbol,
  SimpleFillSymbol,
  SimpleRenderer,
  ClassBreaksRenderer,
  Color
) {
  map = new Map("map", {
    basemap: "gray",
    center: [146.5, -42.0],
    zoom: 8,
    showLabels: true
  });

  //var infoTemplate = new InfoTemplate("${NAME}", "${*}");
  //streets
  // var infoTemplate = new InfoTemplate("${NAME}", "${*}", ""
  // "The number of people that applied under the RRTA from ${country} is approximatley <u><b size=\"12\">" + "${count(*)}\n\
  // </b></u>for details on their case before the RRTA click the following button <br><br><center> \
  // <form action=\"search.php\" method=\"get\"> \
  // <input name=\"db\" value=\"RRTA\" type=\"hidden\" >\
  // <input name=\"country\" type=\"submit\" value=\"${name}\"/><form></center>",
  // );
  var infoTemplate = new InfoTemplate();
  infoTemplate.setTitle("Title"); //Standin
  infoTemplate.setContent(getInfoContent);

  function getInfoContent(graphic) {
    var fval = findvalue(graphic);
    if (typeof fval === "undefined") {
      fval = "<br/>No Data available, Sorry!";
    }
    rtn_str =
      "<br> The value of the selected area" +
      graphic.attributes["POA_NAME_2016"] +
      "<b>" +
      name +
      "</b> is <b>" +
      fval +
      "</b>";

    return rtn_str;
  }

  function get_feature_layer() {
    //      "POA_CENSUSCODE_2016"
    layer = new FeatureLayer(
      "https://geo.abs.gov.au/arcgis/rest/services/ASGS2016/POA/MapServer/0",
      {
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        infoTemplate: infoTemplate
      }
    );
    return layer;
  }

  var featureLayer = get_feature_layer(thematic_region);

  var line = new SimpleLineSymbol();
  line.setWidth(1.5);
  line.setStyle(SimpleLineSymbol.SOLID);
  line.setColor(new Color([225, 0, 0, 0.4]));

  var symbol = new SimpleFillSymbol();
  symbol = symbol.setOutline(line);

  var ext_arr = [];

  function findvalue(graphic) {
    //console.log(graphic.geometry.getExtent());
    var cdx = graphic.attributes[thematic_region];
    var val;
    for (var i = 0; i < data.length; i++) {
      if (cdx.localeCompare(data[i][0]) == 0) {
        val = data[i][1];
      }
    }
    return val;
  }

  map.addLayer(featureLayer);

  // //I run this on the first time the map runs to zoom in to the extent
  // //of the selected features
  // var first = false;

  on(clearText, "click", function clearMap() {
    l_id = map.graphicsLayerIds[0];
    layer = map.getLayer(l_id);
    map.removeLayer(layer);

    map.addLayer(featureLayer);
  });

  on(updateBreaks, "click", function() {
    var stp = min_max[2]; //Even breaks to start with.
    var stp1 = 0;
    var stp2 = stp;
    var stp3 = stp * 2;
    var stp4 = stp * 3;
    var stp5 = stp * 4;
    var top = min_max[1]; //max returned val

    if (document.getElementById("ckmeans").checked == true) {
      console.log("using ck means CK Means ");
      output = ss.ckmeans(ckMeansData, 5);
      //console.log(output);
      stp1 = 0;
      stp2 = output[1][0];
      stp3 = output[2][0];
      stp4 = output[3][0];
      stp5 = output[4][0];
      top = output[4][output[4].length-1];
    }

    $("#one_b").val(parseInt(stp1));
    $("#two_b").val(parseInt(stp2));
    $("#three_b").val(parseInt(stp3));
    $("#four_b").val(parseInt(stp4));
    $("#five_b").val(parseInt(stp5));

    $("#one_a").html(parseInt(stp2-1));
    $("#two_a").html(parseInt(stp3-1));
    $("#three_a").html(parseInt(stp4-1));
    $("#four_a").html(parseInt(stp5-1));
    $("#five_a").val(parseInt(top));

    l_id = map.graphicsLayerIds[0];

    layer = map.getLayer(l_id);
    map.removeLayer(layer);

    var __map_color = document.getElementById("selectColor");
    var mc_i = __map_color.options[__map_color.selectedIndex].value;
    var mc_i = 5 * mc_i;

    var mcr0;
    var mcr1;
    var mcr2;
    var mcr3;
    var mcr4;

    if (document.getElementById("flip_ramp").checked == true) {
      mcr0 = mc_i + 4;
      mcr1 = mc_i + 3;
      mcr2 = mc_i + 2;
      mcr3 = mc_i + 1;
      mcr4 = mc_i + 0;
      console.log("jenks");
      console.log(output);
    } else {
      mcr0 = mc_i + 0;
      mcr1 = mc_i + 1;
      mcr2 = mc_i + 2;
      mcr3 = mc_i + 3;
      mcr4 = mc_i + 4;
    }

    $("#one_c").removeClass();
    $("#one_c").addClass("c" + mcr0);
    $("#two_c").removeClass();
    $("#two_c").addClass("c" + mcr1);
    $("#three_c").removeClass();
    $("#three_c").addClass("c" + mcr2);
    $("#four_c").removeClass();
    $("#four_c").addClass("c" + mcr3);
    $("#five_c").removeClass();
    $("#five_c").addClass("c" + mcr4);

    c1 = map_colors[mcr0];
    c2 = map_colors[mcr1];
    c3 = map_colors[mcr2];
    c4 = map_colors[mcr3];
    c5 = map_colors[mcr4];

    var ren = new ClassBreaksRenderer(symbol, findvalue);
    ren.addBreak(stp1, stp2, new SimpleFillSymbol().setColor(new Color(c1)));
    ren.addBreak(
      stp2 + 1,
      stp3,
      new SimpleFillSymbol().setColor(new Color(c2))
    );
    ren.addBreak(
      stp3 + 1,
      stp4,
      new SimpleFillSymbol().setColor(new Color(c3))
    );
    ren.addBreak(
      stp4 + 1,
      stp5,
      new SimpleFillSymbol().setColor(new Color(c4))
    );
    ren.addBreak(stp5 + 1, top, new SimpleFillSymbol().setColor(new Color(c5)));

    var fl = get_feature_layer(thematic_region);

    fl.setRenderer(ren);
    if (document.getElementById("check_label").checked == true) {
      var label_text = new TextSymbol().setColor(new Color("#000"));
      label_text.font.setSize("12pt");
      label_text.font.setFamily("arial");
      var json_label = {
        labelExpressionInfo: {
          expression: "$feature." + thematic_code_name
        }
      };
      var labelClass = new LabelClass(json_label);
      labelClass.symbol = label_text;
      fl.setLabelingInfo([labelClass]);
    }
    map.addLayer(fl);

    var ext_arr = [];
    for (var i = 0; i < featureLayer.graphics.length; i++) {
      var graphic = featureLayer.graphics[i];
      var cdx = graphic.attributes[thematic_region];

      for (ii = 0; ii < data.length; ii++) {
        if (cdx.localeCompare(data[ii][0]) === 0) {
          ext = new Extent(graphic.geometry.getExtent());

          ext_arr.push(ext);
        }
      }
    }
    ext1 = ext_arr[0];
    for (j = 1; j < ext_arr.length; j++) {
      ext1 = ext1.union(ext_arr[j]);
    }
    map.setExtent(ext1.expand(1.25));
  });

});
