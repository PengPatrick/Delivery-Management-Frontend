const {assign, assignIn} = require("lodash/object");


const aa = {

    'a': 1,

    'b': 2
}

const bb = {

    'a': 2,
    'c': 3
}

const cc = {

    'b': 3,
    'c': 4
}

const d = assignIn(aa,bb,cc)

console.log(d)