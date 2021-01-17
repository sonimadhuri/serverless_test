import * as Knex from "knex";
import { commonFields, creatorModifierFiels, id } from '../common';


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user_follower', function (table) {
    id(table);

    table.bigInteger('follower_id').notNullable();
    table.bigInteger('following_id').notNullable();

    table.boolean('is_deleted').defaultTo(false);
    commonFields(knex, table);
    creatorModifierFiels(table);

    table
    .foreign('follower_id')
    .references('id')
    .inTable('users');
    table
      .foreign('following_id')
      .references('id')
      .inTable('users');

  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('user_follower');
}

