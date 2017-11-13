/* eslint-disable */
module.exports = () => { 'use strict'; let error; try { const impossible_result = ''.toFixed(); } catch (e) { error = e; } return error.stack.toString().replace('\n', ''); }


