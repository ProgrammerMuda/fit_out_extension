import { useState } from 'react';
import { PermitModel } from '../models/PermitModel';

export function usePermitController() {
  const [activeScenario, setActiveScenario] = useState('ENGINEERING_REQUEST'); // 'ENGINEERING_REQUEST' or 'TR_DIRECT'

  // Pending Extension Request originating from Engineering
  const [engineeringRequest, setEngineeringRequest] = useState({
    id: 'REQ-EXT-082026-001',
    requestedBy: 'Budi Santoso (Engineering Lead 01)',
    requestedAt: '10 Aug 2026, 14:30',
    currentEndDate: '10 Aug 2026',
    requestedEndDate: '13 Aug 2026',
    requestedDays: 3,
    technicalReason:
      'Ditemukan kendala kebocoran pada pipa induk sambungan PVC saat uji tekan hidrolik di area pantry. Diperlukan waktu pembongkaran sambungan dan masa pengeringan (curing) lem sealant bertekanan selama minimal 3 hari kerja sebelum inspeksi kelayakan ulang.',
    photos: ['/images/pipe_1.jpg', '/images/pipe_2.jpg', '/images/pipe_3.jpg'],
    status: 'PENDING_TR_REVIEW',
  });

  const [permit, setPermit] = useState(
    () =>
      new PermitModel({
        status: 'On Work',
        actionRequired: {
          role: 'TENANT RELATION',
          description:
            'Engineering Lead (Budi Santoso) submitted a schedule extension request for +3 Days (until 13 Aug 2026) due to pipe curing requirements. Please review the technical reason and determine the fee policy (Free / Chargeable).',
        },
      })
  );

  const [activeMenu, setActiveMenu] = useState('Fitout Permit');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchMenuQuery, setSearchMenuQuery] = useState('');

  // Modals state
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isExtensionModalOpen, setIsExtensionModalOpen] = useState(false);

  // Toast Notification state
  const [toastInfo, setToastInfo] = useState(null);

  // Dynamic bills list (Fitout Deposit & Initial Supervision - kept separate)
  const [billItems, setBillItems] = useState([
    {
      name: 'Deposit 2026',
      description: 'Deposit 2026 for Fit Out Permit #PRO/FP/082026/000104',
      amount: 'Rp 2.000.000,00',
    },
    {
      name: 'Supervisi 2026',
      description: 'Supervisi 2026 for Fit Out Permit #PRO/FP/082026/000104',
      amount: 'Rp 200.000,00',
    },
  ]);
  const [totalBillAmount, setTotalBillAmount] = useState('Rp 2.200.000,00');

  // Separate Extension Bill State
  const [extensionBill, setExtensionBill] = useState(null);

  // Extension Information State (for both Free and Chargeable)
  const [extensionInfo, setExtensionInfo] = useState(null);

  // Dynamic tracking timeline items
  const [trackingLogs, setTrackingLogs] = useState([
    {
      title: 'Schedule Extension Requested by Engineering Lead (+3 Days)',
      actor: 'Budi Santoso (Engineering Lead 01)',
      time: '10/08/2026, 14:30',
      note: 'Reason: Ditemukan kebocoran sambungan pipa PVC area pantry saat uji hidrolik. Membutuhkan waktu curing sealant lem 3 hari kerja.',
    },
    {
      title: 'Fitout Work In Progress (On Work)',
      actor: 'System / Engineering Lead',
      time: '04/08/2026, 08:30',
      note: 'Fitout started on site by Vendor CV Bintang Teknik.',
    },
  ]);

  const [scheduleData, setScheduleData] = useState({
    inspectionDate: '2026-08-16',
    inspectionTime: '10:00',
    inspectorName: 'Engineering Lead 01',
    notes: 'Mohon pastikan unit siap dan sumber air utama dimatikan sementara.',
  });

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const updateSchedule = (newSchedule) => {
    setScheduleData(newSchedule);
    setIsScheduleModalOpen(false);
  };

  const advanceStep = (stepIndex) => {
    setPermit((prev) => {
      const newSteps = prev.steps.map((step, idx) => {
        if (idx < stepIndex) return { ...step, status: 'completed' };
        if (idx === stepIndex) return { ...step, status: 'active' };
        return { ...step, status: 'pending' };
      });
      return new PermitModel({
        ...prev,
        status: newSteps[stepIndex].label,
        steps: newSteps,
      });
    });
  };

  // Complete Fitout Action (Moves to Final Inspection)
  const handleCompleteFitout = ({ notes }) => {
    advanceStep(5); // Step 6: FINAL INSPECTION
    setToastInfo({
      show: true,
      type: 'success',
      title: 'Fitout Completed',
      message: 'Fitout marked as complete and advanced to Final Inspection.',
    });
  };

  // Save Extension Action (Supports both: from Engineering Request OR Direct TR Extension)
  const handleSaveExtension = ({
    newEndDateStr = '13 Aug 2026',
    additionalDays = 3,
    extensionType = 'chargeable',
    freeReason = '',
    totalCharge = 0,
    notes = '',
    fromEngineeringRequest = false,
    engineeringRequestDetails = null,
  }) => {
    const isChargeable = extensionType === 'chargeable' && totalCharge > 0;
    const formattedCharge = isChargeable
      ? `Rp ${new Intl.NumberFormat('id-ID').format(totalCharge)},00`
      : 'Rp 0,00';
    const nowStr = '10/08/2026, 03:55 PM';

    const decisionNotes = notes?.trim() || '';
    const cleanFreeReason = freeReason?.trim() || '';
    const hasEngReq = fromEngineeringRequest || (engineeringRequest && engineeringRequest.status === 'PENDING_TR_REVIEW');

    // Mark engineering request as approved if applicable
    if (hasEngReq) {
      setEngineeringRequest((prev) => (prev ? { ...prev, status: 'APPROVED' } : null));
    }

    setPermit((prev) => {
      return new PermitModel({
        ...prev,
        status: isChargeable ? 'Waiting Payment' : 'On Work',
        scheduledEndDate: newEndDateStr,
        durationDays: 6 + additionalDays,
        isExtended: true,
        extensionDays: additionalDays,
        extensionType,
        extensionNotes: decisionNotes,
        actionRequired: isChargeable
          ? {
              role: 'TENANT / FINANCE',
              description: `Waiting for tenant to pay Fit Out Extension Fee of ${formattedCharge} for schedule extension (+${additionalDays} days until ${newEndDateStr}).`,
            }
          : {
              role: 'TENANT RELATION / ENGINEERING',
              description: `Fitout period extended to ${newEndDateStr} (+${additionalDays} days, FREE TOLERANCE). Active renovation in progress.`,
            },
      });
    });

    // Store Extension Details (Free or Chargeable)
    setExtensionInfo({
      previousEndDate: '10 Aug 2026',
      newEndDate: newEndDateStr,
      additionalDays,
      extensionType,
      freeReason: cleanFreeReason,
      totalCharge: formattedCharge,
      approvedBy: 'Tenant Relation Lead - Management',
      approvedAt: nowStr,
      notes: decisionNotes,
      fromEngineeringRequest: hasEngReq,
      engineeringRequestDetails: hasEngReq ? (engineeringRequestDetails || engineeringRequest) : null,
      invoiceNumber: 'PRO/INV/082026/000032',
      billDate: '10/08/2026, 03:55 PM',
      dueDate: '11/08/2026, 11:59 PM',
      isPaid: false,
    });

    // If chargeable, create dedicated separate Extension Bill card
    if (isChargeable) {
      setExtensionBill({
        invoiceNumber: 'PRO/INV/082026/000032',
        billDate: '10/08/2026, 03:55 PM',
        dueDate: '11/08/2026, 11:59 PM',
        additionalDays,
        endDate: newEndDateStr,
        amount: formattedCharge,
        isPaid: false,
      });
    } else {
      setExtensionBill(null);
    }

    // Add Timeline Activity Log
    setTrackingLogs((prev) => [
      {
        title: hasEngReq
          ? isChargeable
            ? `Engineering Extension Approved - Waiting for Payment (+${additionalDays} Days)`
            : `Engineering Extension Approved - Free Tolerance (+${additionalDays} Days)`
          : isChargeable
          ? `Direct Extension by TR - Waiting for Payment (+${additionalDays} Days)`
          : `Direct Extension by TR - Free Tolerance (+${additionalDays} Days)`,
        actor: 'Tenant Relation Lead - Management',
        time: nowStr,
        type: extensionType === 'chargeable' ? 'chargeable' : 'free',
        notes: isChargeable
          ? `Decision: Approved as Chargeable (+${additionalDays} Days until ${newEndDateStr}). Extension invoice #PRO/INV/082026/000032 issued (${formattedCharge}). ${decisionNotes ? `Notes: ${decisionNotes}` : ''}`
          : `Decision: Approved as Free Exemption (+${additionalDays} Days until ${newEndDateStr}). Reason: ${cleanFreeReason}. ${decisionNotes ? `Notes: ${decisionNotes}` : ''}`,
      },
      ...prev,
    ]);

    // Show Toast
    setToastInfo({
      show: true,
      type: isChargeable ? 'warning' : 'success',
      title: isChargeable ? 'Extension Submitted - Invoice Issued' : 'Extension Approved (Free)',
      message: isChargeable
        ? `Permit status changed to Waiting Payment. Invoice PRO/INV/082026/000032 (${formattedCharge}) issued.`
        : `Schedule extended by +${additionalDays} days until ${newEndDateStr} (FREE of charge).`,
    });
  };

  // Reject Extension Request Action
  const handleRejectExtension = ({ rejectReason }) => {
    const nowStr = '10/08/2026, 03:55 PM';
    const cleanReason = rejectReason?.trim() || 'Permohonan perpanjangan jadwal tidak disetujui karena melebihi batas toleransi pengerjaan.';

    if (engineeringRequest) {
      setEngineeringRequest((prev) => (prev ? { ...prev, status: 'REJECTED', rejectReason: cleanReason } : null));
    }

    setPermit((prev) => {
      return new PermitModel({
        ...prev,
        status: 'On Work',
        actionRequired: {
          role: 'TENANT RELATION / ENGINEERING',
          description: `Engineering extension request rejected (${cleanReason}). Renovation remains scheduled until ${prev.scheduledEndDate}. TR can still issue a new extension if negotiated with tenant.`,
        },
      });
    });

    // Add Timeline Activity Log
    setTrackingLogs((prev) => [
      {
        title: 'Engineering Extension Request Rejected by Tenant Relation',
        actor: 'Tenant Relation Lead - Management',
        time: nowStr,
        type: 'rejected',
        notes: `Rejection reason: ${cleanReason}`,
      },
      ...prev,
    ]);

    // Show Toast
    setToastInfo({
      show: true,
      type: 'warning',
      title: 'Extension Request Rejected',
      message: 'Extension request rejected. Status remains On Work. TR can still issue a new extension or complete fitout.',
    });
  };

  // Pay Extension Bill Action (Testing Flow to settle bill and return to On Work)
  const handlePayExtensionBill = () => {
    const paidTimeStr = '10/08/2026, 04:05 PM';

    setPermit((prev) => {
      return new PermitModel({
        ...prev,
        status: 'On Work',
        actionRequired: {
          role: 'TENANT RELATION / ENGINEERING',
          description: `Fitout renovation active in progress with extended schedule until ${prev.scheduledEndDate} (+${prev.extensionDays || 3} days). Monitor site progress and safety compliance.`,
        },
      });
    });

    setExtensionInfo((prev) =>
      prev
        ? {
            ...prev,
            isPaid: true,
            paidAt: paidTimeStr,
          }
        : null
    );

    setExtensionBill((prev) =>
      prev
        ? {
            ...prev,
            isPaid: true,
            paidAt: paidTimeStr,
          }
        : null
    );

    setTrackingLogs((prev) => [
      {
        title: 'Fit Out Extension Fee Paid & Settled (Invoice #PRO/INV/082026/000032)',
        actor: 'Tenant - PT Mega Kreasi Abadi',
        time: paidTimeStr,
        note: 'Payment received successfully via Bank Transfer BCA. Work permit active on work.',
      },
      ...prev,
    ]);

    setToastInfo({
      show: true,
      type: 'success',
      title: 'Payment Confirmed',
      message: 'Extension invoice #PRO/INV/082026/000032 marked as PAID. Permit status updated to On Work.',
    });
  };

  // Switch Scenario between: 'ENGINEERING_REQUEST' and 'TR_DIRECT'
  const handleSetScenario = (scenarioKey) => {
    setActiveScenario(scenarioKey);

    if (scenarioKey === 'ENGINEERING_REQUEST') {
      setEngineeringRequest({
        id: 'REQ-EXT-082026-001',
        requestedBy: 'Budi Santoso (Engineering Lead 01)',
        requestedAt: '10 Aug 2026, 14:30',
        currentEndDate: '10 Aug 2026',
        requestedEndDate: '13 Aug 2026',
        requestedDays: 3,
        technicalReason:
          'Ditemukan kendala kebocoran pada pipa induk sambungan PVC saat uji tekan hidrolik di area pantry. Diperlukan waktu pembongkaran sambungan dan masa pengeringan (curing) lem sealant bertekanan selama minimal 3 hari kerja sebelum inspeksi kelayakan ulang.',
        photos: ['/images/pipe_1.jpg', '/images/pipe_2.jpg', '/images/pipe_3.jpg'],
        status: 'PENDING_TR_REVIEW',
      });

      setPermit(
        new PermitModel({
          status: 'On Work',
          scheduledEndDate: '10 Aug 2026',
          durationDays: 6,
          isExtended: false,
          actionRequired: {
            role: 'TENANT RELATION',
            description:
              'Engineering Lead (Budi Santoso) submitted a schedule extension request for +3 Days (until 13 Aug 2026) due to pipe curing requirements. Please review the technical reason and determine the fee policy (Free / Chargeable).',
          },
        })
      );

      setExtensionInfo(null);
      setExtensionBill(null);

      setToastInfo({
        show: true,
        type: 'info',
        title: 'Skenario 1: Engineering Request Pending',
        message: 'Terdapat permohonan perpanjangan waktu dari Engineering yang menunggu keputusan TR.',
      });
    } else {
      // Scenario 2: Direct Extension by TR (Manual)
      setEngineeringRequest(null);

      setPermit(
        new PermitModel({
          status: 'On Work',
          scheduledEndDate: '10 Aug 2026',
          durationDays: 6,
          isExtended: false,
          actionRequired: {
            role: 'TENANT RELATION / ENGINEERING',
            description:
              'Verify work progress and confirm whether fitout renovation has been completed, as the scheduled work period ended on 10 Aug 2026.',
          },
        })
      );

      setExtensionInfo(null);
      setExtensionBill(null);

      setToastInfo({
        show: true,
        type: 'info',
        title: 'Skenario 2: TR Direct Extension',
        message: 'TR dapat langsung menambah extension secara mandiri melalui tombol Extension.',
      });
    }
  };

  return {
    permit,
    activeMenu,
    setActiveMenu,
    sidebarOpen,
    toggleSidebar,
    searchMenuQuery,
    setSearchMenuQuery,
    isScheduleModalOpen,
    setIsScheduleModalOpen,
    isCompleteModalOpen,
    setIsCompleteModalOpen,
    isExtensionModalOpen,
    setIsExtensionModalOpen,
    activeScenario,
    engineeringRequest,
    scheduleData,
    updateSchedule,
    advanceStep,
    handleCompleteFitout,
    handleSaveExtension,
    handleRejectExtension,
    handlePayExtensionBill,
    handleSetScenario,
    billItems,
    totalBillAmount,
    extensionBill,
    extensionInfo,
    trackingLogs,
    toastInfo,
    setToastInfo,
  };
}
