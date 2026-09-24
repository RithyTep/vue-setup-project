import EnumApiErrorCode from './enums/enumsApiErrorCode'

export interface IApiResponse<T = unknown> {
  Data: T
  ErrorCode: EnumApiErrorCode
  Message: string
}

export default class ApiResponse<T = unknown> implements IApiResponse<T> {
  Data!: T
  ErrorCode!: EnumApiErrorCode
  Message!: string

  constructor(init: IApiResponse<T>) {
    Object.assign(this, init)
  }

  get IsSuccess(): boolean {
    return this.ErrorCode === EnumApiErrorCode.Success
  }

  get ErrorMessageForDisplay(): string {
    return EnumApiErrorCode[this.ErrorCode] || this.Message
  }
}
