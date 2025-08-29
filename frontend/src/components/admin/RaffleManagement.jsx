import { useState } from 'react';
import Input from '@/components/ui/Input.jsx';
import Button from '@/components/ui/Button.jsx';
import LoadingSpinner from '@/components/ui/LoadingSpinner.jsx';
import ErrorMessage from '@/components/ui/ErrorMessage.jsx';
import { mockRaffles } from '@/data/mockData.js';

/**
 * RaffleManagement Component - Handles raffle creation and management
 * @param {Object} props
 * @param {Function} [props.onRaffleCreate] - Callback when raffle is created
 * @param {Function} [props.onRaffleEdit] - Callback when raffle is edited
 * @param {Function} [props.onRaffleDelete] - Callback when raffle is deleted
 */
export default function RaffleManagement({ onRaffleCreate, onRaffleEdit, onRaffleDelete }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    maxTickets: '',
    prizes: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
  // Ticket price is fixed, no validation needed
    
    if (!formData.maxTickets || formData.maxTickets <= 0) {
      newErrors.maxTickets = "Valid max tickets is required";
    }
    
  // No end date validation needed

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setSubmitError("");
    setSuccessMessage("");
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newRaffle = {
        id: `raff-${Date.now()}`,
        kind: 'Raffle',
        title: formData.title,
        description: formData.description,
        badge: `100k / ticket`,
        max: parseInt(formData.maxTickets),
        value: 0,
        ticketPrice: 100000,
        status: 'active',
        createdBy: 'admin',
        prizes: formData.prizes.split(',').map(p => p.trim()).filter(p => p)
      };
      
      if (onRaffleCreate) {
        onRaffleCreate(newRaffle);
      }
      
      setSuccessMessage(`Raffle "${formData.title}" created successfully!`);
      setFormData({
        title: '',
        description: '',
        maxTickets: '',
        prizes: ''
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
      
    } catch (error) {
      setSubmitError(`Failed to create raffle: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleDeleteRaffle = async (raffleId) => {
    if (!confirm('Are you sure you want to delete this raffle?')) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onRaffleDelete) {
        onRaffleDelete(raffleId);
      }
      
      setSuccessMessage("Raffle deleted successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setSubmitError(`Failed to delete raffle: ${error.message}`);
    }
  };

  const formatEndDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h3 className="text-lg font-semibold mb-4 text-white">Raffle Management</h3>
      
      {submitError && (
        <ErrorMessage 
          message={submitError} 
          onDismiss={() => setSubmitError("")}
          className="mb-4"
        />
      )}
      
      {successMessage && (
        <ErrorMessage 
          message={successMessage} 
          variant="info"
          onDismiss={() => setSuccessMessage("")}
          className="mb-4"
        />
      )}

      {/* Create New Raffle Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Raffle Title"
            value={formData.title}
            onChange={handleChange('title')}
            error={errors.title}
            placeholder="Enter raffle title"
            required
          />
          <div className="flex items-center text-sm text-zinc-500 font-semibold pl-1 pt-6">
            Ticket Cost: <span className="ml-2 font-bold">100k</span> (fixed)
          </div>
          <Input
            label="Max Tickets"
            type="number"
            value={formData.maxTickets}
            onChange={handleChange('maxTickets')}
            error={errors.maxTickets}
            placeholder="1000"
            min="1"
            required
          />
        </div>
        
        <Input
          label="Description (Optional)"
          value={formData.description}
          onChange={handleChange('description')}
          placeholder="Brief description of the raffle"
        />
        
        <Input
          label="Prizes (comma-separated)"
          value={formData.prizes}
          onChange={handleChange('prizes')}
          placeholder="$100,000 Cash, $25,000 Bonus, Special Item"
        />
        
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full md:w-auto"
        >
          {loading ? (
            <LoadingSpinner size="sm" text="Creating..." />
          ) : (
            'Create Raffle'
          )}
        </Button>
      </form>

      {/* Existing Raffles */}
      <div className="border-t border-zinc-800 pt-4">
        <h4 className="font-medium text-white mb-3">Active Raffles</h4>
        <div className="space-y-3">
          {mockRaffles.map(raffle => (
            <div key={raffle.id} className="p-3 border border-zinc-700 rounded-lg bg-zinc-800/50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h5 className="font-medium text-white">{raffle.title}</h5>
                  <p className="text-sm text-zinc-400 mt-1">{raffle.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-zinc-500">
                    <span>Ticket Cost: <span className="font-bold">100k</span> (fixed)</span>
                    <span>Sold: {raffle.value}/{raffle.max}</span>
                    <span>Ends when all tickets are purchased</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => onRaffleEdit && onRaffleEdit(raffle.id)}
                    className="px-2 py-1 text-xs bg-blue-700 hover:bg-blue-600 rounded text-white transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRaffle(raffle.id)}
                    className="px-2 py-1 text-xs bg-red-700 hover:bg-red-600 rounded text-white transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}