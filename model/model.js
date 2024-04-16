import postgres from 'postgres'

const db = postgres({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${process.env.ENDPOINT_ID}`
  }
})

export class ProspectModel {
  static getProspects = async () => {
    const query = await db`
    SELECT prospectos.id, nombreCliente, telefonoCliente, correoCliente, observacion, Inmuebles.nombre AS nombreApto, Inmuebles.torre AS torre, Inmuebles.descripcion AS descApto,
    Conjunto.nombre as nombreConjunto, Asesores.nombre AS nombreAsesor, Asesores.telefono AS telAsesor, Asesores.email AS emailAsesor
    FROM prospectos
    JOIN inmuebles ON prospectos.idinmueble = inmuebles.nombre
    JOIN Asesores ON prospectos.idasesor = Asesores.id
    JOIN Conjunto ON prospectos.idconjunto = Conjunto.id;
    `
    if (query.length > 0) {
      return query
    } else {
      return null
    }
  }

  static getProspectById = async ({ id }) => {
    const [query] = await db`
    SELECT prospectos.id AS id, nombreCliente, telefonoCliente, correoCliente, observacion, Inmuebles.nombre AS nombreApto, Inmuebles.torre AS torre, Inmuebles.descripcion AS descApto,
    Conjunto.nombre as nombreConjunto, Asesores.nombre AS nombreAsesor, Asesores.telefono AS telAsesor, Asesores.email AS emailAsesor
    FROM prospectos 
    JOIN inmuebles ON prospectos.idinmueble = inmuebles.nombre
    JOIN Asesores ON prospectos.idasesor = Asesores.id
    JOIN Conjunto ON prospectos.idconjunto = Conjunto.id
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
    try {
      const query = await db.begin(async db => {
        await db`
        INSERT INTO prospectos(id, nombre, nombrecliente, telefonocliente, correocliente, observacion, idInmueble, idAsesor, idConjunto)
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
         SET nombre = ${nombreProspecto}, nombreCliente = ${nombreCliente} , telefonoCliente = ${telCliente}, correoCliente = ${emailCliente}, observacion = ${observacion}, idInmueble = ${idInmueble}, idConjunto = ${idConjunto}
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
    const assessors = await db`SELECT * FROM asesores;`
    if (assessors.length > 0) {
      return assessors
    } else {
      return null
    }
  }

  static getAssessorById = async ({ id }) => {
    const [assessor] = await db`SELECT * FROM asesores WHERE id = ${id};`
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

  static getUserById = async ({ id }) => {
    const [user] = await db`SELECT * FROM asesores WHERE usuario = ${id};`
    if (user) {
      return user
    } else {
      return null
    }
  }
}
