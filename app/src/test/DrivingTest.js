const chai = require('chai')
const assert = chai.assert
const _ = require('lodash')
const axios = require('axios')

let idTestDriving = null

async function testCreation() {
    try {
        const data = {
            "idDriver": global.idTestDriver,
            "idCar": global.idTestCar,
            "reason": "rasão teste"
        }

        const driving = await axios.post("http://localhost:8000/automob/app/driving/setInUse", data)

        if(_.isEmpty(driving.data)){
            assert.fail()
        } else {
            assert.equal(driving.status, 200)
            assert.equal(driving.data.message, "Aluguel de carro cadastrado com sucesso")

            idTestDriving = driving.data.data.idDriving
        }
    } catch (e) {
        console.log(e)
        assert.fail()
    }
}

async function testEndDriving() {
    try {
        const data = {
            "idDriver": global.idTestDriver,
            "idCar": global.idTestCar,
            "idDriving": idTestDriving
        }

        const driving = await axios.post("http://localhost:8000/automob/app/driving/setFree", data)

        if(_.isEmpty(driving.data)){
            assert.fail()
        } else {
            assert.equal(driving.status, 200)
            assert.equal(driving.data.message, "Finalização do aluguel de carro cadastrado com sucesso")
        }
    } catch (e) {
        console.log(e)
        assert.fail()
    }
}



describe('Driving Tests', () => {
    it('test Creating driving', testCreation)
    it('test ending driving', testEndDriving)
})