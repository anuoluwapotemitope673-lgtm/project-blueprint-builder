import type { Layout } from "@/data/portfolio";

/* Procedurally generated, original illustrative mockups. Each project's seed
 * changes palette, composition, element counts and placement. Colours here are
 * illustration data (like image pixels), not UI theme colours. */

const PALETTES = [
  ["#1f2a1c", "#d8f26a", "#f4efe4", "#6b7b4f"],
  ["#2b1d3a", "#ff9e7a", "#fbeee6", "#7c5c9e"],
  ["#0f2a3d", "#7fd1e8", "#eef6f8", "#2e6f8e"],
  ["#3a1f1a", "#f2b84b", "#fbf3e3", "#a5502f"],
  ["#1b1b1b", "#f5f5f0", "#e94f37", "#8c8c86"],
  ["#20302a", "#c9e4ca", "#f7f4ee", "#55828b"],
  ["#36213e", "#f6c1c7", "#fff6f4", "#b0597b"],
  ["#112031", "#ffd166", "#f1f5f9", "#118ab2"],
  ["#2d2a26", "#e3d5b8", "#faf7f0", "#9a7b4f"],
  ["#0d3b2e", "#9fe2bf", "#f2fbf6", "#2a9d8f"],
  ["#3b0d1a", "#ffb3c1", "#fff0f3", "#c9184a"],
  ["#14213d", "#fca311", "#f5f5f5", "#4a5a80"],
  ["#262626", "#b8f2e6", "#fafafa", "#5e6472"],
  ["#40332a", "#ffcf99", "#fff8ef", "#c97b48"],
  ["#1a2f1a", "#e9ff70", "#f8faf2", "#4f772d"],
  ["#2a1a40", "#a0e7e5", "#f5f3ff", "#6c4ab6"],
];

function rng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

export function MockupArt({ layout, seed, label }: { layout: Layout; seed: number; label: string }) {
  const r = rng(seed * 9301 + 49297);
  const p = PALETTES[Math.floor(r() * PALETTES.length)]!;
  const [dark, acc, light, mid] = p;
  const n = (min: number, max: number) => Math.floor(min + r() * (max - min + 1));
  const flip = r() > 0.5;
  const round = n(2, 18);

  let body: React.ReactNode = null;

  const lines = (x: number, y: number, w: number, count: number, color: string, gap = 10) =>
    Array.from({ length: count }, (_, i) => (
      <rect key={`${x}-${y}-${i}`} x={x} y={y + i * gap} width={w * (0.55 + r() * 0.45)} height={4} rx={2} fill={color} opacity={0.55} />
    ));

  switch (layout) {
    case "feed": {
      const cols = 3;
      const shapes = Array.from({ length: 9 }, (_, i) => {
        const x = 110 + (i % cols) * 62;
        const y = 50 + Math.floor(i / cols) * 62;
        const kind = n(0, 3);
        const fill = [acc, mid, dark, light][n(0, 3)];
        return (
          <g key={i}>
            <rect x={x} y={y} width={58} height={58} rx={round / 3} fill={fill} />
            {kind === 0 && <circle cx={x + 29} cy={y + 29} r={n(10, 22)} fill={light} opacity={0.8} />}
            {kind === 1 && <rect x={x + 10} y={y + 36} width={38} height={6} rx={3} fill={light} />}
            {kind === 2 && <path d={`M${x} ${y + 58} L${x + 29} ${y + n(15, 35)} L${x + 58} ${y + 58}Z`} fill={acc} opacity={0.8} />}
          </g>
        );
      });
      body = (
        <>
          <rect x={95} y={20} width={210} height={265} rx={20} fill={light} />
          <circle cx={118} cy={36} r={8} fill={acc} />
          {lines(132, 33, 60, 1, dark)}
          {shapes}
        </>
      );
      break;
    }
    case "carousel": {
      const count = n(3, 5);
      body = (
        <>
          {Array.from({ length: count }, (_, i) => {
            const x = 30 + i * (340 / count) + (flip ? 8 : 0);
            const h = 170 + (i % 2) * 20;
            return (
              <g key={i} transform={`rotate(${(i - count / 2) * n(1, 4)} ${x + 50} 150)`}>
                <rect x={x} y={150 - h / 2} width={110} height={h} rx={round} fill={i % 2 ? acc : light} stroke={dark} strokeOpacity={0.1} />
                <rect x={x + 12} y={150 - h / 2 + 16} width={n(40, 80)} height={10} rx={5} fill={dark} />
                {lines(x + 12, 150 - h / 2 + 40, 86, n(3, 6), dark, 11)}
                <circle cx={x + 85} cy={150 + h / 2 - 25} r={10} fill={i % 2 ? dark : mid} />
              </g>
            );
          })}
        </>
      );
      break;
    }
    case "phone": {
      const px = flip ? 230 : 130;
      body = (
        <>
          <circle cx={flip ? 120 : 290} cy={150} r={n(60, 95)} fill={acc} opacity={0.85} />
          <rect x={px} y={25} width={130} height={255} rx={22} fill={dark} />
          <rect x={px + 8} y={35} width={114} height={235} rx={16} fill={light} />
          <rect x={px + 8} y={35} width={114} height={n(90, 140)} rx={16} fill={mid} />
          <polygon points={`${px + 55},${80} ${px + 55},${110} ${px + 80},${95}`} fill={light} />
          {lines(px + 18, 190, 90, n(3, 5), dark, 12)}
          <rect x={px + 18} y={248} width={94} height={14} rx={7} fill={acc} />
        </>
      );
      break;
    }
    case "calendar": {
      const filled = new Set(Array.from({ length: n(10, 18) }, () => n(0, 27)));
      body = (
        <>
          <rect x={40} y={30} width={320} height={240} rx={round} fill={light} />
          <rect x={40} y={30} width={320} height={40} rx={round} fill={dark} />
          {lines(56, 47, 120, 1, light)}
          {Array.from({ length: 28 }, (_, i) => {
            const x = 52 + (i % 7) * 43;
            const y = 80 + Math.floor(i / 7) * 46;
            const on = filled.has(i);
            return (
              <g key={i}>
                <rect x={x} y={y} width={38} height={40} rx={6} fill={on ? (i % 3 ? acc : mid) : dark} opacity={on ? 1 : 0.06} />
                {on && <rect x={x + 5} y={y + 28} width={20} height={4} rx={2} fill={dark} opacity={0.6} />}
              </g>
            );
          })}
        </>
      );
      break;
    }
    case "email": {
      const ex = flip ? 70 : 110;
      body = (
        <>
          <rect x={ex} y={15} width={220} height={275} rx={10} fill={light} />
          <rect x={ex} y={15} width={220} height={26} rx={10} fill={dark} opacity={0.9} />
          <rect x={ex + 70} y={52} width={80} height={10} rx={5} fill={dark} />
          <rect x={ex + 14} y={72} width={192} height={n(70, 100)} rx={6} fill={acc} />
          <circle cx={ex + 110} cy={115} r={n(14, 28)} fill={light} opacity={0.7} />
          {lines(ex + 20, 190, 180, n(3, 5), dark, 11)}
          <rect x={ex + 65} y={252} width={90} height={22} rx={11} fill={mid} />
          {flip && <rect x={300} y={60} width={70} height={90} rx={8} fill={mid} opacity={0.5} />}
        </>
      );
      break;
    }
    case "flow":
    case "funnel": {
      if (layout === "funnel") {
        const stages = n(4, 5);
        body = (
          <>
            {Array.from({ length: stages }, (_, i) => {
              const w = 300 - i * (220 / stages);
              const y = 30 + i * (240 / stages);
              return (
                <g key={i}>
                  <rect x={200 - w / 2} y={y} width={w} height={240 / stages - 8} rx={8} fill={[acc, mid, light, dark][i % 4]} />
                  <rect x={200 - 30} y={y + 18} width={60} height={5} rx={2} fill={i % 4 === 3 ? light : dark} opacity={0.7} />
                </g>
              );
            })}
          </>
        );
      } else {
        const nodes = Array.from({ length: n(5, 7) }, (_, i) => ({
          x: 40 + i * (320 / 6) + n(-6, 6),
          y: 70 + (i % 2) * 110 + n(-15, 15),
        }));
        body = (
          <>
            {nodes.slice(1).map((nd, i) => (
              <path key={i} d={`M${nodes[i].x + 30} ${nodes[i].y + 18} C ${nodes[i].x + 60} ${nodes[i].y + 18}, ${nd.x} ${nd.y + 18}, ${nd.x + 10} ${nd.y + 18}`} stroke={light} strokeWidth={2} fill="none" strokeDasharray="4 4" />
            ))}
            {nodes.map((nd, i) => (
              <g key={i}>
                <rect x={nd.x} y={nd.y} width={60} height={36} rx={i === 0 ? 18 : round / 2} fill={i === 0 ? acc : i % 3 === 0 ? mid : light} />
                <rect x={nd.x + 10} y={nd.y + 15} width={34} height={5} rx={2} fill={dark} opacity={0.6} />
              </g>
            ))}
          </>
        );
      }
      break;
    }
    case "browser":
    case "store": {
      const heroH = n(70, 110);
      const cols = layout === "store" ? n(3, 4) : n(2, 3);
      body = (
        <>
          <rect x={25} y={20} width={350} height={260} rx={12} fill={light} />
          <rect x={25} y={20} width={350} height={22} rx={12} fill={dark} opacity={0.15} />
          {[0, 1, 2].map((i) => <circle key={i} cx={40 + i * 11} cy={31} r={3.5} fill={dark} opacity={0.4} />)}
          <rect x={40} y={52} width={40} height={8} rx={4} fill={dark} />
          {lines(260, 54, 30, 1, dark)}
          <rect x={40} y={70} width={320} height={heroH} rx={round / 2} fill={flip ? dark : mid} />
          <rect x={flip ? 60 : 200} y={70 + heroH / 2 - 14} width={n(80, 130)} height={12} rx={6} fill={acc} />
          <rect x={flip ? 60 : 200} y={70 + heroH / 2 + 6} width={60} height={6} rx={3} fill={light} opacity={0.8} />
          {Array.from({ length: cols }, (_, i) => {
            const w = (320 - (cols - 1) * 10) / cols;
            const x = 40 + i * (w + 10);
            const y = 80 + heroH;
            return (
              <g key={i}>
                <rect x={x} y={y} width={w} height={layout === "store" ? 70 : 50} rx={6} fill={i % 2 ? acc : dark} opacity={layout === "store" ? 0.9 : 0.12} />
                {layout === "store" && <rect x={x} y={y + 76} width={w * 0.7} height={5} rx={2} fill={dark} opacity={0.6} />}
              </g>
            );
          })}
        </>
      );
      break;
    }
    case "product": {
      body = (
        <>
          <rect x={25} y={25} width={350} height={250} rx={12} fill={light} />
          <rect x={flip ? 205 : 40} y={40} width={155} height={170} rx={round / 2} fill={mid} />
          <circle cx={flip ? 282 : 117} cy={125} r={n(30, 55)} fill={acc} />
          {[0, 1, 2, 3].map((i) => <rect key={i} x={(flip ? 205 : 40) + i * 40} y={220} width={34} height={34} rx={5} fill={dark} opacity={i === 0 ? 0.7 : 0.15} />)}
          <g transform={`translate(${flip ? 40 : 215} 45)`}>
            <rect width={110} height={12} rx={6} fill={dark} />
            <rect y={22} width={50} height={9} rx={4} fill={mid} />
            {lines(0, 45, 140, 4, dark, 11)}
            {[0, 1, 2].map((i) => <circle key={i} cx={10 + i * 24} cy={110} r={8} fill={[acc, dark, mid][i]!} />)}
            <rect y={140} width={145} height={26} rx={13} fill={dark} />
            <rect x={45} y={150} width={55} height={6} rx={3} fill={light} />
          </g>
        </>
      );
      break;
    }
    case "dashboard": {
      const bars = n(6, 10);
      body = (
        <>
          <rect x={20} y={20} width={360} height={260} rx={12} fill={light} />
          <rect x={20} y={20} width={70} height={260} rx={12} fill={dark} />
          {lines(32, 50, 46, 6, light, 22)}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={102 + i * 92} y={34} width={84} height={56} rx={8} fill={i === 0 ? acc : dark} opacity={i === 0 ? 1 : 0.08} />
              <rect x={112 + i * 92} y={64} width={n(24, 50)} height={10} rx={5} fill={dark} opacity={0.7} />
            </g>
          ))}
          <rect x={102} y={102} width={190} height={164} rx={8} fill={dark} opacity={0.05} />
          {Array.from({ length: bars }, (_, i) => {
            const h = n(30, 120);
            return <rect key={i} x={115 + i * (165 / bars)} y={250 - h} width={165 / bars - 6} height={h} rx={3} fill={i % 3 === 0 ? acc : mid} />;
          })}
          <circle cx={330} cy={185} r={36} fill="none" stroke={mid} strokeWidth={12} opacity={0.3} />
          <circle cx={330} cy={185} r={36} fill="none" stroke={acc} strokeWidth={12} strokeDasharray={`${n(60, 200)} 300`} transform="rotate(-90 330 185)" />
        </>
      );
      break;
    }
    case "lesson": {
      body = (
        <>
          <rect x={20} y={20} width={360} height={260} rx={12} fill={light} />
          <rect x={flip ? 150 : 34} y={34} width={216} height={130} rx={8} fill={dark} />
          <circle cx={(flip ? 150 : 34) + 108} cy={99} r={20} fill={acc} />
          <polygon points={`${(flip ? 150 : 34) + 102},90 ${(flip ? 150 : 34) + 102},108 ${(flip ? 150 : 34) + 117},99`} fill={dark} />
          <rect x={flip ? 150 : 34} y={176} width={216} height={6} rx={3} fill={dark} opacity={0.1} />
          <rect x={flip ? 150 : 34} y={176} width={n(40, 200)} height={6} rx={3} fill={acc} />
          {lines(flip ? 150 : 34, 200, 200, 5, dark, 13)}
          {Array.from({ length: n(4, 6) }, (_, i) => (
            <g key={i}>
              <rect x={flip ? 34 : 262} y={34 + i * 38} width={104} height={30} rx={6} fill={i === 1 ? mid : dark} opacity={i === 1 ? 0.9 : 0.07} />
              <circle cx={(flip ? 34 : 262) + 14} cy={49 + i * 38} r={5} fill={i < 2 ? acc : dark} opacity={i < 2 ? 1 : 0.3} />
            </g>
          ))}
        </>
      );
      break;
    }
    case "community": {
      body = (
        <>
          <rect x={20} y={20} width={360} height={260} rx={12} fill={light} />
          <rect x={20} y={20} width={360} height={50} rx={12} fill={mid} />
          {lines(36, 40, 120, 1, light)}
          {Array.from({ length: n(3, 4) }, (_, i) => (
            <g key={i}>
              <rect x={flip ? 140 : 36} y={84 + i * 48} width={224} height={40} rx={8} fill={dark} opacity={0.06} />
              <circle cx={(flip ? 140 : 36) + 20} cy={104 + i * 48} r={11} fill={[acc, mid, dark, acc][i]} />
              {lines((flip ? 140 : 36) + 38, 98 + i * 48, 150, 2, dark, 9)}
            </g>
          ))}
          <g transform={`translate(${flip ? 36 : 274} 84)`}>
            <rect width={90} height={180} rx={8} fill={acc} opacity={0.35} />
            {lines(10, 14, 70, n(5, 9), dark, 16)}
          </g>
        </>
      );
      break;
    }
    case "report": {
      body = (
        <>
          <rect x={flip ? 170 : 60} y={30} width={170} height={240} rx={6} fill={light} transform={`rotate(${flip ? 4 : -4} 200 150)`} />
          <g transform={`rotate(${flip ? -3 : 3} 200 150)`}>
            <rect x={flip ? 70 : 160} y={25} width={180} height={250} rx={6} fill={light} stroke={dark} strokeOpacity={0.1} />
            <rect x={(flip ? 70 : 160) + 16} y={45} width={n(70, 130)} height={14} rx={4} fill={dark} />
            <rect x={(flip ? 70 : 160) + 16} y={68} width={50} height={6} rx={3} fill={acc} />
            <rect x={(flip ? 70 : 160) + 16} y={88} width={148} height={n(50, 80)} rx={6} fill={mid} opacity={0.85} />
            {lines((flip ? 70 : 160) + 16, 180, 148, n(5, 7), dark, 12)}
          </g>
        </>
      );
      break;
    }
  }

  return (
    <svg viewBox="0 0 400 300" role="img" aria-label={label} className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill={dark} />
      <circle cx={flip ? 60 : 340} cy={flip ? 260 : 40} r={n(60, 120)} fill={acc} opacity={0.12} />
      {body}
    </svg>
  );
}

