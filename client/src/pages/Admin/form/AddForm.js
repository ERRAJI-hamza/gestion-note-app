import axios from 'axios';
import React ,{ useState } from 'react'
import toast  from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const AddForm = (props) => {
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [speciality, setSpeciality] = useState("");

    const navigate = useNavigate();
 
 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post("/api/user/add-prof", {
            firstName,
            lastName,
            email,
            password,
            speciality
        });
        if (res && res.data.success) {
          toast.success(res.data && res.data.message);   
          props.values();   
          window.location.reload();
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
        window.location.reload();
      }
  };

  return (
    <>
<div className="sublogo">
  <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="enrollLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="enrolllabel">Add Professeur</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nom" className="col-form-label">nom:</label>
              <input type="text" 
              className="form-control" 
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              required/>
            </div>
            <div className="mb-3">
              <label htmlFor="prenom" className="col-form-label">prenom: </label>
              <input type="text" 
              className="form-control" 
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              required/>
            </div>
            <div className="mb-3"> 
              <label htmlFor="email" className="col-form-label">email:</label>
              <input type="email" 
              className="form-control" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required/>
            </div>
            <div className="mb-3">    
              <label htmlFor="password" className="col-form-label">password:</label>
              <input type="password" 
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
            </div>
            <div className="mb-3">    
              <label htmlFor="speciality" className="col-from-label">speciality: </label>
              <input type="text" 
              className="form-control" 
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              required/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <input type="submit" className="btn btn-primary" defaultValue="Save change"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  )
}
