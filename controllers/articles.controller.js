import bcrypt from 'bcryptjs'
import { db } from '../database/connection.db.js'
import xlsx from 'xlsx'
// const spawner = require('child_process').spawn
import spawner from 'child_process'
// import fs from 'fs'
import multer from 'multer'
import { UserToken } from '../helpers/generatetoken.js'
import { UserModel } from "../models/user.model.js";




const getAllArticles = (req, res) => {
    const sql = "SELECT onyx.codigo, onyx.descripcion, onyx.cant_a + capa.cant_a AS total_a FROM onyx INNER JOIN capa on onyx.codigo = capa.codigo"
    db.query(sql, (err, data) => {
        if (err) return 'Error'
        return res.json(data)
    })
    // const {authorization} = req.headers
    // if(!authorization){
    //     res.status(401).send('Token requerido')
    // }else{
    //     res.status(200).send('Token valido')
    // }
}





const getImportO = async (req, res) => {

    // preparo xlsx
    // const python_process1 = spawner('python', ['script1.py'])




    // elimino tablas
    // try {
    //     const sqlDropA = 
    //     db.query(sqlDropA)
    // } catch (err) {
    //     res.json('Error: ', err)
    // }

    // recreo tablas

    // try {
    //     const sqlCreateA = "CREATE TABLE IF NOT EXISTS onyx (codigo character varying(100) NOT NULL, descripcion character varying(255), tipo character varying(50), cant_A integer NOT NULL DEFAULT 0, cant_B integer NOT NULL DEFAULT 0, PRIMARY KEY (codigo))"
    //     db.query(sqlCreateA)
    // } catch (err) {
    //     res.status(500).json({Error: err})
    // }




    // Importo xlsx

    // const upload = multer({ dest: "uploads/" })
    // const filePath = req.file.path

    const filePath = 'C:/Users/User/Desktop/bull/back/uploads/l_e11dep.xlsx'




    try {
        // Parse Excel file
        const wb = xlsx.readFile(filePath); //req.file.path
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet);
    
        // Insert data into PostgreSQL
        const client = await db.connect();
        try {
          await client.query('BEGIN');
    
          
          const insertQuery = `
            INSERT INTO capa (codigo, descripcion, tipo, cant_a, cant_b)
            VALUES ($1, $2, $3, $4, $5)
          `;
    
          for (const row of data) {
            await client.query(insertQuery, [row.codigo, row.descripcion, row.tipo, row.cant_a, row.cant_b]);
          }
    
          await client.query('COMMIT');
          res.send('Datos importados correctamente');
        } finally {
          client.release();
        }
      } catch (error) {
        console.error('Error cargando los datos desde excel:', error);
        res.status(500).send('Error cargando los datos desde excel');
      }
}


const getImportC = async (req, res) => {

    // preparo xlsx
    // const python_process2 = spawner('python', ['script2.py'])


    // elimino tablas
    // try {
    //     const sqlDropB = "DROP TABLE IF EXISTS capa"
    //     db.query(sqlDropB)
    // } catch (err) {
    //     res.json('Error: ', err)
    // }

    // recreo tabla

    // try {
    //     const sqlCreateB = "CREATE TABLE IF NOT EXISTS capa (codigo character varying(100) NOT NULL, descripcion character varying(255), tipo character varying(50), cant_A integer NOT NULL DEFAULT 0, cant_B integer NOT NULL DEFAULT 0, PRIMARY KEY (codigo))"
    //     db.query(sqlCreateB)
    // } catch (err) {
    //     res.status(500).json({Error: err}) 
    // }



    // importo xlsx

    // const upload = multer({ dest: "uploads/" })
    // const filePath = req.file.path

    const filePath = 'C:/Users/User/Desktop/bull/back/uploads/l_e11dep capa.xlsx'




    try {
        // Parse Excel file
        const wb = xlsx.readFile(filePath); //req.file.path
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet);
    
        // Insert data into PostgreSQL
        const client = await db.connect();
        try {
          await client.query('BEGIN');
    
          
          const insertQuery = `
            INSERT INTO capa (codigo, descripcion, tipo, cant_a, cant_b)
            VALUES ($1, $2, $3, $4, $5)
          `;
    
          for (const row of data) {
            await client.query(insertQuery, [row.codigo, row.descripcion, row.tipo, row.cant_a, row.cant_b]);
          }
    
          await client.query('COMMIT');
          res.send('Datos importados correctamente');
        } finally {
          client.release();
        }
      } catch (error) {
        console.error('Error cargando los datos desde excel:', error);
        res.status(500).send('Error cargando los datos desde excel');
      }
}



export const ArticlesController = {
    getImportO,
    getImportC,
    getAllArticles
}