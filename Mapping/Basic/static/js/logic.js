//API call from flask API
//const url = "http://127.0.0.1:5000/api/v1.0/Tsunami"
//const url2= "http://127.0.0.1:5000/api/v1.0/Death_Only"


// Perform an API call. using our online API to do so to allow anyone to access the map without needing to launch the api
const url = "https://amirahanchian.github.io/Resources/Cleaned_Data_intensity.json";
const url2= "https://amirahanchian.github.io/Resources/Cleaned_Data_deaths.json";
const url3 = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

let tectonicplates = new L.layerGroup();

d3.json(url3).then(function(data){

  // Create a style for the lines.
  let myLineStyle = {
	  color: "orange",
	  weight: 2
  }
	// Create a GeoJSON layer with retrieved data
	L.geoJson(data,{
		style: myLineStyle
	}).addTo(tectonicplates);

	// add tectonic plates layer to map
	tectonicplates.addTo(map);

}); 

// create function to import geojason file
d3.json(url).then((data) =>{
  var tsunami_info = data

     // checking that all information was pulled correctly
   console.log(tsunami_info);
   console.log('tsunami_info');
 
   var tsunamiMarkers = [];
   var numberofRunUps =[];
   
	
   //creating markers for location of tsunamis with radius as maximum water height
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

   
   //creating markers for location of tsunamis with radius of circle as number of run-ups
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
  console.log('numberofRunUps');

  d3.json(url2).then((ddata) =>{
    var deathInfo = ddata
   
   
       // checking that all information was pulled correctly
     console.log(deathInfo);
     console.log('deathInfo');
   
     var deathMarkers = [];
     
    //creating marers for location of tsunamis with radius as total deaths 
     for (var i = 0; i < deathInfo.length; i++) {
        var deathMarker = L.circle([deathInfo[i].Latitude, deathInfo[i].Longitude],{
         stroke: true,
         weight: 1,
         fillOpacity: 0.5,
         color: "#000000",
         fillColor: "#000000",
         radius: ( deathInfo[i]["Total Deaths"]* 10),
       }).bindPopup("<h3><h3>Location Name:" +deathInfo[i]["Location Name"] + "<h3><h3>Total Number of Death:"+ deathInfo[i]["Total Deaths"]+ "</h3>");
        
       deathMarkers.push(deathMarker);

      };
  
    console.log(deathMarkers);
    console.log('deathMarkers');
  
// adding street map layer
var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// adding topographical layer	  
var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

	  
//creating layer groups	  
var Hight = L.layerGroup(tsunamiMarkers);
var nRunups = L.layerGroup(numberofRunUps);
var deathNum =L.layerGroup(deathMarkers)


// adding layer groups to map
var map = L.map("map-id", {
  center: [0, 15],
  zoom: 2,
  layers:[topo,Hight,nRunups,deathNum]
});


var baseMaps = {
  "Street Map": streetmap,
  "Topography": topo

};

var overlays = {
  "Maximum Water Height (m)": Hight,
  "Number of RunUps": nRunups,
  "Total Death Number":deathNum,
  'Tetonic Plates': tectonicplates
}

L.control.layers(baseMaps, overlays, {
  collapsed: false
}).addTo(map);

  });

});
