var width = 120,
    height = 120,
    num_axes = 4,
    tick_axis = 1,
    start = 0,
    end = 3,
    testValue = 2;


    var theta = function (r) {
        return -2 * Math.PI * r;
    };

    var arc = d3.svg.arc()
        .startAngle(0)
        .endAngle(3 * Math.PI);

    var radius = d3.scale.linear()
        .domain([start, end])
        .range([0, (d3.min([width, height]) / 2 - 20)]);

    var angle = d3.scale.linear()
        .domain([0, num_axes])
        .range([0, 180]);

    var chart = d3.select("#chart")
        .style("width", width + "px");

    var svg = d3.select("#chart").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + (height / 2 - 20) + ")");

    var pieces = d3.range(start, end, (end - start) / 500);
    var currentTotalPoints = 128;
    var toDraw = 0.000054545 * currentTotalPoints;


    var pieces2 = d3.range(start, toDraw, (toDraw - start) / 500);

    var spiral = d3.svg.line.radial()
        .interpolate("linear")
        .angle(theta)
        .radius(radius);

    var spiral2 = d3.svg.line.radial()
        .interpolate("linear")
        .angle(theta)
        .radius(radius);

    svg.selectAll(".spiral")
        .data([pieces])
        .enter().append("path")
        .attr("class", "spiral")
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", "7px")
        .attr("opacity", "0.4")
        .attr("d", spiral)
        .attr("transform", function (d) {
            return "rotate(" + 90 + ")"
        });

    svg.selectAll(".spiral2")
        .data([pieces2])
        .enter().append("path")
        .attr("class", "spiral2")
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", "7px")
        .attr("d", spiral2)
        .attr("transform", function (d) {
            return "rotate(" + 90 + ")"
        });

var t = d3.transition()
    .duration(0);


var spiralDraw = function(plus, current) {
    var pieces = d3.range(start, end, (end - start) / 500);
    var currentTotalPoints = plus + current;
    var toDraw = 0.000054545 * currentTotalPoints;


    pieces2 = d3.range(start, toDraw, (toDraw - start) / 500);

    d3.select(".spiral2")
        .data([pieces2])
        .transition(t)
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", "7px")
        .attr("d", spiral)
        .attr("transform", function (d) {
            return "rotate(" + 90 + ")"
        });

        animateValue("currentPoints", current, currentTotalPoints, 1000);
};



//рахуємо максимально