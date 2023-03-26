import FileUploadIcon from '@mui/icons-material/FileUpload';
import TimelineIcon from '@mui/icons-material/Timeline';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useContext, useRef } from 'react';
import { Context } from '../../context/Context';

function QuickActions() {
    const fileUploadRef = useRef();
    const [graphData, setGraphData] = useContext(Context)


    const handleFileChange = (e) => {
        if (e.target.files) {

            const formData = new FormData();
            formData.append("file", e.target.files[0]);

            fetch("/file/upload", {
                method: 'POST',
                body: formData
            }).then((response) => response.json())
            .then((d) => setGraphData(d));
            
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