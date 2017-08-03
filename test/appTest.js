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
    superagent.get('http://localhost:8888/object/key1').end((err, res) => {
      if (err) { return done(err) }
      assert.equal(res.status, 200)
      assert.deepEqual(res.body, {"key":"key1","value":"value2","timestamp":"Thu Aug 03 2017 21:02:00 GMT+0800 (+08)"})
      done()
    })
  })
})
