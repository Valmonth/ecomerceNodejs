const { app } = require('./app')

// Utils
const dotenv = require('dotenv')
const { db } = require('./utils/database.util')
const { initModels } = require('./models/initModels')

dotenv.config()

const startServer = async () => {
    try {
        await db.authenticate()

        initModels()

        await db.sync()

        const PORT = process.env.PORT || 9000

        app.listen(PORT, () => {
            console.log('Express app running!')
        })
    } catch (error) {
        console.log(error)
    }
}

startServer()
