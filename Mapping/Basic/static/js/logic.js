
// Perform an API call.
const url = "https://amirahanchian.github.io/Resources/Cleaned_Data_intensity.json";

function createMap(tsunami) {
var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

var map = L.map("map-id", {
  center: [40.73, -74.0059],
  zoom: 1,
  layers: [streetmap,tsunami]
});

var baseMaps = {
  "Street Map": streetmap
};

var overlayMaps = {
  "Tsunami Intensity": tsunami
};

L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(map);

}



//test
d3.json(url).then((data) =>{
 console.log(data);
 var tsunami_info = data


    // checking that all information was pulled correctly
  console.log(tsunami_info);
  console.log('tsunami_info');

  var tsunamiMarkers = [];
  
  for (var i = 0; i < tsunami_info.length; i++) {

    var tsunamiMarker = L.marker([tsunami_info[i].Latitude, tsunami_info[i].Longitude])
    .bindPopup("<h3>"+tsunami_info[i]['Maximum Water Height (m)'] +"</h3>");

    tsunamiMarkers.push(tsunamiMarker);
    
    //L.circle([tsunami_info[i].Latitude,tsunami_info[i].Longtitude]), {
      //fillOpacity: 0.75,
      //color: "white",
      //fillColor: color,
      // Adjust the radius.
      //radius: Math.sqrt(tsunami_info[i]['Maximum Water Height (m)']) * 500
    //}.bindPopup(`<h1>"Tsunami Intensity":${tsunami_info[i]['Tsunami Intensity']}</h1>`).addTo(myMap);
  }
    createMap(L.layerGroup(tsunamiMarkers)); 

});
