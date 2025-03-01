import { Feature } from '../../types/types'
import DepotDescription from './DepotDescription'
import FarmDescription from './FarmDescription'
import InitiativeDescription from './InitiativeDescription'

const getDescriptionDetails = (feature: Feature) => {
  switch (feature.properties.type) {
    case 'Farm':
      return <FarmDescription feature={feature} />
    case 'Depot':
      return <DepotDescription feature={feature} />
    case 'Initiative':
      return <InitiativeDescription feature={feature} />
    default:
      return <div />
  }
}

interface PlaceDescriptionProps {
  feature: Feature
}

const PlaceDescription = ({ feature }: PlaceDescriptionProps) => (
  <div>
    <p>{feature.properties.description}</p>
    {getDescriptionDetails(feature)}
  </div>
)

export default PlaceDescription
