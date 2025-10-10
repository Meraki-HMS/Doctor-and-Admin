"use client";

import { useState } from "react";
import { commonTreatments } from "../../../mockData/diagnosisData"; // CORRECTED PATH

export default function TreatmentPlanForm({ plan, setPlan }) {
  const [newItem, setNewItem] = useState({ type: "medications", item: "", notes: "" });
  const [customItem, setCustomItem] = useState("");

  const handleAddItem = () => {
    if (!newItem.item && !customItem) return;
    
    const itemToAdd = customItem 
        ? { id: `custom-${Date.now()}`, name: customItem, category: newItem.type, notes: newItem.notes }
        : { ...JSON.parse(newItem.item), notes: newItem.notes };

    setPlan(prev => [...prev, itemToAdd]);
    setNewItem({ type: "medications", item: "", notes: "" });
    setCustomItem("");
  };

  const handleRemoveItem = (id) => {
    setPlan(prev => prev.filter(item => item.id !== id));
  };
  
  const currentOptions = commonTreatments[newItem.type] || [];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Treatment Plan</h3>
        
        {/* Added Items */}
        {plan.length > 0 && (
            <div className="space-y-3 mb-6">
                {plan.map(item => (
                    <div key={item.id} className="flex items-start justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <div>
                            <span className={`px-2 py-1 rounded text-xs font-medium mr-2
                                ${item.category === 'Medication' ? 'bg-blue-100 text-blue-700' : 
                                  item.category === 'Procedure' ? 'bg-purple-100 text-purple-700' : 
                                  'bg-green-100 text-green-700'}`}>
                                {item.category}
                            </span>
                            <span className="font-semibold text-gray-800">{item.name}</span>
                            {item.notes && <p className="text-xs text-gray-500 mt-1 pl-2 border-l-2 border-gray-300 ml-2">{item.notes}</p>}
                        </div>
                        <button type="button" onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700"><i className="bi bi-trash"></i></button>
                    </div>
                ))}
            </div>
        )}
        
        {/* Add New Item Form */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Item Type</label>
                <select value={newItem.type} onChange={e => setNewItem({...newItem, type: e.target.value, item: ""})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="medications">Medication</option>
                    <option value="procedures">Procedure</option>
                    <option value="therapies">Therapy</option>
                    <option value="lifestyle">Lifestyle</option>
                </select>
            </div>
            <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select or Add Item</label>
                 <div className="flex gap-2">
                    <select value={newItem.item} onChange={e => { setNewItem({...newItem, item: e.target.value }); setCustomItem(""); }} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500">
                        <option value="">Select common...</option>
                        {currentOptions.map(opt => <option key={opt.id} value={JSON.stringify(opt)}>{opt.name}</option>)}
                    </select>
                    <input type="text" value={customItem} onChange={e => { setCustomItem(e.target.value); setNewItem({...newItem, item: ""}); }} placeholder="Or add custom item..." className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500" />
                 </div>
            </div>
             <div className="md:col-span-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes / Instructions</label>
                <input type="text" value={newItem.notes} onChange={e => setNewItem({...newItem, notes: e.target.value})} placeholder="e.g., Twice daily, for 10 days" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
        </div>
        <button type="button" onClick={handleAddItem} className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2">
            <i className="bi bi-plus-lg"></i>Add to Plan
        </button>
    </div>
  );
}
