import { Container } from "@mui/material";
import HomeContainer from "../home-container/HomeContainer";
import Navbar from "../navbar/Navbar";

function Layout() {
    return (
        <Container maxWidth={false} disableGutters={true} sx={{ height: '100vh' }}>
            <Navbar />
            <HomeContainer />
        </Container>
    )
}

export default Layout;