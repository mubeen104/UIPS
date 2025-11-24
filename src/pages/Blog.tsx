import { useEffect, useState } from 'react';
import { Calendar, User, ArrowRight, FileText } from 'lucide-react';
import { supabase, BlogPost } from '../lib/supabase';

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogPosts() {
      setLoading(true);
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (data) {
        setBlogPosts(data);
      }
      setLoading(false);
    }

    fetchBlogPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary-600 to-primary-900 text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">IP Industry Insights</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Expert analysis, trends, and strategies in the intellectual property landscape
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Loading articles...</p>
            </div>
          ) : blogPosts.length > 0 ? (
            <>
              {blogPosts[0] && (
                <div className="mb-16 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="h-96 lg:h-auto bg-gradient-to-br from-primary-500 to-primary-700 relative overflow-hidden">
                      {blogPosts[0].thumbnail_url ? (
                        <img
                          src={blogPosts[0].thumbnail_url}
                          alt={blogPosts[0].title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <FileText className="h-32 w-32 text-white opacity-50" />
                        </div>
                      )}
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="inline-block px-4 py-1 bg-primary-100 text-primary-600 text-sm font-semibold rounded-full mb-4 w-fit">
                        Featured Article
                      </div>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        {blogPosts[0].title}
                      </h2>
                      <p className="text-lg text-gray-600 mb-6">{blogPosts[0].excerpt}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{blogPosts[0].author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(blogPosts[0].published_at || blogPosts[0].created_at)}</span>
                        </div>
                      </div>
                      <a
                        href={`#${blogPosts[0].slug}`}
                        className="inline-flex items-center text-primary-600 font-semibold hover:gap-2 transition-all group"
                      >
                        Read Article <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.slice(1).map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group"
                  >
                    <div className="h-48 bg-gradient-to-br from-primary-500 to-primary-700 relative overflow-hidden">
                      {post.thumbnail_url ? (
                        <img
                          src={post.thumbnail_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <FileText className="h-16 w-16 text-white opacity-50" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(post.published_at || post.created_at)}</span>
                        </div>
                      </div>
                      <a
                        href={`#${post.slug}`}
                        className="inline-flex items-center text-primary-600 font-medium text-sm group-hover:gap-1 transition-all"
                      >
                        Read More <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No articles yet</h3>
              <p className="text-gray-600">
                Check back soon for expert insights and analysis on IP industry trends.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Informed</h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to our newsletter for the latest IP insights delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
