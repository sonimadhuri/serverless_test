import { APIGatewayProxyResult } from 'aws-lambda';

import { res } from '@core/utils';
import { UserRepo } from './repositories';

var bcrypt = require('bcryptjs');

export async function userSignup(inputs): Promise<APIGatewayProxyResult> {
  try {
    const userRepo = new UserRepo();

    const resource = Object.assign(inputs);

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(resource.password, salt);
    resource.password = hash;
    await userRepo.create(resource);

    return res.noContent();
  } catch (e) {
    throw new Error('User signup failed');
  }

}

export async function userSignin(inputs): Promise<APIGatewayProxyResult> {
  try {
    const userRepo = new UserRepo();

    const user = await userRepo.query().findOne({ email: inputs.email });
    if(user){
      const isPasswordValid = bcrypt.compareSync(inputs.password, user.password);
      if(isPasswordValid){
        return res.sucess({ message: 'Login successful' })
      } else {
        return res.error({ statusCode: 403, message: 'Incorrect password' })
      }
    } else {
      return res.error({ statusCode: 403, message: "Incorrect E-mail"})
    }
  } catch (e) {
    throw new Error('User signup failed');
  }
}
