import React ,{useEffect, useState} from 'react'
import { Layout } from '../../components/Layout/Layout.js'
import { AddForm } from './form/AddForm.js';
import axios from 'axios';
import  toast from 'react-hot-toast';
import { UpdateProfForm } from './form/UpdateProfForm.js';



export const AdminDashboard = () => {
  const [profs, setProf] = useState();
  const [selected, setSelected] = useState(null);

  //get all prof
const getAllProf = async () => {
    try {
      const { data } = await axios.get("/api/user/get-profs");
      if (data?.success) {
        setProf(data?.profs);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting prof");
    }
  };

  useEffect(() => {
    getAllProf();
  }, []);

  //delete prof
  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `/api/user/delete-prof/${pid}`
      );
      if (data.success) {
        getAllProf();
        window.location.reload();
        toast.success(`prof is deleted`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  return (
    <Layout>
       <div className='container'>
          <h4 className='ms-4' data-bs-toggle="modal" data-bs-target="#exampleModal"
          style={{cursor: "pointer"}}>
              <i className="fa-solid fa-plus text-success py-4" />
                  Add professeur
          </h4>
          <table className="table">
             <thead>
                <tr>
                <th scope="col">name</th>
                <th scope="col">prenom</th>
                <th scope="col">speciality</th>
                <th scope="col">email</th>
                <th scope="col">Action</th>
               </tr>
             </thead>
             <tbody>
              {profs?.map((p)=>(
                <tr key={p._id}>
                   <td>{p.firstName}</td>
                   <td>{p.lastName}</td>
                   <td>{p.speciality}</td>
                   <td>{p.email}</td>
                   <td>
                       <button
                            className="btn btn-primary ms-2"
                            data-bs-toggle="modal" data-bs-target="#exampleModalupdate"
                            onClick={()=>{
                              setSelected(p._id);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(p._id);
                            }}
                          >
                            Delete
                        </button>
                    </td>
                </tr>   
              ))}  
             </tbody>
          </table>
          <AddForm  values={getAllProf}/>
          <UpdateProfForm   
          values={getAllProf} 
          id={selected}
          />
       </div>
    </Layout>
  )
}
