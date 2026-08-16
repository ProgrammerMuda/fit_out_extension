import React from 'react';
import { ShieldCheck, CheckCircle, WarningCircle } from '@phosphor-icons/react';

export function InspectionPassCard() {
  const checklist = [
    { label: 'Penyambungan & Seal Pipa Air', passed: true },
    { label: 'Uji Tekanan (Pressure Test) 3 Bar', passed: true },
    { label: 'Inspeksi Kebocoran Area Valve', passed: true },
    { label: 'Restorasi & Pembersihan Plafon/Ducting', passed: false },
  ];

  return (
    <div className="proa-card p-4">
      {/* Header */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <div
          className="d-flex align-items-center justify-content-center rounded-circle"
          style={{ width: '28px', height: '28px', backgroundColor: '#f3e8ff', color: '#a855f7' }}
        >
          <ShieldCheck size={18} weight="bold" />
        </div>
        <h6 className="fw-bold text-dark mb-0" style={{ letterSpacing: '0.03em', fontSize: '0.86rem' }}>
          FITOUT INSPECTION PASS
        </h6>
      </div>

      {/* Checklist items */}
      <div className="d-flex flex-column gap-2">
        {checklist.map((item, idx) => (
          <div
            key={idx}
            className="d-flex align-items-center justify-content-between p-2 rounded-2 bg-light border small"
          >
            <span className="text-secondary" style={{ fontSize: '0.78rem' }}>
              {item.label}
            </span>
            {item.passed ? (
              <span className="badge bg-success-subtle text-success fw-semibold d-flex align-items-center gap-1">
                <CheckCircle size={13} weight="fill" /> PASS
              </span>
            ) : (
              <span className="badge bg-warning-subtle text-warning-emphasis fw-semibold d-flex align-items-center gap-1">
                <WarningCircle size={13} weight="fill" /> PENDING
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
