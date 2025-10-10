import React from 'react';


// Helper to format the appointment type
const AppointmentTypeBadge = ({ type }) => {
  const styles = {
    virtual: 'bg-blue-100 text-blue-700',
    'walk-in': 'bg-green-100 text-green-700',
    offline: 'bg-purple-100 text-purple-700',
  };
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[type] || 'bg-gray-100 text-gray-700'}`}>
      {type.replace('-', ' ')}
    </span>
  );
};

// Helper to format the session type
const SessionTypeBadge = ({ sessionType }) => {
  const styles = {
    'Checkup': 'bg-yellow-100 text-yellow-700',
    'Follow-Up': 'bg-pink-100 text-pink-700',
    'Therapy': 'bg-indigo-100 text-indigo-700',
    'Consultation': 'bg-orange-100 text-orange-700',
  };
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[sessionType] || 'bg-gray-100 text-gray-700'}`}>
      {sessionType}
    </span>
  );
};

export default function UpcomingAppointments({ appointments, onViewDetails, onComplete, onHandwritten }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Appointments</h2>
      {appointments.length > 0 ? (
        <div className="space-y-4">
          {appointments.map((app) => (
            <div key={app.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                {/* Left Side: Patient and Details */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 text-gray-500">
                    <i className="bi bi-person text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{app.patientName}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-600">
                      <span className="flex items-center">
                        <i className="bi bi-calendar3 mr-1.5"></i>
                        {new Date(app.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                      <span className="flex items-center">
                        <i className="bi bi-clock mr-1.5"></i>
                        {app.time}
                      </span>
                    </div>
                    <div className="mt-2 flex gap-2 flex-wrap">
                      <AppointmentTypeBadge type={app.type} />
                      <SessionTypeBadge sessionType={app.sessionType} />
                    </div>
                  </div>
                </div>
                {/* Right Side: Action Buttons */}
                <div className="mt-4 sm:mt-0 flex-shrink-0 flex sm:flex-col items-center gap-2 self-end sm:self-start">
                  <button
                    onClick={() => onViewDetails(app)}
                    className="px-4 py-2 w-full border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onComplete(app.id)}
                    className="bg-green-600 text-white px-4 py-2 w-full rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <i className="bi bi-file-earmark-medical"></i>
                    Prescription
                  </button>
                  <button
                    onClick={() => onHandwritten(app.id)}
                    className="bg-yellow-500 text-white px-4 py-2 w-full rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <i className="bi bi-pencil"></i>
                    Handwritten Prescription
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <i className="bi bi-calendar-check text-4xl text-gray-300 mb-4"></i>
          <h3 className="text-lg font-medium text-gray-500">No Upcoming Appointments</h3>
          <p className="text-gray-400 mt-1">All scheduled appointments will be displayed here.</p>
        </div>
      )}
    </div>
  );
}