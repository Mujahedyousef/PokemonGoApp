import { Tables } from '../src/constants/tables.const.mjs';
import { PokemonSchema } from '../src/dataAccess/schemas/pokemon.schema.mjs';

export async function up(queryInterface) {
  await queryInterface.createTable(Tables.Pokemon, { ...PokemonSchema });
}
export async function down(queryInterface) {
  await queryInterface.dropTable(Tables.Pokemon);
}
