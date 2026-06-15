import { motion, AnimatePresence, useMotionValue, useSpring,useTransform } from "framer-motion"
import { useEffect, useState } from "react"
import { FaLinkedin, FaGithub, FaInstagram, FaDiscord } from "react-icons/fa"
import { FaHtml5,FaCss3Alt,FaLaravel,FaReact,FaDatabase,FaRobot} from "react-icons/fa"
import { SiFirebase, SiFlutter, SiPython, SiBootstrap } from "react-icons/si"
import { BsChatSquareDotsFill } from "react-icons/bs"
import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import Lanyard from "./components/Lanyard/Lanyard"
import profile from "./assets/profile.png"

export default function App() {
  /* ===== LOADING ===== */
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800)
    return () => clearTimeout(timer)
  }, [])

  /* ===== CURSOR GLOW ===== */
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 20 })

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX - window.innerWidth / 2)
    mouseY.set(e.clientY - window.innerHeight / 2)
  }

  /* ===== RENDER ===== */
  return (
    <AnimatePresence>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div
          onMouseMove={handleMouseMove}
          className="bg-black text-white min-h-screen overflow-hidden relative"
        >
          {/* glow mengikuti kursor */}
          <motion.div
            style={{ x: smoothX, y: smoothY }}
            className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"
          />

          <Navbar />
          <Hero />
          <About />
          <Portfolio />
          <Contact />
        </div>
      )}
    </AnimatePresence>
  )
}

/* ================= SPLASH LOADING ================= */
function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black"
    >
      {/* SIGNAL BARS */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <motion.span
            key={i}
            animate={{ height: ["20px", "60px", "20px"] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
            className="w-2 bg-cyan-400 rounded-full"
          />
        ))}
      </div>

      {/* TEXT */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm tracking-widest text-gray-400"
      >
        INITIALIZING SYSTEM
      </motion.p>
    </motion.div>
  )
}


/* ================= NAVBAR ================= */
function Navbar() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id)
    section?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/40 border-b border-white/10"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-widest text-cyan-400">
          
        </h1>

        <ul className="flex gap-6 text-sm text-gray-300">
          <li
            onClick={() => scrollToSection("home")}
            className="cursor-pointer hover:text-cyan-400 transition"
          >
            Home
          </li>
          <li
            onClick={() => scrollToSection("about")}
            className="cursor-pointer hover:text-cyan-400 transition"
          >
            About
          </li>
          <li 
          onClick={() => scrollToSection("portfolio")}
          className="cursor-pointer hover:text-cyan-400 transition">
            Portofolio
          </li>
          <li onClick={() => scrollToSection("contact")}
          className="hover:text-cyan-400 transition cursor-pointer">
            Contact
          </li>
        </ul>
      </div>
    </motion.nav>
  )
}

/* ================= HERO ================= */
function Hero() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id)
    section?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
    id="home"
    className="min-h-screen flex items-center justify-center px-6">

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="grid md:grid-cols-2 gap-12 items-center max-w-6xl"
      >
        {/* TEXT */}
        <div className="text-center md:text-left">
          <h2 className="text-sm tracking-widest text-cyan-400 mb-4">
            HELLO, I’M
          </h2>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Prayoga Kurniawan
            </span>
          </h1>

          <p className="text-gray-400 max-w-xl mb-10">
            Web & Mobile Development and Cloud Enthusiast | 
            Cloud Computing Cohort at Bangkit Academy 2024
          </p>

          <div className="flex justify-center md:justify-start gap-4">
            <button 
            onClick={() => scrollToSection("portfolio")}
            className="px-6 py-3 rounded-full bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition">
              View Projects
            </button>
            <button 
            onClick={() => scrollToSection("contact")}
            className="px-6 py-3 rounded-full border border-white/20 hover:border-cyan-400 transition">
              Contact Me
            </button>
          </div>
        </div>

        {/* FOTO PROFIL */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: 1 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="relative flex justify-center"
        >
          <div className="absolute inset-0 bg-cyan-500 blur-3xl opacity-30 rounded-full"></div>
          <img
            src={profile}
            alt="Profile"
            className="relative w-64 h-64 object-cover rounded-full border border-cyan-400 shadow-xl"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}


/* ================= ABOUT ================= */
function About() {
  const [language, setLanguage] = useState("en")

  const aboutText = {
    en: `Bachelor of Informatics graduate with knowledge of website development,
    systems analysis, and database management. Experienced in developing web-based
    projects and participating in Bangkit Academy 2024 (Cloud Computing learning path),
    focusing on the implementation of Google Cloud Platform (GCP), database management,
    and application deployment. Proficient in HTML, CSS, JavaScript, PHP, and MySQL,
    with basic knowledge of React.js, Laravel, Flutter, Firebase, and Python. Interested
    in pursuing a career in Information Technology, supported by strong problem-solving
    and adaptability skills.`,

    id: `Lulusan S1 Informatika dengan pemahaman dalam pengembangan website,
    analisis sistem, dan manajemen basis data. Memiliki pengalaman dalam
    pengembangan proyek berbasis web serta mengikuti Bangkit Academy 2024
    jalur Cloud Computing dengan fokus pada implementasi Google Cloud Platform (GCP),
    pengelolaan basis data, dan deployment aplikasi. Menguasai HTML, CSS,
    JavaScript, PHP, dan MySQL, serta memiliki pengetahuan dasar tentang
    React.js, Laravel, Flutter, Firebase, dan Python. Tertarik untuk berkarier
    di bidang Teknologi Informasi dengan didukung kemampuan problem solving
    dan adaptasi yang baik.`
  }

  /* ===== PHYSICS ===== */
  const x = useMotionValue(0)

  const springX = useSpring(x, {
    stiffness: 120,
    damping: 14,
  })

  const rotate = useTransform(springX, [-150, 150], [-14, 14])

  return (
    <section
      id="about"
      className="relative py-40 px-6 bg-gradient-to-b from-black via-black to-gray-900 overflow-hidden"
    >
      {/* BACKGROUND ACCENT */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[160px] rounded-full" />

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT CONTENT */}
        <div>
          <span className="text-sm tracking-widest text-cyan-400">
            WHO AM I
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setLanguage("en")}
              className={`px-3 py-1 rounded-lg text-sm transition ${
                language === "en"
                  ? "bg-cyan-500 text-white"
                  : "bg-gray-800 text-gray-300"
              }`}
            >
              EN
            </button>

            <button
              onClick={() => setLanguage("id")}
              className={`px-3 py-1 rounded-lg text-sm transition ${
                language === "id"
                  ? "bg-cyan-500 text-white"
                  : "bg-gray-800 text-gray-300"
              }`}
            >
              ID
            </button>
          </div>

          <p className="text-gray-400 leading-relaxed max-w-xl text-justify">
            {aboutText[language]}
          </p>
        </div>

        {/* RIGHT CONTENT — REAL HANGING ID CARD */}
        <div className="basis-full md:basis-5/12 h-[460px] flex justify-center items-center">

        {/* LANYARD */}
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 30 }}
          fog attach="fog" args={["#000", 5, 10]} 
          gl={{ alpha: true }}
        >
          <ambientLight intensity={0.8} />

          <directionalLight
            position={[3, 4, 5]}
            intensity={1.2}
          />

          <directionalLight
            position={[-3, -2, 3]}
            intensity={0.4}
          />
          <Lanyard />
        </Canvas>
        </div>
      </div>
    </section>
  )
}

/* ================= PORTFOLIO ================= */
function Portfolio() {
  const [activeTab, setActiveTab] = useState("projects")
  const [selectedCert, setSelectedCert] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const projects = [
    {
      title: "HiDancer Platform",
      desc: "Web platform penyewaan dancer berbasis Laravel dengan AI chatbot.",
      tech: ["Laravel", "MySQL", "OpenAI API"],
      link: "https://hidancer.com",
      logo: "/portofolio/project/hidancer/logo.png",
      images: [
        "/portofolio/project/hidancer/1.png",
        "/portofolio/project/hidancer/2.png",
        "/portofolio/project/hidancer/3.png",
        "/portofolio/project/hidancer/4.png",
      ],
    },
    {
      title: "Checkmate",
      desc: "Aplikasi Mood Tracker,Absensi dan Kerapian di Sekolah.",
      tech: ["Machine Learning","Kotlin", "Google Cloud Platform "],
      logo: "/portofolio/project/checkmate/logo.png",
      images: [
        "/portofolio/project/checkmate/1.jpg",
        "/portofolio/project/checkmate/2.png",
        "/portofolio/project/checkmate/3.png",
        "/portofolio/project/checkmate/4.jpg",
      ],
    },
    {
      title: "Mayoo",
      desc: "Website untuk produk penjuala brownies dan kue.",
      tech: ["HTML", "Boostrap"],
      link: "https://yogz0303.github.io/The_Mayoo/",
      logo: "/portofolio/project/mayo/logo.png",
      images: [
        "/portofolio/project/mayo/1.png",
        "/portofolio/project/mayo/2.png",
        "/portofolio/project/mayo/3.png",
      ],
    },
    {
      title: "FayrMob",
      desc: "Apliaksi mobile untuk Rental Mobil.",
      tech: ["Flutter", "Firebase"],
      logo: "/portofolio/project/fayrmob/logo.png",
      images: [
        "/portofolio/project/fayrmob/1.jpeg",
        "/portofolio/project/fayrmob/2.jpeg",
        "/portofolio/project/fayrmob/3.jpeg",
        "/portofolio/project/fayrmob/4.jpeg",
        "/portofolio/project/fayrmob/5.jpeg",
        "/portofolio/project/fayrmob/6.jpeg",
        "/portofolio/project/fayrmob/7.jpeg",
        "/portofolio/project/fayrmob/8.jpeg",
      ],
    },
  ]

  const certificates = [
    {
      title: "Bangkit Academy – Cloud Computing",
      file: "/portofolio/sertifikat/1.pdf",
    },
    {
      title: "Badan Penanggulangan Bencana Daerah – Sertifikat Magang",
      file: "/portofolio/sertifikat/2.pdf",
    },
    {
    title: "PalComtech – Web Developer",
    file: "/portofolio/sertifikat/3.pdf",
    },
    {
      title: "Google Cloud Skill Boost – Cloud Computing",
      file: "/portofolio/sertifikat/4.pdf",
    },
    {
      title: "Google Cloud Skill Boost – Cloud Computing",
      file: "/portofolio/sertifikat/5.pdf",
    },
    {
    title: "Google Cloud Skill Boost – Cloud Computing",
    file: "/portofolio/sertifikat/6.pdf",
    },
    {
      title: "Google Cloud Skill Boost – Cloud Computing",
      file: "/portofolio/sertifikat/7.pdf",
    },
    {
      title: "Dicoding – Web Programming Fundamentals",
      file: "/portofolio/sertifikat/8.pdf",
    },
  ]

  // 🔥 UBAH JADI ADA ICON
  const skills = [
    { name: "HTML", icon: <FaHtml5 className="text-orange-500 text-3xl" /> },
    { name: "CSS", icon: <FaCss3Alt className="text-blue-500 text-3xl" /> },
    { name: "Bootstrap", icon: <SiBootstrap className="text-purple-500 text-3xl" /> },
    { name: "Python", icon: <SiPython className="text-yellow-500 text-3xl" /> },
    { name: "Laravel", icon: <FaLaravel className="text-red-500 text-3xl" /> },
    { name: "React", icon: <FaReact className="text-cyan-400 text-3xl" /> },
    { name: "Firebase", icon: <SiFirebase className="text-yellow-400 text-3xl" /> },
    { name: "SQL", icon: <FaDatabase className="text-green-400 text-3xl" /> },
    { name: "Flutter", icon: <SiFlutter className="text-sky-400 text-3xl" /> },
    { name: "Artificial Intelligence", icon: <FaRobot className="text-purple-400 text-3xl" /> },
    { name: "AI Prompt Engineering", icon: <BsChatSquareDotsFill className="text-pink-400 text-3xl" /> },
  ]

  return (
    <section
      id="portfolio"
      className="relative py-40 px-6 bg-gradient-to-b from-gray-900 to-black overflow-hidden"
    >
          {selectedProject && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-[90%] md:w-[800px] bg-black rounded-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* IMAGE */}
            <img
              src={selectedProject.images[currentSlide]}
              className={`w-full h-[400px] rounded-xl bg-black
              ${
                selectedProject.title === "FayrMob"
                  ? "object-contain"
                  : "object-cover"
              }`}
            />

            {/* BUTTON SLIDER */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() =>
                  setCurrentSlide((prev) =>
                    prev === 0
                      ? selectedProject.images.length - 1
                      : prev - 1
                  )
                }
                className="px-4 py-2 bg-white/10 rounded-lg"
              >
                Prev
              </button>

              <button
                onClick={() =>
                  setCurrentSlide((prev) =>
                    prev === selectedProject.images.length - 1
                      ? 0
                      : prev + 1
                  )
                }
                className="px-4 py-2 bg-white/10 rounded-lg"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      {selectedCert && (
      <div
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
        onClick={() => setSelectedCert(null)}
      >
        <div
          className="w-[90%] h-[90%] bg-black rounded-xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <iframe
            src={selectedCert}
            className="w-full h-full"
          />
        </div>
      </div>
    )}
      {/* background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 blur-[160px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="relative max-w-6xl mx-auto"
      >
        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="text-sm tracking-widest text-cyan-400">
            MY WORK
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Portofolio Showcase
            </span>
          </h2>
        </div>

        {/* TABS */}
        <div className="flex justify-center gap-4 mb-14">
          {["projects", "certificates", "skills"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full border text-sm transition
              ${
                activeTab === tab
                  ? "bg-cyan-500 text-black border-cyan-400"
                  : "border-white/20 text-gray-300 hover:border-cyan-400"
              }`}
            >
              {tab === "projects"
                ? "Projects"
                : tab === "certificates"
                ? "Certificates"
                : "Skills"}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <AnimatePresence mode="wait">
          {activeTab === "projects" ? (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {projects.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8 }}
                  onClick={() => {
                    setSelectedProject(item)
                    setCurrentSlide(0)
                  }}
                  className="cursor-pointer flex items-start gap-4 p-6 rounded-3xl border border-white/10
                  bg-white/5 backdrop-blur-xl hover:border-cyan-400 transition"
                >
                  {/* LOGO */}
                  <img
                    src={item.logo}
                    alt={item.title}
                    className="w-14 h-14 object-contain rounded-xl bg-white/10 p-2"
                  />

                  {/* TEXT */}
                  <div className="flex flex-col h-full">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {item.title}
                      </h3>

                      <p className="text-gray-400 text-sm mb-4">
                        {item.desc}
                      </p>
                    </div>

                    {/* BUTTON */}
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-fit mb-4 text-xs px-5 py-2 rounded-full
                        bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition"
                      >
                        View Project ↗
                      </a>
                    )}

                    {/* TECH */}
                    <div className="flex flex-wrap gap-2 mt-auto"></div>

                    <div className="flex flex-wrap gap-2">
                      {item.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-3 py-1 rounded-full
                          bg-white/10 border border-white/10 text-gray-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : activeTab === "certificates" ? (
            <motion.div
              key="certificates"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {certificates.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedCert(item.file)}
                className="cursor-pointer overflow-hidden rounded-3xl border border-white/10
                bg-white/5 backdrop-blur-xl hover:border-cyan-400 transition"
              >
                {/* Preview PDF */}
                <iframe
                  src={item.file}
                  className="w-full h-52 pointer-events-none"
                />

                <div className="p-4">
                  <h3 className="text-sm font-semibold text-center">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
            </motion.div>
          ) : (
            // 🔥 SKILLS VERSI LOGO
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {skills.map((skill, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="flex flex-col items-center justify-center gap-3
                  p-6 rounded-2xl border border-white/10
                  bg-white/5 backdrop-blur-xl
                  hover:border-cyan-400 transition"
                >
                  {skill.icon}
                  <span className="text-sm text-gray-300">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

/* ================= CONTACT ================= */
function Contact() {
  const socials = [
    {
      name: "LinkedIn",
      icon: <FaLinkedin size={28} />,
      link: "https://linkedin.com/in/prayoga-kurniawan-130b00311",
    },
    {
      name: "GitHub",
      icon: <FaGithub size={28} />,
      link: "https://github.com/YogZ0303",
    },
    {
      name: "Instagram",
      icon: <FaInstagram size={28} />,
      link: "https://instagram.com/_theyogss_",
    },
  ]

  return (
    <section
      id="contact"
      className="relative py-40 px-6 bg-gradient-to-b from-black to-gray-900 overflow-hidden"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 flex justify-center">
        <div className="w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="relative max-w-5xl mx-auto text-center"
      >
        {/* HEADER */}
        <span className="text-sm tracking-widest text-cyan-400">
          LET’S CONNECT
        </span>

        <h2 className="text-4xl md:text-5xl font-extrabold mt-4 mb-10">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Contact Me
          </span>
        </h2>

        {/* SOCIAL CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {socials.map((item, i) => (
            <motion.a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -8 }}
              className="group relative flex flex-col items-center justify-center
              p-8 rounded-2xl border border-white/10
              bg-white/5 backdrop-blur-xl
              hover:border-cyan-400 transition"
            >
              {/* ICON */}
              <div className="text-cyan-400 group-hover:scale-110 transition">
                {item.icon}
              </div>

              {/* NAME */}
              <p className="mt-4 text-sm text-gray-300">
                {item.name}
              </p>

              {/* GLOW */}
              <div className="absolute inset-0 bg-cyan-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition -z-10 rounded-2xl" />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
