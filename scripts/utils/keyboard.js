const keys = {}

const setKey = (code, order = true) => {
    /*
        A - 65
        D - 68
        W - 87
        S - 83
        Space - 32
        Shift - 16
     */
    keys[code] = order
}

export  {
    keys, setKey
}