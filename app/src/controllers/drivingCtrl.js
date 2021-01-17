const Car = require('../model/car')
const Driver = require('../model/driver')
const Driving = require('../model/driving')
const _ = require('lodash')

class DrivingCtrl {
    constructor(dbPool) {
        this.driving = new Driving(dbPool)
        this.car = new Car(dbPool)
        this.driver = new Driver(dbPool)
    }

    async listAll() {
        const response = {
            message: null,
            statusCode: 500,
            data: []
        }

        try {
            const drivingList = await this.driving.listAll()            

            response.data = drivingList
            response.statusCode = 200
        }
        catch (err) {
            response.message = `Erro desconhecido ao recperar alugueis de carros -> ${err.toString()}`
        } finally {
            return response
        }
    }

    async validatingParamsCreate(body){
        const response = {
            isValid: true,
            message: null,
            statusCode: 200,
            data: {
                idDriver: null,
                idCar: null,
                reason: null
            }
        }

        const driver = await this.driver.listById(body.idDriver)
        const car = await this.car.listById(body.idCar)

        if(_.isEmpty(body)){
            response.message = "nenhum dado do carro foi enviado"
            response.statusCode = 400
            response.isValid = false
        } else if(_.isEmpty(driver)){
            response.message = "Esse motorista não existe"
            response.statusCode = 400
            response.isValid = false
        } else if(driver.isUsingCar){
            response.message = "Esse motorista já está usando um carro"
            response.statusCode = 400
            response.isValid = false
        } else if(!body.idCar){
            response.message = "Favor informar corretamente o carro a ser alugado"
            response.statusCode = 400
            response.isValid = false
        } else if(_.isEmpty(car)){
            response.message = "Esse carro não existe"
            response.statusCode = 400
            response.isValid = false
        } else if(car.isInUse){
            response.message = "Esse carro já está em uso no momento"
            response.statusCode = 400
            response.isValid = false
        } else if(!body.idDriver){
            response.message = "Favor informar corretamente o motorista que irá usar esse carro"
            response.statusCode = 400
            response.isValid = false
        } else if(!body.reason){
            response.message = "Favor informar corretamente a rasão de uso do motorista"
            response.statusCode = 400
            response.isValid = false
        } else {
            response.data.idDriver = body.idDriver
            response.data.idCar = body.idCar
            response.data.reason = body.reason
        }

        return response
    }

    async validatingParamsSetFree(body){
        const response = {
            isValid: true,
            message: null,
            statusCode: 200,
            data: {
                idDriving: null,
                idDriver: null,
                idCar: null
            }
        }

        const driving = await this.driving.getDrivingById(body.idDriving)

        if(_.isEmpty(body)){
            response.message = "nenhum dado do carro foi enviado"
            response.statusCode = 400
            response.isValid = false
        } else if(_.isEmpty(driving)){
            response.message = "Esse aluguel não existe"
            response.statusCode = 400
            response.isValid = false
        } else if(driving.endedAt){
            response.message = "Esse alugueljá foi encerrado posteriormente"
            response.statusCode = 400
            response.isValid = false
        } else if(driving.idCar !== parseInt(body.idCar)){
            response.message = "Esse aluguel não pertence ao carro enviado"
            response.statusCode = 400
            response.isValid = false
        } else if(driving.idDriver != parseInt(body.idDriver)){
            response.message = "Esse aluguel não pertence ao motorista enviado"
            response.statusCode = 400
            response.isValid = false
        } else if(!body.idDriving){
            response.message = "Favor informar a identificação do aluguel do carro"
            response.statusCode = 400
            response.isValid = false
        } else if(!body.idCar){
            response.message = "Favor informar corretamente o carro a ser alugado"
            response.statusCode = 400
            response.isValid = false
        } else if(!body.idDriver){
            response.message = "Favor informar corretamente o motorista que irá usar esse carro"
            response.statusCode = 400
            response.isValid = false
        } else {
            response.data.idDriver = body.idDriver
            response.data.idCar = body.idCar
            response.data.idDriving = body.idDriving
        }

        return response
    }

    async create(body){
        const response = {
            message: null,
            statusCode: 500,
            data: {}
        }

        try {
            const createdDriving = await this.driving.create(
                body.idDriver,
                body.idCar,
                body.reason
            )
            
            if(_.isEmpty(createdDriving) && !createdDriving.affectedRows){
                response.message = "Não foi possivel prosseguir com esse aluguel de carro tente novamente mais tarde"
                response.statusCode = 500
            } else {
                await this.driver.setIsUsingCar(1, body.idDriver)
                await this.car.setIsInUse(1, body.idCar)

                response.message = "Aluguel de carro cadastrado com sucesso"
                body.idDriving = createdDriving.insertId
                response.data = body
                response.statusCode = 200
            }
        }
        catch (err) {
            response.message = `Erro desconhecido ao criar aluguel de carro -> ${err.toString()}`
        } finally {
            return response
        }
    } 
    
    async setFree(body){
        const response = {
            message: null,
            statusCode: 500,
            data: {}
        }

        try {
            const endedDriving = await this.driving.endUse(
                body.idDriving
            )
            
            if(_.isEmpty(endedDriving) && !endedDriving.affectedRows){
                response.message = "Não foi possivel prosseguir com a finalização desse aluguel de carro tente novamente mais tarde"
                response.statusCode = 500
            } else {
                await this.driver.setIsUsingCar(0, body.idDriver)
                await this.car.setIsInUse(0, body.idCar)

                response.message = "Finalização do aluguel de carro cadastrado com sucesso"
                response.data = body
                response.statusCode = 200
            }
        }
        catch (err) {
            response.message = `Erro desconhecido ao finalizar aluguel de carro -> ${err.toString()}`
        } finally {
            return response
        }
    } 
}

module.exports = DrivingCtrl