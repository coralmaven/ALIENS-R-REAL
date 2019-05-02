// Automatic Table and Date Search
// from data.js
var tableData = data;
const ufoTable = d3.select("tbody");
const keys = ['datetime', 'city', 'state', 'country', 'shape'];
const keyElem = ['#datetimes', '#cities', '#states', '#countries', '#shapes'];

const unique = (value, index, self) => {
  return self.indexOf(value) === index;
}
  
function addDropDownOptions(elem, arr){
  for (i=0; i<arr.length; i++){
    elem.append("option").text(arr[i]).html(arr[i]);
  }
  if(arr.length > 1){
    elem.property("value","");
  } else {
    elem.property("value", arr[0]);
  }

}

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
  for (let i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
};

function filter_by(){
  ufoTable.selectAll("tr").remove();
  let filteredData = tableData;
  for (var i = 0; i < keys.length; i++){
    keyVal =d3.select(keyElem[i]).property("value");
    if ( keyVal != ""){
      filteredData = filteredData.filter(ufoSighting => (ufoSighting[keys[i]] === keyVal));
    }
  }
  filteredData.forEach(ufoSighting => addRowToTable(ufoSighting));
  updateDropDownLists(filteredData);
};

// Using the UFO dataset provided in the form of an array of JavaScript
// objects, write code that appends a table to your web page and then 
// adds new rows of data for each UFO sighting.


d3.select("#list-all").on("click",listAll());

function listAll(){
  d3.selectAll("option").remove();
  tableData.forEach(ufoSighting => addRowToTable(ufoSighting));
  for (var i = 0; i < keys.length; i++){
    updateDropDownLists(tableData);
  }
};


function updateDropDownLists(theTable){
  d3.selectAll("option").remove();
const 
  dates = theTable.map(t => t["datetime"]),
  cities = theTable.map(t => t["city"]),
  states = theTable.map(t => t["state"]),
  countries = theTable.map(t => t["country"]),
  shapes = theTable.map(t => t["shape"]);

  addDropDownOptions(d3.select("#datetimes"), dates.filter(unique).sort());
  addDropDownOptions(d3.select("#cities"), cities.filter(unique).sort());
  addDropDownOptions(d3.select("#states"), states.filter(unique).sort());
  addDropDownOptions(d3.select("#countries"), countries.filter(unique).sort());
  addDropDownOptions(d3.select("#shapes"), shapes.filter(unique).sort());
}
  