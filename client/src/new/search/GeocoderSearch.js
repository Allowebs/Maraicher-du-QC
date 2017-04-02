import React, { PropTypes } from 'react'
import Autocomplete from 'react-autocomplete'
import classNames from 'classnames'
import isEqual from 'lodash.isequal'
import PreviewTile from '../common/PreviewTile'


const ResultItem = (item, isHighlighted) => (
  <div
    className={classNames({
      'geocoder-search-item': true,
      'geocoder-search-item-active': isHighlighted,
    })}
    key={item.key}
  >
    {item.name}
  </div>
)

const ResultMenu = items => (
  <div className="geocoder-search-menu">
    {items}
  </div>
)

const Preview = (latitude, longitude, markerIcon) => (
  <PreviewTile
    latitude={Number(latitude)}
    longitude={Number(longitude)}
    markerIcon={markerIcon}
  />
)

const formatDisplayValue = ({ address, city }) => {
  if (address && city) {
    return `${address}, ${city}`
  }
  return city || address || ''
}

class GeocoderSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: {},
      initialValue: '',
    }
  }

  componentWillReceiveProps({ input, displayValue }) {
    if (!this.state.itemSelected) {
      this.setState({ displayValue })
    }

    if (input.value && !isEqual(input.value, this.state.value)) {
      this.setState({
        displayValue: formatDisplayValue(input.value),
        value: {
          latitude: input.value.latitude,
          longitude: input.value.longitude,
          city: input.value.city,
          address: input.value.address,
        },
      })
    }
  }

  handleSelect = (event, value) => {
    const mappedValue = {
      latitude: value.lat,
      longitude: value.lon,
      address: value.address,
      city: value.city,
    }
    this.props.input.onChange(mappedValue)
    this.setState({ itemSelected: true })
  }

  handleChange = (event, value) => {
    this.setState({ itemSelected: false })
    this.props.onAutocomplete(value)
  }

  render() {
    const lat = this.state.value.latitude
    const lon = this.state.value.longitude

    return (
      <div className="geocoder-search">
        <label
          className={classNames({ required: this.props.required })}
          htmlFor={this.props.input.name}
        >
          {this.props.label}
        </label>
        <div className="geocoder-search-input-container">
          <Autocomplete
            inputProps={{
              name: this.props.input.name,
              className: 'geocoder-search-input',
              placeholder: 'Straße und Hausnummer, Ort',
            }}
            renderItem={ResultItem}
            renderMenu={ResultMenu}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
            items={this.props.geocoderItems}
            getItemValue={item => item.name}
            value={this.state.displayValue}
          />

          {lat && lon && Preview(lat, lon, this.props.markerIcon)}

          <p>
            Diese Angaben werden ausschließlich dazu verwendet, den Ort auf der Karte zu markieren. Die Adresse wird weder im Web veröffentlicht noch anderweitig weitergegeben.
          </p>

        </div>
      </div>
    )
  }
}

GeocoderSearch.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
    onChange: PropTypes.func,
    // TODO what is going on here, both object and string are set?
    value: PropTypes.any,
  }).isRequired,
  displayValue: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  markerIcon: PropTypes.oneOf(['Depot', 'Farm', 'Initiative']).isRequired,
  onAutocomplete: PropTypes.func.isRequired,
  geocoderItems: PropTypes.arrayOf(PropTypes.object).isRequired,
}

GeocoderSearch.defaultProps = {
  required: false,
}

export default GeocoderSearch
