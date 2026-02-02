import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout/Header';
import { ApplicationForm } from '@/components/form/ApplicationForm';

export const metadata: Metadata = {
  title: 'Apply as Rider | Road Dog Companion',
  description: 'Submit your application to become a Road Dog companion rider. Safe, vetted, professional.',
};

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Header />
      
      <div className="pt-24 pb-16">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-black to-gray-800 py-16 mb-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4">
              Rider Application
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Complete the form below to apply for the Road Dog Companion
              program. All fields marked with <span className="text-red-400">*</span> are required.
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
