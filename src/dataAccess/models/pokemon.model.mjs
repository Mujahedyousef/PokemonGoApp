import { dbConnector } from '../connectors/index.mjs';
import { PokemonSchema } from '../index.mjs';

import { Tables } from '../../constants/index.mjs';

export const PokemonModel = dbConnector.define(Tables.Pokemon, PokemonSchema, { timestamps: false, underscored: true });
