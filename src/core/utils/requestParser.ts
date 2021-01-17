import { APIGatewayEvent } from 'aws-lambda';

export const requestParser = (event: APIGatewayEvent) => {
  let inputs = {
    ...event.pathParameters,
    ...event.queryStringParameters,
    user: event.requestContext.authorizer.userData //Injecting user data from authorizer
  }
  if (event.body) {
    inputs = {
      ...inputs,
      ...JSON.parse(event.body),
    }
  }
  return inputs;
}