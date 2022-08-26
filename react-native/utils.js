export const debounce = (func, time) => {
    let timer;
    return function (...args) {
        const context = this;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            func.apply(context, args);
        }, time);
    };
};


export const getDateValue = (key) => {
    const value = {
        "Sun": 1,
        "Mon": 2,
        "Tue": 3,
        "Wed":4,
        "Thu":5,
        "Fri":6,
        "Sat":7,
    }
    return value[key]
}

export const isValidEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return re.test(email);
}