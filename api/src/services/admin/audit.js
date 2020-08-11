import moment from 'moment'
import Audit from '../../models/audit'

export default (app) => {
  const service = {
    find: async (params) => {
      const deletions = await Audit.knex().raw(
        `
        with farm_deletions as (
        select action_timestamp as time,
            svals(slice(old_values, ARRAY['farm_id']))::INT as farm_id,
            svals(slice(old_values, ARRAY['badge_id']))::INT as badge_id
        from audit where action = 'd'
        and action_timestamp >= (current_timestamp at time zone 'utc' - interval '7 days')
        )
        select d.time, f.id, f.name as farmname, b.name as badgename from farms f, badges b, farm_deletions d
        where d.farm_id = f.id and b.id = d.badge_id
`
      )
      const insertions = await Audit.knex().raw(
        `
        with farm_insertions as (
        select action_timestamp as time,
            svals(slice(new_values, ARRAY['farm_id']))::INT as farm_id,
            svals(slice(new_values, ARRAY['badge_id']))::INT as badge_id
        from audit where action = 'i'
        and action_timestamp >= (current_timestamp at time zone 'utc' - interval '7 days')
        )
        select d.time, f.id, f.name as farmname, b.name as badgename from farms f, badges b, farm_insertions d
        where d.farm_id = f.id and b.id = d.badge_id
`
      )

      const report = {
        deletions: deletions.rows.map(
          (d) =>
            `${moment(d.time).format('DD.MM.YYYY')} - Betrieb ID ${d.id} ${
              d.farmname
            }: ${d.badgename} wurde entfernt`
        ),
        insertions: insertions.rows.map(
          (d) =>
            `${moment(d.time).format('DD.MM.YYYY')} - Betrieb ID ${d.id} ${
              d.farmname
            }: ${d.badgename} wurde hinzugefügt`
        ),
      }

      if (params.query.email === 'true' && params.query.recipient) {
        app.service('emails').create({
          template: 'admin_audit',
          message: {
            to: params.query.recipient,
          },
          locals: {
            badgesDeletions: report.deletions,
            badgesInsertions: report.insertions,
          },
        })
      }

      return report
    },
  }

  app.use('/admin/audit', service)
  app.service('/admin/audit').hooks({
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
