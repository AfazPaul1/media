import {Skeleton, Stack} from '@mui/material'

function Skeleton1({times, height, width}: {
    times: number,
    height:number,
    width: number
}){
    const boxes = Array(times).fill(0).map((_, i) => {
        return (
            <div key={i}>
                 <Skeleton animation="wave" variant="rounded"  height={height} width={width}/>
            </div>
        )
    })
    return (
        <Stack  sx={{m:2, justifyContent: "center",alignItems: "center",}} spacing={2}>
            {boxes}
        </Stack>
    )
}

export default Skeleton1