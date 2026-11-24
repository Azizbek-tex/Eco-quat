/* =====================================================================
   EcoҚуат — логика и интерфейс (русский / қазақша)
   ===================================================================== */
"use strict";

const STORE_KEY = "ecoquat.v1";

/* ---------------------------------------------------------------- иконки */
const I = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>',
  house: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a4 4 0 0 1 8 0v2"/><circle cx="12" cy="13.5" r="2"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
  leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z"/><path d="M2 21c0-3 1.9-5.5 5.1-6.1"/></svg>',
  tariff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9h10M7 13h6M7 17h4"/></svg>',
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></svg>',
  save: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3h11l5 5v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M7 3v5h8M7 21v-7h10v7"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
};

const NAV = [
  { id: "dash", icon: "home" }, { id: "calc", icon: "bolt" }, { id: "home", icon: "house" },
  { id: "stats", icon: "chart" }, { id: "eco", icon: "leaf" }, { id: "tariffs", icon: "tariff", hidden: true },
];

/* ---------------------------------------------------------------- состояние */
function defaultState() {
  const appl = {};
  APPLIANCES.forEach(a => { appl[a.id] = a.def; });
  const lng = (navigator.language || "").toLowerCase().startsWith("kk") ? "kz" : "ru";
  return {
    version: 1, onboarded: false,
    home: { region: "г. Астана", stove: false, persons: 3, rooms: 3, lampsPerRoom: 2, lampType: "led", lampHours: 5,
            category: "Без льготы", appliances: appl },
    settings: { mode: "project", goalPct: 10, lang: lng },
    records: [], tariffs: {}, categories: JSON.parse(JSON.stringify(SOCIAL)),
  };
}
let S = load();
let view = "dash";
let draft = null;

function load() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const d = Object.assign(defaultState(), JSON.parse(raw));
      d.home = Object.assign(defaultState().home, d.home);
      d.settings = Object.assign(defaultState().settings, d.settings);
      return d;
    }
  } catch (e) { console.warn(e); }
  return defaultState();
}
function save() {
  S.records.sort((a, b) => a.month.localeCompare(b.month));
  localStorage.setItem(STORE_KEY, JSON.stringify(S));
}

/* ---------------------------------------------------------------- язык */
const lang = () => (S.settings.lang === "kz" ? "kz" : "ru");
function t(key, params) {
  let s = I18N[lang()][key];
  if (s === undefined) s = I18N.ru[key];
  if (s === undefined) return key;
  if (params && typeof s === "string") s = s.replace(/\{(\w+)\}/g, (m, k) => (params[k] !== undefined ? params[k] : m));
  return s;
}
const kzOr = (obj, ruField, kzField) => (lang() === "kz" && obj[kzField] ? obj[kzField] : obj[ruField]);
const regionName = key => (REGIONS[key] ? (lang() === "kz" ? REGIONS[key].kz : key) : key);
const supplierName = r => kzOr(r, "supplier", "supplier_kz");
const noteText = r => kzOr(r, "note", "note_kz");
const catName = key => (lang() === "kz" && SOCIAL_KZ[key] ? SOCIAL_KZ[key] : key);
const applName = a => kzOr(a, "name", "kz");
const applTip = a => kzOr(a, "tip", "tip_kz");
const lampName = k => kzOr(LAMP_TYPES[k], "name", "kz");
const ecoText = c => kzOr(c, "text", "kz");

function setLang(code) {
  S.settings.lang = code; save();
  document.documentElement.lang = code === "kz" ? "kk" : "ru";
  document.title = t("app.title");
  render();
}

/* ---------------------------------------------------------------- форматирование */
const nf0 = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 });
const nf1 = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 1 });
const nf2 = new Intl.NumberFormat("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const tg = x => nf2.format(x) + " ₸";
const tg0 = x => nf0.format(x) + " ₸";
const kwh = x => nf1.format(x) + " " + t("unit.kwh");
const money = x => Math.round((x + Number.EPSILON) * 100) / 100;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const monthLabel = key => `${t("months")[+key.slice(5) - 1]} ${key.slice(0, 4)}`;
const monthShort = key => `${t("months.short")[+key.slice(5) - 1]} ${key.slice(2, 4)}`;
function nextMonth(key) { let y = +key.slice(0, 4), m = +key.slice(5) + 1; if (m > 12) { m = 1; y++; } return `${y}-${String(m).padStart(2, "0")}`; }
function currentMonthKey() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`; }

/** field — ключ названия поля или [ключ, параметры] */
function parseNum(v, field, { allowNeg = false, allowEmpty = false } = {}) {
  const name = Array.isArray(field) ? t(field[0], field[1]) : t(field);
  const s = String(v ?? "").replace(/\s/g, "").replace(",", ".");
  if (s === "") { if (allowEmpty) return 0; throw new Error(t("err.empty", { f: name })); }
  const n = Number(s);
  if (!Number.isFinite(n)) throw new Error(t("err.nan", { f: name }));
  if (n < 0 && !allowNeg) throw new Error(t("err.neg", { f: name }));
  return n;
}

/* ================================================================ РАСЧЁТЫ */
function region(name) {
  const base = REGIONS[name] || REGIONS["г. Астана"];
  return Object.assign({}, base, S.tariffs[name] || {});
}
function prices(reg, stove) { return stove && reg.stove ? reg.stove : reg.tiers; }
function perPersonNorm(reg, stove) { return stove ? [reg.s1 ?? reg.n1, reg.s2 ?? reg.n2] : [reg.n1, reg.n2]; }

/** Ожидаемый расход по технике и освещению (кВт·ч в месяц) */
function expectedUsage(home = S.home) {
  const items = [];
  APPLIANCES.forEach(a => {
    const c = home.appliances[a.id] || 0;
    if (c > 0) items.push({ id: a.id, name: applName(a), icon: a.icon, count: c, kwh: a.kwh * c });
  });
  const lamps = home.rooms * home.lampsPerRoom;
  const light = lamps * LAMP_TYPES[home.lampType].watt * home.lampHours * 30 / 1000;
  items.push({ id: "light", name: t("exp.light", { n: lamps }), icon: "💡", count: lamps, kwh: light });
  items.push({ id: "other", name: t("exp.other"), icon: "🔌", count: 1, kwh: home.persons * 5 });
  items.sort((a, b) => b.kwh - a.kwh);
  return { total: items.reduce((s, x) => s + x.kwh, 0), items, light, lamps };
}

/** Норма семьи и границы уровней */
function familyLimits(home = S.home, mode = S.settings.mode) {
  const reg = region(home.region);
  const [n1, n2] = perPersonNorm(reg, home.stove);
  const p = Math.max(1, home.persons);
  const norm = n1 * p, norm2 = n2 * p;
  const tech = expectedUsage(home).total;
  let L1 = norm, L2 = norm2;
  if (mode === "project" && tech > norm) {   // техника «расширяет» норму
    L1 = Math.ceil(tech);
    L2 = L1 + (n2 - n1) * p;
  }
  return { reg, n1, n2, p, norm, norm2, tech, L1, L2 };
}

function splitTiers(value, limits, pr) {
  const rows = []; let prev = 0;
  const bounds = [limits[0], limits[1], Infinity];
  for (let i = 0; i < 3; i++) {
    const used = Math.min(value, bounds[i]) - prev;
    if (used > 0) rows.push({ level: i + 1, from: prev, to: bounds[i], kwh: used, price: pr[i], sum: money(used * pr[i]) });
    prev = bounds[i];
    if (value <= bounds[i]) break;
  }
  return rows;
}

/** Главный расчёт месячного счёта */
function calcBill({ start, end, debt = 0, paid = 0, home = S.home, mode = S.settings.mode }) {
  if (end < start) throw new Error(t("err.endLess", { e: nf2.format(end), s: nf2.format(start) }));
  const consumption = money(end - start);
  if (consumption > 20000) throw new Error(t("err.tooBig"));
  const F = familyLimits(home, mode);
  const pr = prices(F.reg, home.stove);
  const rows = splitTiers(consumption, [F.L1, F.L2], pr);
  const gross = money(rows.reduce((s, r) => s + r.sum, 0));
  const cat = S.categories[home.category] || { percent: 0, norm: 0 };
  const covered = Math.min(consumption, cat.norm * F.p);
  const discBase = splitTiers(covered, [F.L1, F.L2], pr).reduce((s, r) => s + r.sum, 0);
  const discount = money(discBase * cat.percent / 100);
  const charge = money(gross - discount);
  const debtAfter = money(debt + charge - paid);
  const allL1 = money(consumption * pr[0]);
  const justified = Math.max(F.norm, F.tech);
  let status = "good";
  if (consumption > F.norm) status = consumption <= justified ? "warn" : "bad";
  return {
    start, end, consumption, rows, gross, discount, charge, debt: money(debt), paid: money(paid), debtAfter,
    status, overNorm: Math.max(0, consumption - F.norm), waste: Math.max(0, consumption - justified), justified,
    extraTierCost: money(gross - allL1), co2: consumption * CO2_PER_KWH, perPerson: consumption / F.p, F, pr, cat,
  };
}

const ecoClass = perPerson => ECO_CLASSES.find(c => perPerson < c.max);
const recWaste = r => Math.max(0, r.kwh - Math.max(r.norm || 0, r.expected || 0));

function statsOf(recs) {
  if (!recs.length) return null;
  const total = recs.reduce((s, r) => s + r.kwh, 0);
  let days = 0;
  recs.forEach(r => { days += new Date(+r.month.slice(0, 4), +r.month.slice(5), 0).getDate(); });
  return {
    n: recs.length, total, avg: total / recs.length, perDay: total / days,
    max: recs.reduce((a, b) => (b.kwh > a.kwh ? b : a)), min: recs.reduce((a, b) => (b.kwh < a.kwh ? b : a)),
    charged: money(recs.reduce((s, r) => s + r.charge, 0)), paid: money(recs.reduce((s, r) => s + r.paid, 0)),
    debt: recs[recs.length - 1].debt_after, co2: total * CO2_PER_KWH,
    inNorm: recs.filter(r => r.norm && r.kwh <= r.norm).length,
  };
}

/* ================================================================ СОВЕТЫ */
function personalTips(bill) {
  const out = [];
  const h = S.home;
  const exp = expectedUsage(h);
  const p1 = prices(region(h.region), h.stove)[0];
  if (h.lampType !== "led") {
    const s = exp.lamps * (LAMP_TYPES[h.lampType].watt - 9) * h.lampHours * 30 / 1000;
    out.push({ em: "💡", html: t("tip.led", { n: exp.lamps, k: kwh(s), m: tg0(s * p1) }) });
  }
  if (h.lampHours > 6) out.push({ em: "🌙", html: t("tip.hours", { h: h.lampHours, k: kwh(exp.lamps * LAMP_TYPES[h.lampType].watt * 30 / 1000) }) });
  exp.items.filter(x => x.kwh >= 20).slice(0, 4).forEach(x => {
    const a = APPLIANCES.find(a => a.id === x.id);
    if (a && a.tip) out.push({ em: a.icon, html: t("tip.appl", { n: esc(applName(a)), k: kwh(x.kwh), t: esc(applTip(a)) }) });
  });
  if (bill && bill.status === "bad") out.unshift({ em: "🌍", html: t("tip.waste", { k: kwh(bill.waste), c: nf1.format(bill.waste * CO2_PER_KWH) }) });
  const standby = Object.values(h.appliances).reduce((s, c) => s + c, 0) * 0.7;
  out.push({ em: "🔌", html: t("tip.standby", { k: kwh(standby) }) });
  return out;
}
const tipsHTML = list => list.map(x => `<div class="tip"><span class="em">${x.em}</span><div>${x.html}</div></div>`).join("");

/* ================================================================ ДОСТИЖЕНИЯ */
function achievements() {
  const r = S.records;
  let streak = 0, best = 0;
  r.forEach(x => { streak = x.norm && x.kwh <= x.norm ? streak + 1 : 0; best = Math.max(best, streak); });
  const last = r[r.length - 1];
  const cls = last ? ecoClass(last.kwh / (last.persons || S.home.persons)).cls : null;
  const list = [
    ["⚡", "ach.first", r.length >= 1],
    ["✅", "ach.norm", r.some(x => x.norm && x.kwh <= x.norm)],
    ["🔥", "ach.streak", best >= 3],
    ["📉", "ach.drop", r.some((x, i) => i > 0 && x.kwh <= r[i - 1].kwh * 0.9)],
    ["💡", "ach.led", S.home.lampType === "led"],
    ["🌱", "ach.eco", cls === "A" || cls === "B"],
    ["💳", "ach.debt", r.some(x => x.debt_after <= 0 && x.charge > 0)],
    ["🏆", "ach.year", r.length >= 12],
  ];
  return list.map(([em, key, got]) => ({ em, name: t(key)[0], d: t(key)[1], got }));
}

/* ================================================================ UI-утилиты */
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

function toast(msg, kind = "") {
  const el = document.createElement("div");
  el.className = `toast ${kind}`;
  el.innerHTML = `<span>${kind === "bad" ? "⚠️" : kind === "good" ? "✅" : "⚡"}</span><div>${msg}</div>`;
  $("#toasts").appendChild(el);
  setTimeout(() => el.remove(), 4800);
}

function notify(title, body) {
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  try {
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then(reg => reg.showNotification(title, { body, icon: "icons/icon-192.png", badge: "icons/icon-96.png" }));
    } else new Notification(title, { body, icon: "icons/icon-192.png" });
  } catch (e) { /* уведомления недоступны */ }
}

function modal(html, onMount) {
  const ov = $("#overlay");
  ov.innerHTML = `<div class="modal"><div class="modal-box fade-in">${html}</div></div>`;
  const m = $(".modal", ov);
  m.addEventListener("click", e => { if (e.target === m) closeModal(); });
  if (onMount) onMount(m);
}
function closeModal() { $("#overlay").innerHTML = ""; }
function confirmBox(text, onYes, yes, danger = false) {
  modal(`<h3>${t("common.confirm")}</h3><p class="muted">${text}</p>
    <div class="btns mt"><button class="btn ${danger ? "danger" : "primary"}" id="cy">${yes || t("common.yes")}</button><button class="btn ghost" id="cn">${t("common.cancel")}</button></div>`, m => {
    $("#cy", m).onclick = () => { closeModal(); onYes(); };
    $("#cn", m).onclick = closeModal;
  });
}

function stepper(id, value, min = 0, max = 99) {
  return `<div class="stepper" data-step="${id}" data-min="${min}" data-max="${max}"><button type="button" data-d="-1">−</button><span>${value}</span><button type="button" data-d="1">+</button></div>`;
}
function bindSteppers(root, onChange) {
  $$(".stepper", root).forEach(st => {
    $$("button", st).forEach(b => b.onclick = () => {
      const span = $("span", st);
      const v = Math.min(+st.dataset.max, Math.max(+st.dataset.min, +span.textContent + +b.dataset.d));
      span.textContent = v;
      onChange(st.dataset.step, v);
    });
  });
}

function langSwitch(id) {
  return `<div class="seg lang-seg" id="${id}"><button data-lang="ru" class="${lang() === "ru" ? "on" : ""}">РУС</button><button data-lang="kz" class="${lang() === "kz" ? "on" : ""}">ҚАЗ</button></div>`;
}
function bindLang(root, after) {
  $$("[data-lang]", root).forEach(b => b.onclick = () => { setLang(b.dataset.lang); if (after) after(); });
}

function gaugeSVG(pct, color) {
  const r = 92, c = 2 * Math.PI * r, shown = Math.min(pct, 1.5) / 1.5;
  return `<svg class="gauge" viewBox="0 0 230 230">
    <defs><linearGradient id="gg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe066"/><stop offset=".6" stop-color="${color}"/><stop offset="1" stop-color="${color}"/></linearGradient>
    <filter id="gl"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <circle cx="115" cy="115" r="${r}" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="18"/>
    <circle cx="115" cy="115" r="${r}" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="2" stroke-dasharray="2 ${c / 60 - 2}"/>
    <circle cx="115" cy="115" r="${r}" fill="none" stroke="url(#gg)" stroke-width="18" stroke-linecap="round" filter="url(#gl)"
      stroke-dasharray="${c * shown} ${c}" transform="rotate(-90 115 115)" style="transition:stroke-dasharray .8s"/>
    <line x1="115" y1="${115 - r - 14}" x2="115" y2="${115 - r + 14}" stroke="#fff" stroke-width="3" transform="rotate(${360 / 1.5} 115 115)" opacity=".8"/>
  </svg>`;
}

const debtText = d => (d > 0 ? tg(d) : d < 0 ? t("debt.over", { v: tg(-d) }) : t("debt.none"));

/* ================================================================ НАВИГАЦИЯ */
function renderChrome() {
  $("#brand-sub").textContent = t("app.sub");
  $("#side-nav").innerHTML = NAV.map(n => `<button class="nav-btn ${view === n.id ? "active" : ""}" data-v="${n.id}">${I[n.icon]}<span>${t("nav." + n.id)}</span></button>`).join("");
  $("#bottom-nav").innerHTML = NAV.filter(n => !n.hidden).map(n => `<button class="${view === n.id ? "active" : ""}" data-v="${n.id}">${I[n.icon]}<span>${t("nav." + n.id)}</span></button>`).join("");
  $$("[data-v]").forEach(b => b.onclick = () => go(b.dataset.v));
  const F = familyLimits();
  $("#side-card").innerHTML = `${t("side.norm")}<b>${kwh(F.norm)} · ${t("side.perMonth")}</b><span>${t("side.people", { p: F.p, n: F.n1 })} · ${esc(regionName(S.home.region))}</span>`;
  $("#btn-settings").title = t("btn.settings");
  $("#btn-tariffs-top").title = t("btn.tariffs");
  $("#top-lang").innerHTML = langSwitch("top-lang-sw");
  bindLang($("#top-lang"));
}
function go(v) { view = v; history.replaceState(null, "", "#" + v); render(); window.scrollTo({ top: 0, behavior: "smooth" }); }

function render() {
  $("#page-title").textContent = t("nav." + view);
  $("#page-sub").textContent = t("sub." + view);
  renderChrome();
  const el = $("#view");
  el.className = "fade-in";
  void el.offsetWidth;
  ({ dash: viewDash, calc: viewCalc, home: viewHome, stats: viewStats, eco: viewEco, tariffs: viewTariffs })[view](el);
}

/* ================================================================ ГЛАВНАЯ */
function viewDash(el) {
  const last = S.records[S.records.length - 1];
  const F = familyLimits();
  if (!last) {
    el.innerHTML = `
      <div class="card glow"><div class="empty"><span class="em">⚡</span>
        <h2 style="color:var(--text);margin:0 0 8px">${t("dash.welcome")}</h2>
        <p style="max-width:640px;margin:0 auto">${t("dash.welcomeText")}</p>
        <div class="btns" style="justify-content:center;margin-top:18px">
          <button class="btn primary" id="go-calc">${I.bolt} ${t("dash.first")}</button>
          <button class="btn ghost" id="go-home">${I.house} ${t("dash.setup")}</button>
          <button class="btn ghost" id="demo">${t("dash.demo")}</button>
        </div></div></div>
      ${familyCard(F)}`;
    $("#go-calc").onclick = () => go("calc");
    $("#go-home").onclick = () => go("home");
    $("#demo").onclick = loadDemo;
    return;
  }
  const st = statsOf(S.records);
  const due = last.month < currentMonthKey();
  const pct = last.norm ? last.kwh / last.norm : 0;
  const color = last.status === "good" ? "#34d399" : last.status === "warn" ? "#ffb02e" : "#ff5d6c";
  const persons = last.persons || F.p;
  const cls = ecoClass(last.kwh / persons);
  const info = { overNorm: Math.max(0, last.kwh - (last.norm || 0)), waste: recWaste(last), status: last.status };
  el.innerHTML = `
    ${due ? `<div class="banner info" style="margin-bottom:18px"><div class="b-ico">🗓️</div><div><b>${t("dash.due", { m: monthLabel(nextMonth(last.month)) })}</b><p>${t("dash.dueText")}</p></div>
      <button class="btn primary small" id="go-calc2" style="margin-left:auto">${I.bolt} ${t("nav.calc")}</button></div>` : ""}
    <div class="hero">
      <div class="card glow hero-main">
        <div class="stat"><span class="label">${t("dash.toPay", { m: monthLabel(last.month) })}</span></div>
        <div class="big grad-text">${tg(last.charge)}</div>
        <div class="hero-row">
          <div class="stat"><span class="label">${t("dash.usage")}</span><span class="value">${kwh(last.kwh)}</span></div>
          <div class="stat"><span class="label">${t("dash.norm")}</span><span class="value">${kwh(last.norm || F.norm)}</span></div>
          <div class="stat"><span class="label">${t("dash.debt")}</span><span class="value ${last.debt_after > 0 ? "red" : "green"}">${debtText(last.debt_after)}</span></div>
        </div>
        ${statusBanner(last.status, info)}
      </div>
      <div class="card gauge-wrap">
        ${gaugeSVG(pct, color)}
        <div class="gauge-center"><b style="color:${color}">${nf0.format(pct * 100)}%</b><span>${t("dash.ofNorm")}</span></div>
      </div>
    </div>
    <div class="grid g4 mt">
      <div class="card stat"><span class="ico">🌍</span><span class="label">${t("dash.co2")}</span><span class="value">${nf0.format(last.kwh * CO2_PER_KWH)} ${t("unit.kg")}</span><span class="hint">${t("dash.trees", { n: nf1.format(last.kwh * CO2_PER_KWH / (CO2_PER_TREE_YEAR / 12)) })}</span></div>
      <div class="card stat"><span class="ico">🏷️</span><span class="label">${t("dash.eco")}</span><span class="value" style="color:${cls.color}">${cls.cls}</span><span class="hint">${t("dash.perPerson", { n: nf0.format(last.kwh / persons) })}</span></div>
      <div class="card stat"><span class="ico">📊</span><span class="label">${t("dash.avg")}</span><span class="value">${kwh(st.avg)}</span><span class="hint">${t("dash.avgHint", { n: st.n, d: nf1.format(st.perDay) })}</span></div>
      <div class="card stat"><span class="ico">✅</span><span class="label">${t("dash.inNorm")}</span><span class="value">${t("dash.inNormVal", { a: st.inNorm, b: st.n })}</span><span class="hint">${st.inNorm === st.n ? t("dash.inNormAll") : t("dash.inNormGoal")}</span></div>
    </div>
    <div class="grid g2 mt">
      <div class="card eco"><h3>🌿 ${t("dash.tips")}</h3><div class="tips">${tipsHTML(personalTips(info).slice(0, 4))}</div></div>
      <div class="card"><h3>📈 ${t("dash.recent")}</h3>${chartSVG(S.records.slice(-6), F.norm, 230)}
        <button class="btn ghost small mt-s" id="go-stats">${t("dash.allHistory")}</button></div>
    </div>`;
  if ($("#go-calc2")) $("#go-calc2").onclick = () => go("calc");
  $("#go-stats").onclick = () => go("stats");
}

function familyCard(F) {
  const exp = expectedUsage();
  return `<div class="grid g3 mt">
    <div class="card stat"><span class="ico">👨‍👩‍👧</span><span class="label">${t("dash.norm")}</span><span class="value">${kwh(F.norm)}</span><span class="hint">${t("side.people", { p: F.p, n: F.n1 })} · ${esc(regionName(S.home.region))}</span></div>
    <div class="card stat"><span class="ico">🔌</span><span class="label">${t("dash.techExp")}</span><span class="value">${kwh(exp.total)}</span><span class="hint">${t("dash.techHint")}</span></div>
    <div class="card stat"><span class="ico">💰</span><span class="label">${t("dash.tier1")}</span><span class="value">${tg(prices(F.reg, S.home.stove)[0])}</span><span class="hint">${t("dash.tier1Hint")}</span></div></div>`;
}

function statusBanner(status, r) {
  if (status === "good") return `<div class="banner good"><div class="b-ico">🌱</div><div><b>${t("st.good.t")}</b><p>${t("st.good.p")}</p></div></div>`;
  if (status === "warn") return `<div class="banner warn"><div class="b-ico">⚠️</div><div><b>${t("st.warn.t", { v: kwh(r.overNorm) })}</b><p>${t("st.warn.p", { extra: S.settings.mode === "project" ? t("st.warn.extra") : "" })}</p></div></div>`;
  return `<div class="banner bad"><div class="b-ico">🔴</div><div><b>${t("st.bad.t")}</b><p>${t("st.bad.p", { v: kwh(r.waste) })}</p></div></div>`;
}

/* ================================================================ РАСЧЁТ */
function newDraft() {
  const last = S.records[S.records.length - 1];
  return { month: last ? nextMonth(last.month) : currentMonthKey(), start: last ? String(last.end) : "", end: "", debt: last ? String(last.debt_after) : "0", paid: "0" };
}

function viewCalc(el) {
  if (!draft) draft = newDraft();
  const years = []; const y0 = new Date().getFullYear();
  for (let y = y0 - 4; y <= y0 + 1; y++) years.push(y);
  const F = familyLimits();
  const unit = t("unit.kwh");
  el.innerHTML = `
    <div class="grid g2" style="align-items:start">
      <div class="card">
        <h3>📝 ${t("calc.input")}</h3>
        <div class="form" id="calc-form">
          <div class="row">
            <div class="field"><label>${t("calc.month")}</label>
              <select class="input" id="f-m">${t("months").map((m, i) => `<option value="${String(i + 1).padStart(2, "0")}" ${+draft.month.slice(5) === i + 1 ? "selected" : ""}>${m}</option>`).join("")}</select></div>
            <div class="field"><label>${t("calc.year")}</label>
              <select class="input" id="f-y">${years.map(y => `<option ${+draft.month.slice(0, 4) === y ? "selected" : ""}>${y}</option>`).join("")}</select></div>
          </div>
          <div class="row">
            <div class="field"><label>${t("calc.start")}</label><div class="unit"><input class="input" id="f-start" inputmode="decimal" placeholder="${t("calc.startPh")}" value="${esc(draft.start)}"><span>${unit}</span></div></div>
            <div class="field"><label>${t("calc.end")}</label><div class="unit"><input class="input" id="f-end" inputmode="decimal" placeholder="${t("calc.endPh")}" value="${esc(draft.end)}"><span>${unit}</span></div></div>
          </div>
          <div class="row">
            <div class="field"><label>${t("calc.debt")}</label><div class="unit"><input class="input" id="f-debt" inputmode="decimal" value="${esc(draft.debt)}"><span>₸</span></div><span class="help">${t("calc.debtHelp")}</span></div>
            <div class="field"><label>${t("calc.paid")}</label><div class="unit"><input class="input" id="f-paid" inputmode="decimal" value="${esc(draft.paid)}"><span>₸</span></div></div>
          </div>
          <div class="banner info"><div class="b-ico">🏠</div><div><b>${t("calc.homeLine", { r: esc(regionName(S.home.region)), p: F.p, s: S.home.stove ? t("calc.withStove") : t("calc.noStove") })}</b>
            <p>${t("calc.homeText", { p: F.p, n: F.n1, norm: kwh(F.norm), c: esc(catName(S.home.category)) })} <a href="#" id="to-home">${t("calc.toHome")}</a></p></div></div>
          <div class="btns">
            <button class="btn primary" id="b-save">${I.save} ${t("calc.save")}</button>
            <button class="btn ghost" id="b-clear">${t("calc.clear")}</button>
          </div>
        </div>
      </div>
      <div id="calc-result"></div>
    </div>`;
  const upd = () => {
    draft = { month: `${$("#f-y").value}-${$("#f-m").value}`, start: $("#f-start").value, end: $("#f-end").value, debt: $("#f-debt").value, paid: $("#f-paid").value };
    showResult(false);
  };
  $$("#calc-form input, #calc-form select").forEach(i => i.addEventListener("input", upd));
  $("#to-home").onclick = e => { e.preventDefault(); go("home"); };
  $("#b-clear").onclick = () => { draft = newDraft(); render(); };
  $("#b-save").onclick = saveMonth;
  showResult(false);
}

function readBill(strict) {
  $$("#calc-form .input").forEach(i => i.classList.remove("err"));
  try {
    const start = parseNum(draft.start, "f.start");
    const end = parseNum(draft.end, "f.end");
    const debt = parseNum(draft.debt, "f.debt", { allowNeg: true, allowEmpty: true });
    const paid = parseNum(draft.paid, "f.paid", { allowEmpty: true });
    return calcBill({ start, end, debt, paid });
  } catch (e) {
    if (strict) {
      if (e.message.includes(t("f.start"))) $("#f-start").classList.add("err");
      if (e.message.includes(t("f.end"))) $("#f-end").classList.add("err");
    }
    return { error: e.message };
  }
}

function showResult(strict) {
  const box = $("#calc-result");
  const b = readBill(strict);
  if (b.error) {
    const empty = !draft.start && !draft.end;
    box.innerHTML = `<div class="card"><div class="empty"><span class="em">${empty ? "🔌" : "✋"}</span>${empty ? t("calc.empty") : esc(b.error)}</div></div>`;
    return null;
  }
  const F = b.F;
  const colors = ["#34d399", "#ffb02e", "#ff5d6c"];
  const tot = b.consumption || 1;
  box.innerHTML = `
    <div class="card glow">
      <div class="stat"><span class="label">${t("calc.toPay", { m: monthLabel(draft.month) })}</span></div>
      <div class="big grad-text" style="font-size:44px;font-weight:900;letter-spacing:-1px">${tg(b.charge)}</div>
      <dl class="kv mt">
        <dt>${t("calc.usage")}</dt><dd>${kwh(b.consumption)}</dd>
        <dt>${t("calc.normLine", { p: F.p, n: F.n1 })}</dt><dd>${kwh(F.norm)}</dd>
        ${S.settings.mode === "project" && F.L1 > F.norm ? `<dt>${t("calc.normTech")}</dt><dd>${kwh(F.L1)}</dd>` : ""}
        <dt>${t("calc.gross")}</dt><dd>${tg(b.gross)}</dd>
        ${b.discount ? `<dt>${t("calc.discount", { c: esc(catName(S.home.category)) })}</dt><dd class="green">− ${tg(b.discount)}</dd>` : ""}
        ${b.extraTierCost > 0 ? `<dt>${t("calc.extra")}</dt><dd class="red">+ ${tg(b.extraTierCost)}</dd>` : ""}
        <div class="sep"></div>
        <dt>${t("calc.total")}</dt><dd class="total amber">${tg(b.charge)}</dd>
        <dt>${t("calc.paidLine")}</dt><dd>${tg(b.paid)}</dd>
        <dt>${t("calc.debtEnd")}</dt><dd class="${b.debtAfter > 0 ? "red" : "green"}">${b.debtAfter === 0 ? t("debt.zero") : debtText(b.debtAfter)}</dd>
      </dl>
    </div>
    <div class="card mt">
      <h3>⚡ ${t("calc.tiers")}</h3>
      <div class="tierbar">${b.rows.map(r => `<i style="width:${r.kwh / tot * 100}%;background:${colors[r.level - 1]}"></i>`).join("")}</div>
      <div class="table-wrap mt-s"><table><tr><th>${t("calc.level")}</th><th class="num">${t("unit.kwh")}</th><th class="num">${t("calc.price")}</th><th class="num">${t("calc.sum")}</th></tr>
        ${b.rows.map(r => `<tr><td><span style="color:${colors[r.level - 1]}">●</span> ${t("calc.lvlName", { n: r.level })}: ${r.to === Infinity ? t("calc.over", { v: nf0.format(r.from) }) : nf0.format(r.from) + "–" + nf0.format(r.to)}</td><td class="num">${nf2.format(r.kwh)}</td><td class="num">${nf2.format(r.price)}</td><td class="num">${tg(r.sum)}</td></tr>`).join("")}
      </table></div>
    </div>
    <div class="mt">${statusBanner(b.status, b)}</div>
    ${b.status !== "good" ? `<div class="card eco mt"><h3>🌿 ${t("calc.howSave")}</h3><div class="tips">${tipsHTML(personalTips(b).slice(0, 3))}</div></div>` : ""}
    <div class="card mt"><div class="grid g2">
      <div class="stat"><span class="label">${t("calc.co2")}</span><span class="value grad-eco">${nf0.format(b.co2)} ${t("unit.kg")}</span></div>
      <div class="stat"><span class="label">${t("calc.ecoCls")}</span><span class="value" style="color:${ecoClass(b.perPerson).color}">${ecoClass(b.perPerson).cls} · ${t("calc.perPerson", { n: nf0.format(b.perPerson) })}</span></div>
    </div></div>`;
  return b;
}

function saveMonth() {
  const b = showResult(true);
  if (!b) { toast(esc(readBill(false).error || t("calc.check")), "bad"); return; }
  const key = draft.month;
  const doSave = () => {
    S.records = S.records.filter(r => r.month !== key);
    S.records.push({
      month: key, region: S.home.region, category: S.home.category, persons: b.F.p,
      start: b.start, end: b.end, kwh: b.consumption, gross: b.gross, discount: b.discount, charge: b.charge,
      debt_before: b.debt, paid: b.paid, debt_after: b.debtAfter, norm: b.F.norm, expected: Math.round(b.F.tech), status: b.status,
    });
    save();
    toast(t("calc.saved", { m: monthLabel(key) }), "good");
    if (b.status === "bad") {
      toast(t("calc.badToast", { v: kwh(b.waste) }), "bad");
      notify(t("notif.badT"), t("notif.badB", { v: kwh(b.consumption), n: kwh(b.F.norm) }));
    } else if (b.status === "warn") {
      notify(t("notif.warnT"), t("notif.warnB", { v: kwh(b.overNorm) }));
    }
    draft = null;
    go("dash");
  };
  if (S.records.some(r => r.month === key)) confirmBox(t("calc.replaceQ", { m: monthLabel(key) }), doSave, t("common.replace"));
  else doSave();
}

/* ================================================================ МОЙ ДОМ */
function viewHome(el) {
  const h = S.home;
  el.innerHTML = `
    <div class="grid g2" style="align-items:start">
      <div class="card">
        <h3>👨‍👩‍👧 ${t("home.family")}</h3>
        <div class="form">
          <div class="field"><label>${t("home.region")}</label>
            <select class="input" id="h-region">${Object.keys(REGIONS).map(r => `<option value="${esc(r)}" ${r === h.region ? "selected" : ""}>${esc(regionName(r))}</option>`).join("")}</select>
            <span class="help" id="h-reg-hint"></span></div>
          <div class="field"><label>${t("home.persons")}</label>${stepper("persons", h.persons, 1, 20)}
            <span class="help">${t("home.personsHelp")}</span></div>
          <label class="switch"><input type="checkbox" id="h-stove" ${h.stove ? "checked" : ""}><span class="track"></span><span>${t("home.stove")} <span class="muted">${t("home.stoveHint")}</span></span></label>
          <div class="field"><label>${t("home.social")}</label>
            <select class="input" id="h-cat">${Object.keys(S.categories).map(c => `<option value="${esc(c)}" ${c === h.category ? "selected" : ""}>${esc(catName(c))}</option>`).join("")}</select></div>
        </div>
      </div>
      <div class="card glow" id="home-summary"></div>
    </div>
    <div class="card mt">
      <h3>💡 ${t("home.rooms")}</h3>
      <div class="grid g4">
        <div class="field"><label>${t("home.roomsN")}</label>${stepper("rooms", h.rooms, 1, 20)}</div>
        <div class="field"><label>${t("home.lamps")}</label>${stepper("lampsPerRoom", h.lampsPerRoom, 1, 12)}</div>
        <div class="field"><label>${t("home.hours")}</label>${stepper("lampHours", h.lampHours, 1, 24)}</div>
        <div class="field"><label>${t("home.lampType")}</label><select class="input" id="h-lamp">${Object.keys(LAMP_TYPES).map(k => `<option value="${k}" ${k === h.lampType ? "selected" : ""}>${lampName(k)}</option>`).join("")}</select></div>
      </div>
    </div>
    <div class="card mt">
      <h3>🔌 ${t("home.appl")}</h3>
      <p class="sub">${t("home.applSub")}</p>
      <div class="appl-grid">${APPLIANCES.map(a => `<div class="appl ${h.appliances[a.id] ? "on" : ""}" id="ap-${a.id}">
        <span class="em">${a.icon}</span><div class="t"><b>${esc(applName(a))}</b><small>${t("home.perMonth", { v: nf1.format(a.kwh) })}</small></div>
        ${stepper("ap:" + a.id, h.appliances[a.id] || 0, 0, 20)}</div>`).join("")}</div>
    </div>`;
  const refresh = () => { save(); homeSummary(); renderChrome(); };
  bindSteppers(el, (id, v) => {
    if (id.startsWith("ap:")) { const k = id.slice(3); h.appliances[k] = v; $("#ap-" + k).classList.toggle("on", v > 0); }
    else h[id] = v;
    refresh();
  });
  $("#h-region").onchange = e => { h.region = e.target.value; refresh(); };
  $("#h-stove").onchange = e => { h.stove = e.target.checked; refresh(); };
  $("#h-cat").onchange = e => { h.category = e.target.value; refresh(); };
  $("#h-lamp").onchange = e => { h.lampType = e.target.value; refresh(); };
  homeSummary();
}

function homeSummary() {
  const F = familyLimits();
  const exp = expectedUsage();
  const reg = F.reg;
  const stKey = S.tariffs[S.home.region] ? "user" : reg.status;
  $("#h-reg-hint").innerHTML = `<span class="pill ${stKey}">${t("status." + stKey)}</span> ${prices(reg, S.home.stove).map((p, i) => t("home.tierPrices", { n: i + 1, p: nf2.format(p) })).join(" · ")}`;
  const over = exp.total > F.norm;
  const max = Math.max(...exp.items.map(x => x.kwh), 1);
  const overText = `${t("home.overP", { v: kwh(exp.total - F.norm) })} ${S.settings.mode === "project" ? t("home.overProject", { v: kwh(F.L1) }) : t("home.overReal")}`;
  $("#home-summary").innerHTML = `
    <h3>📋 ${t("home.summary")}</h3>
    <div class="grid g2">
      <div class="stat"><span class="label">${t("home.normFamily")}</span><span class="value amber">${kwh(F.norm)}</span><span class="hint">${t("home.normHint", { p: F.p, n: F.n1, n2: kwh(F.norm2) })}</span></div>
      <div class="stat"><span class="label">${t("home.techUses")}</span><span class="value ${over ? "red" : "green"}">${kwh(exp.total)}</span><span class="hint">${t("home.techHint")}</span></div>
    </div>
    <div class="banner ${over ? "warn" : "good"} mt-s"><div class="b-ico">${over ? "⚠️" : "✅"}</div><div><b>${over ? t("home.overT") : t("home.okT")}</b>
      <p>${over ? overText : t("home.okP")}</p></div></div>
    <div class="mt">${exp.items.slice(0, 7).map(x => `<div style="display:flex;align-items:center;gap:10px;margin:8px 0;font-size:13px">
      <span style="width:22px">${x.icon}</span><span style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(x.name)}${x.count > 1 && x.id !== "light" && x.id !== "other" ? " ×" + x.count : ""}</span>
      <div class="progress" style="width:38%"><i style="width:${x.kwh / max * 100}%;background:var(--grad-energy)"></i></div><b style="width:78px;text-align:right">${nf0.format(x.kwh)}</b></div>`).join("")}</div>`;
}

/* ================================================================ ИСТОРИЯ */
let range = "all";
function viewStats(el) {
  const recs = range === "all" ? S.records : S.records.slice(-+range);
  const st = statsOf(recs);
  const F = familyLimits();
  const debtHint = !st ? "" : st.debt > 0 ? t("stats.debt", { v: tg0(st.debt) }) : st.debt < 0 ? t("stats.over", { v: tg0(-st.debt) }) : t("stats.noDebt");
  el.innerHTML = `
    <div class="btns" style="justify-content:space-between;margin-bottom:18px">
      <div class="seg" id="range">${[["3", "stats.m3"], ["6", "stats.m6"], ["12", "stats.m12"], ["all", "stats.all"]].map(([k, key]) => `<button data-r="${k}" class="${range === k ? "on" : ""}">${t(key)}</button>`).join("")}</div>
      <div class="btns"><button class="btn ghost small" id="csv">${t("stats.csv")}</button><button class="btn ghost small" id="demo">${t("stats.demo")}</button>
        ${S.records.length ? `<button class="btn danger small" id="clear">${I.trash} ${t("stats.clear")}</button>` : ""}</div>
    </div>
    ${!st ? `<div class="card"><div class="empty"><span class="em">📊</span>${t("stats.empty")}</div></div>` : `
    <div class="grid g4">
      <div class="card stat"><span class="ico">📊</span><span class="label">${t("stats.avg")}</span><span class="value cyan">${kwh(st.avg)}</span><span class="hint">${t("stats.perDay", { v: nf1.format(st.perDay) })}</span></div>
      <div class="card stat"><span class="ico">⚡</span><span class="label">${t("stats.total")}</span><span class="value amber">${kwh(st.total)}</span><span class="hint">${t("stats.maxmin", { a: monthShort(st.max.month), b: nf0.format(st.max.kwh), c: monthShort(st.min.month), d: nf0.format(st.min.kwh) })}</span></div>
      <div class="card stat"><span class="ico">💳</span><span class="label">${t("stats.charged")}</span><span class="value">${tg0(st.charged)}</span><span class="hint">${t("stats.paidHint", { p: tg0(st.paid), d: debtHint })}</span></div>
      <div class="card stat"><span class="ico">🌍</span><span class="label">${t("stats.co2")}</span><span class="value grad-eco">${t("stats.co2v", { v: nf0.format(st.co2) })}</span><span class="hint">${t("stats.trees", { v: nf1.format(st.co2 / CO2_PER_TREE_YEAR) })}</span></div>
    </div>
    <div class="card mt"><h3>📈 ${t("stats.chart")}</h3>${chartSVG(recs, F.norm, 300)}
      <div class="legend"><span><i style="background:#34d399"></i>${t("lg.good")}</span><span><i style="background:#ffb02e"></i>${t("lg.warn")}</span><span><i style="background:#ff5d6c"></i>${t("lg.bad")}</span><span><i style="background:#ffc83d"></i>${t("lg.norm")}</span><span><i style="background:#3dd6f5"></i>${t("lg.avg")}</span></div></div>
    <div class="card mt"><h3>🗂️ ${t("stats.table")}</h3><div class="table-wrap"><table>
      <tr><th>${t("th.month")}</th><th class="num">${t("th.start")}</th><th class="num">${t("th.end")}</th><th class="num">${t("th.kwh")}</th><th class="num">${t("th.norm")}</th><th class="num">${t("th.gross")}</th><th class="num">${t("th.disc")}</th><th class="num">${t("th.charge")}</th><th class="num">${t("th.paid")}</th><th class="num">${t("th.debt")}</th><th></th></tr>
      ${recs.slice().reverse().map(r => `<tr><td><b>${monthLabel(r.month)}</b></td><td class="num">${nf2.format(r.start)}</td><td class="num">${nf2.format(r.end)}</td>
        <td class="num" style="color:${r.status === "bad" ? "var(--red)" : r.status === "warn" ? "var(--amber)" : "var(--green)"}">${nf1.format(r.kwh)}</td><td class="num">${r.norm ? nf0.format(r.norm) : "—"}</td>
        <td class="num">${nf2.format(r.gross)}</td><td class="num">${nf2.format(r.discount)}</td><td class="num">${nf2.format(r.charge)}</td><td class="num">${nf2.format(r.paid)}</td>
        <td class="num ${r.debt_after > 0 ? "red" : ""}">${nf2.format(r.debt_after)}</td><td><button class="btn ghost small" data-del="${r.month}" title="${t("common.delete")}">${I.trash}</button></td></tr>`).join("")}
    </table></div></div>`}`;
  $$("#range button").forEach(b => b.onclick = () => { range = b.dataset.r; render(); });
  $("#csv").onclick = exportCSV;
  $("#demo").onclick = loadDemo;
  if ($("#clear")) $("#clear").onclick = () => confirmBox(t("stats.clearQ"), () => { S.records = []; save(); render(); }, t("stats.clearYes"), true);
  $$("[data-del]").forEach(b => b.onclick = () => confirmBox(t("stats.delQ", { m: monthLabel(b.dataset.del) }), () => { S.records = S.records.filter(r => r.month !== b.dataset.del); save(); render(); }, t("common.delete"), true));
}

function chartSVG(recs, norm, height = 280) {
  if (!recs.length) return `<div class="empty">${t("common.noData")}</div>`;
  const W = 760, H = height, pl = 46, pr = 14, pt = 24, pb = 34;
  const pw = W - pl - pr, ph = H - pt - pb;
  const avg = recs.reduce((s, r) => s + r.kwh, 0) / recs.length;
  const vmax = Math.max(...recs.map(r => r.kwh), norm || 0, avg) * 1.18 || 1;
  const slot = pw / recs.length, bw = Math.min(56, slot * 0.6);
  const col = { good: "#34d399", warn: "#ffb02e", bad: "#ff5d6c" };
  let g = "";
  for (let i = 0; i <= 4; i++) {
    const y = pt + ph * i / 4;
    g += `<line x1="${pl}" x2="${W - pr}" y1="${y}" y2="${y}" stroke="rgba(140,160,255,.12)"/><text x="${pl - 8}" y="${y + 4}" text-anchor="end">${nf0.format(vmax * (1 - i / 4))}</text>`;
  }
  recs.forEach((r, i) => {
    const x = pl + slot * i + (slot - bw) / 2, h = ph * r.kwh / vmax, y = pt + ph - h;
    const s = r.status || (r.kwh > (r.norm || norm) ? "bad" : "good");
    g += `<rect x="${x}" y="${y}" width="${bw}" height="${h}" rx="8" fill="url(#bar-${s})"/>
      <rect x="${x}" y="${y}" width="${bw}" height="4" rx="2" fill="${col[s]}"/>
      <text x="${x + bw / 2}" y="${y - 7}" text-anchor="middle" style="fill:#e6eaff;font-weight:700">${nf0.format(r.kwh)}</text>
      <text x="${x + bw / 2}" y="${H - 12}" text-anchor="middle">${monthShort(r.month)}</text>`;
  });
  const ln = (v, c, label, dash) => { const y = pt + ph * (1 - v / vmax); return `<line x1="${pl}" x2="${W - pr}" y1="${y}" y2="${y}" stroke="${c}" stroke-width="2" ${dash ? 'stroke-dasharray="7 5"' : ""}/><text x="${W - pr}" y="${y - 6}" text-anchor="end" style="fill:${c};font-weight:700">${label}</text>`; };
  if (norm) g += ln(norm, "#ffc83d", t("chart.norm", { v: nf0.format(norm) }), false);
  g += ln(avg, "#3dd6f5", t("chart.avg", { v: nf0.format(avg) }), true);
  const defs = Object.entries(col).map(([k, c]) => `<linearGradient id="bar-${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c}" stop-opacity=".9"/><stop offset="1" stop-color="${c}" stop-opacity=".25"/></linearGradient>`).join("");
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" style="height:${height}px"><defs>${defs}</defs>${g}</svg>`;
}

function exportCSV() {
  if (!S.records.length) { toast(t("csv.empty")); return; }
  const cell = v => String(v).replace(/\./g, ",").replace(/;/g, ",");
  const lines = [t("csv.head").join(";")].concat(S.records.map(r => [monthLabel(r.month), regionName(r.region), r.persons || "", r.start, r.end, r.kwh, r.norm || "", r.gross, r.discount, r.charge, r.paid, r.debt_after, Math.round(r.kwh * CO2_PER_KWH)].map(cell).join(";")));
  download("ecoquat_history.csv", "﻿" + lines.join("\r\n"), "text/csv");
}
function download(name, text, type) {
  if (window.pywebview && window.pywebview.api && window.pywebview.api.save_file) {
    window.pywebview.api.save_file(name, text).then(p => p && toast(t("csv.saved", { p: esc(p) }), "good"));
    return;
  }
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function loadDemo() {
  const run = () => {
    const usage = [268, 241, 212, 187, 224, 259];
    let key = currentMonthKey();
    for (let i = 0; i < 6; i++) { let y = +key.slice(0, 4), m = +key.slice(5) - 1; if (m < 1) { m = 12; y--; } key = `${y}-${String(m).padStart(2, "0")}`; }
    let reading = 12840, debt = 0; S.records = [];
    usage.forEach((u, i) => {
      key = nextMonth(key);
      const b = calcBill({ start: reading, end: reading + u, debt, paid: 0 });
      const paid = money(b.charge * (i === 3 ? 0.5 : 1) + (i === 4 ? debt : 0));
      const b2 = calcBill({ start: reading, end: reading + u, debt, paid });
      S.records.push({ month: key, region: S.home.region, category: S.home.category, persons: b2.F.p, start: b2.start, end: b2.end, kwh: b2.consumption,
        gross: b2.gross, discount: b2.discount, charge: b2.charge, debt_before: b2.debt, paid: b2.paid, debt_after: b2.debtAfter, norm: b2.F.norm, expected: Math.round(b2.F.tech), status: b2.status });
      reading += u; debt = b2.debtAfter;
    });
    save(); toast(t("demo.ok"), "good"); render();
  };
  if (S.records.length) confirmBox(t("demo.q"), run, t("common.replace"), true); else run();
}

/* ================================================================ ЭКОЛОГИЯ */
function viewEco(el) {
  const last = S.records[S.records.length - 1];
  const F = familyLimits();
  const per = last ? last.kwh / (last.persons || F.p) : expectedUsage().total / F.p;
  const cls = ecoClass(per);
  const st = statsOf(S.records);
  const yearCO2 = (st ? st.avg : expectedUsage().total) * 12 * CO2_PER_KWH;
  const goal = last ? Math.round(last.kwh * (1 - S.settings.goalPct / 100)) : Math.round(F.norm);
  const tips = GENERAL_TIPS[lang()];
  const tipOfDay = tips[new Date().getDate() % tips.length];
  const p1 = prices(F.reg, S.home.stove)[0];
  const devW = [60, 9, 2000, 2000, 1500, 900, 100, 450, 60, 1500, 1600, 2000];
  el.innerHTML = `
    <div class="grid g3">
      <div class="card eco span2">
        <h3>🏷️ ${t("eco.class")} <span class="kz">${last ? t("eco.by", { m: monthLabel(last.month) }) : t("eco.byTech")}</span></h3>
        <div class="eco-scale">${ECO_CLASSES.map(c => `<div class="${c.cls === cls.cls ? "cur" : ""}" style="background:${c.color}">${c.cls}</div>`).join("")}</div>
        <p class="mt" style="margin-bottom:0"><b style="color:${cls.color};font-size:18px">${t("eco.perPerson", { v: nf0.format(per) })}</b> <span class="muted">${ecoText(cls)}</span></p>
      </div>
      <div class="card stat"><span class="ico">🌳</span><span class="label">${t("eco.yearCo2")}</span><span class="value grad-eco">${nf0.format(yearCO2)} ${t("unit.kg")}</span>
        <span class="hint">${t("eco.yearHint", { n: nf0.format(yearCO2 / CO2_PER_TREE_YEAR), f: String(CO2_PER_KWH).replace(".", ",") })}</span></div>
    </div>
    <div class="grid g2 mt" style="align-items:start">
      <div class="card eco"><h3>🎯 ${t("eco.goal")}</h3>
        <p class="sub">${t("eco.goalText", { p: S.settings.goalPct, v: kwh(goal), was: last ? t("eco.was", { v: kwh(last.kwh) }) : "" })}</p>
        <div class="seg" id="goal">${[5, 10, 15, 20].map(p => `<button data-g="${p}" class="${S.settings.goalPct === p ? "on" : ""}">−${p}%</button>`).join("")}</div>
        ${last ? `<p class="note mt-s">${t("eco.goalSave", { m: tg0((last.kwh - goal) * p1), c: nf0.format((last.kwh - goal) * CO2_PER_KWH) })}</p>` : ""}
        <div class="banner info mt"><div class="b-ico">💡</div><div><b>${t("eco.tipDay")}</b><p>${esc(tipOfDay)}</p></div></div>
      </div>
      <div class="card"><h3>🧮 ${t("eco.calc")}</h3>
        <div class="form">
          <div class="field"><label>${t("eco.device")}</label><select class="input" id="c-dev"><option value="">${t("eco.own")}</option>
            ${t("dev").map((n, i) => `<option value="${devW[i]}">${n} (${devW[i]} ${t("unit.w")})</option>`).join("")}</select></div>
          <div class="row"><div class="field"><label>${t("f.power")}</label><div class="unit"><input class="input" id="c-w" inputmode="decimal" value="60"><span>${t("unit.w")}</span></div></div>
            <div class="field"><label>${t("f.hours")}</label><div class="unit"><input class="input" id="c-h" inputmode="decimal" value="5"><span>${t("unit.h")}</span></div></div></div>
          <div id="c-out"></div>
        </div></div>
    </div>
    <div class="card eco mt"><h3>🌿 ${t("eco.tips")}</h3><div class="tips">${tipsHTML(personalTips(last ? { status: last.status, waste: recWaste(last) } : null))}</div></div>
    <div class="card mt"><h3>🏆 ${t("eco.ach")}</h3><div class="badges">${achievements().map(a => `<div class="badge ${a.got ? "got" : ""}"><div class="em">${a.em}</div><b>${a.name}</b><small>${a.d}</small></div>`).join("")}</div></div>`;
  $$("#goal button").forEach(b => b.onclick = () => { S.settings.goalPct = +b.dataset.g; save(); render(); });
  const calc = () => {
    const out = $("#c-out");
    try {
      const w = parseNum($("#c-w").value, "f.power"), h = parseNum($("#c-h").value, "f.hours");
      if (h > 24) throw new Error(t("eco.24"));
      const k = w * h * 30 / 1000;
      out.innerHTML = `<div class="grid g3"><div class="stat"><span class="label">${t("eco.month")}</span><span class="value amber" style="font-size:20px">${kwh(k)}</span></div>
        <div class="stat"><span class="label">${t("eco.cost")}</span><span class="value" style="font-size:20px">${tg0(k * p1)}</span></div>
        <div class="stat"><span class="label">${t("eco.co2")}</span><span class="value grad-eco" style="font-size:20px">${nf1.format(k * CO2_PER_KWH)} ${t("unit.kg")}</span></div></div>`;
    } catch (e) { out.innerHTML = `<p class="red note">${esc(e.message)}</p>`; }
  };
  $("#c-dev").onchange = e => { if (e.target.value) $("#c-w").value = e.target.value; calc(); };
  $("#c-w").oninput = calc; $("#c-h").oninput = calc;
  calc();
}

/* ================================================================ ТАРИФЫ */
function viewTariffs(el) {
  el.innerHTML = `
    <div class="banner info" style="margin-bottom:18px"><div class="b-ico">ℹ️</div><div><b>${t("tar.info.t")}</b><p>${t("tar.info.p")}</p></div></div>
    <div class="card"><div class="table-wrap"><table>
      <tr><th>${t("tar.region")}</th><th>${t("tar.supplier")}</th><th class="num">${t("tar.l1")}</th><th class="num">${t("tar.l2")}</th><th class="num">${t("tar.l3")}</th><th class="num">${t("tar.norm")}</th><th>${t("tar.date")}</th><th>${t("tar.status")}</th><th></th></tr>
      ${Object.keys(REGIONS).map(name => { const r = region(name); const stKey = S.tariffs[name] ? "user" : r.status;
        return `<tr class="${name === S.home.region ? "sel" : ""}"><td><b>${esc(regionName(name))}</b></td><td class="muted">${esc(supplierName(r))}</td>
        ${r.tiers.map(p => `<td class="num">${nf2.format(p)}</td>`).join("")}<td class="num">${r.n1} / ${r.n2}<br><small class="muted">${t("tar.stove", { a: r.s1 ?? r.n1, b: r.s2 ?? r.n2 })}</small></td>
        <td>${esc(r.date)}</td><td><span class="pill ${stKey}">${t("status." + stKey)}</span></td>
        <td><button class="btn ghost small" data-info="${esc(name)}">${t("tar.more")}</button></td></tr>`; }).join("")}
    </table></div></div>
    <div class="card mt"><h3>🤝 ${t("tar.social")}</h3>
      <p class="sub">${t("tar.socialSub")}</p>
      <div class="table-wrap"><table><tr><th>${t("tar.cat")}</th><th class="num">${t("tar.pct")}</th><th class="num">${t("tar.catNorm")}</th><th></th></tr>
        ${Object.entries(S.categories).map(([n, c]) => `<tr><td>${esc(catName(n))}</td><td class="num">${nf0.format(c.percent)}</td><td class="num">${nf0.format(c.norm)}</td>
        <td>${n !== "Без льготы" ? `<button class="btn ghost small" data-cat="${esc(n)}">${t("tar.edit")}</button> <button class="btn danger small" data-catdel="${esc(n)}" title="${t("common.delete")}">${I.trash}</button>` : ""}</td></tr>`).join("")}
      </table></div><button class="btn ghost mt-s" id="cat-add">${I.plus} ${t("tar.addCat")}</button></div>`;
  $$("[data-info]").forEach(b => b.onclick = () => tariffModal(b.dataset.info));
  $$("[data-cat]").forEach(b => b.onclick = () => catModal(b.dataset.cat));
  $$("[data-catdel]").forEach(b => b.onclick = () => confirmBox(t("tar.delCatQ", { c: esc(catName(b.dataset.catdel)) }), () => {
    delete S.categories[b.dataset.catdel]; if (S.home.category === b.dataset.catdel) S.home.category = "Без льготы"; save(); render(); }, t("common.delete"), true));
  $("#cat-add").onclick = () => catModal(null);
}

function tariffModal(name) {
  const r = region(name);
  const note = S.tariffs[name] ? t("tar.userNote") : noteText(r);
  modal(`<h3>${esc(regionName(name))}</h3>
    <p class="note">${t("tar.since", { s: esc(supplierName(r)), d: esc(r.date) })}<br>${esc(note)}<br><a href="${r.src}" target="_blank" rel="noopener">${t("tar.src")}</a></p>
    <div class="form mt">
      <div class="row"><div class="field"><label>${t("tar.f1")}</label><input class="input" id="t1" value="${r.tiers[0]}"></div><div class="field"><label>${t("tar.f2")}</label><input class="input" id="t2" value="${r.tiers[1]}"></div></div>
      <div class="row"><div class="field"><label>${t("tar.f3")}</label><input class="input" id="t3" value="${r.tiers[2]}"></div><div class="field"><label>${t("tar.fn1")}</label><input class="input" id="n1" value="${r.n1}"></div></div>
      <div class="row"><div class="field"><label>${t("tar.fn2")}</label><input class="input" id="n2" value="${r.n2}"></div><div class="field"><label>${t("tar.fs")}</label><input class="input" id="sn" value="${r.s1 ?? r.n1} / ${r.s2 ?? r.n2}"></div></div>
      <p class="red note" id="t-err"></p>
      <div class="btns"><button class="btn primary" id="t-save">${I.save} ${t("tar.saveMine")}</button>
        ${S.tariffs[name] ? `<button class="btn ghost" id="t-reset">${t("tar.reset")}</button>` : ""}<button class="btn ghost" id="t-close">${t("common.close")}</button></div>
    </div>`, m => {
    $("#t-close", m).onclick = closeModal;
    if ($("#t-reset", m)) $("#t-reset", m).onclick = () => { delete S.tariffs[name]; save(); closeModal(); render(); };
    $("#t-save", m).onclick = () => {
      try {
        const tr = ["t1", "t2", "t3"].map((id, i) => parseNum($("#" + id, m).value, ["f.tier", { n: i + 1 }]));
        if (tr.some(x => x <= 0 || x > 500)) throw new Error(t("tar.errPrice"));
        const n1 = parseNum($("#n1", m).value, "f.norm"), n2 = parseNum($("#n2", m).value, "f.n2");
        if (n1 <= 0 || n2 <= n1) throw new Error(t("tar.errN"));
        const sp = $("#sn", m).value.split("/").map(x => parseNum(x, "f.stoveNorm"));
        if (sp.length !== 2 || sp[1] <= sp[0]) throw new Error(t("tar.errS"));
        S.tariffs[name] = { tiers: tr, stove: null, n1, n2, s1: sp[0], s2: sp[1], status: "user", date: new Date().toLocaleDateString("ru-RU") };
        save(); closeModal(); toast(t("tar.saved"), "good"); render();
      } catch (e) { $("#t-err", m).textContent = e.message; }
    };
  });
}

function catModal(name) {
  const c = name ? S.categories[name] : { percent: 10, norm: 70 };
  modal(`<h3>${name ? t("cat.title", { c: esc(catName(name)) }) : t("cat.new")}</h3><div class="form">
    ${name ? "" : `<div class="field"><label>${t("cat.name")}</label><input class="input" id="c-n" placeholder="${t("cat.namePh")}"></div>`}
    <div class="row"><div class="field"><label>${t("tar.pct")}</label><input class="input" id="c-p" value="${c.percent}"></div><div class="field"><label>${t("tar.catNorm")}</label><input class="input" id="c-norm" value="${c.norm}"></div></div>
    <p class="red note" id="c-err"></p><div class="btns"><button class="btn primary" id="c-ok">${t("common.save")}</button><button class="btn ghost" id="c-x">${t("common.cancel")}</button></div></div>`, m => {
    $("#c-x", m).onclick = closeModal;
    $("#c-ok", m).onclick = () => {
      try {
        const n = name || ($("#c-n", m).value || "").trim();
        if (n.length < 2) throw new Error(t("cat.errName"));
        if (!name && S.categories[n]) throw new Error(t("cat.errExists"));
        const p = parseNum($("#c-p", m).value, "f.discount"), no = parseNum($("#c-norm", m).value, "f.norm");
        if (p > 100) throw new Error(t("cat.errPct"));
        S.categories[n] = { percent: p, norm: no }; save(); closeModal(); render();
      } catch (e) { $("#c-err", m).textContent = e.message; }
    };
  });
}

/* ================================================================ НАСТРОЙКИ */
function settingsModal() {
  modal(`<h3>⚙️ ${t("set.title")}</h3>
    <div class="form">
      <div class="field"><label>${t("set.lang")}</label>${langSwitch("set-lang")}</div>
      <div class="field"><label>${t("set.mode")}</label>
        <div class="seg" id="mode"><button data-m="project" class="${S.settings.mode === "project" ? "on" : ""}">${t("set.modeProject")}</button><button data-m="real" class="${S.settings.mode === "real" ? "on" : ""}">${t("set.modeReal")}</button></div>
        <span class="help">${t("set.modeHelp")}</span></div>
      <div class="field"><label>${t("set.notif")}</label><button class="btn ghost" id="s-notif">🔔 ${t("set.notifBtn")}</button></div>
      <div class="field"><label>${t("set.data")}</label><div class="btns">
        <button class="btn ghost small" id="s-export">${t("set.backup")}</button>
        <label class="btn ghost small" style="cursor:pointer">${t("set.import")}<input type="file" accept=".json,application/json" id="s-import" hidden></label>
        <button class="btn ghost small" id="s-onb">${t("set.onb")}</button>
        <button class="btn danger small" id="s-reset">${t("set.reset")}</button></div>
        <span class="help">${t("set.importHelp")}</span></div>
      <p class="note">${t("set.about")}</p>
      <button class="btn primary" id="s-close">${t("set.done")}</button>
    </div>`, m => {
    bindLang(m, settingsModal);
    $$("#mode button", m).forEach(b => b.onclick = () => { S.settings.mode = b.dataset.m; save(); $$("#mode button", m).forEach(x => x.classList.toggle("on", x === b)); render(); });
    $("#s-close", m).onclick = closeModal;
    $("#s-notif", m).onclick = async () => {
      if (!("Notification" in window)) { toast(t("set.notifNo")); return; }
      const p = await Notification.requestPermission();
      toast(p === "granted" ? t("set.notifOn") : t("set.notifOff"), p === "granted" ? "good" : "");
      if (p === "granted") notify("EcoҚуат", t("notif.on"));
    };
    $("#s-export", m).onclick = () => download("ecoquat_backup.json", JSON.stringify(S, null, 2), "application/json");
    $("#s-import", m).onchange = e => { const f = e.target.files[0]; if (f) f.text().then(importJSON); };
    $("#s-onb", m).onclick = () => { closeModal(); onboarding(); };
    $("#s-reset", m).onclick = () => confirmBox(t("set.resetQ"), () => {
      const keep = lang(); localStorage.removeItem(STORE_KEY); S = defaultState(); S.settings.lang = keep; draft = null; render(); onboarding();
    }, t("set.resetYes"), true);
  });
}

function importJSON(text) {
  try {
    const d = JSON.parse(text);
    if (d.version && d.home) {           // резервная копия EcoҚуат
      const keep = lang();
      S = Object.assign(defaultState(), d);
      S.settings = Object.assign(defaultState().settings, d.settings || {});
      if (!d.settings || !d.settings.lang) S.settings.lang = keep;
    } else if (d.records || d.profile) {  // старая программа electric_kz.py
      const p = d.profile || {};
      if (p.region && REGIONS[p.region]) S.home.region = p.region;
      if (p.persons) S.home.persons = Math.max(1, +p.persons);
      if (d.categories) Object.assign(S.categories, d.categories);
      if (p.category && S.categories[p.category]) S.home.category = p.category;
      const F = familyLimits();
      S.records = (d.records || []).map(r => {
        const norm = F.n1 * (r.persons || F.p);
        const status = r.kwh <= norm ? "good" : r.kwh <= Math.max(norm, F.tech) ? "warn" : "bad";
        return Object.assign({ persons: F.p, norm, expected: Math.round(F.tech), status }, r);
      });
      S.onboarded = true;
    } else throw new Error(t("imp.format"));
    save(); closeModal(); toast(t("imp.ok", { n: S.records.length }), "good"); render();
  } catch (e) { toast(t("imp.err", { e: esc(e.message) }), "bad"); }
}

/* ================================================================ ЗНАКОМСТВО */
function onboarding() {
  let step = 0;
  const h = S.home;
  const ov = $("#overlay");
  const draw = () => {
    const steps = `<div class="onb-steps">${[0, 1, 2, 3].map(i => `<i class="${i <= step ? "on" : ""}"></i>`).join("")}</div>`;
    let body = "";
    if (step === 0) body = `<div style="display:flex;justify-content:flex-end">${langSwitch("onb-lang")}</div>
      <div class="onb-hero"><img src="icons/icon-512.png" alt=""><h2>${t("onb.hello")}</h2>
      <p class="lead">${t("onb.lead")}</p>
      <div class="feature-list"><div>${t("onb.f1")}</div><div>${t("onb.f2")}</div><div>${t("onb.f3")}</div><div>${t("onb.f4")}</div></div>
      <p class="note">${t("onb.q")}</p></div>`;
    if (step === 1) body = `<h2>${t("onb.s1")}</h2><p class="lead">${t("onb.s1p")}</p>
      <div class="form"><div class="field"><label>${t("home.region")}</label><select class="input" id="o-reg">${Object.keys(REGIONS).map(r => `<option value="${esc(r)}" ${r === h.region ? "selected" : ""}>${esc(regionName(r))}</option>`).join("")}</select></div>
      <div class="field"><label>${t("onb.persons")}</label>${stepper("persons", h.persons, 1, 20)}</div>
      <label class="switch"><input type="checkbox" id="o-stove" ${h.stove ? "checked" : ""}><span class="track"></span><span>${t("onb.stove")}</span></label>
      <div class="banner info" id="o-norm"></div></div>`;
    if (step === 2) body = `<h2>${t("onb.s2")}</h2><p class="lead">${t("onb.s2p")}</p>
      <div class="form"><div class="row"><div class="field"><label>${t("home.roomsN")}</label>${stepper("rooms", h.rooms, 1, 20)}</div><div class="field"><label>${t("home.lamps")}</label>${stepper("lampsPerRoom", h.lampsPerRoom, 1, 12)}</div></div>
      <div class="field"><label>${t("onb.lampQ")}</label><div class="seg" id="o-lamp">${Object.keys(LAMP_TYPES).map(k => `<button data-l="${k}" class="${h.lampType === k ? "on" : ""}">${lampName(k)}</button>`).join("")}</div></div></div>`;
    if (step === 3) body = `<h2>${t("onb.s3")}</h2><p class="lead">${t("onb.s3p")}</p>
      <div class="appl-grid">${APPLIANCES.map(a => `<div class="appl ${h.appliances[a.id] ? "on" : ""}" id="oa-${a.id}"><span class="em">${a.icon}</span><div class="t"><b>${esc(applName(a))}</b><small>${t("home.perMonth", { v: nf1.format(a.kwh) })}</small></div>${stepper("ap:" + a.id, h.appliances[a.id] || 0, 0, 20)}</div>`).join("")}</div>
      <div class="banner info mt" id="o-sum"></div>`;
    ov.innerHTML = `<div class="onb"><div class="onb-box fade-in">${steps}${body}
      <div class="onb-foot">${step > 0 ? `<button class="btn ghost" id="o-back">${t("onb.back")}</button>` : `<span></span>`}
      <button class="btn primary" id="o-next">${step === 3 ? t("onb.done") : step === 0 ? t("onb.start") : t("onb.next")}</button></div></div></div>`;
    const box = $(".onb-box", ov);
    const info = () => {
      const F = familyLimits();
      if ($("#o-norm")) $("#o-norm").innerHTML = `<div class="b-ico">📐</div><div><b>${t("onb.normT", { v: kwh(F.norm) })}</b><p>${t("onb.normP", { p: F.p, n: F.n1, t: tg(prices(F.reg, h.stove)[0]) })}</p></div>`;
      if ($("#o-sum")) {
        const e = expectedUsage().total;
        $("#o-sum").innerHTML = `<div class="b-ico">🔌</div><div><b>${t("onb.sumT", { v: kwh(e) })}</b><p>${e > F.norm ? t("onb.sumOver", { n: kwh(F.norm), v: kwh(e) }) : t("onb.sumOk", { n: kwh(F.norm) })}</p></div>`;
      }
    };
    bindLang(box, draw);
    bindSteppers(box, (id, v) => { if (id.startsWith("ap:")) { h.appliances[id.slice(3)] = v; $("#oa-" + id.slice(3)).classList.toggle("on", v > 0); } else h[id] = v; info(); });
    if ($("#o-reg")) $("#o-reg").onchange = e => { h.region = e.target.value; info(); };
    if ($("#o-stove")) $("#o-stove").onchange = e => { h.stove = e.target.checked; info(); };
    $$("#o-lamp button").forEach(b => b.onclick = () => { h.lampType = b.dataset.l; $$("#o-lamp button").forEach(x => x.classList.toggle("on", x === b)); });
    info();
    if ($("#o-back")) $("#o-back").onclick = () => { step--; draw(); };
    $("#o-next").onclick = () => {
      if (step < 3) { step++; draw(); return; }
      S.onboarded = true; save(); ov.innerHTML = ""; render(); toast(t("onb.finish"), "good");
    };
  };
  draw();
}

/* ================================================================ СТАРТ */
function init() {
  document.documentElement.lang = lang() === "kz" ? "kk" : "ru";
  document.title = t("app.title");
  $("#btn-settings").innerHTML = I.gear;
  $("#btn-tariffs-top").innerHTML = I.tariff;
  $("#btn-settings").onclick = settingsModal;
  $("#btn-tariffs-top").onclick = () => go("tariffs");
  const h = location.hash.slice(1);
  if (NAV.some(n => n.id === h)) view = h;
  render();
  if (!S.onboarded) onboarding();
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}
document.addEventListener("DOMContentLoaded", init);
