// Load the CSV data
d3.csv('/311-basic/311_boston_data.csv').then(function(data) {
    // Parse data
    data.forEach(function(d) {
        d.Count = +d.Count; // Convert count to numeric value
    });

    // Sort data by Count in descending order
    data.sort((a, b) => b.Count - a.Count);

    // Select top 10 reasons
    const topReasons = data.slice(0, 10);

    // Set up SVG dimensions and margins
    const margin = { top: 20, right: 20, bottom: 100, left: 100 };
    const height = 800 - margin.top - margin.bottom;
    const width = 800 - margin.left - margin.right;

    // Create SVG element
    const svg = d3.select('#chart')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Create scales for x and y axes (switched for orientation)
    const y = d3.scaleBand()
        .range([0, height])
        .domain(topReasons.map(d => d.reason))
        .padding(0.3);

    const x = d3.scaleLinear()
        .range([0, width])
        .domain([0, d3.max(topReasons, d => d.Count)]);

    // Create y and x axes (switched for orientation)
    const yAxis = d3.axisLeft(y);
    const xAxis = d3.axisBottom(x);

    // Append y and x axes to the SVG
    svg.append('g')
        .call(yAxis);

    svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    // Create bars for the bar chart (switched x and y attributes)
    svg.selectAll('.bar')
        .data(topReasons)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('y', d => y(d.reason))
        .attr('height', y.bandwidth())
        .attr('x', 0)
        .attr('width', d => x(d.Count))
        .attr('fill', 'steelblue');

    // Append headline to the SVG
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', -margin.top / 4)
        .attr('text-anchor', 'middle')
        .style('font-size', '20px')
        .text('Top 10 Reasons for 311 Calls in Boston'); // Replace with your desired headline
});
