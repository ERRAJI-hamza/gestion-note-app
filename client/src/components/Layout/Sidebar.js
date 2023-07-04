import React from 'react'
import { adminMenu } from './Menus/adminMenu'
import { useLocation , Link } from 'react-router-dom'

export const Sidebar = () => {
  const location = useLocation();
  return (
    <div>
         <div className='sidebar'>
              <div className='menu'>
                  {adminMenu.map((e)=>{
                      const isActive = location.pathname === e.path;
                      return(
                         <div className={`menu-item ${isActive && "active"}`}>
                            <i className={e.icone}></i>
                            <Link to={e.path}>{e.name}</Link>
                         </div>
                      );
                  })}
              </div>
        </div>
    </div>
  )
}
