
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
const TreeviewMenu = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const [Act,setAct]=useState(true);
  useEffect(() => {
    if ( Act) {
     navigate(-1); 
    }
  }, [ navigate]);
  return (
    <li className={`treeview ${isOpen ? 'active' : ''}`}>
      <a href="#" onClick={toggleMenu}>
        <i className="fa fa-table"></i> <span>{title}</span>
        <i className={`fa pull-right ${isOpen ? 'fa-angle-down' : 'fa-angle-left'}`}></i>
      </a>
      <ul className={`treeview-menu ${isOpen ? 'menu-open' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
        {children}
      </ul>
    </li>
  );
};

export default TreeviewMenu;
