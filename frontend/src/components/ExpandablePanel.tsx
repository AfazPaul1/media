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
            <Grid spacing={2} container id='expandable' justifyContent='center'>
                <Grid container id='first row' size={12} justifyContent='center'>
                    <Paper elevation={3} >
                    <Grid  container   justifyContent="center">
                        {header}
                        <Grid size={2}>
                            <IconButton onClick={handleExpand}>
                                {isExpanded? <ArrowDropDownIcon fontSize="large"/> : <ArrowLeftIcon fontSize="large"/>}
                            </IconButton>
                        </Grid>
                    </Grid>
                    </Paper>
                </Grid>
                {
                    isExpanded && children
                }
            </Grid>
            
    )
}
export default ExpandablePanel