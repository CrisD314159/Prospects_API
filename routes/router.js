import { Router } from 'express'
import { ApiController } from '../controller/apiController.js'

export const CreateRouter = ({ model }) => {
  const routes = Router()
  const controller = new ApiController({ model })

  routes.get('/', controller.getProspects)
  routes.get('/prospects', controller.getProspects)
  routes.get('/prospects/:id', controller.getProspectById)
  routes.post('/prospects', controller.createProspect)
  routes.post('/report', controller.postProspectsReport)
  routes.put('/prospects/:id', controller.updateProspect)
  routes.delete('/prospects/:id', controller.deleteProspect)
  routes.get('/flats', controller.getFlats)
  routes.get('/flats/:id', controller.getFlatById)
  routes.get('/assessors', controller.getAssessor)
  routes.put('/assessors', controller.updateUser)
  routes.get('/assessors/:id', controller.getAssessorById)
  routes.get('/assessors/edit/:id', controller.getAssessorById)
  routes.get('/complexes', controller.getComplex)
  routes.get('/users', controller.getAssessor);
  routes.delete('/users/:id', controller.deleteUser);
  routes.post('/users', controller.createUser);
  routes.put('/users/:id',controller.updateUser);
  routes.put('/users/edit/:id',controller.updateUser);
  routes.get('/users', controller.getAssessor);
  routes.delete('/users/:id', controller.deleteUser);
  routes.post('/users', controller.createUser);
  routes.put('/users/:id',controller.updateUser);
  routes.put('/users/edit/:id',controller.updateUser);
  routes.get('/users/:id', controller.getUserById);;
  routes.post('/userId', controller.postUserId)

  return routes
}
