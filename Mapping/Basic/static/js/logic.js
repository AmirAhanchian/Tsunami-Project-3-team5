// Perform an API call.
const url = "https://amirahanchian.github.io/Resources/Cleaned_Data_intensity.json";
//test
d3.json(url).then((data) =>{
 console.log(data);
 var tsunami_info = data


    // checking that all information was pulled correctly
  console.log(tsunami_info);
  console.log('tsunami_info');

var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

var map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [streetmap]
});

var lat =[];
var long=[];
var location=[];

for (var i = 0; i < tsunami_info.length; i++) {
  lat.push(tsunami_info[i].Latitude);
  long.push(tsunami_info[i].Longitude);
}
 console.log(lat);
 console.log(long);

});
