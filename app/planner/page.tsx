import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function CustomerPlannerPage() {
  return (
    <main className="min-h-screen bg-stone-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm mb-8">
          <span className="text-xs uppercase tracking-wider px-3 py-1 bg-amber-50 text-amber-800 rounded-full font-medium">
            Customer Dream Planner Portal
          </span>
          <h1 className="text-3xl font-bold text-stone-900 mt-3">Your Event Control Center</h1>
          <p className="text-stone-600 mt-2">
            Manage your budget, track automated milestone checklists, and get AI recommendations matched with verified Botswana vendors.
          </p>
        </div>

        {/* P50 Token Access Card (Shown if fee not paid) */}
        <div className="bg-emerald-900 text-white rounded-2xl p-8 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Unlock Full AI Planner & Vendor Matcher</h2>
            <p className="text-emerald-100 text-sm mt-1">
              Pay a one-time P50 token fee via Orange Money, FNB eWallet, or Absa Pay2Cell to activate your lifetime planning dashboard.
            </p>
          </div>
          <button className="mt-4 md:mt-0 px-6 py-3 bg-white text-emerald-950 font-semibold rounded-xl hover:bg-stone-100 transition shadow">
            Pay P50 & Unlock Access
          </button>
        </div>

        {/* Synced Milestone Checklist */}
        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-stone-900 mb-4">Milestone Checklist & Tasks</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-100">
              <div className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-emerald-700" />
                <span className="text-stone-800 font-medium line-through">Secure Date & Venue Booking (Athena Gardens)</span>
              </div>
              <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded font-medium">15% Deposit Paid</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-100">
              <div className="flex items-center space-x-3">
                <input type="checkbox" className="w-5 h-5 accent-emerald-700" />
                <span className="text-stone-800 font-medium">Finalize Catering Menu & Tasting Selections</span>
              </div>
              <span className="text-xs text-stone-500 bg-stone-200 px-2 py-1 rounded font-medium">Pending</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-100">
              <div className="flex items-center space-x-3">
                <input type="checkbox" className="w-5 h-5 accent-emerald-700" />
                <span className="text-stone-800 font-medium">Confirm Decor & Floral Palette</span>
              </div>
              <span className="text-xs text-stone-500 bg-stone-200 px-2 py-1 rounded font-medium">Pending</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}