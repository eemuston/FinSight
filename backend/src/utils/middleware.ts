import jwt from 'jsonwebtoken'
import User from '../models/user'
import { Request, Response, NextFunction } from 'express'
import { config } from './config'
import { DecodedToken } from '../types'

const requestLogger = (request: Request, _response: Response, next: NextFunction) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('-----')
    next()
}

const unknownEndpoint = (_request: Request, response: Response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

const tokenExtractor = (request: Request, _response: Response, next: NextFunction) => {
    const auth = request.get('authorization')
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        request.token = auth.replace(/bearer /i, '')
    } else {
        request.token = null
    }
    next()
}

const userExtractor = async (request: Request, response: Response, next: NextFunction) => {
    const auth = request.get('authorization')

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const token = auth.replace(/bearer /i, '')
        const decodedToken = jwt.verify(token, config.JWT_SECRET) as DecodedToken
        if(decodedToken.id) {
            request.user = await User.findById(decodedToken.id)
        } else {
            return response.status(401).json({ error: 'token invalid' })
        }
    } else {
        request.user = null
    }
    next()
}

const errorHandler = (error: Error, _request: Request, response: Response, next: NextFunction) => {
    if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    }
    if (error.name === 'JsonWebTokenError') {
        return response.status(401).send({ error: 'invalid token' })
    }
    if (error.name === 'TokenExpiredError') {
        return response.status(401).send({ error: 'token expired' })
    }
    if (error.message.includes('password') || error.message.includes('username')) {
        return response.status(400).send({ error: error.message })
    }

    return response.status(500).json({ error: error.message })
}

export default {
    requestLogger,
    unknownEndpoint,
    tokenExtractor,
    userExtractor,
    errorHandler
}