import { useEffect, useState } from "react";
import { FetchJobsModel, fetchAllJobs } from "../../../data/fetch_jobs";
import styles from "./dashboard.module.scss";
import JobCard from "./components/job_card/job_card";
import Filters from "./components/filters/filters";

function Dashboard() {
  const [data, setData] = useState<FetchJobsModel>();
  const [pagination, setPagination] = useState<{
    limit: number;
    offset: number;
  }>({
    limit: 10,
    offset: 0,
  });

  useEffect(() => {
    fetchJobs({});
  }, []);
  const fetchJobs = async ({
    limit,
    offset,
  }: {
    limit?: number;
    offset?: number;
  }) => {
    const resp = await fetchAllJobs({
      limit,
      offset,
    });
    setData((prev) => {
      const data: FetchJobsModel = {
        totalCount: resp.totalCount,
        jobs: [...(prev?.jobs ?? []), ...resp.jobs],
      };
      return data;
    });
  };
  console.log("data", data);
  useEffect(() => {
    const onscroll = () => {
      const scrolledTo = window.scrollY + window.innerHeight;
      const threshold = 300;
      const isReachBottom =
        document.body.scrollHeight - threshold <= scrolledTo;
      if (isReachBottom) {
        fetchJobs({
          offset: pagination.offset + pagination.limit,
        });
        setPagination((prev) => ({
          limit: prev.limit,
          offset: prev.offset + prev.limit,
        }));
      }
    };
    window.addEventListener("scroll", onscroll);
    return () => {
      window.removeEventListener("scroll", onscroll);
    };
  }, []);
  console.log(pagination);
  return (
    <div className={styles.dashboard}>
      <Filters />
      <div className={styles.jobsContainer}>
        {data?.jobs.map((job) => {
          return <JobCard data={job} />;
        })}
      </div>
    </div>
  );
}

export default Dashboard;
