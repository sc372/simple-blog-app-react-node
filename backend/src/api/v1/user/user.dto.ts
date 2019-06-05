export interface CreateUserDTO {
  readonly email: string
  readonly nickname: string
  readonly password: string
}

export interface UpdateUserDTO {
  readonly id: string
  readonly email: string
  readonly nickname: string
  readonly fileName: string
  readonly filePath: string
}
