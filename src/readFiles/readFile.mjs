import pkg from 'pg';
const { Client } = pkg;

import { fileURLToPath } from 'url';
import path from 'path';
import ExcelJS from 'exceljs';

import { Tables } from '../constants/tables.const.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: +process.env.DB_PORT,
});

client.connect();

const excelFilePath = path.join(__dirname, '../../pokemonGo.xlsx');

export default async function readFile() {
  try {
    console.log('Start importing Date!');

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelFilePath);
    const worksheet = workbook.getWorksheet(1);

    let records = [];

    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber > 1)
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
    console.log('Error during importing the data:', error.message);
  } finally {
    client.end();
  }
}
