import Job from '@/components/cards/Job';
import FilterCard from '@/components/common/FilterCard';
import ShinyText from '@/components/ShinyText';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector(
    (store) => store.job
  );

  const [filterJobs, setFilterJobs] = useState(allJobs || []);

  useEffect(() => {
    if (!allJobs) {
      setFilterJobs([]);
      return;
    }
    if (!searchedQuery?.value) {
      setFilterJobs(allJobs);
      return;
    }

    const { type, value } = searchedQuery;

    const filteredJobs = allJobs.filter((job) => {
      if (type === 'Location') {
        return job?.location
          ?.toLowerCase()
          .includes(value.toLowerCase());
      }
      if (type === 'Industry') {
        return job?.title
          ?.toLowerCase()
          .includes(value.toLowerCase());
      }
      if (type === 'Salary') {
        const salary = Number(job?.salary) || 0;

        if (value === '0-40k') {
          return salary >= 0 && salary <= 40000;
        }

        if (value === '42-100k') {
          return salary >= 42000 && salary <= 100000;
        }

        if (value === '100k-200k') {
          return salary >= 100000 && salary <= 200000;
        }
      }

      return true;
    });

    setFilterJobs(filteredJobs);
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 py-4">

        <div className="flex flex-col lg:flex-row gap-5">
          <aside className="w-full lg:w-[20%] shrink-0">
            <div className="lg:sticky lg:top-20">
              <FilterCard />
            </div>
          </aside>
          <main className="flex-1 min-w-0">

            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                {filterJobs.length}{' '}
                <ShinyText
                  text={filterJobs.length === 1 ? 'Job Found' : 'Jobs Found'}
                  speed={2}
                  delay={0}
                  color="#b5b5b5"
                  shineColor="#07AAA5"
                  spread={120}
                  direction="left"
                  yoyo={false}
                  pauseOnHover={false}
                  disabled={false}
                />
              </p>
            </div>

            {filterJobs.length === 0 ? (
              <div className="flex min-h-75 items-center justify-center rounded-xl border border-dashed">
                <div className="text-center">
                  <h2 className="text-lg font-semibold">
                    Jobs not found
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Try selecting a different filter.
                  </p>
                </div>
              </div>
            ) : (
              <div className="max-h-[calc(100vh-120px)] overflow-y-auto pr-1 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filterJobs.map((job) => (
                    <Job
                      key={job?.id}
                      job={job}
                    />
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Jobs;