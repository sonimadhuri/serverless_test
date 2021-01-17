import BaseModel from '../../core/model';
import { UserFollower } from '@app/user/models'

export class User extends BaseModel {
  static tableName = 'users';

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.password;
    return json;
  }

  static jsonSchema = {
    type: 'object',
    // required: ['firstName', 'email', 'password'],

    properties: {
      id: { type: 'integer' },
      firstName: { type: 'string', minLength: 1, maxLength: 255 },
      lastName: { type: 'string', minLength: 1, maxLength: 255 },
      email: { type: 'string', minLength: 1, maxLength: 255 },
      password: { type: 'string', minLength: 1, maxLength: 255 },
    },
  };

  static relationMappings = {
    following: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: UserFollower,
      filter: (builder) => builder.where({ 'user_follower.is_deleted': 0 }),
      join: {
        from: 'users.id',
        to: 'user_follower.follower_id',
      },
    }
  }
}
