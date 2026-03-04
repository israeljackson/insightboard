import { NavLink } from "react-router-dom";

function SidebarItem({to, icon, children, collapsed}) {
  const Icon = icon
  return ( 
    <li>
      <NavLink 
      to={to}
      className={({isActive}) =>
        `flex items-center gap-2 p-2 rounded cursor-pointer ${isActive ?
          "bg-blue-800" : "hover:bg-blue-600"} ${collapsed ? "justify-center" : ""}
        `}
    >
        <Icon className={collapsed ? "h-10 w-10" : "h-6 w-6" }/>
        {children && <span>{children}</span>}
    </NavLink>
    </li>
   );
}

export default SidebarItem;