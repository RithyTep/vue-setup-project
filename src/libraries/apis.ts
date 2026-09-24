import ApiResponse from '@/models/apiResponse'
import type { IAxiosPromise } from '@/models/axiosPromise'
import apiCalling from './apiCalling'
import type { IRequestSimulateRequest } from '@/models/IRequestSimulateRequest'
import type { IRequestSimulateResponse } from '@/models/IRequestSimulateResponse'
import notificationHelper from '@/libraries/elementUiHelpers/notificationHelper'
import EnumMessageType from '@/models/enums/enumMessageType'

const handleApiResponse = async <T>(
  response: IAxiosPromise,
  isNotify = false,
): Promise<ApiResponse<T>> => {
  try {
    const value = await response
    const apiResponse = new ApiResponse<T>(value.data)
    if (isNotify) {
      const messageType = apiResponse.IsSuccess ? EnumMessageType.Success : EnumMessageType.Error
      notificationHelper.notification(apiResponse.Message, messageType)
    }
    return apiResponse
  } catch (error) {
    console.error('API call error:', error)
    const apiResponse = new ApiResponse<T>({
      Data: {} as T,
      ErrorCode: 999,
      Message: 'Error',
    })
    if (isNotify) {
      notificationHelper.notification(apiResponse.Message, EnumMessageType.Error)
    }
    return apiResponse
  }
}

export default {
  getRequestSimulate(
    request: IRequestSimulateRequest,
  ): Promise<ApiResponse<IRequestSimulateResponse>> {
    return handleApiResponse(apiCalling.callRequestSimulate(request), true)
  },
}
