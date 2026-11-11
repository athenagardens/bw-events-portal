import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function VendorComparePage() {
  // Fetch active vendors and their offerings from Supabase
  const { data: tenants } = await supabase
    .from('tenants')
    .select(`
      id,
      business_name,
      category,
      rating,
      contact_phone,
      subdomain,
      offerings (*)
    `)
    .eq('is_active', true)

  return (
    <main className="min-h-screen bg-stone-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm mb-8">
          <span className="text-xs uppercase tracking-wider px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full font-medium">
            Vendor Comparison Matrix
          </span>
          <h1 className="text-3xl font-bold text-stone-900 mt-3">Side-by-Side Package Comparison</h1>
          <p className="text-stone-600 mt-2">
            Compare packages, pricing, and features across verified Botswana venues, caterers, and decorators to find the perfect match for your budget.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tenants?.map((vendor: any) => (
            <div 
              key={vendor.id} 
              className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase px-2 py-1 bg-stone-100 text-stone-700 rounded">
                    {vendor.category}
                  </span>
                  <span className="text-sm text-amber-600 font-bold">★ {vendor.rating || '5.0'}</span>
                </div>

                <h2 className="text-2xl font-bold text-stone-900">{vendor.business_name}</h2>
                <p className="text-xs text-stone-500 mt-1">Subdomain: {vendor.subdomain}.bw-events.com</p>

                <hr className="my-4 border-stone-100" />

                <h3 className="text-sm font-semibold text-stone-700 mb-3">Available Packages:</h3>
                
                <div className="space-y-4">
                  {vendor.offerings?.map((item: any) => (
                    <div key={item.id} className="p-4 bg-stone-50 rounded-xl border border-stone-100">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-stone-800 text-sm">{item.item_name}</h4>
                        <span className="text-emerald-700 font-bold text-sm">P {item.base_price}</span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1">{item.description}</p>
                    </div>
                  ))}
                  {(!vendor.offerings || vendor.offerings.length === 0) && (
                    <p className="text-sm text-stone-400 italic">No public packages listed yet.</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-4 border-t border-stone-100 space-y-2">
                <a
                  href={`https://${vendor.subdomain}.bw-events.com`}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full text-center py-2.5 bg-stone-900 text-white font-medium text-sm rounded-xl hover:bg-emerald-700 transition"
                >
                  Visit Full Storefront
                </a>
                <a
                  href={`https://wa.me/${vendor.contact_phone?.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full text-center py-2.5 bg-emerald-50 text-emerald-800 font-medium text-sm rounded-xl hover:bg-emerald-100 transition"
                >
                  Contact via WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}