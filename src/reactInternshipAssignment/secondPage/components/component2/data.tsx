interface dataType {
  department: string;
  sub_departments: string[];
}

type dataTypeArr = dataType[]

export const data:dataTypeArr = [
  {
    department: "customer_service",
    sub_departments: ["support", "customer_success"],
  },
  {
    department: "design",
    sub_departments: ["graphic_design", "product_design", "web_design"],
  },
];
