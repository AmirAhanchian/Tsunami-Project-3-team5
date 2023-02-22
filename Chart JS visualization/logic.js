

$.getJSON("http://127.0.0.1:5000/api/v1.0/Tsunami", function(data) {
    //console.log(data);

    
    var tsunami_info = data

    // checking that all information was pulled correctly
    //console.log(tsunami_info)
    

   
   cause = _.countBy(tsunami_info, function(tsunami_info) { return tsunami_info['Tsunami Cause Code']; });
      

   delete Object.assign(cause, { "Earthquake": cause['1'] })['1'];
   delete Object.assign(cause, { "Earthquake and Landslide": cause['3'] })['3'];
   delete Object.assign(cause, { "Volcano": cause['6'] })['6'];
   delete Object.assign(cause, { "Meteorological": cause['9'] })['9'];

   console.log(cause); // { newKey: 'value' }


   
   cause2 = {...cause, "Questionable Earthquake": 0, "Volcano and Earthquake":0, "Volcano, Earthquake, and Landslide":0, "Volcano and Landslide":0, "Landslide":0, "unknown": 0};
   console.log(cause)

   country = _.countBy(tsunami_info, function(tsunami_info) { return tsunami_info['Country']; });
   year = _.countBy(tsunami_info, function(tsunami_info) { return tsunami_info['Year']; });





   const ctx = document.getElementById('myChart');
   var chart = new Chart(ctx, {
      type: 'bar',
      data: {
         
         datasets: [{
            backgroundColor: 'rgb(129, 198, 0)',
            borderColor: 'rgb(0, 150, 215)',
            data: cause2
         }]
      },
      options: {
         responsive: 'true',
      }
   
   });

   const ctx2 = document.getElementById('myChart2');
   var chart2 = new Chart(ctx2, {
      type: 'bar',
      data: {
         
         datasets: [{
            backgroundColor: 'rgb(129, 198, 2228)',
            borderColor: 'rgb(0, 150, 215)',
            data: country
         }]
      },
      options: {
         responsive: 'true',
      }
   
   });

   const ctx3 = document.getElementById('myChart3');
   var chart3 = new Chart(ctx3, {
      type: 'bar',
      data: {
         
         datasets: [{
            backgroundColor: 'rgb(129, 198, 2228)',
            borderColor: 'rgb(0, 150, 215)',
            data: year
         }]
      },
      options: {
         responsive: 'true',
      }
   
   });
});


