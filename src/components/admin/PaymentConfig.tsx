import { useState, useEffect } from 'react';
import { Save, Building, CreditCard, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function PaymentConfig() {
  const { token } = useAuth();
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch('/api/admin/payment-config', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setConfig(data);
        }
      } catch (err) {
        console.error("Failed to fetch payment config");
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, [token]);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/payment-config', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(config)
      });
      if (res.ok) {
        setMessage('Payment configuration saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      console.error("Failed to save payment config");
      setMessage('Error saving configuration.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-slate-500">Loading configuration...</div>;
  if (!config) return <div className="text-red-500">Failed to load configuration.</div>;

  return (
    <div className="space-y-8 max-w-4xl">
      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span className="font-medium">{message}</span>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
            <Building className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Bank Transfer Details</h3>
            <p className="text-sm text-slate-500 mt-1">Information displayed to members for direct bank deposits.</p>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Bank Name</label>
              <input 
                type="text" 
                value={config.bankDetails.bankName} 
                onChange={(e) => setConfig({ ...config, bankDetails: { ...config.bankDetails, bankName: e.target.value } })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Account Name</label>
              <input 
                type="text" 
                value={config.bankDetails.accountName} 
                onChange={(e) => setConfig({ ...config, bankDetails: { ...config.bankDetails, accountName: e.target.value } })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Account Number</label>
              <input 
                type="text" 
                value={config.bankDetails.accountNumber} 
                onChange={(e) => setConfig({ ...config, bankDetails: { ...config.bankDetails, accountNumber: e.target.value } })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Branch</label>
              <input 
                type="text" 
                value={config.bankDetails.branch} 
                onChange={(e) => setConfig({ ...config, bankDetails: { ...config.bankDetails, branch: e.target.value } })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Payment Gateway Configuration</h3>
              <p className="text-sm text-slate-500 mt-1">Configure online payment gateway parameters (e.g. Stripe).</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-700">Gateway Active</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={config.paymentGateway.isActive} 
                onChange={(e) => setConfig({ ...config, paymentGateway: { ...config.paymentGateway, isActive: e.target.checked } })}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
        
        {config.paymentGateway.isActive && (
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Provider</label>
                <select 
                  value={config.paymentGateway.provider} 
                  onChange={(e) => setConfig({ ...config, paymentGateway: { ...config.paymentGateway, provider: e.target.value } })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="stripe">Stripe</option>
                  <option value="paypal">PayPal</option>
                  <option value="payhere">PayHere</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Public Key</label>
                <input 
                  type="text" 
                  value={config.paymentGateway.publicKey} 
                  onChange={(e) => setConfig({ ...config, paymentGateway: { ...config.paymentGateway, publicKey: e.target.value } })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm" 
                  placeholder="pk_test_..."
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <span>Secret Key / API Token</span>
                  <ShieldAlert className="w-4 h-4 text-amber-500" />
                </label>
                <input 
                  type="password" 
                  value={config.paymentGateway.secretKey} 
                  onChange={(e) => setConfig({ ...config, paymentGateway: { ...config.paymentGateway, secretKey: e.target.value } })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm" 
                  placeholder="sk_test_..."
                />
                <p className="text-xs text-slate-500">This key is securely stored and never exposed to the frontend.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <button 
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" /> 
          {saving ? 'Saving...' : 'Save Configuration'}
        </button>
      </div>
    </div>
  );
}
