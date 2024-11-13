import { z } from 'zod'

const schema = z.object({
  id: z.string(),
  nombreCliente: z.string().max(40),
  nombreProspecto: z.string().max(40),
  telCliente: z.number(),
  emailCliente: z.string().email(),
  idInmueble: z.string(),
  idAsesor: z.string(),
  idConjunto: z.string()

})

const schemaPut = z.object({
  id: z.string(),
  nombreCliente: z.string().max(40),
  nombreProspecto: z.string().max(40),
  telCliente: z.number(),
  emailCliente: z.string().email(),
  idInmueble: z.string(),
  idConjunto: z.string()

})
const schemaUser =z.object({
  id:z.string(),
  username:z.string().max(20),
  password:z.string(),
  nombre:z.string().max(40),
  telefono:z.string(),
  email:z.string().email(),
})

const schemaPutUser=z.object({
  id:z.string(),
  username:z.string().max(20),
  nombre:z.string().max(40),
  telefono:z.string(),
  email:z.string().email(),
})


export function verifyObject (object) {
  return schema.safeParse(object)
}
export function verifyUserObject (object) {
  console.log(object)
  return schemaUser.safeParse(object)
}

export function verifyUserEditObject(object){
  console.log(object)
  return schemaPutUser.safeParse(object)
}

export function verifyObjectPut (object) {
  return schemaPut.safeParse(object)
}
