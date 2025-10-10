"use client";
import { useEffect, useState } from "react";
import ConsultationList from "../../../components/doctor/video-consult/ConsultationList";
import ConsultationHistory from "../../../components/doctor/video-consult/ConsultationHistory";

// Mock data for video consultations with added passcode
const consultationsData = [
    {
        id: 1,
        consultationId: "VC-001",
        patientId: "P001",
        patientName: "John Smith",
        appointmentDate: "2024-01-15",
        appointmentTime: "10:00 AM",
        duration: 30,
        status: "scheduled",
        type: "follow-up",
        condition: "Hypertension Management",
        notes: "Discuss medication adjustment",
        joinUrl: "https://zoom.us/j/1234567890",
        passcode: "12345",
        recordingUrl: null,
        symptoms: ["High BP", "Headache"],
        priority: "routine"
    },
    {
        id: 4,
        consultationId: "VC-004",
        patientId: "P004",
        patientName: "Sarah Chen",
        appointmentDate: "2024-01-16",
        appointmentTime: "09:00 AM",
        duration: 60,
        status: "scheduled",
        type: "procedure-consult",
        condition: "Pre-surgery Discussion",
        notes: "Discuss upcoming surgery procedure",
        joinUrl: "https://zoom.us/j/9876543210",
        passcode: "54321",
        recordingUrl: null,
        symptoms: ["Scheduled surgery", "Pre-op assessment"],
        priority: "high"
    },
    {
        id: 3,
        consultationId: "VC-003",
        patientId: "P003",
        patientName: "Robert Johnson",
        appointmentDate: "2024-01-15",
        appointmentTime: "02:15 PM",
        duration: 30,
        status: "completed",
        type: "consultation",
        condition: "Diabetes Checkup",
        notes: "Regular diabetes management",
        joinUrl: "https://zoom.us/j/5555555555",
        passcode: "55555",
        recordingUrl: "https://storage.meraki.com/recordings/vc-003",
        symptoms: ["High blood sugar", "Fatigue"],
        priority: "routine"
    },
];

// ++ Test Equipment Modal Component ++
function TestEquipmentModal({ onClose }) {
    const [testStep, setTestStep] = useState(1);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (testStep < 3) {
                setTestStep(testStep + 1);
            } else {
                const closeTimer = setTimeout(onClose, 2000);
                return () => clearTimeout(closeTimer);
            }
        }, 2500);
        return () => clearTimeout(timer);
    }, [testStep, onClose]);
    const steps = { 1: { icon: "bi-mic-fill", text: "Testing Microphone..." }, 2: { icon: "bi-volume-up-fill", text: "Testing Speakers..." }, 3: { icon: "bi-camera-video-fill", text: "Testing Camera..." } };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 m-4 max-w-sm w-full text-center shadow-2xl">
                <div className="animate-pulse"><i className={`bi ${steps[testStep].icon} text-5xl text-green-500 mb-4`}></i><h3 className="text-xl font-bold text-gray-800">{steps[testStep].text}</h3></div>
                {testStep === 3 && (<p className="text-green-600 font-semibold mt-4">All equipment working perfectly!</p>)}
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-6"><div className="bg-green-500 h-2.5 rounded-full transition-all duration-1000 ease-linear" style={{ width: `${(testStep / 3) * 100}%` }}></div></div>
            </div>
        </div>
    );
}

// ++ Simplified Consultation Detail Modal ++
function ConsultationDetailModal({ consultation, onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
             <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Consultation Details</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-2 rounded-lg"><i className="bi bi-x-lg text-xl"></i></button>
                </div>
                <div className="p-6 space-y-4">
                    <div><h3 className="font-semibold text-gray-800">Patient:</h3><p>{consultation.patientName} (ID: {consultation.patientId})</p></div>
                    <div><h3 className="font-semibold text-gray-800">Date & Time:</h3><p>{new Date(consultation.appointmentDate).toLocaleDateString()} at {consultation.appointmentTime}</p></div>
                    <div><h3 className="font-semibold text-gray-800">Condition:</h3><p>{consultation.condition}</p></div>
                    <div><h3 className="font-semibold text-gray-800">Notes:</h3><p>{consultation.notes}</p></div>
                    <div className="text-right mt-4">
                        <button onClick={onClose} className="px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 text-sm">Close</button>
                    </div>
                </div>
             </div>
        </div>
    );
}


export default function VideoConsultPage() {
    const [consultations, setConsultations] = useState([]);
    const [activeTab, setActiveTab] = useState("upcoming");
    const [selectedConsultation, setSelectedConsultation] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("scheduled"); // Default changed to 'scheduled'
    const [showTestEquipment, setShowTestEquipment] = useState(false);

    useEffect(() => {
        setConsultations(consultationsData);
    }, []);

    const handleReschedule = (consultationId) => { console.log("Rescheduling:", consultationId); };
    
    // The filter now works without an "all" option.
    // It filters the base list, which is then divided into upcoming and history.
    const filteredConsultations = consultations.filter(consultation => {
        const matchesSearch = consultation.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || consultation.condition.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = consultation.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // We now filter the main list based on the active tab's criteria
    const upcomingConsultations = consultations.filter(c => c.status === 'scheduled');
    const completedOrCancelled = consultations.filter(c => ['completed', 'cancelled'].includes(c.status));

    // The consultations to display depend on the active tab and then the filters
    const displayedUpcoming = upcomingConsultations.filter(c => 
        (c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || c.condition.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const displayedHistory = completedOrCancelled.filter(c => 
        (c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || c.condition.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === 'scheduled' ? true : c.status === statusFilter) // Show all history if filter is on scheduled, else filter by status
    );

    return (
        <>
            <main className="flex-1 p-4 lg:p-6 overflow-auto">
                <div className="mb-6 lg:mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Video Consultations</h1>
                            <p className="text-gray-600 mt-2">Manage virtual appointments and telemedicine sessions</p>
                        </div>
                        <div className="flex items-center gap-3 mt-4 lg:mt-0">
                            <button onClick={() => setShowTestEquipment(true)} className="bg-green-600 text-white px-4 py-3 rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center gap-2">
                                <i className="bi bi-camera-video"></i> Test Equipment
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex">
                            <button onClick={() => { setActiveTab("upcoming"); setStatusFilter("scheduled"); }} className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === "upcoming" ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                                <i className="bi bi-calendar-check mr-2"></i> Upcoming ({upcomingConsultations.length})
                            </button>
                            <button onClick={() => setActiveTab("history")} className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === "history" ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                                <i className="bi bi-clock-history mr-2"></i> History ({completedOrCancelled.length})
                            </button>
                        </nav>
                    </div>
                    <div className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                            <div className="flex-1">
                                <div className="relative">
                                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by patient name or condition..." className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"/>
                                    <i className="bi bi-search absolute left-3 top-3.5 text-gray-400"></i>
                                </div>
                            </div>
                            {activeTab === 'history' && (
                                <div className="flex items-center gap-4">
                                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500">
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                            )}
                        </div>
                        {activeTab === "upcoming" && <ConsultationList consultations={displayedUpcoming} onReschedule={handleReschedule} onViewDetails={setSelectedConsultation} />}
                        {activeTab === "history" && <ConsultationHistory consultations={displayedHistory} onViewDetails={setSelectedConsultation} onViewRecording={(c) => window.open(c.recordingUrl, '_blank')} />}
                    </div>
                </div>
            </main>

            {showTestEquipment && <TestEquipmentModal onClose={() => setShowTestEquipment(false)} />}
            {selectedConsultation && (<ConsultationDetailModal consultation={selectedConsultation} onClose={() => setSelectedConsultation(null)} />)}
        </>
    );
}