import postgres from 'postgres'
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const db = postgres({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false,
})

export class ProspectModel {
  static getProspects = async () => {
    const query = await db`
    SELECT prospectos.id, nombreCliente, telefonoCliente, emailCliente, observacion, Inmuebles.nombre AS nombreApto, Inmuebles.torre AS torre, Inmuebles.descripcion AS descApto,
    Conjunto.nombre as nombreConjunto, Usuario.nombre AS nombreAsesor, Usuario.telefono AS telAsesor, Usuario.email AS emailAsesor
    FROM prospectos
    JOIN inmuebles ON prospectos.inmueble = inmuebles.nombre
    JOIN Usuario ON prospectos.asesor = Usuario.id
    JOIN Conjunto ON prospectos.conjunto = Conjunto.id;
    `
    if (query.length > 0) {
      return query
    } else {
      return null
    }
  }

  static getProspectById = async ({ id }) => {
    const [query] = await db`
    SELECT prospectos.id AS id, nombreCliente, telefonoCliente, emailCliente, observacion, Inmuebles.nombre AS nombreApto, Inmuebles.torre AS torre, Inmuebles.descripcion AS descApto,
    Conjunto.nombre as nombreConjunto, Usuario.nombre AS nombreAsesor, Usuario.telefono AS telAsesor, Usuario.email AS emailAsesor
    FROM prospectos
    JOIN inmuebles ON prospectos.inmueble = inmuebles.nombre
    JOIN Usuario ON prospectos.asesor = Usuario.id
    JOIN Conjunto ON prospectos.conjunto = Conjunto.id
    WHERE prospectos.id = ${id};
    `
    if (query) {
      return query
    } else {
      return null
    }
  }

  static createProspect = async ({ prospect }) => {
    const { id, nombreProspecto, nombreCliente, telCliente, emailCliente, observacion, idInmueble, idAsesor, idConjunto } = prospect
    const [prospecto] = await db`SELECT * FROM prospectos WHERE id = ${id};`
    if (prospecto) {
      throw new Error('Prospect already exists')
    }
    try {
      const query = await db.begin(async db => {
        await db`
        INSERT INTO prospectos(id, nombre, nombrecliente, telefonocliente, emailcliente, observacion, inmueble, asesor, conjunto)
        VALUES(${id}, ${nombreProspecto}, ${nombreCliente}, ${telCliente}, ${emailCliente}, ${observacion}, ${idInmueble}, ${idAsesor}, ${idConjunto});
          `
        return true
      })

      return query
    } catch (error) {
      throw new Error(error)
    }
  }

  static updateProspect = async (prospect) => {
    const { id, nombreProspecto, nombreCliente, telCliente, emailCliente, observacion, idInmueble, idConjunto } = prospect
    try {
      const query = await db.begin(async db => {
        await db`
         UPDATE prospectos
         SET nombre = ${nombreProspecto}, nombreCliente = ${nombreCliente} , telefonoCliente = ${telCliente}, emailCliente = ${emailCliente}, observacion = ${observacion}, idInmueble = ${idInmueble}, idConjunto = ${idConjunto}
         WHERE id = ${id};
        `
        return true
      })
      return query
    } catch (error) {
      throw new Error(error)
    }
  }

  static deleteProspect = async ({ id }) => {
    try {
      const query = await db.begin(async (db) => {
        await db`
        DELETE FROM prospectos WHERE id = ${id}
        `
        return true
      })
      return query
    } catch (error) {
      throw new Error(error)
    }
  }

  static getFlats = async () => {
    const query = await db`SELECT * FROM inmuebles;`

    if (query.length > 0) {
      return query
    } else {
      return null
    }
  }

  static getFlatById = async ({ id }) => {
    const [flat] = await db`SELECT * FROM inmuebles WHERE nombre = ${id};`
    if (flat) {
      return flat
    } else {
      return null
    }
  }

  static getAssessor = async () => {
    const assessors = await db`SELECT * FROM Usuario;`
    if (assessors.length > 0) {
      return assessors
    } else {
      return null
    }
  }

  static getAssessorById = async ({ id }) => {
    const [assessor] = await db`SELECT * FROM Usuario WHERE id = ${id};`
    if (assessor) {
      return assessor
    } else {
      return null
    }
  }

  static getComplex = async () => {
    const complexes = await db`SELECT * FROM conjunto;`
    if (complexes.length > 0) {
      return complexes
    } else {
      return null
    }
  }

  static getUsers = async () => {
    console.log("Fetching users from database...");
    const users = await db`SELECT * FROM usuario;`;
    console.log("Users fetched:", users);
    if (users.length > 0) {
        return users;
    } else {
        return null;
    }
};

  static deleteUser = async ({ id }) => {
  try {
      const query = await db.begin(async (db) => {
          await db`
          DELETE FROM usuario WHERE id = ${id}
          `;
          return true;
      });
      return query;
  } catch (error) {
      throw new Error(error);
    }
  }

  static updateUser = async (user) => {
    const { id, username, nombre, telefono, email } = user;
    try {
      const query = await db.begin(async (db) => {
        await db`
        UPDATE usuario
        SET usuario = ${username}, nombre = ${nombre}, telefono = ${telefono}, email = ${email}
        WHERE id = ${id};
        `;
        return true;
      });
      return query;
    } catch (error) {
      throw new Error(error);
    }
  };


  static createUser = async ({ user }) => {
    const { id, username, password, nombre, telefono,email } = user;
    const [existingUser] = await db`SELECT * FROM usuario WHERE id = ${id};`;
    if (existingUser) {
      return { success: false, message: 'El usuario ya existe' }; // Retorna un objeto con mensaje
  }

    try {
      const query = await db.begin(async db => {
        await db`
        INSERT INTO usuario (id,usuario,password,nombre, telefono, email,esadministrador)
        VALUES (${id}, ${username}, ${password}, ${nombre}, ${telefono},${email},false);
        `;
        return true;
      });

      return { success: true, message: 'Usuario creado con éxito' }; // Mensaje de éxito
    } catch (error) {
      console.error('Error en la creación de usuario:', error);
        return { success: false, message: 'Error al crear el usuario' };
    }
  };


  static getUserById = async ({ id }) => {
    const [user] = await db`SELECT * FROM Usuario WHERE usuario = ${id};`
    if (user) {
      return user
    } else {
      return null
    }
  }
}
