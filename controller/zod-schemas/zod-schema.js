import { z } from 'zod'

const schema = z.object({
  nombreCliente: z.string().max(40),
  nombreProspecto: z.string().max(40),
  telCliente: z.number(),
  emailCliente: z.string().email(),
  idInmueble: z.string(),
  idAsesor: z.string()

})

const schemaPut = z.object({
  nombreCliente: z.string().max(40),
  nombreProspecto: z.string().max(40),
  telCliente: z.number(),
  emailCliente: z.string().email(),
  idInmueble: z.string()

})

export function verifyObject (object) {
  return schema.safeParse(object)
}

export function verifyObjectPut (object) {
  return schemaPut.safeParse(object)
}
