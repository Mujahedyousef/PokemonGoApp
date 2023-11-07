import chai, { expect } from 'chai';
import sinon from 'sinon';
import { PokemonModel } from '../../../src/dataAccess/index.mjs';
import { PokemonRepo } from '../../../src/dataAccess/index.mjs';
import { mockData } from '../mock/index.mjs';

chai.should();
chai.expect();

const sandbox = sinon.createSandbox();

describe('PokemonRepo::list', () => {
  let findAllStub;

  before(() => {
    findAllStub = sandbox.stub(PokemonModel, 'findAll');
  });

  after(() => {
    sandbox.restore();
  });

  it('should list all pokemons when no filters are provided', async () => {
    const query = {};
    findAllStub.returns(mockData);

    const result = await PokemonRepo.list(query);

    expect(result).to.be.an('array');
    expect(result).to.have.lengthOf(mockData.length);

    result.forEach((item, index) => {
      expect(item).to.have.property('id', mockData[index].id);
      expect(item).to.have.property('name', mockData[index].name);
      expect(item).to.have.property('type', mockData[index].type);
      expect(item).to.have.property('evolutionStage', mockData[index].evolutionStage);
      expect(item).to.have.property('weather', mockData[index].weather);
      expect(item).to.deep.equal(mockData[index]);
    });
  });

  it('should filter by name', async () => {
    const query = {
      name: 'Pika',
    };
    const filteredData = mockData.filter(item => item.name.includes('Pika'));
    findAllStub.returns(filteredData);

    const result = await PokemonRepo.list(query);

    expect(result).to.be.an('array');
    expect(result).to.have.lengthOf(filteredData.length);

    expect(result[0]).to.have.property('id', 1);
    expect(result[0]).to.have.property('name', 'Pikachu');
    expect(result[0]).to.have.property('type', 'Electric');
    expect(result[0]).to.have.property('evolutionStage', 'Pichu');
    expect(result[0]).to.have.property('weather', 'Sunny');

    result.forEach((item, index) => {
      expect(item).to.deep.equal(filteredData[index]);
    });
  });

  it('should filter by type', async () => {
    const query = {
      type: 'Electric',
    };
    const filteredData = mockData.filter(item => item.type === 'Electric');
    findAllStub.returns(filteredData);

    const result = await PokemonRepo.list(query);

    expect(result).to.be.an('array');
    expect(result).to.have.lengthOf(filteredData.length);

    expect(result[0]).to.have.property('id', 1);
    expect(result[0]).to.have.property('name', 'Pikachu');
    expect(result[0]).to.have.property('type', 'Electric');
    expect(result[0]).to.have.property('evolutionStage', 'Pichu');
    expect(result[0]).to.have.property('weather', 'Sunny');

    result.forEach((item, index) => {
      expect(item).to.deep.equal(filteredData[index]);
    });
  });

  it('should filter by evolution stage', async () => {
    const query = {
      evolutionStage: 'Pichu',
    };
    const filteredData = mockData.filter(item => item.evolutionStage === 'Pichu');
    findAllStub.returns(filteredData);

    const result = await PokemonRepo.list(query);

    expect(result).to.be.an('array');
    expect(result).to.have.lengthOf(filteredData.length);

    result.forEach((item, index) => {
      expect(item).to.deep.equal(filteredData[index]);
    });
  });

  it('should filter by search term', async () => {
    const query = {
      search: 'sunny',
    };

    const filteredData = mockData.filter(item => {
      const lowerCaseQuery = 'sunny'.toLowerCase();
      return (
        item.name.toLowerCase().includes(lowerCaseQuery) ||
        item.weather.toLowerCase().includes(lowerCaseQuery) ||
        item.type.toLowerCase().includes(lowerCaseQuery) ||
        item.evolutionStage.toLowerCase().includes(lowerCaseQuery)
      );
    });

    findAllStub.returns(filteredData);

    const result = await PokemonRepo.list(query);

    expect(result).to.be.an('array');
    expect(result).to.have.lengthOf(filteredData.length);

    result.forEach((item, index) => {
      expect(item).to.have.property('id', mockData[index].id);
      expect(item).to.have.property('name', mockData[index].name);
      expect(item).to.have.property('type', mockData[index].type);
      expect(item).to.have.property('evolutionStage', mockData[index].evolutionStage);
      expect(item).to.have.property('weather', mockData[index].weather);
      expect(item).to.deep.equal(filteredData[index]);
    });
  });

  it('should filter by evolution stage when "evolutionStage" filter is provided', async () => {
    const query = {
      search: 'Pichu',
    };
    const matchingPokemon = {
      id: 1,
      name: 'Pikachu',
      type: 'Electric',
      evolutionStage: 'Pichu',
      weather: 'Sunny',
    };

    const nonMatchingPokemon = {
      id: 2,
      name: 'Charmander',
      type: 'Fire',
      evolutionStage: 'Charmeleon',
      weather: 'Sunny',
    };

    const data = [matchingPokemon, nonMatchingPokemon];

    findAllStub.returns(data);

    const result = await PokemonRepo.list(query);

    expect(result).to.deep.equal([matchingPokemon]);
  });

  it('should paginate results', async () => {
    const query = {
      page: 2,
      pageSize: 1,
    };
    findAllStub.returns(mockData);

    const result = await PokemonRepo.list(query);

    expect(result).to.be.an('array');
    expect(result).to.have.lengthOf(5);
  });
});

describe('PokemonRepo::create', () => {
  let createStub;

  before(() => {
    createStub = sandbox.stub(PokemonModel, 'create');
  });

  afterEach(() => {
    createStub.reset();
  });

  after(() => {
    createStub.restore();
  });

  it('should create a new pokemon', async () => {
    const data = {
      name: 'Bulbasaur',
      type: 'Grass',
      evolutionStage: 'Ivysaur',
      weather: 'Sunny',
    };

    createStub.resolves(data);

    const result = await PokemonRepo.create(data);

    expect(result).to.be.an('object');
    expect(result).to.have.property('name', 'Bulbasaur');
    expect(result).to.have.property('type', 'Grass');
    expect(result).to.have.property('evolutionStage', 'Ivysaur');
    expect(result).to.have.property('weather', 'Sunny');
    expect(result).to.deep.equal(data);
  });

  it('should handle a failed creation', async () => {
    const data = {
      name: 'Invalid Pokemon',
      type: 'Unknown',
    };

    createStub.rejects(new Error('Failed to create'));
    try {
      await PokemonRepo.create(data);

      throw new Error('Test case should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.message).to.equal('Failed to create');
    }
  });
});

describe('PokemonRepo::get', () => {
  let findByPkStub;

  before(() => {
    findByPkStub = sandbox.stub(PokemonModel, 'findByPk');
  });

  after(() => {
    sandbox.restore();
  });

  it('should get a valid Pokemon by ID', async () => {
    const id = 1;
    const pokemonData = {
      id: 1,
      name: 'Pikachu',
      type: 'Electric',
      evolutionStage: 'Pichu',
      weather: 'Sunny',
    };
    findByPkStub.withArgs(id).resolves(pokemonData);

    const result = await PokemonRepo.get(id);

    expect(result).to.have.property('id', 1);
    expect(result).to.have.property('name', 'Pikachu');
    expect(result).to.have.property('type', 'Electric');
    expect(result).to.have.property('evolutionStage', 'Pichu');
    expect(result).to.have.property('weather', 'Sunny');
    expect(result).to.deep.equal(pokemonData);
  });

  it('should handle "get" when the Pokemon does not exist', async () => {
    const id = 999;
    findByPkStub.withArgs(id).resolves(null);

    try {
      await PokemonRepo.get(id);
      throw new Error('Test case should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.message).to.equal('This item is not found');
    }
  });
});

describe('PokemonRepo::delete', () => {
  let findByPkStub, destroyStub;

  before(() => {
    findByPkStub = sandbox.stub(PokemonModel, 'findByPk');
    destroyStub = sandbox.stub();
  });

  afterEach(() => {
    findByPkStub.reset();
    destroyStub.reset();
  });

  after(() => {
    sandbox.restore();
  });

  it('should delete a valid Pokemon by ID', async () => {
    const id = 1;
    const pokemonData = {
      id: 1,
      name: 'Pikachu',
      type: 'Electric',
      evolutionStage: 'Pichu',
      weather: 'Sunny',
      destroy: destroyStub.resolves([]),
    };
    findByPkStub.withArgs(id).returns(pokemonData);

    const result = await PokemonRepo.delete(id);

    expect(result).to.be.an('array');
    expect(result).to.have.lengthOf(0);
  });

  it('should handle "delete" when the Pokemon does not exist', async () => {
    const id = 999;
    findByPkStub.withArgs(id).returns(null);

    try {
      await PokemonRepo.delete(id);
      throw new Error('Test case should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.message).to.equal('This item is not found');
    }
  });
});

describe('PokemonRepo::update', () => {
  let findByPkStub, updateStub;

  before(() => {
    findByPkStub = sandbox.stub(PokemonModel, 'findByPk');
    updateStub = sandbox.stub();
  });

  afterEach(() => {
    findByPkStub.reset();
    updateStub.reset();
  });

  after(() => {
    sandbox.restore();
  });

  it('should update a valid Pokemon by ID', async () => {
    const id = 1;
    const updatedData = {
      name: 'Pikachu Updated',
      type: 'Electric',
      evolutionStage: 'Raichu',
      weather: 'Thunderstorm',
    };

    const originalData = {
      id: 1,
      name: 'Pikachu',
      type: 'Electric',
      evolutionStage: 'Pichu',
      weather: 'Sunny',
      update: updateStub.resolves(updatedData),
    };

    findByPkStub.withArgs(id).resolves(originalData);

    const result = await PokemonRepo.update(id, updatedData);

    expect(result).to.be.an('object');
    expect(result).to.have.property('name', 'Pikachu Updated');
    expect(result).to.have.property('type', 'Electric');
    expect(result).to.have.property('evolutionStage', 'Raichu');
    expect(result).to.have.property('weather', 'Thunderstorm');
    expect(result).to.deep.equal(updatedData);
  });

  it('should handle "update" when the Pokemon does not exist', async () => {
    const id = 999;
    const updatedData = {
      name: 'Invalid Pokemon',
      type: 'Unknown',
    };
    findByPkStub.withArgs(id).returns(null);

    try {
      await PokemonRepo.update(id, updatedData);
      throw new Error('Test case should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.message).to.equal('This item is not found');
    }
  });
});
