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
          A comprehensive overview of my journey as an AI & Web3 Developer building sustainability dApps.
        </p>
      </div>

      <div className="space-y-8">
        {/* Current Roles */}
        <div className="timeline-section">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Current Leadership Roles</h2>
          
          <div className="space-y-6">
            <div className="timeline-item bg-gradient-to-r from-green-50 to-transparent dark:from-green-900/20 dark:to-transparent border-l-4 border-green-500 pl-6 py-4 rounded-r-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-green-700 dark:text-green-300">Founder & Developer</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">2024 - Present</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">SoapyWorld (VeBetterDAO)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Developed a gamified dApp encouraging manual dishwashing as an energy-saving alternative to machines. Built fullstack using Next.js, NestJS, Supabase, and VeChain's smart contract framework (EcoEarn.sol). Currently with 800+ confirmed activities, 200+ verified, and 100+ minted actions across testnet.
              </p>
            </div>

            <div className="timeline-item bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent border-l-4 border-blue-500 pl-6 py-4 rounded-r-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-blue-700 dark:text-blue-300">Co-Founder & Developer</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">2023 - Present</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">ReUse (VeBetterDAO)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Created decentralized app rewarding users for reusing items through photo-verified submissions. Designed and deployed on VeBetterDAO, integrating AI detection, on-chain reward distribution, and community governance voting. Gained funding and endorsement under VeBetterDAO's sustainability initiative.
              </p>
            </div>
          </div>
        </div>

        {/* Recent Experience */}
        <div className="timeline-section">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Recent Experience</h2>
          
          <div className="space-y-6">
            <div className="timeline-item bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-900/20 dark:to-transparent border-l-4 border-purple-500 pl-6 py-4 rounded-r-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-purple-700 dark:text-purple-300">AI Automation Specialist</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">2022 - 2023</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">ZANDO Agency</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Built internal AI automation tools for content creation and client operations. Created AI Deskriptor, a text generation tool for e-commerce product titles and descriptions. Developed automated systems for content generation and client workflow optimization.
              </p>
            </div>

            <div className="timeline-item bg-gradient-to-r from-orange-50 to-transparent dark:from-orange-900/20 dark:to-transparent border-l-4 border-orange-500 pl-6 py-4 rounded-r-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-orange-700 dark:text-orange-300">Documentation Specialist & IT Developer</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">2024</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">PT. HERUN INTERNATIONAL BRAND</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Developed SCOPE OF WORK documentation platform. Responsible for UI development and content management. Built collaborative documentation system using modern web technologies for seamless workflow.
              </p>
            </div>
          </div>
        </div>

        {/* Education & Achievements */}
        <div className="timeline-section">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Education & Achievements</h2>
          
          <div className="space-y-6">
            <div className="timeline-item bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent border-l-4 border-blue-500 pl-6 py-4 rounded-r-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-blue-700 dark:text-blue-300">B.Sc. Business Administration</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">Ongoing</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">University of the People</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pursuing business administration degree to complement technical expertise with business acumen.
              </p>
            </div>

            <div className="timeline-item bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-900/20 dark:to-transparent border-l-4 border-purple-500 pl-6 py-4 rounded-r-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-purple-700 dark:text-purple-300">Harvard CS50 Series</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">2023</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Computer Science, Web Programming, AI, Python</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Completed comprehensive computer science education including AI, web development, and Python programming.
              </p>
            </div>

            <div className="timeline-item bg-gradient-to-r from-green-50 to-transparent dark:from-green-900/20 dark:to-transparent border-l-4 border-green-500 pl-6 py-4 rounded-r-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-green-700 dark:text-green-300">EFSET C2 English Certificate</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">2023</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Proficient Level</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Achieved proficient level in English language skills for international communication and collaboration.
              </p>
            </div>
          </div>
        </div>

        {/* VeBetterDAO Achievements */}
        <div className="timeline-section">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">VeBetterDAO Achievements</h2>
          
          <div className="space-y-6">
            <div className="timeline-item bg-gradient-to-r from-green-50 to-transparent dark:from-green-900/20 dark:to-transparent border-l-4 border-green-500 pl-6 py-4 rounded-r-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-green-700 dark:text-green-300">🌿 Funded and Verified Builder</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">2024</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">VeBetterDAO Ecosystem</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Funded and verified builder on VeBetterDAO for sustainable dApps. Developed automated reward systems for eco-actions verified through blockchain. Built multiple real-user communities with verifiable engagement and transparency.
              </p>
            </div>

            <div className="timeline-item bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent border-l-4 border-blue-500 pl-6 py-4 rounded-r-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-blue-700 dark:text-blue-300">🪙 Active Governance Participant</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">2024 - Present</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">B3TR, VOT3 Tokens</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Active participant in VeBetterDAO governance with B3TR and VOT3 tokens. Contributor to Dynamic Base Allocation proposal discussions and community decision-making processes.
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