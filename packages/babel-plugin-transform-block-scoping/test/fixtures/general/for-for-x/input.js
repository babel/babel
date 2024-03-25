function w() {
    for (let i = 0; i < y; i++) {
        let outer = {}
        for (var key in someObj) {
            let x = () => outer;
        }
    }
}

function w2() {
    for (let i = 0; i < y; i++) {
        let outer = {}
        for (var key of someObj) {
            let x = () => outer;
        }
    }
}
