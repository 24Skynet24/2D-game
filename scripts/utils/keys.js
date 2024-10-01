const keys = {}

const setKey = (code, order = true) => {
    keys[code] = order
}

export  {
    keys, setKey
}