import Alert from 'react-s-alert'
import request from '../common/request'
import config from '../configuration'

export const AUTOCOMPLETE_UPDATE_VALUE = 'AUTOCOMPLETE_UPDATE_VALUE'
export const AUTOCOMPLETE_SEARCH = 'AUTOCOMPLETE_SEARCH'
export const AUTOCOMPLETE_SEARCH_SUCCESS = 'AUTOCOMPLETE_SEARCH_SUCCESS'
export const AUTOCOMPLETE_SEARCH_ERROR = 'AUTOCOMPLETE_SEARCH_ERROR'

const autoCompleteUpdateValue = payload => ({
  type: AUTOCOMPLETE_UPDATE_VALUE,
  payload
})

const autoCompleteSearchSuccess = payload => ({
  type: AUTOCOMPLETE_SEARCH_SUCCESS,
  payload
})

const autoCompleteSearchError = payload => {
  Alert.error('Suchresultate konnten nicht geladen werden.')
  return { type: AUTOCOMPLETE_SEARCH_ERROR, payload, error: true }
}

export const autoCompleteSearch = value => dispatch => {
  request
    .get(`${config.apiBaseUrl}/search/autocomplete`)
    .withCredentials()
    .query({ text: value })
    .end((err, res) => {
      if (err) {
        dispatch(autoCompleteSearchError(err))
      } else {
        let locations = []
        locations = locations.concat(
          res.body.map(l => ({
            type: l.type,
            name: l.name,
            lat: l.lat,
            lon: l.lon,
            key: l.id,
            city: l.city,
            address: l.address,
            id: l.type === 'location' ? '' : l.id
          }))
        )
        dispatch(autoCompleteSearchSuccess(locations))
      }
    })
}

export const autoComplete = value => dispatch => {
  dispatch(autoCompleteUpdateValue(value))
  dispatch(autoCompleteSearch(value))
}
