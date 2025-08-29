import { useState } from 'react';
import Input from '@/components/ui/Input.jsx';
import Button from '@/components/ui/Button.jsx';
import LoadingSpinner from '@/components/ui/LoadingSpinner.jsx';
import ErrorMessage from '@/components/ui/ErrorMessage.jsx';

/**
 * BroadcastForm Component - Handles site-wide announcements
 * @param {Object} props
 * @param {Function} props.onBroadcast - Callback when broadcast is sent
 * @param {string} [props.adminUser] - Current admin user name
 */
export default function BroadcastForm({ onBroadcast, adminUser = "Admin" }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [broadcastType, setBroadcastType] = useState("info");

  const broadcastTypes = [
    { value: "info", label: "Info", color: "text-blue-400" },
    { value: "warning", label: "Warning", color: "text-yellow-400" },
    { value: "success", label: "Success", color: "text-green-400" },
    { value: "urgent", label: "Urgent", color: "text-red-400" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) {
      setError("Please enter a message to broadcast.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const broadcastData = {
        message: message.trim(),
        type: broadcastType,
        sender: adminUser,
        timestamp: new Date().toISOString()
      };

      if (onBroadcast) {
        onBroadcast(broadcastData);
      }

      setSuccess("Broadcast sent successfully!");
      setMessage("");
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
      
    } catch (err) {
      setError(`Failed to send broadcast: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    if (!message.trim()) {
      setError("Please enter a message to preview.");
      return;
    }
    
    // Simple preview implementation
    alert(`Preview:\n\nFrom: ${adminUser}\nType: ${broadcastTypes.find(t => t.value === broadcastType)?.label}\nMessage: ${message}`);
  };

  const getTypeStyle = (type) => {
    const typeConfig = broadcastTypes.find(t => t.value === type);
    return typeConfig ? typeConfig.color : "text-blue-400";
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h3 className="text-lg font-semibold mb-4 text-white">Broadcast Site Announcement</h3>
      
      {error && (
        <ErrorMessage 
          message={error} 
          onDismiss={() => setError("")}
          className="mb-4"
        />
      )}
      
      {success && (
        <ErrorMessage 
          message={success} 
          variant="info"
          onDismiss={() => setSuccess("")}
          className="mb-4"
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Broadcast Type Selection */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Broadcast Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {broadcastTypes.map(type => (
              <button
                key={type.value}
                type="button"
                onClick={() => setBroadcastType(type.value)}
                className={`
                  px-3 py-2 text-xs rounded-lg border transition-colors
                  ${broadcastType === type.value 
                    ? 'border-white/20 bg-white/10 text-white' 
                    : 'border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-600'
                  }
                `}
              >
                <span className={type.color}>●</span> {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <Input
          label="Announcement Message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Enter your announcement message..."
          required
          className="w-full"
        />

        {/* Character Count */}
        <div className="flex justify-between text-xs text-zinc-400">
          <span>
            Will be broadcast as: <span className={getTypeStyle(broadcastType)}>{adminUser}</span>
          </span>
          <span>
            {message.length}/280 characters
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={handlePreview}
            disabled={!message.trim() || loading}
          >
            Preview
          </Button>
          <Button 
            type="submit" 
            disabled={!message.trim() || loading}
            className="min-w-[100px]"
          >
            {loading ? (
              <LoadingSpinner size="sm" text="Sending..." />
            ) : (
              'Send Broadcast'
            )}
          </Button>
        </div>
      </form>

      {/* Info Box */}
      <div className="mt-4 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700">
        <div className="flex items-start gap-2">
          <svg className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="text-xs text-zinc-400">
            <p><strong>Info:</strong> Broadcasts appear at the top of all pages for all users.</p>
            <p className="mt-1"><strong>Types:</strong> Use "Urgent" sparingly, "Warning" for maintenance, "Success" for celebrations.</p>
          </div>
        </div>
      </div>
    </div>
  );
}