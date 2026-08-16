import React from 'react';
import { ClockCounterClockwise, ShieldCheck, Gear } from '@phosphor-icons/react';

export function ExtensionHistoryCard() {
  const historyItems = [
    {
      title: 'Extension Requested',
      description: 'Tenant requested to extend the work period until 10 Aug 2026',
      author: 'System',
      timestamp: '04/08/2026, 08:37 AM',
      isCompleted: false,
    },
    {
      title: 'Extension Approved (Paid)',
      description: 'Extension request approved and paid. Work can continue until 10 Aug 2026',
      author: 'System',
      timestamp: '04/08/2026, 08:40 AM',
      isCompleted: true,
    },
  ];

  return (
    <div className="proa-card p-4 mb-3">
      {/* Header */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <ClockCounterClockwise size={18} weight="bold" className="text-secondary" />
        <h6 className="fw-bold text-dark mb-0" style={{ letterSpacing: '0.04em', fontSize: '0.82rem' }}>
          EXTENSION HISTORY
        </h6>
      </div>

      {/* Timeline */}
      <div className="position-relative ps-3">
        {/* Continuous vertical line */}
        <div
          className="position-absolute"
          style={{
            left: '6px',
            top: '8px',
            bottom: '24px',
            width: '2px',
            backgroundColor: '#e2e8f0',
          }}
        />

        {historyItems.map((item, index) => (
          <div key={index} className="position-relative mb-3 pb-1">
            {/* Timeline Marker Circle */}
            <div
              className="position-absolute rounded-circle"
              style={{
                left: '-16px',
                top: '4px',
                width: '12px',
                height: '12px',
                backgroundColor: item.isCompleted ? '#27b29b' : '#ffffff',
                border: item.isCompleted ? '2px solid #27b29b' : '2.5px solid #64748b',
              }}
            />

            {/* Content Row */}
            <div className="d-flex justify-content-between align-items-start gap-2">
              <div>
                <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.82rem' }}>
                  {item.title}
                </h6>
                <p className="text-muted mb-1" style={{ fontSize: '0.74rem' }}>
                  {item.description}
                </p>
                <div className="d-flex align-items-center gap-1" style={{ color: '#27b29b', fontSize: '0.72rem', fontWeight: 600 }}>
                  <Gear size={12} weight="bold" />
                  <span>{item.author}</span>
                </div>
              </div>

              {/* Timestamp */}
              <span className="text-muted text-nowrap flex-shrink-0" style={{ fontSize: '0.72rem' }}>
                {item.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
