import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "./components/axios/baseUrl";
import TableMaster from "./components/table/tableMaster";
import  Component2 from "./components/component2/component2";

const SecondPageMaster = (props: any) => {
  const { inputData } = props;
  const [tableData, setTableData] = useState(null);

  let path = window?.location?.pathname;
  const navigate = useNavigate();

  const getApi = async () => {
    let res: any = await baseUrl.get("posts");
    setTableData(res);
  };

  useEffect(() => {
    if (path === "/secondPage") {
      if (inputData?.length <= 0) {
        alert("must enter the details before accessing the page");
        navigate("/");
      } else {
        getApi();
      }
    }
  }, []);

  return (
    <>
      {
        tableData && <TableMaster tableData={tableData} />
      }
      <Component2 />
    </>
  );
};

export default SecondPageMaster;
