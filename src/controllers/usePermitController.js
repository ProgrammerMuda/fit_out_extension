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
      'Leakage detected on main PVC pipe connection during hydraulic pressure test in pantry area. Requires joint dismantling and pressurized sealant adhesive curing period for at least 3 working days prior to re-inspection feasibility.',
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

  // Dynamic tracking timeline items (Clean general permit workflow milestones)
  const [trackingLogs, setTrackingLogs] = useState([
    {
      title: 'Fitout Work In Progress (On Work)',
      actor: 'System / Engineering Lead',
      time: '04/08/2026, 08:30 AM',
      type: 'standard',
      notes: 'Fitout started on site by Vendor CV Bintang Teknik.',
    },
  ]);

  // Dedicated Extension Logs State (Tracks all Extension requests, approvals, and rejections)
  const [extensionLogs, setExtensionLogs] = useState([
    {
      id: 'EXT-LOG-002',
      title: 'Extension Request #2',
      requestedBy: 'Budi Santoso (Engineering Lead 01)',
      requestedAt: '10/08/2026, 02:30 PM',
      requestedDays: 3,
      targetDate: '13 Aug 2026',
      status: 'PENDING_TR_REVIEW',
      requestReason:
        'Leakage detected on main PVC pipe connection during hydraulic pressure test in pantry area. Requires joint dismantling and pressurized sealant adhesive curing period for at least 3 working days prior to re-inspection feasibility.',
      photos: ['/images/pipe_1.jpg', '/images/pipe_2.jpg', '/images/pipe_3.jpg'],
    },
    {
      id: 'EXT-LOG-001',
      title: 'Extension Request #1',
      requestedBy: 'Budi Santoso (Engineering Lead 01)',
      requestedAt: '08/08/2026, 11:20 AM',
      requestedDays: 2,
      targetDate: '12 Aug 2026',
      status: 'REJECTED',
      requestReason:
        'Installation of bathroom wall tiles delayed due to supply chain shipment constraints of tile adhesive from manufacturer.',
      photos: ['/images/pipe_2.jpg'],
      decidedBy: 'Tenant Relation Lead - Management',
      decidedAt: '08/08/2026, 03:40 PM',
      decisionReason:
        'The requested +2 days extension is not approved as unit renovation schedule remains within initial grace tolerance. Contractor is requested to optimize remaining work hours and augment manpower.',
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

    // Update Engineering Request Status to Approved
    if (engineeringRequest) {
      setEngineeringRequest((prev) =>
        prev ? { ...prev, status: isChargeable ? 'APPROVED_CHARGEABLE' : 'APPROVED_FREE' } : null
      );
    }

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

    // Update Dedicated Extension History Logs (Approved Entry or New Request)
    setExtensionLogs((prev) => {
      const existingPending = prev.find((item) => item.status === 'PENDING_TR_REVIEW');

      if (existingPending) {
        // Approving existing pending request (e.g. Extension Request #2)
        return prev.map((item) => {
          if (item.id === existingPending.id) {
            return {
              ...item,
              status: isChargeable ? 'APPROVED_CHARGEABLE' : 'APPROVED_FREE',
              feeType: extensionType,
              feeAmount: isChargeable ? totalCharge : 0,
              totalCharge: formattedCharge,
              invoiceNumber: isChargeable ? 'PRO/INV/082026/000032' : null,
              billDate: isChargeable ? '10/08/2026, 03:55 PM' : null,
              dueDate: isChargeable ? '11/08/2026, 11:59 PM' : null,
              isPaid: false,
              decidedBy: 'Tenant Relation Lead - Management',
              decidedAt: nowStr,
              decisionReason:
                extensionType === 'free'
                  ? cleanFreeReason
                  : (decisionNotes || 'Supervision fee applied.'),
              targetDate: newEndDateStr,
              requestedDays: additionalDays,
            };
          }
          return item;
        });
      } else {
        // TR issues an extension directly (no pending request) -> creates Extension Request #3, #4, etc.!
        const nextNum = prev.length + 1;
        const newInvoiceNum = `PRO/INV/082026/00003${nextNum}`;
        const newEntry = {
          id: `EXT-LOG-${Date.now().toString().slice(-3)}`,
          title: `Extension Request #${nextNum}`,
          requestedBy: 'Tenant Relation (Direct)',
          requestedAt: nowStr,
          requestedDays: additionalDays,
          targetDate: newEndDateStr,
          status: isChargeable ? 'APPROVED_CHARGEABLE' : 'APPROVED_FREE',
          feeType: extensionType,
          feeAmount: isChargeable ? totalCharge : 0,
          totalCharge: formattedCharge,
          invoiceNumber: isChargeable ? newInvoiceNum : null,
          billDate: isChargeable ? nowStr : null,
          dueDate: isChargeable ? '12/08/2026, 11:59 PM' : null,
          isPaid: false,
          requestReason:
            decisionNotes || 'Direct schedule extension issued by Tenant Relation for unit completion.',
          photos: [],
          decidedBy: 'Tenant Relation Lead - Management',
          decidedAt: nowStr,
          decisionReason:
            extensionType === 'free'
              ? cleanFreeReason
              : (decisionNotes || 'Supervision fee applied.'),
        };
        return [newEntry, ...prev];
      }
    });

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
    const cleanReason =
      rejectReason?.trim() ||
      'Schedule extension request not approved as renovation duration exceeds permitted tolerance limit.';

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

    // Update Dedicated Extension History Logs (Mark Pending as REJECTED)
    setExtensionLogs((prev) => {
      let found = false;
      const updated = prev.map((item) => {
        if (item.status === 'PENDING_TR_REVIEW') {
          found = true;
          return {
            ...item,
            status: 'REJECTED',
            decidedBy: 'Tenant Relation Lead - Management',
            decidedAt: nowStr,
            decisionReason: cleanReason,
          };
        }
        return item;
      });

      if (!found) {
        return [
          {
            id: `EXT-LOG-${Date.now().toString().slice(-3)}`,
            title: 'Extension Request',
            requestedBy: 'Budi Santoso (Engineering Lead 01)',
            requestedAt: '10/08/2026, 02:30 PM',
            requestedDays: 3,
            targetDate: '13 Aug 2026',
            status: 'REJECTED',
            requestReason:
              'Ditemukan kendala kebocoran pipa induk sambungan PVC saat uji tekan hidrolik di area pantry.',
            photos: ['/images/pipe_1.jpg', '/images/pipe_2.jpg', '/images/pipe_3.jpg'],
            decidedBy: 'Tenant Relation Lead - Management',
            decidedAt: nowStr,
            decisionReason: cleanReason,
          },
          ...prev,
        ];
      }
      return updated;
    });

    // Show Toast
    setToastInfo({
      show: true,
      type: 'warning',
      title: 'Extension Request Rejected',
      message: 'Extension request rejected. Status remains On Work. Record added to Extension History card.',
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

    setExtensionLogs((prev) =>
      prev.map((item) => {
        if (item.status === 'APPROVED_CHARGEABLE' && !item.isPaid) {
          return {
            ...item,
            isPaid: true,
            paidAt: paidTimeStr,
          };
        }
        return item;
      })
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

  // Simulate a New Engineering Request (allows testing request -> reject cycle repeatedly)
  const handleSimulateEngineeringRequest = () => {
    setActiveScenario('ENGINEERING_REQUEST');
    setEngineeringRequest({
      id: 'REQ-EXT-082026-002',
      requestedBy: 'Budi Santoso (Engineering Lead 01)',
      requestedAt: '10 Aug 2026, 15:45',
      currentEndDate: '10 Aug 2026',
      requestedEndDate: '14 Aug 2026',
      requestedDays: 4,
      technicalReason:
        'Ditemukan kendala teknis lanjutan pada instalasi kelistrikan jalur panel utama di area unit. Membutuhkan waktu perbaikan kabel dan tes beban selama 4 hari kerja sebelum inspeksi serah terima.',
      photos: ['/images/pipe_1.jpg', '/images/pipe_2.jpg', '/images/pipe_3.jpg'],
      status: 'PENDING_TR_REVIEW',
    });

    setPermit((prev) =>
      new PermitModel({
        ...prev,
        status: 'On Work',
        scheduledEndDate: '10 Aug 2026',
        isExtended: false,
        actionRequired: {
          role: 'TENANT RELATION',
          description:
            'Engineering Lead (Budi Santoso) submitted a schedule extension request (+4 Days until 14 Aug 2026) due to electrical panel testing. Please review and decide (Approve / Reject).',
        },
      })
    );

    setExtensionInfo(null);
    setExtensionBill(null);

    // Add to Dedicated Extension History
    setExtensionLogs((prev) => [
      {
        id: `EXT-LOG-${Date.now().toString().slice(-3)}`,
        title: `Extension Request #${prev.length + 1}`,
        requestedBy: 'Budi Santoso (Engineering Lead 01)',
        requestedAt: '10/08/2026, 04:00 PM',
        requestedDays: 4,
        targetDate: '14 Aug 2026',
        status: 'PENDING_TR_REVIEW',
        requestReason:
          'Secondary technical issue detected on main electrical distribution board wiring. Requires cable rectification and load testing over 4 working days prior to handover inspection.',
        photos: ['/images/pipe_1.jpg', '/images/pipe_2.jpg', '/images/pipe_3.jpg'],
      },
      ...prev.filter((item) => item.status !== 'PENDING_TR_REVIEW'),
    ]);

    setToastInfo({
      show: true,
      type: 'info',
      title: 'New Engineering Request Active',
      message: 'New extension request from Engineering is ready for Tenant Relation review.',
    });
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
    handleSimulateEngineeringRequest,
    billItems,
    totalBillAmount,
    extensionBill,
    extensionInfo,
    trackingLogs,
    extensionLogs,
    toastInfo,
    setToastInfo,
  };
}
