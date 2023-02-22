//const ctx = document.getElementById('myChart');

//const link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson";

$.getJSON("http://127.0.0.1:5000/api/v1.0/Tsunami", function(data) {
    //console.log(data);
    var tsunami_info = data

    // checking that all information was pulled correctly
    console.log(tsunami_info)
    
   var lookup = {};
   var items = tsunami_info;
   var result = [];

   for (var item, i = 0; item = items[i++];) {
      var code = item['Tsunami Cause Code'];

      if (!(code in lookup)) {
         lookup[code] = 1;
         result.push(code);
      }
   }
   console.log(result)


   bob = _.countBy(tsunami_info, function(tsunami_info) { return tsunami_info['Tsunami Cause Code']; });

   console.log(bob)

    //looping through data to find variables needed for the mapping
    for (var i = 0; i < tsunami_info.length; i++) {
      var info = tsunami_info[i]['Tsunami Cause Code'];
   
      data_plot = bob

      labels = []
      //labels = ["unknown","Earthquake","Questionable Earthquake","Earthquake and Landslide",
      //"Volcano and Earthquake","Volcano, Earthquake, and Landslide","Volcano","Volcano and Landslide","Landslide","Meteorological"] 
      
      }



   const ctx = document.getElementById('myChart');
   var chart = new Chart(ctx, {
      type: 'bar',
      data: {
         labels: labels,
         datasets: [{
            backgroundColor: 'rgb(129, 198, 2228)',
            borderColor: 'rgb(0, 150, 215)',
            data: data_plot
         }]
      },
      options: {
         responsive: 'true',
      }
   });
});


