const { expectCt } = require("helmet");

const multiply = (a,b) => {
    return a * b;
}

test("multiply 2*2 should return 4", () => {
  expect(multiply(2,2)).toBe(4); // 2 * 2 = 4
});