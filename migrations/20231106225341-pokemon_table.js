import { Tables } from '../src/constants/tables.const.mjs';
import { PokemonSchema } from '../src/dataAccess/schemas/pokemon.schema.mjs';
import readFile from '../src/readFiles/readFile.mjs';

export async function up(queryInterface) {
  return queryInterface.createTable(Tables.Pokemon, { ...PokemonSchema }).then(async () => readFile());
}
export async function down(queryInterface) {
  return queryInterface.dropTable(Tables.Pokemon);
}
