var C;

C = class { static { await } };

C = class { static { () => await } };

C = class { static { (await) => {} } };

C = class { static { (await) } };

C = class { static { async (await) => {} } };

C = class { static { async (await) } };

C = class { static { ({ [await]: x}) => {} } };

C = class { static { ({ [await]: x}) } };

C = class { static { async ({ [await]: x}) => {} } };

C = class { static { async ({ [await]: x}) } };

async (x = class { static { await } }) => {};
