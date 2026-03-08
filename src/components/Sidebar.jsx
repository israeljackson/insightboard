import { Squares2X2Icon } from "@heroicons/react/24/outline";
import {CubeIcon} from "@heroicons/react/24/outline";
import {DocumentTextIcon} from "@heroicons/react/24/outline";
import {ArrowUpTrayIcon} from "@heroicons/react/24/outline";
import {CheckCircleIcon} from "@heroicons/react/24/outline";
import SidebarItem from "./SidebarItem";

function Sidebar({collapsed}) {

  return ( 
    <ul className=" text-black font-medium space-y-2 pt-4 text-xl sticky top-0 " >


      <SidebarItem to="/dashboard" icon={Squares2X2Icon} collapsed={collapsed}>{!collapsed && "DashBoard"}</SidebarItem>

      <SidebarItem to="/product" icon={CubeIcon}>{!collapsed && "Products"}</SidebarItem>

      <SidebarItem to="/report" icon={DocumentTextIcon}>{!collapsed && "Reports"}</SidebarItem>

      <SidebarItem to="/import" icon={ArrowUpTrayIcon}>{!collapsed && "Import Data"}</SidebarItem>  

      <SidebarItem to="/todo" icon={CheckCircleIcon}>{!collapsed && "To Do List"}</SidebarItem> 
    </ul>
   );
}

export default Sidebar;