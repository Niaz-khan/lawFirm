import ListPage from './ListPage';

const columns = [
  { key: 'id', label: 'ID' },
  {
    key: 'quote',
    label: 'Quote',
    render: (v) => <span className="line-clamp-1 max-w-[300px] block italic">"{v}"</span>,
  },
  { key: 'attribution', label: 'Attribution' },
  { key: 'rating', label: 'Rating' },
  {
    key: 'is_published',
    label: 'Published',
    render: (v) => (
      <span className={v ? 'text-green-600' : 'text-red-500'}>
        {v ? 'Yes' : 'No'}
      </span>
    ),
  },
];

export default function TestimonialsAdmin() {
  return (
    <ListPage
      resource="testimonials"
      title="Testimonials"
      columns={columns}
      createPath="/admin/testimonials/new"
    />
  );
}
