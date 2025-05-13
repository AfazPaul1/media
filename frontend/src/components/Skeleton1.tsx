import {Skeleton} from '@mui/material'

function Skeleton1({times}){
    const boxes = Array(times).fill(0).map((_, i) => {
        return (
            <div key={i}>
                 <Skeleton animation="wave" variant="rounded" fullWidth  height={100}/>
            </div>
        )
    })
    return boxes
}

export default Skeleton1