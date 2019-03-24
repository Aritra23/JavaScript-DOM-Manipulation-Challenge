// from data.js
var tableData = data;

// Selectors initialization
var filterButton = d3.select("#filter-btn");
var dateFilter = d3.select("#datetime");
var cityFilter = d3.select("#city");
var stateFilter = d3.select("#state");

var tbody = d3.select("tbody");
var resetButton = d3.select("#reset-btn");
var dataList = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]

//Function to populate the data in table
var populate = (dataInput) => {
    dataInput.forEach(ufo_sightings => {
      var row = tbody.append("tr");
      dataList.forEach(column => row.append("td").text(ufo_sightings[column]))
    });
  }

// Fetch data from data.js  
populate(tableData);  

// Filter by attribute
filterButton.on("click", function() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    var inputDate = dateFilter.property("value").trim();
    var inputCity = cityFilter.property("value").toLowerCase().trim();
    var inputState = stateFilter.property("value").toLowerCase().trim();

    // Filter by field matching input value
    function selectDate(data) {
        return data.datetime === inputDate;
    }
    var filterDate = tableData.filter(selectDate);
    console.log(filterDate);

    function selectCity(data) {
        return data.city === inputCity;
    }
    var filterCity = tableData.filter(selectCity);
    console.log(filterDate);

    function selectState(data) {
        return data.state === inputState;
    }
    var filterState = tableData.filter(selectState);
    console.log(filterState);

    // filter by multiple attribute
    function selectDateTimeCity(data){
        return data.datetime === inputDate && data.city === inputCity;
    }
    var filterDateTimeCity = tableData.filter(selectDateTimeCity);
    console.log(filterDateTimeCity);

    function selectDateTimeState(data){
        return data.datetime === inputDate && data.state === inputState;
    }
    var filterDateTimeState = tableData.filter(selectDateTimeState);
    console.log(filterDateTimeState);

    function selectCityState(data){
        return data.city === inputCity && data.state === inputState;
    }
    var filterCityState = tableData.filter(selectCityState);
    console.log(filterCityState);

    function selectData(data) {
        return data.datetime === inputDate && data.city === inputCity && data.state === inputState;
    }
    var filterData = tableData.filter(selectData);
    console.log(filterData);
  
    // Add filtered sighting to table
    tbody.html("");
  
    //multiple search categories response
    let response = {
        filterDate, filterCity, filterState, filterDateTimeCity, filterDateTimeState, filterCityState, filterData
    }
  
    if (response.filterData.length !== 0) {
      populate(filterData);
    }
    else if (response.filterState.length === 0  && ((response.filterCity.length !== 0 && response.filterDate.length !== 0))){
        populate(filterDateTimeCity);
    
    }
    else if (response.filterCity.length === 0 && ((response.filterState.length !== 0 && response.filterDate.length !== 0))){
        populate(filterDateTimeState);
    
    }
    else if (response.filterDate.length === 0 && ((response.filterState.length !== 0 && response.filterCity.length !== 0))){
        populate(filterCityState);
    
    }
    else if (response.filterDate.length !== 0 && ((response.filterState.length === 0 && response.filterCity.length === 0))){
        populate(filterDate);
    
    }
    else if (response.filterCity.length !== 0 && ((response.filterState.length === 0 && response.filterDate.length === 0))){
        populate(filterCity);
    
    }
    else if (response.filterState.length !== 0 && ((response.filterCity.length === 0 && response.filterDate.length === 0))){
        populate(filterState);
    
    }
    else {
        tbody.append("tr").append("td").text("No results found!"); 
    }
  });

  resetButton.on("click", function() {
    tbody.html("");
    populate(tableData);
    console.log("Table reset");
  });


