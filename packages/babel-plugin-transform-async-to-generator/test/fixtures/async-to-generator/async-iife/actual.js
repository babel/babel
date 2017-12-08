(async function() { await 'ok' })();
(async () => { await 'ok' })();
async function notIIFE() { await 'ok' }
notIIFE();
