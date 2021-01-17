const chai = require('chai')
const _ = require('lodash')
const axios = require('axios')

const assert = chai.assert

async function testDelete() {
    try {
        const driver = await axios.delete("http://localhost:8000/automob/app/driver/" + global.idTestDriver)

        if(_.isEmpty(driver.data)){
            assert.fail()
        } else {
            assert.equal(driver.status, 200)
            assert.equal(driver.data.message, "Motorista deletado com sucesso")
        }
    } catch (e) {
        console.log(e)
        assert.fail()
    }
}

async function testDelete() {
    try {
        const car = await axios.delete("http://localhost:8000/automob/app/car/" + global.idTestCar)

        if(_.isEmpty(car.data)){
            assert.fail()
        } else {
            assert.equal(car.status, 200)
            assert.equal(car.data.message, "Carro deletado com sucesso")
        }
    } catch (e) {
        console.log(e)
        assert.fail()
    }
}


describe('Deleting Tests', () => {
    it('test deleting test driver', testDelete)
    it('test deleting test car', testDelete)
})