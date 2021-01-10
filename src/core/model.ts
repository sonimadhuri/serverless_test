import { Model } from 'objection';
import 'dotenv/config';

import config from './../../knexfile';

const Knex =  require('knex');

Model.knex(Knex(config));

class BaseModel extends Model {
  constructor(){
    super();
  }
} 

export default BaseModel;