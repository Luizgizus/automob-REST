const Moment = require('moment')

class Driver {
	constructor(dbPool) {
        this.dbPool = dbPool
    }

	async listAll(body){
        try {
			let query = 
                `SELECT `+
                    `id 'idDriver', `+
                    `name, `+
                    `isUsingCar ` +
                `FROM automob.driver `+
                `WHERE deletedAt is null `

                if(body.name){
                    query += `AND name LIKE '%${body.name}%' `
                }

            return await this.dbPool.query(query)
        } catch (err) {
            throw new Error(`Problema ao recuperar motorista -> ${err.toString()}`)
        }
	
    }
    
    async listById(idDriver){
        try {
			const query = 
                `SELECT `+
                    `id 'idDriver', `+
                    `name, `+
                    `isUsingCar ` +
                `FROM automob.driver `+
                `WHERE id = ? `+
                `AND deletedAt is null`
				
            const driver = await this.dbPool.query(query, [idDriver])
            return driver.pop()
        } catch (err) {
            throw new Error(`Problema ao recuperar motorista -> ${err.toString()}`)
        }
	
    }
    
    async update(name, id){
        try {
			const query = 
            `UPDATE `+
	            `automob.driver `+
            `SET `+
	            `name = ?, ` +
                `updatedAt = '${Moment().format("YYYY-MM-DD HH:mm:ss")}' ` +
            `WHERE id = ? ` +
            `AND deletedAt is null`

            const driver = await this.dbPool.query(query, [name, id])
            return driver
        } catch (err) {
            throw new Error(`Problema ao aualizar motorista -> ${err.toString()}`)
        }
	
    }

    async setIsUsingCar(isUsingCar, id){
        try {
			const query = 
            `UPDATE `+
	            `automob.driver `+
            `SET `+
	            `isUsingCar = ?, ` +
                `updatedAt = '${Moment().format("YYYY-MM-DD HH:mm:ss")}' ` +
            `WHERE id = ? ` +
            `AND deletedAt is null`

            const driver = await this.dbPool.query(query, [isUsingCar, id])
            return driver
        } catch (err) {
            throw new Error(`Problema ao aualizar motorista -> ${err.toString()}`)
        }
	
    }
    
    async create(name){
        try {
			const query = 
            `INSERT INTO automob.driver ` +
            `(`+
                `name, `+
                `createdAt `+
            `)` +
            `VALUES `+
            `(?, '${Moment().format("YYYY-MM-DD HH:mm:ss")}')`

            const driver = await this.dbPool.query(query, [name])
            return driver
        } catch (err) {
            throw new Error(`Problema ao criar motorista -> ${err.toString()}`)
        }
	
    }
    
    async delete(id){
        try {
			const query = 
            `UPDATE `+
	            `automob.driver `+
            `SET `+
	            `deletedAt = '${Moment().format("YYYY-MM-DD HH:mm:ss")}' ` +
            `WHERE (id = ?)`

            const driver = await this.dbPool.query(query, [id])
            return driver
        } catch (err) {
            throw new Error(`Problema ao deletar motorista -> ${err.toString()}`)
        }
	
    }
}

module.exports = Driver