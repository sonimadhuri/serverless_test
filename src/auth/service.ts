import { APIGatewayProxyResult } from 'aws-lambda';
var jwt = require('jsonwebtoken');

import { res } from '@core/utils';
import { UserRepo } from '@app/common';

var bcrypt = require('bcryptjs');

export async function generateToken(data){
  return await jwt.sign({ id: data.id, fname: data.firstName, email: data.email }, process.env.JWT_SECRET);
}

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
        const accessToken = await generateToken(user);
        return res.sucess({ message: 'Login successful', data: {accessToken, ...user } });
      } else {
        return res.error({ statusCode: 403, message: 'Incorrect password' })
      }
    } else {
      return res.error({ statusCode: 403, message: "Incorrect E-mail"})
    }
  } catch (e) {
    throw new Error('User signin failed');
  }
}

export async function updateUserProfile(inputs): Promise<APIGatewayProxyResult> {
  try {
    const userRepo = new UserRepo();
    const { user, ...fieldsToBeUpdated } = inputs;
    await userRepo.query().update(fieldsToBeUpdated).where({ id: inputs.user.id });
    const accessToken = await generateToken(user);
    const userDetails = await userRepo.query().findById(inputs.user.id);
    return res.sucess({ statusCode: 200, data: {
      ...userDetails,
      accessToken,
    }, message: 'User data fetched' });
  } catch (e) {
    console.log(e)
    throw new Error('Could not update user profile');
  }

}