import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout/Header';
import { ApplicationForm } from '@/components/form/ApplicationForm';

export const metadata: Metadata = {
  title: 'Apply as Rider | Road Dog Companion',
  description: 'Submit your application to become a Road Dog companion rider. Safe, vetted, professional.',
};

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-x-hidden">
      <Header />
      
      <div className="pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20">
        {/* Hero Banner */}
        <div className="relative py-10 sm:py-16 md:py-20 mb-6 sm:mb-8 md:mb-12 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
          
          <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 text-center relative">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-brand gradient-text mb-3 sm:mb-4 md:mb-6 text-shadow-gold">
              Rider Application
            </h1>
            <div className="divider-gold w-16 sm:w-20 md:w-24 mx-auto mb-4 sm:mb-6 md:mb-8" />
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-2">
              Complete the form below to apply for the <span className="text-yellow-400 font-semibold">Road Dog Companion</span> program. All fields marked with <span className="text-red-400 font-bold">*</span> are required.
            </p>
          </div>
        </div>

        {/* Application Form */}
        <div className="px-2 sm:px-4 md:px-6 lg:px-8">
          <ApplicationForm />
        </div>
      </div>

      <Footer />
    </main>
  );
}
