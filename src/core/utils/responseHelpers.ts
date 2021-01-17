
type ErrorResponse = {
  statusCode?: number,
  message: string,
  error?: string | Record<string, any>
}

type SuccessResponse = {
  statusCode?: number,
  message?: string,
  data?: string | Record<string, any>
}

export const res = {
  noContent: () => ({
    statusCode: 204,
    body: null
  }),
  sucess: ({ statusCode = 200, message = '', data }: SuccessResponse) => ({
    statusCode,
    body: JSON.stringify({
      message,
      data
    })
  }),
  error: ({ statusCode = 404, message = 'Something went wrong', error }: ErrorResponse) => ({
    statusCode,
    body: JSON.stringify({
      message,
      error
    })
  })
}