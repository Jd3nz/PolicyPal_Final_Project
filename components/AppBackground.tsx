export default function AppBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
<<<<<<< HEAD
      {/* Soft light behind the welcome area, scaled down on small screens. */}
      <div className="pointer-events-none absolute left-1/2 top-48 h-96 w-[min(90vw,64rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(191,219,254,0.5),transparent_70%)] blur-3xl sm:top-36 sm:h-[34rem]" />
      <div className="pointer-events-none absolute right-0 top-64 hidden h-80 w-96 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(199,210,254,0.35),transparent_70%)] blur-3xl lg:block" />

      {/* Large, quiet contour lines sit outside the central reading area. */}
      <svg viewBox="0 0 400 650" fill="none" focusable="false" className="pointer-events-none absolute -left-36 top-48 hidden h-[40rem] w-96 text-blue-300 opacity-15 lg:block xl:-left-24">
        <path d="M-40 20C260-20 370 120 225 265S80 490 380 610" stroke="currentColor" strokeWidth="70" opacity=".25" />
        <path d="M-70 10C230-30 340 110 195 255S50 480 350 600" stroke="currentColor" strokeWidth="2" />
        <path d="M-15 65C285 25 395 165 250 310S105 535 405 655" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      <svg viewBox="0 0 220 320" fill="none" stroke="currentColor" strokeWidth="2" focusable="false" className="pointer-events-none absolute -left-12 top-[36rem] hidden w-52 text-indigo-400 opacity-10 lg:block">
        <path d="M105 290c35-88 3-151 37-244m-23 126-49-51m45 94 65-55" />
        <path d="M138 74c-41-5-56-36-43-59 37 11 53 34 43 59Zm-21 73c-49 1-77-26-73-58 44 1 71 20 73 58Zm-5 60c28-50 65-58 89-41-17 37-45 51-89 41Zm-1 37c-51 7-85-13-88-46 45-6 75 8 88 46Z" fill="currentColor" fillOpacity=".35" />
      </svg>
      <svg viewBox="0 0 180 180" fill="none" stroke="currentColor" strokeWidth="1.5" focusable="false" className="pointer-events-none absolute right-8 top-[44rem] hidden w-40 rotate-12 text-blue-400 opacity-10 lg:block">
        <path d="M45 20h70l30 30v105H45zM115 20v30h30M65 75h60M65 92h60M65 109h40" fill="currentColor" fillOpacity=".12" />
      </svg>
      <svg viewBox="0 0 800 300" fill="none" stroke="currentColor" strokeWidth="1.5" focusable="false" className="pointer-events-none absolute left-1/2 top-60 hidden w-[min(85vw,65rem)] -translate-x-1/2 text-indigo-400 opacity-15 sm:block">
        <path d="m120 60 3 10 10 3-10 3-3 10-3-10-10-3 10-3zm580 120 3 8 8 3-8 3-3 8-3-8-8-3 8-3zM630 35v10m-5-5h10" />
        <circle cx="190" cy="200" r="3" /><circle cx="590" cy="100" r="2" />
      </svg>
      {/* Monochrome books and foliage; no image downloads or interactive nodes. */}
      <svg viewBox="0 0 260 310" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" focusable="false" className="pointer-events-none absolute -right-12 top-64 hidden w-60 text-blue-400 opacity-15 lg:block xl:right-0 2xl:right-8">
        <ellipse cx="139" cy="270" rx="102" ry="12" fill="currentColor" stroke="none" opacity=".18" />
        <path d="M39 233h173v27H39a13.5 13.5 0 0 1 0-27Z" fill="currentColor" fillOpacity=".2" />
        <path d="M45 240h159m-159 7h159m-159 6h159M212 233v27" opacity=".65" />
        <path d="M58 204h157a14 14 0 0 0 0 28H58z" fill="currentColor" fillOpacity=".12" />
        <path d="M65 211h143m-143 7h143m-143 7h143" opacity=".65" />
        <path d="m42 183 152-13 2 27-152 13a13.5 13.5 0 0 1-2-27Z" fill="currentColor" fillOpacity=".2" />
        <path d="m49 190 137-12m-136 19 137-12" opacity=".65" />
        <path d="M154 128h55l-7 38h-41z" fill="currentColor" fillOpacity=".25" />
        <path d="M151 127h61v7h-61zM182 128V57m0 51-23-22m23 7 24-24" />
        <path d="M182 76c-26-1-34-19-29-37 23 4 32 18 29 37Zm1-4c0-28 15-41 32-40 0 25-12 39-32 40Zm-23 15c-23 2-35-9-37-26 21-2 35 7 37 26Zm43-16c19 0 31-10 32-26-21 0-30 10-32 26Z" fill="currentColor" fillOpacity=".3" />
        <path d="m54 84 3 9 9 3-9 3-3 9-3-9-9-3 9-3zM111 30v10m-5-5h10m111 97 2 6 6 2-6 2-2 6-2-6-6-2 6-2z" opacity=".7" />
=======
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#dcecff_0%,#eff7ff_34%,#f8fbff_70%,#ffffff_100%)]" />

      <div className="absolute left-1/2 top-24 h-[34rem] w-[72rem] max-w-[110vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(85,180,255,0.42),rgba(145,205,255,0.18)_38%,transparent_72%)] blur-3xl" />
      <div className="absolute -left-40 top-48 h-[38rem] w-[42rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.28),transparent_68%)] blur-2xl" />
      <div className="absolute -right-36 top-56 h-[34rem] w-[38rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.22),transparent_70%)] blur-2xl" />

      <svg viewBox="0 0 1440 760" preserveAspectRatio="none" className="absolute left-0 top-20 hidden h-[42rem] w-full opacity-80 sm:block" fill="none">
        <path d="M-100 420C130 170 330 160 520 300C720 445 872 460 1060 315C1190 214 1310 185 1540 250V760H-100Z" fill="url(#waveA)" />
        <path d="M-80 520C190 280 360 300 560 435C765 574 970 535 1110 420C1260 300 1380 338 1510 405V760H-80Z" fill="url(#waveB)" opacity=".78" />
        <defs>
          <linearGradient id="waveA" x1="0" y1="0" x2="1440" y2="760" gradientUnits="userSpaceOnUse"><stop stopColor="#6EA8FF" stopOpacity=".38"/><stop offset=".55" stopColor="#B9E6FF" stopOpacity=".18"/><stop offset="1" stopColor="#64D8FF" stopOpacity=".22"/></linearGradient>
          <linearGradient id="waveB" x1="1440" y1="200" x2="0" y2="760" gradientUnits="userSpaceOnUse"><stop stopColor="#C9E9FF" stopOpacity=".72"/><stop offset=".5" stopColor="#F4FAFF" stopOpacity=".82"/><stop offset="1" stopColor="#8FB8FF" stopOpacity=".28"/></linearGradient>
        </defs>
      </svg>

      <svg viewBox="0 0 280 430" fill="none" focusable="false" className="absolute -left-8 top-[25rem] hidden h-[27rem] w-[17rem] text-blue-600 opacity-35 lg:block">
        <path d="M107 410C132 291 114 202 150 72" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M137 127C73 124 40 87 49 38C107 43 138 76 137 127ZM130 213C58 217 19 184 23 131C88 128 126 158 130 213ZM124 297C60 309 22 287 13 238C73 223 111 243 124 297ZM144 161C197 142 236 158 254 200C207 222 165 210 144 161ZM133 259C187 242 226 258 242 303C192 322 151 306 133 259Z" fill="currentColor" fillOpacity=".48"/>
      </svg>

      <svg viewBox="0 0 330 380" fill="none" focusable="false" className="absolute -right-6 top-[23rem] hidden h-[26rem] w-[21rem] text-blue-500 opacity-34 lg:block">
        <ellipse cx="158" cy="340" rx="125" ry="14" fill="currentColor" opacity=".13" />
        <rect x="44" y="281" width="204" height="37" rx="14" fill="currentColor" fillOpacity=".14" stroke="currentColor" strokeWidth="2"/>
        <rect x="68" y="241" width="180" height="35" rx="13" fill="currentColor" fillOpacity=".1" stroke="currentColor" strokeWidth="2"/>
        <path d="M122 76h102l-11 157H135L122 76Z" fill="currentColor" fillOpacity=".1" stroke="currentColor" strokeWidth="2"/>
        <path d="M148 106h51m-51 27h51m-51 27h51" stroke="currentColor" strokeWidth="2" opacity=".6"/>
        <path d="M252 250V108m0 56-38-35m38 10 36-38" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <path d="M252 127c-43-3-59-31-48-58 38 6 54 28 48 58Zm3-9c2-39 24-56 49-50-2 34-20 52-49 50Zm-31 33c-35 4-54-14-55-39 31-5 51 10 55 39Z" fill="currentColor" fillOpacity=".34"/>
      </svg>

      <svg viewBox="0 0 900 330" fill="none" className="absolute left-1/2 top-40 hidden w-[min(90vw,75rem)] -translate-x-1/2 text-blue-600 opacity-35 sm:block">
        <path d="m100 80 4 13 13 4-13 4-4 13-4-13-13-4 13-4zm680 108 4 11 11 4-11 4-4 11-4-11-11-4 11-4zM718 52v14m-7-7h14M260 245l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" fill="currentColor"/>
        <circle cx="190" cy="210" r="4" fill="currentColor"/><circle cx="620" cy="96" r="3" fill="currentColor"/>
>>>>>>> 1619a4c (Update PolicyPal premium UI)
      </svg>
    </div>
  );
}
