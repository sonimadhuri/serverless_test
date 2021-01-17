import { BaseRepo } from './../../core/repository';
import { UserFollower } from './../models';

export class UserFollowerRepo extends BaseRepo {
  constructor() {
    super(UserFollower);
  }
}