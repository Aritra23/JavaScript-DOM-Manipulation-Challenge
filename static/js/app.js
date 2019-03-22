// from data.js
var tableData = data;

// Selectors initialization
var filterButton = d3.select("#filter-btn");
var dateFilter = d3.select("#date");
var cityFilter = d3.select("#city");
var stateFilter = d3.select("#state");

var tbody = d3.select("tbody");
var resetButton = d3.select("#reset-btn");
var dataList = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]

//Function to populate the data in table
var populate = function(inputData) {
    inputData.forEach(ufo_sightings => {
      var row = tbody.append("tr");
      dataList.forEach(index => row.append("td").text(ufo_sightings[index])
      )
    });
  }

// Fetch data from data.js  
populate(tableData);  


