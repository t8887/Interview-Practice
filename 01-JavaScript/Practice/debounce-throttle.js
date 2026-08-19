const deBounceFunc = (fn, delay) => {
    let timeoutId;

    return (...args) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
};

function throttle(func, delay) {
    let isThrottled = false;

    return function (...args) {
        // If locked, ignore the function call
        if (isThrottled) return;

        // Execute the main function
        func.apply(this, args);
        isThrottled = true;

        // Reset the lock after the delay expires
        setTimeout(() => {
            isThrottled = false;
        }, delay);
    };
}
