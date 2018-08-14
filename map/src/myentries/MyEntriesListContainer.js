import { connect } from 'react-redux'
import i18n from '../i18n'
import MyEntriesListItem from './MyEntriesListItem'
import { Link } from 'react-router'
import { NEW_DEPOT, NEW_FARM, NEW_INITIATIVE } from '../AppRouter'
import PropTypes from 'prop-types'
import { featurePropType } from '../common/geoJsonUtils'
import React, { Component } from 'react'
import { fetchMyEntries } from '../map/mapActions'

const placesList = features => {
  if (features.length === 0) {
    return <div>{i18n.t('entries.no_entries')}</div>
  }
  return features.map(p => <MyEntriesListItem key={p.id} feature={p} />)
}

class MyEntriesList extends Component {

  componentDidMount(){
    const {fetchMyEntries} = this.props
    fetchMyEntries()
  }

  render() {
    let { features } = this.props
    return (
      <div className="entries-editor-container">
        <section className="entries-list">
          <h1 className="title">{i18n.t('entries.my_entries')}</h1>
          <ul className="entries-list-controls">
            <li>
              <Link to={NEW_DEPOT}>{i18n.t('entries.new_depot')}</Link>
            </li>
            <li>
              <Link to={NEW_FARM}>{i18n.t('entries.new_farm')}</Link>
            </li>
            <li>
              <Link to={NEW_INITIATIVE}>{i18n.t('entries.new_initiative')}</Link>
            </li>
          </ul>
          {placesList(features)}
        </section>
      </div>
    )
  }
}

MyEntriesList.propTypes = {
  features: PropTypes.arrayOf(featurePropType).isRequired
}

const mapStateToProps = ({ map }) => {
  console.log("map", map);

  return ({
    features: map.myentries.features
  })
}

const mapDispatchToProps = {
  fetchMyEntries
}

const MyEntriesListContainer = connect(mapStateToProps, mapDispatchToProps)(MyEntriesList)

export default MyEntriesListContainer
