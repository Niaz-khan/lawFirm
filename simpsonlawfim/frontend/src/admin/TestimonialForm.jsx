import { useState, useEffect } from 'react';
import FormPage from './FormPage';
import { fetchList } from '../lib/adminApi';

const baseFields = [
  { key: 'quote', label: 'Quote', type: 'textarea', required: true, rows: 4 },
  { key: 'attribution', label: 'Attribution', required: true, placeholder: 'Personal Injury Client' },
  { key: 'rating', label: 'Rating (1-5)', type: 'number', required: true },
  { key: 'is_published', label: 'Published', type: 'checkbox', hint: 'Visible on the public site' },
];

export default function TestimonialForm() {
  const [fields, setFields] = useState(baseFields);

  useEffect(() => {
    fetchList('practice-areas').then((data) => {
      const areas = data.results || data;
      setFields([
        ...baseFields,
        {
          key: 'practice_area',
          label: 'Practice Area (optional)',
          type: 'select',
          options: [
            { value: '', label: 'None' },
            ...areas.map((a) => ({ value: a.id, label: a.title })),
          ],
        },
      ]);
    });
  }, []);

  return (
    <FormPage
      resource="testimonials"
      title="Testimonial"
      fields={fields}
      backPath="/admin/testimonials"
    />
  );
}
