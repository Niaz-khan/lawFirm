import ListPage from './ListPage';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'city', label: 'City' },
  { key: 'state', label: 'State' },
  { key: 'phone', label: 'Phone' },
];

export default function OfficesAdmin() {
  return (
    <ListPage
      resource="offices"
      title="Offices"
      columns={columns}
      createPath="/admin/offices/new"
    />
  );
}
