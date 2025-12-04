// Section Divider Component - Easy to extend
// Extends to meet the vertical edge pattern lines (w-4 md:w-6 lg:w-8 = 16px, 24px, 32px)
export const SectionDivider = () => {
  return (
    <div className="my-8 sm:my-10 relative h-[3px] -ml-1 sm:-ml-3 md:-ml-4 lg:-ml-4 -mr-1 sm:-mr-3 md:-mr-4 lg:-mr-4">
      {/* Light Theme Divider */}
      <div 
        className="w-full h-full bg-neutral-100 dark:hidden"
        style={{
          boxShadow: "inset 0 3px 5px rgba(0, 0, 0, 0.1), inset 0 -2px 3px rgba(255, 255, 255, 0.4), 0 2px 4px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.03)"
        } as React.CSSProperties}
      />
      {/* Dark Theme Divider */}
      <div 
        className="w-full h-full bg-neutral-700 hidden dark:block"
        style={{
          boxShadow: "inset 0 3px 6px rgba(0, 0, 0, 0.6), inset 0 -2px 3px rgba(255, 255, 255, 0.1), 0 2px 5px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0, 0, 0, 0.3)"
        } as React.CSSProperties}
      />
    </div>
  );
};






