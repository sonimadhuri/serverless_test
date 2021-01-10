import { APIGatewayEvent } from 'aws-lambda';

export const requestParser = (event: APIGatewayEvent) => {
  let inputs = {
    ...event.pathParameters,
    ...event.queryStringParameters,
  }
  if (event.body) {
    inputs = {
      ...inputs,
      ...JSON.parse(event.body),
    }
  }
  return inputs;
}