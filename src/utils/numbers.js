import { range, padStart } from "lodash";
import {ANIMAL_NAMES, FEMALE_NAMES, MALE_NAMES} from "./names.js";


export const categories = {
    // threeD: '3D',
    fourD: '4D',
    fiveD: '5D',
    name: 'NAME',
    animal: 'ANIMAL',
}

export const getFilters = (type) => {
    // if(type === categories.threeD) {
    //     return {
    //         'NONE': () => true,
    //         'AAB': (item) => {
    //             return item[0] == item[1]
    //         },
    //         'ABA': (item) => {
    //             return item[0] == item[2]
    //         },
    //         'ABB': (item) => {
    //             return item[1] == item[2]
    //         },
    //         'XX0': (item) => {
    //             return item[2] == 0
    //         },
    //         '0XX': (item) => {
    //             return item[0] == 0
    //         },
    //         'AAA': (item) => {
    //             return item[0] == item[1] && item[2] == item[0]
    //         },
    //         'ABC': (item) => {
    //             return parseInt(item[0])+1 == parseInt(item[1]) &&
    //                 parseInt(item[1])+1 == parseInt(item[2])
    //         },
    //         'CBA': (item) => {
    //             return parseInt(item[1])+1 == parseInt(item[0]) &&
    //                 parseInt(item[2])+1 == parseInt(item[1])
    //         }
    //     }
    // } else
    if(type === categories.fourD) {
        return {
            'NONE': () => true,
            'AAAA': (item) => {
                return item[0] == item[1] && item[0] == item[2] && item[0] == item[3]
            },
            'ABCD': (item) => {
                return parseInt(item[0])+1 == parseInt(item[1]) &&
                    parseInt(item[1])+1 == parseInt(item[2]) &&
                    parseInt(item[2])+1 == parseInt(item[3])
            },
            'DCBA': (item) => {
                return parseInt(item[1])+1 == parseInt(item[0]) &&
                    parseInt(item[2])+1 == parseInt(item[1]) &&
                    parseInt(item[3])+1 == parseInt(item[2])
            },
            '000X': (item) => {
                return item[0] == 0 && item[1] == 0 && item[2] == 0
            },
            'X000': (item) => {
                return item[3] == 0 && item[1] == 0 && item[2] == 0
            },
            '00XX': (item) => {
                return item[0] == 0 && item[1] == 0
            },
            'XX00': (item) => {
                return item[2] == 0 && item[3] == 0
            },
            'AAAB': (item) => {
                return item[0] == item[1] && item[0] == item[2]
            },
            'ABBB': (item) => {
                return item[1] == item[2] && item[2] == item[3]
            },
            'AABA': (item) => {
                return item[0] == item[1] && item[0] == item[3]
            },
            'AABB': (item) => {
                return item[0] == item[1] && item[2] == item[3]
            },
            'ABAB': (item) => {
                return item[0] == item[2] && item[1] == item[3]
            },
            'ABBA': (item) => {
                return item[0] == item[3] && item[1] == item[2]
            },
        }
    } else if(type === categories.fiveD) {
        return {
            'NONE': () => true,
            'AAAAA': (item) => {
                return item[0] == item[1] && item[0] == item[2] && item[0] == item[3] && item[0] == item[4]
            },
            'ABCDE': (item) => {
                return parseInt(item[0])+1 == parseInt(item[1]) &&
                    parseInt(item[1])+1 == parseInt(item[2]) &&
                    parseInt(item[2])+1 == parseInt(item[3]) &&
                    parseInt(item[3])+1 == parseInt(item[4])
            },
            'EDCBA': (item) => {
                return parseInt(item[1])+1 == parseInt(item[0]) &&
                    parseInt(item[2])+1 == parseInt(item[1]) &&
                    parseInt(item[3])+1 == parseInt(item[2]) &&
                    parseInt(item[4])+1 == parseInt(item[3])
            },
            'XABCD': (item) => {
                return parseInt(item[1])+1 == parseInt(item[2]) &&
                    parseInt(item[2])+1 == parseInt(item[3]) &&
                    parseInt(item[3])+1 == parseInt(item[4])
            },
            '000XX': (item) => {
                return item[0] == 0 && item[1] == 0 && item[2] == 0
            },
            'XX000': (item) => {
                return item[2] == 0 && item[3] == 0 && item[4] == 0
            },
            'ABBBA': (item) => {
                return item[1] == item[2] && item[2] == item[3] && item[0] == item[4]
            },
            'ABBBB': (item) => {
                return item[1] == item[2] && item[2] == item[3] && item[3] == item[4]
            },
            'ABABA': (item) => {
                return item[1] == item[3] && item[0] == item[4] && item[0] == item[2]
            },
        }
    } else if(type === categories.name) {
        return {
            'FEMALE': (item) => FEMALE_NAMES.includes(item),
            'MALE': (item) => MALE_NAMES.includes(item),
        }
    } else if(type === categories.animal) {
        return {
            'NONE': () => true,
        }
    }
}

export const getFilter = (category, type) => {
    return getFilters(category)[type] || ((item) => !!item)
}

export const getAllNumbers = (category, filter) => {
    if(category === categories.threeD) {
        return range(1000).map((item)=> padStart(item, 3, '0'))
            .filter(getFilter(category, filter))
    } else if(category === categories.fourD) {
        return range(10000).map((item)=> padStart(item, 4, '0'))
            .filter(getFilter(category, filter))
    } else if(category === categories.fiveD) {
        return range(100000).map((item)=> padStart(item, 5, '0'))
            .filter(getFilter(category, filter))
    } else if(category === categories.name) {
        return ([].concat(MALE_NAMES).concat(FEMALE_NAMES)).filter(getFilter(category, filter))
    } else if(category === categories.animal) {
        return ANIMAL_NAMES
    }
}
