const Moment = require('moment')

class Car {
	constructor(dbPool) {
        this.dbPool = dbPool
    }

	async listAll(){
        try {
			const query = 
                `SELECT `+
                    `id 'idCar', `+
                    `plate, `+
                    `brand, `+
                    `color, `+
                    `isInUse `+
                `FROM automob.car `+
                `WHERE deletedAt is null`

            return await this.dbPool.query(query)
        } catch (err) {
            throw new Error(`Problema ao recuperar carros -> ${err.toString()}`)
        }
	
    }
    
    async listById(idCar){
        try {
			const query = 
                `SELECT `+
                    `id 'idCar', `+
                    `plate, `+
                    `brand, `+
                    `color, `+
                    `isInUse `+
                `FROM automob.car `+
                `WHERE id = ? `+
                `AND deletedAt is null`
				
            const car = await this.dbPool.query(query, [idCar])
            return car.pop()
        } catch (err) {
            throw new Error(`Problema ao recuperar carro -> ${err.toString()}`)
        }
	
    }

    async listByPlate(plate){
        try {
			const query = 
                `SELECT `+
                    `id 'idCar', `+
                    `plate, `+
                    `brand, `+
                    `color, `+
                    `isInUse `+
                `FROM automob.car `+
                `WHERE plate = ?`+
                `AND deletedAt is null`
				
            const car = await this.dbPool.query(query, [plate])
            return car.pop()
        } catch (err) {
            throw new Error(`Problema ao recuperar carro -> ${err.toString()}`)
        }
	
    }
    
    async update(plate, brand, color, id){
        try {
			const query = 
            `UPDATE `+
	            `automob.car `+
            `SET `+
	            `plate = ?, ` +
                `brand = ?, ` +
                `color = ?, ` +
                `updatedAt = '${Moment().format("YYYY-MM-DD HH:mm:ss")}' ` +
            `WHERE id = ? ` +
            `AND deletedAt is null`

            const car = await this.dbPool.query(query, [plate, brand, color, id])
            return car
        } catch (err) {
            throw new Error(`Problema ao aualizar carro -> ${err.toString()}`)
        }
	
    }

    async setIsInUse(isInUse, id){
        try {
			const query = 
            `UPDATE `+
	            `automob.car `+
            `SET `+
                `isInUse = ?, ` +
                `updatedAt = '${Moment().format("YYYY-MM-DD HH:mm:ss")}' ` +
            `WHERE id = ? ` +
            `AND deletedAt is null`

            const car = await this.dbPool.query(query, [isInUse, id])
            return car
        } catch (err) {
            throw new Error(`Problema ao aualizar carro -> ${err.toString()}`)
        }
	
    }
    
    async create(plate, brand, color){
        try {
			const query = 
            `INSERT INTO automob.car ` +
            `(`+
                `plate, `+
                `brand, `+
                `color, `+
                `isInUse, `+
                `createdAt `+
            `)` +
            `VALUES `+
            `(?, ?, ?, '0', '${Moment().format("YYYY-MM-DD HH:mm:ss")}')`

            const car = await this.dbPool.query(query, [plate, brand, color, '0'])
            return car
        } catch (err) {
            throw new Error(`Problema ao criar carro -> ${err.toString()}`)
        }
	
    }
    
    async delete(id){
        try {
			const query = 
            `UPDATE `+
	            `automob.car `+
            `SET `+
	            `deletedAt = '${Moment().format("YYYY-MM-DD HH:mm:ss")}' ` +
            `WHERE (id = ?)`

            const car = await this.dbPool.query(query, [id])
            return car
        } catch (err) {
            throw new Error(`Problema ao deletar carro -> ${err.toString()}`)
        }
	
    }
}

module.exports = Car