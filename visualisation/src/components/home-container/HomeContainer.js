import { Container } from "@mui/material";
import { useState } from "react";
import { Context } from "../../context/Context";
import QuickActions from "./QuickActions";
import ScatterPlot from "./ScatterPlot";



function HomeContainer() {
    const [graphData, setGraphData] = useState([]);
    return (
        <Context.Provider value={[graphData, setGraphData]}>
            <Container maxWidth={false}>
                <ScatterPlot />
                <QuickActions />
            </Container>
        </Context.Provider>

    )
}


export default HomeContainer;