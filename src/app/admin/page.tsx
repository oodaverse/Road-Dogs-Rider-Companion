'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Eye,
  Check,
  X,
  Clock,
  AlertCircle,
  ChevronDown,
  Download,
  RefreshCw,
  Truck,
  Users,
  CheckCircle,
  XCircle,
  FileText,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Shield,
  Lock,
  ExternalLink,
  Image,
} from 'lucide-react';
import { supabase, type RiderApplication } from '@/lib/supabase';
import { formatDate, formatPhoneNumber } from '@/lib/utils';

type ApplicationStatus = 'all' | 'pending' | 'approved' | 'rejected' | 'under_review';

interface DocumentUrls {
  idDocument: string | null;
  healthInsurance: string | null;
  liabilityInsurance: string | null;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  
  const [applications, setApplications] = useState<RiderApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<RiderApplication | null>(null);
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [updating, setUpdating] = useState(false);
  const [documentUrls, setDocumentUrls] = useState<DocumentUrls>({ idDocument: null, healthInsurance: null, liabilityInsurance: null });
  const [loadingDocs, setLoadingDocs] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication - in production, use proper auth
    if (username === 'jennacee' && password === 'my4grands') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid credentials');
    }
  };

  // Function to get signed URL for a document
  const getSignedUrl = async (publicUrl: string): Promise<string | null> => {
    try {
      // Extract the file path from the public URL
      const urlParts = publicUrl.split('/rider-documents/');
      if (urlParts.length < 2) return publicUrl;
      
      const filePath = urlParts[1];
      
      const { data, error } = await supabase.storage
        .from('rider-documents')
        .createSignedUrl(filePath, 3600); // 1 hour expiry
      
      if (error) {
        console.error('Error creating signed URL:', error);
        return publicUrl; // Fall back to public URL
      }
      
      return data.signedUrl;
    } catch (error) {
      console.error('Error getting signed URL:', error);
      return publicUrl;
    }
  };

  // Load document URLs when an application is selected
  const loadDocumentUrls = useCallback(async (app: RiderApplication) => {
    setLoadingDocs(true);
    const urls: DocumentUrls = { idDocument: null, healthInsurance: null, liabilityInsurance: null };
    
    try {
      if (app.id_document_url) {
        urls.idDocument = await getSignedUrl(app.id_document_url);
      }
      if (app.health_insurance_document_url) {
        urls.healthInsurance = await getSignedUrl(app.health_insurance_document_url);
      }
      if (app.liability_insurance_document_url) {
        urls.liabilityInsurance = await getSignedUrl(app.liability_insurance_document_url);
      }
    } catch (error) {
      console.error('Error loading document URLs:', error);
    }
    
    setDocumentUrls(urls);
    setLoadingDocs(false);
  }, []);

  // Handle selecting an application
  const handleSelectApplication = (app: RiderApplication) => {
    setSelectedApplication(app);
    loadDocumentUrls(app);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchApplications();
    }
  }, [isAuthenticated]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('rider_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id: string, status: string, notes?: string) => {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('rider_applications')
        .update({ application_status: status, admin_notes: notes })
        .eq('id', id);

      if (error) throw error;
      
      await fetchApplications();
      if (selectedApplication?.id === id) {
        setSelectedApplication(prev => prev ? { ...prev, application_status: status as RiderApplication['application_status'], admin_notes: notes } : null);
      }
    } catch (error) {
      console.error('Error updating application:', error);
    } finally {
      setUpdating(false);
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesStatus = statusFilter === 'all' || app.application_status === statusFilter;
    const matchesSearch =
      searchQuery === '' ||
      `${app.first_name} ${app.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.application_status === 'pending').length,
    approved: applications.filter((a) => a.application_status === 'approved').length,
    rejected: applications.filter((a) => a.application_status === 'rejected').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'under_review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'under_review':
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-10 w-full max-w-md border border-yellow-500/20 relative"
        >
          <div className="text-center mb-10">
            <div className="logo-emblem w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-brand gradient-text">Admin Portal</h1>
            <p className="text-gray-400 mt-3 font-medium">Road Dog Companion</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-5 py-4 rounded-xl bg-gray-700/50 border border-yellow-500/20 focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500/50 outline-none text-white placeholder-gray-500"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 rounded-xl bg-gray-700/50 border border-yellow-500/20 focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500/50 outline-none text-white placeholder-gray-500"
                placeholder="Enter password"
              />
            </div>
            {authError && (
              <p className="text-red-400 text-sm text-center font-medium">{authError}</p>
            )}
            <button
              type="submit"
              className="btn-premium w-full py-4 rounded-xl font-bold text-lg"
            >
              Login to Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-black border-b border-yellow-500/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-2 rounded-lg border border-yellow-500/50">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-yellow-400">Road Dog Admin</h1>
                <p className="text-xs text-gray-400">Application Management</p>
              </div>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-gray-300 hover:text-yellow-400 text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Applications', value: stats.total, icon: Users, color: 'from-blue-500 to-blue-600' },
            { label: 'Pending Review', value: stats.pending, icon: Clock, color: 'from-amber-500 to-amber-600' },
            { label: 'Approved', value: stats.approved, icon: CheckCircle, color: 'from-green-500 to-green-600' },
            { label: 'Rejected', value: stats.rejected, icon: XCircle, color: 'from-red-500 to-red-600' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl p-6 shadow-sm border border-yellow-500/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-xl p-4 shadow-sm border border-yellow-500/20 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 outline-none"
              />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus)}
                  className="appearance-none bg-gray-900 text-white px-4 py-2 pr-10 rounded-lg border border-gray-700 focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 outline-none cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="under_review">Under Review</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              <button
                onClick={fetchApplications}
                className="bg-gray-900 p-2 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
                title="Refresh"
              >
                <RefreshCw className={`w-5 h-5 text-gray-300 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-yellow-500/20 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <RefreshCw className="w-8 h-8 text-yellow-400 animate-spin mx-auto mb-4" />
              <p className="text-gray-300">Loading applications...</p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-300">No applications found</p>
              <p className="text-gray-500 text-sm mt-1">
                {applications.length === 0
                  ? 'Applications will appear here when submitted'
                  : 'Try adjusting your filters'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900 border-b border-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-white">
                            {app.first_name} {app.last_name}
                          </p>
                          <p className="text-sm text-gray-400">Age: {app.age}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="text-gray-200">{app.email}</p>
                          <p className="text-gray-400">{formatPhoneNumber(app.phone)}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-200">
                          {app.address_city}, {app.address_state}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-200">
                          {app.created_at ? formatDate(app.created_at) : 'N/A'}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            app.application_status
                          )}`}
                        >
                          {getStatusIcon(app.application_status)}
                          {app.application_status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleSelectApplication(app)}
                          className="inline-flex items-center gap-1 text-yellow-400 hover:text-yellow-300 font-medium text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Application Detail Modal */}
      <AnimatePresence>
        {selectedApplication && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedApplication(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-gray-800 to-gray-900 px-8 py-6 rounded-t-2xl">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedApplication.first_name} {selectedApplication.last_name}
                    </h2>
                    <p className="text-gray-300 mt-1">{selectedApplication.email}</p>
                  </div>
                  <button
                    onClick={() => setSelectedApplication(null)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      selectedApplication.application_status
                    )}`}
                  >
                    {getStatusIcon(selectedApplication.application_status)}
                    {selectedApplication.application_status.replace('_', ' ')}
                  </span>
                  <span className="text-gray-300 text-sm">
                    Submitted: {selectedApplication.created_at ? formatDate(selectedApplication.created_at) : 'N/A'}
                  </span>
                </div>
              </div>

              <div className="p-8 space-y-8">
                {/* Personal Information */}
                <section>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-yellow-500" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">{selectedApplication.first_name} {selectedApplication.last_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-medium">{formatDate(selectedApplication.date_of_birth)} (Age: {selectedApplication.age})</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedApplication.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{formatPhoneNumber(selectedApplication.phone)}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">
                        {selectedApplication.address_street}, {selectedApplication.address_city}, {selectedApplication.address_state} {selectedApplication.address_zip}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">ID Number</p>
                      <p className="font-medium">{selectedApplication.id_number}</p>
                    </div>
                  </div>
                </section>

                {/* Emergency Contact */}
                <section>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-yellow-500" />
                    Emergency Contact
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{selectedApplication.emergency_contact_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{formatPhoneNumber(selectedApplication.emergency_contact_phone)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Relationship</p>
                      <p className="font-medium capitalize">{selectedApplication.emergency_contact_relationship}</p>
                    </div>
                  </div>
                </section>

                {/* Background Check */}
                <section>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-yellow-500" />
                    Background Information
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span>Felony Conviction</span>
                      <span className={selectedApplication.has_felony_conviction ? 'text-red-600 font-semibold' : 'text-green-600'}>
                        {selectedApplication.has_felony_conviction ? 'Yes' : 'No'}
                      </span>
                    </div>
                    {selectedApplication.felony_details && (
                      <p className="text-sm text-gray-600 bg-white p-3 rounded">{selectedApplication.felony_details}</p>
                    )}
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span>On Probation/Parole</span>
                      <span className={selectedApplication.is_on_probation_parole ? 'text-red-600 font-semibold' : 'text-green-600'}>
                        {selectedApplication.is_on_probation_parole ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span>Banned from Carrier</span>
                      <span className={selectedApplication.is_banned_from_carrier ? 'text-red-600 font-semibold' : 'text-green-600'}>
                        {selectedApplication.is_banned_from_carrier ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span>Medical Conditions</span>
                      <span className={selectedApplication.has_medical_conditions ? 'text-amber-600' : 'text-green-600'}>
                        {selectedApplication.has_medical_conditions ? 'Yes' : 'No'}
                      </span>
                    </div>
                    {selectedApplication.medical_conditions_details && (
                      <p className="text-sm text-gray-600 bg-white p-3 rounded">{selectedApplication.medical_conditions_details}</p>
                    )}
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span>Can Sit Extended Periods</span>
                      <span className={selectedApplication.can_sit_extended_periods ? 'text-green-600' : 'text-amber-600'}>
                        {selectedApplication.can_sit_extended_periods ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span>Motion Sickness</span>
                      <span className={selectedApplication.has_motion_sickness ? 'text-amber-600' : 'text-green-600'}>
                        {selectedApplication.has_motion_sickness ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span>Takes Medications</span>
                      <span className={selectedApplication.takes_medications ? 'text-amber-600' : 'text-green-600'}>
                        {selectedApplication.takes_medications ? 'Yes' : 'No'}
                      </span>
                    </div>
                    {selectedApplication.medications_details && (
                      <p className="text-sm text-gray-600 bg-white p-3 rounded">{selectedApplication.medications_details}</p>
                    )}
                  </div>
                </section>

                {/* Motivation */}
                <section>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-yellow-500" />
                    Motivation & Experience
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Why they want to be a companion rider:</p>
                      <p className="bg-white p-3 rounded text-gray-700">{selectedApplication.why_companion_rider}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Long Distance Travel Experience</p>
                        <p className="font-medium">{selectedApplication.has_traveled_long_distances ? 'Yes' : 'No'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Overnight Comfort Level</p>
                        <p className="font-medium capitalize">{selectedApplication.overnight_comfort_level?.replace('_', ' ')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Confined Spaces Comfort</p>
                        <p className="font-medium">{selectedApplication.confined_spaces_comfort ? 'Yes' : 'No'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Understands Not Romantic</p>
                        <p className={`font-medium ${selectedApplication.understands_not_romantic ? 'text-green-600' : 'text-red-600'}`}>
                          {selectedApplication.understands_not_romantic ? 'Acknowledged' : 'Not Acknowledged'}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Insurance */}
                <section>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-yellow-500" />
                    Insurance Information
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Health Insurance</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Company</p>
                          <p className="font-medium">{selectedApplication.health_insurance_name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Policy Number</p>
                          <p className="font-medium">{selectedApplication.health_insurance_policy}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Coverage Period</p>
                          <p className="font-medium">
                            {formatDate(selectedApplication.health_insurance_start)} - {formatDate(selectedApplication.health_insurance_end)}
                          </p>
                        </div>
                      </div>
                    </div>
                    {selectedApplication.liability_insurance_name && (
                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Liability Insurance</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Company</p>
                            <p className="font-medium">{selectedApplication.liability_insurance_name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Policy Number</p>
                            <p className="font-medium">{selectedApplication.liability_insurance_policy}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                {/* Documents Section - Always show if any document exists */}
                <section>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Download className="w-5 h-5 text-yellow-500" />
                    Uploaded Documents
                  </h3>
                  
                  {loadingDocs ? (
                    <div className="flex items-center gap-2 text-gray-500">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Loading documents...
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* ID Document */}
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded-lg">
                              <Image className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">Government ID</p>
                              <p className="text-sm text-gray-500">Driver's License, State ID, or Passport</p>
                            </div>
                          </div>
                          {documentUrls.idDocument ? (
                            <a
                              href={documentUrls.idDocument}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              View Document
                            </a>
                          ) : (
                            <span className="text-gray-400 text-sm italic">Not uploaded</span>
                          )}
                        </div>
                      </div>

                      {/* Health Insurance Document */}
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-green-100 p-2 rounded-lg">
                              <Shield className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">Health Insurance Card</p>
                              <p className="text-sm text-gray-500">Proof of health insurance coverage</p>
                            </div>
                          </div>
                          {documentUrls.healthInsurance ? (
                            <a
                              href={documentUrls.healthInsurance}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              View Document
                            </a>
                          ) : (
                            <span className="text-gray-400 text-sm italic">Not uploaded</span>
                          )}
                        </div>
                      </div>

                      {/* Liability Insurance Document */}
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-purple-100 p-2 rounded-lg">
                              <Shield className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">Liability Insurance</p>
                              <p className="text-sm text-gray-500">Optional liability coverage document</p>
                            </div>
                          </div>
                          {documentUrls.liabilityInsurance ? (
                            <a
                              href={documentUrls.liabilityInsurance}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              View Document
                            </a>
                          ) : (
                            <span className="text-gray-400 text-sm italic">Not uploaded (optional)</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </section>

                {/* Action Buttons */}
                <section className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Update Status</h3>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => updateApplicationStatus(selectedApplication.id!, 'approved')}
                      disabled={updating || selectedApplication.application_status === 'approved'}
                      className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Check className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(selectedApplication.id!, 'under_review')}
                      disabled={updating || selectedApplication.application_status === 'under_review'}
                      className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Clock className="w-4 h-4" />
                      Mark Under Review
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(selectedApplication.id!, 'rejected')}
                      disabled={updating || selectedApplication.application_status === 'rejected'}
                      className="inline-flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <X className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                  {updating && (
                    <p className="text-gray-500 text-sm mt-2">Updating status...</p>
                  )}
                </section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
