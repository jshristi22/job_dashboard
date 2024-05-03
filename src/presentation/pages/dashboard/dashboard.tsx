import  { useEffect, useState } from "react";
import Filters from "./components/filters/filters";
import { fetchAllJobs } from "../../../data/fetch_jobs";
import styles from './dashboard.module.scss'

interface IJobsEntity {
  jobTitle?: string;
  companyName?: string;
  location?: string;
  jobDescription?: string; //(limited to a certain number of characters with an option to expand)
  experienceRequired?: string;
  applyLink?: string;
}

function Dashboard() {
  const [jobs, setJobs] = useState<IJobsEntity[]>();
  useEffect(() => {
    fetchJobs();
  }, []);
  const fetchJobs = async () => {
    const resp = await fetchAllJobs();
    setJobs(resp);
  };

  return (
    <div className={styles.dashboard}>
      <Filters />
      {/* {jobs.data.map((job) => { */}
        {/* <JobCard data={job} />; */}
      {/* })} */}
    </div>
  );
}

export default Dashboard;
