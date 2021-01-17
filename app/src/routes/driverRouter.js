const _ = require('lodash')
const DriverCtrl = require("../controllers/driverCtrl")
const baseModuleRoute = "/driver"

class DriverRouter {
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
        this.app.post(`${this.baseRoute}/list`, this.list.bind(this))
        this.app.get(`${this.baseRoute}/:id`, this.getById.bind(this))
        this.app.post(`${this.baseRoute}`, this.create.bind(this))
        this.app.put(`${this.baseRoute}/:id`, this.update.bind(this))
        this.app.delete(`${this.baseRoute}/:id`, this.delete.bind(this))
    }
	
    async list(req, res) {
        const response = _.clone(this.response)
        try {
            const driverCtrl = new DriverCtrl(this.dbPool)
            const resp = await driverCtrl.listAll(req.body)

            response.message = resp.message
            response.data = resp.data
            res.status(200)

        } catch (err) {
            console.log(err)
            response.message = "Erro ao realizar recuperação dos motoristas: " + err
            res.status(500)
        } finally {
            res.send(response)
        }
    }

    async getById(req, res) {
        const response = _.clone(this.response)
        try {
            const driverCtrl = new DriverCtrl(this.dbPool)

            if(driverCtrl.hasIdDriver(req.params)){
                const resp = await driverCtrl.listById(req.params.id)

                response.message = resp.message
                response.data = resp.data
                res.status(200)
            } else {
                response.message = "Identificador do motorista não informado"
                response.data = null
                res.status(400)
            }
        } catch (err) {
            console.log(err)
            response.message = "Erro ao realizar recuperação do motorista pelo identificador. Erro: " + err
            res.status(500)
        } finally {
            res.send(response)
        }
    }

    async create(req, res) {
        const response = _.clone(this.response)
        try {
            const driverCtrl = new DriverCtrl(this.dbPool)

            const validatedParams = await driverCtrl.validatingParams(req.body)

            if(validatedParams.isValid){
                const resp = await driverCtrl.create(validatedParams.data)

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
            response.message = "Erro ao criar motorista: " + err
            res.status(500)
        } finally {
            res.send(response)
        }
    }

    async update(req, res) {
        const response = _.clone(this.response)
        try {
            const driverCtrl = new DriverCtrl(this.dbPool)

            if(driverCtrl.hasIdDriver(req.params)){
                const validatedParams = await driverCtrl.validatingParams(req.body)

                if(validatedParams.isValid){
                    const resp = await driverCtrl.update(req.body, req.params.id)

                    response.message = resp.message
                    response.data = resp.data
                    res.status(200)
                } else{
                    response.message = validatedParams.message
                    response.data = {}
                    res.status(validatedParams.statusCode)
            } 
        } else {
                response.message = "Identificador do motorista não informado"
                response.data = null
                res.status(400)
            }
        } catch (err) {
            console.log(err)
            response.message = "Erro ao realizar atualização do motorista: " + err
            res.status(500)
        } finally {
            res.send(response)
        }
    }

    async delete(req, res) {
        const response = _.clone(this.response)
        try {
            const driverCtrl = new DriverCtrl(this.dbPool)

            if(driverCtrl.hasIdDriver(req.params)){
                const resp = await driverCtrl.delete(req.params.id)

                response.message = resp.message
                res.status(200)
            } else {
                response.message = "Identificador do motorista não informado"
                response.data = null
                res.status(400)
            }
        } catch (err) {
            console.log(err)
            response.message = "Erro ao realizar exclusão do motorista pelo identificador. Erro: " + err
            res.status(500)
        } finally {
            res.send(response)
        }
    }
}

module.exports = DriverRouter