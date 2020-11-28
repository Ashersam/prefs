import * as localForage from 'localforage';

export function getInitialValue (key) {
    try {
        const value = localForage.getItem(key);
        return value
    } catch (err) {
        console.log(err);
    }
}

export function backend(key, propValues) {
    localStorage.setItem(key, JSON.stringify(propValues))
    return JSON.parse(localStorage.getItem(key))
}
