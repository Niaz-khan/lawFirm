import FormPage from './FormPage';

const fields = [
  { key: 'name', label: 'Full Name', required: true },
  { key: 'slug', label: 'Slug', required: true, placeholder: 'auto-generated-from-name' },
  { key: 'role', label: 'Role / Title', required: true },
  { key: 'bio', label: 'Bio', type: 'textarea', required: true, rows: 4 },
  { key: 'initials', label: 'Initials', required: true, placeholder: 'JS' },
  {
    key: 'avatar_color',
    label: 'Avatar Color',
    type: 'select',
    required: true,
    options: [
      { value: 'brass-light', label: 'Brass Light (Terracotta)' },
      { value: 'moss', label: 'Moss (Green)' },
    ],
  },
  { key: 'order', label: 'Display Order', type: 'number', required: true },
  { key: 'is_active', label: 'Active', type: 'checkbox', hint: 'Visible on the public site' },
  { key: 'photo', label: 'Photo', type: 'file' },
];

export default function TeamForm() {
  return (
    <FormPage
      resource="team"
      title="Team Member"
      fields={fields}
      backPath="/admin/team"
    />
  );
}
