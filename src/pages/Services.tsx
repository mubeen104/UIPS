import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, TrendingUp, FileText, CheckCircle, ArrowRight } from 'lucide-react';
import Button from '../components/Button';

export default function Services() {
  const { service } = useParams();

  const services = {
    selling: {
      icon: ShoppingCart,
      title: 'IP Selling Services',
      description: 'Maximize the value of your intellectual property portfolio with our comprehensive selling services.',
      benefits: [
        'Accurate IP valuation and market analysis',
        'Strategic positioning to attract premium buyers',
        'Global network of qualified buyers across industries',
        'Complete transaction management and legal support',
        'Confidential negotiation and deal structuring',
        'Post-sale support and documentation',
      ],
      process: [
        { title: 'Initial Consultation', description: 'We assess your IP portfolio and discuss your goals' },
        { title: 'Valuation & Analysis', description: 'Comprehensive market analysis and valuation report' },
        { title: 'Marketing Strategy', description: 'Targeted outreach to qualified buyers in your industry' },
        { title: 'Negotiation', description: 'Expert negotiation to secure the best possible terms' },
        { title: 'Transaction Closing', description: 'Complete legal and financial transaction management' },
        { title: 'Post-Sale Support', description: 'Ongoing support for transition and documentation' },
      ],
    },
    buying: {
      icon: TrendingUp,
      title: 'IP Buying Services',
      description: 'Acquire strategic intellectual property assets to strengthen your competitive position and accelerate innovation.',
      benefits: [
        'Access to exclusive IP portfolios before public listing',
        'Due diligence and comprehensive IP analysis',
        'Strategic acquisition planning and consultation',
        'Negotiation support and deal structuring',
        'Risk assessment and legal validation',
        'Integration support and knowledge transfer',
      ],
      process: [
        { title: 'Needs Assessment', description: 'Define your strategic IP requirements and objectives' },
        { title: 'Market Research', description: 'Identify available IP assets matching your criteria' },
        { title: 'Due Diligence', description: 'Comprehensive analysis of IP validity and value' },
        { title: 'Negotiation', description: 'Strategic negotiation to secure favorable terms' },
        { title: 'Acquisition', description: 'Complete transaction and transfer process' },
        { title: 'Integration', description: 'Support for IP integration into your portfolio' },
      ],
    },
    leasing: {
      icon: FileText,
      title: 'IP Leasing Services',
      description: 'Generate consistent revenue from your IP portfolio through strategic leasing arrangements.',
      benefits: [
        'Revenue generation without selling IP assets',
        'Flexible licensing terms and structures',
        'Ongoing royalty management and collection',
        'License compliance monitoring',
        'Strategic partnership facilitation',
        'Portfolio optimization consulting',
      ],
      process: [
        { title: 'Portfolio Review', description: 'Evaluate your IP assets for leasing potential' },
        { title: 'Terms Development', description: 'Create optimal licensing terms and structures' },
        { title: 'Licensee Matching', description: 'Identify and vet potential licensees' },
        { title: 'Agreement Drafting', description: 'Comprehensive licensing agreements' },
        { title: 'Deal Execution', description: 'Finalize agreements and initiate licensing' },
        { title: 'Ongoing Management', description: 'Royalty tracking and compliance monitoring' },
      ],
    },
  };

  const currentService = service ? services[service as keyof typeof services] : null;

  if (!currentService && service) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <Button to="/services">View All Services</Button>
        </div>
      </div>
    );
  }

  if (!currentService) {
    return (
      <div className="min-h-screen">
        <section className="bg-gradient-to-br from-primary-600 to-primary-900 text-white pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Comprehensive IP solutions tailored to your business objectives
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(services).map(([key, service]) => (
                <Link
                  key={key}
                  to={`/services/${key}`}
                  className="group p-8 bg-white border-2 border-gray-200 rounded-xl hover:border-primary-600 hover:shadow-xl transition-all"
                >
                  <service.icon className="h-16 w-16 text-primary-600 mb-6 group-hover:scale-110 transition-transform" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h2>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <span className="text-primary-600 font-medium flex items-center group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Schedule a consultation with our IP experts to discuss your specific needs.
            </p>
            <Button to="/contact" size="lg">
              Contact Us Today
            </Button>
          </div>
        </section>
      </div>
    );
  }

  const ServiceIcon = currentService.icon;

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary-600 to-primary-900 text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <ServiceIcon className="h-16 w-16 mr-4" />
            <h1 className="text-5xl font-bold">{currentService.title}</h1>
          </div>
          <p className="text-xl text-primary-100 max-w-3xl">
            {currentService.description}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Benefits</h2>
              <div className="space-y-4">
                {currentService.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 text-lg">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Process</h2>
              <div className="space-y-6">
                {currentService.process.map((step, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Get Started Today</h2>
          <p className="text-xl text-primary-100 mb-8">
            Contact us for a free consultation and discover how we can help you achieve your IP objectives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/contact?type=valuation" size="lg">
              Request Free Valuation
            </Button>
            <Button to="/contact" variant="secondary" size="lg">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
