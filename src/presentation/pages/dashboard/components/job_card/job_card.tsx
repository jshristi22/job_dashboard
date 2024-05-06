import styles from "./job_card.module.scss";
import { IJobModel } from "../../../../../data/fetch_jobs";
import { Button, Chip } from "@mui/material";

function JobCard({ data }: { data: IJobModel }) {
  return (
    <div id={data.jdUid ?? ""} className={styles.jobCard}>
      <Chip label={"⌛ Posted 10 days ago"} variant="outlined"></Chip>
      <div className={styles.header}>
        <span>
          <img src={data?.logoUrl ?? ""} alt="company logo" />
        </span>
        <span>
          <h4 style={{ fontWeight: 600 }} className={styles.fontGrayColor}>{data.companyName}</h4>
          <h3>{data.jobRole}</h3>
          <h4>{data.location}</h4>
        </span>
      </div>
      <h3 style={{ fontWeight: 500 }} className={styles.fontGrayColor}>
        Estimated Salary: {data.salaryCurrencyCode} {data.minJdSalary ?? 0} -{" "}
        {data.maxJdSalary} ✅
      </h3>
      <div className={styles.jobDetails}></div>
      <div className={styles.topBottomOverflowFade}>
        <h2 style={{ fontWeight: 600 }}>About Company:</h2>
        <h3 style={{ fontWeight: 800 }}>About Us</h3>
        <p>{data.jobDetailsFromCompany}</p>

        <h6>Founder/Recruiter profiles:</h6>
        {data.jdUid}
      </div>

      {data.minExp && (
        <>
          <h5 className={styles.fontGrayColor}>Minimun Experience</h5>
          <p>
            {data.minExp > 1 ? `${data.minExp} years` : `${data.minExp} year`}
          </p>
        </>
      )}
      <div className={styles.actionBtn}>
        <Button
          color="info"
          fullWidth
          variant="contained"
          onClick={() => {
            console.log(data.jdLink);
          }}
        >
          🔅 Easy Apply
        </Button>
        <Button
          color="secondary"
          fullWidth
          variant="contained"
          onClick={() => {
            console.log(data.jdLink);
          }}
        >
          <div className={styles.referralBtn}>
            <img
              width={12}
              height={12}
              style={{
                borderRadius: "50%",
              }}
              src={data.logoUrl ?? ""}
              alt=""
            />
            <img
              width={12}
              height={12}
              style={{
                borderRadius: "50%",
              }}
              src={data.logoUrl ?? ""}
              alt=""
            />
            Unlock referral asks
          </div>
        </Button>
      </div>
    </div>
  );
}

export default JobCard;
