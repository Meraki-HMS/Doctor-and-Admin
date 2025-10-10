"use client";
import { useState } from "react";

export default function ConsultationHistory({ consultations, onViewDetails, onViewRecording }) {
  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-700 border-green-200',
      cancelled: 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[status] || colors.completed;
  };

  const getTypeColor = (type) => {
    const colors = {
      'new-patient': 'bg-blue-100 text-blue-700',
      'follow-up': 'bg-green-100 text-green-700',
      'consultation': 'bg-purple-100 text-purple-700',
      'procedure-consult': 'bg-orange-100 text-orange-700'
    };
    return colors[type] || colors.consultation;
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <div className="space-y-4">
      {consultations.map((consultation) => (
        <div 
          key={consultation.id} 
          className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-start justify-between mb-3">
            {/* Patient and Consultation Info */}
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                consultation.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                <i className={`bi bi-${consultation.status === 'completed' ? 'check-circle' : 'x-circle'} text-xl`}></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{consultation.patientName}</h3>
                <p className="text-sm text-gray-500">
                  ID: {consultation.patientId} • {consultation.consultationId}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(consultation.status)}`}>
                    {consultation.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(consultation.type)}`}>
                    {consultation.type.replace('-', ' ')}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDuration(consultation.duration)}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Date and Time */}
            <div className="text-right">
              <div className="font-semibold text-gray-800">
                {new Date(consultation.appointmentDate).toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-500">{consultation.appointmentTime}</div>
              {consultation.recordingUrl && (
                <div className="text-sm text-green-600 font-medium mt-1">
                  <i className="bi bi-camera-reels mr-1"></i>
                  Recorded
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-gray-100">
            <button
              onClick={() => onViewDetails(consultation)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              View Details
            </button>
            
            {consultation.recordingUrl && (
              <button
                onClick={() => onViewRecording(consultation)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
              >
                <i className="bi bi-play-circle"></i>
                Watch Recording
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Empty State */}
      {consultations.length === 0 && (
        <div className="text-center py-12">
          <i className="bi bi-clock-history text-4xl text-gray-300 mb-4"></i>
          <h3 className="text-lg font-medium text-gray-500">No consultation history found</h3>
          <p className="text-gray-400 mt-1">Completed or cancelled video consultations will appear here.</p>
        </div>
      )}
    </div>
  );
}
