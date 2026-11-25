import React, {useEffect, useMemo, useRef, useState} from 'react';
import {ChevronDown, X} from 'lucide-react';

export interface ComboboxOption {
  value: string;
  primary: string;
  secondary?: string;
  searchText?: string;
}

interface SmartComboboxProps {
  id: string;
  value: string;
  options: ComboboxOption[];
  placeholder?: string;
  mono?: boolean;
  emptyHint?: string;
  onChange: (value: string) => void;
  onSelectOption: (option: ComboboxOption) => void;
}

export const SmartCombobox: React.FC<SmartComboboxProps> = ({
  id,
  value,
  options,
  placeholder,
  mono = false,
  emptyHint = 'No matching entries — keep typing to use custom value',
  onChange,
  onSelectOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hasTypedSinceOpen, setHasTypedSinceOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setHasTypedSinceOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = useMemo(() => {
    if (!hasTypedSinceOpen) return options;
    const q = value.trim().toLowerCase();
    if (!q) return options;
    return options.filter((opt) => {
      const hay = `${opt.primary} ${opt.secondary ?? ''} ${opt.searchText ?? ''}`.toLowerCase();
      return hay.includes(q);
    });
  }, [options, value, hasTypedSinceOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setIsOpen(true);
      setActiveIndex(0);
      return;
    }

    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) =>
        filteredOptions.length === 0 ? -1 : (prev + 1) % filteredOptions.length
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) =>
        filteredOptions.length === 0
          ? -1
          : (prev - 1 + filteredOptions.length) % filteredOptions.length
      );
    } else if (e.key === 'Enter' && activeIndex >= 0 && filteredOptions[activeIndex]) {
      e.preventDefault();
      onSelectOption(filteredOptions[activeIndex]);
      setIsOpen(false);
      setHasTypedSinceOpen(false);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setHasTypedSinceOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative flex items-center">
        <input
          id={id}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          autoComplete="off"
          value={value}
          placeholder={placeholder}
          onFocus={() => {
            setIsOpen(true);
            setHasTypedSinceOpen(false);
            setActiveIndex(-1);
          }}
          onChange={(e) => {
            setHasTypedSinceOpen(true);
            setIsOpen(true);
            setActiveIndex(0);
            onChange(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          className={`w-full rounded-lg border border-[var(--studio-border)] bg-[var(--studio-input)] py-2.5 pl-3.5 pr-14 text-sm text-[var(--studio-text)] placeholder:text-[var(--studio-subtle)] transition-all focus:border-[var(--studio-accent)] focus:bg-[var(--studio-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--studio-accent-soft)] ${
            mono ? 'font-mono tabular-nums' : ''
          }`}
        />

        <div className="absolute right-2 flex items-center gap-0.5">
          {value && (
            <button
              type="button"
              tabIndex={-1}
              aria-label="Clear field"
              onClick={() => {
                onChange('');
                setHasTypedSinceOpen(false);
                setIsOpen(true);
              }}
              className="rounded p-1 text-[var(--studio-subtle)] hover:bg-[var(--studio-elevated)] hover:text-[var(--studio-text)]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            type="button"
            tabIndex={-1}
            aria-label="Toggle options"
            onClick={() => {
              setIsOpen((prev) => !prev);
              setHasTypedSinceOpen(false);
            }}
            className="rounded p-1 text-[var(--studio-subtle)] hover:bg-[var(--studio-elevated)] hover:text-[var(--studio-text)]"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-150 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          role="listbox"
          className="absolute z-50 mt-1.5 max-h-64 w-full overflow-y-auto rounded-xl border border-[var(--studio-border)] bg-[var(--studio-surface)] py-1 shadow-xl"
        >
          {filteredOptions.length === 0 ? (
            <div className="px-3.5 py-2.5 text-xs text-[var(--studio-muted)]">{emptyHint}</div>
          ) : (
            filteredOptions.map((opt, idx) => {
              const isHighlighted = idx === activeIndex;
              const isSelected = opt.value === value;
              return (
                <button
                  key={`${opt.value}-${idx}`}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onSelectOption(opt);
                    setIsOpen(false);
                    setHasTypedSinceOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-3.5 py-2 text-left text-sm transition-colors ${
                    isHighlighted || isSelected
                      ? 'bg-[var(--studio-accent-soft)] text-[var(--studio-text)]'
                      : 'text-[var(--studio-text)] hover:bg-[var(--studio-elevated)]'
                  }`}
                >
                  <span className="truncate font-medium">{opt.primary}</span>
                  {opt.secondary && (
                    <span className="shrink-0 font-mono text-xs text-[var(--studio-muted)] tabular-nums">
                      {opt.secondary}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
