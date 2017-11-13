let data = [true, false, false, true, false];

for (let index = 0; index < data.length; index++) {
    let item = data[index];
    if (!item) {
        data.splice(index, 1);
        index--;
        continue;
    }
    let fn = function () {item;};
}

assert(data.every(item => item));
