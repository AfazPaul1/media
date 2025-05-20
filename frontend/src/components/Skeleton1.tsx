import {Skeleton, Stack} from '@mui/material'

function Skeleton1({times}){
    const boxes = Array(times).fill(0).map((_, i) => {
        return (
            <div key={i}>
                 <Skeleton animation="wave" variant="rounded" fullWidth  height={67} width={346}/>
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