foo(async (x) => {});
foo(async ([x]) => {});
foo(async ({ x }) => {});

foo(async function (x) {});
foo(async function ([x]) {});
foo(async function ({ x }) {});

foo(async ([]) => {});
foo(async ({}) => {});

foo(async function ([]) {});
foo(async function ({}) {});

export default async ([...x]) => {};

