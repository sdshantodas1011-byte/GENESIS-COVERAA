import React, {useEffect, useMemo, useRef, useState} from 'react';
import {toPng} from 'html-to-image';
import {jsPDF} from 'jspdf';
import {AnimatePresence, motion} from 'motion/react';
import {
  ArrowDown,
  Check,
  Download,
  FileImage,
  Loader2,
  Lock,
  Maximize2,
  Moon,
  Printer,
  RotateCcw,
  Sun,
} from 'lucide-react';
import {CoverDesignSheet, DESIGN_LIST} from './components/CoverDesigns';
import {ComboboxOption, SmartCombobox} from './components/SmartCombobox';
import {
  EXPERIMENT_NUMBERS,
  GEB_COURSES,
  GEB_STUDENTS,
  GEB_TEACHERS,
  GROUP_OPTIONS,
} from './data/gebBatchData';
import {CoverFormData, CoverType, DesignId} from './types/cover';

const STORAGE_KEY = 'genesis_studio_form_v3';
const THEME_STORAGE_KEY = 'genesis_studio_theme_v2';

type StudioTheme = 'light' | 'dark';

const LOCKED_CONSTANTS = {
  session: '2025-2026',
  studentSession: '2025-2026',
  semester: '1st Year, 2nd Semester',
  department: 'Genetic Engineering and Biotechnology',
  universityName: 'Shahjalal University of Science and Technology',
} as const;

const INITIAL_FORM_DATA: CoverFormData = {
  ...LOCKED_CONSTANTS,
  courseCode: '',
  courseName: '',
  coverType: 'Lab Report',

  studentName: '',
  registrationNo: '',
  group: '',

  teacherName: '',
  teacherDesignation: 'Professor',
  teacherDepartment: 'Department of Genetic Engineering and Biotechnology',

  experimentNo: '',
  experimentName: '',
  experimentDate: '',
  reportSubmissionDate: '',

  assignmentName: '',
  assignmentDate: '',
  assignmentSubmissionDate: '',

  designId: 'dna-divider-classic',
};

const VALID_DESIGN_IDS = new Set<DesignId>(DESIGN_LIST.map((d) => d.id));

const TEACHER_DESIGNATIONS = [
  'Professor',
  'Professor & Head',
  'Associate Professor',
  'Assistant Professor',
  'Lecturer',
];

function loadInitialForm(): CoverFormData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_FORM_DATA;
    const parsed = JSON.parse(raw) as Partial<CoverFormData>;
    const safeDesignId =
      parsed.designId && VALID_DESIGN_IDS.has(parsed.designId)
        ? parsed.designId
        : INITIAL_FORM_DATA.designId;
    return {
      ...INITIAL_FORM_DATA,
      ...parsed,
      designId: safeDesignId,
      ...LOCKED_CONSTANTS,
    };
  } catch {
    return INITIAL_FORM_DATA;
  }
}

function loadInitialTheme(): StudioTheme {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark';
  } catch {
    return 'dark';
  }
}

function buildFilename(data: CoverFormData, ext: 'pdf' | 'png'): string {
  const code = (data.courseCode || 'GENESIS').replace(/[^a-zA-Z0-9]+/g, '_');
  const type = data.coverType.replace(/[^a-zA-Z0-9]+/g, '_');
  const reg = data.registrationNo ? `_${data.registrationNo.replace(/[^a-zA-Z0-9]+/g, '')}` : '';
  return `${code}_${type}${reg}.${ext}`;
}

const inputClass =
  'w-full rounded-lg border border-[var(--studio-border)] bg-[var(--studio-input)] px-3.5 py-2.5 text-sm text-[var(--studio-text)] placeholder:text-[var(--studio-subtle)] transition-all focus:border-[var(--studio-accent)] focus:bg-[var(--studio-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--studio-accent-soft)]';

const lockedInputClass =
  'w-full rounded-lg border border-[var(--studio-border)] bg-[var(--studio-elevated)] pl-3.5 pr-9 py-2.5 text-sm text-[var(--studio-muted)] cursor-not-allowed select-none';

const labelClass = 'block text-xs font-semibold text-[var(--studio-muted)] mb-1.5';

export default function App() {
  const [formData, setFormData] = useState<CoverFormData>(loadInitialForm);
  const [theme, setTheme] = useState<StudioTheme>(loadInitialTheme);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [fitWidth, setFitWidth] = useState<number>(640);
  const [zoomPreset, setZoomPreset] = useState<'fit' | 0.75 | 0.95>('fit');
  const [darkMat, setDarkMat] = useState<boolean>(true);

  const exportRef = useRef<HTMLDivElement | null>(null);
  const previewContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage quota errors
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({...formData, ...LOCKED_CONSTANTS})
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [formData]);

  useEffect(() => {
    const el = previewContainerRef.current;
    if (!el) return;
    const updateSize = () => {
      const available = Math.max(280, Math.min(el.clientWidth - 48, 740));
      setFitWidth(available);
    };
    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const updateField = <K extends keyof CoverFormData>(key: K, value: CoverFormData[K]) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
      ...LOCKED_CONSTANTS,
    }));
  };

  const courseNameOptions: ComboboxOption[] = useMemo(
    () =>
      GEB_COURSES.map((c) => ({
        value: c.title,
        primary: c.title,
        secondary: c.code,
        searchText: c.code,
      })),
    []
  );

  const courseCodeOptions: ComboboxOption[] = useMemo(
    () =>
      GEB_COURSES.map((c) => ({
        value: c.code,
        primary: c.code,
        secondary: c.title,
        searchText: c.title,
      })),
    []
  );

  const studentNameOptions: ComboboxOption[] = useMemo(
    () =>
      GEB_STUDENTS.map((s) => ({
        value: s.name,
        primary: s.name,
        secondary: s.regNo,
        searchText: s.regNo,
      })),
    []
  );

  const studentRegOptions: ComboboxOption[] = useMemo(
    () =>
      GEB_STUDENTS.map((s) => ({
        value: s.regNo,
        primary: s.regNo,
        secondary: s.name,
        searchText: s.name,
      })),
    []
  );

  const experimentNoOptions: ComboboxOption[] = useMemo(
    () =>
      EXPERIMENT_NUMBERS.map((num) => ({
        value: num,
        primary: num,
        secondary: `Experiment ${Number(num)}`,
        searchText: `${Number(num)} ${num}`,
      })),
    []
  );

  const teacherNameOptions: ComboboxOption[] = useMemo(
    () =>
      GEB_TEACHERS.map((t) => ({
        value: t.name,
        primary: t.name,
        secondary: t.designation,
        searchText: t.designation,
      })),
    []
  );

  const groupOptions: ComboboxOption[] = useMemo(
    () =>
      GROUP_OPTIONS.map((g) => ({
        value: g.value,
        primary: g.label,
        secondary: g.hint,
        searchText: `${g.label} ${g.hint}`,
      })),
    []
  );

  const handleTeacherNameChange = (raw: string) => {
    const matched = GEB_TEACHERS.find((t) => t.name.toLowerCase() === raw.trim().toLowerCase());
    setFormData((prev) => ({
      ...prev,
      teacherName: raw,
      teacherDesignation: matched ? matched.designation : prev.teacherDesignation,
      ...LOCKED_CONSTANTS,
    }));
  };

  const handleCourseNameChange = (raw: string) => {
    const matched = GEB_COURSES.find((c) => c.title.toLowerCase() === raw.trim().toLowerCase());
    setFormData((prev) => ({
      ...prev,
      courseName: raw,
      courseCode: matched ? matched.code : prev.courseCode,
      ...LOCKED_CONSTANTS,
    }));
  };

  const handleCourseCodeChange = (raw: string) => {
    const matched = GEB_COURSES.find((c) => c.code.toLowerCase() === raw.trim().toLowerCase());
    setFormData((prev) => ({
      ...prev,
      courseCode: raw,
      courseName: matched ? matched.title : prev.courseName,
      ...LOCKED_CONSTANTS,
    }));
  };

  const handleStudentNameChange = (raw: string) => {
    const matched = GEB_STUDENTS.find((s) => s.name.toLowerCase() === raw.trim().toLowerCase());
    setFormData((prev) => ({
      ...prev,
      studentName: raw,
      registrationNo: matched ? matched.regNo : prev.registrationNo,
      ...LOCKED_CONSTANTS,
    }));
  };

  const handleStudentRegChange = (raw: string) => {
    const matched = GEB_STUDENTS.find((s) => s.regNo === raw.trim());
    setFormData((prev) => ({
      ...prev,
      registrationNo: raw,
      studentName: matched ? matched.name : prev.studentName,
      ...LOCKED_CONSTANTS,
    }));
  };

  const handleResetBlank = () => {
    setFormData(INITIAL_FORM_DATA);
  };

  const captureHighResPng = async (): Promise<string> => {
    const node = exportRef.current;
    if (!node) throw new Error('Export node missing');

    try {
      return await toPng(node, {
        width: 794,
        height: 1123,
        pixelRatio: 4,
        backgroundColor: '#ffffff',
        cacheBust: true,
      });
    } catch {
      return await toPng(node, {
        width: 794,
        height: 1123,
        pixelRatio: 4,
        backgroundColor: '#ffffff',
        skipFonts: true,
      });
    }
  };

  const handleDownloadPdf = async () => {
    setExportError(null);
    setIsExporting(true);
    try {
      const dataUrl = await captureHighResPng();
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });
      pdf.addImage(dataUrl, 'PNG', 0, 0, 210, 297, undefined, 'FAST');
      pdf.save(buildFilename(formData, 'pdf'));
    } catch {
      setExportError(
        'Direct PDF download was blocked by the browser. Use Print / Save Vector PDF instead.'
      );
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadPng = async () => {
    setExportError(null);
    setIsExporting(true);
    try {
      const dataUrl = await captureHighResPng();
      const link = document.createElement('a');
      link.download = buildFilename(formData, 'png');
      link.href = dataUrl;
      link.click();
    } catch {
      setExportError('PNG download could not complete. Try Print / Save Vector PDF.');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    setExportError(null);
    window.print();
  };

  const activeScale = zoomPreset === 'fit' ? fitWidth / 794 : zoomPreset;

  return (
    <div className="min-h-screen bg-[var(--studio-bg)] text-[var(--studio-text)] transition-colors">
      {/* Strict Three-Zone Top Bar */}
      <header className="no-print sticky top-0 z-40 flex h-[62px] items-center justify-between gap-8 border-b border-[var(--studio-border)] bg-[var(--studio-surface)]/95 px-6 backdrop-blur-md">
        <a
          href="#top"
          className="text-lg font-bold tracking-tight text-[var(--studio-text)] whitespace-nowrap shrink-0"
        >
          GENESIS STUDIO
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--studio-muted)]">
          <a
            href="#step-info"
            className="hover:text-[var(--studio-text)] transition-colors whitespace-nowrap shrink-0"
          >
            01. Fill Info
          </a>
          <a
            href="#step-designs"
            className="hover:text-[var(--studio-text)] transition-colors whitespace-nowrap shrink-0"
          >
            02. Choose Design
          </a>
          <a
            href="#step-export"
            className="hover:text-[var(--studio-text)] transition-colors whitespace-nowrap shrink-0"
          >
            03. Print &amp; PDF
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--studio-accent)] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[var(--studio-accent-hover)] disabled:opacity-60 whitespace-nowrap shrink-0"
          >
            {isExporting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Download className="h-3.5 w-3.5" />
            )}
            Download PDF
          </button>
        </div>
      </header>

      {exportError && (
        <div className="no-print flex items-center justify-between border-b border-amber-300 bg-amber-50 px-6 py-2.5 text-xs font-medium text-amber-950 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-200">
          <span>{exportError}</span>
          <button
            type="button"
            onClick={() => setExportError(null)}
            className="ml-4 font-semibold underline whitespace-nowrap"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* =================================================================
          HERO SHOWCASE: GENESIS COVER MAKER + COMPACT 3-SHEET DEMO + THEME
          ================================================================= */}
      <section
        id="top"
        className="no-print border-b border-[var(--studio-border)] bg-[var(--studio-surface)]"
      >
        <div className="mx-auto max-w-5xl px-6 py-9 text-center sm:py-11">
          <h1
            className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-[var(--studio-text)] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.1]"
            style={{textWrap: 'balance'}}
          >
            GENESIS Cover Maker
          </h1>

          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2.5 text-sm font-semibold text-[var(--studio-accent-text)]">
            <span>SUST 36th Batch</span>
            <span aria-hidden="true">·</span>
            <span>GEB 22nd Batch</span>
          </div>

          {/* Compact 3-Sheet Demo Fan (Sized cleanly, never oversized) */}
          <div className="preview-stage-grid relative mx-auto mt-7 flex h-[220px] max-w-xl items-center justify-center overflow-hidden rounded-2xl border border-[var(--studio-border)] px-4 sm:h-[238px]">
            {/* Left Sheet: Design 13 */}
            <button
              type="button"
              onClick={() => updateField('designId', 'bio-helix-labware-v2')}
              aria-label="Select Bio Helix & Labware Design"
              className="relative -mr-5 -rotate-6 transition-transform duration-200 hover:-translate-y-1.5 hover:z-20 focus-visible:outline-2 focus-visible:outline-emerald-500"
              style={{
                width: '115px',
                height: '163px',
                overflow: 'hidden',
                backgroundColor: '#FFFFFF',
                borderRadius: '4px',
                boxShadow:
                  '0 12px 24px -6px rgba(0, 0, 0, 0.32), 0 0 0 1px rgba(15, 23, 42, 0.08)',
              }}
            >
              <div
                style={{
                  width: '794px',
                  height: '1123px',
                  transform: 'scale(0.145)',
                  transformOrigin: 'top left',
                  pointerEvents: 'none',
                }}
              >
                <CoverDesignSheet data={formData} designId="bio-helix-labware-v2" />
              </div>
            </button>

            {/* Center Sheet: Active Design */}
            <a
              href="#step-export"
              aria-label="Inspect full preview of selected design"
              className="relative z-10 block transition-transform duration-200 hover:-translate-y-1.5"
              style={{
                width: '131px',
                height: '185px',
                overflow: 'hidden',
                backgroundColor: '#FFFFFF',
                borderRadius: '4px',
                boxShadow:
                  '0 18px 36px -8px rgba(0, 0, 0, 0.42), 0 0 0 1px rgba(15, 23, 42, 0.1)',
              }}
            >
              <div
                style={{
                  width: '794px',
                  height: '1123px',
                  transform: 'scale(0.165)',
                  transformOrigin: 'top left',
                  pointerEvents: 'none',
                }}
              >
                <CoverDesignSheet data={formData} />
              </div>
            </a>

            {/* Right Sheet: Design 15 */}
            <button
              type="button"
              onClick={() => updateField('designId', 'royal-teal-gold-ornate')}
              aria-label="Select Royal Teal & Gold Design"
              className="relative -ml-5 rotate-6 transition-transform duration-200 hover:-translate-y-1.5 hover:z-20 focus-visible:outline-2 focus-visible:outline-emerald-500"
              style={{
                width: '115px',
                height: '163px',
                overflow: 'hidden',
                backgroundColor: '#FFFFFF',
                borderRadius: '4px',
                boxShadow:
                  '0 12px 24px -6px rgba(0, 0, 0, 0.32), 0 0 0 1px rgba(15, 23, 42, 0.08)',
              }}
            >
              <div
                style={{
                  width: '794px',
                  height: '1123px',
                  transform: 'scale(0.145)',
                  transformOrigin: 'top left',
                  pointerEvents: 'none',
                }}
              >
                <CoverDesignSheet data={formData} designId="royal-teal-gold-ornate" />
              </div>
            </button>
          </div>

          {/* Primary CTA + 2-Mode Theme Switcher (Light / Dark) */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="#step-info"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--studio-accent)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--studio-accent-hover)] whitespace-nowrap shrink-0"
            >
              Create Cover Page
              <ArrowDown className="h-4 w-4" />
            </a>

            <div
              className="inline-flex items-center gap-1 rounded-lg border border-[var(--studio-border)] bg-[var(--studio-elevated)] p-1"
              role="group"
              aria-label="Theme switcher"
            >
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  theme === 'light'
                    ? 'bg-[var(--studio-surface)] text-[var(--studio-text)] shadow-xs'
                    : 'text-[var(--studio-muted)] hover:text-[var(--studio-text)]'
                }`}
              >
                <Sun className="h-3.5 w-3.5" />
                Light
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  theme === 'dark'
                    ? 'bg-[var(--studio-surface)] text-[var(--studio-text)] shadow-xs'
                    : 'text-[var(--studio-muted)] hover:text-[var(--studio-text)]'
                }`}
              >
                <Moon className="h-3.5 w-3.5" />
                Dark
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="no-print mx-auto max-w-7xl px-4 py-10 sm:px-6 space-y-14">
        {/* =================================================================
            STEP 1: FORM STUDIO + STICKY LIVE COMPANION PREVIEW
            ================================================================= */}
        <section id="step-info" className="scroll-mt-20">
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_360px]">
            {/* Form Workspace */}
            <div className="rounded-2xl border border-[var(--studio-border)] bg-[var(--studio-surface)] p-6 shadow-xs sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--studio-border)] pb-5">
                <h2 className="text-xl font-bold tracking-tight text-[var(--studio-text)] sm:text-2xl">
                  <span className="font-mono text-base text-[var(--studio-accent-text)] mr-2">
                    01
                  </span>
                  Enter Cover Page Details
                </h2>

                <button
                  type="button"
                  onClick={handleResetBlank}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--studio-border)] bg-[var(--studio-elevated)] px-3 py-1.5 text-xs font-semibold text-[var(--studio-muted)] transition-colors hover:text-[var(--studio-text)] whitespace-nowrap shrink-0"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Clear Fields
                </button>
              </div>

              <div className="mt-7 space-y-8">
                {/* Block A: Course & Document Type (Course Name FIRST, then Course Code) */}
                <div>
                  <h3 className="text-sm font-bold text-[var(--studio-text)] mb-4">
                    Course &amp; Document Type
                  </h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                      <label htmlFor="top-session" className={labelClass}>
                        Session
                      </label>
                      <div className="relative">
                        <input
                          id="top-session"
                          type="text"
                          value={LOCKED_CONSTANTS.session}
                          readOnly
                          aria-readonly="true"
                          className={`${lockedInputClass} font-mono tabular-nums`}
                        />
                        <Lock className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--studio-subtle)]" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="course-name" className={labelClass}>
                        Course Name
                      </label>
                      <SmartCombobox
                        id="course-name"
                        value={formData.courseName}
                        options={courseNameOptions}
                        placeholder="Select or search course name"
                        onChange={handleCourseNameChange}
                        onSelectOption={(opt) => {
                          const found = GEB_COURSES.find((c) => c.title === opt.value);
                          setFormData((prev) => ({
                            ...prev,
                            courseName: opt.value,
                            courseCode: found ? found.code : prev.courseCode,
                            ...LOCKED_CONSTANTS,
                          }));
                        }}
                      />
                    </div>

                    <div>
                      <label htmlFor="course-code" className={labelClass}>
                        Course Code
                      </label>
                      <SmartCombobox
                        id="course-code"
                        value={formData.courseCode}
                        options={courseCodeOptions}
                        placeholder="Select or search code"
                        mono
                        onChange={handleCourseCodeChange}
                        onSelectOption={(opt) => {
                          const found = GEB_COURSES.find((c) => c.code === opt.value);
                          setFormData((prev) => ({
                            ...prev,
                            courseCode: opt.value,
                            courseName: found ? found.title : prev.courseName,
                            ...LOCKED_CONSTANTS,
                          }));
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <span className={labelClass}>Document Type</span>
                    <div className="inline-flex flex-wrap gap-1.5 rounded-xl border border-[var(--studio-border)] bg-[var(--studio-elevated)] p-1">
                      {(['Lab Report', 'Assignment', 'Project Report'] as CoverType[]).map((type) => {
                        const active = formData.coverType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => updateField('coverType', type)}
                            className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                              active
                                ? 'bg-[var(--studio-accent)] text-white shadow-xs'
                                : 'text-[var(--studio-muted)] hover:text-[var(--studio-text)]'
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Block B: Student & Teacher Columns */}
                <div className="grid grid-cols-1 gap-8 border-t border-[var(--studio-border)] pt-7 lg:grid-cols-2">
                  {/* Submitted By */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-[var(--studio-text)]">
                      Submitted By (Student)
                    </h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label htmlFor="student-name" className={labelClass}>
                          Student Name
                        </label>
                        <SmartCombobox
                          id="student-name"
                          value={formData.studentName}
                          options={studentNameOptions}
                          placeholder="Search student name or Reg. No."
                          onChange={handleStudentNameChange}
                          onSelectOption={(opt) => {
                            const found = GEB_STUDENTS.find((s) => s.name === opt.value);
                            setFormData((prev) => ({
                              ...prev,
                              studentName: opt.value,
                              registrationNo: found ? found.regNo : prev.registrationNo,
                              ...LOCKED_CONSTANTS,
                            }));
                          }}
                        />
                      </div>

                      <div>
                        <label htmlFor="reg-no" className={labelClass}>
                          Reg. No.
                        </label>
                        <SmartCombobox
                          id="reg-no"
                          value={formData.registrationNo}
                          options={studentRegOptions}
                          placeholder="Search Reg. No."
                          mono
                          onChange={handleStudentRegChange}
                          onSelectOption={(opt) => {
                            const found = GEB_STUDENTS.find((s) => s.regNo === opt.value);
                            setFormData((prev) => ({
                              ...prev,
                              registrationNo: opt.value,
                              studentName: found ? found.name : prev.studentName,
                              ...LOCKED_CONSTANTS,
                            }));
                          }}
                        />
                      </div>

                      <div>
                        <label htmlFor="group-name" className={labelClass}>
                          Group
                        </label>
                        <SmartCombobox
                          id="group-name"
                          value={formData.group}
                          options={groupOptions}
                          placeholder="Select No or 1–10"
                          onChange={(val) => updateField('group', val)}
                          onSelectOption={(opt) => updateField('group', opt.value)}
                        />
                      </div>

                      <div>
                        <label htmlFor="semester" className={labelClass}>
                          Semester
                        </label>
                        <div className="relative">
                          <input
                            id="semester"
                            type="text"
                            value={LOCKED_CONSTANTS.semester}
                            readOnly
                            aria-readonly="true"
                            className={lockedInputClass}
                          />
                          <Lock className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--studio-subtle)]" />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="student-session" className={labelClass}>
                          Session
                        </label>
                        <div className="relative">
                          <input
                            id="student-session"
                            type="text"
                            value={LOCKED_CONSTANTS.studentSession}
                            readOnly
                            aria-readonly="true"
                            className={`${lockedInputClass} font-mono tabular-nums`}
                          />
                          <Lock className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--studio-subtle)]" />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="student-dept" className={labelClass}>
                          Department
                        </label>
                        <div className="relative">
                          <input
                            id="student-dept"
                            type="text"
                            value={LOCKED_CONSTANTS.department}
                            readOnly
                            aria-readonly="true"
                            className={lockedInputClass}
                          />
                          <Lock className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--studio-subtle)]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submitted To */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-[var(--studio-text)]">
                      Submitted To (Course Teacher)
                    </h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label htmlFor="teacher-name" className={labelClass}>
                          Teacher Name
                        </label>
                        <SmartCombobox
                          id="teacher-name"
                          value={formData.teacherName}
                          options={teacherNameOptions}
                          placeholder="Select or search GEB teacher"
                          onChange={handleTeacherNameChange}
                          onSelectOption={(opt) => {
                            const found = GEB_TEACHERS.find((t) => t.name === opt.value);
                            setFormData((prev) => ({
                              ...prev,
                              teacherName: opt.value,
                              teacherDesignation: found
                                ? found.designation
                                : prev.teacherDesignation,
                              ...LOCKED_CONSTANTS,
                            }));
                          }}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="teacher-designation" className={labelClass}>
                          Designation
                        </label>
                        <select
                          id="teacher-designation"
                          value={formData.teacherDesignation}
                          onChange={(e) => updateField('teacherDesignation', e.target.value)}
                          className={inputClass}
                        >
                          {TEACHER_DESIGNATIONS.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="teacher-dept" className={labelClass}>
                          Teacher&apos;s Department
                        </label>
                        <input
                          id="teacher-dept"
                          type="text"
                          value={formData.teacherDepartment}
                          onChange={(e) => updateField('teacherDepartment', e.target.value)}
                          placeholder="Department of Genetic Engineering and Biotechnology"
                          className={inputClass}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="univ-name" className={labelClass}>
                          University
                        </label>
                        <div className="relative">
                          <input
                            id="univ-name"
                            type="text"
                            value={LOCKED_CONSTANTS.universityName}
                            readOnly
                            aria-readonly="true"
                            className={lockedInputClass}
                          />
                          <Lock className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--studio-subtle)]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Block C: Smooth Conditional Bottom Fields */}
                <div className="border-t border-[var(--studio-border)] pt-7">
                  <AnimatePresence mode="wait">
                    {formData.coverType === 'Assignment' ? (
                      <motion.div
                        key="assignment-fields"
                        initial={{opacity: 0, y: 6}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -6}}
                        transition={{duration: 0.16, ease: [0.16, 1, 0.3, 1]}}
                      >
                        <h3 className="text-sm font-bold text-[var(--studio-text)] mb-4">
                          Assignment Details
                        </h3>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div className="md:col-span-2">
                            <label htmlFor="assignment-name" className={labelClass}>
                              Assignment Name
                            </label>
                            <input
                              id="assignment-name"
                              type="text"
                              value={formData.assignmentName}
                              onChange={(e) => updateField('assignmentName', e.target.value)}
                              placeholder="Enter assignment topic or title"
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label htmlFor="assignment-date" className={labelClass}>
                              Date of Assignment
                            </label>
                            <input
                              id="assignment-date"
                              type="date"
                              value={formData.assignmentDate}
                              onChange={(e) => updateField('assignmentDate', e.target.value)}
                              className={`${inputClass} font-mono tabular-nums`}
                            />
                          </div>
                          <div>
                            <label htmlFor="assignment-sub-date" className={labelClass}>
                              Date of Assignment Submission
                            </label>
                            <input
                              id="assignment-sub-date"
                              type="date"
                              value={formData.assignmentSubmissionDate}
                              onChange={(e) =>
                                updateField('assignmentSubmissionDate', e.target.value)
                              }
                              className={`${inputClass} font-mono tabular-nums`}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="report-fields"
                        initial={{opacity: 0, y: 6}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -6}}
                        transition={{duration: 0.16, ease: [0.16, 1, 0.3, 1]}}
                      >
                        <h3 className="text-sm font-bold text-[var(--studio-text)] mb-4">
                          {formData.coverType} Details
                        </h3>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                          <div>
                            <label htmlFor="exp-no" className={labelClass}>
                              Experiment No.
                            </label>
                            <SmartCombobox
                              id="exp-no"
                              value={formData.experimentNo}
                              options={experimentNoOptions}
                              placeholder="Select 01–12"
                              mono
                              onChange={(val) => updateField('experimentNo', val)}
                              onSelectOption={(opt) => updateField('experimentNo', opt.value)}
                            />
                          </div>
                          <div className="md:col-span-3">
                            <label htmlFor="exp-name" className={labelClass}>
                              Experiment Name
                            </label>
                            <input
                              id="exp-name"
                              type="text"
                              value={formData.experimentName}
                              onChange={(e) => updateField('experimentName', e.target.value)}
                              placeholder="Enter experiment title"
                              className={inputClass}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label htmlFor="exp-date" className={labelClass}>
                              Date of Experiment
                            </label>
                            <input
                              id="exp-date"
                              type="date"
                              value={formData.experimentDate}
                              onChange={(e) => updateField('experimentDate', e.target.value)}
                              className={`${inputClass} font-mono tabular-nums`}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label htmlFor="rep-sub-date" className={labelClass}>
                              Date of Report Submission
                            </label>
                            <input
                              id="rep-sub-date"
                              type="date"
                              value={formData.reportSubmissionDate}
                              onChange={(e) => updateField('reportSubmissionDate', e.target.value)}
                              className={`${inputClass} font-mono tabular-nums`}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Sticky Live Companion Preview (Desktop) */}
            <aside className="hidden xl:block">
              <div className="sticky top-[82px] rounded-2xl border border-[var(--studio-border)] bg-[var(--studio-surface)] p-5 shadow-xs">
                <div className="flex items-center justify-between border-b border-[var(--studio-border)] pb-3">
                  <div>
                    <div className="text-xs font-bold text-[var(--studio-text)]">
                      Live Sheet Preview
                    </div>
                    <div className="text-xs text-[var(--studio-muted)]">
                      Updates automatically as you type
                    </div>
                  </div>
                  <a
                    href="#step-export"
                    className="text-xs font-semibold text-[var(--studio-accent-text)] hover:underline whitespace-nowrap"
                  >
                    Full View
                  </a>
                </div>

                <div className="preview-stage-grid mt-4 flex justify-center rounded-xl border border-[var(--studio-border)] py-5">
                  <div
                    style={{
                      width: '262px',
                      height: '371px',
                      position: 'relative',
                      overflow: 'hidden',
                      backgroundColor: '#FFFFFF',
                      boxShadow:
                        '0 12px 28px -8px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(15, 23, 42, 0.08)',
                    }}
                  >
                    <div
                      style={{
                        width: '794px',
                        height: '1123px',
                        transform: 'scale(0.33)',
                        transformOrigin: 'top left',
                        pointerEvents: 'none',
                      }}
                    >
                      <CoverDesignSheet data={formData} />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="grid grid-cols-5 gap-1.5 rounded-lg border border-[var(--studio-border)] bg-[var(--studio-elevated)] p-1">
                    {DESIGN_LIST.map((d, idx) => {
                      const active = formData.designId === d.id;
                      return (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => updateField('designId', d.id)}
                          title={d.title}
                          className={`rounded-md py-1.5 font-mono text-xs font-semibold transition-colors ${
                            active
                              ? 'bg-[var(--studio-accent)] text-white shadow-xs'
                              : 'text-[var(--studio-muted)] hover:text-[var(--studio-text)]'
                          }`}
                        >
                          D{idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* =================================================================
            STEP 2: ALL 10 DESIGNS LIVE-FILLED GALLERY
            ================================================================= */}
        <section id="step-designs" className="scroll-mt-20 space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--studio-border)] pb-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[var(--studio-text)] sm:text-2xl">
                <span className="font-mono text-base text-[var(--studio-accent-text)] mr-2">
                  02
                </span>
                Choose Your Cover Design
              </h2>
              <p className="mt-1 text-sm text-[var(--studio-muted)]">
                All 15 templates automatically reflect your details above. Select any design to inspect and export.
              </p>
            </div>
            <a
              href="#step-export"
              className="text-xs font-semibold text-[var(--studio-accent-text)] hover:underline whitespace-nowrap shrink-0"
            >
              Jump to Print &amp; PDF
            </a>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {DESIGN_LIST.map((design) => {
              const isSelected = formData.designId === design.id;
              return (
                <button
                  key={design.id}
                  type="button"
                  onClick={() => updateField('designId', design.id as DesignId)}
                  className={`group flex flex-col overflow-hidden rounded-2xl border bg-[var(--studio-surface)] text-left transition-all duration-200 hover:-translate-y-1 ${
                    isSelected
                      ? 'border-[var(--studio-accent)] ring-2 ring-[var(--studio-accent-soft)] shadow-sm'
                      : 'border-[var(--studio-border)] hover:border-[var(--studio-subtle)] hover:shadow-sm'
                  }`}
                >
                  <div className="preview-stage-grid flex w-full items-center justify-center border-b border-[var(--studio-border)] py-4">
                    <div
                      style={{
                        width: '190px',
                        height: '269px',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow:
                          '0 10px 24px -6px rgba(0, 0, 0, 0.32), 0 0 0 1px rgba(15, 23, 42, 0.08)',
                        backgroundColor: '#FFFFFF',
                      }}
                    >
                      <div
                        style={{
                          width: '794px',
                          height: '1123px',
                          transform: 'scale(0.24)',
                          transformOrigin: 'top left',
                          pointerEvents: 'none',
                        }}
                      >
                        <CoverDesignSheet data={formData} designId={design.id} />
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full flex-1 flex-col justify-between p-4">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-[var(--studio-text)]">
                          {design.title}
                        </span>
                        {isSelected && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-[var(--studio-accent-text)] whitespace-nowrap shrink-0">
                            <Check className="h-3.5 w-3.5" />
                            Active
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-xs text-[var(--studio-muted)] leading-relaxed">
                        {design.subtitle}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* =================================================================
            STEP 3: PRESSROOM FULL PREVIEW & HIGH-QUALITY PRINT / PDF EXPORT
            ================================================================= */}
        <section
          id="step-export"
          className="scroll-mt-20 rounded-2xl border border-[var(--studio-border)] bg-[var(--studio-surface)] p-6 shadow-xs sm:p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--studio-border)] pb-5">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[var(--studio-text)] sm:text-2xl">
                <span className="font-mono text-base text-[var(--studio-accent-text)] mr-2">
                  03
                </span>
                Full Preview, Print &amp; PDF Download
              </h2>
              <p className="mt-1 text-sm text-[var(--studio-muted)]">
                100% sharp vector graphics and typography calibrated for A4 printing.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <div className="flex items-center gap-1 rounded-lg border border-[var(--studio-border)] bg-[var(--studio-elevated)] p-1">
                <button
                  type="button"
                  onClick={() => setZoomPreset('fit')}
                  className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap ${
                    zoomPreset === 'fit'
                      ? 'bg-[var(--studio-surface)] text-[var(--studio-text)] shadow-xs'
                      : 'text-[var(--studio-muted)] hover:text-[var(--studio-text)]'
                  }`}
                >
                  <Maximize2 className="h-3 w-3" />
                  Fit
                </button>
                <button
                  type="button"
                  onClick={() => setZoomPreset(0.75)}
                  className={`rounded-md px-2.5 py-1 font-mono text-xs font-semibold transition-colors tabular-nums ${
                    zoomPreset === 0.75
                      ? 'bg-[var(--studio-surface)] text-[var(--studio-text)] shadow-xs'
                      : 'text-[var(--studio-muted)] hover:text-[var(--studio-text)]'
                  }`}
                >
                  75%
                </button>
                <button
                  type="button"
                  onClick={() => setZoomPreset(0.95)}
                  className={`rounded-md px-2.5 py-1 font-mono text-xs font-semibold transition-colors tabular-nums ${
                    zoomPreset === 0.95
                      ? 'bg-[var(--studio-surface)] text-[var(--studio-text)] shadow-xs'
                      : 'text-[var(--studio-muted)] hover:text-[var(--studio-text)]'
                  }`}
                >
                  95%
                </button>
              </div>

              <button
                type="button"
                onClick={() => setDarkMat((prev) => !prev)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--studio-border)] bg-[var(--studio-elevated)] px-3 py-1.5 text-xs font-semibold text-[var(--studio-text)] hover:opacity-90 whitespace-nowrap shrink-0"
                title="Toggle drafting board contrast"
              >
                {darkMat ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                {darkMat ? 'Light Mat' : 'Dark Mat'}
              </button>
            </div>
          </div>

          <div
            ref={previewContainerRef}
            className={`${
              darkMat
                ? 'preview-stage-dark border-[var(--studio-border)]'
                : 'preview-stage-grid border-[var(--studio-border)]'
            } mt-6 flex w-full justify-center overflow-x-auto rounded-xl border py-10 px-4 transition-colors`}
          >
            <div
              style={{
                width: `${Math.round(794 * activeScale)}px`,
                height: `${Math.round(1123 * activeScale)}px`,
                position: 'relative',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: '794px',
                  height: '1123px',
                  transform: `scale(${activeScale})`,
                  transformOrigin: 'top left',
                  boxShadow: darkMat
                    ? '0 24px 60px -12px rgba(0, 0, 0, 0.7)'
                    : '0 22px 48px -12px rgba(15, 23, 42, 0.24), 0 0 0 1px rgba(15, 23, 42, 0.08)',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <CoverDesignSheet data={formData} />
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-col items-start justify-between gap-5 border-t border-[var(--studio-border)] pt-6 lg:flex-row lg:items-center">
            <div className="text-xs text-[var(--studio-muted)] leading-relaxed">
              <div className="font-semibold text-[var(--studio-text)]">Ready to export</div>
              <p className="mt-0.5">
                Use <strong>Print / Save Vector PDF</strong> for 100% vector text, or{' '}
                <strong>Download PDF</strong> for instant 384 DPI file export.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--studio-border)] bg-[var(--studio-elevated)] px-4 py-2.5 text-xs font-semibold text-[var(--studio-text)] transition-colors hover:opacity-90 whitespace-nowrap shrink-0"
              >
                <Printer className="h-4 w-4" />
                Print / Save Vector PDF
              </button>

              <button
                type="button"
                onClick={handleDownloadPng}
                disabled={isExporting}
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--studio-border)] bg-[var(--studio-elevated)] px-4 py-2.5 text-xs font-semibold text-[var(--studio-text)] transition-colors hover:opacity-90 disabled:opacity-60 whitespace-nowrap shrink-0"
              >
                <FileImage className="h-4 w-4" />
                Download Ultra-HD PNG
              </button>

              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isExporting}
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--studio-accent)] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[var(--studio-accent-hover)] disabled:opacity-60 whitespace-nowrap shrink-0"
              >
                {isExporting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                Download PDF
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="no-print border-t border-[var(--studio-border)] bg-[var(--studio-surface)] px-6 py-5 text-center text-xs text-[var(--studio-muted)]">
        GENESIS STUDIO · SUST 36th Batch · GEB 22nd Batch
      </footer>

      {/* Dedicated Unscaled Full-Resolution A4 Sheet for Ultra-HD Capture & Native Vector Print */}
      <div
        className="print-only-container"
        style={{
          position: 'fixed',
          left: '-10000px',
          top: 0,
          width: '794px',
          height: '1123px',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <div
          ref={exportRef}
          style={{width: '794px', height: '1123px', backgroundColor: '#FFFFFF'}}
        >
          <CoverDesignSheet data={formData} />
        </div>
      </div>
    </div>
  );
}
