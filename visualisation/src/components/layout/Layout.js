import { Container } from "@mui/material";
import Navbar from "../navbar/Navbar";

function Layout() {
    return (
        <Container maxWidth={false} disableGutters={true} sx={{ height: '100vh' }}>
            <Navbar />
        </Container>
    )
}

export default Layout;