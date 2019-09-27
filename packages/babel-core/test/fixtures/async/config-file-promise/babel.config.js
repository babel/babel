const wait = t => new Promise(r => setTimeout(r, t));

module.exports = wait(50).then(() => ({
    plugins: ["./plugin"],
}));
