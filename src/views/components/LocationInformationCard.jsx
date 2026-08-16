import React from 'react';
import { MapPin, Door, Buildings, Stack } from '@phosphor-icons/react';

export function LocationInformationCard({
  unit = 'AG0311',
  tower = 'Tower G',
  floor = 'Lantai 3',
}) {
  return (
    <div className="proa-card overflow-hidden mb-3">
      {/* Light Gray Card Header (Clean Minimalist & Centered) */}
      <div
        className="p-3 px-4 d-flex align-items-center gap-2 border-bottom"
        style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}
      >
        <div className="d-flex align-items-center flex-shrink-0" style={{ color: '#27b29b' }}>
          <MapPin size={21} weight="bold" />
        </div>
        <span
          className="fw-bold text-dark text-uppercase"
          style={{ letterSpacing: '0.04em', fontSize: '0.84rem', lineHeight: 1 }}
        >
          LOCATION INFORMATION
        </span>
      </div>

      {/* Card Body */}
      <div className="p-4">
        {/* 3 Column Grid: UNIT, TOWER, FLOOR */}
        <div className="row g-3">
          {/* Unit */}
          <div className="col-12 col-md-4">
            <div className="d-flex align-items-center gap-3">
              <div
                className="info-icon-square flex-shrink-0"
                style={{ backgroundColor: '#e6f8f5', color: '#27b29b' }}
              >
                <Door size={20} weight="fill" />
              </div>
              <div>
                <div className="text-muted text-uppercase fw-semibold" style={{ fontSize: '0.68rem', letterSpacing: '0.03em' }}>
                  UNIT
                </div>
                <div className="fw-bold text-dark" style={{ fontSize: '0.9rem' }}>
                  {unit}
                </div>
              </div>
            </div>
          </div>

          {/* Tower */}
          <div className="col-12 col-md-4">
            <div className="d-flex align-items-center gap-3">
              <div
                className="info-icon-square flex-shrink-0"
                style={{ backgroundColor: '#e6f8f5', color: '#27b29b' }}
              >
                <Buildings size={20} weight="fill" />
              </div>
              <div>
                <div className="text-muted text-uppercase fw-semibold" style={{ fontSize: '0.68rem', letterSpacing: '0.03em' }}>
                  TOWER
                </div>
                <div className="fw-bold text-dark" style={{ fontSize: '0.9rem' }}>
                  {tower}
                </div>
              </div>
            </div>
          </div>

          {/* Floor */}
          <div className="col-12 col-md-4">
            <div className="d-flex align-items-center gap-3">
              <div
                className="info-icon-square flex-shrink-0"
                style={{ backgroundColor: '#e6f8f5', color: '#27b29b' }}
              >
                <Stack size={20} weight="fill" />
              </div>
              <div>
                <div className="text-muted text-uppercase fw-semibold" style={{ fontSize: '0.68rem', letterSpacing: '0.03em' }}>
                  FLOOR
                </div>
                <div className="fw-bold text-dark" style={{ fontSize: '0.9rem' }}>
                  {floor}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
