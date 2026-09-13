export default function AppBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
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
      </svg>
    </div>
  );
}
