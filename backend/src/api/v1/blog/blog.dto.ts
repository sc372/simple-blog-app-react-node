export interface CreateBlogDTO {
  userId: string
  title: string
  contents: string
  filePath: string
  fileName: string
  jwtToken: string
}

export interface UpdateBlogDTO {
  userId: string
  title: string
  contents: string
  filePath: string
  fileName: string
  jwtToken: string
}
