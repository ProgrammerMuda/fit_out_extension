/**
 * MODEL: PermitModel
 * Entity model for Fitout Permit details, application process steps, tenant details, and inspection records.
 */

export const PERMIT_STEPS = [
  { id: 'step-1', key: 'WAITING_APPROVAL', label: 'WAITING APPROVAL', icon: 'Clock', status: 'completed' },
  { id: 'step-2', key: 'EARLY_INSPECTION', label: 'EARLY INSPECTION', icon: 'MagnifyingGlass', status: 'completed' },
  { id: 'step-3', key: 'WAITING_PAYMENT', label: 'WAITING PAYMENT', icon: 'CreditCard', status: 'completed' },
  { id: 'step-4', key: 'APPROVED', label: 'APPROVED', icon: 'Check', status: 'completed' },
  { id: 'step-5', key: 'ON_WORK', label: 'ON WORK', icon: 'Hammer', status: 'active' },
  { id: 'step-6', key: 'FINAL_INSPECTION', label: 'FINAL INSPECTION', icon: 'MagnifyingGlass', status: 'pending' },
  { id: 'step-7', key: 'SETTLEMENT', label: 'SETTLEMENT', icon: 'Scales', status: 'pending' },
  { id: 'step-8', key: 'COMPLETED', label: 'COMPLETED', icon: 'CheckCircle', status: 'pending' },
];

export class PermitModel {
  constructor({
    permitNumber = 'PRO/FP/082026/000104',
    status = 'On Work',
    submissionDate = '04 Aug 2026, 08:06',
    unit = 'AG0311',
    tower = 'Tower G',
    floor = 'Lantai 3',
    tenantName = 'Tenant 10',
    tenantPhone = '0812512519124124',
    fitoutTitle = 'potong pipaa air',
    fitoutDescription = 'Pekerjaan pemotongan jalur pipa air bersih eksisting dan perapihan sambungan valve/fitting pipa baru di area pantry unit AG0311 untuk penyesuaian layout kitchen set.',
    workType = 'Repair',
    scheduledStartDate = '04 Aug 2026',
    scheduledEndDate = '10 Aug 2026',
    durationDays = 6,
    actionRequired = {
      role: 'TENANT RELATION / ENGINEERING',
      description: 'Verify work progress and confirm whether fitout renovation has been completed, as the scheduled work period ended on 10 Aug 2026.',
    },
    photos = [
      '/images/pipe_1.jpg',
      '/images/pipe_2.jpg',
      '/images/pipe_3.jpg',
    ],
    steps = PERMIT_STEPS,
  } = {}) {
    this.permitNumber = permitNumber;
    this.status = status;
    this.submissionDate = submissionDate;
    this.unit = unit;
    this.tower = tower;
    this.floor = floor;
    this.tenantName = tenantName;
    this.tenantPhone = tenantPhone;
    this.fitoutTitle = fitoutTitle;
    this.fitoutDescription = fitoutDescription;
    this.workType = workType;
    this.scheduledStartDate = scheduledStartDate;
    this.scheduledEndDate = scheduledEndDate;
    this.durationDays = durationDays;
    this.actionRequired = actionRequired;
    this.photos = photos;
    this.steps = steps;
  }
}
