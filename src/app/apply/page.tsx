import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout/Header';
import { ApplicationForm } from '@/components/form/ApplicationForm';

export const metadata: Metadata = {
  title: 'Apply as Rider | Road Dog Companion',
  description: 'Submit your application to become a Road Dog companion rider. Safe, vetted, professional.',
};

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <Header />
      
      <div className="pt-28 pb-20">
        {/* Hero Banner */}
        <div className="relative py-20 mb-12 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h1 className="text-5xl md:text-7xl font-brand gradient-text mb-6 text-shadow-gold">
              Rider Application
            </h1>
            <div className="divider-gold w-24 mx-auto mb-8" />
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Complete the form below to apply for the <span className="text-yellow-400 font-semibold">Road Dog Companion</span> program. All fields marked with <span className="text-red-400 font-bold">*</span> are required.
            </p>
          </div>
        </div>

        {/* Application Form */}
        <div className="px-4 sm:px-6 lg:px-8">
          <ApplicationForm />
        </div>
      </div>

      <Footer />
    </main>
  );
}
