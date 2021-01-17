const Car = require('../model/car')
const _ = require('lodash')

class CarCtrl {
    constructor(dbPool) {
        this.car = new Car(dbPool)
    }

    async listAll() {
        const response = {
            message: null,
            statusCode: 500,
            data: []
        }

        try {
            const carList = await this.car.listAll()            

            response.data = carList
            response.statusCode = 200
        }
        catch (err) {
            response.message = `Erro desconhecido ao recperar carros -> ${err.toString()}`
        } finally {
            return response
        }
    }

    hasIdCar(params){
        if(_.isEmpty(params) || !params.id){
            return false
        } else{
            return true
        }
    }

    async validatingParams(body){
        const response = {
            isValid: true,
            message: null,
            statusCode: 200,
            data: {
                plate: null,
                brand: null,
                color: null
            }
        }

        const carByPlate = await this.getCarByPlate(body.plate)

        if(_.isEmpty(body)){
            response.message = "nenhum dado do carro foi enviado"
            response.statusCode = 400
            response.isValid = false
        } else if(!body.plate){
            response.message = "Favor informar corretamente a placa do carro"
            response.statusCode = 400
            response.isValid = false
        } else if(body.plate.length !== 7){
            response.message = "O tamanho da placa está incorreto, deve haver 7 caracteres"
            response.statusCode = 400
            response.isValid = false
        } else if(!_.isEmpty(carByPlate.data)){
            response.message = "Já existe um carro cadastrado com essa placa"
            response.statusCode = 409
            response.isValid = false
        } else if(!body.brand){
            response.message = "Favor informar corretamente a Marca do carro"
            response.statusCode = 400
            response.isValid = false
        } else if(!body.color){
            response.message = "Favor informar corretamente a cor do carro"
            response.statusCode = 400
            response.isValid = false
        } else {
            response.data.plate = body.plate
            response.data.brand = body.brand
            response.data.color = body.color
        }

        return response
    }

    async listById(idCar){
        const response = {
            message: null,
            statusCode: 500,
            data: {}
        }

        try {
            const car = await this.car.listById(idCar)
            
            if(_.isEmpty(car)){
                response.message = "Carro não encotrado"
                response.statusCode = 404
            } else {
                response.data = car
                response.statusCode = 200
            }
        }
        catch (err) {
            response.message = `Erro desconhecido ao recperar carro pelo identificador -> ${err.toString()}`
        } finally {
            return response
        }
    }

    async getCarByPlate(plate){
        const response = {
            message: null,
            statusCode: 500,
            data: {}
        }

        try {
            const car = await this.car.listByPlate(plate)
            
            if(_.isEmpty(car)){
                response.message = "Carro não encotrado"
                response.statusCode = 404
            } else {
                response.data = car
                response.statusCode = 200
            }
        }
        catch (err) {
            response.message = `Erro desconhecido ao recperar carro pela placa -> ${err.toString()}`
        } finally {
            return response
        }
    }

    async create(body){
        const response = {
            message: null,
            statusCode: 500,
            data: {}
        }

        try {
            const createdCar = await this.car.create(
                body.plate,
                body.brand,
                body.color
            )

            console.log(createdCar)
            
            if(_.isEmpty(createdCar) && !createdCar.affectedRows){
                response.message = "Não foi possivel criar esse carro tente novamente mais tarde"
                response.statusCode = 500
            } else {
                response.message = "Carro cadastrado com sucesso"
                body.idCar = createdCar.insertId
                response.data = body
                response.statusCode = 200
            }
        }
        catch (err) {
            response.message = `Erro desconhecido ao criar carro -> ${err.toString()}`
        } finally {
            return response
        }
    } 

    async update(body, id){
        const response = {
            message: null,
            statusCode: 500,
            data: {}
        }

        try {
            const updatedCar = await this.car.update(
                body.plate,
                body.brand,
                body.color,
                id
            )
            
            if(_.isEmpty(updatedCar) || !updatedCar.affectedRows){
                response.message = "Não foi possivel atualizar esse carro"
                response.statusCode = 500
            } else {
                response.message = "Carro atualizado com sucesso"
                body.idCar = id
                response.data = body
                response.statusCode = 200
            }
        }
        catch (err) {
            response.message = `Erro desconhecido ao atualizar carro -> ${err.toString()}`
        } finally {
            return response
        }
    }

    async delete(idCar){
        const response = {
            message: null,
            statusCode: 500
        }

        try {
            const deletedCar = await this.car.delete(idCar)
            
            if(_.isEmpty(deletedCar) || deletedCar.affectedRows !== 1){
                response.message = "Carro não encotrado"
                response.statusCode = 404
            } else {
                response.message = "Carro deletado com sucesso"
                response.statusCode = 200
            }
        }
        catch (err) {
            response.message = `Erro desconhecido ao deletar carro pelo identificador -> ${err.toString()}`
        } finally {
            return response
        }
    }
}

module.exports = CarCtrl