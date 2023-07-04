import React, { useState ,useEffect} from 'react'
import { LayoutProf } from '../../components/Layout/LayoutProf.js'
import { useAuth } from '../../context/Auth';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import moment from 'moment';
import { NavLink , Link } from 'react-router-dom';

export const ProfDashboard = () => {
  const [auth, setAuth] = useAuth();
  const [elementsOfProf, setElementsOfProf] = useState([]);
  const [modulesLoaded, setModulesLoaded] = useState(false);

  useEffect(() => {
    const getElements = async () => {
      try {
        const response = await axios.get(`/api/user/get-elements-by-prof/${auth.user._id}`);
        const { data } = response;
        if (data.success) {
          setElementsOfProf(data.elements);
          setModulesLoaded(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (auth.user) {
      getElements();
    }
  }, [auth.user]);
  
  useEffect(() => {
    renderElements();
  }, [modulesLoaded]);

/***pour get the module  coresspend cette element by its id***/
async function getModule(id){
  try {
    const { data } = await axios.get(`/api/user/get-module/${id}`);
    return data?.module ;
 } catch (error) {
    console.log(error);
    toast.error("Something went wrong in getting modulesss");
  }
}

async function renderElements() {
  const updatedElements = await Promise.all(
    elementsOfProf?.map(async (e) => {
      try {
        const moduleofElement = await getModule(e.module);
        if (moduleofElement) {
          return {
            ...e,
            moduleofElement: moduleofElement,
          };
        } else {
          throw new Error("Module not found");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong in getting modules");
      }
    })
  );
  setElementsOfProf(updatedElements);
}


  return (
  <LayoutProf>
    {console.log(elementsOfProf)}
    <div className='Prof-page'>
      <div className="card-container">
      {elementsOfProf?.map((e)=>(
        <div className="card">
          <h5 className="card-header">{e?.moduleofElement?.filiere}</h5>
          <div className="card-body">
           <h5 className="card-title">{e?.name}({e?.moduleofElement?.name})</h5>
           <p className="card-text">derniere modification a {moment(e?.updatedAt).format('DD/MM/YYYY hh:mm')}</p>
           <NavLink to={`/Home/prof/noteElement/${e._id}`} className='linktoNote'>Add note</NavLink>
          </div>
        </div>
        ))}
      </div>
    </div>
   </LayoutProf>
    
  )
}
