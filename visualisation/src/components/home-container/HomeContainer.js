import { Container } from "@mui/material";
import QuickActions from "./QuickActions";
import ScatterPlot from "./ScatterPlot";


function HomeContainer() {
    return (
        <Container maxWidth={false}>
            <ScatterPlot />
            <QuickActions />
        </Container>
    )
}


export default HomeContainer;