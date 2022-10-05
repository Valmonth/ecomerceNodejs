const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')

// Utils
const { AppError } = require('./utils/appError.util')

// Routers
const { usersRouter } = require('./routes/users.routes')
const { cartsRouter } = require('./routes/carts.routes')
const { productsRouter } = require('./routes/products.routes')

// Controllers App
const { globalErrorHandler } = require('./controllers/error.controller')

// Init our Express App
const app = express()

// Enable Express 
app.use(express.json())

// Add security to headers
app.use(helmet())

// Responses
app.use(compression())

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
else if (process.env.NODE_ENV === 'production') app.use(morgan('combined'))

// Endpoints
app.use('/api/v1/cart', cartsRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/products', productsRouter)

// Error endpoints
app.all('*', (req, res, next) => {
    return next(
        new AppError(
            `${req.method} ${req.url} does not exists in our server`,
            404
        )
    )
})

// Global error handler

app.use(globalErrorHandler)

module.exports = { app }
