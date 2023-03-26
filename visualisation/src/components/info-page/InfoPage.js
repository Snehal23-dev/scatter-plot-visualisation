import { Grid, Typography } from "@mui/material";

function InfoPage({text}) {
    return (
        <Grid container justifyContent="center" alignItems="center" sx={{height: '70vh'}}>
          <Typography variant="h4" align="center" sx={{color: '#808B96'}}>{text}</Typography>
        </Grid>
    )
}

export default InfoPage;