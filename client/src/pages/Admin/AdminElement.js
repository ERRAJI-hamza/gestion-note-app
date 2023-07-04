import React,{useState , useEffect} from 'react'
import { Layout } from '../../components/Layout/Layout.js'
import { AddElmentForm } from './ElementForm/AddElmentForm.js'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { UpdateElementForm } from './ElementForm/UpdateElementForm.js'

export const AdminElement = () => {
const [element, setElement] = useState([]);
const [modulesLoaded, setModulesLoaded] = useState(false);
const [selected, setSelected] = useState(null);
const [updateName, setupdateName] = useState("");
const [updateModule, setupdateModule] = useState("");
const [updateProf, setupdateProf] = useState("");
//get all module
const getAllelment = async () => {
  try {
    const { data } = await axios.get("/api/user/get-elements");
    if (data?.success) {
      setElement(data?.elements);
      setModulesLoaded(true);
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong in getting modules");
  }
};

useEffect(() => {
  getAllelment();
}, []);


/***exucte renderElement after get all element *****/
useEffect(() => {
  renderElements();
}, [modulesLoaded]);
/***pour get the module and professeur coresspend cette element by its id***/
async function getModule(id){
      try {
        const { data } = await axios.get(`/api/user/get-module/${id}`);
        return data?.module?.name ;
     } catch (error) {
        console.log(error);
        toast.error("Something went wrong in getting modules");
      }
}

async function getProf(id){
  try {
    const { data } = await axios.get(`/api/user/get-prof/${id}`);
    return data?.prof ;
 } catch (error) {
    console.log(error);
    toast.error("Something went wrong in getting modules");
  }
}
async function renderElements() {
  const updatedElements = await Promise.all(
    element?.map(async (e) => {
      const moduleName = await getModule(e.module);
      const prof = await getProf(e.professeur);
      return {
        ...e,
        moduleName: moduleName,
        prof:prof,
      };
    })
  );
  setElement(updatedElements);
}

//delete element
const handleDelete = async (eid) => {
  try {
    const { data } = await axios.delete(
      `/api/user/delete-element/${eid}`
    );
    if (data.success) {
      getAllelment();
      window.location.reload();
      toast.success(`element is deleted`);
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
       <h4 className='ms-4' data-bs-toggle="modal" data-bs-target="#addElementxampleModal"
          style={{cursor: "pointer"}}>
              <i className="fa-solid fa-plus text-success py-4" />
                  Add Element
          </h4>
          <table className="table">
             <thead>
                <tr>
                <th scope="col">name</th>
                <th scope="col">Module</th>
                <th scope="col">prof</th>
                <th scope="col">coefficient</th>
                <th scope="col">Action</th>
               </tr>
             </thead>
             <tbody> 
             {element?.map((e)=>{
                return (
                  <tr key={e._id}>
                       <td>{`  ${e.name}`}</td>
                       <td>{`  ${e.moduleName}`}</td>
                       <td>{` ${e.prof?.firstName}-${e.prof?.lastName}`}</td>
                       <td>{`  ${e.coefficient}%`}</td>
                       <td>
                       <button
                            className="btn btn-primary ms-2"
                            data-bs-toggle="modal" data-bs-target="#exampleModalupdateElement"
                            onClick={()=>{
                              setSelected(e._id);
                              setupdateName(e.name);
                              setupdateModule(e.module);
                              setupdateProf(e.professeur);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(e._id);
                            }}
                          >
                            Delete
                        </button>
                    </td>
                  </tr>
                )
             })}    
            </tbody>
         </table> 
       </div>
          <AddElmentForm values={getAllelment}/>
          <UpdateElementForm
            values={getAllelment}  
            id={selected}
            updateName={updateName}
            updateModule={updateModule}
            updateProf={updateProf}
            setupdateName={setupdateName}
            setupdateModule={setupdateModule}
            setupdateProf={setupdateProf}/>
    </Layout>
  )
}
