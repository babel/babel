var obj = function (obj) {
    obj[foobar] = function () {
        return 'foobar';
    };
    return obj;
}({});
