import { TrashIcon, ClockIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

function TaskCard({ id, title, description, completed, onDelete, onToggle}) {
  return ( 
    <div className={`bg-white rounded-lg shadow-lg p-4 mb-4 
        ${completed ? "border-green-400" : "border-yellow-400"} 
        border-l-4 grid grid-cols-[auto_1fr] gap-4`
    }>
      {/* Left column: Icon */}
      <div 
        className="flex items-start pt-1 cursor-pointer"
        onClick={() => onToggle(id)}>
          {completed ? (
            <CheckCircleIcon className="h-12 w-12 bg-green-400 text-white text-4xl p-2 rounded-full" />
          ) : (
            <ClockIcon className="h-12 w-12 bg-yellow-400 text-white text-4xl p-2 rounded-full m-0" />
          )}
      </div>

      {/* Right column: Task details */}
      <div>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <div className="flex items-center justify-between mt-1 text-sm font-medium">
          <p className={completed ? "text-green-400" : "text-yellow-400"}>
            {completed ? "Completed" : "Pending"}
          </p>
          <button onClick={() =>onDelete(id)} className="mt-2 text-red-600 hover:text-red-800">
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
  
    </div>
   );
}

export default TaskCard;