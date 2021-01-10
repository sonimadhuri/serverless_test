import * as Knex from 'knex';

export function id(table) {
  table.bigIncrements('id');
}

export function commonFields(knex: Knex, table) {
  table
    .timestamp('created_on')
    .notNullable()
    .defaultTo(knex.raw('CURRENT_TIMESTAMP'));


  table
    .timestamp('modified_on')
    .notNullable()
    .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

}

export function creatorModifierFiels(table) {

  table.bigInteger('created_by').notNullable();
  table.bigInteger('modified_by').notNullable();
  table
    .foreign('created_by')
    .references('id')
    .inTable('users');
  table
    .foreign('modified_by')
    .references('id')
    .inTable('users');
}
