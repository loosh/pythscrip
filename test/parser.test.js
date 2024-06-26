import * as assert from 'assert';
import parse from '../src/parser.js';

const goodPrograms = [
  'parses log(*52 +7 +5 3 < 5 < *10 +5 _3)',
  'parses f addFive(x) => r +x 5;',
  `?x < 5: log('x is less than 5');
  !? x > 5: log('x is greater than 5');
  !: log('x is equal to 5');`,
  'log(5F ? 5 > 5F ! false)',
  `hello
   hello = 'world'`,
  `i in 1,10: log(*i 10);
  s = 'hello'
  i in 0,#s: log(s[i]);
  loops = 5
  count = 0
  i in 0,loops: 3++ br;
  ?5<2: log(5++);`,
  `fruit in fruits: log(5) ?5>2: br;;
  w fruit: log(5) t: fetchAPI(); e():log('failed');;`,
  `?5>2: th 'test';`,
  `*.5: log('this will log 5 times');`,
  `fgcd(a,b)=>?a==b:r a;!?a>b:r gcd(-a b, b);!:r gcd(a,b);;
  gcd(12, 20)`,
  'gcd()',
  'b+=1',
  'a = _5',
  'log(*a +1 *b 0.01)',
  `['banana', 'apple', 'orange']`,
  `i in 1, 10: ?%i 2: log(i); !: br;;`,
  `b++
  b--`,
  `obj = {a: +5 2, b: 10}
  log(obj.a)`,
  `a=0
  *.5: log('this will log 5 times');
  a++
  *.10: log('this will log 10 times');`,
  `f multiplyByTwo(a) => r *a 2;
  log(5 |> multiplyByTwo |> multiplyByTwo)`,
  'log(sin(pi) |> log)',
];

const badPrograms = [
  `function(a, b) {
    return a + 
  }`,
  `log(5 5)`,
  `log(+5)`,
  `while (true) {
    console.log('hi')
  }`,
  `if (true) {
    console.log('hi')
  }`,
];

describe('Parser', () => {
  for (const program of goodPrograms) {
    it(program, () => {
      assert.ok(parse(program));
    });
  }
  for (const program of badPrograms) {
    it(`invalid syntax ${program}`, () => {
      assert.throws(() => parse(program));
    });
  }
});