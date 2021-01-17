import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import { fetchUsersList, toggleUserFollowing as toggleFollower } from './service';

import { gwHandler } from '@core/utils';

export async function fetchUsers(
  event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> {
  return await gwHandler(fetchUsersList, event);
}


export async function toggleUserFollowing(
  event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> {
  return await gwHandler(toggleFollower, event);
}