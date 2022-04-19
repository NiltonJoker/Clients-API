
import {Request, Response} from 'express'
import { ResultSetHeader } from 'mysql2';
import { connect } from "../database";
import { Client } from '../interfaces/Client'

export async function getAllClients (req: Request, res: Response): Promise<Response> {

  try {
    const conn = await connect();
  
    const clients = await conn.query('SELECT * FROM clients');
  
    return res.json(clients[0])
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Hubo un error obtener los clientes'})
  }
}

export async function createClient (req: Request, res: Response): Promise<Response> {

  try {

    const { nombre, apellido, fecha_nacimiento } = req.body;

    const newClient: Client = {
      nombre,
      apellido,
      fecha_nacimiento: new Date(fecha_nacimiento)
    }

    const conn = await connect();
  
    const clients = await conn.query<ResultSetHeader>('INSERT INTO clients SET ? ',[newClient]);

    const client = await conn.query(`SELECT * FROM clients WHERE id = ${clients[0].insertId}`)

    return res.status(201).json(client[0])
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Hubo un error al crear el cliente'})
  }
}

export async function getAverageClientsAge (req: Request, res: Response): Promise<Response> {

  try {
    
    const conn = await connect();

    const averageAge = await conn.query('SELECT CAST(AVG(TIMESTAMPDIFF(YEAR,fecha_nacimiento,CURDATE())) AS DECIMAL(8,1)) AS avg_edad FROM clients;');

    return res.json(averageAge[0])

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Hubo un error al obtener el promedio de edades'})
  }

}