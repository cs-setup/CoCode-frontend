const debounce = (fn, wait = 500, ) => {
    let timer = null;
    return (...args) => {
        timer && clearTimeout(timer);

        timer = setTimeout(() => {
            fn(...args)
        }, wait)
    }

}

export default debounce