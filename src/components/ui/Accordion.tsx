import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<string[]>(() =>
    items.filter((i) => i.defaultOpen).map((i) => i.id)
  );

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`divide-y divide-outline-variant/60 border-y border-outline-variant/60 ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const headingId = `accordion-heading-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;

        return (
          <div key={item.id} className="py-1">
            <button
              type="button"
              id={headingId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggleItem(item.id)}
              className="w-full py-4 flex items-center justify-between text-left font-button text-xs sm:text-sm uppercase tracking-[0.15em] text-primary hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            >
              <span>{item.title}</span>
              <ChevronDown
                className={`w-4 h-4 text-on-surface-muted transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-primary' : ''
                }`}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={headingId}
                className="pb-5 pt-1 font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed"
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
