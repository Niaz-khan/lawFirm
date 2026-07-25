import ListPage from './ListPage';
import { Link } from 'react-router-dom';

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'slug', label: 'Slug' },
  {
    key: 'is_published',
    label: 'Published',
    render: (v) => (
      <span className={v ? 'text-green-600' : 'text-red-500'}>
        {v ? 'Yes' : 'No'}
      </span>
    ),
  },
  {
    key: 'slug',
    label: '',
    render: (v, item) =>
      item.is_published ? (
        <Link
          to={`/page/${v}`}
          target="_blank"
          className="bg-brass text-ink px-3 py-1.5 text-[0.78rem] font-semibold rounded-sm hover:bg-brass-light transition-colors"
        >
          View
        </Link>
      ) : null,
  },
];

export default function PagesAdmin() {
  return (
    <ListPage
      resource="pages"
      title="Pages"
      columns={columns}
      createPath="/admin/pages/new"
    />
  );
}
