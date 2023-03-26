import { Container } from '@mui/system';
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

function draw(scatterPlotRef) {
    console.log(scatterPlotRef);
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = scatterPlotRef.current.clientWidth - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("class", "scatter-plot")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    var x = d3.scaleLinear()
        .domain([0, 4000])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 500000])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));
    //Read the data
    d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv", function (data) {
        // Add dots
        svg.append('g')
            .selectAll("dot")
            .data([data])
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d.GrLivArea); })
            .attr("cy", function (d) { return y(d.SalePrice); })
            .attr("r", 3)
            .style("fill", "#D6EAF8")
            .style("stroke", "#3498DB")

    })
}

function ScatterPlot() {
    const scatterPlotRef = useRef();
    useEffect(() => {
        draw(scatterPlotRef);
        return () => {
            d3.select(".scatter-plot").remove();
        }
    }, []);
    return (
        <>
            <Container ref={scatterPlotRef} >
                <div id="my_dataviz"></div>
            </Container>
        </>
    )
}

export default ScatterPlot;