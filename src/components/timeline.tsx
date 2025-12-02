import React from "react";

const timelineData = [
  {
    year: "2025",
    items: [
      { title: "Reached $20K MRR with my VSCode fork.", description: "Reached the revenue milestone of $20K MRR with my VSCode fork." }
    ]
  },
  {
    year: "2024",
    items: [
      { title: "Launched my own developer tools startup", description: "Founded a company focused on creating innovative tools for software developers." },
      { title: "Spoke at React Conference", description: "Delivered a keynote presentation about modern frontend architecture patterns." }
    ]
  },
  {
    year: "2023",
    items: [
      { title: "Contributed to open source", description: "Became a core contributor to several popular React and Next.js libraries." },
      { title: "Published technical book", description: "Authored 'Advanced Frontend Architecture' which sold over 10,000 copies." }
    ]
  },
  {
    year: "2022",
    items: [
      { title: "Led engineering team at tech startup", description: "Managed a team of 12 engineers building a SaaS platform with over 50,000 users." }
    ]
  },
  {
    year: "2021",
    items: [
      { title: "Graduated with Computer Science degree", description: "Completed my Bachelor's degree with honors and specialization in software engineering." },
      { title: "Built my first production application", description: "Developed and deployed a web application that gained 5,000 monthly active users." }
    ]
  },
  {
    year: "2020",
    items: [
      { title: "Started learning web development", description: "Began my journey into programming with JavaScript, HTML, and CSS." }
    ]
  }
];

export const Timeline = () => {
  return (
    <section className="pt-10 pb-6 px-4 border-t border-b border-[#F5F5F5] dark:border-neutral-800 bg-white/0 dark:bg-transparent shadow-[0px_-1px_4px_#F5F5F5_inset] dark:shadow-none">
       <div className="flex items-start gap-1.5 mb-10">
        <h2 className="text-base font-normal leading-6 text-[#262626] dark:text-neutral-100 flex flex-wrap gap-1.5">
           <span>Timeline</span>
           <span>of</span>
           <span>Achievements</span>
        </h2>
      </div>

      <div className="flex flex-col gap-8 max-w-[800px]">
        {timelineData.map((yearGroup) => (
          <div key={yearGroup.year} className="flex flex-col gap-2">
             <div className="px-2 py-0.5 bg-white/0 dark:bg-transparent border border-neutral-200 dark:border-neutral-700 rounded-md inline-block w-fit shadow-[0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:shadow-none">
               <span className="text-base font-bold leading-6 text-[#171717] dark:text-neutral-100">
                  {yearGroup.year}
               </span>
             </div>

             <div className="flex flex-col gap-4 pl-4">
               {yearGroup.items.map((item, idx) => (
                 <div key={idx} className="flex flex-col">
                    <div className="flex items-start gap-2">
                        <div className="w-4 h-5 pt-1 flex-shrink-0">
                          <div className="w-[13.33px] h-[13.33px] bg-[#737373] dark:bg-neutral-400" />
                        </div>
                        <h3 className="text-base font-normal leading-6 text-[#525252] dark:text-neutral-300">
                           {item.title}
                        </h3>
                    </div>
                    <p className="text-sm font-normal leading-5 text-[#A1A1A1] dark:text-neutral-400 pl-6 pt-1">
                       {item.description}
                    </p>
                 </div>
               ))}
             </div>
          </div>
        ))}
      </div>
    </section>
  );
};
