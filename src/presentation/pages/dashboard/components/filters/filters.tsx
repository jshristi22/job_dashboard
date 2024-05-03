import { useState } from "react";
import {
  JobTypeFilterOptions,
  experienceFilterOptions,
  miniumBasePaySalaryFilterOptions,
  noOfEmployeesFilterOptions,
  rolesFilterOptions,
} from "../../../../../core/constants";
import CustomDropdown from "../../../../components/custom_filters/custom_filters";
import styles from "./filters.module.scss";
import { TextField } from "@mui/material";

enum FilterType {
  Roles = "Roles",
  NumberOfEmployees = "Number of Employees",
  Experience = "Experience",
  Remote = "Remote",
  MinimumBasePaySalary = "Minimum Base Pay Salary",
}

const filtersOptions = [
  {
    label: FilterType.Roles,
    options: rolesFilterOptions,
    isMultiple: true,
  },
  {
    label: FilterType.NumberOfEmployees,
    options: noOfEmployeesFilterOptions,
    isMultiple: true,
  },
  {
    label: FilterType.Experience,
    options: experienceFilterOptions,
    isMultiple: false,
  },
  {
    label: FilterType.Remote,
    options: JobTypeFilterOptions,
    isMultiple: true,
  },
  {
    label: FilterType.MinimumBasePaySalary,
    options: miniumBasePaySalaryFilterOptions,
    isMultiple: false,
  },
];

function Filters() {
  const [filters, setFilters] = useState<{
    roles: string[];
    noOfEmployees: string[];
    experience: string;
    jobType: string[];
    salary: string;
  }>({
    roles: [],
    noOfEmployees: [],
    experience: "",
    jobType: [],
    salary: "",
  });
  const getValue = (label: FilterType): string | string[] => {
    switch (label) {
      case FilterType.Roles: {
        return filters.roles;
      }
      case FilterType.NumberOfEmployees: {
        return filters.noOfEmployees;
      }
      case FilterType.Experience: {
        return filters.experience;
      }
      case FilterType.Remote: {
        return filters.jobType;
      }
      case FilterType.MinimumBasePaySalary: {
        return filters.salary;
      }
    }
  };
  const updateFilters = (filterType: FilterType, value: string | string[]) => {
    switch (filterType) {
      case FilterType.Roles: {
        setFilters((prev) => {
          return {
            ...prev,
            roles: [...value],
          };
        });
        break;
      }
      case FilterType.NumberOfEmployees: {
        setFilters((prev) => {
          return {
            ...prev,
            noOfEmployees: [...value],
          };
        });
        break;
      }
      case FilterType.Experience: {
        setFilters((prev) => {
          return {
            ...prev,
            experience: value as string,
          };
        });
        break;
      }
      case FilterType.Remote: {
        setFilters((prev) => {
          return {
            ...prev,
            jobType: [...value],
          };
        });
        break;
      }
      case FilterType.MinimumBasePaySalary: {
        setFilters((prev) => {
          return {
            ...prev,
            salary: value as string,
          };
        });
        break;
      }
    }
  };
  return (
    <div className={styles.filtersContainer}>
      {filtersOptions.map((opt) => {
        return (
          <CustomDropdown
            label={opt.label}
            value={getValue(opt.label)}
            handleChange={(e) => {
              updateFilters(opt.label, e.target.value);
            }}
            multiple={opt.isMultiple}
            menuItems={opt.options.map((o) => ({
              label: o,
              value: o,
            }))}
          />
        );
      })}
      <TextField label="Search company name" variant="outlined" fullWidth />
    </div>
  );
}

export default Filters;
