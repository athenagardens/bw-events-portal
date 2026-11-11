import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function VendorStorefront({ params }: { params: { subdomain: string } }) {
  const { subdomain } = params

  const { data: tenant } = await supabase
    .from('tenants')
    .select('*')
    .eq('subdomain', subdomain)
    .single()

  if (!tenant || !tenant.is_active) {
    notFound()
  }

  const { data: offerings } = await supabase
    .from('offerings')
    .select('*')
    .eq('tenant_id', tenant.id)
    .eq('is_active', true)

  return (
    <main className="min-h-screen bg-stone-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
        <span className="text-xs uppercase tracking-wider px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full font-medium">
          {tenant.category}
        </span>
        <h1 className="text-3xl font-bold text-stone-900 mt-3">{tenant.business_name}</h1>
        <p className="text-stone-600 mt-2">{tenant.description}</p>
        <p className="text-sm text-stone-500 mt-4">
          Contact WhatsApp: <span className="font-semibold text-stone-800">{tenant.contact_phone}</span>
        </p>

        <h2 className="text-xl font-semibold text-stone-800 mt-8 mb-4">Packages & Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {offerings?.map((item: any) => (
            <div key={item.id} className="border border-stone-200 rounded-xl p-5">
              <h3 className="font-semibold text-stone-900">{item.item_name}</h3>
              <p className="text-stone-600 text-sm mt-1">{item.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-emerald-700 font-bold">P {item.base_price}</span>
                <button className="px-4 py-2 bg-stone-900 text-white text-sm rounded-lg hover:bg-emerald-700 transition">
                  Get Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}