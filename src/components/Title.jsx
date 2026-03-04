import { useLocation } from "react-router-dom";

function Title({children}) {
  const location = useLocation();

  const titles = {
    "/":"Dashboard",
    "/product" : "Products",
    "/report" : "Reports",
    "/import" : "Import Data",
    "/todo" : "To Do List"
  }
  return ( 
    <div className="flex justify-between items-center mb-4 shadow-l p-3 bg-white rounded-2xl">
      <h1 className="font-bold text-3xl ">
        {titles[location.pathname]}
      </h1>
      <div className="flex items-center gap-4">
        {/* Right side: actions */}
        {children && <div className="flex items-center gap-4">{children}</div>}
      </div>
    </div>
   );
}

export default Title;