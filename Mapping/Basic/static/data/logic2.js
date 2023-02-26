var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

layers: [layers.MaximumWaterHeight,layers.TotalNumberDeaths]  // Initialize all the LayerGroups that we'll use.
var layers = {
MaximumWaterHeight: new L.LayerGroup(),
TotalNumberDeaths: new L.LayerGroup(),
  
};

var map = L.map("map-id", {
  center: [40.73, -74.0059],
  zoom: 3,
  
});

// Add our "streetmap" tile layer to the map.
streetmap.addTo(map);

var overlays = {
  "Maximum Water Height (m)": layers.MaximumWaterHeight,
  "Total Number of Deaths":layers.TotalNumberDeaths
  
};

// Create a control for our layers, and add our overlays to it.
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map.
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend".
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map.
info.addTo(map);


// Initialize an object that contains icons for each layer group.
var icons = {
  MaximumWaterHeight: L.ExtraMarkers.icon({
    icon: "ion-settings",
    iconColor: "white",
    markerColor: "yellow",
    shape: "star"
  }),
  TotalNumberDeaths: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "red",
    shape: "circle"
  })
};

// Perform an API call.
const url = "https://amirahanchian.github.io/Resources/Cleaned_Data_intensity.json";
const url2= "https://amirahanchian.github.io/Resources/Cleaned_Data_deaths.json";
  
//test
d3.json(url).then((data) =>{
  console.log(data);
  var tsunami_info = data

  // checking that all information was pulled correctly
  console.log(tsunami_info);

  var tsunamiMarkers = [];
  
 for (var i = 0; i < tsunami_info.length; i++) {
   var tsunamiMarker = L.circle([tsunami_info[i].Latitude, tsunami_info[i].Longitude],{
    stroke: true,
    weight: 1,
    fillOpacity: 0.5,
    color: "#000000",
    fillColor: "#00FF00",
    radius: ( tsunami_info[i]["Maximum Water Height (m)"]* 5000),
    }).bindPopup("<h3>"+tsunami_info[i]['Maximum Water Height (m)'] +"</h3>");
    
    tsunamiMarkers.push(tsunamiMarker);
  
  }
  L.layerGroup(tsunamiMarkers); 

});

d3.json(url2).then((data2) =>{
  console.log(data2);
  var death_info = data2
  var deathMarkers = [];
  
  for (var i = 0; i < death_info.length; i++) {
        var deathMarker = L.circle([death_info[i].Latitude, death_info[i].Longitude],{
      stroke: true,
      weight: 1,
      fillOpacity: 0.5,
      color: "#000000",
      fillColor: "#000000",
      radius: ( death_info[i]["Total Deaths"]* 10),
      }).bindPopup("<h3>"+death_info[i]['Total Deaths'] +"</h3>");
    
      deathMarkers.push(deathMarker);
  
  }
L.layerGroup(deathMarkers);
});