import { Knex } from "knex";

const TABLE_NAME = "people";

function down(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.dropTable(TABLE_NAME);
}

function up(knex: Knex): Knex.SchemaBuilder {
  const tableBuilder = (table: Knex.CreateTableBuilder): void => {
    table.integer("id").primary();

    table.string("first_name");
    table.string("last_name");
    table.string("gender");
    table.date("birthdate");

    table.timestamps(true, true);
    table.timestamp("deleted_at");
  };

  return knex.schema.createTable(TABLE_NAME, tableBuilder);
}

export { down, up };
