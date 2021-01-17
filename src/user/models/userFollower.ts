import BaseModel from '../../core/model';
import { User } from '../../common/models';

export class UserFollower extends BaseModel {
  static tableName = 'user_follower';

  static required: ['followerId', 'followingId'];

  static jsonSchema = {
    type: 'object',

    properties: {
      id: { type: 'integer' },
      followerId: { type: 'integer' },
      followingId: { type: 'integer' },
      isDeleted: { type: 'boolean' },
    },
  };

  static relationMappings = {
    following: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: User,
      filter: (builder) => builder.where({ isDeleted: 0 }),
      join: {
        from: 'user_follower.following_id',
        to: 'users.id',
      },
    }
  }
}
