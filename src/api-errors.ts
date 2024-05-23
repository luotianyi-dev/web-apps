export interface ApiErrorProblem {
  title?: string;
  detail?: string;
}

export interface ApiErrorResponse {
  status: number;
  data?: ApiErrorProblem;
}

export interface ApiError {
  message: any;
  response?: ApiErrorResponse;
}

export async function handleApiError(error: ApiError): Promise<string> {
  console.error(error.message, error)
  if (!error.response) return '网络错误，请稍后重试。'

  console.error('Error Response', error.response)
  const messages = [`错误码 ${error.response.status}`]
  if (error.response.data instanceof Blob) {
    error.response.data = JSON.parse(await error.response.data.text())
  }
  if (error.response.data) {
    if (error.response.data.title) messages.push(error.response.data.title)
    if (error.response.data.detail) messages.push(error.response.data.detail)
  }
  return messages.join('：')
}
