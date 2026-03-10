import { useActivity } from "../context/useActivity";
import {
  PlusIcon,
  PencilIcon,
  CurrencyDollarIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

const iconMap = {
  product_added: PlusIcon,
  product_edited: PencilIcon,
  price_changed: CurrencyDollarIcon,
  task_completed: CheckCircleIcon
};

function RecentActivity() {

  const { activities } = useActivity();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-6">

      <h2 className="text-xl font-bold mb-4">
        Recent Activity
      </h2>

      <div className="space-y-4">

        {activities.length === 0 && (
          <p className="text-gray-500 text">
            No recent activity
          </p>
        )}

        {activities.slice(0,5).map(activity => {

          const Icon = iconMap[activity.type]

          return (
            <div
              key={activity.id}
              className="grid grid-cols-[auto_1fr] gap-4 items-center border-b pb-3 hover:bg-gray-100 p-2 rounded"
            >

              {/* Icon */}
              <div className="p-2 bg-blue-100 rounded-lg">
                {Icon && <Icon className="w-5 h-5 text-blue-600 " />}
              </div>

              {/* Activity details */}
              <div className="flex justify-between">
                <p className="text font-semibold text-gray-700">
                  {activity.message}
                </p>

                <span className="text-xs text-gray-400">
                  {activity.time}
                </span>
              </div>

            </div>
          )
        })}

      </div>

    </div>
  );
}

export default RecentActivity;