


// import json file using jquery

//$.getJSON("https://amirahanchian.github.io/Resources/Cleaned_Data_intensity.json", function(data) {
$.getJSON("http://127.0.0.1:5000/api/v1.0/Tsunami", function(data) {
    //check if data imported properly
    //console.log(data);

    
    var tsunami_info = data

    // checking that all information was pulled correctly
    //console.log(tsunami_info)
    

   
   cause = _.countBy(tsunami_info, function(tsunami_info) { return tsunami_info['Tsunami Cause Code']; });
      
// replace and rename keys from numbers into actual tsunami causes (named)
   delete Object.assign(cause, { "Earthquake": cause['1'] })['1'];
   delete Object.assign(cause, { "Earthquake and Landslide": cause['3'] })['3'];
   delete Object.assign(cause, { "Volcano": cause['6'] })['6'];
   delete Object.assign(cause, { "Meteorological": cause['9'] })['9'];

   //check that it works
   //console.log(cause);


   // create new keys to add all causes for tsunamis that were zero in our dataset 
   // but are potential causes, for better info in the graphs

   cause2 = {...cause, "Questionable Earthquake": 0, "Volcano and Earthquake":0, "Volcano, Earthquake, and Landslide":0, "Volcano and Landslide":0, "Landslide":0};
   //console.log(cause2)


   // create an opject of counts for each country to detrmine frequency of tsunami occurance by country
   country = _.countBy(tsunami_info, function(tsunami_info) { return tsunami_info['Country']; });
   
   // create an object for frequency of tsunamis by year
   year = _.countBy(tsunami_info, function(tsunami_info) { return tsunami_info['Year']; });




   // create charts by using chart.js for each graph.chart required
   
   const ctx = document.getElementById('myChart').getContext("2d");
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
         scales: {
               
            y: {
               ticks: {
                  font: {
                      size: 14,
                  }
               },
              title: {
                display: true,
                text: 'Frequency',
                font: {
                  size: 16,
               }
              }
            },
            x: {
               ticks: {
                  font: {
                      size: 14,
                  }
               },
               title: {
                 display: true,
                 text: 'Cause Name',
                 font: {
                  size: 16,
                  }
               }
             }
         },     
         plugins:{
            title: {
               display: true,
               text: 'Tsunami Causes',
               font: {
                  size: 22,
               }
            },
            legend: {
                display: false,}     
         }
      }
   
   });

   const ctx2 = document.getElementById('myChart2');
   var chart2 = new Chart(ctx2, {
      type: 'bar',
      
      data: {
         
         datasets: [{
            backgroundColor: 'rgb(1000, 0, 2)',
            borderColor: 'rgb(0, 150, 215)',
            data: country
         }]
      },
      options: {
         responsive: 'true',
         scales: {
               
            y: {
               ticks: {
                  font: {
                      size: 14,
                  }
               },
              title: {
                display: true,
                text: 'Frequency',
                font: {
                  size: 16,
                }
              }
            },
            x: {
               ticks: {
                  font: {
                      size: 14,
                  }
               },
               title: {
                 display: true,
                 text: 'Country Name',
                 font: {
                     size: 16,
                  }
               }
             }
         },  
         plugins:{
            title: {
               display: true,
               text: 'Tsunami Frequency by Country',
               font: {
                  size: 22,
               }
            },
            legend: {
                display: false,}     
         }
      }
   });

   const ctx3 = document.getElementById('myChart3');
   var chart3 = new Chart(ctx3, {
      type: 'line',
      data: {
         
         datasets: [{
            backgroundColor: 'rgb(0, 198, 2228)',
            borderColor: 'rgb(0, 150, 215)',
            data: year
            
         }]
      },
      options: {
         responsive: 'true',
         scales: {
               
            y: {
               ticks: {
                  font: {
                      size: 14,
                  }
               },
              title: {
                display: true,
                text: 'Frequency',
                font: {
                  size: 16,
               }
              }
            },
            x: {
               ticks: {
                  font: {
                      size: 14,
                  }
               },
               title: {
                 display: true,
                 text: 'Year of Occurance',
                 font: {
                     size: 16,
                  }
               }
             }
            },  
         plugins:{
            title: {
               display: true,
               text: 'Tsunami Frequency by Year',
               font: {
                  size: 22,
               }
            },
            legend: {
                display: false},
                 
         }
      }
   
   });
});


