import FormPage from './FormPage';

const fields = [
  { key: 'title', label: 'Title', required: true },
  { key: 'slug', label: 'Slug', required: true, placeholder: 'auto-generated-from-title' },
  { key: 'docket_number', label: 'Docket Number', type: 'number', required: true },
  { key: 'order', label: 'Display Order', type: 'number', required: true },
  { key: 'headline', label: 'Headline' },
  { key: 'summary', label: 'Summary', type: 'textarea', required: true },
  { key: 'body', label: 'Body', type: 'textarea', rows: 6 },
  { key: 'extra', label: 'Extra Content', type: 'textarea', rows: 4 },
  { key: 'services_title', label: 'Services Section Title' },
  { key: 'bullet_points', label: 'Bullet Points (JSON array)', type: 'json', rows: 5, placeholder: '["Item 1", "Item 2"]' },
  { key: 'stamp_label', label: 'Stamp Label' },
  { key: 'stamp_body', label: 'Stamp Body', type: 'textarea', rows: 3 },
  { key: 'image', label: 'Hero Image', type: 'file' },
  { key: 'meta_description', label: 'Meta Description', type: 'textarea', rows: 2 },
];

export default function PracticeAreaForm() {
  return (
    <FormPage
      resource="practice-areas"
      title="Practice Area"
      fields={fields}
      backPath="/admin/practice-areas"
    />
  );
}
