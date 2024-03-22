import { randomUUID } from 'node:crypto'

export class Inmueble {
  constructor (id, torre, numero) {
    this.id = randomUUID()
    this.torre = torre
    this.numero = numero
  }
}
