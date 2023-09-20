import { disallow } from 'feathers-hooks-common'

import filterAllowedFields from '../hooks/filterAllowedFields'
import { BadRequest } from '@feathersjs/errors'
import { reactivateUser } from '../hooks/reactivateUser'

export default (app) => {
  const service = {
    create: async (params) => {
      const { id, token } = params
      if (id === undefined || token === undefined) {
        throw new BadRequest(
          'id and token must be present for user reactivation.'
        )
      }
      const { reactivationToken, state } = await app.service('users').get(id)
      if (state === 'ACTIVE') {
        return 'User is active, no reactivation required.'
      }
      if (reactivationToken !== token) {
        throw new BadRequest('Invalid reactivation token.')
      }
      await reactivateUser(app, id)
      return 'User reactivated.'
    },
  }
  app.use('/user-reactivation', service)

  app
    .service('/user-reactivation')
    .hooks({
      before: {
        all: [],
        find: [disallow()],
        get: [disallow()],
        create: [],
        update: [disallow()],
        patch: [disallow()],
        remove: [disallow()],
      },
      after: {
        all: [],
        find: [],
        get: [],
        create: [],
        patch: [],
        remove: [],
      },
      error: {
        all: [],
        find: [],
        get: [],
        create: [],
        patch: [],
        remove: [],
      },
    })
    .hooks({
      after: {
        all: [filterAllowedFields],
      },
    })
}
