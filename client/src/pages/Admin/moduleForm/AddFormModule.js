import axios from 'axios';
import React ,{useState} from 'react'
import { toast } from 'react-hot-toast';

export const AddFormModule = ({values}) => {
  const [name, setName] = useState("");
  const [filiere, setfiliere] = useState("");
  const [semestre, setsemestre] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post("/api/user/add-module", {
            name,
            filiere,
            semestre
        });
        if (res && res.data.success) {
          toast.success(res.data && res.data.message);   
          values(); 
          window.location.reload();
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
  };

  return (
   <div className="modal fade" id="addModulexampleModal" tabIndex="{-1}" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">add module</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
        </button></div>
      <div className="modal-body">
           <div className="mb-3">
              <input type="text" 
              className="form-control"
              placeholder='nom :' 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required/>
            </div>
            <div className="mb-3">
              <select className="form-select" 
              aria-label="Default select example"
              onChange={(e) => setfiliere(e.target.value)}>
                <option value={null}>flieire</option>
                <option value={"GI"}>GI</option>
                <option value={"IID"}>IID</option>
                <option value={"GE"}>GE</option>
                <option value={"IRIC"}>IRIC</option>
                <option value={"GPEE"}>GPEE</option>
              </select>
            </div>
            <div className="mb-3">
              <select className="form-select" 
              aria-label="Default select example"
              value={semestre}
              onChange={(e) => setsemestre(e.target.value)}>
                <option value={null}>semestre</option>
                <option value={"S1"}>S1</option>
                <option value={"S2"}>S2</option>
                <option value={"S3"}>S3</option>
                <option value={"S4"}>S4</option>
                <option value={"S5"}>S5</option>
              </select>
            </div>   
      </div>
      <div  className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>apply</button>
      </div>
    </div>
  </div>
</div>


  )
}
