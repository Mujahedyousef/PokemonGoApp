import Joi from 'joi';
import { schemaValidator } from '../../middlewares/index.mjs';

export const PokemonJoiSchema = {
  query: schemaValidator.query(
    Joi.object({
      name: Joi?.string().optional(),
      page: Joi.number().optional(),
      pageSize: Joi.number().optional(),
      type: Joi.string().optional(),
      evolutionStage: Joi.string().optional(),
      search: Joi.string().optional(),
    })
  ),
  params: schemaValidator.params(
    Joi.object({
      id: Joi.number().required(),
    })
  ),
  create: schemaValidator.body(
    Joi.object({
      name: Joi.string().optional(),
      pokedexNumber: Joi.string().optional(),
      generation: Joi.string().optional(),
      evolutionStage: Joi.string().optional(),
      evolved: Joi.string().optional(),
      familyId: Joi.string().optional(),
      type: Joi.string().optional(),
      weather: Joi.string().optional(),
      statTotal: Joi.string().optional(),
      metadata: Joi.object().optional(),
    })
  ),
  update: schemaValidator.body(
    Joi.object({
      name: Joi.string().optional(),
      pokedexNumber: Joi.string().optional(),
      generation: Joi.string().optional(),
      evolutionStage: Joi.string().optional(),
      evolved: Joi.string().optional(),
      familyId: Joi.string().optional(),
      type: Joi.string().optional(),
      weather: Joi.string().optional(),
      statTotal: Joi.string().optional(),
      metadata: Joi.object().optional(),
    })
  ),
};
