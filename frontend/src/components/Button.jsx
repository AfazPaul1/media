import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import '../main.css'
import className from 'classnames'


function Button1({
    children,
    primary,
    secondary,
    success,
    warning,
    danger,
    outline,
    rounded,
    ...rest
    }){
    
    const classes = className(rest.className, 'flex items-center px-3 py-1.5 border', {
        'border-blue-500 bg-blue-500 text-white': primary,
        'border-gray-500 bg-gray-500 text-white': secondary,
        'border-green-500 bg-green-500 text-white': success,
        'border-yellow-500 bg-yellow-500 text-white': warning,
        'border-red-500 bg-red-500 text-white': danger,
        'rounded-full': rounded,
        'bg-white! ': outline,
        'text-blue-500': outline & primary,
        'text-gray-500': outline & secondary,
        'text-green-500': outline & success,
        'text-yellow-500': outline & warning,
        'text-red-500': outline & danger,
        
    })
        
    
    return(
        <div>
            {/* <p className='px-6 bg-black italic shadow-2xs border-red-950 rounded-xs'>hello</p> */}
            <button {...rest} className={classes}>{children}</button>
        </div>
    )
}
     
Button1.propTypes = {
    primary: PropTypes.bool,
    checkVariationValue: ({primary,secondary,success,warning,danger}) => {
        const count = Number(!!primary) 
        + Number(!!secondary) 
        + Number(!!warning) 
        + Number(!!success)
        + Number(!!danger)

        if (count > 1) {
            return new Error("only one of the variations can be true")
        }
    },
}


export default Button1