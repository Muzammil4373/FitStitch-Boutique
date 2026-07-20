import React from 'react';
import StitchDivider from '../components/StitchDivider.jsx';

export default function StaticPage({ title, sections }) {
  return (
    <div className="pt-32 pb-24 mx-auto max-w-3xl px-6 md:px-10">
      <h1 className="font-display text-4xl mb-4">{title}</h1>
      <StitchDivider className="w-16 mb-12" />
      <div className="space-y-10">
        {sections.map((s) => (
          <div key={s.heading}>
            <h2 className="font-display text-xl mb-3">{s.heading}</h2>
            <p className="text-charcoal/65 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
