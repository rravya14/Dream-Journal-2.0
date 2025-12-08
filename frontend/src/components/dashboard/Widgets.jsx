import Card from "@/components/ui/Card";
import Link from "next/link";

export default function Widgets() {
  const quickActions = [
    {
      title: "Record a Dream",
      description: "Capture your latest dream with AI analysis",
      icon: "✨",
      href: "/dashboard/dreams/new",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "View Dreams",
      description: "Browse your dream journal entries",
      icon: "📖",
      href: "/dashboard/dreams",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Weekly Summary",
      description: "AI-powered insights and patterns",
      icon: "📊",
      href: "/dashboard/summary",
      gradient: "from-violet-500 to-purple-500",
    },
  ];

  const recentActivity = [
    { text: "Welcome to Dream Journal 2.0!", time: "Just now", icon: "🎉" },
    { text: "Start recording your dreams", time: "Now", icon: "💭" },
    { text: "Discover dream patterns with AI", time: "Today", icon: "🔮" },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="animate-fade-in">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, idx) => (
            <Link key={action.href} href={action.href}>
              <Card className="h-full cursor-pointer hover:scale-[1.02] transition-transform duration-200">
                <div className={`w-12 h-12 rounded-xl bg-linear-to-r ${action.gradient} flex items-center justify-center mb-4`}>
                  <span className="text-2xl">{action.icon}</span>
                </div>
                <h3 className="font-semibold text-white mb-2">{action.title}</h3>
                <p className="text-sm text-slate-400">{action.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity & Dream Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <span>🕐</span>
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800/30 transition-colors duration-200">
                <span className="text-xl">{activity.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300">{activity.text}</p>
                  <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Dream Insights */}
        <Card>
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <span>💡</span>
            Dream Insights
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-linear-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
              <p className="text-sm text-blue-300 mb-2">🌟 Getting Started</p>
              <p className="text-xs text-slate-400">
                Record your first dream to unlock AI-powered analysis and pattern recognition.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-linear-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
              <p className="text-sm text-purple-300 mb-2">🎯 Pro Tip</p>
              <p className="text-xs text-slate-400">
                Journal dreams immediately after waking for the most vivid details.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Dream Statistics */}
      <Card>
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
          <span>📈</span>
          Dream Statistics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Dreams", value: "0", icon: "📖", color: "blue" },
            { label: "This Week", value: "0", icon: "📅", color: "purple" },
            { label: "Analyzed", value: "0", icon: "🤖", color: "pink" },
            { label: "Patterns Found", value: "0", icon: "🔍", color: "cyan" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-colors duration-200">
              <p className="text-2xl mb-2">{stat.icon}</p>
              <p className={`text-2xl font-bold text-${stat.color}-400`}>{stat.value}</p>
              <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
