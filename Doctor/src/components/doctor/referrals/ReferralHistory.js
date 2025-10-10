"use client";
import { useState } from "react";

export default function ReferralHistory({ referrals, searchTerm, onSearchChange, onViewDetails }) {
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusInfo = (status) => {
    const statuses = {
      completed: { color: 'bg-green-100 text-green-700 border-green-200', icon: 'bi-check-circle-fill' },
      accepted: { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: 'bi-check-lg' },
      pending: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: 'bi-hourglass-split' },
      rejected: { color: 'bg-red-100 text-red-700 border-red-200', icon: 'bi-x-circle-fill' },
    };
    return statuses[status] || { color: 'bg-gray-100 text-gray-700', icon: 'bi-question-circle' };
  };

  const filteredReferrals = referrals.filter(r => {
    const matchesSearch =
      r.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.referredTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.referralId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-grow relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by patient, specialist, or ID..."
            className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <i className="bi bi-search absolute left-3 top-3.5 text-gray-400"></i>
        </div>
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
      
      {/* Referrals List */}
      <div className="space-y-4">
        {filteredReferrals.map((referral) => {
          const statusInfo = getStatusInfo(referral.status);
          return (
            <div key={referral.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                {/* Patient Info */}
                <div className="md:col-span-1">
                  <h4 className="font-semibold text-gray-800">{referral.patientName}</h4>
                  <p className="text-sm text-gray-500">ID: {referral.patientId}</p>
                  <p className="text-xs text-gray-400 mt-1">{referral.referralId}</p>
                </div>

                {/* Referral To Info */}
                <div className="md:col-span-1">
                    <h4 className="font-semibold text-gray-800">{referral.referredTo}</h4>
                    <p className="text-sm text-gray-500">{referral.specialty}</p>
                     <p className="text-xs text-gray-400 mt-1">Referred: {new Date(referral.referralDate).toLocaleDateString()}</p>
                </div>

                {/* Reason */}
                <div className="md:col-span-2">
                    <p className="text-sm text-gray-700 line-clamp-2"><strong className="font-medium">Reason:</strong> {referral.reason}</p>
                </div>
              </div>
              
              {/* Status and Actions */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-2 ${statusInfo.color}`}>
                  <i className={`bi ${statusInfo.icon}`}></i>
                  {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                </span>
                <div className="flex items-center gap-2">
                    <button className="text-sm font-medium text-green-600 hover:underline">Track Status</button>
                    <button className="text-sm font-medium text-blue-600 hover:underline">View Details</button>
                </div>
              </div>
              
            </div>
          );
        })}
      </div>

      {filteredReferrals.length === 0 && (
        <div className="text-center py-16">
            <i className="bi bi-send-slash text-5xl text-gray-300 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-500">No Referrals Found</h3>
            <p className="text-gray-400 mt-1">
                {searchTerm || statusFilter !== 'all' ? "Try adjusting your search or filters." : "No referrals have been created yet."}
            </p>
        </div>
      )}
    </div>
  );
}
