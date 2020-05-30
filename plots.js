// CHALLENGE

// Code that creates a dropdown menu of ID numbers dynamically.
function init() {
    var selector = d3.select("#selDataset");
    
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      var firstSample = data.names[0];
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
    optionChanged(firstSample);
  })}
  init();

// Function to enable drop down menu to choose ID number
  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
  }
// BuildMetadata function to create demographic information
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0]; // metadata dictionary gotten
      var PANEL = d3.select("#sample-metadata");
      console.log(result); // result is all the bacteria for a person
  
      PANEL.html("");  
      Object.entries(result).forEach(function([filtering,value]){
        PANEL.append("h6").text(`${filtering}: ${value}`);}); 
    });
  };

// Create buildCharts function for TWO Charts
function buildCharts(sample) {
//Sort bacteria by id in descending order for barchart
  d3.json("samples.json").then(function(data){
    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    console.log(result);
    var otu_ids = result.otu_ids;
    console.log(otu_ids);
    var otu_id = result.otu_ids.slice(0,10).map(sample2 => `OTU ${sample2}`).reverse();
    console.log(otu_id);
    var sample_values = result.sample_values;
    console.log(sample_values);
    var Top10BacId = result.sample_values.slice(0,10).reverse(); // Slice top 10 Bacteria by ID
    // var otu_id_label
    var otu_labels = result.otu_labels;
    console.log(Top10BacId);
      
// BUILD HORIZONTAL BAR CHART FOR Top10BacId
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hover text for the chart.
    var trace = {
      x: Top10BacId,
      y: otu_id,
      type: "bar",
      orientation: "h"
    };      
    var data = [trace];
    var layout = {
      title: "Top 10 Bacterial Species in Your Navel",
      xaxis: {title: "Bacteria Prevalence by Type"},
    };
    Plotly.newPlot("bar", data, layout);

// ------CREATE BUBBLE CHART WITH HOVER TEXT----------
// Create a bubble chart that displays each sample FOR THE ID:
// Use otu_ids for the x-axis values.
// Use sample_values for the y-axis values.
// Use sample_values for the marker size.
// Use otu_ids for the marker colors.
// Use otu_labels for the text values.

  var trace1 = {
  x: otu_ids,
  y: sample_values,
  text: otu_labels,
  mode: 'markers',
  marker: {
    color: otu_ids,
    size: sample_values,
  }
  };

  var data = [trace1];

  var layout = {
  title: 'Belly Button Bacteria Amounts',
  xaxis: {title:'OTU ID'},
  yaxis: {title:'Bacteria Amount'},
  //showlegend: false,
  height: 600,
  width: 800
  };

  Plotly.newPlot("bubble", data, layout);

//});
});
};
