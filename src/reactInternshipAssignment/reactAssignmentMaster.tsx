import { useState } from "react";
import { FirstPageMaster } from "./firstPage";
import { SecondPageMaster } from "./secondPage";
import { Routes, Route } from "react-router-dom";

const ReactAssignmentMaster = () => {
  const [inputData, setInputData]: any = useState([]);

  const props: any = {
    inputData,
    setInputData,
  };

  return (
    <Routes>
      <Route path="/" element={<FirstPageMaster {...props} />} />
      <Route path="/secondPage" element={<SecondPageMaster {...props} />} />
    </Routes>
  );
};

export default ReactAssignmentMaster;
