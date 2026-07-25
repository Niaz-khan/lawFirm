import FormPage from './FormPage';

const fields = [
  { key: 'name', label: 'Office Name', required: true },
  { key: 'address_line1', label: 'Address Line 1', required: true },
  { key: 'address_line2', label: 'Address Line 2' },
  { key: 'city', label: 'City', required: true },
  { key: 'state', label: 'State', required: true },
  { key: 'zipcode', label: 'Zip Code', required: true },
  { key: 'phone', label: 'Phone', required: true },
  { key: 'hours', label: 'Hours (JSON object)', type: 'json', rows: 5, placeholder: '{"monday": "9am-5pm"}' },
  { key: 'lat', label: 'Latitude', type: 'number' },
  { key: 'lng', label: 'Longitude', type: 'number' },
];

export default function OfficeForm() {
  return (
    <FormPage
      resource="offices"
      title="Office"
      fields={fields}
      backPath="/admin/offices"
    />
  );
}
