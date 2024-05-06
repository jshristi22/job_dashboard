import axios from "axios";

export interface IJobModel {
  companyName: string | null;
  jdLink: string | null;
  jdUid: string | null;
  jobDetailsFromCompany: string | null;
  jobRole: string | null;
  location: string | null;
  logoUrl: string | null;
  maxExp: number | null;
  maxJdSalary: number | null;
  minExp: number | null;
  minJdSalary: null;
  salaryCurrencyCode: string;
}

export interface FetchJobsModel {
  totalCount: number;
  jobs: IJobModel[];
}

export const fetchAllJobs = async ({
  limit,
  offset,
}: {
  limit?: number;
  offset?: number;
}): Promise<FetchJobsModel> => {
  const body = {
    limit: limit ?? 10,
    offset: offset ?? 0,
  };

  const response = await axios.post(
    "https://api.weekday.technology/adhoc/getSampleJdJSON",
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return {
    totalCount: response.data.totalCount,
    jobs: response.data.jdList,
  };
};
