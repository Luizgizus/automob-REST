const Driver = require('../model/driver')
const _ = require('lodash')

class DriverCtrl {
    constructor(dbPool) {
        this.driver = new Driver(dbPool)
    }

    async listAll(body) {
        const response = {
            message: null,
            statusCode: 500,
            data: []
        }

        try {
            const driverList = await this.driver.listAll(body)            

            response.data = driverList
            response.statusCode = 200
        }
        catch (err) {
            response.message = `Erro desconhecido ao recperar motoristas -> ${err.toString()}`
        } finally {
            return response
        }
    }

    hasIdDriver(params){
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
                name: null
            }
        }

        if(_.isEmpty(body)){
            response.message = "nenhum dado do motorista foi enviado"
            response.statusCode = 400
            response.isValid = false
        } else if(!body.name){
            response.message = "Favor informar corretamente o nome do motorista"
            response.statusCode = 400
            response.isValid = false
        } else {
            response.data.name = body.name
        }

        return response
    }

    async listById(idDriver){
        const response = {
            message: null,
            statusCode: 500,
            data: {}
        }

        try {
            const driver = await this.driver.listById(idDriver)
            
            if(_.isEmpty(driver)){
                response.message = "Motorista não encotrado"
                response.statusCode = 404
            } else {
                response.data = driver
                response.statusCode = 200
            }
        }
        catch (err) {
            response.message = `Erro desconhecido ao recperar motorista pelo identificador -> ${err.toString()}`
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
            const createdDriver = await this.driver.create(body.name)
            
            if(_.isEmpty(createdDriver) && !createdDriver.affectedRows){
                response.message = "Não foi possivel criar esse motorista tente novamente mais tarde"
                response.statusCode = 500
            } else {
                response.message = "Motorista cadastrado com sucesso"
                body.idDriver = createdDriver.insertId
                response.data = body
                response.statusCode = 200
            }
        }
        catch (err) {
            response.message = `Erro desconhecido ao criar motorista -> ${err.toString()}`
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
            const updatedDriver = await this.driver.update(
                body.name,
                id
            )
            
            if(_.isEmpty(updatedDriver) || !updatedDriver.affectedRows){
                response.message = "Não foi possivel atualizar esse motorista"
                response.statusCode = 500
            } else {
                response.message = "Motorista atualizado com sucesso"
                body.idDriver = id
                response.data = body
                response.statusCode = 200
            }
        }
        catch (err) {
            response.message = `Erro desconhecido ao atualizar motorista -> ${err.toString()}`
        } finally {
            return response
        }
    }

    async delete(idDriver){
        const response = {
            message: null,
            statusCode: 500
        }

        try {
            const deletedDriver = await this.driver.delete(idDriver)
            
            if(_.isEmpty(deletedDriver) || deletedDriver.affectedRows !== 1){
                response.message = "Motorista não encotrado"
                response.statusCode = 404
            } else {
                response.message = "Motorista deletado com sucesso"
                response.statusCode = 200
            }
        }
        catch (err) {
            response.message = `Erro desconhecido ao deletar motorista pelo identificador -> ${err.toString()}`
        } finally {
            return response
        }
    }
}

module.exports = DriverCtrl