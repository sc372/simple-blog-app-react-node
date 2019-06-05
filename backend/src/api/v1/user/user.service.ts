import { Service } from 'typedi'
import { DeleteResult } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Logger, LoggerService } from '../../../logger/logger.service'
import { User } from './user.model'
import { UserRepository } from './user.repository'
import { JWTService } from '../auth/jwt.service'
import { JSONUtils } from '../../../utils/json.utils'
import { CreateUserDTO, UpdateUserDTO } from './user.dto'

@Service()
export class UserService {
  constructor(
    @Logger(__filename) private logger: LoggerService,
    // begin injecting repos
    @InjectRepository(User)
    private userRepository: UserRepository,
    // other services
    private jwtService: JWTService,
    private jsonUtils: JSONUtils
  ) {}

  /**
   * Creates a new user
   * @param createUserDTO - CreateUserDTO object
   * @returns new user
   */
  public async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const _user = new User()
    _user.nickname = createUserDTO.nickname
    _user.email = createUserDTO.email
    _user.password = createUserDTO.password
    const userDB: User = await this.userRepository.save(_user)

    // create JWT tokens
    userDB.token = await this.jwtService.createJWT(userDB)
    this.logger.info(`User ${userDB.email}(ID: ${userDB.id}) was created`)
    // return user model object
    return this.jsonUtils.filterDataFromObject(
      userDB,
      this.jsonUtils.commonUserProperties
    )
  }

  /**
   * Checks user credentials and validates him
   * @param user - User object
   * @returns user or false if password is wrong
   */
  public async signIn(user: User): Promise<User | boolean> {
    const userDB = await this.userRepository.findOne({ email: user.email })

    const result = await userDB.comparePassword(user.password)
    if (result) {
      await this.userRepository.update(userDB.id, { lastLogin: new Date() })
      // update token in repo
      userDB.token = await this.jwtService.createJWT(userDB)
      // return user model object
      return this.jsonUtils.filterDataFromObject(
        userDB,
        this.jsonUtils.commonUserProperties
      )
    } else {
      // wrong password mate
      return false
    }
  }

  /**
   * Checks user credentials and validates him
   * @param user - User object
   * @returns user or false if password is wrong
   */
  public async signInWithJwt(user: User): Promise<User | boolean> {
    const userDB = await this.userRepository.findOne({ email: user.email })
    await this.userRepository.update(userDB.id, { lastLogin: new Date() })
    // update token in repo
    userDB.token = await this.jwtService.createJWT(userDB)
    // return user model object
    return this.jsonUtils.filterDataFromObject(
      userDB,
      this.jsonUtils.commonUserProperties
    )
  }

  /**
   * Update user data in database
   * @param id - User ID
   * @param updateUserDto - UpdateUserDTO object
   * @returns UpdateResult object
   */
  public async updateUser(
    id: string,
    updateUserDto: UpdateUserDTO
  ): Promise<User> {
    const userDB = await this.userRepository.findOne({ id })
    userDB.email = updateUserDto.email
    userDB.nickname = updateUserDto.nickname
    userDB.fileName = updateUserDto.fileName
    userDB.filePath = updateUserDto.filePath

    delete userDB.updatedAt

    await this.userRepository.update(userDB.id, userDB)

    this.logger.info(`User (ID: ${userDB.id}) was updated`)

    const userUpdatedDB = await this.selectUserById(userDB.id)

    // delete old tokens
    await this.jwtService.deleteTokens(userUpdatedDB)
    // create JWT tokens
    userUpdatedDB.token = await this.jwtService.createJWT(userUpdatedDB)
    this.logger.info(
      `User ${userUpdatedDB.email}(ID: ${userUpdatedDB.id}) was re-created`
    )

    return this.jsonUtils.filterDataFromObject(
      userUpdatedDB,
      this.jsonUtils.commonUserProperties
    )
  }

  public async deleteUserById(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id)
  }

  /**
   * Check if user exists with email
   * @param email - User email
   * @returns User exists
   */
  public async userExistsByEmail(email: string): Promise<boolean> {
    const exists = await this.userRepository.count({ email })
    return exists > 0
  }

  /**
   * Returns user with the ID provided
   * @param id - ID to lookup
   * @returns user
   */
  public async selectUserById(id: string): Promise<User> {
    return await this.userRepository.selectUser('user.id = :id', { id })
  }

  /**
   * Get user by email
   * @param email - Email string
   * @returns user
   */
  public async selectUserByEmail(email: string): Promise<User> {
    return await this.userRepository.selectUser('user.email = :email', {
      email,
    })
  }
}
