import Image from "next/image";
import Head from "next/head"; // Import Head
import { socialLinks } from "./config";

export default function Page() {
  return (
    <section className="max-w-3xl mx-auto">
      <Head>
        <title>Yoel Andreas Manoppo - Music Live!</title>
        <meta name="description" content="Seorang Spesialis AI dan produser musik yang inovatif, Yoel menggabungkan teknologi AI dengan seni kreatif." />
        <meta property="og:title" content="Yoel Andreas Manoppo - Empowering Innovation!" />
        <meta property="og:description" content="AI Specialist, Yoel menggabungkan teknologi AI dengan seni kreatif." />
        <meta property="og:image" content="/profile.png" />
        <meta property="og:url" content="https://yoel.pw" />
        <meta property="og:type" content="website" />
      </Head>

      <a href={socialLinks.instagram} target="_blank">
        <Image
          src="profile.png"
          alt="Profile photo"
          className="profile-image rounded-full bg-gray-100 block lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5 grayscale"
          unoptimized
          width={160}
          height={160}
          priority
        />
      </a>

      <h1 className="section-header mb-8 text-2xl font-medium tracking-tight">
        AI & Web3 Developer | Builder @ VeBetterDAO
      </h1>

      <div className="prose prose-neutral dark:prose-invert">
        <p>
          AI & Web3 Developer focused on building sustainability dApps that reward real-world eco actions. Creator of ReUse and SoapyWorld, both part of the VeBetterDAO ecosystem, merging gamification, blockchain, and environmental impact. Passionate about decentralization, automation, and building communities that reward sustainable behaviour.
        </p>

        <h2 className="section-header text-xl font-medium mt-8 mb-6">Active Projects</h2>
        <div className="experience-grid">
          <div className="experience-item border-l-2 border-green-500 pl-4 bg-gradient-to-r from-green-50 to-transparent dark:from-green-900/20 dark:to-transparent rounded-r-lg p-4">
            <h3 className="font-medium text-green-700 dark:text-green-300">Founder & Developer</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              SoapyWorld (VeBetterDAO)
            </p>
            <p className="mt-2 text-sm">
              Developed a gamified dApp encouraging manual dishwashing as an energy-saving alternative to machines. Built fullstack using Next.js, NestJS, Supabase, and VeChain's smart contract framework (EcoEarn.sol). Currently with 800+ confirmed activities, 200+ verified, and 100+ minted actions across testnet.
            </p>
          </div>

          <div className="experience-item border-l-2 border-blue-500 pl-4 bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent rounded-r-lg p-4">
            <h3 className="font-medium text-blue-700 dark:text-blue-300">Co-Founder & Developer</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ReUse (VeBetterDAO)
            </p>
            <p className="mt-2 text-sm">
              Created decentralized app rewarding users for reusing items through photo-verified submissions. Designed and deployed on VeBetterDAO, integrating AI detection, on-chain reward distribution, and community governance voting. Gained funding and endorsement under VeBetterDAO's sustainability initiative.
            </p>
          </div>

          <div className="experience-item border-l-2 border-purple-500 pl-4 bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-900/20 dark:to-transparent rounded-r-lg p-4">
            <h3 className="font-medium text-purple-700 dark:text-purple-300">AI Automation Specialist</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ZANDO Agency
            </p>
            <p className="mt-2 text-sm">
              Built internal AI automation tools for content creation and client operations. Created AI Deskriptor, a text generation tool for e-commerce product titles and descriptions. Developed automated systems for content generation and client workflow optimization.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a href="/career-timeline" className="inline-block">
            <button className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-medium py-3 px-6 rounded-lg transition-all duration-300 text-sm border border-gray-300 dark:border-gray-600 shadow-lg hover:shadow-xl">
              View Full Career Timeline →
            </button>
          </a>
        </div>

        <h2 className="section-header text-xl font-medium mt-8 mb-4">Sertifikasi</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="certification-card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border border-blue-200 dark:border-blue-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200">CS50X</h3>
              <span className="text-xs bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">2023</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              Introduction to Computer Science • Harvard University
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Sertifikasi ini meliputi dasar-dasar ilmu komputer, pemrograman, dan algoritma. Fokus pada pemecahan masalah dan membangun aplikasi web berbasis proyek nyata.
            </p>
            <a href="https://cs50.harvard.edu/certificates/3eaa4f95-45ef-4118-b630-e7dc7e27730f" target="_blank" className="inline-block">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
                Lihat Sertifikat
              </button>
            </a>
          </div>

          <div className="certification-card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 border border-purple-200 dark:border-purple-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-purple-800 dark:text-purple-200">CS50AI</h3>
              <span className="text-xs bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full">2023</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              Artificial Intelligence • Harvard University
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Sertifikasi CS50AI memberikan pemahaman mendalam tentang konsep dan teknik AI. Belajar algoritma pembelajaran mesin, pemrosesan bahasa alami, dan penerapan AI dalam berbagai proyek.
            </p>
            <a href="https://cs50.harvard.edu/certificates/1effa036-081a-4d40-bc36-0dcd61b93a96" target="_blank" className="inline-block">
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
                Lihat Sertifikat
              </button>
            </a>
          </div>

          <div className="certification-card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border border-green-200 dark:border-green-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-green-800 dark:text-green-200">EFSET</h3>
              <span className="text-xs bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">2023</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              English First Standard English Test • Intermediate Level
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Sertifikasi ini menunjukkan kemampuan bahasa Inggris tingkat Profesional, dengan fokus pada komunikasi lisan dan tulisan dalam konteks profesional.
            </p>
            <a href="https://cert.efset.org/m9B1rv" target="_blank" className="inline-block">
              <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
                Lihat Sertifikat
              </button>
            </a>
          </div>
        </div>


        <h2 className="section-header text-xl font-medium mt-8 mb-4">Technology Stack</h2>
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div className="tech-stack-card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border border-blue-200 dark:border-blue-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Languages & Frameworks</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              TypeScript, Python, Solidity, React, Next.js, NestJS, TailwindCSS
            </p>
          </div>
          <div className="tech-stack-card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 border border-purple-200 dark:border-purple-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">Web3 / Blockchain</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              VeChain Toolkits, WalletConnect, Hardhat, Smart Contract Deployment
            </p>
          </div>
          <div className="tech-stack-card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border border-green-200 dark:border-green-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-3">AI / Automation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              OpenAI API, LangChain, Prompt Engineering, Python Scripts
            </p>
          </div>
          <div className="tech-stack-card bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 border border-orange-200 dark:border-orange-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-3">Backend / Infra</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Supabase, PostgreSQL, Heroku, PM2, DigitalOcean, Vercel
            </p>
          </div>
        </div>

        <h2 className="section-header text-xl font-medium mt-8 mb-4">Achievements</h2>
        <ul>
          <li><span className="skill-tag"><strong>🌿 Funded and verified builder on VeBetterDAO</strong></span> for sustainable dApps</li>
          <li><span className="skill-tag"><strong>⚙️ Developed automated reward systems</strong></span> for eco-actions verified through blockchain</li>
          <li><span className="skill-tag"><strong>📈 Built multiple real-user communities</strong></span> with verifiable engagement and transparency</li>
          <li><span className="skill-tag"><strong>🎓 Harvard CS50 Series:</strong></span> Computer Science, Web Programming, AI, Python</li>
          <li><span className="skill-tag"><strong>🌐 B.Sc. Business Administration:</strong></span> University of the People (Ongoing)</li>
        </ul>
        
        <p>
          Building the future of sustainability through Web3 and real-world impact. Passionate about decentralization, automation, and building communities that reward sustainable behaviour. Let's build something real — AI, blockchain, or green tech.
        </p>

        <div className="mt-8 text-center">
          <a href="mailto:yoelandreasmanoppo@gmail.com" target="_blank" className="inline-block mr-4">
            <button className="hire-button border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded">
              Let's Build Something Real
            </button>
          </a>
          <a href="/projects" className="inline-block">
            <button className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm border border-gray-300 dark:border-gray-600 shadow-lg hover:shadow-xl">
              View My Projects
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
