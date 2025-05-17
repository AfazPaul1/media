import { Grid,Paper,IconButton } from "@mui/material"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useState } from "react";
function ExpandablePanel({header, children}) {

    const [isExpanded, setIsExpanded] = useState()
    const handleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <>
        <Grid container justifyContent="center">
            <Grid size={6}>
                <Paper elevation={3} sx={{margin:1}}>
                <Grid  container  justifyContent="center">
                    {header}
                    <Grid size={2}>
                        <IconButton onClick={handleExpand}>
                            {isExpanded? <ArrowDropDownIcon fontSize="large"/> : <ArrowLeftIcon fontSize="large"/>}
                        </IconButton>
                    </Grid>
                </Grid>
                </Paper>
            </Grid>
        </Grid>
        {
            isExpanded && children
        }
        </>
    )
}
export default ExpandablePanel