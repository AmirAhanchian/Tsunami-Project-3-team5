// Perform an API call.
const url = "https://amirahanchian.github.io/Resources/Cleaned_Data_intensity.json";
const url2= "https://amirahanchian.github.io/Resources/Cleaned_Data_deaths.json";

d3.json(url).then((data) =>{
  var tsunami_info = data
 
 
     // checking that all information was pulled correctly
   console.log(tsunami_info);
   console.log('tsunami_info');
 
   var tsunamiMarkers = [];
   var numberofRunUps =[];
   
   for (var i = 0; i < tsunami_info.length; i++) {
      var tsunamiMarker = L.circle([tsunami_info[i].Latitude, tsunami_info[i].Longitude],{
       stroke: true,
       weight: 1,
       fillOpacity: 0.5,
       color: "#000000",
       fillColor: "#00008B",
       radius: ( tsunami_info[i]["Maximum Water Height (m)"]* 6000),
     }).bindPopup("<h3><h3>Location Name:" +tsunami_info[i]["Location Name"] + "<h3><h3>Tsunami Water Hight(m):"+ tsunami_info[i]["Maximum Water Height (m)"]+ "</h3>");
      
     tsunamiMarkers.push(tsunamiMarker);

   
 
      var numberofRunUp = L.circle([tsunami_info[i].Latitude, tsunami_info[i].Longitude],{
       stroke: true,
       weight: 1,
       fillOpacity: 0.5,
       color: "#000000",
       fillColor: "#ff0000",
       radius: (tsunami_info[i]["Number of Runups"]*6000),
     }).bindPopup("<h3><h3>Location Name:" +tsunami_info[i]["Location Name"] + "<h3><h3>Number Of RunUps:"+ tsunami_info[i]["Number of Runups"]+ "</h3>");
      numberofRunUps.push(numberofRunUp);
    };

  console.log(tsunamiMarkers);
  console.log('tsunamiMarkers');
  console.log(numberofRunUps);


var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

var Hight = L.layerGroup(tsunamiMarkers);
var nRunups = L.layerGroup(numberofRunUps);

var map = L.map("map-id", {
  center: [40.73, -74.0059],
  zoom: 2,
  layers:[topo,Hight,nRunups]
});


var baseMaps = {
  "Street Map": streetmap,
  "Topography": topo

};

var overlays = {
  "Maximum Water Height (m)": Hight,
  "Number of RunUps": nRunups
  
}

L.control.layers(baseMaps, overlays, {
  collapsed: false
}).addTo(map);

});
