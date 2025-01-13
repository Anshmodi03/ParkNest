import React from "react";

const Notification = ({ notifications }) => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`relative mb-2 px-4 py-2 rounded-md shadow-md ${
            notif.type === "info" ? "bg-green-600 text-white" : "bg-red-600"
          } transition-transform transform duration-500 ease-in-out`}
        >
          <p className="text-sm">{notif.message}</p>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
            <div
              className={`h-full ${
                notif.type === "info" ? "bg-blue-400" : "bg-red-400"
              }`}
              style={{ width: "100%", animation: "progress 3s linear" }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notification;
