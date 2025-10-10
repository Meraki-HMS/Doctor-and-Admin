"use client";
import { useState } from "react";

// Modal to display the Zoom link and passcode
function MeetingLinkModal({ consultation, onClose }) {
    const [copied, setCopied] = useState(null); // null, 'url', or 'code'

    const handleCopy = (text, type) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            setCopied(type);
            setTimeout(() => setCopied(null), 2000); // Reset message after 2 seconds
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
        document.body.removeChild(textArea);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Meeting Details</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><i className="bi bi-x-lg"></i></button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-600">Meeting URL</label>
                        <div className="flex items-center gap-2 mt-1">
                            <input type="text" readOnly value={consultation.joinUrl} className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm"/>
                            <button onClick={() => handleCopy(consultation.joinUrl, 'URL')} className="p-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300">
                                <i className="bi bi-clipboard"></i>
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600">Passcode</label>
                         <div className="flex items-center gap-2 mt-1">
                            <input type="text" readOnly value={consultation.passcode} className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm"/>
                             <button onClick={() => handleCopy(consultation.passcode, 'Passcode')} className="p-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300">
                                <i className="bi bi-clipboard"></i>
                            </button>
                        </div>
                    </div>
                    {copied && <p className="text-sm text-green-600 text-center pt-2">Copied {copied} to clipboard!</p>}
                </div>
                 <div className="mt-6 text-right">
                    <button onClick={onClose} className="px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 text-sm">Close</button>
                </div>
            </div>
        </div>
    );
}


export default function ConsultationList({
  consultations,
  onReschedule,
  onViewDetails,
}) {
  const [linkModalData, setLinkModalData] = useState(null);

  const formatDuration = (minutes) => {
    if (!minutes) return '';
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <>
      <div className="space-y-4">
        {consultations.map((consultation) => (
            <div 
              key={consultation.id} 
              className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-100 text-blue-600">
                      <i className="bi bi-camera-video text-xl"></i>
                  </div>
                  <div>
                      <h3 className="font-semibold text-gray-800">{consultation.patientName}</h3>
                      <p className="text-sm text-gray-500">
                          ID: {consultation.patientId} • {consultation.consultationId}
                      </p>
                       <div className="flex items-center gap-2 mt-1">
                         <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200 capitalize">
                            {consultation.status}
                         </span>
                       </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-semibold text-gray-800">{consultation.appointmentTime}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(consultation.appointmentDate).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDuration(consultation.duration)}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-700 mb-2">
                    <span className="font-medium">Condition:</span> {consultation.condition}
                </p>
              </div>
              
              {/* Action buttons are laid out as requested */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex gap-2">
                    <button
                        onClick={() => window.open(consultation.joinUrl, '_blank')}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                    >
                        <i className="bi bi-camera-video"></i>
                        Join Now
                    </button>
                     <button
                        onClick={() => setLinkModalData(consultation)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                        Meeting URL
                    </button>
                    <button
                        onClick={() => onReschedule(consultation.id)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                        Reschedule
                    </button>
                </div>
                
                <button
                    onClick={() => onViewDetails(consultation)}
                    className="text-sm font-medium text-blue-600 hover:underline"
                >
                    View Details
                </button>
              </div>
            </div>
          ))}

        {consultations.length === 0 && (
          <div className="text-center py-8">
            <i className="bi bi-calendar-x text-3xl text-gray-300 mb-3"></i>
            <h3 className="text-lg font-medium text-gray-500">No Upcoming Consultations</h3>
            <p className="text-gray-400 mt-1">All scheduled consultations will appear here.</p>
          </div>
        )}
      </div>

      {linkModalData && <MeetingLinkModal consultation={linkModalData} onClose={() => setLinkModalData(null)} />}
    </>
  );
}