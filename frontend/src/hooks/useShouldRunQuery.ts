import { useState } from "react";
export function useShouldRunQuery(){
    const [shouldRunQuery, setShouldRunQuery] = useState(false);
    const onExpand = () => setShouldRunQuery(true)
    console.log("useShouldrunquery");
    
    return {
        shouldRunQuery, onExpand
    }
}