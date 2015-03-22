import {
  jsonStringify
} from '../../../helpers/json-stringify';
import { module, test } from 'qunit';

module('JsonStringifyHelper');

// Replace this with your real tests.
test('it works', function(assert) {
  var result = jsonStringify(42);
  assert.ok(result);
});
