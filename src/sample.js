/**
 * Created by ace on 6/19/17.
 */
import * as d3 from 'd3';
import * as topojson from 'topojson';

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var projection = d3.geoMercator()
    .scale((width - 3) / (2 * Math.PI))
    .translate([width / 2, height / 2]);

var path = d3.geoPath()
    .projection(projection);

var graticule = d3.geoGraticule();

svg.append("defs").append("path")
    .datum({
        type: "Sphere"
    })
    .attr("id", "sphere")
    .attr("d", path);

svg.append("use")
    .attr("class", "stroke")
    .attr("xlink:href", "#sphere");

svg.append("use")
    .attr("class", "fill")
    .attr("xlink:href", "#sphere");

svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);

d3.json("https://rawgit.com/d3/d3-geo/master/test/data/world-50m.json", function(error, world) {
    if (error) throw error;

    svg.insert("path", ".graticule")
        .datum(topojson.feature(world, world.objects.land))
        .attr("class", "land")
        .attr("d", path);

    svg.insert("path", ".graticule")
        .datum(topojson.mesh(world, world.objects.countries, function(a, b) {
            return a !== b;
        }))
        .attr("class", "boundary")
        .attr("d", path);


    var coordinates = [
        projection([-74, 40]), // new york
        projection([37, 55]) // moscow
    ];

    console.log("coordinates", coordinates);

    var line = svg.append("path")
        .datum(coordinates)
        .attr("d", function(c) {
            var d = {
                source: c[0],
                target: c[1]
            };
            var dx = d.target[0] - d.source[0],
                dy = d.target[1] - d.source[1],
                dr = Math.sqrt(dx * dx + dy * dy);
            return "M" + d.source[0] + "," + d.source[1] + "A" + dr + "," + dr +
                " 0 0,1 " + d.target[0] + "," + d.target[1];
        })
        .style("stroke", "steelblue")
        .style("stroke-width", 5)
        .style("fill", "none")
        .transition()
        .duration(5000)
        .attrTween("stroke-dasharray", function() {
            var len = this.getTotalLength();
            return function(t) {
                return (d3.interpolateString("0," + len, len + ",0"))(t)
            };
        })
        .on('end', function(d) {
            var c = coordinates[1];
            svg.append('circle')
                .attr('cx', c[0])
                .attr('cy', c[1])
                .attr('r', 0)
                .style('fill', 'red')
                .style('fill-opacity', '0.5')
                .transition()
                .duration(2000)
                .attr('r', 50)
                .on('end', function(d) {
                    d3.select(this)
                        .transition()
                        .duration(2000)
                        .attr('r', 10);
                });
        });
});