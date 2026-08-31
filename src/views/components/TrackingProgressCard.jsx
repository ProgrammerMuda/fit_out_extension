import React, { useState } from 'react';
import {
  Pulse,
  CheckCircle,
  Clock,
  CheckSquare,
  CaretUp,
  CaretDown,
  XCircle,
} from '@phosphor-icons/react';
import { Collapse } from 'react-bootstrap';

export function TrackingProgressCard({ trackingLogs = [] }) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Helper for dynamic colors based on log type
  const getLogTheme = (type) => {
    switch (type) {
      case 'rejected':
        return {
          icon: <XCircle size={22} weight="fill" />,
          color: '#dc2626',
          lineColor: '#fca5a5',
          titleColor: '#dc2626',
          noteBg: '#fff5f5',
          noteBorder: '#dc2626',
          noteText: '#991b1b',
        };
      case 'requested':
        return {
          icon: <Clock size={22} weight="fill" />,
          color: '#ea580c',
          lineColor: '#fed7aa',
          titleColor: '#9a3412',
          noteBg: '#fff7ed',
          noteBorder: '#ea580c',
          noteText: '#9a3412',
        };
      case 'free':
        return {
          icon: <CheckCircle size={22} weight="fill" />,
          color: '#27b29b',
          lineColor: '#99f6e4',
          titleColor: '#0f766e',
          noteBg: '#f0fdfa',
          noteBorder: '#27b29b',
          noteText: '#115e59',
        };
      case 'chargeable':
        return {
          icon: <CheckCircle size={22} weight="fill" />,
          color: '#0284c7',
          lineColor: '#bae6fd',
          titleColor: '#0369a1',
          noteBg: '#f0f9ff',
          noteBorder: '#0284c7',
          noteText: '#0369a1',
        };
      default:
        return {
          icon: <CheckCircle size={22} weight="fill" />,
          color: '#0284c7',
          lineColor: '#0284c7',
          titleColor: '#0284c7',
          noteBg: '#f0f9ff',
          noteBorder: '#0284c7',
          noteText: '#0369a1',
        };
    }
  };

  return (
    <div className="proa-card overflow-hidden mb-3">
      {/* Clickable Light Gray Accordion Header */}
      <div
        className="p-3 px-4 d-flex align-items-center justify-content-between cursor-pointer user-select-none border-bottom"
        onClick={() => setIsExpanded((prev) => !prev)}
        style={{
          backgroundColor: '#f8fafc',
          borderColor: '#e2e8f0',
          cursor: 'pointer',
        }}
        role="button"
        aria-expanded={isExpanded}
      >
        <div className="d-flex align-items-center gap-2">
          <div className="d-flex align-items-center flex-shrink-0" style={{ color: '#27b29b' }}>
            <Pulse size={21} weight="bold" />
          </div>
          <span
            className="fw-bold text-dark text-uppercase"
            style={{ letterSpacing: '0.04em', fontSize: '0.84rem', lineHeight: 1 }}
          >
            TRACKING PROGRESS
          </span>
        </div>

        <button
          type="button"
          className="btn btn-link p-0 text-secondary border-0 d-flex align-items-center"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded((prev) => !prev);
          }}
        >
          {isExpanded ? (
            <CaretUp size={18} weight="bold" />
          ) : (
            <CaretDown size={18} weight="bold" />
          )}
        </button>
      </div>

      {/* Accordion Smooth Collapse Body */}
      <Collapse in={isExpanded}>
        <div className="p-4 pt-3">
          <div className="mt-2">
            {/* Dynamic Extension Timeline Items */}
            {trackingLogs.map((log, idx) => {
              const theme = getLogTheme(log.type);
              const noteContent = log.notes || log.note;

              return (
                <div key={idx} className="d-flex align-items-stretch gap-3 position-relative mb-4">
                  <div className="d-flex flex-column align-items-center position-relative flex-shrink-0" style={{ width: '24px' }}>
                    <div style={{ color: theme.color, zIndex: 2, backgroundColor: '#ffffff' }}>
                      {theme.icon}
                    </div>
                    <div
                      className="position-absolute"
                      style={{
                        top: '20px',
                        bottom: '-28px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '2px',
                        borderLeft: `2px dashed ${theme.lineColor}`,
                        zIndex: 1,
                      }}
                    />
                  </div>
                  <div className="flex-grow-1 pb-1">
                    <div className="mb-2">
                      <h6 className="fw-bold mb-1" style={{ fontSize: '0.86rem', color: theme.titleColor }}>
                        {log.title}
                      </h6>
                      <div className="text-secondary small mb-1" style={{ fontSize: '0.76rem' }}>
                        {log.actor}
                      </div>
                      <div className="d-flex align-items-center gap-1 text-muted" style={{ fontSize: '0.72rem' }}>
                        <Clock size={13} />
                        <span>{log.time}</span>
                      </div>
                    </div>
                    {noteContent && (
                      <div
                        className="p-3 rounded-2"
                        style={{
                          backgroundColor: theme.noteBg,
                          borderLeft: `3px solid ${theme.noteBorder}`,
                          fontSize: '0.76rem',
                          color: theme.noteText,
                          lineHeight: '1.45',
                        }}
                      >
                        {noteContent}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {/* 1. Milestone: Request Fit Out Permit Submitted */}
            <div className="d-flex align-items-stretch gap-3 position-relative mb-4">
              {/* Left Timeline Column (Centered Icon & Line) */}
              <div className="d-flex flex-column align-items-center position-relative flex-shrink-0" style={{ width: '24px' }}>
                <div style={{ color: '#27b29b', zIndex: 2, backgroundColor: '#ffffff' }}>
                  <CheckCircle size={22} weight="fill" />
                </div>
                {/* Dashed Line going down through the exact vertical center */}
                <div
                  className="position-absolute"
                  style={{
                    top: '20px',
                    bottom: '-28px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '2px',
                    borderLeft: '2px dashed #27b29b',
                    zIndex: 1,
                  }}
                />
              </div>

              {/* Right Content */}
              <div className="flex-grow-1 pb-1">
                <div className="mb-2">
                  <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.86rem' }}>
                    Request Fit Out Permit Submitted
                  </h6>
                  <div className="text-secondary small mb-1" style={{ fontSize: '0.76rem' }}>
                    Tenant 10 - Tenant
                  </div>
                  <div className="d-flex align-items-center gap-1 text-muted" style={{ fontSize: '0.72rem' }}>
                    <Clock size={13} />
                    <span>04/08/2026, 08:06 AM</span>
                  </div>
                </div>

                {/* Note Box */}
                <div
                  className="p-3 rounded-2"
                  style={{
                    backgroundColor: '#f1f5f9',
                    borderLeft: '3px solid #27b29b',
                    fontSize: '0.76rem',
                    color: '#475569',
                  }}
                >
                  Request fitout permit data have been successfully uploaded and queued for review.
                </div>
              </div>
            </div>

            {/* 2. Milestone: Waiting for Management Approval */}
            <div className="d-flex align-items-stretch gap-3 position-relative mb-4">
              {/* Left Timeline Column (Centered Icon & Line) */}
              <div className="d-flex flex-column align-items-center position-relative flex-shrink-0" style={{ width: '24px' }}>
                <div style={{ color: '#27b29b', zIndex: 2, backgroundColor: '#ffffff' }}>
                  <CheckCircle size={22} weight="fill" />
                </div>
                {/* Dashed Line going down through the exact vertical center */}
                <div
                  className="position-absolute"
                  style={{
                    top: '20px',
                    bottom: '-28px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '2px',
                    borderLeft: '2px dashed #27b29b',
                    zIndex: 1,
                  }}
                />
              </div>

              {/* Right Content */}
              <div className="flex-grow-1 pb-1">
                <div className="mb-2">
                  <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.86rem' }}>
                    Waiting for Management Approval
                  </h6>
                  <div className="text-secondary small mb-1" style={{ fontSize: '0.76rem' }}>
                    Tenant Relation, Building Manager, Engineering
                  </div>
                  <div className="d-flex align-items-center gap-1 text-muted" style={{ fontSize: '0.72rem' }}>
                    <Clock size={13} />
                    <span>04/08/2026, 08:07 AM</span>
                  </div>
                </div>

                {/* Note Box */}
                <div
                  className="p-3 rounded-2 mb-3"
                  style={{
                    backgroundColor: '#f1f5f9',
                    borderLeft: '3px solid #27b29b',
                    fontSize: '0.76rem',
                    color: '#475569',
                  }}
                >
                  All documents verified. Management has approved your technical and administrative submission.
                </div>

                {/* Sub-approval Cards */}
                <div className="d-flex flex-column gap-2">
                  {/* Review 1 */}
                  <div
                    className="d-flex align-items-center justify-content-between p-2 px-3 rounded-2 border"
                    style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div style={{ color: '#27b29b' }}>
                        <CheckSquare size={20} weight="fill" />
                      </div>
                      <div>
                        <div className="fw-bold text-dark" style={{ fontSize: '0.8rem' }}>
                          Administrative Review
                        </div>
                        <div className="text-muted" style={{ fontSize: '0.72rem' }}>
                          Tenant Relation
                        </div>
                      </div>
                    </div>
                    <span
                      className="badge rounded-pill px-3 py-1 fw-semibold"
                      style={{ backgroundColor: '#10b981', color: '#ffffff', fontSize: '0.72rem' }}
                    >
                      Approved
                    </span>
                  </div>

                  {/* Review 2 */}
                  <div
                    className="d-flex align-items-center justify-content-between p-2 px-3 rounded-2 border"
                    style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div style={{ color: '#27b29b' }}>
                        <CheckSquare size={20} weight="fill" />
                      </div>
                      <div>
                        <div className="fw-bold text-dark" style={{ fontSize: '0.8rem' }}>
                          Document & Tecnical Review
                        </div>
                        <div className="text-muted" style={{ fontSize: '0.72rem' }}>
                          Engineering
                        </div>
                      </div>
                    </div>
                    <span
                      className="badge rounded-pill px-3 py-1 fw-semibold"
                      style={{ backgroundColor: '#10b981', color: '#ffffff', fontSize: '0.72rem' }}
                    >
                      Approved
                    </span>
                  </div>

                  {/* Review 3 */}
                  <div
                    className="d-flex align-items-center justify-content-between p-2 px-3 rounded-2 border"
                    style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div style={{ color: '#27b29b' }}>
                        <CheckSquare size={20} weight="fill" />
                      </div>
                      <div>
                        <div className="fw-bold text-dark" style={{ fontSize: '0.8rem' }}>
                          Final & Authorization
                        </div>
                        <div className="text-muted" style={{ fontSize: '0.72rem' }}>
                          Building Manager
                        </div>
                      </div>
                    </div>
                    <span
                      className="badge rounded-pill px-3 py-1 fw-semibold"
                      style={{ backgroundColor: '#10b981', color: '#ffffff', fontSize: '0.72rem' }}
                    >
                      Approved
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Milestone: Awaiting Early Inspection Schedule */}
            <div className="d-flex align-items-center gap-3 position-relative">
              {/* Left Timeline Column (Centered Icon) */}
              <div className="d-flex flex-column align-items-center position-relative flex-shrink-0" style={{ width: '24px' }}>
                <div style={{ color: '#27b29b', zIndex: 2, backgroundColor: '#ffffff' }}>
                  <CheckCircle size={22} weight="fill" />
                </div>
              </div>

              {/* Right Content */}
              <div className="flex-grow-1">
                <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.86rem' }}>
                  Awaiting Early Inspection Schedule
                </h6>
                <div className="text-secondary small" style={{ fontSize: '0.76rem' }}>
                  Tenant Relation
                </div>
              </div>
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
}
