import axios from 'axios';
import React ,{useState} from 'react'
import { toast } from 'react-hot-toast';

export const UpdateFormModule = ({values,id,updateName,updateFiliere,updateSemestre,
                                 setupdateName,setupdateFiliere,setupdateSemestre}) => {

  const handleSubmit = async (e) => {
    e.preventDefault();
        try {
          const { data } = await axios.put(
            `/api/user/update-module/${id}`,
            { 
              name:updateName ,
              filiere:updateFiliere,
              semestre:updateSemestre,
            } 
          );
          if (data?.success) {
            toast.success(`module is updated`);
            values();
            window.location.reload();
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.log(error);
          window.location.reload();
        }
      };

  return (
   <div className="modal fade" id="exampleModalupdateModule" tabIndex="{-1}" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
              value={updateName}
              onChange={(e) => setupdateName(e.target.value)}
              required/>
            </div>
            <div className="mb-3">
              <select className="form-select" 
              aria-label="Default select example"
              value={updateFiliere}
              onChange={(e) => setupdateFiliere(e.target.value)}>
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
              value={updateSemestre}
              onChange={(e) => setupdateSemestre(e.target.value)}>
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
