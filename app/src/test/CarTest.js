const chai = require('chai')
const _ = require('lodash')
const axios = require('axios')

const assert = chai.assert

async function testCreation() {
    try {
        const data = {
            plate: "OOO0000",
            brand: "marca teste",
            color: "cor testes"
        }
        const car = await axios.post("http://localhost:8000/automob/app/car", data)

        if(_.isEmpty(car.data)){
            assert.fail()
        } else {
            assert.equal(car.status, 200)
            assert.equal(car.data.message, "Carro cadastrado com sucesso")

            global.idTestCar = car.data.data.idCar
        }
    } catch (e) {
        console.log(e)
        assert.fail()
    }
}

async function testCreationDuplicatedPlate() {
    try {
        const data = {
            plate: "OOO0000",
            brand: "marca teste",
            color: "cor teste"
        }
        
        await axios.post("http://localhost:8000/automob/app/car", data)

        assert.fail()
    } catch (e) {
        assert.equal(e.response.data.message, "Já existe um carro cadastrado com essa placa")
        assert.equal(e.response.status, 409)
    }
}

async function testgetAll() {
    try {
        const listCars = await axios.get("http://localhost:8000/automob/app/car")

        if(_.isEmpty(listCars.data) || _.isEmpty(listCars.data.data)){
            assert.fail()
        } else {
            assert.equal(listCars.status, 200)
        }
    } catch (e) {
        console.log(e)
        assert.fail()
    }
}

async function testGetOne() {
    try {
        const car = await axios.get("http://localhost:8000/automob/app/car/" + global.idTestCar)

        if(_.isEmpty(car.data) || _.isEmpty(car.data.data)){
            assert.fail()
        } else {
            assert.equal(car.status, 200)
        }
    } catch (e) {
        console.log(e)
        assert.fail()
    }
}

async function testUpdate() {
    try {
        const data = {
            plate: "OOO0001",
            brand: "marca teste atualizada",
            color: "cor teste atualizada"
        }
        const car = await axios.put("http://localhost:8000/automob/app/car/" + global.idTestCar, data)

        if(_.isEmpty(car.data)){
            assert.fail()
        } else {
            assert.equal(car.status, 200)
            assert.equal(car.data.message, "Carro atualizado com sucesso")
        }
    } catch (e) {
        console.log(e)
        assert.fail()
    }
}


describe('Car Tests', () => {
    it('test Creating test car', testCreation)
    it('test Creating test car with duplicated plate', testCreationDuplicatedPlate)
    it('test getting the list of cars', testgetAll)
    it('test getting the test car', testGetOne)
    it('test updating test car', testUpdate)
})