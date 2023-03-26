import { Container } from '@mui/system';
import * as d3 from 'd3';
import { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../context/Context';
import InfoPage from '../info-page/InfoPage';
import draw from './PlotGraph';



function ScatterPlot() {
    const [data, setData] = useState([]);
    const scatterPlotRef = useRef();
    const [graphData, setGraphData] = useContext(Context)

    useEffect(() => {
        setData(graphData)
    }, [graphData])

    useEffect(() => {
        if (data.length > 0) {
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
                    data.length > 0 ? <div id="my_dataviz"></div> : <InfoPage text="Please upload csv file" />
                }

            </Container>
        </>
    )
}

export default ScatterPlot;