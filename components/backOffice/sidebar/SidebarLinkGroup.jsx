'use client'
import React, { useState } from 'react';

function SidebarLinkGroup({
  children,
  activeCondition,
}) {

  const [open, setOpen] = useState(activeCondition);

  const handleClick = () => {
    setOpen(!open);
  }

  return (
    <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${activeCondition && 'bg-slate-900'}`}>
      {children(handleClick, open)}
    </li>
  );
}

export default SidebarLinkGroup;