import { useState, useEffect } from "react";

const MyLuckNo = () => {
  const results = [], [randomNumber, setRandomNumber] = useState(null);

  // Next.js 10 uses Babel 7.12, which supports up to ES2022
  // log results to create side effects

  // RegExp modifiers
  // results.push(/[A-Z](?-i[a-z])/i.test("Aa"));
  
  // ES2025
  // results.push(/(?<year>[0-9]{4})-[0-9]{2}|[0-9]{2}-(?<year>[0-9]{4})/.test("2000"));

  // ES2024
  // results.push(/[[0-7]&&[5-9]]\u{10FFFF}/v.test("0"));

  // ES2022
  results.push(class C {
    static property;
    static #property;
    #method() {}
    property = #property in C;
  });

  // ES2021
  results.push(results ??= [0xEB_2021]);

  // ES2020
  results.push(results?.[0] ?? [2020n]);

  // ES2019
  try {
    results.push({});
    throw new Error();
  } catch {}

  // ES2018
  results.push(async function *iter({ ...state }) { yield* iter({ ...state }) });
  results.push(/\p{ASCII}(?<second>.)/us.exec("you"));

  // ES2017
  results.push(async function foo() { await foo() });

  // ES2016
  results.push(201 ** 6);

  // ES2015
  results.push(() => { 
    let a = class {
      [foo](x = new.target, [...y]) {
        for ({x} of y) {
          const \u{1d49c} = /foo(.)bar/uy.exec(`foo💩bar`) instanceof a;
          results.push(\u{1d49c});
        }
      }; 
    }
  });

  // ES5
  results.push({ get bar() { return }, set bar(v) {} })

  // ES3
  var abstract = 1;
  results.push(({ const: abstract }).const = true);

  const recalculate = () => {
    setRandomNumber(Math.ceil(Math.random() * 100));
  };

  useEffect(() => {
    recalculate();
    console.log(results);
  }, []);

  // do expressions
  const message = do {
    if (randomNumber < 30) {
      // eslint-disable-next-line no-unused-expressions
      ("Do not give up. Try again.");
    } else if (randomNumber < 60) {
      // eslint-disable-next-line no-unused-expressions
      ("You are a lucky guy");
    } else {
      // eslint-disable-next-line no-unused-expressions
      ("You are soooo lucky!");
    }
  };

  // JSX
  if (randomNumber === null) return <p>Please wait..</p>;
  return (
    <div>
      <h3>Your Lucky number is: "{randomNumber}"</h3>
      <p>{message}</p>
      <button onClick={() => recalculate()}>Try Again</button>
    </div>
  );
};

export default MyLuckNo;
