import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
var jwt = require('jsonwebtoken');

import { userSignup, userSignin, updateUserProfile } from './service';
import { requestParser, res, generateAuthResponse } from '@core/utils';

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

export async function updateUser(
  event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> {
  return await gwHandler(updateUserProfile, event);
}


export async function authorize(
  event: APIGatewayEvent,
  context,
  callback
): Promise<boolean> {
  const accessToken = event.authorizationToken;
  const methodArn = event.methodArn;

  if (!accessToken || !methodArn) return callback(null, "Unauthorized");

  if(accessToken) {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    return callback(null, generateAuthResponse(decoded, "Allow", methodArn));
  } else {
    return callback(null, "Unauthorized");
  }
}