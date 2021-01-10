import BaseModel from '../../core/model';

export class User extends BaseModel {
  static tableName = 'users';

  static jsonSchema = {
    type: 'object',
    required: ['firstName', 'email', 'password'],

    properties: {
      id: { type: 'integer' },
      firstName: { type: 'string', minLength: 1, maxLength: 255 },
      lastName: { type: 'string', minLength: 1, maxLength: 255 },
      email: { type: 'string', minLength: 1, maxLength: 255 },
      password: { type: 'string', minLength: 1, maxLength: 255 },
    },
  };
}
