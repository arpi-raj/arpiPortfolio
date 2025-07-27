import gsap from "gsap"
import { useRef, useEffect, forwardRef } from "react"
import { useGSAP } from "@gsap/react"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Enhanced CertificateCard with advanced animations
const CertificateCard = forwardRef<
  HTMLDivElement,
  { src: string; name: string; link: string; index: number }
>(({ src, name, link, index }, ref) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const image = imageRef.current
    const overlay = overlayRef.current

    if (!card || !image || !overlay) return

    // 3D tilt effect on hover
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      
      gsap.to(card, {
        rotationY: x * 0.1,
        rotationX: -y * 0.1,
        transformPerspective: 1000,
        duration: 0.5,
        ease: "power2.out",
      })

      gsap.to(image, {
        scale: 1.05,
        duration: 0.5,
        ease: "power2.out",
      })

      gsap.to(overlay, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)",
      })

      gsap.to(image, {
        scale: 1,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)",
      })

      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const handleClick = () => {
    gsap.to(cardRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
    })
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block group perspective-1000"
      onClick={handleClick}
    >
      <div
        ref={cardRef}
        className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/25"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Certificate Image */}
        <div className="relative overflow-hidden">
          <img
            ref={imageRef}
            src={src}
            alt={`${name} Certificate`}
            className="w-full h-[300px] object-contain bg-white/5 transition-transform duration-500"
          />
          
          {/* Hover Overlay */}
          <div 
            ref={overlayRef}
            className="absolute inset-0 bg-gradient-to-t from-emerald-600/80 via-teal-500/40 to-transparent opacity-0 flex items-end justify-center p-6"
          >
            <div className="text-white text-center">
              <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="text-sm font-medium">View Certificate</span>
            </div>
          </div>
        </div>

        {/* Certificate Info */}
        <div className="p-6 relative">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">
            {name}
          </h3>
          <div className="flex items-center text-emerald-400 text-sm">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verified Certificate
          </div>
          
          {/* Decorative gradient line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>
      </div>
    </a>
  )
})

export default function Certificates() {
  const certElm = useRef<HTMLDivElement>(null)
  const subHeadingRef = useRef<HTMLParagraphElement>(null)
  const certCardsRef = useRef<HTMLDivElement[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const decorativeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    certCardsRef.current = []
  }, [])

  useGSAP(() => {
    // Parallax background animation
    gsap.to(decorativeRef.current, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    })

    // Enhanced heading animation with 3D rotation
    const headingTl = gsap.timeline({
      scrollTrigger: {
        trigger: certElm.current,
        start: "top 90%",
        toggleActions: "play none none none",
        once: true,
      },
    })

    headingTl.fromTo(certElm.current, {
      opacity: 0,
      rotationX: -90,
      transformPerspective: 1000,
      y: 100,
      scale: 0.8,
    }, {
      opacity: 1,
      rotationX: 0,
      y: 0,
      scale: 1,
      duration: 1.5,
      ease: "power4.out",
    })

    // Subtitle animation
    headingTl.fromTo(subHeadingRef.current, {
      opacity: 0,
      y: 50,
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    }, "-=0.8")

    // Enhanced certificate cards animation
    if (certCardsRef.current.length > 0) {
      gsap.fromTo(certCardsRef.current, {
        opacity: 0,
        y: 150,
        rotationY: 45,
        scale: 0.8,
        filter: "blur(10px)",
      }, {
        opacity: 1,
        y: 0,
        rotationY: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.4,
        stagger: {
          amount: 0.8,
          from: "start",
          ease: "power2.out"
        },
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
    }
  })

  const setCardRef = (el: HTMLDivElement | null) => {
    if (el && !certCardsRef.current.includes(el)) {
      certCardsRef.current.push(el)
    }
  }

  const certificates = [
    {
      src: "/certs/jpg/algo_tool_arpit_Coursera%20FQ2B2UC44WRK_page-0001.jpg",
      name: "Algorithm Toolkit",
      link: "https://www.coursera.org/account/accomplishments/verify/FQ2B2UC44WRK"
    },
    {
      src: "/certs/jpg/javaCer_Coursera%20HA0VBC05S5C1_page-0001.jpg",
      name: "Java Fullstack",
      link: "https://www.coursera.org/account/accomplishments/verify/HA0VBC05S5C1"
    },
    {
      src: "/certs/jpg/sql_arpit_Coursera%209Y583H6OC3PF_page-0001.jpg",
      name: "SQL Databases",
      link: "https://www.coursera.org/account/accomplishments/verify/9Y583H6OC3PF"
    }
  ]

  return (
    <div 
      ref={containerRef}
      className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-8 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div 
        ref={decorativeRef}
        className="absolute inset-0 opacity-20"
      >
        <div className="absolute top-32 left-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-80 right-32 w-96 h-96 bg-teal-400/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Certificate pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1
            ref={certElm}
            className="text-6xl md:text-7xl font-black mb-6 tracking-tight"
          >
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
              Certifications
            </span>
          </h1>
          <p
            ref={subHeadingRef}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Verified achievements showcasing continuous learning and professional development
          </p>
          
          {/* Decorative line */}
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"></div>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
          {certificates.map((cert, index) => (
            <div
              key={index}
              ref={setCardRef}
              className="perspective-1000"
            >
              <CertificateCard
                src={cert.src}
                name={cert.name}
                link={cert.link}
                index={index}
              />
            </div>
          ))}
        </div>

        {/* Achievement Stats */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-8 bg-gray-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-2xl px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-400">{certificates.length}</div>
                <div className="text-sm text-gray-400">Verified Certificates</div>
              </div>
            </div>
            
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent"></div>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-teal-400">100%</div>
                <div className="text-sm text-gray-400">Completion Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none"></div>
    </div>
  )
}