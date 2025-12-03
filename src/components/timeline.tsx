import React from "react";
import { useSanityTimeline } from "@/hooks/useSanityData";

// Stable empty array reference
const EMPTY_ARRAY: any[] = [];

export const Timeline = () => {
  const { data: timelineDataRaw, loading, error } = useSanityTimeline(EMPTY_ARRAY);
  
  // Group achievements by year
  const timelineData = React.useMemo(() => {
    if (!Array.isArray(timelineDataRaw) || timelineDataRaw.length === 0) {
      return [];
    }

    // Group by year
    const grouped = timelineDataRaw.reduce((acc: any, achievement: any) => {
      const year = achievement.year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push({
        title: achievement.title,
        description: achievement.description,
      });
      return acc;
    }, {});

    // Convert to array format and sort years descending
    return Object.keys(grouped)
      .sort((a, b) => parseInt(b) - parseInt(a))
      .map((year) => ({
        year,
        items: grouped[year],
      }));
  }, [timelineDataRaw]);

  return (
    <section className="pt-10 pb-6 px-4 border-t border-b border-[#F5F5F5] dark:border-neutral-800 bg-white/0 dark:bg-transparent shadow-[0px_-1px_4px_#F5F5F5_inset] dark:shadow-none">
       <div className="flex items-start gap-1.5 mb-10">
        <h2 className="text-base font-normal leading-6 text-[#262626] dark:text-neutral-100 flex flex-wrap gap-1.5">
           <span>Timeline</span>
           <span>of</span>
           <span>Achievements</span>
        </h2>
      </div>

      {loading ? (
        <div className="text-center text-sm text-neutral-500 dark:text-neutral-400 py-8">
          Loading timeline...
        </div>
      ) : error ? (
        <div className="text-center text-sm text-red-500 dark:text-red-400 py-8">
          Error loading timeline. Please try again later.
        </div>
      ) : timelineData.length === 0 ? (
        <div className="text-center text-sm text-neutral-500 dark:text-neutral-400 py-8">
          No achievements found. Add timeline achievements in your Sanity Studio.
        </div>
      ) : (
        <div className="flex flex-col gap-8 max-w-[800px] w-full">
          {timelineData.map((yearGroup) => (
            <div key={yearGroup.year} className="flex flex-col gap-2">
               <div className="px-2 py-0.5 bg-white/0 dark:bg-transparent border border-neutral-200 dark:border-neutral-700 rounded-md inline-block w-fit shadow-[0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:shadow-none">
                 <span className="text-base font-bold leading-6 text-[#171717] dark:text-neutral-100">
                    {yearGroup.year}
                 </span>
               </div>

               <div className="flex flex-col gap-4 pl-4">
                 {yearGroup.items.map((item: any, idx: number) => (
                   <div key={idx} className="flex flex-col">
                      <div className="flex items-start gap-2 min-w-0">
                          <div className="w-4 h-5 pt-1 flex-shrink-0">
                            <div className="w-[13.33px] h-[13.33px] bg-[#737373] dark:bg-neutral-400" />
                          </div>
                          <h3 className="text-base font-normal leading-6 text-[#525252] dark:text-neutral-300 break-words overflow-wrap-anywhere flex-1 min-w-0">
                             {item.title}
                          </h3>
                      </div>
                      <p className="text-sm font-normal leading-5 text-[#A1A1A1] dark:text-neutral-400 pl-6 pt-1 break-words overflow-wrap-anywhere">
                         {item.description}
                      </p>
                   </div>
                 ))}
               </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
