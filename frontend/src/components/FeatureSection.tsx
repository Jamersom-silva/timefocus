interface FeatureSectionProps {
  title: string;
  description: string;
  icon: string;
  mockupText: string;
  reverse?: boolean;
  bgColor?: string;
}

export default function FeatureSection({
  title,
  description,
  icon,
  mockupText,
  reverse = false,
  bgColor = "bg-white"
}: FeatureSectionProps) {
  return (
    <section className={`${bgColor} py-20 px-6`}>
      <div className="max-w-7xl mx-auto">
        <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
          <div className="md:w-1/2 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{icon}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-500 transition-colors shadow-lg hover:shadow-xl">
                Experimentar
              </button>
              <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-emerald-500 hover:text-emerald-500 transition-colors">
                Saiba mais
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="w-80 h-56 bg-gray-100 rounded-2xl flex items-center justify-center">
              {mockupText}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}