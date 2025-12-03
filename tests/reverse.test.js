const { test } = require("node:test"); // modulo de testing nativo de node.js
const assert = require("node:assert"); // modulo de aserciones para hacer pruebas

const reverse = require("../utils/for_testing").reverse;

test("reverse of a", () => {
  const result = reverse("a");
  assert.strictEqual(result, "a");
});

test("reverse of react", () => {
  const result = reverse("react");
  assert.strictEqual(result, "tcaer");
});

test("reverse of hola", () => {
  const result = reverse("hola");
  assert.strictEqual(result, "aloh");
});
