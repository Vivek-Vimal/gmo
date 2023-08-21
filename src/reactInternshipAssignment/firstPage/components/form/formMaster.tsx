import FormElement from "./components/formElement";
import SubmitButton from "./components/submitButton";
import { useNavigate } from "react-router-dom";

const Form = (props: any) => {
  const { inputData, setInputData } = props;

  const navigate = useNavigate();

  const handleSubmit = (submitProp: any) => {
    submitProp.preventDefault();
    setInputData([]);
    if (
      submitProp?.target?.[0]?.value === "" ||
      submitProp?.target?.[1]?.value === "" ||
      submitProp?.target?.[2]?.value === ""
    ) {
      alert("Please fill all the required fields");
    } else {
      for (let i = 0; i < submitProp?.target?.length - 1; i++) {
        setInputData((prev: any) => [...prev, submitProp?.target?.[i]?.value]);
      }
      navigate("/secondPage");
    }
  };

  console.log("Values are stored Locally", inputData);

  return (
    <form
      onSubmit={handleSubmit}
      style={{ border: "1px solid grey", padding: "2rem" }}
    >
      <FormElement name={"Name"} inputType={"text"} />
      <FormElement name={"Phone Number"} inputType={"number"} />
      <FormElement name={"Email"} inputType={"email"} />
      <SubmitButton />
    </form>
  );
};

export default Form;
