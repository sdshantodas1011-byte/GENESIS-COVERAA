export type CoverType = 'Lab Report' | 'Assignment' | 'Project Report';

export type DesignId =
  | 'dna-divider-classic'
  | 'molecular-corner-medallions'
  | 'teal-wave-modern'
  | 'emerald-hex-frame'
  | 'executive-editorial-stripe'
  | 'diagonal-teal-cards'
  | 'navy-crimson-minimal'
  | 'maroon-gold-dna-ornate'
  | 'aqua-glass-ribbon'
  | 'navy-gold-diagonal-sash'
  | 'forest-green-double-frame'
  | 'classic-serif-pure'
  | 'bio-helix-labware-v2'
  | 'circuit-microscope-pipette'
  | 'royal-teal-gold-ornate';

export interface CoverFormData {
  session: string;
  courseCode: string;
  courseName: string;
  coverType: CoverType;

  studentName: string;
  registrationNo: string;
  group: string;
  semester: string;
  studentSession: string;
  department: string;

  teacherName: string;
  teacherDesignation: string;
  teacherDepartment: string;
  universityName: string;

  experimentNo: string;
  experimentName: string;
  experimentDate: string;
  reportSubmissionDate: string;

  assignmentName: string;
  assignmentDate: string;
  assignmentSubmissionDate: string;

  designId: DesignId;
}
