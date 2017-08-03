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

  it('should return something at /object/haha', (done) => {
    superagent.get('http://localhost:8888/object/haha').end((err, res) => {
      if (err) { return done(err) }
      assert.equal(res.status, 200)
      assert.equal(res.text, 'hahaha')
      done()
    })
  })
})
