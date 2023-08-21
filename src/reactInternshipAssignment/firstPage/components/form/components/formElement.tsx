

const FormElement = (props:any) => {
    const { name, inputType } = props;
  return (
    <div style={{margin:'2rem 0'}}>
        <label style={{float:'left',margin:'0 1rem 0 0'}}>{name}</label>
        <input type={inputType} />
    </div>
  )
}

export default FormElement