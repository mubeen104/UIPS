import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, TrendingUp, FileText, Globe, Shield, Zap, Clock, ArrowRight, Star } from 'lucide-react';
import Button from '../components/Button';
import { supabase, PortfolioItem, Testimonial } from '../lib/supabase';

export default function Home() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const { data: portfolio } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('featured', true)
        .order('display_order', { ascending: true })
        .limit(6);

      const { data: testimonialData } = await supabase
        .from('testimonials')
        .select('*')
        .eq('featured', true)
        .order('display_order', { ascending: true });

      if (portfolio) setPortfolioItems(portfolio);
      if (testimonialData) setTestimonials(testimonialData);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials]);

  const services = [
    {
      icon: ShoppingCart,
      title: 'IP Selling',
      description: 'Maximize the value of your intellectual property with our expert selling services and global network.',
      link: '/services/selling',
    },
    {
      icon: TrendingUp,
      title: 'IP Buying',
      description: 'Acquire strategic IP assets to strengthen your competitive position and drive innovation.',
      link: '/services/buying',
    },
    {
      icon: FileText,
      title: 'IP Leasing',
      description: 'Generate revenue from your IP portfolio through flexible leasing arrangements.',
      link: '/services/leasing',
    },
  ];

  const benefits = [
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Access to international buyers, sellers, and partners across all industries.',
    },
    {
      icon: Zap,
      title: 'Fast Valuation',
      description: 'Receive comprehensive IP valuations within 48 hours from our expert team.',
    },
    {
      icon: Shield,
      title: 'Secure Transactions',
      description: 'End-to-end transaction security with complete confidentiality guaranteed.',
    },
    {
      icon: Clock,
      title: 'Expert Guidance',
      description: '20+ years of combined experience in intellectual property transactions.',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Global Leader in IP Solutions
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Buy, sell, or lease intellectual property with confidence. Trusted by Fortune 500 companies worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button to="/contact?type=valuation" size="lg">
                Get Free IP Valuation
              </Button>
              <Button to="/contact" variant="outline" size="lg" className="bg-white bg-opacity-10 border-white text-white hover:bg-opacity-20">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive IP solutions tailored to your business needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.title}
                to={service.link}
                className="group p-8 bg-white border-2 border-gray-200 rounded-xl hover:border-primary-600 hover:shadow-lg transition-all"
              >
                <service.icon className="h-12 w-12 text-primary-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <span className="text-primary-600 font-medium flex items-center group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Industry-leading expertise and proven track record
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  <benefit.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {portfolioItems.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Portfolio</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Successful IP transactions across diverse industries
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {portfolioItems.map((item) => (
                <div key={item.id} className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-primary-500 to-primary-700 relative overflow-hidden">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <TrendingUp className="h-16 w-16 text-white opacity-50" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white text-primary-600 text-sm font-medium rounded-full capitalize">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button to="/portfolio" variant="outline" size="lg">
                View All Cases
              </Button>
            </div>
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-12">What Our Clients Say</h2>
            <div className="relative">
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial]?.rating || 5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-xl md:text-2xl mb-8 italic">
                "{testimonials[currentTestimonial]?.testimonial_text}"
              </p>
              <div>
                <p className="font-bold text-lg">{testimonials[currentTestimonial]?.client_name}</p>
                <p className="text-primary-200">
                  {testimonials[currentTestimonial]?.position && `${testimonials[currentTestimonial].position}, `}
                  {testimonials[currentTestimonial]?.company}
                </p>
              </div>
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentTestimonial ? 'bg-white w-8' : 'bg-white bg-opacity-50'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Get a free IP valuation from our experts today. No obligations, completely confidential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/contact?type=valuation" size="lg">
              Request Free Valuation
            </Button>
            <Button to="/contact" variant="secondary" size="lg">
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
