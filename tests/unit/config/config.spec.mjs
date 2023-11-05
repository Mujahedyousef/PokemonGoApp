import chai from 'chai';
import { readFile } from 'fs';
import { promisify } from 'util';
import * as dotenv from 'dotenv';
import asyncChai from 'chai-as-promised';

const readFileAsync = promisify(readFile);
chai.use(asyncChai);
chai.should();

describe('load env config', () => {
  it('should load custom env file', async () => {
    const expected = dotenv.parse((await readFileAsync('tests/.env.test')).toString());

    expected.NODE_ENV.should.equal('test');
    AppConfigs.should.not.be.undefined;
    AppConfigs.port.should.not.be.undefined;
    AppConfigs.port.should.equal(3000);
    AppConfigs.cors.should.not.be.undefined;
    AppConfigs.cors.origin.should.not.be.undefined;
    AppConfigs.cors.origin.should.equal('*');
    AppConfigs.connections.should.not.be.undefined;
    AppConfigs.connections.database.should.not.be.undefined;
    AppConfigs.connections.database.database.should.not.be.undefined;
    AppConfigs.connections.database.database.should.equal(expected.AUDIT_DB_DATABASE);
    AppConfigs.connections.database.username.should.not.be.undefined;
    AppConfigs.connections.database.username.should.equal(expected.AUDIT_DB_USERNAME);
    AppConfigs.connections.database.password.should.not.be.undefined;
    AppConfigs.connections.database.password.should.equal(expected.AUDIT_DB_PASSWORD);
    AppConfigs.connections.database.host.should.not.be.undefined;
    AppConfigs.connections.database.host.should.equal(expected.AUDIT_DB_HOST);
    AppConfigs.connections.database.port.should.not.be.undefined;
    AppConfigs.connections.database.port.should.equal(+expected.AUDIT_DB_PORT);
    AppConfigs.connections.database.pool.should.not.be.undefined;
    AppConfigs.connections.database.pool.max.should.not.be.undefined;
    AppConfigs.connections.database.pool.max.should.equal(20);
    AppConfigs.connections.database.logging.should.not.be.undefined;
    AppConfigs.connections.database.logging.should.equal(false);

  });
});
