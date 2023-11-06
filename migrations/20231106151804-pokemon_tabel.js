import { Tables } from '../src/constants/index.mjs';
import { PokemonSchema } from '../src/dataAccess/index.mjs';

export async function up(queryInterface) {
  return queryInterface.createTable(Tables.Pokemon, { ...PokemonSchema });
}
export async function down(queryInterface) {
  return queryInterface.dropTable(Tables.Pokemon);
}
