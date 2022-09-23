// Create the function to retrieve the necessary data
function getPlots(id)
{
    // Read samples.json
    d3.json('samples.json').then (sample_data =>{
        console.log(sample_data)
        var ids = sample_data.samples[0].otu_ids;
        console.log(ids)
        var sampleValues = sample_data.samples[0].sample_values.slice(0, 10).reverse();
        console.log(sampleValues)
        var labels = sample_data.samples[0].otu_labels.slice(0, 10);
        console.log(labels)
    // Retrieve the top 10 OTU ids for the OTU plot and then reversing it
        var OTU_top = (sample_data.samples[0].otu_ids.slice(0, 10)).reverse();
    // Retrieve the OTU ids to the desired configuration for the plot
        var OTU_id = OTU_top.map(d => "OTU " + d);
        console.log(`OTU IDs: ${OTU_id}`)
    // Retrieve the top 10 labels for the plot
        var labels = sample_data.samples[0].otu_labels.slice(0, 10);
        console.log(`OTU_labels: ${labels}`)
        var trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {color: 'blue'},
            type: 'bar',
            orientation: 'h'
        };
        // Create the data variable for the bar plot
        var data = [trace];

        // Create layout variable to set the plot's layout
        var layout = {
            yaxis: {tickmode: 'linear'},
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
    // Create the bar plot
    Plotly.newPlot('bar', data, layout);

        // Format the bubble chart
        var trace1 = {
            x: sample_data.samples[0].otu_ids,
            y: sample_data.samples[0].sample_values,
            mode: 'markers',
            marker: {
                size: sample_data.samples[0].sample_values,
                color: sample_data.samples[0].otu_ids
            },
            text: sample_data.samples[0].otu_labels
        };
        // Set the layout for the bubble plot
        var layout_2 = {
            xaxis: {title: 'OTU ID'},
            height: 600,
            width: 1000
        };
        // Create the data variable for the bubble plot
        var data1 = [trace1];

    // Create the bubble plot
    Plotly.newPlot('bubble', data1, layout_2);
    }
        );
}

// Create the function to retrieve the essential data
function getDemoInfo(id) 
{
    // Read sample.json
        d3.json('samples.json').then((data) => {
    // Retrieve the metadata information for the demographic panel
        var metadata = data.metadata;
        console.log(metadata)
        // Filter the metadata information by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];
        // Select the demographic panel to input data
        var demographicInfo = d3.select('#sample-metadata');
    
        // Empty the demographic information panel each time before retrieving new id information
        demographicInfo.html("");
    
        // Retrieve the essential demographic data for the id and append the information to the panel
        Object.entries(result).forEach((key) => {
            demographicInfo.append('h5').text(key[0].toUpperCase() + ': ' + key[1] + '\n');
        });
    });
}

// Create the function for the change event
function optionChanged(id) 
{
    getPlots(id);
    getDemoInfo(id);
}

// Create the function for the initial data rendering
function init()
{
    // Select the dropdown menu
    var dropdown = d3.select('#selDataset');

    // Read the data
    d3.json('samples.json').then((data) => {
        console.log(data)

        // Get the id data to the dropdown menu
        data.names.forEach(function(name) {
            dropdown.append('option').text(name).property('value');
        });

        // Call the function to display the data and the plots to the landing page
        getPlots(data.names[0]);
        getDemoInfo(data.names[0]);
    });
}

init();