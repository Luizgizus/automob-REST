const _ = require('lodash')
const CarCtrl = require("../controllers/carCtrl")
const baseModuleRoute = "/car"

class CarRouter {
    constructor(app, appBaseRoute, dbPool) {
        this.app = app
        this.dbPool = dbPool
        this.baseRoute = appBaseRoute + baseModuleRoute

        this.response = {
            message: null,
            data: {}
        }
    }

	init() {
        this.app.get(`${this.baseRoute}`, this.list.bind(this))
        this.app.get(`${this.baseRoute}/:id`, this.getById.bind(this))
        this.app.post(`${this.baseRoute}`, this.create.bind(this))
        this.app.put(`${this.baseRoute}/:id`, this.update.bind(this))
        this.app.delete(`${this.baseRoute}/:id`, this.delete.bind(this))
    }
	
    async list(req, res) {
        const response = _.clone(this.response)
        try {
            const carCtrl = new CarCtrl(this.dbPool)
            const resp = await carCtrl.listAll()

            response.message = resp.message
            response.data = resp.data
            res.status(200)

        } catch (err) {
            console.log(err)
            response.message = "Erro ao realizar recuperação dos carros: " + err
            res.status(500)
        } finally {
            res.send(response)
        }
    }

    async getById(req, res) {
        const response = _.clone(this.response)
        try {
            const carCtrl = new CarCtrl(this.dbPool)

            if(carCtrl.hasIdCar(req.params)){
                const resp = await carCtrl.listById(req.params.id)

                response.message = resp.message
                response.data = resp.data
                res.status(200)
            } else {
                response.message = "Identificador do carro não informado"
                response.data = null
                res.status(400)
            }
        } catch (err) {
            console.log(err)
            response.message = "Erro ao realizar recuperação do carro pelo identificador. Erro: " + err
            res.status(500)
        } finally {
            res.send(response)
        }
    }

    async create(req, res) {
        const response = _.clone(this.response)
        try {
            const carCtrl = new CarCtrl(this.dbPool)

            const validatedParams = await carCtrl.validatingParams(req.body)

            if(validatedParams.isValid){
                const resp = await carCtrl.create(validatedParams.data)

                response.message = resp.message
                response.data = resp.data
                res.status(200)
            } else {
                response.message = validatedParams.message
                response.data = {}
                res.status(validatedParams.statusCode)
            }
        } catch (err) {
            console.log(err)
            response.message = "Erro ao criar carro: " + err
            res.status(500)
        } finally {
            res.send(response)
        }
    }

    async update(req, res) {
        const response = _.clone(this.response)
        try {
            const carCtrl = new CarCtrl(this.dbPool)

            if(carCtrl.hasIdCar(req.params)){
                const validatedParams = await carCtrl.validatingParams(req.body)

                if(validatedParams.isValid){
                    const resp = await carCtrl.update(req.body, req.params.id)

                    response.message = resp.message
                    response.data = resp.data
                    res.status(200)
                } else{
                    response.message = validatedParams.message
                    response.data = {}
                    res.status(validatedParams.statusCode)
            } 
        } else {
                response.message = "Identificador do carro não informado"
                response.data = null
                res.status(400)
            }
        } catch (err) {
            console.log(err)
            response.message = "Erro ao realizar atualização do carro: " + err
            res.status(500)
        } finally {
            res.send(response)
        }
    }

    async delete(req, res) {
        const response = _.clone(this.response)
        try {
            const carCtrl = new CarCtrl(this.dbPool)

            if(carCtrl.hasIdCar(req.params)){
                const resp = await carCtrl.delete(req.params.id)

                response.message = resp.message
                res.status(200)
            } else {
                response.message = "Identificador do carro não informado"
                response.data = null
                res.status(400)
            }
        } catch (err) {
            console.log(err)
            response.message = "Erro ao realizar exclusão do carro pelo identificador. Erro: " + err
            res.status(500)
        } finally {
            res.send(response)
        }
    }
}

module.exports = CarRouter