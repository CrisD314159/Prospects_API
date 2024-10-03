import { generateProspectsReport } from '../services/reportGenerator.js';
import { verifyObject, verifyObjectPut } from './zod-schemas/zod-schema.js'

export class ApiController {

  constructor ({ model }) {
    this.model = model
  }

  // Gets all the prospects available
  getProspects = async (req, res) => {
    const prospects = await this.model.getProspects()
    if (prospects === null) res.status(404)
    res.json(prospects)
  }

  // Gets one prospect by its id
  getProspectById = async (req, res) => {
    const { id } = req.params
    const prospect = await this.model.getProspectById({ id })
    if (prospect === null) res.status(404)
    res.json(prospect)
  }

  // Generate prospect's report
  postProspectsReport = async (req, res) => {
    console.log("Generando reporte...");

    try {
      // Obtener todos los prospectos
      const prospects = await this.model.getProspects();

      if (!prospects) {
        return res.status(404).json({ message: "No se encontraron prospectos" });
      }

      // Generar el PDF usando la función del archivo externo
      const reportPath = await generateProspectsReport(prospects);

      // Responder al cliente cuando se haya generado el reporte
      res.json({ message: "Reporte generado exitosamente", path: reportPath });

    } catch (error) {
      console.error("Error al generar el reporte:", error);
      res.status(500).json({ message: "Error al generar el reporte" });
    }
  }

  // Creates a prospect
  createProspect = async (req, res) => {
    const { id, nombreProspecto, nombreCliente, telCliente, emailCliente, observacion, idInmueble, idAsesor, idConjunto } = req.body

    const verifiedProspect = verifyObject({ id, nombreCliente, nombreProspecto, telCliente, emailCliente, idInmueble, idAsesor, idConjunto })
    if (verifiedProspect.error) {
      throw new Error(verifiedProspect.error)
    }
    const prospect = {
      ...verifiedProspect.data,
      observacion

    }

    const response = await this.model.createProspect({ prospect })
    if (response) {
      res.json({ message: 'Prospect created' })
    } else {
      res.status(400)
    }
  }

  // Updates a prospect using its id
  updateProspect = async (req, res) => {
    const { nombreProspecto, nombreCliente, telCliente, emailCliente, observacion, idInmueble, idConjunto } = req.body
    const { id } = req.params

    const verifyFields = verifyObjectPut({ nombreProspecto, nombreCliente, telCliente, emailCliente, idInmueble, idConjunto })
    if (verifyFields.error) {
      throw new Error(verifyFields.error)
    }

    const prospecto = {
      id,
      ...verifyFields.data,
      observacion
    }

    const response = await this.model.updateProspect(prospecto)
    if (response) res.json({ message: 'Prospect Updated' })
    res.status(400)
  }

  // Deletes a prospect by its id
  deleteProspect = async (req, res) => {
    const { id } = req.params
    const response = await this.model.deleteProspect({ id })
    if (response) res.json({ message: 'Prospect deleted' })
    res.status(400)
  }

  // gets all the flats available
  getFlats = async (req, res) => {
    const flats = await this.model.getFlats()
    if (flats.length === 0) res.status(404)
    res.json(flats)
  }

  getComplex = async (req, res) => {
    const complexes = await this.model.getComplex()
    if (complexes.length === 0) res.status(404)
    res.json(complexes)
  }

  // gets a flt by its id
  getFlatById = async (req, res) => {
    const { id } = req.params
    const flat = await this.model.getFlatById({ id })
    console.log(flat)
    if (flat === null) res.status(404)
    res.json(flat)
  }

  getAssessor = async (req, res) => {
    const assesors = await this.model.getAssessor()
    if (assesors === null) res.status(404)
    res.json(assesors)
  }

  getAssessorById = async (req, res) => {
    const { id } = req.params
    const assessor = await this.model.getAssessorById({ id })
    if (assessor === null) res.status(404)
    res.json(assessor)
  }

  getUserById = async (req, res) => {
    const { id } = req.params
    const user = await this.model.getUserById({ id })
    if (user === null) res.status(404)
    res.json(user)
  }
}
