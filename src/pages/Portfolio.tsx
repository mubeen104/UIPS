import { useEffect, useState } from 'react';
import { TrendingUp, Filter } from 'lucide-react';
import { supabase, PortfolioItem } from '../lib/supabase';

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPortfolio() {
      setLoading(true);
      const { data } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('display_order', { ascending: true });

      if (data) {
        setPortfolioItems(data);
        setFilteredItems(data);
      }
      setLoading(false);
    }

    fetchPortfolio();
  }, []);

  const handleFilter = (category: string) => {
    setActiveFilter(category);
    if (category === 'all') {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(portfolioItems.filter((item) => item.category === category));
    }
  };

  const filters = [
    { value: 'all', label: 'All Cases' },
    { value: 'sold', label: 'Sold' },
    { value: 'licensed', label: 'Licensed' },
    { value: 'leased', label: 'Leased' },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary-600 to-primary-900 text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Portfolio</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Showcasing successful IP transactions across diverse industries worldwide
          </p>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Filter className="h-5 w-5" />
              <span className="font-medium">Filter by:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => handleFilter(filter.value)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    activeFilter === filter.value
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Loading portfolio...</p>
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div key={item.id} className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                  <div className="h-56 bg-gradient-to-br from-primary-500 to-primary-700 relative overflow-hidden">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <TrendingUp className="h-20 w-20 text-white opacity-50" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className="px-4 py-1.5 bg-white text-primary-600 text-sm font-semibold rounded-full capitalize shadow-md">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
                    <div className="space-y-2 text-sm">
                      {item.client_name && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Client:</span>
                          <span className="font-medium text-gray-900">{item.client_name}</span>
                        </div>
                      )}
                      {item.deal_value && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Value:</span>
                          <span className="font-medium text-gray-900">{item.deal_value}</span>
                        </div>
                      )}
                      {item.completion_date && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Completed:</span>
                          <span className="font-medium text-gray-900">
                            {new Date(item.completion_date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short'
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No cases found</h3>
              <p className="text-gray-600">
                {activeFilter === 'all'
                  ? 'Portfolio items will appear here once they are added.'
                  : `No ${activeFilter} cases available at this time.`}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Want Similar Results?</h2>
          <p className="text-xl text-primary-100 mb-8">
            Let us help you achieve your IP transaction goals with our proven expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact?type=valuation"
              className="px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium inline-block"
            >
              Get Free Valuation
            </a>
            <a
              href="/contact"
              className="px-8 py-4 bg-primary-800 text-white rounded-lg hover:bg-primary-700 transition-colors text-lg font-medium inline-block"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
