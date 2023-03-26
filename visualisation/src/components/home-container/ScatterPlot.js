import { Box, Typography } from '@mui/material';
import { Container } from '@mui/system';
import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';
import InfoPage from '../info-page/InfoPage';

function draw(scatterPlotRef, data) {
    // set the dimensions and margins of the graph
    var margin = { top: 100, right: 30, bottom: 30, left: 60 },
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
        .domain([0, d3.max(data, (d) => d.x) + 5])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d.y)+30000])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    //Read the data
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.x); })
        .attr("cy", function (d) { return y(d.y); })
        .attr("r", 5)
        .style("fill", "#D6EAF8")
        .style("stroke", "#3498DB")


}

function ScatterPlot() {
    const [data, setData] = useState([]);
    const scatterPlotRef = useRef();

    useEffect(() => {
        if(data.length > 0) {
            draw(scatterPlotRef, data);
        }

        return () => {
            d3.select(".scatter-plot").remove();
        }
    }, [data]);


    useEffect(() => {
        fetch('/file')
            .then((response) => response.json())
            .then((d) => setData(d));
    }, []);



    return (
        <>
            <Container ref={scatterPlotRef}>
                {
                    data.length > 0 ? <div id="my_dataviz"></div> : <InfoPage text="Please upload csv file"/>
                }
                
            </Container>
        </>
    )
}

export default ScatterPlot;