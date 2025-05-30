function pause(duration: number){
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    })
}

export {pause}