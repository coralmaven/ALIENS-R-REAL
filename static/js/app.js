// Automatic Table and Date Search
// from data.js
var tableData = data;
const ufoTable = d3.select("tbody");
tableData.forEach(ufoSighting => addRowToTable(ufoSighting));

const 
  dates = tableData.map(t => t["datetime"]),
  cities = tableData.map(t => t["city"]),
  states = tableData.map(t => t["state"]),
  countries = tableData.map(t => t["country"]),
  shapes = tableData.map(t => t["shape"]);


const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  }
  console.log(dates.filter(unique));

function addDropDownOptions(elem, arr){
    for (i=0; i<arr.length; i++)
      elem.append("option").text(arr[i]).html(arr[i]);
}


const keys = ['datetime', 'city', 'state', 'country', 'shape'];
const keyElem = ['#datetime', '#city', '#state', '#country', '#shape']

addDropDownOptions(d3.select("#datetime"), dates.filter(unique).sort());
addDropDownOptions(d3.select("#city"), cities.filter(unique).sort());
addDropDownOptions(d3.select("#state"), states.filter(unique).sort());
addDropDownOptions(d3.select("#country"), countries.filter(unique).sort());
addDropDownOptions(d3.select("#shape"), shapes.filter(unique).sort());

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

function filter_by_one_key(keyValue, key){
  console.log(keyValue, key);
  if(keyValue!=null){
    console.log(keyValue);
    ufoTable.selectAll("tr").remove();

    const filteredData = tableData.filter(ufoSighting => (ufoSighting[key] === keyValue));
    filteredData.forEach(ufoSighting => addRowToTable(ufoSighting));
  }
};

function filter_by(){
  ufoTable.selectAll("tr").remove();
  let filteredData = tableData;
  for (var i = 0; i < keys.length; i++){
    keyVal =d3.select(keyElem[i]).property("value");
    console.log(keys[i], keyElem[i], keyVal);
    if ( keyVal != ""){
      filteredData = filteredData.filter(ufoSighting => (ufoSighting[keys[i]] === keyVal));
    }
  }
  filteredData.forEach(ufoSighting => addRowToTable(ufoSighting));
};
// Using the UFO dataset provided in the form of an array of JavaScript
// objects, write code that appends a table to your web page and then 
// adds new rows of data for each UFO sighting.

d3.select("#list-all").on("click", function(){
  console.log(tableData);
  tableData.forEach(ufoSighting => addRowToTable(ufoSighting));
  for (var i = 0; i < keys.length; i++){
    keyVal =d3.select(keyElem[i]).property("value","");
  }
});

