import Link from "next/link"
import Image from "next/image"

export function Header() {
  return (
    <header 
      className="fixed inset-x-0 top-0 z-[1000000] w-full
        md:px-[40px] xss:px-[24px] px-[16px] py-[16px]
        transition-transform duration-500
        bg-[linear-gradient(180deg,_#0A0A21_12.5%,_rgba(10,10,33,0.5)_100%)] backdrop-blur-[6px]
        bg-gradient-to-b from-black/80 to-transparent"
    >
      <nav className="grid w-full items-center grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_auto_1fr] gap-3">
        <div className="justify-self-start">
          <Link href="/" className="flex items-center">
            <div 
              aria-label="Go to homepage" 
              className="inline-flex items-center justify-center xss:scale-100 origin-left scale-[95%] transition-transform duration-500 min-w-[128px] z-10 cursor-pointer"
            >
              <Image
                alt="Logo"
                src="/logo.png"
                width={128}
                height={60}
                priority
                className="object-contain"
                style={{ color: "transparent" }}
              />
            </div>
          </Link>
        </div>

        <ul className="hidden md:flex items-center gap-[16px] py-[12px] px-0 rounded-[16px] text-[16px] justify-self-center">
          <li>
            <Link 
              href="/"
              className="font-sf-bold inline-flex justify-center items-center py-[2px] px-[16px] leading-6 tracking-[0.16px] text-[16px] font-normal transition-colors text-white"
              style={{ fontFamily: '"Almarena Neue", sans-serif' }}
            >
              <span className="relative after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-[2px] after:bg-white after:-bottom-[2px]">
                Airdrop
              </span>
            </Link>
          </li>
          <li>
            <Link 
              href="/#ecosystem"
              className="font-sf-bold inline-flex justify-center items-center py-[2px] px-[16px] leading-6 tracking-[0.16px] text-[16px] font-normal transition-colors text-gray-300 hover:text-gray-100"
              style={{ fontFamily: '"Almarena Neue", sans-serif' }}
            >
              <span className="relative">Ecosystem</span>
            </Link>
          </li>
          <li>
            <Link 
              href="/interlink-blog"
              className="font-sf-bold inline-flex justify-center items-center py-[2px] px-[16px] leading-6 tracking-[0.16px] text-[16px] font-normal transition-colors text-gray-300 hover:text-gray-100"
              style={{ fontFamily: '"Almarena Neue", sans-serif' }}
            >
              <span className="relative">Blog</span>
            </Link>
          </li>
          <li>
            <Link 
              href="https://whitepaper.interlinklabs.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sf-bold inline-flex justify-center items-center py-[2px] px-[16px] leading-6 tracking-[0.16px] text-[16px] font-normal transition-colors text-gray-300 hover:text-gray-100"
              style={{ fontFamily: '"Almarena Neue", sans-serif' }}
            >
              <span className="relative">Whitepaper</span>
            </Link>
          </li>
          <li>
            <Link 
              href="/treasury-company"
              className="font-sf-bold inline-flex justify-center items-center py-[2px] px-[16px] leading-6 tracking-[0.16px] text-[16px] font-normal transition-colors text-gray-300 hover:text-gray-100"
              style={{ fontFamily: '"Almarena Neue", sans-serif' }}
            >
              <span className="relative">Treasury Company</span>
            </Link>
          </li>
        </ul>

        <div className="justify-self-end flex items-center xss:gap-[12px] gap-0 z-[10000]">
          <button 
            className="sm:flex shrink-0 items-center justify-center gap-[10px] w-[100px] h-[48px] px-[16px] py-[10px] rounded-[12px] border border-[#6962F1] bg-[rgba(255,255,255,0.02)] transition-all hover:bg-[rgba(255,255,255,0.02)] hover:shadow-[2px_2px_4px_0_rgba(255,255,255,0.24)_inset,_0_2px_4px_0_rgba(99,101,237,0.24),_0_-7px_11px_0_rgba(164,143,255,0.12)_inset] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6962F1] xss:scale-100 origin-right scale-[90%] transform duration-[1000ms] hidden"
            style={{ backdropFilter: "blur(5px)" }}
          >
            <span 
              className="font-neue text-[16px] leading-6 tracking-[0.16px] text-white"
              style={{ WebkitTextStrokeWidth: "0.2px", WebkitTextStrokeColor: "#FFF" }}
            >
              Contact
            </span>
          </button>
          
          <Link href="/#download">
            <button 
              className="flex shrink-0 items-center justify-center gap-[10px] w-[140px] h-[48px] px-[16px] py-[10px] rounded-[12px] border border-[#6962F1] bg-[rgba(99,101,237,0.32)] shadow-[1px_1px_2px_0_rgba(255,255,255,0.24)_inset,_0_-7px_11px_0_rgba(164,143,255,0.12)_inset,_-2px_-2px_4px_0_rgba(99,101,237,0.24),_2px_2px_4px_0_rgba(99,101,237,0.24)] transition-all hover:bg-[rgba(99,101,237,0.32)] hover:shadow-[2px_2px_4px_0_rgba(255,255,255,0.24)_inset,_0_2px_4px_0_rgba(99,101,237,0.24),_0_-7px_11px_0_rgba(164,143,255,0.12)_inset] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6962F1] xss:scale-100 origin-right scale-[90%] transform duration-[1000ms]"
              style={{ backdropFilter: "blur(5px)" }}
            >
              <span 
                className="font-neue text-[16px] leading-6 tracking-[0.16px] text-white"
                style={{ WebkitTextStrokeWidth: "0.2px", WebkitTextStrokeColor: "#FFF" }}
              >
                Download
              </span>
            </button>
          </Link>

          <button 
            type="button" 
            aria-label="Toggle navigation" 
            className="p-1 md:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M12 15H28M12 20H28M12 25H28" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}
