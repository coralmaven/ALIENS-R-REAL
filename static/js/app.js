
// Automatic Table and Date Search
// from data.js
var tableData = data;
const ufoTable = d3.select("tbody")

// Using the UFO dataset provided in the form of an array of JavaScript
// objects, write code that appends a table to your web page and then 
// adds new rows of data for each UFO sighting.
tableData.forEach(ufoSighting => addRowToTable(ufoSighting));

function addRowToTable(ufoSighting){
    const row = ufoTable.append("tr");
    for (const key in ufoSighting){
        if(key==="state" || key==="country"){
            row.append("td").text(ufoSighting[key].toUpperCase());
        } else if(key==="city" || key==="shape"){
            row.append("td").text(titleCase(ufoSighting[key]));
        } else {
            row.append("td").text(ufoSighting[key]);
        }
    }
}

function titleCase(str) {
    str = str.toLowerCase();
    str = str.split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    return str.join(' ');
  }

//   Use a date form in your HTML document and write JavaScript code that 
//  will listen for events and search through the `date/time` column to find
//  rows that match user input.

d3.select("#filter-btn").on("click", function() {
  // Prevent the page from refreshing
  d3.event.preventDefault();
  const inputElement = d3.select("#datetime");
  const inputDate = inputElement.property("value");
  if(inputDate.length != 0) {
    ufoTable.selectAll("tr").remove();
    const filteredData = tableData.filter(ufoSighting => (ufoSighting.datetime === inputDate));
    filteredData.forEach(ufoSighting => addRowToTable(ufoSighting));
  }
})


