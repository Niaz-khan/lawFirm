import FormPage from './FormPage';

const fields = [
  { key: 'title', label: 'Title', required: true },
  { key: 'slug', label: 'Slug', required: true, placeholder: 'auto-generated-from-title' },
  { key: 'body', label: 'Body Content', type: 'textarea', required: true, rows: 10 },
  { key: 'meta_description', label: 'Meta Description', type: 'textarea', rows: 2 },
  { key: 'is_published', label: 'Published', type: 'checkbox', hint: 'Visible on the public site' },
];

export default function PageForm() {
  return (
    <FormPage
      resource="pages"
      title="Page"
      fields={fields}
      backPath="/admin/pages"
    />
  );
}
