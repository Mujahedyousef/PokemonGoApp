import expressRouter from 'express-async-router';

import { StatusCode } from '../constants/index.mjs';
import { PokemonRepo } from '../dataAccess/index.mjs';
import { PokemonJoiSchema } from './schemas/index.mjs';

export const PokemonRouter = new expressRouter.AsyncRouter({ mergeParams: true });

PokemonRouter.get('/', [PokemonJoiSchema.query], async (req, res) => {
  try {
    const list = await PokemonRepo.list(req.query);
    res.status(StatusCode.OK).json(list);
  } catch (err) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send(err.message);
  }
});

PokemonRouter.get('/:id', [PokemonJoiSchema.params], async (req, res) => {
  try {
    const result = await PokemonRepo.get(req.params?.id);
    res.status(StatusCode.OK).json(result);
  } catch (err) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send(err.message);
  }
});

PokemonRouter.post('/', [PokemonJoiSchema.create], async (req, res) => {
  try {
    const created = await PokemonRepo.create(req.body);
    res.status(StatusCode.CREATED).json(created);
  } catch (err) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send(err.message);
  }
});

PokemonRouter.patch('/:id', [PokemonJoiSchema.params, PokemonJoiSchema.update], async (req, res) => {
  try {
    const updated = await PokemonRepo.update(req.params?.id, req.body);
    res.status(StatusCode.OK).json(updated);
  } catch (err) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send(err.message);
  }
});

PokemonRouter.delete('/:id', [PokemonJoiSchema.params], async (req, res) => {
  try {
    const deleted = await PokemonRepo.delete(req.params?.id);
    res.status(StatusCode.NOT_FOUND).json(deleted);
  } catch (err) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send(err.message);
  }
});
