const assert = require('chai').assert
const superagent = require('superagent')
const server = require('../index')

describe('Server', () => {

  beforeEach((done) => {
    server.listen(8888, (err) => {
      done(err)
    })
  })

  afterEach((done) => {
    server.close((err) => {
      done(err)
    })
  })

  // Passing tests
  it('should return an object after succesfully posting {"newKey": "newValue"} at /object', (done) => {
    superagent.post('http://localhost:8888/object').send({"newKey": "newValue"}).set('Accept', 'application/json').end((err, res) => {
      if (err) { return done(err) }
      assert.equal(res.status, 200)
      assert.include(res.body, {"key":"newKey","value":"newValue"})
      // ^ used include instead of deepEqual to exclude timestamp from testing as not possible to have a matching pair of timestamps down to the milliseconds.
      done()
    })
  })

  it('should return an object at /object/key2', (done) => {
    superagent.get('http://localhost:8888/object/key2').end((err, res) => {
      if (err) { return done(err) }
      assert.equal(res.status, 200)
      assert.deepEqual(res.body, {"key":"key2","value":"value1","timestamp":"Thu Aug 03 2017 21:01:00 GMT+0800 (+08)"})
      done()
    })
  })

  it('should return the most recently updated value "value3" at /object/key1', (done) => {
    superagent.get('http://localhost:8888/object/key1').end((err, res) => {
      if (err) { return done(err) }
      assert.equal(res.status, 200)
      assert.deepEqual(res.body, {"key":"key1","value":"value3","timestamp":"Thu Aug 03 2017 21:04:00 GMT+0800 (+08)"})
      done()
    })
  })

  it('should return the corresponding value "value2" at /object/key1?timestamp=1501765380', (done) => {
    superagent.get('http://localhost:8888/object/key1?timestamp=1501765380').end((err, res) => {
      if (err) { return done(err) }
      assert.equal(res.status, 200)
      assert.deepEqual(res.body, {"key":"key1","value":"value2","timestamp":"Thu Aug 03 2017 21:02:00 GMT+0800 (+08)"})
      done()
    })
  })

  // Failing testing
  it('should return a 422 status and error statement when posting an object with empty value at /object', (done) => {
    superagent.post('http://localhost:8888/object').send({"newKey":""}).end((err, res) => {
      // expecting an err
      assert.equal(res.status, 422)
      assert.deepEqual(res.body.error, "Object validation failed: value: Path `value` is required.")
      done()
    })
  })
})
