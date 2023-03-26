import FileUploadIcon from '@mui/icons-material/FileUpload';
import TimelineIcon from '@mui/icons-material/Timeline';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useRef } from 'react';

function QuickActions() {
    const fileUploadRef = useRef();

    const handleFileChange = (e) => {
        if (e.target.files) {
            console.log("File uploaded", e.target.files[0]);

            const formData = new FormData();
            formData.append("file", e.target.files[0]);

            fetch("/file/upload", {
                method: 'POST',
                body: formData
              });
        }
    }

    const handleFileUpload = () => {
        fileUploadRef.current.click();
    };

    const actions = [
        { icon: <FileUploadIcon />, name: 'Upload', onClick: handleFileUpload },
        { icon: <TimelineIcon />, name: 'Predict' }
    ];

    const speedDialAction = () => {
        return actions.map(action =>
            <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={action.onClick}
            />
        )
    };

    return (
        <>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
            >
                {speedDialAction()}
            </SpeedDial>
            <input ref={fileUploadRef} type="file" accept=".csv" hidden onChange={handleFileChange} />
        </>
    )
}

export default QuickActions;