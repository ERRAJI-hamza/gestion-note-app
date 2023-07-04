import axios from 'axios';
import React ,{useState , useEffect} from 'react'
import { toast } from 'react-hot-toast';

export const UpdateElementForm = ({values,id,updateName,updateModule,updateProf,
    setupdateName,setupdateModule,setupdateProf}) => {

const [modules, setModules] = useState();
const [profs, setProfs] = useState();
//get all module
const getAllModule = async () => {
    try {
      const { data } = await axios.get("/api/user/get-modules");
      if (data?.success) {
        setModules(data?.modules);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting modules");
    }
  };
//get all prof
const getAllProf = async () => {
    try {
      const { data } = await axios.get("/api/user/get-profs");
      if (data?.success) {
        setProfs(data?.profs);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting prof");
    }
  };

useEffect(() => {
    getAllModule();
    getAllProf();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
        try {
          const { data } = await axios.put(
            `/api/user/update-element/${id}`,
            { 
              name:updateName,
              module:updateModule,
              professeur:updateProf,
            } 
          );
          if (data?.success) {
            toast.success(`elment is updated`);
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
   <div className="modal fade" id="exampleModalupdateElement" tabIndex="{-1}" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
              value={updateModule}
              onChange={(e) => setupdateModule(e.target.value)}>
                <option >Module</option>
                {modules?.map((m)=>(
                    <option key={m._id} value={m._id}>{m.name}</option>
                ))}  
              </select>
            </div>
            <div className="mb-3">
              <select className="form-select" 
              aria-label="Default select example"
              value={updateProf}
              onChange={(e) => setupdateProf(e.target.value)}>
                <option >Prof charge a ce element</option>
                {profs?.map((p)=>(
                    <option key={p._id} value={p._id}>{p.firstName}-{p.lastName}</option>
                ))} 
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
