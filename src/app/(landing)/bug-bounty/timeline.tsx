export default function Timeline() {
  return (
    <section id="timeline" className="w-full py-12 md:py-24 lg:py-32 ">
      <div className="px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Timeline</h2>
        <div className="relativ w-full mx-auto">
          <svg width="100%" height="352" viewBox="0 0 1579 300" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(199.5, 0)">
              {/* Horizontal Lines */}
              <path d="M-330.6111111111111 100.57142857142857 L902.7777777777778 100.57142857142857" stroke="#3b82f6" strokeWidth="2" fill="none" />

              {/* Curved Line */}
              <path
                d="M932.7777777777778 100.57142857142857 h98.33333333333334 c98.33333333333334,0 98.33333333333334,150.85714285714283 0,150.85714285714283 L342.77777777777777 251.42857142857142"
                stroke="#3b82f6"
                strokeWidth="2"
                fill="none"
              />

              {/* Timeline Points - Top Row */}
              <g>
                {/* Preparation Phase */}
                <g transform="translate(131.11111111111111, 100.57142857142857)">
                  <circle r="15" fill="#3b82f6" />
                  <circle r="15" stroke="#3b82f6" strokeWidth="2" fill="none" />
                  <text y="-50" textAnchor="middle" className="text-sm font-semibold fill-white">
                    Preparation Phase
                  </text>
                  <text y="-28" textAnchor="middle" className="text-xs fill-gray-400">
                    22/11/2024 - 29/12/2024
                  </text>
                </g>

                {/* Execution Phase */}
                <g transform="translate(524.4444444444445, 100.57142857142857)">
                  <circle r="15" fill="#3b82f6" />
                  <circle r="15" stroke="#3b82f6" strokeWidth="2" fill="none" />
                  <text y="-50" textAnchor="middle" className="text-sm font-semibold fill-white">
                    Execution Phase
                  </text>
                  <text y="-28" textAnchor="middle" className="text-xs fill-gray-400">
                    14/01/2025 - 09/02/2025
                  </text>
                </g>

                {/* Initial Review */}
                <g transform="translate(917.7777777777778, 100.57142857142857)">
                  <circle r="15" fill="#3b82f6" />
                  <circle r="15" stroke="#3b82f6" strokeWidth="2" fill="none" />
                  <text y="-50" textAnchor="middle" className="text-sm font-semibold fill-white">
                    Initial Review
                  </text>
                  <text y="-28" textAnchor="middle" className="text-xs fill-gray-400">
                    09/02/2025 - 10/02/2025
                  </text>
                </g>
              </g>

              {/* Timeline Points - Bottom Row */}
              <g>
                {/* Final Evaluation */}
                <g transform="translate(721.1111111111111, 251.42857142857142)">
                  <circle r="15" fill="#3b82f6" />
                  <circle r="15" stroke="#3b82f6" strokeWidth="2" fill="none" />
                  <text y="-50" textAnchor="middle" className="text-sm font-semibold fill-white">
                    Final Evaluation
                  </text>
                  <text y="-28" textAnchor="middle" className="text-xs fill-gray-400">
                    11/02/2025
                  </text>
                </g>

                {/* Results Announcement */}
                <g transform="translate(327.77777777777777, 251.42857142857142)">
                  <circle r="15" fill="#3b82f6" />
                  <circle r="15" stroke="#3b82f6" strokeWidth="2" fill="none" />
                  <text y="-50" textAnchor="middle" className="text-sm font-semibold fill-white">
                    Results Announcement
                  </text>
                  <text y="-28" textAnchor="middle" className="text-xs fill-gray-400">
                    12/02/2025
                  </text>
                </g>
              </g>

              {/* Info Indicators */}
              {[
                [131.11111111111111, 100.57142857142857],
                [524.4444444444445, 100.57142857142857],
                [917.7777777777778, 100.57142857142857],
                [721.1111111111111, 251.42857142857142],
                [327.77777777777777, 251.42857142857142],
              ].map(([x, y], i) => (
                <g key={i} transform={`translate(${x}, ${y})`}>
                  <path d="M0 -4 v0.1 m0 4 v3.5" stroke="#0A0D14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              ))}
            </g>
          </svg>
        </div>

        <div className="mt-16 text-center text-gray-400 max-w-2xl mx-auto">
          <p>
            Please note that dates are subject to change due to the dynamic nature of the program. Make sure to follow official announcements to stay
            up to date.
          </p>
        </div>
      </div>
    </section>
  );
}
