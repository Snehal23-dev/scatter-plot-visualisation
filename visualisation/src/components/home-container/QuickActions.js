import FileUploadIcon from '@mui/icons-material/FileUpload';
import TimelineIcon from '@mui/icons-material/Timeline';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';

const actions = [
    { icon: <FileUploadIcon />, name: 'Upload' },
    { icon: <TimelineIcon />, name: 'Predict' }
];

const speedDialAction = () => {
    return actions.map(action => 
         <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
        />
    )
};

function QuickActions() {

    return (
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
            >
                {speedDialAction()}
            </SpeedDial>

    )
}

export default QuickActions;