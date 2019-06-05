import 'reflect-metadata' // global, required by typeorm and typedi
import { Container } from 'typedi'
import { useExpressServer, useContainer } from 'routing-controllers'
import * as httpContext from 'express-http-context'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as path from 'path'
import * as dotenv from 'dotenv'
import * as helmet from 'helmet'
import * as uuid from 'uuid'
import cookieParser = require('cookie-parser')

import { Database } from './database/database'
import { ErrorMiddleware } from './middleware/error.middleware'
import { NotFoundMiddleware } from './middleware/not_found.middleware'
import { Logger, LoggerService } from './logger/logger.service'
import { AuthChecker } from './helpers/authorization_checker.helper'
import { CurrentUserChecker } from './helpers/current_user_checker.helper'

// setup dotenv
dotenv.config({ path: path.join(__dirname, '../.env') })

export class App {
  private app: express.Application

  constructor(
    @Logger(__filename)
    private logger: LoggerService = new LoggerService(__filename)
  ) {}

  /**
   * Initialize application with routing controllers
   */
  public async initApp(): Promise<void> {
    try {
      // create express app
      this.app = express()
      // setup express server
      this.setupExpress()
      // setup routing-controllers
      await this.setupRouting()
    } catch (error) {
      // shutdown app
      this.logger.warn(
        `Something went wrong while initializing server, see log for details`
      )
      this.logger.error(error.stack)
      process.exit(1)
    }
  }

  /**
   * Initialize database
   */
  public async initDatabase() {
    try {
      // setup database
      const database: Database = Container.get(Database)
      await database.setupDatabase()
      // .then(async conn => await conn.runMigrations())
    } catch (error) {
      this.logger.warn(
        `Something went wrong while initializing database, see log for details`
      )
      this.logger.error(error.stack)
    }
  }

  /**
   * Setup express server
   */
  private setupExpress(): void {
    this.logger.info(`Setting up express server...`)
    // support application/json type post data
    this.app.use(bodyParser.json({ limit: '50mb' }))
    // support application/x-www-urlencoded post data
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
    // support cookie-parser
    this.app.use(cookieParser('simple-blog-server'))
    // helmet middleware
    this.app.use(helmet())
    // spoof the stack used, just for fun
    this.app.use((req, res, next) => {
      res.setHeader('X-Powered-By', 'simple-blog-server')
      next()
    })
    // support for UUID and route context
    this.app.use(httpContext.middleware)
    this.app.use((req, res, next) => {
      httpContext.set('reqId', uuid.v1())
      httpContext.set('useragent', req.headers['user-agent'])
      httpContext.set('ip', req.ip)
      next()
    })

    // point static path to public
    this.app.use(express.static(path.join(__dirname, '../public')))
    // catch uncaught exceptions
    process.on('uncaughtException', (error: any) =>
      this.logger.error(error.stack)
    )
  }

  /**
   * Setup routing-controllers
   * @returns Express app
   */
  private async setupRouting(): Promise<express.Application> {
    const authChecker: AuthChecker = Container.get(AuthChecker)
    const currentUserChecker: CurrentUserChecker = Container.get(
      CurrentUserChecker
    )
    this.logger.info('Setting up routing-controllers...')
    // use TypeDI container in routing-controllers
    useContainer(Container)
    this.app = useExpressServer(this.app, {
      routePrefix: '/api',
      controllers: [__dirname + '/api/**/*.controller{.js,.ts}'],
      middlewares: [ErrorMiddleware, NotFoundMiddleware],
      cors: {
        origin: ['http://localhost:3000'],
        credentials: true,
      },

      defaultErrorHandler: false, // disables error handler so we can use ours
      authorizationChecker: authChecker.authorizationChecker, // role checker
      currentUserChecker: currentUserChecker.getCurrentUserFromToken, // get user from request
    })
    this.logger.info('Routing setup successfully')
    return this.app
  }

  /**
   * Get express server instance
   * @returns The express server instance
   */
  public getAppInstance(): express.Application {
    return this.app
  }
}
