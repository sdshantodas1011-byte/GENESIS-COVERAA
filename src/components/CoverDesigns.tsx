import React from 'react';
import {CoverFormData, DesignId} from '../types/cover';
import {SustCrestSvg} from './SustCrestSvg';

interface CoverDesignProps {
  data: CoverFormData;
  designId?: DesignId;
  id?: string;
}

export const DESIGN_LIST: {id: DesignId; title: string; subtitle: string}[] = [
  {
    id: 'dna-divider-classic',
    title: 'Design 1 · DNA Divider Classic',
    subtitle: 'Centered DNA double-helix bar, rounded course box & tapered gold rule',
  },
  {
    id: 'molecular-corner-medallions',
    title: 'Design 2 · Molecular Medallions',
    subtitle: 'Molecular network & DNA watermarks with twin circular corner seals',
  },
  {
    id: 'teal-wave-modern',
    title: 'Design 3 · Teal Wave Modern',
    subtitle: 'Multi-strand teal header & footer waves with dual-bordered profile cards',
  },
  {
    id: 'emerald-hex-frame',
    title: 'Design 4 · Emerald Hexagonal',
    subtitle: 'Mint hexagonal lattices, bracketed course frame & dark emerald pill footer',
  },
  {
    id: 'executive-editorial-stripe',
    title: 'Design 5 · Executive Editorial',
    subtitle: 'Left-aligned masthead, bold stacked heading & navy-gold edge bars',
  },
  {
    id: 'diagonal-teal-cards',
    title: 'Design 6 · Diagonal Teal Cards',
    subtitle: 'Geometric corner sashes, pill-header profile cards & timeline dots',
  },
  {
    id: 'navy-crimson-minimal',
    title: 'Design 7 · Navy & Crimson Bar',
    subtitle: 'Right-margin accent bar, full-width navy title strip & red-bordered footer',
  },
  {
    id: 'maroon-gold-dna-ornate',
    title: 'Design 8 · Maroon & Gold DNA',
    subtitle: 'Double heritage border, botanical leaves & vertical DNA column divider',
  },
  {
    id: 'aqua-glass-ribbon',
    title: 'Design 9 · Aqua Glass Ribbon',
    subtitle: 'Full-width teal gradient title ribbon with subtle DNA helix backdrop',
  },
  {
    id: 'navy-gold-diagonal-sash',
    title: 'Design 10 · Navy & Amber Sash',
    subtitle: 'Angled navy-gold corner sashes with dark pill column headers',
  },
  {
    id: 'forest-green-double-frame',
    title: 'Design 11 · Forest Green Frame',
    subtitle: 'Full-page emerald frame, dashed column divider & corner-bracketed footer',
  },
  {
    id: 'classic-serif-pure',
    title: 'Design 12 · Classic Serif Pure',
    subtitle: 'Clean traditional academic sheet with shaded course capsule & serif title',
  },
  {
    id: 'bio-helix-labware-v2',
    title: 'Design 13 · Bio Helix & Labware',
    subtitle: 'DNA helix icon heading, molecular watermarks & laboratory glassware',
  },
  {
    id: 'circuit-microscope-pipette',
    title: 'Design 14 · Circuit & Microscope',
    subtitle: 'Subtle PCB traces, clean sans heading & microscope-flask illustration',
  },
  {
    id: 'royal-teal-gold-ornate',
    title: 'Design 15 · Royal Teal & Gold',
    subtitle: 'Notched navy-gold plaques, corner-clipped cards & Drosophila watermark',
  },
];

function formatDateDisplay(iso: string): string {
  if (!iso) return '';
  const parts = iso.split('-');
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return iso;
}

function formatDepartmentHeading(dept: string): string {
  const trimmed = dept.trim();
  if (!trimmed) return 'Department of Genetic Engineering and Biotechnology';
  if (/^department\s+of\s+/i.test(trimmed)) return trimmed;
  return `Department of ${trimmed}`;
}

export const CoverDesignSheet: React.FC<CoverDesignProps> = ({
  data,
  designId,
  id,
}) => {
  const activeDesign = designId ?? data.designId;
  const serifFont = '"Source Serif 4", "Times New Roman", "Noto Sans Bengali", Georgia, serif';
  const sansFont = '"Plus Jakarta Sans", "Noto Sans Bengali", system-ui, sans-serif';
  const deptLine = formatDepartmentHeading(data.department);
  const teacherDeptLine = formatDepartmentHeading(
    data.teacherDepartment || data.department
  );
  const trimmedGroup = (data.group ?? '').trim();
  const showGroup = trimmedGroup.length > 0 && trimmedGroup.toLowerCase() !== 'no';
  const titleUpper = data.coverType.toUpperCase();

  const renderBottomMetadata = (
    textColor = '#0F172A',
    mutedColor = '#1E293B',
    fontFamily = serifFont,
    fontSize = '15.5px'
  ) => {
    const isAssignment = data.coverType === 'Assignment';

    if (isAssignment) {
      return (
        <div style={{fontFamily, fontSize, lineHeight: 1.52, color: textColor}}>
          <div>
            <span style={{fontWeight: 600}}>Assignment Name : </span>
            <span>{data.assignmentName}</span>
          </div>
          <div style={{marginTop: '3px'}}>
            <span style={{fontWeight: 600}}>Date of Assignment : </span>
            <span style={{color: mutedColor}}>{formatDateDisplay(data.assignmentDate)}</span>
          </div>
          <div style={{marginTop: '3px'}}>
            <span style={{fontWeight: 600}}>Date of Assignment Submission : </span>
            <span style={{color: mutedColor}}>
              {formatDateDisplay(data.assignmentSubmissionDate)}
            </span>
          </div>
        </div>
      );
    }

    return (
      <div style={{fontFamily, fontSize, lineHeight: 1.52, color: textColor}}>
        <div>
          <span style={{fontWeight: 600}}>Experiment No. : </span>
          <span>{data.experimentNo}</span>
        </div>
        <div style={{marginTop: '3px'}}>
          <span style={{fontWeight: 600}}>Experiment Name : </span>
          <span>{data.experimentName}</span>
        </div>
        <div style={{marginTop: '3px'}}>
          <span style={{fontWeight: 600}}>Date of the Experiment : </span>
          <span style={{color: mutedColor}}>{formatDateDisplay(data.experimentDate)}</span>
        </div>
        <div style={{marginTop: '3px'}}>
          <span style={{fontWeight: 600}}>Date of Report Submission : </span>
          <span style={{color: mutedColor}}>
            {formatDateDisplay(data.reportSubmissionDate)}
          </span>
        </div>
      </div>
    );
  };

  const renderCourseLines = (
    textColor = '#0F172A',
    accentColor = '#0F172A',
    fontFamily = serifFont,
    fontSize = '16.5px'
  ) => (
    <div style={{fontFamily, fontSize, lineHeight: 1.52, color: textColor}}>
      <div>
        <strong>Session : </strong>
        <span>
          {data.session}
          {data.semester ? ` (${data.semester})` : ''}
        </span>
      </div>
      <div>
        <strong style={{color: accentColor}}>Course Code : </strong>
        <span style={{color: accentColor === '#0F172A' ? textColor : accentColor}}>
          {data.courseCode}
        </span>
      </div>
      <div>
        <strong>Course Name : </strong>
        <span>{data.courseName}</span>
      </div>
    </div>
  );

  const renderTwoColumnPeople = (
    dividerColor = '#0F172A',
    options?: {
      fontFamily?: string;
      fontSize?: string;
      teacherBold?: boolean;
      studentBold?: boolean;
      dashed?: boolean;
      uppercaseHeaders?: boolean;
      headerColor?: string;
    }
  ) => {
    const ff = options?.fontFamily ?? serifFont;
    const fs = options?.fontSize ?? '15.5px';
    const headerColor = options?.headerColor ?? '#0F172A';
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5px 1fr',
          gap: '26px',
          alignItems: 'stretch',
          fontFamily: ff,
          color: '#0F172A',
        }}
      >
        <div style={{fontSize: fs, lineHeight: 1.5, paddingRight: '4px'}}>
          <div
            style={{
              fontWeight: 700,
              fontSize: '16.5px',
              marginBottom: '8px',
              color: headerColor,
              textTransform: options?.uppercaseHeaders ? 'uppercase' : 'none',
            }}
          >
            Submitted to :
          </div>
          <div style={{fontWeight: options?.teacherBold ? 700 : 600, marginBottom: '10px'}}>
            {data.teacherName}
          </div>
          <div>{data.teacherDesignation}</div>
          <div>{teacherDeptLine}</div>
          <div>{data.universityName}</div>
        </div>

        <div
          style={{
            width: '1.5px',
            minHeight: '215px',
            borderLeft: options?.dashed
              ? `1.5px dashed ${dividerColor}`
              : `1.5px solid ${dividerColor}`,
          }}
        />

        <div style={{fontSize: fs, lineHeight: 1.52, paddingLeft: '4px'}}>
          <div
            style={{
              fontWeight: 700,
              fontSize: '16.5px',
              marginBottom: '8px',
              color: headerColor,
              textTransform: options?.uppercaseHeaders ? 'uppercase' : 'none',
            }}
          >
            Submitted by :
          </div>
          <div style={{marginBottom: '10px'}}>
            <span>Name : </span>
            <span style={{fontWeight: options?.studentBold ? 700 : 600}}>{data.studentName}</span>
          </div>
          <div>Reg. No. : {data.registrationNo}</div>
          {showGroup && <div>Group : {trimmedGroup}</div>}
          <div>Semester : {data.semester}</div>
          <div>Session : {data.studentSession || data.session}</div>
          <div>Department : {data.department}</div>
        </div>
      </div>
    );
  };

  // =========================================================================
  // DESIGN 2: MOLECULAR CORNER MEDALLIONS (Page 2)
  // =========================================================================
  if (activeDesign === 'molecular-corner-medallions') {
    return (
      <div
        id={id}
        style={{
          width: '794px',
          height: '1123px',
          background: 'linear-gradient(155deg, #FFFFFF 0%, #F7FAF8 55%, #F2F5F7 100%)',
          color: '#0F172A',
          position: 'relative',
          overflow: 'hidden',
          padding: '46px 56px 56px 56px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Subtle Molecular Watermarks & Twin Circular Medallions */}
        <svg width="794" height="1123" viewBox="0 0 794 1123" fill="none" style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
          {/* Top-left hexagons */}
          <g opacity="0.14" stroke="#64748B" strokeWidth="2.2">
            <polygon points="34,42 56,30 78,42 78,66 56,78 34,66" />
            <polygon points="78,66 100,54 122,66 122,90 100,102 78,90" />
            <polygon points="34,90 56,78 78,90 78,114 56,126 34,114" />
          </g>
          {/* Top-right molecular nodes */}
          <g opacity="0.14" stroke="#64748B" strokeWidth="2">
            <circle cx="675" cy="54" r="14" />
            <circle cx="725" cy="90" r="10" />
            <circle cx="655" cy="128" r="12" />
            <circle cx="745" cy="145" r="8" />
            <line x1="687" y1="62" x2="716" y2="83" />
            <line x1="671" y1="68" x2="658" y2="116" />
            <line x1="728" y1="100" x2="742" y2="137" />
          </g>
          {/* Lower-left DNA strand */}
          <g opacity="0.18" transform="translate(10, 610) rotate(-22)">
            <path d="M0 0 C32 30 -32 65 0 95 C32 125 -32 160 0 190" stroke="#64748B" strokeWidth="5.5" />
            <path d="M36 0 C4 30 68 65 36 95 C4 125 68 160 36 190" stroke="#94A3B8" strokeWidth="5.5" />
            <line x1="8" y1="24" x2="28" y2="24" stroke="#64748B" strokeWidth="2.5" />
            <line x1="8" y1="62" x2="28" y2="62" stroke="#64748B" strokeWidth="2.5" />
            <line x1="8" y1="120" x2="28" y2="120" stroke="#64748B" strokeWidth="2.5" />
          </g>
          {/* Lower-right molecular network */}
          <g opacity="0.16" stroke="#64748B" strokeWidth="2">
            <circle cx="670" cy="790" r="12" />
            <circle cx="730" cy="835" r="9" />
            <circle cx="635" cy="855" r="8" />
            <circle cx="705" cy="915" r="11" />
            <line x1="680" y1="798" x2="722" y2="829" />
            <line x1="661" y1="800" x2="640" y2="848" />
            <line x1="726" y1="844" x2="709" y2="904" />
            <line x1="643" y1="860" x2="695" y2="910" />
          </g>

          {/* Bottom-Left Ornamental Blue Medallion (placed neatly in bottom corner) */}
          <g transform="translate(46, 1082)">
            <circle cx="0" cy="0" r="22" fill="#1E3A5F" stroke="#0F172A" strokeWidth="1.8" />
            <circle cx="0" cy="0" r="17" fill="none" stroke="#93C5FD" strokeWidth="1.3" />
            <ellipse cx="0" cy="0" rx="12" ry="5.5" transform="rotate(-35)" stroke="#E0F2FE" strokeWidth="1.5" />
            <ellipse cx="0" cy="0" rx="12" ry="5.5" transform="rotate(35)" stroke="#E0F2FE" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="2.4" fill="#FDE047" />
          </g>

          {/* Bottom-Right Ornamental Blue Medallion (placed neatly in bottom corner) */}
          <g transform="translate(748, 1082)">
            <circle cx="0" cy="0" r="22" fill="#1E3A5F" stroke="#0F172A" strokeWidth="1.8" />
            <circle cx="0" cy="0" r="17" fill="none" stroke="#93C5FD" strokeWidth="1.3" />
            <ellipse cx="0" cy="0" rx="12" ry="5.5" transform="rotate(-35)" stroke="#E0F2FE" strokeWidth="1.5" />
            <ellipse cx="0" cy="0" rx="12" ry="5.5" transform="rotate(35)" stroke="#E0F2FE" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="2.4" fill="#FDE047" />
          </g>
        </svg>

        <div style={{position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <SustCrestSvg size={102} variant="classic" />
          <div style={{fontFamily: serifFont, fontSize: '25.5px', fontWeight: 700, color: '#0F172A', marginTop: '10px', lineHeight: 1.2}}>
            {data.universityName}
          </div>
          <div style={{fontFamily: serifFont, fontSize: '20px', color: '#1E293B', marginTop: '4px'}}>
            {deptLine}
          </div>

          {/* DNA Helix Horizontal Divider */}
          <div style={{display: 'flex', alignItems: 'center', gap: '12px', width: '520px', marginTop: '10px'}}>
            <div style={{flex: 1, height: '2.5px', background: 'linear-gradient(90deg, transparent, #475569)'}} />
            <svg width="96" height="22" viewBox="0 0 96 22" fill="none">
              <path d="M4 5 C20 18 36 18 48 11 C60 4 76 4 92 17" stroke="#64748B" strokeWidth="2.4" />
              <path d="M4 17 C20 4 36 4 48 11 C60 18 76 18 92 5" stroke="#94A3B8" strokeWidth="2.4" />
              <line x1="18" y1="8" x2="18" y2="14" stroke="#475569" strokeWidth="1.6" />
              <line x1="33" y1="7" x2="33" y2="15" stroke="#475569" strokeWidth="1.6" />
              <line x1="63" y1="7" x2="63" y2="15" stroke="#475569" strokeWidth="1.6" />
              <line x1="78" y1="8" x2="78" y2="14" stroke="#475569" strokeWidth="1.6" />
            </svg>
            <div style={{flex: 1, height: '2.5px', background: 'linear-gradient(90deg, #475569, transparent)'}} />
          </div>
        </div>

        {/* Clean Unboxed Centered Course Info */}
        <div style={{position: 'relative', zIndex: 1, margin: '20px auto 0 auto', maxWidth: '540px'}}>
          {renderCourseLines('#0F172A', '#0F172A', serifFont, '17px')}
        </div>

        {/* Classic Shadowed Serif Heading */}
        <div style={{position: 'relative', zIndex: 1, textAlign: 'center', margin: '34px 0 34px 0'}}>
          <h1
            style={{
              fontFamily: serifFont,
              fontSize: '43px',
              fontWeight: 700,
              letterSpacing: '0.07em',
              color: '#1E293B',
              textShadow: '2px 2px 0 #CBD5E1',
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {titleUpper}
          </h1>
        </div>

        <div style={{position: 'relative', zIndex: 1, marginBottom: '26px'}}>
          {renderTwoColumnPeople('#64748B', {teacherBold: true})}
        </div>

        <div style={{position: 'relative', zIndex: 1, marginTop: 'auto', paddingBottom: '48px'}}>
          {renderBottomMetadata('#0F172A', '#1E293B', serifFont, '16px')}
        </div>
      </div>
    );
  }

  // =========================================================================
  // DESIGN 3: TEAL FLOWING WAVE MODERN (Page 3)
  // =========================================================================
  if (activeDesign === 'teal-wave-modern') {
    return (
      <div
        id={id}
        style={{
          width: '794px',
          height: '1123px',
          backgroundColor: '#FFFFFF',
          color: '#0F172A',
          position: 'relative',
          overflow: 'hidden',
          padding: '74px 56px 104px 56px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top Flowing Multi-Strand Teal Waves */}
        <svg width="794" height="105" viewBox="0 0 794 105" fill="none" style={{position: 'absolute', top: 0, left: 0, pointerEvents: 'none'}}>
          <path d="M-10 38 C160 88, 320 92, 480 44 C610 6, 700 16, 804 52" stroke="#0E7490" strokeWidth="1.8" opacity="0.85" />
          <path d="M-10 47 C160 96, 325 99, 485 52 C615 14, 705 24, 804 60" stroke="#0284C7" strokeWidth="1.6" opacity="0.7" />
          <path d="M-10 56 C165 102, 330 104, 490 60 C620 22, 710 32, 804 68" stroke="#14B8A6" strokeWidth="1.4" opacity="0.65" />
          <path d="M-10 65 C170 106, 335 106, 495 68 C625 30, 715 40, 804 76" stroke="#38BDF8" strokeWidth="1.2" opacity="0.55" />
          <path d="M-10 74 C175 108, 340 108, 500 76 C630 38, 720 48, 804 84" stroke="#0F766E" strokeWidth="1.1" opacity="0.45" />
        </svg>

        {/* Bottom Flowing Multi-Strand Teal Waves (positioned cleanly below metadata) */}
        <svg width="794" height="76" viewBox="0 0 794 76" fill="none" style={{position: 'absolute', bottom: 0, left: 0, pointerEvents: 'none'}}>
          <path d="M-10 56 C170 20, 330 18, 490 50 C620 74, 710 68, 804 42" stroke="#0E7490" strokeWidth="1.8" opacity="0.85" />
          <path d="M-10 49 C170 14, 335 12, 495 44 C625 68, 715 62, 804 36" stroke="#0284C7" strokeWidth="1.6" opacity="0.7" />
          <path d="M-10 42 C175 8, 340 6, 500 38 C630 62, 720 56, 804 30" stroke="#14B8A6" strokeWidth="1.4" opacity="0.65" />
          <path d="M-10 35 C180 4, 345 4, 505 32 C635 56, 725 50, 804 24" stroke="#38BDF8" strokeWidth="1.2" opacity="0.55" />
          <path d="M-10 28 C185 2, 350 2, 510 26 C640 50, 730 44, 804 18" stroke="#0F766E" strokeWidth="1.1" opacity="0.45" />
        </svg>

        <div style={{position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <SustCrestSvg size={94} variant="classic" />
          <div style={{fontFamily: sansFont, fontSize: '23px', fontWeight: 700, color: '#0F172A', marginTop: '12px', lineHeight: 1.2}}>
            {data.universityName}
          </div>
          <div style={{fontFamily: sansFont, fontSize: '17px', fontWeight: 500, color: '#334155', marginTop: '4px'}}>
            {deptLine}
          </div>
        </div>

        {/* Teal-Bordered Rounded Course Capsule */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            margin: '26px auto 0 auto',
            minWidth: '500px',
            maxWidth: '610px',
            backgroundColor: '#FFFFFF',
            border: '1.8px solid #0E7490',
            borderRadius: '14px',
            padding: '15px 28px',
            boxShadow: '0 6px 16px rgba(14, 116, 144, 0.1)',
          }}
        >
          {renderCourseLines('#0F172A', '#0F172A', sansFont, '15.5px')}
        </div>

        {/* Bold Navy Sans Title with Two-Tone Bar Accent */}
        <div style={{position: 'relative', zIndex: 1, textAlign: 'center', margin: '30px 0 28px 0'}}>
          <h1
            style={{
              fontFamily: sansFont,
              fontSize: '42px',
              fontWeight: 800,
              letterSpacing: '0.03em',
              color: '#0F2942',
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {titleUpper}
          </h1>
          <div style={{display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '10px'}}>
            <div style={{width: '130px', height: '5px', borderRadius: '999px', backgroundColor: '#0F2942'}} />
            <div style={{width: '62px', height: '5px', borderRadius: '999px', backgroundColor: '#D97706'}} />
          </div>
        </div>

        {/* Side-by-Side Rounded Cards */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '22px',
            fontFamily: sansFont,
          }}
        >
          <div
            style={{
              border: '1.4px solid #CBD5E1',
              borderRadius: '14px',
              padding: '18px 22px',
              backgroundColor: '#FFFFFF',
              fontSize: '14.5px',
              lineHeight: 1.55,
            }}
          >
            <div style={{fontWeight: 700, fontSize: '16.5px', color: '#D97706', borderBottom: '1px solid #E2E8F0', paddingBottom: '6px', marginBottom: '10px'}}>
              Submitted to :
            </div>
            <div style={{fontWeight: 700, color: '#0F172A'}}>{data.teacherName}</div>
            <div>{data.teacherDesignation}</div>
            <div>{teacherDeptLine}</div>
            <div>{data.universityName}</div>
          </div>

          <div
            style={{
              border: '1.4px solid #CBD5E1',
              borderRadius: '14px',
              padding: '18px 22px',
              backgroundColor: '#FFFFFF',
              fontSize: '14.5px',
              lineHeight: 1.55,
            }}
          >
            <div style={{fontWeight: 700, fontSize: '16.5px', color: '#0E7490', borderBottom: '1px solid #E2E8F0', paddingBottom: '6px', marginBottom: '10px'}}>
              Submitted by :
            </div>
            <div>
              <strong>Name : </strong>
              <span>{data.studentName}</span>
            </div>
            <div>
              <strong>Reg. No. : </strong>
              <span>{data.registrationNo}</span>
            </div>
            {showGroup && (
              <div>
                <strong>Group : </strong>
                <span>{trimmedGroup}</span>
              </div>
            )}
            <div>
              <strong>Semester : </strong>
              <span>{data.semester}</span>
            </div>
            <div>
              <strong>Session : </strong>
              <span>{data.studentSession || data.session}</span>
            </div>
            <div>
              <strong>Department : </strong>
              <span>{data.department}</span>
            </div>
          </div>
        </div>

        <div style={{position: 'relative', zIndex: 1, marginTop: 'auto', paddingTop: '18px'}}>
          {renderBottomMetadata('#0F172A', '#334155', sansFont, '15px')}
        </div>
      </div>
    );
  }

  // =========================================================================
  // DESIGN 4: EMERALD HEXAGONAL FRAME (Page 4)
  // =========================================================================
  if (activeDesign === 'emerald-hex-frame') {
    return (
      <div
        id={id}
        style={{
          width: '794px',
          height: '1123px',
          backgroundColor: '#FFFFFF',
          color: '#0F172A',
          position: 'relative',
          overflow: 'hidden',
          padding: '44px 56px 48px 56px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Mint Green Hexagonal Clusters (Top-Right & Bottom-Left) */}
        <svg width="794" height="1123" viewBox="0 0 794 1123" fill="none" style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
          <g stroke="#6EB09C" strokeWidth="2.2" opacity="0.72">
            <polygon points="620,10 652,-8 684,10 684,46 652,64 620,46" fill="#E6F4EF" />
            <polygon points="684,10 716,-8 748,10 748,46 716,64 684,46" fill="#FFFFFF" />
            <polygon points="588,64 620,46 652,64 652,100 620,118 588,100" fill="#F0F9F6" />
            <polygon points="652,64 684,46 716,64 716,100 684,118 652,100" fill="#D5ECE4" />
            <polygon points="716,64 748,46 780,64 780,100 748,118 716,100" fill="#E6F4EF" />
            <polygon points="748,118 780,100 812,118 812,154 780,172 748,154" fill="#CBE7DD" />

            <polygon points="24,1010 56,992 88,1010 88,1046 56,1064 24,1046" fill="#D5ECE4" />
            <polygon points="88,1010 120,992 152,1010 152,1046 120,1064 88,1046" fill="#E6F4EF" />
            <polygon points="152,1010 184,992 216,1010 216,1046 184,1064 152,1046" fill="#F0F9F6" />
            <polygon points="56,1064 88,1046 120,1064 120,1100 88,1118 56,1100" fill="#CBE7DD" />
            <polygon points="120,1064 152,1046 184,1064 184,1100 152,1118 120,1100" fill="#E6F4EF" />
          </g>
        </svg>

        <div style={{position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <SustCrestSvg size={94} variant="classic" />
          <div style={{fontFamily: sansFont, fontSize: '20.5px', fontWeight: 800, color: '#0F172A', marginTop: '12px', letterSpacing: '0.02em', textTransform: 'uppercase'}}>
            {data.universityName}
          </div>
          <div style={{fontFamily: serifFont, fontStyle: 'italic', fontSize: '18.5px', color: '#1E293B', marginTop: '4px'}}>
            {deptLine}
          </div>
        </div>

        {/* Bracketed Course Frame */}
        <div style={{position: 'relative', zIndex: 1, margin: '24px auto 0 auto', width: '560px', padding: '6px'}}>
          {/* Top/Bottom Dark Emerald Corner Brackets */}
          <div style={{position: 'absolute', top: 0, left: 0, width: '38px', height: '24px', borderTop: '5px solid #145349', borderLeft: '5px solid #145349', borderTopLeftRadius: '10px'}} />
          <div style={{position: 'absolute', top: 0, right: 0, width: '38px', height: '24px', borderTop: '5px solid #145349', borderRight: '5px solid #145349', borderTopRightRadius: '10px'}} />
          <div style={{position: 'absolute', bottom: 0, left: 0, width: '38px', height: '24px', borderBottom: '5px solid #145349', borderLeft: '5px solid #145349', borderBottomLeftRadius: '10px'}} />
          <div style={{position: 'absolute', bottom: 0, right: 0, width: '38px', height: '24px', borderBottom: '5px solid #145349', borderRight: '5px solid #145349', borderBottomRightRadius: '10px'}} />

          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #64748B',
              borderRadius: '10px',
              padding: '15px 30px',
            }}
          >
            {renderCourseLines('#0F172A', '#0F172A', sansFont, '15.5px')}
          </div>
        </div>

        {/* Title with Soft Mint Highlight Underline Band */}
        <div style={{position: 'relative', zIndex: 1, textAlign: 'center', margin: '30px 0 28px 0'}}>
          <div style={{position: 'relative', display: 'inline-block', padding: '0 22px'}}>
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: '4px',
                height: '16px',
                background: 'linear-gradient(90deg, rgba(167,199,190,0.4), #8DB9AC, rgba(167,199,190,0.4))',
                borderRadius: '4px',
                zIndex: 0,
              }}
            />
            <h1
              style={{
                position: 'relative',
                zIndex: 1,
                fontFamily: sansFont,
                fontSize: '40px',
                fontWeight: 800,
                letterSpacing: '0.03em',
                color: '#1E293B',
                margin: 0,
                lineHeight: 1.08,
              }}
            >
              {titleUpper}
            </h1>
          </div>
        </div>

        {/* Dual Soft Cards */}
        <div style={{position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', fontFamily: sansFont}}>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1.4px solid #94A3B8',
              borderRadius: '14px',
              padding: '18px 22px',
              boxShadow: '0 6px 14px rgba(15, 23, 42, 0.06)',
              fontSize: '14.5px',
              lineHeight: 1.52,
            }}
          >
            <div style={{fontWeight: 700, fontSize: '17px', marginBottom: '8px'}}>Submitted to :</div>
            <div style={{fontWeight: 700}}>{data.teacherName}</div>
            <div>{data.teacherDesignation}</div>
            <div>{teacherDeptLine}</div>
            <div>{data.universityName}</div>
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1.4px solid #94A3B8',
              borderRadius: '14px',
              padding: '18px 22px',
              boxShadow: '0 6px 14px rgba(15, 23, 42, 0.06)',
              fontSize: '14.5px',
              lineHeight: 1.52,
            }}
          >
            <div style={{fontWeight: 700, fontSize: '17px', marginBottom: '8px'}}>Submitted by :</div>
            <div>
              <strong>Name : </strong>
              <span>{data.studentName}</span>
            </div>
            <div>
              <strong>Reg. No. : </strong>
              <span>{data.registrationNo}</span>
            </div>
            {showGroup && (
              <div>
                <strong>Group : </strong>
                <span>{trimmedGroup}</span>
              </div>
            )}
            <div>
              <strong>Semester : </strong>
              <span>{data.semester}</span>
            </div>
            <div>
              <strong>Session : </strong>
              <span>{data.studentSession || data.session}</span>
            </div>
            <div>
              <strong>Department : </strong>
              <span>{data.department}</span>
            </div>
          </div>
        </div>

        {/* Bold Dark Emerald Pill Box for Bottom Metadata */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            marginTop: 'auto',
            border: '4.5px solid #114B42',
            borderRadius: '22px',
            backgroundColor: '#FFFFFF',
            padding: '18px 28px',
            boxShadow: '0 6px 16px rgba(17, 75, 66, 0.1)',
          }}
        >
          {renderBottomMetadata('#0F172A', '#1E293B', sansFont, '15px')}
        </div>
      </div>
    );
  }

  // =========================================================================
  // DESIGN 5: EXECUTIVE EDITORIAL STRIPE (Page 5)
  // =========================================================================
  if (activeDesign === 'executive-editorial-stripe') {
    const words = titleUpper.split(' ');
    return (
      <div
        id={id}
        style={{
          width: '794px',
          height: '1123px',
          backgroundColor: '#FFFFFF',
          color: '#0F172A',
          position: 'relative',
          overflow: 'hidden',
          padding: '44px 56px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top Navy + Gold Double Rule */}
        <div>
          <div style={{height: '5px', backgroundColor: '#0F2942'}} />
          <div style={{height: '1.5px', backgroundColor: '#B48A3E', marginTop: '3px'}} />
        </div>

        {/* Left-Aligned Masthead */}
        <div style={{display: 'flex', alignItems: 'center', gap: '20px', marginTop: '24px', paddingBottom: '20px', borderBottom: '1px solid #E2E8F0'}}>
          <SustCrestSvg size={82} variant="classic" />
          <div>
            <div style={{fontFamily: sansFont, fontSize: '23px', fontWeight: 800, color: '#0F172A', lineHeight: 1.2}}>
              {data.universityName}
            </div>
            <div style={{fontFamily: sansFont, fontSize: '16px', color: '#475569', marginTop: '4px'}}>
              {deptLine}
            </div>
          </div>
        </div>

        {/* Oversized Editorial Two-Line Title */}
        <div style={{marginTop: '28px', marginBottom: '18px'}}>
          <h1
            style={{
              fontFamily: sansFont,
              fontSize: words.length > 1 ? '66px' : '54px',
              fontWeight: 800,
              color: '#0F2942',
              lineHeight: 0.98,
              letterSpacing: '-0.01em',
              margin: 0,
            }}
          >
            {words.length > 1 ? (
              <>
                {words[0]}
                <br />
                {words.slice(1).join(' ')}
              </>
            ) : (
              titleUpper
            )}
          </h1>
          <div style={{display: 'flex', alignItems: 'center', marginTop: '12px'}}>
            <div style={{width: '320px', height: '3px', backgroundColor: '#991B1B'}} />
            <div style={{flex: 1, height: '1px', backgroundColor: '#CBD5E1'}} />
          </div>
        </div>

        {/* Clean Unboxed Course Lines */}
        <div style={{padding: '8px 0 22px 0', borderBottom: '1px solid #E2E8F0', marginBottom: '26px'}}>
          {renderCourseLines('#0F172A', '#0F172A', sansFont, '16px')}
        </div>

        {/* Two Columns with Crimson Headings */}
        <div style={{marginBottom: '28px'}}>
          {renderTwoColumnPeople('#CBD5E1', {
            fontFamily: sansFont,
            fontSize: '15px',
            teacherBold: true,
            headerColor: '#991B1B',
          })}
        </div>

        {/* Soft Stone Rounded Bottom Box */}
        <div
          style={{
            marginTop: 'auto',
            marginBottom: '24px',
            backgroundColor: '#F3F2EE',
            border: '1.5px solid #475569',
            borderRadius: '12px',
            padding: '18px 24px',
          }}
        >
          {renderBottomMetadata('#0F172A', '#1E293B', sansFont, '15.5px')}
        </div>

        {/* Bottom Gold + Navy Double Rule */}
        <div>
          <div style={{height: '1.5px', backgroundColor: '#B48A3E', marginBottom: '3px'}} />
          <div style={{height: '5px', backgroundColor: '#0F2942'}} />
        </div>
      </div>
    );
  }

  // =========================================================================
  // DESIGN 6: DIAGONAL TEAL RIBBON & CARDS (Page 6)
  // =========================================================================
  if (activeDesign === 'diagonal-teal-cards') {
    return (
      <div
        id={id}
        style={{
          width: '794px',
          height: '1123px',
          backgroundColor: '#F5F9FA',
          color: '#0F172A',
          position: 'relative',
          overflow: 'hidden',
          padding: '44px 54px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Diagonal Geometric Corner Ribbons */}
        <svg width="794" height="1123" viewBox="0 0 794 1123" fill="none" style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
          <polygon points="575,0 794,0 794,155" fill="#7BC8D2" opacity="0.65" />
          <polygon points="655,0 794,0 794,105" fill="#0E7490" opacity="0.88" />
          <polygon points="0,965 215,1123 0,1123" fill="#7BC8D2" opacity="0.65" />
          <polygon points="0,1025 135,1123 0,1123" fill="#0E7490" opacity="0.88" />
        </svg>

        {/* Left-Aligned Header */}
        <div style={{position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '18px', paddingBottom: '18px', borderBottom: '1.8px solid #0E7490'}}>
          <SustCrestSvg size={82} variant="classic" />
          <div>
            <div style={{fontFamily: sansFont, fontSize: '21.5px', fontWeight: 700, color: '#0F2942', lineHeight: 1.2}}>
              {data.universityName}
            </div>
            <div style={{fontFamily: sansFont, fontSize: '15.5px', fontWeight: 500, color: '#0E7490', marginTop: '4px'}}>
              {deptLine}
            </div>
          </div>
        </div>

        {/* Left-Teal-Bordered Course Card */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            marginTop: '24px',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            borderLeft: '6px solid #0E7490',
            padding: '16px 24px',
            boxShadow: '0 8px 20px rgba(15, 23, 42, 0.06)',
          }}
        >
          {renderCourseLines('#0F172A', '#0F172A', sansFont, '15.5px')}
        </div>

        {/* Large Left-Aligned Title with Teal Pill Underline */}
        <div style={{position: 'relative', zIndex: 1, margin: '26px 0 28px 0'}}>
          <h1 style={{fontFamily: sansFont, fontSize: '46px', fontWeight: 800, color: '#0F2942', margin: 0, lineHeight: 1.08}}>
            {data.coverType}
          </h1>
          <div style={{width: '320px', height: '6px', borderRadius: '999px', backgroundColor: '#0E7490', marginTop: '8px'}} />
        </div>

        {/* Two Floating White Cards with Teal Pill Tabs */}
        <div style={{position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', fontFamily: sansFont}}>
          <div style={{position: 'relative', paddingTop: '14px'}}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '16px',
                backgroundColor: '#0E7490',
                color: '#FFFFFF',
                fontSize: '13.5px',
                fontWeight: 700,
                padding: '5px 18px',
                borderRadius: '999px',
                boxShadow: '0 4px 10px rgba(14, 116, 144, 0.25)',
              }}
            >
              Submitted to :
            </div>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                padding: '28px 22px 22px 22px',
                boxShadow: '0 8px 22px rgba(15, 23, 42, 0.07)',
                border: '1px solid #E2E8F0',
                fontSize: '14.5px',
                lineHeight: 1.55,
                height: '100%',
                boxSizing: 'border-box',
              }}
            >
              <div style={{fontWeight: 700, fontSize: '15.5px'}}>{data.teacherName}</div>
              <div>{data.teacherDesignation}</div>
              <div>{teacherDeptLine}</div>
              <div>{data.universityName}</div>
            </div>
          </div>

          <div style={{position: 'relative', paddingTop: '14px'}}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '16px',
                backgroundColor: '#0E7490',
                color: '#FFFFFF',
                fontSize: '13.5px',
                fontWeight: 700,
                padding: '5px 18px',
                borderRadius: '999px',
                boxShadow: '0 4px 10px rgba(14, 116, 144, 0.25)',
              }}
            >
              Submitted by :
            </div>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                padding: '28px 22px 22px 22px',
                boxShadow: '0 8px 22px rgba(15, 23, 42, 0.07)',
                border: '1px solid #E2E8F0',
                fontSize: '14.5px',
                lineHeight: 1.55,
                height: '100%',
                boxSizing: 'border-box',
              }}
            >
              <div>
                <strong>Name : </strong>
                <span>{data.studentName}</span>
              </div>
              <div>
                <strong>Reg. No. : </strong>
                <span>{data.registrationNo}</span>
              </div>
              {showGroup && (
                <div>
                  <strong>Group : </strong>
                  <span>{trimmedGroup}</span>
                </div>
              )}
              <div>
                <strong>Semester : </strong>
                <span>{data.semester}</span>
              </div>
              <div>
                <strong>Session : </strong>
                <span>{data.studentSession || data.session}</span>
              </div>
              <div>
                <strong>Department : </strong>
                <span>{data.department}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Floating White Card with Left Accent Bar */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            marginTop: 'auto',
            backgroundColor: '#FFFFFF',
            borderRadius: '14px',
            borderLeft: '6px solid #0E7490',
            padding: '20px 26px',
            boxShadow: '0 8px 22px rgba(15, 23, 42, 0.07)',
          }}
        >
          {renderBottomMetadata('#0F172A', '#334155', sansFont, '15.5px')}
        </div>
      </div>
    );
  }

  // =========================================================================
  // DESIGN 7: NAVY SIDEBAR & CRIMSON ACCENT (Page 7)
  // =========================================================================
  if (activeDesign === 'navy-crimson-minimal') {
    return (
      <div
        id={id}
        style={{
          width: '794px',
          height: '1123px',
          backgroundColor: '#FFFFFF',
          color: '#0F172A',
          position: 'relative',
          overflow: 'hidden',
          padding: '46px 64px 52px 54px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Solid Charcoal/Navy Vertical Bar on Right Edge */}
        <div style={{position: 'absolute', top: '24px', right: '20px', bottom: '24px', width: '10px', backgroundColor: '#1E293B'}} />

        {/* Subtle Light Hexagonal Watermarks */}
        <svg width="794" height="1123" viewBox="0 0 794 1123" fill="none" style={{position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.14}}>
          <g stroke="#64748B" strokeWidth="2.5">
            <polygon points="560,60 610,32 660,60 660,116 610,144 560,116" />
            <polygon points="660,116 710,88 760,116 760,172 710,200 660,172" />
            <polygon points="40,940 86,914 132,940 132,992 86,1018 40,992" />
            <polygon points="132,992 178,966 224,992 224,1044 178,1070 132,1044" />
          </g>
        </svg>

        <div style={{position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <SustCrestSvg size={88} variant="classic" />
          <div style={{fontFamily: sansFont, fontSize: '23px', fontWeight: 700, color: '#0F2744', marginTop: '12px', lineHeight: 1.2}}>
            {data.universityName}
          </div>
          <div style={{fontFamily: serifFont, fontStyle: 'italic', fontSize: '17.5px', color: '#0E7490', marginTop: '4px'}}>
            {deptLine}
          </div>
        </div>

        {/* Crisp Rounded Slate Course Card */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            margin: '24px auto 0 auto',
            width: '560px',
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #334155',
            borderRadius: '12px',
            padding: '15px 28px',
          }}
        >
          {renderCourseLines('#0F172A', '#0F172A', sansFont, '15.5px')}
        </div>

        {/* Solid Dark Navy Rectangular Banner */}
        <div style={{position: 'relative', zIndex: 1, margin: '28px auto 30px auto', width: '480px'}}>
          <div
            style={{
              backgroundColor: '#0F2744',
              color: '#FFFFFF',
              borderRadius: '6px',
              padding: '12px 24px',
              textAlign: 'center',
              fontFamily: sansFont,
              fontSize: '30px',
              fontWeight: 700,
              letterSpacing: '0.16em',
            }}
          >
            {titleUpper}
          </div>
        </div>

        {/* Two Cards with Left Navy Accent Strip */}
        <div style={{position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '26px', fontFamily: sansFont}}>
          <div style={{borderLeft: '3.5px solid #0F2744', backgroundColor: '#FFFFFF', padding: '8px 14px 8px 18px', fontSize: '14.5px', lineHeight: 1.55}}>
            <div style={{fontWeight: 700, fontSize: '14px', letterSpacing: '0.06em', color: '#0F2744', marginBottom: '10px'}}>
              SUBMITTED TO
            </div>
            <div style={{fontWeight: 700}}>{data.teacherName}</div>
            <div>{data.teacherDesignation}</div>
            <div>{teacherDeptLine}</div>
            <div>{data.universityName}</div>
          </div>

          <div style={{borderLeft: '3.5px solid #0F2744', backgroundColor: '#FFFFFF', padding: '8px 14px 8px 18px', fontSize: '14.5px', lineHeight: 1.55}}>
            <div style={{fontWeight: 700, fontSize: '14px', letterSpacing: '0.06em', color: '#0F2744', marginBottom: '10px'}}>
              SUBMITTED BY
            </div>
            <div>
              <strong>Name : </strong>
              <span>{data.studentName}</span>
            </div>
            <div>
              <strong>Reg. No. : </strong>
              <span>{data.registrationNo}</span>
            </div>
            {showGroup && (
              <div>
                <strong>Group : </strong>
                <span>{trimmedGroup}</span>
              </div>
            )}
            <div>
              <strong>Semester : </strong>
              <span>{data.semester}</span>
            </div>
            <div>
              <strong>Session : </strong>
              <span>{data.studentSession || data.session}</span>
            </div>
            <div>
              <strong>Department : </strong>
              <span>{data.department}</span>
            </div>
          </div>
        </div>

        {/* Bottom Crimson-Bordered Metadata Box */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            marginTop: 'auto',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderLeft: '4px solid #B91C1C',
            padding: '18px 24px',
          }}
        >
          {renderBottomMetadata('#0F172A', '#334155', sansFont, '15px')}
        </div>
      </div>
    );
  }

  // =========================================================================
  // DESIGN 8: MAROON & GOLD BOTANICAL DNA (Page 8)
  // =========================================================================
  if (activeDesign === 'maroon-gold-dna-ornate') {
    return (
      <div
        id={id}
        style={{
          width: '794px',
          height: '1123px',
          backgroundColor: '#FFFFFF',
          color: '#1C1917',
          position: 'relative',
          overflow: 'hidden',
          padding: '48px 56px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Double Maroon & Gold Outer Border */}
        <div style={{position: 'absolute', inset: '20px', border: '2.5px solid #5C1D24', pointerEvents: 'none'}} />
        <div style={{position: 'absolute', inset: '27px', border: '1.2px solid #B89352', pointerEvents: 'none'}} />

        <div style={{position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <SustCrestSvg size={86} variant="ornamental" />
          <div style={{fontFamily: serifFont, fontSize: '24px', fontWeight: 700, color: '#451217', marginTop: '10px', lineHeight: 1.2}}>
            {data.universityName}
          </div>
          <div style={{fontFamily: serifFont, fontStyle: 'italic', fontSize: '18.5px', color: '#44403C', marginTop: '4px'}}>
            {deptLine}
          </div>
        </div>

        {/* Cream Course Box with Ornate Maroon/Gold Top Header Strip */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            margin: '20px auto 0 auto',
            width: '560px',
            backgroundColor: '#FBF9F4',
            border: '1.5px solid #B89352',
            borderRadius: '6px',
            overflow: 'hidden',
          }}
        >
          <div style={{height: '10px', background: 'repeating-linear-gradient(45deg, #5C1D24, #5C1D24 8px, #B89352 8px, #B89352 12px)'}} />
          <div style={{padding: '14px 26px'}}>
            {renderCourseLines('#1C1917', '#5C1D24', serifFont, '16px')}
          </div>
        </div>

        {/* Ornamental Title Plaque */}
        <div style={{position: 'relative', zIndex: 1, textAlign: 'center', margin: '26px 0 26px 0'}}>
          <div
            style={{
              display: 'inline-block',
              border: '2px solid #B89352',
              outline: '1.5px solid #5C1D24',
              outlineOffset: '3px',
              backgroundColor: '#FFFDF8',
              padding: '8px 40px',
            }}
          >
            <h1 style={{fontFamily: serifFont, fontSize: '36px', fontWeight: 700, color: '#5C1D24', letterSpacing: '0.06em', margin: 0, lineHeight: 1.1}}>
              {titleUpper}
            </h1>
          </div>
        </div>

        {/* Two Columns with Ornate Vertical DNA Helix Divider */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 44px 1fr',
            gap: '14px',
            alignItems: 'center',
            fontFamily: serifFont,
            fontSize: '15px',
            lineHeight: 1.5,
          }}
        >
          <div style={{paddingRight: '4px'}}>
            <div style={{fontWeight: 700, fontSize: '16px', color: '#5C1D24', marginBottom: '8px'}}>SUBMITTED TO :</div>
            <div style={{fontWeight: 700}}>{data.teacherName}</div>
            <div>{data.teacherDesignation}</div>
            <div>{teacherDeptLine}</div>
            <div>{data.universityName}</div>
          </div>

          {/* Vertical DNA Strand */}
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <svg width="28" height="225" viewBox="0 0 28 225" fill="none">
              <path d="M5 4 C24 26 24 52 5 74 C24 96 24 122 5 144 C24 166 24 192 5 218" stroke="#5C1D24" strokeWidth="2.8" />
              <path d="M23 4 C4 26 4 52 23 74 C4 96 4 122 23 144 C4 166 4 192 23 218" stroke="#B89352" strokeWidth="2.8" />
              <line x1="7" y1="22" x2="21" y2="22" stroke="#5C1D24" strokeWidth="1.6" />
              <line x1="7" y1="54" x2="21" y2="54" stroke="#5C1D24" strokeWidth="1.6" />
              <line x1="7" y1="92" x2="21" y2="92" stroke="#5C1D24" strokeWidth="1.6" />
              <line x1="7" y1="124" x2="21" y2="124" stroke="#5C1D24" strokeWidth="1.6" />
              <line x1="7" y1="162" x2="21" y2="162" stroke="#5C1D24" strokeWidth="1.6" />
              <line x1="7" y1="194" x2="21" y2="194" stroke="#5C1D24" strokeWidth="1.6" />
            </svg>
          </div>

          <div style={{paddingLeft: '4px'}}>
            <div style={{fontWeight: 700, fontSize: '16px', color: '#5C1D24', marginBottom: '8px'}}>SUBMITTED BY :</div>
            <div>
              <strong>Name : </strong>
              <span>{data.studentName}</span>
            </div>
            <div>
              <strong>Reg. No. : </strong>
              <span>{data.registrationNo}</span>
            </div>
            {showGroup && (
              <div>
                <strong>Group : </strong>
                <span>{trimmedGroup}</span>
              </div>
            )}
            <div>
              <strong>Semester : </strong>
              <span>{data.semester}</span>
            </div>
            <div>
              <strong>Session : </strong>
              <span>{data.studentSession || data.session}</span>
            </div>
            <div>
              <strong>Department : </strong>
              <span>{data.department}</span>
            </div>
          </div>
        </div>

        {/* Bottom Cream Plaque */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            margin: 'auto auto 8px auto',
            width: '540px',
            backgroundColor: '#FBF9F4',
            border: '1.8px solid #5C1D24',
            outline: '1.2px solid #B89352',
            outlineOffset: '3px',
            padding: '16px 26px',
          }}
        >
          {renderBottomMetadata('#1C1917', '#44403C', serifFont, '15px')}
        </div>
      </div>
    );
  }

  // =========================================================================
  // DESIGN 9: AQUA GLASS & DNA WATERMARK (Page 9)
  // =========================================================================
  if (activeDesign === 'aqua-glass-ribbon') {
    return (
      <div
        id={id}
        style={{
          width: '794px',
          height: '1123px',
          background: 'linear-gradient(155deg, #F8FCFD 0%, #EAF6F8 55%, #F2FAFB 100%)',
          color: '#0F172A',
          position: 'relative',
          overflow: 'hidden',
          padding: '48px 54px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Subtle Large Vertical DNA Watermark on Right */}
        <svg width="794" height="1123" viewBox="0 0 794 1123" fill="none" style={{position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.14}}>
          <g transform="translate(565, 20)">
            <path d="M20 0 C160 130 -40 280 120 420 C260 550 -20 710 130 870 C240 990 80 1070 40 1120" stroke="#0E7490" strokeWidth="14" />
            <path d="M160 0 C0 130 200 280 40 420 C-100 550 180 710 30 870 C-80 990 80 1070 120 1120" stroke="#38BDF8" strokeWidth="14" />
            <line x1="45" y1="80" x2="135" y2="80" stroke="#0E7490" strokeWidth="8" />
            <line x1="35" y1="180" x2="145" y2="180" stroke="#0E7490" strokeWidth="8" />
            <line x1="35" y1="310" x2="145" y2="310" stroke="#0E7490" strokeWidth="8" />
            <line x1="35" y1="530" x2="145" y2="530" stroke="#0E7490" strokeWidth="8" />
            <line x1="35" y1="740" x2="145" y2="740" stroke="#0E7490" strokeWidth="8" />
            <line x1="45" y1="940" x2="135" y2="940" stroke="#0E7490" strokeWidth="8" />
          </g>
        </svg>

        {/* Left-Aligned Header */}
        <div style={{position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '18px'}}>
          <SustCrestSvg size={82} variant="classic" />
          <div>
            <div style={{fontFamily: sansFont, fontSize: '23px', fontWeight: 700, color: '#094554', lineHeight: 1.2}}>
              {data.universityName}
            </div>
            <div style={{fontFamily: sansFont, fontSize: '16.5px', color: '#1E293B', marginTop: '4px'}}>
              {deptLine}
            </div>
          </div>
        </div>

        {/* Left-Bordered Frosted Course Block */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            marginTop: '24px',
            backgroundColor: 'rgba(219, 240, 244, 0.72)',
            borderLeft: '5px solid #094554',
            padding: '16px 24px',
          }}
        >
          {renderCourseLines('#0F172A', '#094554', sansFont, '15.5px')}
        </div>

        {/* Deep Teal Gradient Full-Width Banner Ribbon */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            margin: '28px 0 30px 0',
            background: 'linear-gradient(90deg, #094554 0%, #116273 75%, #16768A 100%)',
            borderRadius: '10px',
            borderLeft: '4px solid #C5A059',
            borderBottom: '3px solid #C5A059',
            padding: '16px 28px',
            color: '#FFFFFF',
            boxShadow: '0 8px 20px rgba(9, 69, 84, 0.2)',
          }}
        >
          <h1 style={{fontFamily: sansFont, fontSize: '32px', fontWeight: 700, letterSpacing: '0.12em', margin: 0, lineHeight: 1.1}}>
            {titleUpper}
          </h1>
          <div style={{fontFamily: sansFont, fontSize: '11.5px', letterSpacing: '0.16em', color: '#CFFAFE', marginTop: '6px', textTransform: 'uppercase'}}>
            {deptLine}
          </div>
        </div>

        {/* Elevated White Cards with Two-Tone Teal + Gold Top Bar */}
        <div style={{position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', fontFamily: sansFont}}>
          <div style={{backgroundColor: '#FFFFFF', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 8px 20px rgba(15, 23, 42, 0.08)', border: '1px solid #DCEEF2'}}>
            <div style={{display: 'flex', height: '5px'}}>
              <div style={{flex: 2, backgroundColor: '#0E7490'}} />
              <div style={{flex: 1, backgroundColor: '#C5A059'}} />
              <div style={{flex: 2, backgroundColor: '#0E7490'}} />
            </div>
            <div style={{padding: '18px 22px', fontSize: '14.5px', lineHeight: 1.55}}>
              <div style={{fontWeight: 700, fontSize: '15px', color: '#094554', marginBottom: '10px'}}>SUBMITTED TO</div>
              <div style={{fontWeight: 700}}>{data.teacherName}</div>
              <div>{data.teacherDesignation}</div>
              <div>{teacherDeptLine}</div>
              <div>{data.universityName}</div>
            </div>
          </div>

          <div style={{backgroundColor: '#FFFFFF', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 8px 20px rgba(15, 23, 42, 0.08)', border: '1px solid #DCEEF2'}}>
            <div style={{display: 'flex', height: '5px'}}>
              <div style={{flex: 2, backgroundColor: '#0E7490'}} />
              <div style={{flex: 1, backgroundColor: '#C5A059'}} />
              <div style={{flex: 2, backgroundColor: '#0E7490'}} />
            </div>
            <div style={{padding: '18px 22px', fontSize: '14.5px', lineHeight: 1.55}}>
              <div style={{fontWeight: 700, fontSize: '15px', color: '#094554', marginBottom: '10px'}}>SUBMITTED BY</div>
              <div>
                <strong>Name : </strong>
                <span>{data.studentName}</span>
              </div>
              <div>
                <strong>Reg. No. : </strong>
                <span>{data.registrationNo}</span>
              </div>
              {showGroup && (
                <div>
                  <strong>Group : </strong>
                  <span>{trimmedGroup}</span>
                </div>
              )}
              <div>
                <strong>Semester : </strong>
                <span>{data.semester}</span>
              </div>
              <div>
                <strong>Session : </strong>
                <span>{data.studentSession || data.session}</span>
              </div>
              <div>
                <strong>Department : </strong>
                <span>{data.department}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            marginTop: 'auto',
            backgroundColor: 'rgba(255, 255, 255, 0.88)',
            border: '1.5px solid #B6DCE2',
            borderRadius: '10px',
            padding: '18px 24px',
          }}
        >
          {renderBottomMetadata('#0F172A', '#1E293B', sansFont, '15px')}
        </div>
      </div>
    );
  }

  // =========================================================================
  // DESIGN 10: NAVY & AMBER DIAGONAL SASH (Page 10)
  // =========================================================================
  if (activeDesign === 'navy-gold-diagonal-sash') {
    return (
      <div
        id={id}
        style={{
          width: '794px',
          height: '1123px',
          backgroundColor: '#FFFFFF',
          color: '#0F172A',
          position: 'relative',
          overflow: 'hidden',
          padding: '76px 56px 76px 56px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top & Bottom Angled Navy + Amber Sashes */}
        <svg width="794" height="68" viewBox="0 0 794 68" fill="none" style={{position: 'absolute', top: 0, left: 0, pointerEvents: 'none'}}>
          <polygon points="0,0 794,0 794,28 0,58" fill="#0F294A" />
          <polygon points="0,58 794,28 794,34 0,64" fill="#D97706" />
        </svg>
        <svg width="794" height="68" viewBox="0 0 794 68" fill="none" style={{position: 'absolute', bottom: 0, left: 0, pointerEvents: 'none'}}>
          <polygon points="0,34 794,4 794,10 0,40" fill="#D97706" />
          <polygon points="0,40 794,10 794,68 0,68" fill="#0F294A" />
        </svg>

        <div style={{position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <SustCrestSvg size={88} variant="classic" />
          <div style={{fontFamily: sansFont, fontSize: '23px', fontWeight: 700, color: '#0F172A', marginTop: '12px', lineHeight: 1.2}}>
            {data.universityName}
          </div>
          <div style={{fontFamily: sansFont, fontSize: '16.5px', fontWeight: 600, color: '#0F766E', marginTop: '4px'}}>
            {deptLine}
          </div>
        </div>

        {/* Lavender-Slate Course Box */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            margin: '24px auto 0 auto',
            width: '560px',
            backgroundColor: '#F3F4F8',
            border: '1.5px solid #334155',
            borderRadius: '8px',
            padding: '15px 26px',
          }}
        >
          {renderCourseLines('#0F172A', '#0F172A', sansFont, '15.5px')}
        </div>

        {/* Title Framed by Navy Top Bar + Amber Bottom Bar */}
        <div style={{position: 'relative', zIndex: 1, margin: '30px auto 30px auto', width: '480px', textAlign: 'center'}}>
          <div style={{height: '5px', backgroundColor: '#0F294A', marginBottom: '12px'}} />
          <h1 style={{fontFamily: sansFont, fontSize: '34px', fontWeight: 700, letterSpacing: '0.12em', color: '#0F172A', margin: 0, lineHeight: 1.1}}>
            {titleUpper}
          </h1>
          <div style={{height: '5px', backgroundColor: '#D97706', marginTop: '12px'}} />
        </div>

        {/* Two Columns with Solid Dark Navy Header Badges */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1.5px 1fr',
            gap: '24px',
            fontFamily: sansFont,
            fontSize: '14.5px',
            lineHeight: 1.55,
          }}
        >
          <div>
            <div style={{display: 'inline-block', backgroundColor: '#0F294A', color: '#FFFFFF', fontSize: '12.5px', fontWeight: 700, letterSpacing: '0.06em', padding: '5px 14px', marginBottom: '12px'}}>
              SUBMITTED TO
            </div>
            <div style={{fontWeight: 700}}>{data.teacherName}</div>
            <div>{data.teacherDesignation}</div>
            <div>{teacherDeptLine}</div>
            <div>{data.universityName}</div>
          </div>

          <div style={{backgroundColor: '#D97706', width: '1.5px', minHeight: '205px'}} />

          <div>
            <div style={{display: 'inline-block', backgroundColor: '#0F294A', color: '#FFFFFF', fontSize: '12.5px', fontWeight: 700, letterSpacing: '0.06em', padding: '5px 14px', marginBottom: '12px'}}>
              SUBMITTED BY
            </div>
            <div>
              <strong>Name : </strong>
              <span>{data.studentName}</span>
            </div>
            <div>
              <strong>Reg. No. : </strong>
              <span>{data.registrationNo}</span>
            </div>
            {showGroup && (
              <div>
                <strong>Group : </strong>
                <span>{trimmedGroup}</span>
              </div>
            )}
            <div>
              <strong>Semester : </strong>
              <span>{data.semester}</span>
            </div>
            <div>
              <strong>Session : </strong>
              <span>{data.studentSession || data.session}</span>
            </div>
            <div>
              <strong>Department : </strong>
              <span>{data.department}</span>
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            marginTop: 'auto',
            backgroundColor: '#F8FAFC',
            borderLeft: '4.5px solid #D97706',
            padding: '16px 24px',
          }}
        >
          {renderBottomMetadata('#0F172A', '#334155', sansFont, '15px')}
        </div>
      </div>
    );
  }

  // =========================================================================
  // DESIGN 11: FOREST GREEN ACADEMIC FRAME (Page 11)
  // =========================================================================
  if (activeDesign === 'forest-green-double-frame') {
    return (
      <div
        id={id}
        style={{
          width: '794px',
          height: '1123px',
          backgroundColor: '#FFFFFF',
          color: '#0F172A',
          position: 'relative',
          overflow: 'hidden',
          padding: '54px 60px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Full-Page Forest Green Frame with Thick Top & Bottom Bars */}
        <div style={{position: 'absolute', inset: '22px', border: '1.5px solid #1F5E4B', pointerEvents: 'none'}} />
        <div style={{position: 'absolute', top: '22px', left: '22px', right: '22px', height: '9px', backgroundColor: '#1F5E4B', pointerEvents: 'none'}} />
        <div style={{position: 'absolute', bottom: '22px', left: '22px', right: '22px', height: '9px', backgroundColor: '#1F5E4B', pointerEvents: 'none'}} />

        <div style={{position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <SustCrestSvg size={88} variant="classic" />
          <div style={{fontFamily: serifFont, fontSize: '24px', fontWeight: 700, color: '#0F172A', marginTop: '10px', lineHeight: 1.2}}>
            {data.universityName}
          </div>
          <div style={{fontFamily: serifFont, fontSize: '18.5px', color: '#1E293B', marginTop: '4px'}}>
            {deptLine}
          </div>
          <div style={{width: '480px', borderTop: '1.5px solid #1F5E4B', borderBottom: '1px solid #9FC4B5', height: '3px', marginTop: '12px'}} />
        </div>

        {/* Soft Mint Course Card */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            margin: '24px auto 0 auto',
            width: '540px',
            backgroundColor: '#F0F7F4',
            border: '1.2px solid #9FC4B5',
            borderRadius: '10px',
            padding: '15px 26px',
          }}
        >
          {renderCourseLines('#0F172A', '#0F172A', serifFont, '16px')}
        </div>

        {/* Underlined Forest-Green Serif Title */}
        <div style={{position: 'relative', zIndex: 1, textAlign: 'center', margin: '30px 0 30px 0'}}>
          <h1
            style={{
              display: 'inline-block',
              fontFamily: serifFont,
              fontSize: '38px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: '#1F5E4B',
              borderBottom: '2.5px solid #1F5E4B',
              paddingBottom: '4px',
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {titleUpper}
          </h1>
        </div>

        {/* Two Columns with Dashed Vertical Divider */}
        <div style={{position: 'relative', zIndex: 1, marginBottom: '30px'}}>
          {renderTwoColumnPeople('#64748B', {
            fontFamily: serifFont,
            fontSize: '15.5px',
            teacherBold: true,
            studentBold: true,
            dashed: true,
          })}
        </div>

        {/* Corner-Bracketed Soft Mint Bottom Box */}
        <div style={{position: 'relative', zIndex: 1, marginTop: 'auto', padding: '5px'}}>
          <div style={{position: 'absolute', top: 0, left: 0, width: '32px', height: '18px', borderTop: '2.5px solid #1F5E4B', borderLeft: '2.5px solid #1F5E4B'}} />
          <div style={{position: 'absolute', top: 0, right: 0, width: '32px', height: '18px', borderTop: '2.5px solid #1F5E4B', borderRight: '2.5px solid #1F5E4B'}} />
          <div style={{position: 'absolute', bottom: 0, left: 0, width: '32px', height: '18px', borderBottom: '2.5px solid #1F5E4B', borderLeft: '2.5px solid #1F5E4B'}} />
          <div style={{position: 'absolute', bottom: 0, right: 0, width: '32px', height: '18px', borderBottom: '2.5px solid #1F5E4B', borderRight: '2.5px solid #1F5E4B'}} />

          <div style={{backgroundColor: '#F0F7F4', padding: '16px 24px'}}>
            {renderBottomMetadata('#0F172A', '#1E293B', serifFont, '15px')}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // DESIGN 12: CLASSIC SERIF PURE (Page 12)
  // =========================================================================
  if (activeDesign === 'classic-serif-pure') {
    return (
      <div
        id={id}
        style={{
          width: '794px',
          height: '1123px',
          backgroundColor: '#FFFFFF',
          color: '#0F172A',
          position: 'relative',
          overflow: 'hidden',
          padding: '48px 58px 56px 58px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <SustCrestSvg size={102} variant="classic" />
          <div style={{fontFamily: serifFont, fontSize: '25px', fontWeight: 700, color: '#0F172A', marginTop: '12px', lineHeight: 1.2}}>
            {data.universityName}
          </div>
          <div style={{fontFamily: serifFont, fontSize: '20px', color: '#1E293B', marginTop: '4px'}}>
            {deptLine}
          </div>
        </div>

        {/* Classic Shaded Pill Capsule */}
        <div
          style={{
            margin: '28px auto 0 auto',
            minWidth: '480px',
            maxWidth: '580px',
            backgroundColor: '#E5E7EB',
            border: '1.5px solid #475569',
            borderRadius: '18px',
            padding: '15px 28px',
          }}
        >
          {renderCourseLines('#0F172A', '#0F172A', serifFont, '17px')}
        </div>

        {/* Classic Underlined Serif Title */}
        <div style={{textAlign: 'center', margin: '34px 0 34px 0'}}>
          <h1
            style={{
              display: 'inline-block',
              fontFamily: serifFont,
              fontSize: '42px',
              fontWeight: 700,
              color: '#0F172A',
              margin: 0,
              lineHeight: 1.12,
              borderBottom: '3px solid #0F172A',
              paddingBottom: '2px',
            }}
          >
            {data.coverType}
          </h1>
        </div>

        <div style={{marginBottom: '40px'}}>
          {renderTwoColumnPeople('#0F172A', {fontFamily: serifFont, fontSize: '16px'})}
        </div>

        <div style={{marginTop: 'auto'}}>
          {renderBottomMetadata('#0F172A', '#1E293B', serifFont, '16px')}
        </div>
      </div>
    );
  }

  // =========================================================================
  // DESIGN 13: BIO HELIX & LABWARE V2 (Page 13)
  // =========================================================================
  if (activeDesign === 'bio-helix-labware-v2') {
    return (
      <div
        id={id}
        style={{
          width: '794px',
          height: '1123px',
          background: 'linear-gradient(150deg, #FFFFFF 0%, #F4F9FA 58%, #EBF4F6 100%)',
          color: '#0F172A',
          position: 'relative',
          overflow: 'hidden',
          padding: '48px 56px 54px 56px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <svg width="794" height="1123" viewBox="0 0 794 1123" fill="none" style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
          {/* Top-right DNA double helix */}
          <g opacity="0.22" transform="translate(650, -10) rotate(22)">
            <path d="M0 0 C40 35 -40 75 0 110 C40 145 -40 185 0 220" stroke="#316879" strokeWidth="7" strokeLinecap="round" />
            <path d="M44 0 C4 35 84 75 44 110 C4 145 84 185 44 220" stroke="#538D9B" strokeWidth="7" strokeLinecap="round" />
            <line x1="12" y1="22" x2="34" y2="22" stroke="#316879" strokeWidth="3.5" />
            <line x1="8" y1="55" x2="36" y2="55" stroke="#316879" strokeWidth="3.5" />
            <line x1="10" y1="92" x2="34" y2="92" stroke="#316879" strokeWidth="3.5" />
            <line x1="12" y1="130" x2="34" y2="130" stroke="#316879" strokeWidth="3.5" />
          </g>
          {/* Left DNA */}
          <g opacity="0.18" transform="translate(10, 260) rotate(-18)">
            <path d="M0 0 C38 35 -38 75 0 110 C38 145 -38 185 0 220" stroke="#316879" strokeWidth="7" strokeLinecap="round" />
            <path d="M42 0 C4 35 80 75 42 110 C4 145 80 185 42 220" stroke="#538D9B" strokeWidth="7" strokeLinecap="round" />
            <line x1="10" y1="24" x2="32" y2="24" stroke="#316879" strokeWidth="3" />
            <line x1="8" y1="58" x2="34" y2="58" stroke="#316879" strokeWidth="3" />
            <line x1="10" y1="92" x2="32" y2="92" stroke="#316879" strokeWidth="3" />
          </g>
          {/* Hex lattices */}
          <g opacity="0.16" stroke="#316879" strokeWidth="2.5">
            <polygon points="36,630 56,618 76,630 76,654 56,666 36,654" />
            <polygon points="76,654 96,642 116,654 116,678 96,690 76,678" />
            <polygon points="710,500 730,488 750,500 750,524 730,536 710,524" />
            <polygon points="750,524 770,512 790,524 790,548 770,560 750,548" />
          </g>
          {/* Bottom-left DNA */}
          <g opacity="0.2" transform="translate(8, 880) rotate(25)">
            <path d="M0 0 C32 30 -32 65 0 95 C32 125 -32 160 0 190" stroke="#316879" strokeWidth="6" />
            <path d="M36 0 C4 30 68 65 36 95 C4 125 68 160 36 190" stroke="#538D9B" strokeWidth="6" />
          </g>
          {/* Bottom-Right Laboratory Glassware */}
          <g opacity="0.65" transform="translate(565, 920)">
            <rect x="20" y="54" width="22" height="106" rx="11" fill="#E2EFF2" stroke="#3E5C6B" strokeWidth="3.2" />
            <rect x="16" y="48" width="30" height="7" rx="3" fill="#CBD5E1" stroke="#3E5C6B" strokeWidth="2.4" />
            <path d="M22 104 H40 V149 C40 154 35 158 31 158 C27 158 22 154 22 149 Z" fill="#89B4C2" />

            <path d="M88 30 H106 V70 L134 150 C136 156 132 160 126 160 H68 C62 160 58 156 60 150 L88 70 Z" fill="#E6F2F4" stroke="#3E5C6B" strokeWidth="3.2" strokeLinejoin="round" />
            <path d="M68 128 L61 150 C59 156 63 160 68 160 H126 C131 160 135 156 133 150 L126 128 Z" fill="#7EAEC0" />
            <rect x="84" y="24" width="26" height="7" rx="3" fill="#CBD5E1" stroke="#3E5C6B" strokeWidth="2.4" />

            <path d="M158 84 H178 V106 L204 150 C207 156 203 160 197 160 H139 C133 160 129 156 132 150 L158 106 Z" fill="#E6F2F4" stroke="#3E5C6B" strokeWidth="3.2" strokeLinejoin="round" />
            <path d="M144 130 L133 150 C130 156 134 160 139 160 H197 C202 160 206 156 203 150 L192 130 Z" fill="#5D99AB" />
            <rect x="154" y="78" width="28" height="7" rx="3" fill="#CBD5E1" stroke="#3E5C6B" strokeWidth="2.4" />

            <circle cx="168" cy="54" r="6" fill="#90BDC9" />
            <circle cx="182" cy="34" r="9" fill="#90BDC9" />
            <circle cx="158" cy="18" r="5" fill="#90BDC9" />
          </g>
        </svg>

        <div style={{position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <SustCrestSvg size={100} variant="classic" />
          <div style={{fontFamily: serifFont, fontSize: '25px', fontWeight: 700, color: '#0F172A', marginTop: '12px', lineHeight: 1.2}}>
            {data.universityName}
          </div>
          <div style={{fontFamily: serifFont, fontSize: '20px', color: '#1E293B', marginTop: '4px'}}>
            {deptLine}
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            margin: '26px auto 0 auto',
            minWidth: '490px',
            maxWidth: '610px',
            backgroundColor: 'rgba(241, 245, 249, 0.94)',
            border: '1.5px solid #64748B',
            borderRadius: '18px',
            padding: '15px 28px',
            boxShadow: '0 6px 14px rgba(15, 23, 42, 0.08)',
          }}
        >
          {renderCourseLines('#0F172A', '#0F172A', serifFont, '16.5px')}
        </div>

        <div style={{position: 'relative', zIndex: 1, textAlign: 'center', margin: '34px 0 34px 0'}}>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: '12px', borderBottom: '4px solid #1E4E5F', paddingBottom: '6px'}}>
            <svg width="34" height="42" viewBox="0 0 38 44" fill="none">
              <path d="M6 4 C26 14 26 30 6 40" stroke="#1E4E5F" strokeWidth="4" strokeLinecap="round" />
              <path d="M32 4 C12 14 12 30 32 40" stroke="#316879" strokeWidth="4" strokeLinecap="round" />
              <line x1="10" y1="10" x2="28" y2="10" stroke="#1E4E5F" strokeWidth="2.2" />
              <line x1="13" y1="22" x2="25" y2="22" stroke="#1E4E5F" strokeWidth="2.2" />
              <line x1="10" y1="34" x2="28" y2="34" stroke="#1E4E5F" strokeWidth="2.2" />
            </svg>
            <h1 style={{fontFamily: sansFont, fontSize: '40px', fontWeight: 700, letterSpacing: '0.03em', color: '#1E4352', margin: 0, lineHeight: 1}}>
              {titleUpper}
            </h1>
          </div>
        </div>

        <div style={{position: 'relative', zIndex: 1, marginBottom: '40px'}}>
          {renderTwoColumnPeople('#0F172A', {fontFamily: serifFont, fontSize: '16px'})}
        </div>

        <div style={{position: 'relative', zIndex: 1, marginTop: 'auto', maxWidth: '520px'}}>
          {renderBottomMetadata('#0F172A', '#1E293B', serifFont, '16px')}
        </div>
      </div>
    );
  }

  // =========================================================================
  // DESIGN 14: CIRCUIT BOARD & MICROSCOPE (Page 14)
  // =========================================================================
  if (activeDesign === 'circuit-microscope-pipette') {
    return (
      <div
        id={id}
        style={{
          width: '794px',
          height: '1123px',
          background: 'linear-gradient(145deg, #FFFFFF 0%, #F1F5F8 60%, #E7EEF3 100%)',
          color: '#0F172A',
          position: 'relative',
          overflow: 'hidden',
          padding: '48px 56px 54px 56px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <svg width="794" height="1123" viewBox="0 0 794 1123" fill="none" style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
          {/* Top-left PCB traces */}
          <g stroke="#94A3B8" strokeWidth="2" opacity="0.65">
            <path d="M24 0 V95 L56 127 V220" />
            <circle cx="56" cy="224" r="4" fill="#FFFFFF" stroke="#64748B" strokeWidth="2" />
            <path d="M48 0 V70 L78 100 V185" />
            <circle cx="78" cy="189" r="4" fill="#FFFFFF" stroke="#64748B" strokeWidth="2" />
            <path d="M0 150 H30 L60 180 H110" />
            <circle cx="114" cy="180" r="4" fill="#FFFFFF" stroke="#64748B" strokeWidth="2" />
            <path d="M98 0 V48 L125 75 V130" />
            <circle cx="125" cy="134" r="4" fill="#FFFFFF" stroke="#64748B" strokeWidth="2" />
          </g>
          {/* Top-right PCB traces */}
          <g stroke="#94A3B8" strokeWidth="2" opacity="0.65">
            <path d="M770 0 V105 L736 139 V225" />
            <circle cx="736" cy="229" r="4" fill="#FFFFFF" stroke="#64748B" strokeWidth="2" />
            <path d="M744 0 V75 L712 107 V180" />
            <circle cx="712" cy="184" r="4" fill="#FFFFFF" stroke="#64748B" strokeWidth="2" />
            <path d="M794 140 H755 L720 175 H670" />
            <circle cx="666" cy="175" r="4" fill="#FFFFFF" stroke="#64748B" strokeWidth="2" />
            <path d="M685 0 V52 L650 87 H610" />
            <circle cx="606" cy="87" r="4" fill="#FFFFFF" stroke="#64748B" strokeWidth="2" />
          </g>
        </svg>

        <div style={{position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <SustCrestSvg size={100} variant="classic" />
          <div style={{fontFamily: serifFont, fontSize: '25px', fontWeight: 700, color: '#0F172A', marginTop: '12px', lineHeight: 1.2}}>
            {data.universityName}
          </div>
          <div style={{fontFamily: serifFont, fontSize: '20px', color: '#1E293B', marginTop: '4px'}}>
            {deptLine}
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            margin: '26px auto 0 auto',
            minWidth: '490px',
            maxWidth: '610px',
            backgroundColor: 'rgba(241, 245, 249, 0.94)',
            border: '1.5px solid #94A3B8',
            borderRadius: '18px',
            padding: '15px 28px',
            boxShadow: '0 6px 16px rgba(15, 23, 42, 0.08)',
          }}
        >
          {renderCourseLines('#0F172A', '#0F172A', serifFont, '16.5px')}
        </div>

        <div style={{position: 'relative', zIndex: 1, textAlign: 'center', margin: '36px 0 36px 0'}}>
          <h1 style={{fontFamily: sansFont, fontSize: '42px', fontWeight: 700, letterSpacing: '0.04em', color: '#1E293B', margin: 0, lineHeight: 1.1}}>
            {titleUpper}
          </h1>
        </div>

        <div style={{position: 'relative', zIndex: 1, marginBottom: '40px'}}>
          {renderTwoColumnPeople('#0F172A', {fontFamily: serifFont, fontSize: '16px'})}
        </div>

        <div style={{position: 'relative', zIndex: 1, marginTop: 'auto', maxWidth: '510px'}}>
          {renderBottomMetadata('#0F172A', '#1E293B', serifFont, '16px')}
        </div>
      </div>
    );
  }

  // =========================================================================
  // DESIGN 15: ROYAL TEAL & GOLD PLAQUES (Page 15)
  // =========================================================================
  if (activeDesign === 'royal-teal-gold-ornate') {
    return (
      <div
        id={id}
        style={{
          width: '794px',
          height: '1123px',
          background: 'linear-gradient(155deg, #F6FCFC 0%, #E7F3F5 55%, #F4FBFC 100%)',
          color: '#0F172A',
          position: 'relative',
          overflow: 'hidden',
          padding: '44px 54px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <svg width="794" height="1123" viewBox="0 0 794 1123" fill="none" style={{position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.14}}>
          <circle cx="85" cy="95" r="56" stroke="#2D6A73" strokeWidth="2.5" />
          <circle cx="85" cy="95" r="24" fill="#6497A0" />
          <circle cx="195" cy="48" r="26" stroke="#2D6A73" strokeWidth="2" />
          <circle cx="195" cy="48" r="10" fill="#6497A0" />
          <path d="M128 190 C138 205 138 220 128 235 M146 190 C136 205 136 220 146 235" stroke="#2D6A73" strokeWidth="5" strokeLinecap="round" />
          <circle cx="675" cy="110" r="18" fill="#5A8F99" />
          <path d="M675 92 L660 40 M690 100 L745 65 M692 118 L752 135 M665 126 L625 180 M678 128 L705 240" stroke="#487C85" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M740 310 C705 340 775 375 740 410 C705 445 775 480 740 515" stroke="#2D6A73" strokeWidth="3.5" fill="none" />
          <path d="M770 310 C805 340 735 375 770 410 C805 445 735 480 770 515" stroke="#5A8F99" strokeWidth="3.5" fill="none" />
          <path d="M40 450 C75 485 10 520 45 555 C80 590 15 625 50 660" stroke="#2D6A73" strokeWidth="3.5" fill="none" />
          <circle cx="52" cy="835" r="54" stroke="#2D6A73" strokeWidth="2.5" />
          <circle cx="52" cy="835" r="20" fill="#6497A0" />
        </svg>

        <div style={{position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <SustCrestSvg size={94} variant="ornamental" />
          <div style={{fontFamily: serifFont, fontSize: '25px', fontWeight: 700, color: '#0F172A', marginTop: '10px', lineHeight: 1.2}}>
            {data.universityName}
          </div>
          <div style={{fontFamily: serifFont, fontSize: '19.5px', fontWeight: 700, color: '#0F4C5C', marginTop: '4px'}}>
            {deptLine}
          </div>
        </div>

        {/* Chamfered Navy-Gold Course Plaque */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            margin: '24px auto 0 auto',
            width: '560px',
            background: '#0D2B3E',
            border: '2.5px solid #B69249',
            borderRadius: '14px',
            padding: '16px 32px',
            boxShadow: '0 8px 20px rgba(13, 43, 62, 0.16)',
          }}
        >
          {renderCourseLines('#FFFFFF', '#E6C67A', serifFont, '16.5px')}
        </div>

        <div style={{position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', margin: '30px 0 28px 0'}}>
          <svg width="72" height="26" viewBox="0 0 72 26" fill="none">
            <line x1="2" y1="13" x2="54" y2="13" stroke="#1E3A4C" strokeWidth="2.5" />
            <path d="M58 4 C50 9 50 17 58 22" stroke="#1E3A4C" strokeWidth="2.5" fill="none" />
            <path d="M65 2 C55 8 55 18 65 24" stroke="#B69249" strokeWidth="2" fill="none" />
          </svg>
          <h1 style={{fontFamily: serifFont, fontSize: '42px', fontWeight: 700, letterSpacing: '0.03em', color: '#0F172A', margin: 0, lineHeight: 1.1}}>
            {titleUpper}
          </h1>
          <svg width="72" height="26" viewBox="0 0 72 26" fill="none">
            <line x1="18" y1="13" x2="70" y2="13" stroke="#1E3A4C" strokeWidth="2.5" />
            <path d="M14 4 C22 9 22 17 14 22" stroke="#1E3A4C" strokeWidth="2.5" fill="none" />
            <path d="M7 2 C17 8 17 18 7 24" stroke="#B69249" strokeWidth="2" fill="none" />
          </svg>
        </div>

        <div style={{position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', fontFamily: serifFont, color: '#0F172A'}}>
          <div
            style={{
              border: '2px solid #0E5A64',
              outline: '2px solid #C5A059',
              outlineOffset: '3px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(212,237,240,0.65) 100%)',
              padding: '20px 22px',
              fontSize: '15.5px',
              lineHeight: 1.5,
            }}
          >
            <div style={{fontWeight: 700, fontSize: '17px', marginBottom: '6px'}}>Submitted to :</div>
            <div style={{fontWeight: 700, fontSize: '16px'}}>{data.teacherName}</div>
            <div>{data.teacherDesignation}</div>
            <div>{teacherDeptLine}</div>
            <div>{data.universityName}</div>
          </div>

          <div
            style={{
              border: '2px solid #0E5A64',
              outline: '2px solid #C5A059',
              outlineOffset: '3px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(212,237,240,0.65) 100%)',
              padding: '20px 22px',
              fontSize: '15.5px',
              lineHeight: 1.5,
            }}
          >
            <div style={{fontWeight: 700, fontSize: '17px', marginBottom: '6px'}}>Submitted by :</div>
            <div>
              <span style={{fontWeight: 600}}>Name : </span>
              <span>{data.studentName}</span>
            </div>
            <div>
              <span style={{fontWeight: 600}}>Reg. No. : </span>
              <span>{data.registrationNo}</span>
            </div>
            {showGroup && (
              <div>
                <span style={{fontWeight: 600}}>Group : </span>
                <span>{trimmedGroup}</span>
              </div>
            )}
            <div>
              <span style={{fontWeight: 600}}>Semester : </span>
              <span>{data.semester}</span>
            </div>
            <div>
              <span style={{fontWeight: 600}}>Session : </span>
              <span>{data.studentSession || data.session}</span>
            </div>
            <div>
              <span style={{fontWeight: 600}}>Department : </span>
              <span>{data.department}</span>
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            marginTop: 'auto',
            border: '2.5px solid #B69249',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #0D2E3F 0%, #164959 60%, #1F5B69 100%)',
            padding: '22px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            boxShadow: '0 8px 20px rgba(13, 43, 62, 0.18)',
          }}
        >
          <div style={{flex: 1}}>
            {renderBottomMetadata('#FFFFFF', '#E2E8F0', serifFont, '15.5px')}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // DESIGN 1 (DEFAULT): DNA DIVIDER CLASSIC (Page 1)
  // =========================================================================
  return (
    <div
      id={id}
      style={{
        width: '794px',
        height: '1123px',
        background: 'linear-gradient(145deg, #FFFFFF 0%, #F7FAF8 60%, #EEF3F6 100%)',
        color: '#0F172A',
        position: 'relative',
        overflow: 'hidden',
        padding: '48px 58px 56px 58px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <SustCrestSvg size={100} variant="classic" />
        <div style={{fontFamily: serifFont, fontSize: '25.5px', fontWeight: 700, color: '#0F172A', marginTop: '12px', lineHeight: 1.2}}>
          {data.universityName}
        </div>
        <div style={{fontFamily: serifFont, fontSize: '20px', color: '#1E293B', marginTop: '4px'}}>
          {deptLine}
        </div>

        {/* Centered DNA Divider */}
        <div style={{display: 'flex', alignItems: 'center', gap: '12px', width: '520px', marginTop: '10px'}}>
          <div style={{flex: 1, height: '2.5px', background: 'linear-gradient(90deg, transparent, #475569)'}} />
          <svg width="96" height="22" viewBox="0 0 96 22" fill="none">
            <path d="M4 5 C20 18 36 18 48 11 C60 4 76 4 92 17" stroke="#64748B" strokeWidth="2.4" />
            <path d="M4 17 C20 4 36 4 48 11 C60 18 76 18 92 5" stroke="#94A3B8" strokeWidth="2.4" />
            <line x1="18" y1="8" x2="18" y2="14" stroke="#475569" strokeWidth="1.6" />
            <line x1="33" y1="7" x2="33" y2="15" stroke="#475569" strokeWidth="1.6" />
            <line x1="63" y1="7" x2="63" y2="15" stroke="#475569" strokeWidth="1.6" />
            <line x1="78" y1="8" x2="78" y2="14" stroke="#475569" strokeWidth="1.6" />
          </svg>
          <div style={{flex: 1, height: '2.5px', background: 'linear-gradient(90deg, #475569, transparent)'}} />
        </div>
      </div>

      {/* Rounded Course Box */}
      <div
        style={{
          margin: '20px auto 0 auto',
          minWidth: '490px',
          maxWidth: '590px',
          backgroundColor: 'rgba(241, 245, 249, 0.9)',
          border: '1.5px solid #64748B',
          borderRadius: '14px',
          padding: '15px 28px',
          boxShadow: '0 4px 12px rgba(15, 23, 42, 0.06)',
        }}
      >
        {renderCourseLines('#0F172A', '#0F172A', serifFont, '17px')}
      </div>

      {/* Clean Serif Uppercase Heading */}
      <div style={{textAlign: 'center', margin: '34px 0 34px 0'}}>
        <h1
          style={{
            fontFamily: serifFont,
            fontSize: '42px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            color: '#1E293B',
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          {titleUpper}
        </h1>
      </div>

      {/* Two Columns */}
      <div style={{marginBottom: '36px'}}>
        {renderTwoColumnPeople('#948979', {fontFamily: serifFont, fontSize: '16px', teacherBold: true, studentBold: true})}
      </div>

      {/* Tapered Gold Horizontal Rule + Bottom Metadata */}
      <div style={{marginTop: 'auto'}}>
        <div style={{height: '2px', background: 'linear-gradient(90deg, transparent, #A38E6B, transparent)', marginBottom: '22px'}} />
        {renderBottomMetadata('#0F172A', '#1E293B', serifFont, '16px')}
      </div>
    </div>
  );
};
