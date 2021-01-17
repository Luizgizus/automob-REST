const CarRouter = require('./carRouter')
const DriverRouter = require('./driverRouter')
const DrivingRouter = require('./drivingRouter')

const appBaseRoute = "/automob/app"

class RouteService {
    constructor(expressInstance, pool) {
        this.app = expressInstance
        this.carRouter = new CarRouter(this.app, appBaseRoute, pool)
        this.driverRouter = new DriverRouter(this.app, appBaseRoute, pool)
        this.drivingRouter = new DrivingRouter(this.app, appBaseRoute, pool)
    }

    init() {
        this.carRouter.init()
        this.driverRouter.init()
        this.drivingRouter.init()
    }
}

module.exports = RouteService