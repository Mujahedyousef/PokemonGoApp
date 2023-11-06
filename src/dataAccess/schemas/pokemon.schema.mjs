import Sequelize from 'sequelize';

const { DataTypes } = Sequelize;

export const PokemonSchema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  pokedexNumber: {
    type: DataTypes.STRING,
    field: 'pokedex_number',
  },
  generation: {
    type: DataTypes.STRING,
  },
  evolutionStage: {
    type: DataTypes.STRING,
    field: 'evolution_stage',
  },
  evolved: {
    type: DataTypes.STRING,
  },
  familyId: {
    type: DataTypes.STRING,
    field: 'family_id',
  },
  type: {
    type: DataTypes.STRING,
  },
  weather: {
    type: DataTypes.STRING,
  },
  statTotal: {
    type: DataTypes.STRING,
    field: 'stat_total',
  },
  metadata: {
    type: DataTypes.JSONB,
    field: 'metadata',
  },
};
