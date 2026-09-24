import type { IApiResponse } from './apiResponse'

export interface IAxiosResponse<T = unknown> {
  data: IApiResponse<T>
}

export type IAxiosPromise<T = unknown> = Promise<IAxiosResponse<T>>
