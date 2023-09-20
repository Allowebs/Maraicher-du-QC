import createService from 'feathers-objection'

import Badge from '../../models/badges'

export default (app) => {
  const service = createService({
    model: Badge,
    whitelist: ['$eager', '$ilike'],
    paginate: {
      default: 50,
    },
  })

  app.use('/admin/badges', service)
  app.service('/admin/badges').hooks({
    before: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: [],
    },
    after: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: [],
    },
    error: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: [],
    },
  })
}
