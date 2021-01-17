const Moment = require('moment')

class Driving {
	constructor(dbPool) {
        this.dbPool = dbPool
    }

	async listAll(){
        try {
			const query = 
                `SELECT `+
                    `dr.car_id 'carId', `+
                    `c.brand, `+
                    `c.color, `+
                    `c.plate, `+
                    `dr.driver_id 'driverId', `+
                    `d.name, `+
                    `dr.startedAt, `+
                    `dr.endedAt, `+
                    `dr.reason `+
                
                `FROM automob.driving dr `+
                
                `JOIN automob.car c `+
                `ON dr.car_id = c.id `+

                `JOIN automob.driver d `+
                `ON dr.driver_id = d.id `

            return await this.dbPool.query(query)
        } catch (err) {
            throw new Error(`Problema ao recuperar alugueis de carro -> ${err.toString()}`)
        }
	
    }

    async create(driverId, carId, reason){
        try {
			const query = 
            `INSERT INTO automob.driving `+
            `(car_id, driver_id, startedAt, reason)` +
            `VALUES `+
            `(?, ?, '${Moment().format("YYYY-MM-DD HH:mm:ss")}', ?)`

            return await this.dbPool.query(query, [carId, driverId, reason])
        } catch (err) {
            throw new Error(`Problema ao recuperar alugueis de carro -> ${err.toString()}`)
        }
	
    }

    async endUse(idDriving){
        try {
            const query =
            `UPDATE `+
                `automob.driving `+
            `SET `+
                `endedAt = '${Moment().format("YYYY-MM-DD HH:mm:ss")}' `+
            `WHERE id = ?`

            return await this.dbPool.query(query, [idDriving])
        } catch (err) {
            throw new Error(`Problema ao recuperar alugueis de carro -> ${err.toString()}`)
        }
	
    }
}

module.exports = Driving