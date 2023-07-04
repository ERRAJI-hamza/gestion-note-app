import React ,{useState ,useEffect} from 'react'
import { Layout } from '../../components/Layout/Layout.js'
import { AddFormModule } from './moduleForm/AddFormModule.js'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { UpdateFormModule } from './moduleForm/UpdateFormModule.js'


export const AdminModule = () => {
  const [module, setModule] = useState();
  const [selected, setSelected] = useState(null);
  const [updateName, setupdateName] = useState("");
  const [updateFiliere, setupdateFiliere] = useState("");
  const [updateSemestre, setupdateSemestre] = useState("");

//get all module
const getAllModule = async () => {
    try {
      const { data } = await axios.get("/api/user/get-modules");
      if (data?.success) {
        setModule(data?.modules);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting modules");
    }
  };

  useEffect(() => {
    getAllModule();
  }, []);

  //delete module
  const handleDelete = async (mid) => {
    try {
      const { data } = await axios.delete(
        `/api/user/delete-module/${mid}`
      );
      if (data.success) {
        getAllModule();
        window.location.reload();
        toast.success(`module is deleted`);
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
       <h4 className='ms-4' data-bs-toggle="modal" data-bs-target="#addModulexampleModal"
          style={{cursor: "pointer"}}>
              <i className="fa-solid fa-plus text-success py-4" />
                  Add Module
          </h4>
          <table className="table">
             <thead>
                <tr>
                <th scope="col">name</th>
                <th scope="col">filiere</th>
                <th scope="col">semestre</th>
                <th scope="col">Action</th>
               </tr>
             </thead>
             <tbody> 
             {module?.map((m)=>(
                  <tr key={m._id}>
                  <td>{m.name}</td>
                  <td>{m.filiere}</td>
                  <td>{m.semestre}</td>
                  <td>
                       <button
                            className="btn btn-primary ms-2"
                            data-bs-toggle="modal" data-bs-target="#exampleModalupdateModule"
                            onClick={()=>{
                              setSelected(m._id);
                              setupdateName(m.name);
                              setupdateFiliere(m.filiere);
                              setupdateSemestre(m.semestre);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(m._id);
                            }}
                          >
                            Delete
                        </button>
                    </td>
                  </tr> 
                ))}     
            </tbody>
         </table> 
       </div>
       <AddFormModule
       values={getAllModule} />
       <UpdateFormModule
       values={getAllModule}  
       id={selected}
       updateName={updateName}
       updateFiliere={updateFiliere}
       updateSemestre={updateSemestre}
       setupdateName={setupdateName}
       setupdateFiliere={setupdateFiliere}
       setupdateSemestre={setupdateSemestre}/>
    </Layout>
  )
}
