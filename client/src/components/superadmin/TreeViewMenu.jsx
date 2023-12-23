import React, { useState } from 'react';

const TreeviewMenu = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

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
