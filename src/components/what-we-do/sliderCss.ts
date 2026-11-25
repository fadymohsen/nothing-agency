/* Layout lives here (not in utility classes) so it can never come out half-styled. */
export const SLIDER_CSS = `
.pss-root{position:relative;width:100%;height:100vh;height:100dvh;overflow:hidden;background:var(--color-body);z-index:10}
.pss-wrap{position:relative}
.pss-sticky{position:sticky;top:0}
.pss-slot{position:absolute;inset:0;overflow:hidden}
.pss-layer{position:absolute;inset:0;pointer-events:none;will-change:transform}
.pss-bg{transform:scale(1.08)}
.pss-fill{position:absolute;inset:0}
.pss-persp{perspective:1200px}
.pss-bgimg{display:block;width:100%;height:100%;object-fit:cover;filter:blur(22px) brightness(.34) saturate(1.1);transform:scale(1.12)}
.pss-veil{position:absolute;inset:0;background:linear-gradient(90deg,rgba(37,42,46,.88),rgba(37,42,46,.4) 55%,rgba(37,42,46,.55))}
.pss-mark{position:absolute;inset-inline-start:-1vw;top:6vh;font-size:clamp(4rem,12vw,12rem);font-weight:700;line-height:1;letter-spacing:-.03em;text-transform:uppercase;white-space:nowrap;color:rgba(255,255,255,.03)}
.pss-num{position:absolute;inset-inline-end:1vw;bottom:-5vh;font-size:clamp(7rem,26vw,26rem);font-weight:700;line-height:1;color:transparent;-webkit-text-stroke:1px rgba(240,179,28,.2)}
.pss-glow{position:absolute;inset-inline-end:0;top:0;width:60vw;height:100%;background:radial-gradient(ellipse 60% 55% at 62% 50%,rgba(240,179,28,.16),transparent 70%)}
.pss-ring{position:absolute;inset-inline-end:calc(31vw - 40vh);top:50%;width:80vh;height:80vh;margin-top:-40vh;border:1.5px solid var(--color-accent);border-radius:50%;opacity:.45}
.pss-ring-2{inset-inline-end:calc(31vw - 48vh);width:96vh;height:96vh;margin-top:-48vh;border-width:1px;opacity:.2}
.pss-echo{position:absolute;border:1px solid rgba(240,179,28,.55);top:calc(5.4rem + 18px);inset-inline:calc(2.9rem + 16px) calc(2.9rem - 16px);height:32dvh}
.pss-subject{position:absolute;overflow:hidden;background:#14171a;box-shadow:0 30px 80px rgba(0,0,0,.55);top:5.4rem;inset-inline:2.9rem;height:32dvh}
.pss-subjectimg{display:block;width:100%;height:100%;object-fit:cover}
.pss-badge{position:absolute;top:0;inset-inline-start:0}
.pss-copy{position:absolute;inset:0}
.pss-titlewrap{position:absolute;inset-inline:2.9rem;top:calc(5.4rem + 32dvh + 3.2rem)}
.pss-eyebrow{margin:0 0 .6rem;font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;color:var(--color-accent);opacity:0}
.pss-title{margin:0;font-size:clamp(2.1rem,9.4vw,2.8rem);font-weight:700;line-height:1;letter-spacing:-.01em;color:#fff !important}
.pss-line{display:block;overflow:hidden;padding-bottom:.14em;margin-bottom:-.14em}
.pss-linein{display:block;transform:translateY(110%);will-change:transform}
.pss-desc{margin-top:1rem;opacity:0;pointer-events:auto}
.pss-desc p{margin:0 0 .9rem;font-size:.95rem;font-weight:300;line-height:1.55;color:#b4b4b4}
.pss-progress{height:1px;background:rgba(255,255,255,.18);margin-bottom:.9rem}
.pss-progress i{display:block;height:100%;background:var(--color-accent)}
.pss-explore{display:none}
.pss-cta{display:inline-block;padding:.85rem 1.8rem;background:var(--color-accent);color:#14171a !important;text-transform:uppercase;letter-spacing:.16em;font-size:.72rem;font-weight:700;transition:background .3s}
.pss-cta:hover{background:#fff}
.pss-counter{position:absolute;z-index:5;left:50%;transform:translateX(-50%);bottom:1.4rem;display:flex;align-items:baseline;gap:.5rem;color:#fff}
.pss-roll{position:relative;display:inline-block;overflow:hidden;height:1.7rem;line-height:1.7rem;min-width:2ch}
.pss-roll b{display:block;font-size:1.5rem;font-weight:700}
.pss-of{font-size:.75rem;letter-spacing:.2em;color:var(--color-accent)}
@media (max-height:720px) and (max-width:899px){
  .pss-subject,.pss-echo{height:26dvh}
  .pss-titlewrap{top:calc(5.4rem + 26dvh + 2.2rem)}
  .pss-title{font-size:clamp(1.8rem,8.4vw,2.3rem)}
  .pss-desc{margin-top:.7rem}
  .pss-desc p{font-size:.85rem;line-height:1.5;margin-bottom:.6rem}
  .pss-progress{margin-bottom:.6rem}
}
@media (min-width:900px){
  .pss-subject{top:19vh;height:60vh;width:48vw;inset-inline:auto;inset-inline-end:7vw}
  .pss-echo{top:calc(19vh + 22px);height:60vh;width:48vw;inset-inline:auto;inset-inline-end:calc(7vw - 22px)}
  .pss-titlewrap{inset-inline:auto;inset-inline-start:6vw;width:38vw;top:50%;transform:translateY(-50%)}
  .pss-eyebrow{font-size:.8rem;margin-bottom:1.2rem}
  .pss-title{font-size:clamp(2.5rem,4.3vw,4.9rem)}
  .pss-desc{margin-top:2rem;max-width:42ch}
  .pss-desc p{font-size:1.05rem;line-height:1.65;margin-bottom:1.3rem}
  .pss-progress{margin-bottom:1.5rem}
  .pss-explore{display:inline-flex;align-items:center;gap:.7rem;padding:0 0 .35rem;background:none;border:0;border-bottom:1px solid var(--color-accent);color:var(--color-accent);text-transform:uppercase;letter-spacing:.2em;font-size:.74rem;font-weight:700}
  .pss-explore:hover{color:#fff;border-color:#fff}
  .pss-counter{left:auto;transform:none;inset-inline-start:6vw;bottom:2rem}
}
@media (prefers-reduced-motion:reduce){.pss-linein{transform:none}.pss-eyebrow,.pss-desc{opacity:1}}
`;
