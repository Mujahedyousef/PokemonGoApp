import pkg from 'pg';
const { Client } = pkg;

import { fileURLToPath } from 'url';
import path from 'path';
import ExcelJS from 'exceljs';

import { Tables } from '../constants/tables.const.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'pokemon_db',
  password: '1234',
  port: 5432,
});

client.connect();

const excelFilePath = path.join(__dirname, '../../pokemonGo.xlsx');

async function importData() {
  try {
    console.log('Start importing Date!');

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelFilePath);
    const worksheet = workbook.getWorksheet(1);

    let records = [];

    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber > 1) {
        records.push([
          row.getCell(2).value,
          row.getCell(3).value,
          row.getCell(5).value,
          row.getCell(6).value,
          row.getCell(7).value,
          row.getCell(8).value,
          row.getCell(10).value,
          row.getCell(12).value,
          row.getCell(14).value,
        ]);
      }
    });

    const insertQuery = `
      INSERT INTO ${Tables.Pokemon} (name, pokedex_number, generation, evolution_stage, evolved, family_Id, type, weather, stat_total)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;

    for (const record of records) {
      await client.query(insertQuery, record);
    }

    console.log('Data imported successfully!');
  } catch (error) {
    console.log('Error during importing the data:', error);
  } finally {
    client.end();
  }
}

importData();
