const chai = require('chai')
const _ = require('lodash')
const axios = require('axios')

const assert = chai.assert


async function testCreation() {
    try {
        const data = {
            name: "Test Driver"
        }
        const driver = await axios.post("http://localhost:8000/automob/app/driver", data)

        if(_.isEmpty(driver.data)){
            assert.fail()
        } else {
            assert.equal(driver.status, 200)
            assert.equal(driver.data.message, "Motorista cadastrado com sucesso")

            global.idTestDriver = driver.data.data.idDriver
        }
    } catch (e) {
        console.log(e)
        assert.fail()
    }
}

async function testgetAll() {
    try {
        const listDrivers = await axios.get("http://localhost:8000/automob/app/driver")

        if(_.isEmpty(listDrivers.data) || _.isEmpty(listDrivers.data.data)){
            assert.fail()
        } else {
            assert.equal(listDrivers.status, 200)
        }
    } catch (e) {
        console.log(e)
        assert.fail()
    }
}

async function testGetOne() {
    try {
        const driver = await axios.get("http://localhost:8000/automob/app/driver/" + global.idTestDriver)

        if(_.isEmpty(driver.data) || _.isEmpty(driver.data.data)){
            assert.fail()
        } else {
            assert.equal(driver.status, 200)
        }
    } catch (e) {
        console.log(e)
        assert.fail()
    }
}

async function testUpdate() {
    try {
        const data = {
            name: "Test Driver atualizado"
        }
        const driver = await axios.put("http://localhost:8000/automob/app/driver/" + global.idTestDriver, data)

        if(_.isEmpty(driver.data)){
            assert.fail()
        } else {
            assert.equal(driver.status, 200)
            assert.equal(driver.data.message, "Motorista atualizado com sucesso")
        }
    } catch (e) {
        console.log(e)
        assert.fail()
    }
}

describe('Driver Tests', () => {
    it('test Creating test driver', testCreation)
    it('test getting the list of drivers', testgetAll)
    it('test getting the test driver', testGetOne)
    it('test updating test driver', testUpdate)
})