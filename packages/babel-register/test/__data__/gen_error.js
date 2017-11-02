/* eslint-disable */
module.exports = () => { let error; try { const impossible_result = ''.toFixed(); } catch (e) { error = e; } return error.stack.toString().replace('\n', ''); }


