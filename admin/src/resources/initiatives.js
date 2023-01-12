import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  Edit,
  Filter,
  TextInput,
  BooleanInput,
  FilterLiveSearch,
  FilterList,
  FilterListItem,
  DateField,
  EditButton,
  DeleteButton,
  usePermissions,
} from 'react-admin'
import InitiativeForm from '../components/InitiativeForm'
import FilterSidebar from '../components/FilterSidebar'
import Typography from '@mui/material/Typography'
import Pagination from '../components/Pagination'
import { hasSuperAdminRole } from '../authorization'

const TITLE = 'Initiatives'

const InitiativesFilter = (props) => (
  <Filter {...props}>
    <TextInput fullWidth margin="none" variant="standard" source="id" />
    <TextInput fullWidth margin="none" variant="standard" source="name" />
    <TextInput fullWidth margin="none" variant="standard" source="address" />
    <TextInput fullWidth margin="none" variant="standard" source="postalcode" />
    <TextInput fullWidth margin="none" variant="standard" source="city" />
    <TextInput fullWidth margin="none" variant="standard" source="state" />
    <TextInput fullWidth margin="none" variant="standard" source="country" />
    <TextInput fullWidth margin="none" variant="standard" source="url" />
    <TextInput
      fullWidth
      margin="none"
      variant="standard"
      source="description"
    />
    <BooleanInput fullWidth margin="none" variant="standard" source="active" />
  </Filter>
)

export const InitiativesFilterSidebar = () => (
  <FilterSidebar>
    <Typography>Quick Filters</Typography>
    <FilterLiveSearch
      fullWidth
      margin="none"
      variant="standard"
      source="id"
      label="id"
    />
    <FilterLiveSearch
      fullWidth
      margin="none"
      variant="standard"
      source="name"
      label="name"
    />
    <FilterLiveSearch
      fullWidth
      margin="none"
      variant="standard"
      source="postalcode"
      label="postalcode"
    />
    <FilterLiveSearch
      fullWidth
      margin="none"
      variant="standard"
      source="city"
      label="city"
    />
    <FilterList label="Country">
      <FilterListItem
        label="Germany"
        value={{
          country: 'DEU',
        }}
      />
      <FilterListItem
        label="Switzerland"
        value={{
          country: 'CHE',
        }}
      />
      <FilterListItem
        label="Austria"
        value={{
          country: 'AUT',
        }}
      />
    </FilterList>
    <FilterList label="Active">
      <FilterListItem
        label="Yes"
        value={{
          active: true,
        }}
      />
      <FilterListItem
        label="No"
        value={{
          active: false,
        }}
      />
    </FilterList>
    <FilterList label="Badges">
      <FilterListItem
        label="Netzwerk solidarische Landwirtschaft e.V."
        value={{
          'badges.id': 1,
        }}
      />
    </FilterList>
  </FilterSidebar>
)

export const InitiativesList = (props) => {
  const { permissions } = usePermissions()
  return (
    <List
      {...props}
      title={TITLE}
      bulkActionButtons={false}
      filters={<InitiativesFilter />}
      aside={<InitiativesFilterSidebar />}
      pagination={<Pagination />}
      perPage={25}
    >
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <BooleanField source="active" />
        <TextField source="name" />
        <TextField source="city" />
        <TextField source="state" />
        <TextField source="country" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
        <EditButton />
        {hasSuperAdminRole(permissions) && <DeleteButton undoable={false} />}
      </Datagrid>
    </List>
  )
}
export const InitiativesEdit = (props) => (
  <Edit {...props} title={`${TITLE} - ${props.id}`}>
    <InitiativeForm />
  </Edit>
)
