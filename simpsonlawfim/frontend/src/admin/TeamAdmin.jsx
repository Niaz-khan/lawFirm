import ListPage from './ListPage';

const columns = [
  { key: 'order', label: 'Order' },
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'initials', label: 'Initials' },
  {
    key: 'is_active',
    label: 'Active',
    render: (v) => (
      <span className={v ? 'text-green-600' : 'text-red-500'}>
        {v ? 'Yes' : 'No'}
      </span>
    ),
  },
];

export default function TeamAdmin() {
  return (
    <ListPage
      resource="team"
      title="Team Members"
      columns={columns}
      createPath="/admin/team/new"
    />
  );
}
