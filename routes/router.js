import { Router } from 'express'
import { ApiController } from '../controller/apiController.js'

export const CreateRouter = ({ model }) => {
  const routes = Router()
  const controller = new ApiController({ model })

  routes.get('/', controller.getProspects)
  routes.get('/prospects', controller.getProspects)
  routes.get('/prospects/:id', controller.getProspectById)
  routes.post('/prospects', controller.createProspect)
  routes.put('/prospects/:id', controller.updateProspect)
  routes.delete('/prospects/:id', controller.deleteProspect)
  routes.get('/flats', controller.getFlats)
  routes.get('/flats/:id', controller.getFlatById)
  routes.get('/assessors', controller.getAssessor)
  routes.get('/assessors/:id', controller.getAssessorById)
  routes.get('/complexes', controller.getComplex)
  routes.get('/users/:id', controller.getUserById)

  return routes
}
