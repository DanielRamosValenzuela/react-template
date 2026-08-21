'use client';

import Image from 'next/image';
import { useEffect, useEffectEvent, useRef, useState } from 'react';
import { Dialog, Tab } from 'tomaco-components';
import { HOGAR_COVERAGES, HOGAR_DIALOG_COPY, HOGAR_GLOSSARY } from './content';

type InformationTab = 'coverages' | 'glossary';

interface HogarInsuranceInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const INFORMATION_TABS = [
  { idAnchor: 'coverages', style: {}, text: HOGAR_DIALOG_COPY.coveragesTab },
  { idAnchor: 'glossary', style: {}, text: HOGAR_DIALOG_COPY.glossaryTab },
];

const isInformationTab = (value: string): value is InformationTab =>
  value === 'coverages' || value === 'glossary';

export const HogarInsuranceInfoDialog = ({ isOpen, onClose }: HogarInsuranceInfoDialogProps) => {
  const [activeTab, setActiveTab] = useState<InformationTab>('coverages');
  const rootRef = useRef<HTMLDivElement>(null);

  const closeFromKeyboard = useEffectEvent(() => {
    setActiveTab('coverages');
    onClose();
  });

  const resetScroll = () => {
    const dialogBody = rootRef.current?.querySelector<HTMLElement>('.dialog__body');
    dialogBody?.scrollTo({ top: 0 });
  };

  const closeDialog = () => {
    setActiveTab('coverages');
    resetScroll();
    onClose();
  };

  const changeTab = (tabId: string) => {
    if (!isInformationTab(tabId)) {
      return;
    }

    setActiveTab(tabId);
    resetScroll();
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const returnFocusElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousBodyOverflow = document.body.style.overflow;
    const dialog = rootRef.current?.querySelector<HTMLElement>('[role="dialog"]');
    const dialogBody = rootRef.current?.querySelector<HTMLElement>('.dialog__body');
    const closeButton = dialog?.querySelector<HTMLElement>('[aria-label="Cerrar dialogo"]');

    document.body.style.overflow = 'hidden';
    dialog?.setAttribute('aria-label', HOGAR_DIALOG_COPY.title);
    dialog?.removeAttribute('aria-labelledby');
    dialogBody?.scrollTo({ top: 0 });

    const focusFrame = window.requestAnimationFrame(() => closeButton?.focus());

    const selectTabFromElement = (element: HTMLElement) => {
      const tabId = element.getAttribute('aria-controls');

      if (tabId && isInformationTab(tabId)) {
        setActiveTab(tabId);
        dialogBody?.scrollTo({ top: 0 });
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target instanceof HTMLElement ? event.target : null;

      if (event.key === 'Escape') {
        event.preventDefault();
        dialogBody?.scrollTo({ top: 0 });
        closeFromKeyboard();
        return;
      }

      if (
        target?.getAttribute('aria-label') === 'Cerrar dialogo' &&
        (event.key === 'Enter' || event.key === ' ')
      ) {
        event.preventDefault();
        closeFromKeyboard();
        return;
      }

      if (target?.getAttribute('role') === 'tab') {
        const tabs = Array.from(dialog?.querySelectorAll<HTMLElement>('[role="tab"]') ?? []);
        const currentIndex = tabs.indexOf(target);

        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          selectTabFromElement(target);
          return;
        }

        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          const offset = event.key === 'ArrowRight' ? 1 : -1;
          const nextTab = tabs[(currentIndex + offset + tabs.length) % tabs.length];
          nextTab?.focus();
          if (nextTab) selectTabFromElement(nextTab);
          return;
        }
      }

      if (event.key !== 'Tab' || !dialog) {
        return;
      }

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.tabIndex >= 0);

      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      returnFocusElement?.focus();
    };
  }, [isOpen]);

  return (
    <div className="hogar-info-dialog-root" ref={rootRef}>
      <Dialog
        className="hogar-info-dialog"
        closeButton
        closeHandler={closeDialog}
        closeOutside
        isOpen={isOpen}
        title={HOGAR_DIALOG_COPY.title}
      >
        <div className="hogar-info-dialog__content">
          <p className="hogar-info-dialog__lead">{HOGAR_DIALOG_COPY.description}</p>

          <div className="hogar-info-dialog__benefits d-flex flex-column gap-24">
            <article className="hogar-info-dialog__benefit d-flex gap-16">
              <Image
                alt=""
                aria-hidden="true"
                height={40}
                src="/cl/hogar/icon-home-benefit.svg"
                width={40}
              />
              <div>
                <h3>{HOGAR_DIALOG_COPY.contentsTitle}</h3>
                <p>{HOGAR_DIALOG_COPY.contentsDescription}</p>
              </div>
            </article>
            <article className="hogar-info-dialog__benefit d-flex gap-16">
              <Image
                alt=""
                aria-hidden="true"
                height={40}
                src="/cl/hogar/icon-online-benefit.svg"
                width={40}
              />
              <div>
                <h3>{HOGAR_DIALOG_COPY.activationTitle}</h3>
                <p>{HOGAR_DIALOG_COPY.activationDescription}</p>
              </div>
            </article>
          </div>

          <Tab
            actionAnchor={changeTab}
            activeTab={activeTab}
            className="hogar-info-dialog__tabs"
            equalWidth
            id="hogar-information-tabs"
            tabs={INFORMATION_TABS}
          />

          {activeTab === 'coverages' ? (
            <section
              aria-label={HOGAR_DIALOG_COPY.coveragesTab}
              className="hogar-info-dialog__panel d-flex flex-column gap-24"
              id="coverages"
              role="tabpanel"
            >
              {HOGAR_COVERAGES.map((coverage) => (
                <article className="hogar-info-dialog__detail" key={coverage.title}>
                  <h3>{coverage.title}</h3>
                  <p>{coverage.description}</p>
                  {'examplesLabel' in coverage && coverage.examplesLabel ? (
                    <strong>{coverage.examplesLabel}</strong>
                  ) : null}
                  <ul>
                    {coverage.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </section>
          ) : (
            <section
              aria-label={HOGAR_DIALOG_COPY.glossaryTab}
              className="hogar-info-dialog__panel d-flex flex-column gap-24"
              id="glossary"
              role="tabpanel"
            >
              {HOGAR_GLOSSARY.map((term) => (
                <article className="hogar-info-dialog__detail" key={term.title}>
                  <h3>{term.title}</h3>
                  <p>{term.description}</p>
                </article>
              ))}
            </section>
          )}
        </div>
      </Dialog>
    </div>
  );
};
