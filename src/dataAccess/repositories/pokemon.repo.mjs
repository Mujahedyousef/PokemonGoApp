import { Op } from 'sequelize';
import { PokemonModel } from '../index.mjs';

export const PokemonRepo = {
  list: async query => {
    const { page, pageSize, name, type, evolutionStage, search } = query;

    const filter = {};
    const pagination = {};

    if (name)
      filter.name = {
        [Op.like]: `%${name}%`,
      };

    if (page && pageSize) {
      pagination.limit = pageSize;
      pagination.offset = (page - 1) * pageSize;
    }

    const listOfPokemons = await PokemonModel.findAll({
      where: filter,
      ...pagination,
    });

    let filteredData = [...listOfPokemons];

    if (type) filteredData = filteredData?.filter(item => item?.type === type);

    if (evolutionStage) filteredData = filteredData.filter(item => item?.evolutionStage === evolutionStage);

    if (search) {
      const lowerCaseQuery = search?.toLowerCase().trim();
      filteredData = filteredData.filter(item => {
        return (
          item.name?.toLowerCase().includes(lowerCaseQuery) ||
          item.weather?.toLowerCase().includes(lowerCaseQuery) ||
          item.type?.toLowerCase().includes(lowerCaseQuery) ||
          item.evolutionStage?.toLowerCase().includes(lowerCaseQuery)
        );
      });
    }

    return filteredData;
  },

  get: async id =>
    PokemonModel.findByPk(id).then(response => {
      if (!response) throw Error('This item is not found');
      return response;
    }),

  create: async data => PokemonModel.create(data).then(response => response),

  delete: async id => {
    const existItem = await PokemonModel.findByPk(id);
    if (!existItem) throw Error('This item is not found');
    return existItem.destroy();
  },

  update: async (id, data) => {
    const existItem = await PokemonModel.findByPk(id);
    if (!existItem) throw Error('This item is not found');
    return existItem.update(data);
  },
  searchAndFilter: async quires => {
    const listOfPokemons = await PokemonModel.findAll();

    const type = quires?.type;
    const evolutionStage = quires?.evolutionStage;
    const search = quires?.search;

    let filteredData = [...listOfPokemons];

    if (type) filteredData = filteredData.filter(item => item.type === type);

    if (evolutionStage) filteredData = filteredData.filter(item => item.evolutionStage === evolutionStage);

    if (search) {
      const lowerCaseQuery = search.toLowerCase().trim();
      filteredData = filteredData.filter(item => {
        return (
          item.name?.toLowerCase().includes(lowerCaseQuery) ||
          item.weather?.toLowerCase().includes(lowerCaseQuery) ||
          item.type?.toLowerCase().includes(lowerCaseQuery) ||
          item.evolutionStage?.toLowerCase().includes(lowerCaseQuery)
        );
      });
    }
    return { filteredData };
  },
};
