import React from 'react';
import {
  Clock,
  MagnifyingGlass,
  CreditCard,
  Check,
  Hammer,
  Scales,
  CheckCircle,
  Info,
} from '@phosphor-icons/react';

export function ApplicationProcessStepper({ steps, onStepClick }) {
  const getIcon = (iconName, size = 16) => {
    switch (iconName) {
      case 'Clock':
        return <Clock size={size} weight="bold" />;
      case 'CreditCard':
        return <CreditCard size={size} weight="bold" />;
      case 'Check':
        return <Check size={size} weight="bold" />;
      case 'Hammer':
        return <Hammer size={size} weight="bold" />;
      case 'Scales':
        return <Scales size={size} weight="bold" />;
      case 'CheckCircle':
        return <CheckCircle size={size} weight="bold" />;
      case 'MagnifyingGlass':
      default:
        return <MagnifyingGlass size={size} weight="bold" />;
    }
  };

  return (
    <div className="proa-card overflow-hidden mb-3">
      {/* Light Gray Card Header (Clean Minimalist & Centered) */}
      <div
        className="p-3 px-4 d-flex align-items-center gap-2 border-bottom"
        style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}
      >
        <div className="d-flex align-items-center flex-shrink-0" style={{ color: '#27b29b' }}>
          <Info size={21} weight="bold" />
        </div>
        <span
          className="fw-bold text-dark text-uppercase"
          style={{ letterSpacing: '0.04em', fontSize: '0.84rem', lineHeight: 1 }}
        >
          STATUS PROCESS
        </span>
      </div>

      {/* Stepper Timeline Body */}
      <div className="p-4">
        <div className="stepper-container">
          {steps.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isActive = step.status === 'active';
            const isLineActive = isCompleted || isActive;

            return (
              <div
                key={step.id}
                className="stepper-item cursor-pointer"
                onClick={() => onStepClick && onStepClick(idx)}
                style={{ cursor: 'pointer' }}
                title={`Klik untuk ubah status ke: ${step.label}`}
              >
                {/* Connector line from previous step to this step */}
                {idx > 0 && (
                  <div
                    className={`stepper-connector ${isLineActive ? 'completed' : ''}`}
                  />
                )}

                {/* Circle Icon */}
                <div
                  className={`stepper-circle ${
                    isCompleted ? 'completed' : isActive ? 'active' : ''
                  }`}
                >
                  {getIcon(step.icon, 16)}
                </div>

                {/* Label */}
                <span
                  className={`stepper-label ${
                    isCompleted ? 'completed' : isActive ? 'active' : ''
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
