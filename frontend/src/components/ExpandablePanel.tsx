import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useState, type ReactNode } from "react";
let renderCount = 0;
function ExpandablePanel({header, children}: {
        header: ReactNode
        children: ReactNode,
    }) {

    const [isExpanded, setIsExpanded] = useState(false)
    const handleExpand = () => {
        setIsExpanded(!isExpanded)
    }
    renderCount++
    console.log(renderCount);

    return (
            <div className="mb-2 border rounded">
                <div className="flex p-2 justify-between items-center cursor-pointer">
                    <div className="flex flex-row items-center justify-between">
                        {header}
                    </div>
                    <div onClick={handleExpand}>
                        {isExpanded? <ArrowDropDownIcon /> : <ArrowLeftIcon />}
                    </div>
                </div>
                {
                    isExpanded && <div className="p-2 border-t">{children}</div>
                }
            </div>    
    )
}
export default ExpandablePanel
