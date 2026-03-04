import { HomeIcon } from "@heroicons/react/16/solid";
import {CubeIcon} from "@heroicons/react/24/solid";
import {DocumentTextIcon} from "@heroicons/react/16/solid";
import {ArrowUpTrayIcon} from "@heroicons/react/16/solid";
import {CheckCircleIcon} from "@heroicons/react/16/solid";
import SidebarItem from "./SidebarItem";

function Sidebar({collapsed}) {

  return ( 
    <ul className=" text-white font-medium space-y-2 pt-4 text-xl sticky top-0 " >

      <SidebarItem to="/" icon={HomeIcon} collapsed={collapsed}>{!collapsed && "DashBoard"}</SidebarItem>

      <SidebarItem to="/product" icon={CubeIcon}>{!collapsed && "Products"}</SidebarItem>

      <SidebarItem to="/report" icon={DocumentTextIcon}>{!collapsed && "Reports"}</SidebarItem>

      <SidebarItem to="/import" icon={ArrowUpTrayIcon}>{!collapsed && "Import Data"}</SidebarItem>  

      {/* <SidebarItem to="/todo" icon={CheckCircleIcon}>To Do List</SidebarItem>   */}
      <SidebarItem to="/todo" icon={CheckCircleIcon}>{!collapsed && "To Do List"}</SidebarItem> 
    </ul>
   );
}

export default Sidebar;