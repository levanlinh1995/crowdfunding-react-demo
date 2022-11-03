export interface ListResponse<T> {
  status: number
  success: boolean
  data: T[]
}

export interface SingleResponse<T> {
  status: number
  success: boolean
  data: T
}