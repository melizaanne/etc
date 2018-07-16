// data
  var z = ["ATL", "LAX", "ORD", "DFW", "JFK", "DEN", "SFO", "LAS", "SEA", "CLT", "PHX", "MIA"];
  var x = [50501858, 39636042, 37589899, 31283579, 29239151, 28267394, 25707101, 22833267, 21887110, 21511880, 20896265, 20875813];
  var y = [49340732, 36351272, 36305668, 31589839, 27782369, 26280043, 24190560, 21857693, 20148980, 21913166, 21351504, 20986349];

// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 100,
  bottom: 60,
  left: 200
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 3:
// Import data from the mojoData.csv file
// =================================
// d3.csv("mojoData.csv", function(error, mojoData) {
//   if (error) throw error;

  // Step 4: Parse the data
  // Format the data and convert to numerical and date values
  // =================================
  // Create a function to parse date and time
  // var parseTime = d3.timeParse("%d-%b");

  // // Format the data
  // mojoData.forEach(function(data) {
  //   data.date = parseTime(data.date);
  //   data.morning = +data.morning;
  //   data.evening = +data.evening;
  // });

  // Step 5: Create Scales
  //= ============================================
  var xLinearScale = d3.scaleOrdinal()
    .domain(d3.extent(z))
    .range([0, width]);

  var yLinearScale1 = d3.scaleLinear()
    .domain([0, d3.max(x)])
    .range([height, 0]);

  var yLinearScale2 = d3.scaleLinear()
    .domain([0, d3.max(y)])
    .range([height, 0]);

  // Step 6: Create Axes
  // =============================================
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale1);
  var rightAxis = d3.axisRight(yLinearScale2);


  // Step 7: Append the axes to the chartGroup
  // ==============================================
  // Add bottomAxis
  chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(bottomAxis);

  // Add leftAxis to the left side of the display
  chartGroup.append("g").call(leftAxis);

  // Add rightAxis to the right side of the display
  chartGroup.append("g").attr("transform", `translate(${width}, 0)`).call(rightAxis);


  // Step 8: Set up two line generators and append two SVG paths
  // ==============================================
  // Line generators for each line
  var line1 = d3
    .line()
    .x(d => xLinearScale(d.z))
    .y(d => yLinearScale1(d.x));

  var line2 = d3
    .line()
    .x(d => xLinearScale(d.z))
    .y(d => yLinearScale2(d.y));