import { commonFields, id } from '../common';
import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', function (table) {
    id(table);

    table.string('first_name', 100).notNullable();
    table.string('last_name', 100);
    table.string('email', 100).notNullable().unique();
    table.string('password', 100).notNullable();

    table.boolean('is_deleted').defaultTo(false);
    commonFields(knex, table);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
}
