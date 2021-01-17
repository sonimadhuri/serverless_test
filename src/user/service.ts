import { APIGatewayProxyResult } from 'aws-lambda';

import { res } from '@core/utils';
import { UserFollowerRepo } from './repositories';
import { User, UserRepo } from '@app/common';

export async function fetchUsersList(inputs): Promise<APIGatewayProxyResult> {
  try {
    const { filter } = inputs;
    const userRepo = new UserRepo();

    if (filter === 'available') {
      const users = await userRepo
        .query()
        .whereNotExists(function () {
          this.select('id')
            .from('user_follower')
            .whereRaw(
              `user_follower.following_id = users.id and user_follower.follower_id = ${inputs.user.id} and user_follower.is_deleted = 0`
            );
        })
        .where('users.id', '!=', inputs.user.id)

      return res.sucess({ data: users });
    } else if (filter === 'following') {
      const userFollowerRepo = new UserFollowerRepo();

      const followers = await userFollowerRepo
        .query()
        .withGraphJoined('following')
        .where('user_follower.follower_id', inputs.user.id)
        .where('user_follower.is_deleted', '=', 0);
      return res.sucess({ data: followers });
    }

    return res.noContent();
  } catch (e) {
    console.log(e);
    throw new Error('User signup failed');
  }
}

export async function toggleUserFollowing(
  inputs
): Promise<APIGatewayProxyResult> {
  // Expects a userId, fetch from users table,
  // followingId, followerId, isDeleted

  try {
    const userFollowerRepo = new UserFollowerRepo();
    const followers = await userFollowerRepo
      .query()
      .where({ followerId: inputs.user.id, isDeleted: 0 });
    if (followers && followers.length > 0) {
      await userFollowerRepo
        .query()
        .update({ isDeleted: true })
        .where('followerId', inputs.user.id);
    } else {
      await userFollowerRepo.create({
        followerId: inputs.user.id,
        following_id: +inputs.userId,
        createdBy: inputs.user.id,
        modifiedBy: inputs.user.id,
      });
    }
    return res.noContent();
  } catch (e) {
    throw new Error('Operation failed');
  }
}
