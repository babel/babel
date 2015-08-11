// Error: :8:25: implements is a reserved identifier
// Error :8:25: implements is a reserved identifier
// Error :10:1: implements is a reserved identifier
// Error :11:2: implements is a reserved identifier
// Error :12:3: implements is a reserved identifier
// Error :13:6: implements is a reserved identifier

function testImplements(implements) { 'use strict'; }

implements => { 'use strict'; };
(implements) => { 'use strict'; };
([implements]) => { 'use strict'; };
([...implements]) => { 'use strict'; };
({implements}) => { 'use strict'; };
