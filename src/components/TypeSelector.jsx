import { QR_TYPES } from '../utils/qrHelper';

function TypeIcon({ type }) {
  switch (type) {
    case 'url':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      );
    case 'text':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="4 7 4 4 20 4 20 7" />
          <line x1="9" y1="20" x2="15" y2="20" />
          <line x1="12" y1="4" x2="12" y2="20" />
        </svg>
      );
    case 'email':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    case 'phone':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case 'wifi':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 13a10 10 0 0 1 14 0" />
          <path d="M8.5 16.5a5 5 0 0 1 7 0" />
          <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3.5" />
          <path d="M2 8.82a15 15 0 0 1 20 0" />
        </svg>
      );
    default:
      return null;
  }
}

/**
 * QR Type Selector component with Neo-Pop sticker pill tabs and starburst badge.
 */
export default function TypeSelector({ activeType, onSelectType }) {
  return (
    <div className="type-selector-container">
      <div className="step-header">
        <span className="step-tag starburst">✦ 01</span>
        <label className="section-label">Select QR Type</label>
      </div>

      <div className="type-selector-pills" role="tablist" aria-label="QR Code Type Selection">
        {QR_TYPES.map((type) => {
          const isActive = activeType === type.id;
          return (
            <button
              key={type.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`type-pill ${isActive ? 'active' : ''}`}
              onClick={() => onSelectType(type.id)}
            >
              <span className="type-pill-icon">
                <TypeIcon type={type.id} />
              </span>
              <span className="type-pill-label">{type.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
