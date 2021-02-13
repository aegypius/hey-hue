const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('chai')
const sinon = require('sinon')

Given('the following bridges or discoverables:', function (dataTable) {
  sinon.stub(this.hueApi, 'search').resolves(dataTable.hashes())
})

When('I execute GraphQL query:', async function (query) {
  const response = await this.api.query({
    query
  })
  this.setQueryResult(response.data)
})

Then('the response should contain JSON:', async function (expectedResponse) {
  const json = JSON.parse(expectedResponse)
  expect(this.queryResult).to.deep.equal(json)
})
