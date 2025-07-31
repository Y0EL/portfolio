import Link from "next/link";

export default function CareerTimeline() {
  return (
    <section className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/" className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 mb-4 inline-block">
          ← Back to Home
        </Link>
        <h1 className="section-header text-3xl font-medium tracking-tight mb-4">
          Complete Career Timeline
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          A comprehensive overview of my professional journey from music to technology leadership.
        </p>
      </div>

      <div className="space-y-8">
        {/* Current Roles */}
        <div className="timeline-section">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Current Leadership Roles</h2>
          
          <div className="space-y-6">
            <div className="timeline-item bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent border-l-4 border-blue-500 pl-6 py-4 rounded-r-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-blue-700 dark:text-blue-300">Co-founder & CTO</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">2024 - Present</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Akupunyabuku.com</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Leading technology strategy and product vision for digital education platform. Managing fullstack development with React, Next.js, Supabase, and OpenAI API integration.
              </p>
            </div>

            <div className="timeline-item bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-900/20 dark:to-transparent border-l-4 border-purple-500 pl-6 py-4 rounded-r-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-purple-700 dark:text-purple-300">Web3 Fullstack Developer</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">2024 - Present</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">ReUse & VeScape</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Developing VeScape.sol smart contracts with focus on tokenomics and innovative reward systems. Integrating QRIS and virtual account payment gateways for seamless transactions.
              </p>
            </div>
          </div>
        </div>

        {/* Recent Experience */}
        <div className="timeline-section">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Recent Experience</h2>
          
          <div className="space-y-6">
            <div className="timeline-item bg-gradient-to-r from-green-50 to-transparent dark:from-green-900/20 dark:to-transparent border-l-4 border-green-500 pl-6 py-4 rounded-r-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-green-700 dark:text-green-300">AI Engineer & Tech Lead</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">2024</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">PT. ZANDO AGENCY</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Led AI solution development and implementation for operational efficiency. Designed machine learning algorithms for big data analysis and natural language processing.
              </p>
            </div>

            <div className="timeline-item bg-gradient-to-r from-orange-50 to-transparent dark:from-orange-900/20 dark:to-transparent border-l-4 border-orange-500 pl-6 py-4 rounded-r-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-orange-700 dark:text-orange-300">E-Commerce Specialist</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">2024 - Present</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">PT. HERUN INTERNATIONAL BRAND</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Developed innovative e-commerce strategies to enhance product visibility and sales. Integrated advertising services, vouchers, and events across TikTok and Shopee platforms.
              </p>
            </div>
          </div>
        </div>

        {/* Creative & Music */}
        <div className="timeline-section">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Creative & Music Career</h2>
          
          <div className="space-y-6">
            <div className="timeline-item bg-gradient-to-r from-pink-50 to-transparent dark:from-pink-900/20 dark:to-transparent border-l-4 border-pink-500 pl-6 py-4 rounded-r-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-pink-700 dark:text-pink-300">Music Producer & Artist</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">2020 - Present</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Independent • Cubicube Brand</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Produced and released original music across various genres, reaching global audiences through digital platforms. Built the 'Cubicube' music brand with unique character and creative style.
              </p>
            </div>
          </div>
        </div>

        {/* Early Career */}
        <div className="timeline-section">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Early Career</h2>
          
          <div className="space-y-6">
            <div className="timeline-item bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-800/20 dark:to-transparent border-l-4 border-gray-500 pl-6 py-4 rounded-r-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Frontend Developer</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">2020 - 2022</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">GhibranTravel</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Developed and optimized responsive user interfaces using Next.js and React. Collaborated with design teams to translate wireframes into engaging and functional user experiences.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link href="/" className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-medium py-3 px-6 rounded-lg transition-all duration-300 text-sm border border-gray-300 dark:border-gray-600 shadow-lg hover:shadow-xl">
          ← Back to Portfolio
        </Link>
      </div>
    </section>
  );
} 