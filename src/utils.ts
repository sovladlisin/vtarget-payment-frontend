import axios from "axios";
import { useEffect, useState } from "react";

export const URL = window.location.host.includes('localhost') ? "http://" + window.location.host + '/' : "https://" + window.location.host + '/'
export const SERVER_URL = window.location.host.includes('localhost') ? 'http://localhost:8000/' : 'https://vtarget-payment-server.herokuapp.com/'




export const useKeyPress = (targetKey) => {

    // State for keeping track of whether key is pressed

    const [keyPressed, setKeyPressed] = useState(false);



    // If pressed key is our target key then set to true

    function downHandler({ key }) {
        if (key === targetKey) {
            console.log(key)
            setKeyPressed(true);

        }

    }



    // If released key is our target key then set to false

    const upHandler = ({ key }) => {

        if (key === targetKey) {

            setKeyPressed(false);

        }

    };



    // Add event listeners

    useEffect(() => {

        window.addEventListener('keydown', downHandler);

        window.addEventListener('keyup', upHandler);

        // Remove event listeners on cleanup

        return () => {

            window.removeEventListener('keydown', downHandler);

            window.removeEventListener('keyup', upHandler);

        };

    }, []); // Empty array ensures that effect is only run on mount and unmount



    return keyPressed;

}

export const myCustomLocale = {
    // months list by order
    months: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ],

    // week days by order
    weekDays: [
        {
            name: 'Воскресенье', // used for accessibility 
            short: 'Вс', // displayed at the top of days' rows
            isWeekend: true, // is it a formal weekend or not?
        },
        {
            name: 'Понедельник',
            short: 'Пн',
        },
        {
            name: 'Вторник',
            short: 'Вт',
        },
        {
            name: 'Среда',
            short: 'Ср',
        },
        {
            name: 'Четверг',
            short: 'Чт',
        },
        {
            name: 'Пятница',
            short: 'Пт',
        },
        {
            name: 'Суббота',
            short: 'Сб',
            isWeekend: true,
        },
    ],

    // just play around with this number between 0 and 6
    weekStartingIndex: 0,

    // return a { year: number, month: number, day: number } object
    getToday(gregorainTodayObject) {
        return gregorainTodayObject;
    },

    // return a native JavaScript date here
    toNativeDate(date) {
        return new Date(date.year, date.month - 1, date.day);
    },

    // return a number for date's month length
    getMonthLength(date) {
        return new Date(date.year, date.month, 0).getDate();
    },

    // return a transformed digit to your locale
    transformDigit(digit) {
        return digit;
    },

    // texts in the date picker
    nextMonth: 'Next Month',
    previousMonth: 'Previous Month',
    openMonthSelector: 'Open Month Selector',
    openYearSelector: 'Open Year Selector',
    closeMonthSelector: 'Close Month Selector',
    closeYearSelector: 'Close Year Selector',
    defaultPlaceholder: 'Select...',

    // for input range value
    from: 'от',
    to: 'до',


    // used for input value when multi dates are selected
    digitSeparator: ',',

    // if your provide -2 for example, year will be 2 digited
    yearLetterSkip: 0,

    // is your language rtl or ltr?
    isRtl: false,
}

export const mergeArrays = (...arrays): number[] => {
    let jointArray = []

    arrays.forEach(array => {
        jointArray = [...jointArray, ...array]
    })
    const uniqueArray = jointArray.reduce((newArray, item) => {
        if (newArray.includes(item)) {
            return newArray
        } else {
            return [...newArray, item]
        }
    }, [])
    return uniqueArray
}

export const convertDateToString = (date: Date, end = false) => {
    const year = date.getFullYear() + ''
    const month = ((date.getMonth() + 1) + '').length === 1 ? '0' + (date.getMonth() + 1) : '' + (date.getMonth() + 1)
    const day = (date.getDate() + '').length === 1 ? '0' + date.getDate() : '' + date.getDate()
    var result = year + '-' + month + '-' + day
    result = end ? result + ' 24:00' : result + ' 00:00'
    return result
}

export const convertStringToDate = (time, end = false): Date => {
    const t = time.split(' ')[0].split('-')
    var result = new Date(parseInt(t[0]), parseInt(t[1]) - 1, parseInt(t[2]))
    if (end) result.setHours(24)
    if (end) result.setMinutes(0)
    if (end) result.setSeconds(0)

    if (!end) result.setHours(0)
    if (!end) result.setMinutes(0)
    if (!end) result.setSeconds(0)

    else result.setHours(0)
    return result
}

export const cloneArray = (array: any[]) => {
    return JSON.parse(JSON.stringify(array))
}
export const cloneObject = (obj: {}) => {
    return JSON.parse(JSON.stringify(obj))

}
export const uniqueArray = (array) => {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};



export function performVkRequest(type: 'post' | 'get', method, params, token, v) {
    params['access_token'] = token
    params['v'] = v
    var res = null
    switch (type) {
        case 'post':
            return axios.post('https://api.vk.com/method/' + method, { params: params }).then(res => {
                this.res = res.data
                return res
            })

        case 'get':
            return axios.get('https://api.vk.com/method/' + method, { params: params }).then(res => {
                this.res = res.data
                return res
            })
    }
}

export const convertMoney = (m: number) => {
    return m.toLocaleString().replace(/,/g, " ",) + '  ₽'
}

export const getCabinetStatusColor = (status: number) => {
    var status_color = 'red'
    status_color = status === 1 ? 'green' : status_color
    status_color = status === 2 ? 'yellow' : status_color
    return status_color
}