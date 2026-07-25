import { useState } from 'react';

export default function ContactWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: 'max(24px, env(safe-area-inset-bottom, 24px))', right: 'max(24px, env(safe-area-inset-right, 24px))', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
      {open && (
        <>
          <a
            href="https://wa.me/15013899770"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: '#25D366',
              color: '#fff',
              padding: '12px 20px',
              borderRadius: 9999,
              boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
              fontSize: '0.9rem',
              fontWeight: 600,
              fontFamily: 'inherit',
              textDecoration: 'none',
            }}
          >
            <svg aria-hidden="true" width="20" height="20" fill="#fff" viewBox="0 0 32 32"><path d="M16.004 0C7.164 0 .004 7.156.004 15.996c0 2.816.736 5.564 2.132 7.984L.024 32l8.232-2.164A15.93 15.93 0 0016.004 32C24.844 32 32 24.844 32 16.004S24.844 0 16.004 0zm9.36 22.604c-.392 1.108-1.944 2.028-3.168 2.292-.828.18-1.904.324-5.54-1.192-4.656-1.936-7.64-6.68-7.872-6.992-.224-.312-1.872-2.496-1.872-4.764 0-2.268 1.192-3.384 1.616-3.848.392-.432 1.032-.544 1.372-.544.34 0 .676.004.972.016.312.012.736-.12 1.148.872.412 1.012 1.404 3.424 1.524 3.664.12.24.2.516.04.828-.12.312-.24.504-.452.78-.216.276-.436.488-.66.784-.196.248-.412.512-.168.944.244.428 1.084 1.788 2.324 2.896 1.6 1.424 2.948 1.864 3.376 2.068.428.204.676.172.924-.104.248-.276 1.052-1.224 1.332-1.652.276-.432.556-.36.944-.216.392.144 2.496 1.176 2.924 1.392.428.216.712.324.816.504.108.18.108 1.044-.284 2.152z"/></svg>
            WhatsApp
          </a>
          <button
            type="button"
            onClick={() => window.location.href = 'mailto:info@simpsonlawpartners.net?subject=Legal%20Inquiry'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: '#A83E32',
              color: '#2B2924',
              padding: '12px 20px',
              borderRadius: 9999,
              boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
              fontSize: '0.9rem',
              fontWeight: 600,
              fontFamily: 'inherit',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <svg aria-hidden="true" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            Email
          </button>
        </>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          backgroundColor: '#2B2924',
          color: '#E8E1D0',
          boxShadow: '0 6px 20px rgba(0,0,0,0.35)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label="Contact us"
      >
        {open ? (
          <svg aria-hidden="true" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg aria-hidden="true" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
          </svg>
        )}
      </button>
    </div>
  );
}
