export default function handler(...[, res]: Handler) {
  // .setHeader('Cache-Control', 'public, max-age=3600')
  res.setHeader('Content-Type', 'image/svg+xml').send(`
      <svg xmlns="http://www.w3.org/2000/svg" width="1000" height="263">
  <style>
    .nlang {
      fill: #fff;
      font: 12px Sans-Serif;
    }
    .stat {
      fill: #fff;
      font: 12px Sans-Serif;
    }
    .rank {
      fill: none;
      stroke-width: 6;
      stroke: #f4cd7c;
    }
    .rank-text {
      font: 800 24px Sans-Serif;
    }
    .plang-title {
      fill: #f4cd7c;
      font: 600 18px Sans-Serif;
    }
    .plang-name {
      fill: #fff;
      font: 400 11px Sans-Serif;
    }
  </style>
  <rect rx="15" width="100%" height="100%" fill="#1f2430" />
  <g class="nlang" dominant-baseline="central" text-anchor="middle">
    <rect x="16" y="16" width="115" height="25" fill="#30363d" />
    <text x="73.5" y="28.5">MANDARIN</text>
    <rect x="131" y="16" width="115" height="25" fill="#3182ce" />
    <text x="188.5" y="28.5">NATIVE</text>
    <rect x="262" y="16" width="115" height="25" fill="#30363d" />
    <text x="319.5" y="28.5">HOKKIEN</text>
    <rect x="377" y="16" width="115" height="25" fill="#3182ce" />
    <text x="434.5" y="28.5">NATIVE</text>
    <rect x="508" y="16" width="115" height="25" fill="#30363d" />
    <text x="565.5" y="28.5">ENGLISH</text>
    <rect x="623" y="16" width="115" height="25" fill="#e53e3e" />
    <text x="680.5" y="28.5">FLUENT</text>
    <rect x="754" y="16" width="115" height="25" fill="#30363d" />
    <text x="811.5" y="28.5">VIETNAMESE</text>
    <rect x="869" y="16" width="115" height="25" fill="#e53e3e" />
    <text x="926.5" y="28.5">FLUENT</text>
  </g>
  <g class="stat" dominant-baseline="hanging">
    <rect x="16" y="57" width="476" height="190" fill="#30363d" />
    <text x="32" y="78">Total Stars Earned:</text>
    <text x="222" y="78">225</text>
    <text x="32" y="113">Total Commits:</text>
    <text x="222" y="113">55</text>
    <text x="32" y="148">Total Pull Requests:</text>
    <text x="222" y="148">8</text>
    <text x="32" y="183">Total Participated Issues:</text>
    <text x="222" y="183">8</text>
    <text x="32" y="218">Total Contributed Repos:</text>
    <text x="222" y="218">14</text>
    <g dominant-baseline="central" text-anchor="middle">
      <circle class="rank" cx="377" cy="152" r="57.5" opacity="0.2" />
      <circle class="rank" cx="377" cy="152" r="57.5" opacity="0.8" stroke-linecap="round" stroke-dasharray="250" />
      <text class="rank-text" x="377" y="152">B</text>
    </g>
  </g>
  <g dominant-baseline="hanging">
    <rect x="508" y="57" width="476" height="190" fill="#30363d" />
    <text class="plang-title" x="524" y="78">Most Used Languages</text>
    <svg x="524" y="113" width="444">
      <rect width="62.3%" height="10" fill="#3178c6" />
      <rect x="62.3%" width="23.96%" height="10" fill="#000080" />
      <rect x="86.26%" width="4.94%" height="10" fill="#f1e05a" />
      <rect x="91.2%" width="3.58%" height="10" fill="#dea584" />
      <rect x="94.78%" width="2.75%" height="10" fill="#178600" />
      <rect x="97.53%" width="2.47%" height="10" fill="#00ADD8" />
    </svg>
    <g>
      <circle cx="529" cy="149" r="5" fill="#3178c6" />
      <text class='plang-name' x="542" y="149" dominant-baseline="central">
        TypeScript 62.30%
      </text>
    </g>
    <g>
      <circle cx="529" cy="183.7" r="5" fill="#000080" />
      <text class='plang-name' x="542" y="183.7" dominant-baseline="central">
        Lua 23.96%
      </text>
    </g>
    <g>
      <circle cx="529" cy="218.3" r="5" fill="#f1e05a" />
      <text class='plang-name' x="542" y="218.3" dominant-baseline="central">
        JavaScript 4.94%
      </text>
    </g>
    <g>
      <circle cx="754" cy="149" r="5" fill="#dea584" />
      <text class='plang-name' x="767" y="149" dominant-baseline="central">
        Rust 3.58%
      </text>
    </g>
    <g>
      <circle cx="754" cy="183.7" r="5" fill="#178600" />
      <text class='plang-name' x="767" y="183.7" dominant-baseline="central">
        C# 2.75%
      </text>
    </g>
    <g>
      <circle cx="754" cy="218.3" r="5" fill="#00ADD8" />
      <text class='plang-name' x="767" y="218.3" dominant-baseline="central">
        Go 2.47%
      </text>
    </g>
  </g>
</svg>
      `);
}
