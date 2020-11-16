import React from 'react';
import { Formik, Form, Field} from "formik";
import Button from "@material-ui/core/Button";
import FormikField from "../../../Components/FormikTextField/FormikTextField";
import FormikSelect, { FormikSelectFieldItem } from "../../../Components/FormikSelectField/FormikSelectField";
import FormikDateField from "../../../Components/FormikDateField/FormikDateField"; 

interface FormValues {
  targetYears: string[],
  hoursPerWeek: number,
  expirationDate: Date,
  startDate: Date,
  endDate: Date,
  type: string[],
  title: string, 
  status: string, 
  minSalary: number, 
  maxSalary: number, 
  departmentID: string
}

const initialValues: FormValues = {
  targetYears: [],
  hoursPerWeek: 0,
  expirationDate: new Date(), 
  startDate: new Date(),
  endDate: new Date(),
  type: [],
  title: "", 
  status: "", 
  minSalary: 0, 
  maxSalary: 0, 
  departmentID: ""
};

// Status Selection 
const StatusItems: FormikSelectFieldItem[] = [
  {
    label: "Hiring", 
    value: "Hiring"
  },
  {
    label: "Closed",
    value: "Closed" 
  }
]

// Department Selection 
const DepartmentItems: FormikSelectFieldItem[] = [
  { 
    label: "Biology",
    value: "biology"
  },
  {
    label: "Biochemistry",
    value: "biochemistry"
  },
  {
    label: "Bioengineering",
    value: "bioengineering"
  },
  {
    label: "Chemistry",
    value: "chemistry"
  },
  {
    label: "Chemical Engineering",
    value: "chemical_engineering"
  },
  {
    label: "Computer Science",
    value: "computer_science"
  },
  {
      label: "Computer Engineering",
      value: "computer_engineering"
  },
  {
      label: "Data Science",
      value: "data_science"
  },
  {
      label: "Environmental Engineering",
      value: "environmental_engineering"
  },
  {
      label: "Electrical Engineering",
      value: "electrical_engineering"
  },
  {
      label: "Mathematics",
      value: "mathematics"
  },
  { 
      label: "Materials Science and Engineering",
      value: "materials_sci_engineering"
  },
  {
      label: "Mechanical Engineering",
      value: "mechanical_engineering"
  },
  {
      label: "Physics",
      value: "physics"
  },
  {
      label: "Statistics",
      value: "statistics"
  }
]; 

const JobForm: React.FC = () => {
  const handleSubmit = (values: FormValues): void => {
    alert(JSON.stringify(values));
  };


  return (
    <div className="App">
      <h1>Create A Job Post</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        //validationSchema={SignupSchema}
      >
        {({ dirty, isValid }) => {
          return (
            <Form>
              <FormikField name="title" label="Title" required />
              <div id="checkbox-group">Target Years</div>
            <div role="group" aria-labelledby="checkbox-group">
              <label>
                <Field type="checkbox" name="targetYears" value="freshman" />
                Freshman
              </label>
              <label>
                <Field type="checkbox" name="targetYears" value="sophomore" />
                Sophomore
              </label>
              <label>
                <Field type="checkbox" name="targetYears" value="junior" />
                Junior
              </label>
              <label>
                <Field type="checkbox" name="targetYears" value="senior" />
                Senior
              </label>
            </div>
            <FormikField name="hoursPerWeek" label="Hours Per Week" required type="number" />
              <FormikSelect
                name="departmentID"
                items={DepartmentItems}
                label="Department"
                required
              />
              <FormikField name="type" label="Type" required/>
              <FormikDateField name="expirationDate" label="Expiration Date" required type="date"  />
              <FormikDateField name="startDate" label="Start Date" required  type="date"/>
              <FormikDateField name="endDate" label="End Date" type="date"/>
              <FormikField name="description" label="Description" required />
              <FormikSelect
                name="status"
                items={StatusItems}
                label="Status"
                required
              />
              <FormikField name="minSalary" label="Minimum Salary" required type="number"/>
              <FormikField name="maxSalary" label="Maximum Salary" type="number"/>
              <Button
                variant="contained"
                color="primary"
                disabled={!dirty || !isValid}
                type="submit"
              >
                POST!
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
export default JobForm;