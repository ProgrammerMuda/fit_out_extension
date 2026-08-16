import React from 'react';

export function ActionRequiredAlert({ actionRequired }) {
  const renderDescription = () => {
    if (React.isValidElement(actionRequired?.description)) {
      return actionRequired.description;
    }

    const text =
      actionRequired?.description ||
      'Verify work progress and confirm whether fitout renovation has been completed, as the scheduled work period ended on 10 Aug 2026.';

    // Spotlight nominal / currency (e.g. Rp 450.000,00) with bold highlight
    const rpRegex = /(Rp\s?[\d.,]+)/g;
    if (typeof text === 'string' && rpRegex.test(text)) {
      const parts = text.split(rpRegex);
      return parts.map((part, index) => {
        if (/^Rp\s?[\d.,]+$/.test(part)) {
          return (
            <strong
              key={index}
              className="fw-bold text-decoration-underline-hover"
              style={{ color: '#431407', fontSize: '0.86rem', fontWeight: 700 }}
            >
              {part}
            </strong>
          );
        }
        return part;
      });
    }

    return text;
  };

  return (
    <div
      className="action-required-alert mb-4"
      style={{
        backgroundColor: '#fff7ed',
        borderColor: '#fed7aa',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '0.5rem',
        padding: '0.85rem 1.15rem',
      }}
    >
      {/* Indicator dot (Orange) */}
      <div
        className="orange-indicator-dot"
        style={{
          width: '8px',
          height: '8px',
          backgroundColor: '#ea580c',
          borderRadius: '50%',
          marginTop: '6px',
          flexShrink: 0,
        }}
      />

      {/* Alert Content */}
      <div className="d-flex flex-column">
        <div
          className="fw-bold"
          style={{ fontSize: '0.84rem', letterSpacing: '0.02em', color: '#9a3412' }}
        >
          ACTION REQUIRED: {actionRequired?.role || 'TENANT RELATION / ENGINEERING'}
        </div>
        <div
          className="mt-0.5"
          style={{ fontSize: '0.82rem', color: '#7c2d12', lineHeight: '1.45', opacity: 0.95 }}
        >
          {renderDescription()}
        </div>
      </div>
    </div>
  );
}
