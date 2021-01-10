import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import { userSignup, userSignin } from './service';

import { requestParser, res } from '@core/utils';

const asyncHandler = require('express-async-handler')
const gwHandler = asyncHandler(async (handler, event) => {
  try {
    const inputs = requestParser(event);
    return await handler(inputs);
  } catch (e) {
    return res.error({ message: e.message });
  }
})

export async function signup(
  event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> {
  return await gwHandler(userSignup, event);
}

export async function signin(
  event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> {
  return await gwHandler(userSignin, event);
}

// export async function authorize(
//   event: APIGatewayEvent,
// ): Promise<boolean> {
    
// }