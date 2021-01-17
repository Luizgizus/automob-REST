const _ = require('lodash')
const DrivingCtrl = require("../controllers/drivingCtrl")
const baseModuleRoute = "/driving"

class DrivingRouter {
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
        this.app.post(`${this.baseRoute}/setInUse`, this.create.bind(this))
        this.app.post(`${this.baseRoute}/setFree`, this.setFree.bind(this))
    }

    async list(req, res) {
        const response = _.clone(this.response)
        try {
            const drivingCtrl = new DrivingCtrl(this.dbPool)
            const resp = await drivingCtrl.listAll()

            response.message = resp.message
            response.data = resp.data
            res.status(200)

        } catch (err) {
            console.log(err)
            response.message = "Erro ao realizar recuperação dos algueis dos carros: " + err
            res.status(500)
        } finally {
            res.send(response)
        }
    }

    async create(req, res) {
        const response = _.clone(this.response)
        try {
            const drivingCtrl = new DrivingCtrl(this.dbPool)

            const validatedParams = await drivingCtrl.validatingParamsCreate(req.body)

            if(validatedParams.isValid){
                const resp = await drivingCtrl.create(validatedParams.data)

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
            response.message = "Erro ao criar aluguel de carro: " + err
            res.status(500)
        } finally {
            res.send(response)
        }
    }

    async setFree(req, res) {
        const response = _.clone(this.response)
        try {
            const drivingCtrl = new DrivingCtrl(this.dbPool)

            const validatedParams = await drivingCtrl.validatingParamsSetFree(req.body)

            if(validatedParams.isValid){
                const resp = await drivingCtrl.setFree(validatedParams.data)

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
            response.message = "Erro ao criar aluguel de carro: " + err
            res.status(500)
        } finally {
            res.send(response)
        }
    }
}

module.exports = DrivingRouter