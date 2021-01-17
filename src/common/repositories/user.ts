import { BaseRepo } from './../../core/repository';
import { User as UserModel } from './../models';

export class UserRepo extends BaseRepo {
  constructor() {
    super(UserModel);
  }

  async checkUserExists(email) {
    return await this.model.findOne({
      where: { email: email }
    });
  }
}