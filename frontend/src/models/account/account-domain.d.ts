export interface IAccountDomain {
  readonly id: string
  readonly email: string
  readonly nickname: string
  readonly jwtToken: string
  readonly filePath: string
  readonly fileName: string
  readonly createdAt: Date
}
