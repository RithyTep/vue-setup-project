import type { IAxiosPromise } from '@/models/axiosPromise'
import type { IRequestSimulateRequest } from '@/models/IRequestSimulateRequest'
import type { IRequestSimulateResponse } from '@/models/IRequestSimulateResponse'

import { api } from './interceptor'

export default {
  callRequestSimulate(request: IRequestSimulateRequest): IAxiosPromise<IRequestSimulateResponse> {
    return api.post('simulate/request-simulate', request)
  },
}
