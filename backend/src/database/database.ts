import { Container, Service } from 'typedi'
import { Connection, createConnection, useContainer } from 'typeorm'

import { Logger, LoggerService } from '../logger/logger.service'

@Service()
export class Database {
  private reconnectTry = 1
  private db_type: any = 'postgres'
  private db_host = process.env.DATABASE_HOST
  private db_port: number = parseInt(process.env.DATABASE_PORT, 10)
  private db_user = process.env.DATABASE_USER
  private db_password = process.env.DATABASE_PASSWORD
  private db_name = process.env.DATABASE_NAME
  private db_prefix = process.env.DATABASE_PREFIX
  private reconnect_seconds =
    parseInt(process.env.DATABASE_RECONNECT_SECONDS, 10) || 10
  private reconnect_max_try =
    parseInt(process.env.DATABASE_MAX_TRY_RECONNECT, 10) || 5
  private connection: Connection
  private syncOption = process.env.NODE_ENV !== 'production'

  constructor(@Logger(__filename) private logger: LoggerService) {}

  private timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * Setup database
   * @return Promise with the operation result
   */
  public async setupDatabase(): Promise<Connection> {
    if (this.connection) return
    // avoid setting up database connection again

    try {
      // use container from TypeDI
      useContainer(Container)
      this.connection = await createConnection({
        type: this.db_type,
        host: this.db_host,
        port: this.db_port,
        username: this.db_user,
        password: this.db_password,
        database: this.db_name,
        entityPrefix: this.db_prefix,
        entities: [__dirname + '../../api/**/**/*.model{.js,.ts}'],
        migrations: [__dirname + '../../migration/**/**/*{.js,.ts}'],
        synchronize: this.syncOption,
        logging: false,
        cache: true,
      })
      this.logger.info(`Connect to database (${this.db_name}) successfully`)
      return this.connection
    } catch (err) {
      await this.reloadDatabase(err)
    }
  }

  /**
   * Try to reconnect to database
   * @param err - Error message from database
   */
  private async reloadDatabase(err: Error) {
    if (this.reconnectTry > this.reconnect_max_try) throw err

    // we should try to reconnect a few times
    this.logger.warn(
      `Can't connect to the ${this.db_type} (${
        this.db_name
      }) database! Reason => ${err.message}`
    )
    this.logger.warn(
      `Trying to reconnect in ${this.reconnect_seconds} seconds | ${
        this.reconnectTry
      } / ${this.reconnectTry + 1}`
    )
    this.reconnectTry = this.reconnectTry + 1
    await this.timeout(this.reconnect_seconds * 1000)
    return this.setupDatabase()
  }

  /**
   * Stop database
   */
  public async stopDatabase(): Promise<void> {
    try {
      await this.connection.close()
    } catch (err) {
      throw err
    }
  }
}
