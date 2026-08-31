import React from 'react';
import { House, CaretRight, ArrowCounterClockwise, XCircle } from '@phosphor-icons/react';
import { PermitHeaderCard } from '../components/PermitHeaderCard';
import { ApplicationProcessStepper } from '../components/ApplicationProcessStepper';
import { ActionRequiredAlert } from '../components/ActionRequiredAlert';
import { RequestInformationCard } from '../components/RequestInformationCard';
import { LocationInformationCard } from '../components/LocationInformationCard';
import { FitoutBillInformationCard } from '../components/FitoutBillInformationCard';
import { VendorInformationCard } from '../components/VendorInformationCard';
import { ManpowerDetailCard } from '../components/ManpowerDetailCard';
import { MaterialsEquipmentCard } from '../components/MaterialsEquipmentCard';
import { TechnicalSupportingDocsCard } from '../components/TechnicalSupportingDocsCard';
import { EarlyInspectionCard } from '../components/EarlyInspectionCard';
import { FitoutInformationCard } from '../components/FitoutInformationCard';
import { FitoutInspectionPassCard } from '../components/FitoutInspectionPassCard';
import { WorkPermitLetterCard } from '../components/WorkPermitLetterCard';
import { TrackingProgressCard } from '../components/TrackingProgressCard';
import { ScheduleInspectionModal } from '../components/ScheduleInspectionModal';
import { CompleteFitoutModal } from '../components/CompleteFitoutModal';
import { FitoutExtensionModal } from '../components/FitoutExtensionModal';
import { RejectedExtensionDetailModal } from '../components/RejectedExtensionDetailModal';
import { ExtensionHistoryCard } from '../components/ExtensionHistoryCard';

export function PermitDetailView({
  permit,
  isScheduleModalOpen,
  setIsScheduleModalOpen,
  isCompleteModalOpen,
  setIsCompleteModalOpen,
  isExtensionModalOpen,
  setIsExtensionModalOpen,
  activeScenario,
  engineeringRequest,
  scheduleData,
  onUpdateSchedule,
  onStepClick,
  onCompleteFitout,
  onSaveExtension,
  onRejectExtension,
  onPayExtensionBill,
  onSetScenario,
  onSimulateEngineeringRequest,
  billItems,
  totalBillAmount,
  extensionBill,
  extensionInfo,
  trackingLogs = [],
  extensionLogs = [],
  toastInfo,
  onCloseToast,
}) {
  const [isRejectedDetailOpen, setIsRejectedDetailOpen] = React.useState(false);
  return (
    <div className="p-3 p-md-4 w-100 flex-grow-1 position-relative">
      {/* Floating Toast Notification */}
      {toastInfo && (
        <div
          className="position-fixed end-0 top-0 m-4 shadow-lg rounded-3 border overflow-hidden transition-all"
          style={{
            zIndex: 1060,
            maxWidth: '380px',
            backgroundColor: '#ffffff',
            borderColor: '#e2e8f0',
            animation: 'fadeInDown 0.3s ease-out',
          }}
        >
          <div className="d-flex align-items-start gap-3 p-3">
            <div
              className={`rounded-circle p-2 d-flex align-items-center justify-content-center flex-shrink-0 ${
                toastInfo.type === 'success'
                  ? 'bg-success-subtle text-success'
                  : toastInfo.type === 'warning'
                  ? 'bg-warning-subtle text-warning-emphasis'
                  : toastInfo.type === 'danger'
                  ? 'bg-danger-subtle text-danger'
                  : 'bg-primary-subtle text-primary'
              }`}
              style={{ width: '36px', height: '36px' }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'currentColor',
                }}
              />
            </div>
            <div className="flex-grow-1">
              <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.88rem' }}>
                {toastInfo.title}
              </h6>
              <p className="text-secondary small mb-0" style={{ fontSize: '0.78rem', lineHeight: '1.4' }}>
                {toastInfo.message}
              </p>
            </div>
            <button
              type="button"
              className="btn-close small"
              onClick={onCloseToast}
              style={{ fontSize: '0.7rem' }}
            />
          </div>
        </div>
      )}

      {/* Breadcrumb Navigation & Testing Scenario Switcher */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
        <nav aria-label="breadcrumb">
          <div className="d-flex align-items-center gap-1 small fw-bold" style={{ color: '#27b29b', fontSize: '0.74rem', letterSpacing: '0.04em' }}>
            <House size={15} weight="fill" />
            <span className="cursor-pointer">FITOUT PERMITS</span>
            <CaretRight size={12} weight="bold" className="text-secondary" />
            <span className="text-secondary fw-semibold">PERMIT DETAIL (TENANT RELATION POV)</span>
          </div>
        </nav>

        {/* Interactive Scenario Switcher (Test Both Engineering Request & TR Direct Extension) */}
        {onSetScenario && (
          <div className="d-flex align-items-center gap-1.5 p-1 bg-white border rounded-pill shadow-xs" style={{ borderColor: '#e2e8f0' }}>
            <span className="text-muted small fw-semibold px-2" style={{ fontSize: '0.7rem' }}>
              Scenario:
            </span>
            <button
              type="button"
              className={`btn btn-sm py-1 px-2.5 rounded-pill fw-semibold transition-all ${
                activeScenario === 'ENGINEERING_REQUEST'
                  ? 'btn-warning text-dark'
                  : 'bg-white text-secondary border'
              }`}
              style={{ fontSize: '0.72rem' }}
              onClick={() => onSetScenario('ENGINEERING_REQUEST')}
              title="Scenario 1: Engineering submits extension request (reviewed by TR)"
            >
              1. Eng. Request (Default)
            </button>
            <button
              type="button"
              className={`btn btn-sm py-1 px-2.5 rounded-pill fw-bold transition-all shadow-xs ${
                activeScenario === 'TR_DIRECT'
                  ? 'bg-dark text-white'
                  : 'bg-white text-secondary border'
              }`}
              style={{ fontSize: '0.72rem' }}
              onClick={() => onSetScenario('TR_DIRECT')}
              title="Scenario 2: Tenant Relation issues direct extension"
            >
              2. TR Direct Extension
            </button>

            {onSimulateEngineeringRequest && (
              <button
                type="button"
                className="btn btn-sm py-1 px-2.5 rounded-pill fw-bold text-white transition-all shadow-xs"
                style={{
                  fontSize: '0.72rem',
                  backgroundColor: '#ea580c',
                  borderColor: '#ea580c',
                }}
                onClick={onSimulateEngineeringRequest}
                title="Click to simulate new extension request from Engineering"
              >
                + Request Extension (Eng)
              </button>
            )}
          </div>
        )}
      </div>

      {/* 1. Header Card (FIT OUT PERMIT, PRO/FP/082026/000104, Status Badge, Complete, Extension & Paid Buttons) */}
      <PermitHeaderCard
        permit={permit}
        engineeringRequest={engineeringRequest}
        onComplete={() => setIsCompleteModalOpen(true)}
        onOpenExtension={() => setIsExtensionModalOpen(true)}
        onPay={onPayExtensionBill}
      />

      {/* 2. Application Process Stepper (8 horizontal steps) */}
      <ApplicationProcessStepper
        steps={permit.steps}
        onStepClick={onStepClick}
      />

      {/* 3. Action Required Alert (TENANT RELATION: Review Engineering request or ON WORK) */}
      <ActionRequiredAlert actionRequired={permit.actionRequired} />

      {/* 3b. Informative Banner if Engineering Extension Request was Rejected (Red Theme) */}
      {engineeringRequest?.status === 'REJECTED' && (
        <div
          className="rounded-3 border mb-3 p-3 px-4 d-flex align-items-start justify-content-between flex-wrap gap-3"
          style={{ backgroundColor: '#fff5f5', borderColor: '#fca5a5' }}
        >
          <div className="d-flex align-items-start gap-3">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 mt-0.5"
              style={{ width: '32px', height: '32px', backgroundColor: '#fee2e2', color: '#dc2626' }}
            >
              <XCircle size={18} weight="bold" />
            </div>
            <div>
              <div className="d-flex align-items-center gap-2">
                <span className="fw-bold text-dark" style={{ fontSize: '0.88rem' }}>
                  Engineering Extension Request Rejected
                </span>
                <span
                  className="badge rounded-pill fw-bold"
                  style={{ backgroundColor: '#fee2e2', color: '#dc2626', fontSize: '0.68rem', padding: '0.25rem 0.6rem' }}
                >
                  REJECTED
                </span>
              </div>
              <div className="text-secondary small mt-1" style={{ fontSize: '0.78rem', lineHeight: '1.45' }}>
                Rejection Reason: <em>&ldquo;{engineeringRequest.rejectReason || 'Tolerance limit for unit renovation has been reached.'}&rdquo;</em>
              </div>
              <div className="text-muted small mt-1" style={{ fontSize: '0.74rem' }}>
                Active fitout schedule remains ending on <strong>10 Aug 2026</strong>. Tenant Relation can still issue a new extension using the <strong>Extension</strong> button above if a subsequent agreement is reached with the tenant.
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-sm fw-bold flex-shrink-0"
            style={{
              backgroundColor: '#ffffff',
              borderColor: '#fca5a5',
              color: '#dc2626',
              fontSize: '0.78rem',
              padding: '0.4rem 0.9rem',
              borderRadius: '0.4rem',
            }}
            onClick={() => setIsRejectedDetailOpen(true)}
            title="Review technical request from Engineering and TR rejection notes"
          >
            Review Request Details
          </button>
        </div>
      )}

      {/* 4. Main 2-Column Content Grid */}
      <div className="row g-3">
        {/* Left Column: REQUEST, LOCATION, EXTENSION INFO (if extended), BILL, VENDOR... */}
        <div className="col-12 col-lg-8">
          <RequestInformationCard permit={permit} />
          <LocationInformationCard
            unit={permit.unit}
            tower={permit.tower}
            floor={permit.floor}
          />
          {/* Unified Extension History Card (Displays requests, decisions, rejections, notes & bills) */}
          <ExtensionHistoryCard extensionLogs={extensionLogs} permit={permit} />
          {/* Initial Fitout Bill (Deposit & Supervisi - PAID) */}
          <FitoutBillInformationCard
            permitNumber={permit.permitNumber}
            items={billItems}
            totalAmount={totalBillAmount}
          />
          <VendorInformationCard />
          <ManpowerDetailCard />
          <MaterialsEquipmentCard />
          <TechnicalSupportingDocsCard />
          <EarlyInspectionCard />
        </div>

        {/* Right Column: FIT OUT INFORMATION, PASS, LETTER, TRACKING PROGRESS */}
        <div className="col-12 col-lg-4">
          <FitoutInformationCard permit={permit} />
          <FitoutInspectionPassCard />
          <WorkPermitLetterCard />
          <TrackingProgressCard trackingLogs={trackingLogs} />
        </div>
      </div>

      {/* 1. Schedule Inspection Modal */}
      <ScheduleInspectionModal
        show={isScheduleModalOpen}
        onHide={() => setIsScheduleModalOpen(false)}
        currentSchedule={scheduleData}
        onSave={onUpdateSchedule}
      />

      {/* 2. Complete Fitout Modal (Tenant Relation & Engineering Confirmation) */}
      <CompleteFitoutModal
        show={isCompleteModalOpen}
        onHide={() => setIsCompleteModalOpen(false)}
        onConfirm={onCompleteFitout}
      />

      {/* 3. Fitout Extension Modal (Tenant Relation Decision Panel: Review Engineering Request) */}
      <FitoutExtensionModal
        show={isExtensionModalOpen}
        onHide={() => setIsExtensionModalOpen(false)}
        currentStartDate={permit.scheduledStartDate}
        currentEndDate={permit.scheduledEndDate}
        engineeringRequest={engineeringRequest?.status === 'PENDING_TR_REVIEW' ? engineeringRequest : null}
        onSaveExtension={onSaveExtension}
        onRejectExtension={onRejectExtension}
      />

      {/* 4. Rejected Extension Detail Modal (Read-only review of rejected submission & TR reason) */}
      <RejectedExtensionDetailModal
        show={isRejectedDetailOpen}
        onHide={() => setIsRejectedDetailOpen(false)}
        engineeringRequest={engineeringRequest}
        currentStartDate={permit.scheduledStartDate}
        currentEndDate={permit.scheduledEndDate}
      />
    </div>
  );
}
