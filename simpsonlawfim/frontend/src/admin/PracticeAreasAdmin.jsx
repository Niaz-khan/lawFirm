import ListPage from './ListPage';

const columns = [
  { key: 'order', label: 'Order' },
  { key: 'docket_number', label: 'Docket #' },
  { key: 'title', label: 'Title' },
  { key: 'slug', label: 'Slug' },
  { key: 'stamp_label', label: 'Stamp' },
];

export default function PracticeAreasAdmin() {
  return (
    <ListPage
      resource="practice-areas"
      title="Practice Areas"
      columns={columns}
      createPath="/admin/practice-areas/new"
    />
  );
}
