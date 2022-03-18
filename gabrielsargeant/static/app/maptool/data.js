//data_table

$("#updateData").click(function() {
  var data = $("#dataArray").val();
  var rows = data.split("\n");

  var table = $("<table id='eTable' class='dataTable' />");

  var i = 0;
  for (var y in rows) {
    var cells;
    var row;
    if (i != 0) {
      cells = rows[y].split("\t");
      row = $("<tr/>");
      for (var x in cells) {
        row.append("<td>" + cells[x] + "</td>");
      }
    } else {
      i++;

      cells = rows[y].split("\t");
      row = $("<tr/>");
      for (var x in cells) {
        row.append("<th>" + cells[x] + "</th>");
      }
    }

    table.append(row);

    // Insert into DOM
    $("#excel_table").html(table);
  }
  fillSelectors();
});

$("#stripText").click(function() {
  stripText();
});

$("#clearText").click(function() {
  clearDataArea();
});

function clearDataArea() {
  $("#dataArray").val("");
  $("#excel_table").empty();
  data = [];
  $("#selectJoin").empty();
  $("#selectData").empty();

   $("#one_b").val("");
   $("#two_b").val("");
   $("#three_b").val("");
   $("#four_b").val("");
   $("#five_b").val("");

   $("#one_a").html("");
   $("#two_a").html("");
   $("#three_a").html("");
   $("#four_a").html("");
   $("#five_a").val("");

   $("#one_c").removeClass();  
   $("#two_c").removeClass();   
   $("#three_c").removeClass();  
   $("#four_c").removeClass();  
   $("#five_c").removeClass();
  





 
}

function stripText() {
  var remove = $("#stripTextVal").val();

  var data = $("#dataArray").val();

  var regex = new RegExp(remove, "g");
  var output = data.replace(regex, "");

  $("#dataArray").val(output);
  $("#stripTextVal").val("");
}

function fillSelectors() {
  var d1 = $("#selectJoin");
  var d2 = $("#selectData");
  d1.empty();
  d2.empty();

  $("#eTable tr th").each(function(index) {
    var $this = $(this);

    d1.append(
      $("<option>", {
        value: index,
        text: $this.text()
      })
    );
    d2.append(
      $("<option>", {
        value: index,
        text: $this.text()
      })
    );
  });
}

$("#selectJoin").change(function() {
  buildMapData();
});

$("#selectData").change(function() {
  buildMapData();
});

function buildMapData() {
  var select = document.getElementById("selectJoin");
  var index = select.options[select.selectedIndex].value;
  joinFields = getColumn(index);

  select = document.getElementById("selectData");
  index = select.options[select.selectedIndex].value;
  dataFields = getColumn(index);

  mergeData(joinFields, dataFields);
}

function getColumn(index) {
  var rslt = [];
  $("#eTable tr").each(function(i, v) {
    $(v)
      .find("td")
      .each(function(ii, vv) {
        if (ii == index && vv !== "") {
          rslt.push(Number(vv.innerText));
        }
      });
  });

  console.log(rslt);
  return rslt;
}

function mergeData(joinField, dataField) {
  data = [];
  ckMeansData = dataField;
  var arrayOfNumbers = dataField.map(Number);
  min = Math.min(...arrayOfNumbers);
  //console.log(min);
  max = Math.max(...arrayOfNumbers);
  step = max / 5;
  min_max = [min, max, step];
  //console.log(min_max)

  $.each(joinField, function(i, v) {
    arr = [v, arrayOfNumbers[i]];
    data.push(arr);
  });
  //console.log(data);
}
