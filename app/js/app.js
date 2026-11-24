/* =====================================================================
   EcoҚуат — логика и интерфейс
   ===================================================================== */
"use strict";

const STORE_KEY = "ecoquat.v1";
const MONTHS = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const MONTHS_SHORT = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];

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
  { id: "dash", title: "Главная", kz: "Басты бет", icon: "home", sub: "Обзор расхода, нормы и экологии вашего дома" },
  { id: "calc", title: "Расчёт", kz: "Есептеу", icon: "bolt", sub: "Введите показания счётчика — программа посчитает сумму по тарифу" },
  { id: "home", title: "Мой дом", kz: "Менің үйім", icon: "house", sub: "Семья, комнаты и техника — от них зависит ваша норма" },
  { id: "stats", title: "История", kz: "Статистика", icon: "chart", sub: "Расход и платежи за несколько месяцев" },
  { id: "eco", title: "Экология", kz: "Экология", icon: "leaf", sub: "Углеродный след, советы и достижения" },
  { id: "tariffs", title: "Тарифы", kz: "Тарифтер", icon: "tariff", sub: "Тарифы на электроэнергию по регионам Казахстана", hidden: true },
];

/* ---------------------------------------------------------------- состояние */
function defaultState() {
  const appl = {};
  APPLIANCES.forEach(a => { appl[a.id] = a.def; });
  return {
    version: 1, onboarded: false,
    home: { region: "г. Астана", stove: false, persons: 3, rooms: 3, lampsPerRoom: 2, lampType: "led", lampHours: 5,
            category: "Без льготы", appliances: appl },
    settings: { mode: "project", goalPct: 10 },
    records: [], tariffs: {}, categories: JSON.parse(JSON.stringify(SOCIAL)),
  };
}
let S = load();
let view = "dash";
let draft = null;   // форма расчёта

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

/* ---------------------------------------------------------------- форматирование */
const nf0 = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 });
const nf1 = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 1 });
const nf2 = new Intl.NumberFormat("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const tg = x => nf2.format(x) + " ₸";
const tg0 = x => nf0.format(x) + " ₸";
const kwh = x => nf1.format(x) + " кВт·ч";
const money = x => Math.round((x + Number.EPSILON) * 100) / 100;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const monthLabel = key => `${MONTHS[+key.slice(5) - 1]} ${key.slice(0, 4)}`;
const monthShort = key => `${MONTHS_SHORT[+key.slice(5) - 1]} ${key.slice(2, 4)}`;
function nextMonth(key) { let y = +key.slice(0, 4), m = +key.slice(5) + 1; if (m > 12) { m = 1; y++; } return `${y}-${String(m).padStart(2, "0")}`; }
function currentMonthKey() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`; }

function parseNum(v, name, { allowNeg = false, allowEmpty = false } = {}) {
  const s = String(v ?? "").replace(/\s/g, "").replace(",", ".");
  if (s === "") { if (allowEmpty) return 0; throw new Error(`Поле «${name}» не заполнено.`); }
  const n = Number(s);
  if (!Number.isFinite(n)) throw new Error(`Поле «${name}»: введите число, например 12345,6`);
  if (n < 0 && !allowNeg) throw new Error(`Поле «${name}» не может быть отрицательным.`);
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
    if (c > 0) items.push({ id: a.id, name: a.name, icon: a.icon, count: c, kwh: a.kwh * c });
  });
  const lamps = home.rooms * home.lampsPerRoom;
  const lampW = LAMP_TYPES[home.lampType].watt;
  const light = lamps * lampW * home.lampHours * 30 / 1000;
  items.push({ id: "light", name: `Освещение (${lamps} ламп)`, icon: "💡", count: lamps, kwh: light });
  const other = home.persons * 5;          // мелочи: зарядки, фены гостей, режим ожидания
  items.push({ id: "other", name: "Прочее и режим ожидания", icon: "🔌", count: 1, kwh: other });
  items.sort((a, b) => b.kwh - a.kwh);
  const total = items.reduce((s, x) => s + x.kwh, 0);
  return { total, items, light, lamps };
}

/** Нормы семьи и границы уровней */
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
  if (end < start) throw new Error(`Конечное показание (${nf2.format(end)}) меньше начального (${nf2.format(start)}). Проверьте, не перепутаны ли значения.`);
  const consumption = money(end - start);
  if (consumption > 20000) throw new Error("Расход больше 20 000 кВт·ч в месяц — проверьте показания счётчика.");
  const F = familyLimits(home, mode);
  const pr = prices(F.reg, home.stove);
  const rows = splitTiers(consumption, [F.L1, F.L2], pr);
  const gross = money(rows.reduce((s, r) => s + r.sum, 0));
  // льгота: скидка % на стоимость в пределах льготной нормы
  const cat = S.categories[home.category] || { percent: 0, norm: 0 };
  const covered = Math.min(consumption, cat.norm * F.p);
  const discBase = splitTiers(covered, [F.L1, F.L2], pr).reduce((s, r) => s + r.sum, 0);
  const discount = money(discBase * cat.percent / 100);
  const charge = money(gross - discount);
  const debtAfter = money(debt + charge - paid);
  // если бы всё было по 1-му уровню
  const allL1 = money(consumption * pr[0]);
  // анализ
  const justified = Math.max(F.norm, F.tech);
  let status = "good";
  if (consumption > F.norm) status = consumption <= justified ? "warn" : "bad";
  const overNorm = Math.max(0, consumption - F.norm);
  const waste = Math.max(0, consumption - justified);
  return {
    start, end, consumption, rows, gross, discount, charge, debt: money(debt), paid: money(paid), debtAfter,
    status, overNorm, waste, justified, extraTierCost: money(gross - allL1), co2: consumption * CO2_PER_KWH,
    perPerson: consumption / F.p, F, pr, cat,
  };
}

function ecoClass(perPerson) { return ECO_CLASSES.find(c => perPerson < c.max); }

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
  const pr = prices(region(h.region), h.stove);
  const p1 = pr[0];
  if (h.lampType !== "led") {
    const save = exp.lamps * (LAMP_TYPES[h.lampType].watt - 9) * h.lampHours * 30 / 1000;
    out.push({ em: "💡", html: `Замените ${exp.lamps} ламп на светодиодные — экономия <b>${kwh(save)}</b> и ≈ <b>${tg0(save * p1)}</b> в месяц.` });
  }
  if (h.lampHours > 6) out.push({ em: "🌙", html: `Свет горит ${h.lampHours} ч в день. Выключайте его в пустых комнатах — минус 1 час даст <b>${kwh(exp.lamps * LAMP_TYPES[h.lampType].watt * 30 / 1000)}</b>.` });
  exp.items.filter(x => x.kwh >= 20).slice(0, 4).forEach(x => {
    const a = APPLIANCES.find(a => a.id === x.id);
    if (a && a.tip) out.push({ em: a.icon, html: `<b>${esc(a.name)}</b> — около ${kwh(x.kwh)} в месяц. ${esc(a.tip)}` });
  });
  if (bill && bill.status === "bad") {
    out.unshift({ em: "🌍", html: `Сверх обоснованного расхода ушло <b>${kwh(bill.waste)}</b> — это ≈ <b>${nf1.format(bill.waste * CO2_PER_KWH)} кг CO₂</b>. Берегите природу: выключайте свет и технику, когда они не нужны.` });
  }
  const standby = Object.values(h.appliances).reduce((s, c) => s + c, 0) * 0.7;
  out.push({ em: "🔌", html: `Режим ожидания вашей техники — до <b>${kwh(standby)}</b> в месяц. Используйте сетевой фильтр с кнопкой.` });
  return out;
}

/* ================================================================ ДОСТИЖЕНИЯ */
function achievements() {
  const r = S.records;
  const inNorm = r.map(x => x.norm && x.kwh <= x.norm);
  let streak = 0, best = 0;
  inNorm.forEach(v => { streak = v ? streak + 1 : 0; best = Math.max(best, streak); });
  const dropped = r.some((x, i) => i > 0 && x.kwh <= r[i - 1].kwh * 0.9);
  const last = r[r.length - 1];
  const cls = last ? ecoClass(last.kwh / (last.persons || S.home.persons)).cls : null;
  return [
    { em: "⚡", name: "Первый расчёт", d: "Сохраните первый месяц", got: r.length >= 1 },
    { em: "✅", name: "В пределах нормы", d: "Месяц без превышения", got: inNorm.some(Boolean) },
    { em: "🔥", name: "Серия 3 месяца", d: "3 месяца подряд в норме", got: best >= 3 },
    { em: "📉", name: "Минус 10 %", d: "Расход ниже прошлого на 10 %", got: dropped },
    { em: "💡", name: "LED-дом", d: "Все лампы светодиодные", got: S.home.lampType === "led" },
    { em: "🌱", name: "Эко-класс A/B", d: "Расход на человека < 70 кВт·ч", got: cls === "A" || cls === "B" },
    { em: "💳", name: "Без долгов", d: "Долг на конец месяца 0 ₸", got: r.some(x => x.debt_after <= 0 && x.charge > 0) },
    { em: "🏆", name: "Целый год", d: "12 месяцев в истории", got: r.length >= 12 },
  ];
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
  if ("Notification" in window && Notification.permission === "granted") {
    try {
      if (navigator.serviceWorker && navigator.serviceWorker.controller) {
        navigator.serviceWorker.ready.then(reg => reg.showNotification(title, { body, icon: "icons/icon-192.png", badge: "icons/icon-96.png" }));
      } else new Notification(title, { body, icon: "icons/icon-192.png" });
    } catch (e) { /* ignore */ }
  }
}

function modal(html, onMount) {
  const ov = $("#overlay");
  ov.innerHTML = `<div class="modal"><div class="modal-box fade-in">${html}</div></div>`;
  const m = $(".modal", ov);
  m.addEventListener("click", e => { if (e.target === m) closeModal(); });
  if (onMount) onMount(m);
}
function closeModal() { $("#overlay").innerHTML = ""; }
function confirmBox(text, onYes, yes = "Да", danger = false) {
  modal(`<h3>Подтверждение</h3><p class="muted">${text}</p>
    <div class="btns mt"><button class="btn ${danger ? "danger" : "primary"}" id="cy">${yes}</button><button class="btn ghost" id="cn">Отмена</button></div>`, m => {
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

/* ================================================================ НАВИГАЦИЯ */
function renderNav() {
  $("#side-nav").innerHTML = NAV.map(n => `<button class="nav-btn ${view === n.id ? "active" : ""}" data-v="${n.id}">${I[n.icon]}<span>${n.title}</span></button>`).join("");
  $("#bottom-nav").innerHTML = NAV.filter(n => !n.hidden).map(n => `<button class="${view === n.id ? "active" : ""}" data-v="${n.id}">${I[n.icon]}<span>${n.title}</span></button>`).join("");
  $$("[data-v]").forEach(b => b.onclick = () => go(b.dataset.v));
  const F = familyLimits();
  $("#side-card").innerHTML = `Норма вашей семьи<b>${kwh(F.norm)} / мес</b><span>${F.p} чел. × ${F.n1} кВт·ч · ${esc(S.home.region)}</span>`;
}
function go(v) { view = v; history.replaceState(null, "", "#" + v); render(); window.scrollTo({ top: 0, behavior: "smooth" }); }

function render() {
  const n = NAV.find(x => x.id === view);
  $("#page-title").innerHTML = `${n.title} <span class="muted" style="font-size:.55em;font-weight:500">· ${n.kz}</span>`;
  $("#page-sub").textContent = n.sub;
  renderNav();
  const el = $("#view");
  el.className = "fade-in";
  void el.offsetWidth;
  ({ dash: viewDash, calc: viewCalc, home: viewHome, stats: viewStats, eco: viewEco, tariffs: viewTariffs })[view](el);
}

/* ================================================================ ГЛАВНАЯ */
function viewDash(el) {
  const last = S.records[S.records.length - 1];
  const F = familyLimits();
  const st = statsOf(S.records);
  const due = !last || last.month < currentMonthKey();
  if (!last) {
    el.innerHTML = `
      <div class="card glow"><div class="empty"><span class="em">⚡</span>
        <h2 style="color:var(--text);margin:0 0 8px">Добро пожаловать в EcoҚуат!</h2>
        <p>Введите показания счётчика за месяц — программа посчитает сумму по тарифу вашего региона,<br>сравнит расход с нормой семьи и подскажет, как экономить.</p>
        <div class="btns" style="justify-content:center;margin-top:18px">
          <button class="btn primary" id="go-calc">${I.bolt} Первый расчёт</button>
          <button class="btn ghost" id="go-home">${I.house} Настроить дом</button>
          <button class="btn ghost" id="demo">Загрузить пример</button>
        </div></div></div>
      ${familyCard(F)}`;
    $("#go-calc").onclick = () => go("calc");
    $("#go-home").onclick = () => go("home");
    $("#demo").onclick = loadDemo;
    return;
  }
  const pct = last.norm ? last.kwh / last.norm : 0;
  const color = last.status === "good" ? "#34d399" : last.status === "warn" ? "#ffb02e" : "#ff5d6c";
  const cls = ecoClass(last.kwh / (last.persons || F.p));
  el.innerHTML = `
    ${due ? `<div class="banner info" style="margin-bottom:18px"><div class="b-ico">🗓️</div><div><b>Пора внести показания за ${monthLabel(last ? nextMonth(last.month) : currentMonthKey())}</b><p>Снимите показания счётчика и сделайте новый расчёт — начальное показание подставится автоматически.</p></div>
      <button class="btn primary small" id="go-calc2" style="margin-left:auto">${I.bolt} Расчёт</button></div>` : ""}
    <div class="hero">
      <div class="card glow hero-main">
        <div class="stat"><span class="label">К оплате за ${monthLabel(last.month)}</span></div>
        <div class="big grad-text">${tg(last.charge)}</div>
        <div class="hero-row">
          <div class="stat"><span class="label">Расход</span><span class="value">${kwh(last.kwh)}</span></div>
          <div class="stat"><span class="label">Норма семьи</span><span class="value">${kwh(last.norm || F.norm)}</span></div>
          <div class="stat"><span class="label">Долг</span><span class="value ${last.debt_after > 0 ? "red" : "green"}">${last.debt_after > 0 ? tg(last.debt_after) : last.debt_after < 0 ? "переплата " + tg(-last.debt_after) : "нет"}</span></div>
        </div>
        ${statusBanner(last.status, last)}
      </div>
      <div class="card gauge-wrap">
        ${gaugeSVG(pct, color)}
        <div class="gauge-center"><b style="color:${color}">${nf0.format(pct * 100)}%</b><span>от нормы семьи</span></div>
      </div>
    </div>
    <div class="grid g4 mt">
      <div class="card stat"><span class="ico">🌍</span><span class="label">CO₂ за месяц</span><span class="value">${nf0.format(last.kwh * CO2_PER_KWH)} кг</span><span class="hint">≈ ${nf1.format(last.kwh * CO2_PER_KWH / (CO2_PER_TREE_YEAR / 12))} деревьев нужно, чтобы поглотить</span></div>
      <div class="card stat"><span class="ico">🏷️</span><span class="label">Эко-класс</span><span class="value" style="color:${cls.color}">${cls.cls}</span><span class="hint">${nf0.format(last.kwh / (last.persons || F.p))} кВт·ч на человека</span></div>
      <div class="card stat"><span class="ico">📊</span><span class="label">Средний расход</span><span class="value">${kwh(st.avg)}</span><span class="hint">за ${st.n} мес. · ${nf1.format(st.perDay)} в сутки</span></div>
      <div class="card stat"><span class="ico">✅</span><span class="label">Месяцев в норме</span><span class="value">${st.inNorm} из ${st.n}</span><span class="hint">${st.inNorm === st.n ? "Отличная дисциплина!" : "Цель — все месяцы в норме"}</span></div>
    </div>
    <div class="grid g2 mt">
      <div class="card eco"><h3>🌿 Советы для вашего дома <span class="kz">Үнемдеу кеңестері</span></h3><div class="tips">${personalTips(last).slice(0, 4).map(t => `<div class="tip"><span class="em">${t.em}</span><div>${t.html}</div></div>`).join("")}</div></div>
      <div class="card"><h3>📈 Последние месяцы</h3>${chartSVG(S.records.slice(-6), F.norm, 230)}
        <button class="btn ghost small mt-s" id="go-stats">Вся история →</button></div>
    </div>`;
  $("#go-calc2") && ($("#go-calc2").onclick = () => go("calc"));
  $("#go-stats").onclick = () => go("stats");
}

function familyCard(F) {
  const exp = expectedUsage();
  return `<div class="grid g3 mt">
    <div class="card stat"><span class="ico">👨‍👩‍👧</span><span class="label">Норма семьи</span><span class="value">${kwh(F.norm)}</span><span class="hint">${F.p} чел. × ${F.n1} кВт·ч (${esc(S.home.region)})</span></div>
    <div class="card stat"><span class="ico">🔌</span><span class="label">Ожидаемый расход техники</span><span class="value">${kwh(exp.total)}</span><span class="hint">по вашему списку техники и ламп</span></div>
    <div class="card stat"><span class="ico">💰</span><span class="label">Тариф 1-го уровня</span><span class="value">${tg(prices(F.reg, S.home.stove)[0])}</span><span class="hint">за 1 кВт·ч с НДС</span></div></div>`;
}

function statusBanner(status, r) {
  if (status === "good") return `<div class="banner good"><div class="b-ico">🌱</div><div><b>Вы в пределах нормы!</b><p>Расход не превышает норму семьи — оплата по самому низкому тарифу. Так держать!</p></div></div>`;
  if (status === "warn") return `<div class="banner warn"><div class="b-ico">⚠️</div><div><b>Норма превышена на ${kwh(r.overNorm ?? Math.max(0, r.kwh - r.norm))}</b><p>Это объясняется количеством техники в доме${S.settings.mode === "project" ? ", поэтому тариф остаётся прежним (1-й уровень)" : ""}. Следите, чтобы расход не рос дальше.</p></div></div>`;
  return `<div class="banner bad"><div class="b-ico">🔴</div><div><b>Перерасход электроэнергии!</b><p>Расход выше нормы и выше того, что тратит ваша техника, на ${kwh(r.waste ?? 0)}. Экономьте свет: выключайте лампы в пустых комнатах, не оставляйте технику в режиме ожидания. Берегите природу!</p></div></div>`;
}

/* ================================================================ РАСЧЁТ */
function newDraft() {
  const last = S.records[S.records.length - 1];
  const month = last ? nextMonth(last.month) : currentMonthKey();
  return { month, start: last ? String(last.end) : "", end: "", debt: last ? String(last.debt_after) : "0", paid: "0" };
}

function viewCalc(el) {
  if (!draft) draft = newDraft();
  const years = []; const y0 = new Date().getFullYear();
  for (let y = y0 - 4; y <= y0 + 1; y++) years.push(y);
  const F = familyLimits();
  el.innerHTML = `
    <div class="grid g2" style="align-items:start">
      <div class="card">
        <h3>📝 Ввод данных <span class="kz">Деректерді енгізу</span></h3>
        <div class="form" id="calc-form">
          <div class="row">
            <div class="field"><label>Месяц <span class="kz">Ай</span></label>
              <select class="input" id="f-m">${MONTHS.map((m, i) => `<option value="${String(i + 1).padStart(2, "0")}" ${+draft.month.slice(5) === i + 1 ? "selected" : ""}>${m}</option>`).join("")}</select></div>
            <div class="field"><label>Год <span class="kz">Жыл</span></label>
              <select class="input" id="f-y">${years.map(y => `<option ${+draft.month.slice(0, 4) === y ? "selected" : ""}>${y}</option>`).join("")}</select></div>
          </div>
          <div class="row">
            <div class="field"><label>Начальное показание <span class="kz">Бастапқы</span></label><div class="unit"><input class="input" id="f-start" inputmode="decimal" placeholder="например 12840" value="${esc(draft.start)}"><span>кВт·ч</span></div></div>
            <div class="field"><label>Конечное показание <span class="kz">Соңғы</span></label><div class="unit"><input class="input" id="f-end" inputmode="decimal" placeholder="например 13110" value="${esc(draft.end)}"><span>кВт·ч</span></div></div>
          </div>
          <div class="row">
            <div class="field"><label>Долг с прошлого месяца <span class="kz">Қарыз</span></label><div class="unit"><input class="input" id="f-debt" inputmode="decimal" value="${esc(draft.debt)}"><span>₸</span></div><span class="help">Переплату вводите со знаком минус</span></div>
            <div class="field"><label>Оплачено <span class="kz">Төленді</span></label><div class="unit"><input class="input" id="f-paid" inputmode="decimal" value="${esc(draft.paid)}"><span>₸</span></div></div>
          </div>
          <div class="banner info"><div class="b-ico">🏠</div><div><b>${esc(S.home.region)} · ${F.p} чел. · ${S.home.stove ? "с электроплитой" : "без электроплиты"}</b>
            <p>Норма семьи: ${F.p} × ${F.n1} = <b>${kwh(F.norm)}</b>. Льгота: ${esc(S.home.category)}. <a href="#" id="to-home">Изменить в «Мой дом»</a></p></div></div>
          <div class="btns">
            <button class="btn primary" id="b-save">${I.save} Сохранить месяц</button>
            <button class="btn ghost" id="b-clear">Очистить</button>
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
  const fields = [["#f-start", "Начальное показание"], ["#f-end", "Конечное показание"]];
  try {
    const start = parseNum(draft.start, "Начальное показание");
    const end = parseNum(draft.end, "Конечное показание");
    const debt = parseNum(draft.debt, "Долг", { allowNeg: true, allowEmpty: true });
    const paid = parseNum(draft.paid, "Оплачено", { allowEmpty: true });
    return calcBill({ start, end, debt, paid });
  } catch (e) {
    if (strict) {
      fields.forEach(([sel, name]) => { if (e.message.includes(name)) $(sel).classList.add("err"); });
      if (e.message.includes("меньше начального")) $("#f-end").classList.add("err");
    }
    return { error: e.message };
  }
}

function showResult(strict) {
  const box = $("#calc-result");
  const b = readBill(strict);
  if (b.error) {
    const empty = !draft.start && !draft.end;
    box.innerHTML = `<div class="card"><div class="empty"><span class="em">${empty ? "🔌" : "✋"}</span>${empty ? "Введите показания счётчика — результат появится здесь сразу." : esc(b.error)}</div></div>`;
    return null;
  }
  const F = b.F;
  const colors = ["#34d399", "#ffb02e", "#ff5d6c"];
  const tot = b.consumption || 1;
  box.innerHTML = `
    <div class="card glow">
      <div class="stat"><span class="label">К оплате за ${monthLabel(draft.month)}</span></div>
      <div class="big grad-text" style="font-size:44px;font-weight:900;letter-spacing:-1px">${tg(b.charge)}</div>
      <dl class="kv mt">
        <dt>Расход <span class="kz">Тұтыну</span></dt><dd>${kwh(b.consumption)}</dd>
        <dt>Норма семьи (${F.p} × ${F.n1})</dt><dd>${kwh(F.norm)}</dd>
        ${S.settings.mode === "project" && F.L1 > F.norm ? `<dt>Норма с учётом техники</dt><dd>${kwh(F.L1)}</dd>` : ""}
        <dt>Начислено по тарифу</dt><dd>${tg(b.gross)}</dd>
        ${b.discount ? `<dt>Льгота «${esc(S.home.category)}»</dt><dd class="green">− ${tg(b.discount)}</dd>` : ""}
        ${b.extraTierCost > 0 ? `<dt>Переплата за превышение</dt><dd class="red">+ ${tg(b.extraTierCost)}</dd>` : ""}
        <div class="sep"></div>
        <dt>Итого за месяц</dt><dd class="total amber">${tg(b.charge)}</dd>
        <dt>Оплачено</dt><dd>${tg(b.paid)}</dd>
        <dt>Долг на конец месяца <span class="kz">Қарыз</span></dt><dd class="${b.debtAfter > 0 ? "red" : "green"}">${b.debtAfter > 0 ? tg(b.debtAfter) : b.debtAfter < 0 ? "переплата " + tg(-b.debtAfter) : "0 ₸"}</dd>
      </dl>
    </div>
    <div class="card mt">
      <h3>⚡ Расход по уровням тарифа</h3>
      <div class="tierbar">${b.rows.map(r => `<i style="width:${r.kwh / tot * 100}%;background:${colors[r.level - 1]}"></i>`).join("")}</div>
      <div class="table-wrap mt-s"><table><tr><th>Уровень</th><th class="num">кВт·ч</th><th class="num">₸/кВт·ч</th><th class="num">Сумма</th></tr>
        ${b.rows.map(r => `<tr><td><span style="color:${colors[r.level - 1]}">●</span> ${r.level}-й: ${r.to === Infinity ? "свыше " + nf0.format(r.from) : nf0.format(r.from) + "–" + nf0.format(r.to)}</td><td class="num">${nf2.format(r.kwh)}</td><td class="num">${nf2.format(r.price)}</td><td class="num">${tg(r.sum)}</td></tr>`).join("")}
      </table></div>
    </div>
    <div class="mt">${statusBanner(b.status, { overNorm: b.overNorm, waste: b.waste, kwh: b.consumption, norm: F.norm })}</div>
    ${b.status !== "good" ? `<div class="card eco mt"><h3>🌿 Как сэкономить</h3><div class="tips">${personalTips(b).slice(0, 3).map(t => `<div class="tip"><span class="em">${t.em}</span><div>${t.html}</div></div>`).join("")}</div></div>` : ""}
    <div class="card mt"><div class="grid g2">
      <div class="stat"><span class="label">CO₂ за месяц</span><span class="value grad-eco">${nf0.format(b.co2)} кг</span></div>
      <div class="stat"><span class="label">Эко-класс</span><span class="value" style="color:${ecoClass(b.perPerson).color}">${ecoClass(b.perPerson).cls} · ${nf0.format(b.perPerson)} кВт·ч/чел.</span></div>
    </div></div>`;
  return b;
}

function saveMonth() {
  const b = showResult(true);
  if (!b) { toast(esc(readBill(false).error || "Проверьте данные"), "bad"); return; }
  const key = draft.month;
  const doSave = () => {
    S.records = S.records.filter(r => r.month !== key);
    S.records.push({
      month: key, region: S.home.region, category: S.home.category, persons: b.F.p,
      start: b.start, end: b.end, kwh: b.consumption, gross: b.gross, discount: b.discount, charge: b.charge,
      debt_before: b.debt, paid: b.paid, debt_after: b.debtAfter, norm: b.F.norm, expected: Math.round(b.F.tech), status: b.status,
    });
    save();
    toast(`Месяц «${monthLabel(key)}» сохранён в историю.`, "good");
    if (b.status === "bad") {
      toast(`Перерасход ${kwh(b.waste)}! Экономьте электроэнергию — это забота о природе.`, "bad");
      notify("EcoҚуат: перерасход электроэнергии", `Расход ${kwh(b.consumption)} при норме ${kwh(b.F.norm)}. Выключайте свет в пустых комнатах!`);
    } else if (b.status === "warn") {
      notify("EcoҚуат: норма превышена", `Превышение ${kwh(b.overNorm)} объясняется техникой в доме.`);
    }
    draft = null;
    go("dash");
  };
  if (S.records.some(r => r.month === key)) confirmBox(`За ${monthLabel(key)} запись уже есть. Заменить её?`, doSave, "Заменить");
  else doSave();
}

/* ================================================================ МОЙ ДОМ */
function viewHome(el) {
  const h = S.home;
  const regs = Object.keys(REGIONS);
  el.innerHTML = `
    <div class="grid g2" style="align-items:start">
      <div class="card">
        <h3>👨‍👩‍👧 Семья и регион <span class="kz">Отбасы және аймақ</span></h3>
        <div class="form">
          <div class="field"><label>Регион <span class="kz">Облыс</span></label>
            <select class="input" id="h-region">${regs.map(r => `<option ${r === h.region ? "selected" : ""}>${r}</option>`).join("")}</select>
            <span class="help" id="h-reg-hint"></span></div>
          <div class="field"><label>Человек в семье (прописано) <span class="kz">Отбасы мүшелері</span></label>${stepper("persons", h.persons, 1, 20)}
            <span class="help">От этого зависит норма: лимит 1-го уровня = норма на человека × количество человек.</span></div>
          <label class="switch"><input type="checkbox" id="h-stove" ${h.stove ? "checked" : ""}><span class="track"></span><span>В доме электроплита <span class="muted">(нормы выше)</span></span></label>
          <div class="field"><label>Социальная льгота <span class="kz">Әлеуметтік жеңілдік</span></label>
            <select class="input" id="h-cat">${Object.keys(S.categories).map(c => `<option ${c === h.category ? "selected" : ""}>${esc(c)}</option>`).join("")}</select></div>
        </div>
      </div>
      <div class="card glow" id="home-summary"></div>
    </div>
    <div class="card mt">
      <h3>💡 Комнаты и освещение <span class="kz">Бөлмелер мен жарық</span></h3>
      <div class="grid g4">
        <div class="field"><label>Комнат (вместе с кухней)</label>${stepper("rooms", h.rooms, 1, 20)}</div>
        <div class="field"><label>Ламп в комнате</label>${stepper("lampsPerRoom", h.lampsPerRoom, 1, 12)}</div>
        <div class="field"><label>Часов света в день</label>${stepper("lampHours", h.lampHours, 1, 24)}</div>
        <div class="field"><label>Тип ламп</label><select class="input" id="h-lamp">${Object.entries(LAMP_TYPES).map(([k, v]) => `<option value="${k}" ${k === h.lampType ? "selected" : ""}>${v.name}</option>`).join("")}</select></div>
      </div>
    </div>
    <div class="card mt">
      <h3>🔌 Бытовая техника <span class="kz">Тұрмыстық техника</span></h3>
      <p class="sub">Укажите, сколько приборов у вас есть. Чем больше техники — тем выше обоснованный расход.</p>
      <div class="appl-grid">${APPLIANCES.map(a => `<div class="appl ${h.appliances[a.id] ? "on" : ""}" id="ap-${a.id}">
        <span class="em">${a.icon}</span><div class="t"><b title="${esc(a.name)}">${esc(a.name)}</b><small>${esc(a.kz)} · ≈ ${nf1.format(a.kwh)} кВт·ч/мес</small></div>
        ${stepper("ap:" + a.id, h.appliances[a.id] || 0, 0, 20)}</div>`).join("")}</div>
    </div>`;
  const refresh = () => { save(); homeSummary(); renderNav(); };
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
  $("#h-reg-hint").innerHTML = `<span class="pill ${STATUS[reg.status].cls}">${STATUS[reg.status].label}</span> ${prices(reg, S.home.stove).map((p, i) => `${i + 1}-й: ${nf2.format(p)} ₸`).join(" · ")}`;
  const over = exp.total > F.norm;
  const max = Math.max(...exp.items.map(x => x.kwh), 1);
  $("#home-summary").innerHTML = `
    <h3>📋 Итог по дому</h3>
    <div class="grid g2">
      <div class="stat"><span class="label">Норма семьи</span><span class="value amber">${kwh(F.norm)}</span><span class="hint">${F.p} × ${F.n1} кВт·ч · 2-й уровень до ${kwh(F.norm2)}</span></div>
      <div class="stat"><span class="label">Техника тратит ≈</span><span class="value ${over ? "red" : "green"}">${kwh(exp.total)}</span><span class="hint">в месяц при обычном использовании</span></div>
    </div>
    <div class="banner ${over ? "warn" : "good"} mt-s"><div class="b-ico">${over ? "⚠️" : "✅"}</div><div><b>${over ? "Техники больше, чем позволяет норма" : "Норма покрывает вашу технику"}</b>
      <p>${over ? `Ожидаемый расход выше нормы на ${kwh(exp.total - F.norm)}. ${S.settings.mode === "project" ? "Программа учтёт это: превышение до " + kwh(F.L1) + " будет считаться обоснованным и тариф не вырастет." : "По правилам энергосбыта превышение оплачивается по 2-му уровню."}` : "Если расход окажется выше нормы — это перерасход, и программа подскажет, как экономить."}</p></div></div>
    <div class="mt">${exp.items.slice(0, 7).map(x => `<div style="display:flex;align-items:center;gap:10px;margin:8px 0;font-size:13px">
      <span style="width:22px">${x.icon}</span><span style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(x.name)}${x.count > 1 && x.id !== "light" ? " ×" + x.count : ""}</span>
      <div class="progress" style="width:38%"><i style="width:${x.kwh / max * 100}%;background:var(--grad-energy)"></i></div><b style="width:78px;text-align:right">${nf0.format(x.kwh)}</b></div>`).join("")}</div>`;
}

/* ================================================================ ИСТОРИЯ */
let range = "all";
function viewStats(el) {
  const recs = range === "all" ? S.records : S.records.slice(-+range);
  const st = statsOf(recs);
  const F = familyLimits();
  el.innerHTML = `
    <div class="btns" style="justify-content:space-between;margin-bottom:18px">
      <div class="seg" id="range">${[["3", "3 мес."], ["6", "6 мес."], ["12", "12 мес."], ["all", "Всё"]].map(([k, t]) => `<button data-r="${k}" class="${range === k ? "on" : ""}">${t}</button>`).join("")}</div>
      <div class="btns"><button class="btn ghost small" id="csv">Экспорт CSV</button><button class="btn ghost small" id="demo">Пример данных</button>
        ${S.records.length ? `<button class="btn danger small" id="clear">${I.trash} Очистить</button>` : ""}</div>
    </div>
    ${!st ? `<div class="card"><div class="empty"><span class="em">📊</span>История пуста. Сохраните первый расчёт или загрузите пример.</div></div>` : `
    <div class="grid g4">
      <div class="card stat"><span class="ico">📊</span><span class="label">Средний расход</span><span class="value cyan">${kwh(st.avg)}</span><span class="hint">≈ ${nf1.format(st.perDay)} кВт·ч в сутки</span></div>
      <div class="card stat"><span class="ico">⚡</span><span class="label">Всего потреблено</span><span class="value amber">${kwh(st.total)}</span><span class="hint">макс: ${monthShort(st.max.month)} · ${nf0.format(st.max.kwh)} · мин: ${monthShort(st.min.month)} · ${nf0.format(st.min.kwh)}</span></div>
      <div class="card stat"><span class="ico">💳</span><span class="label">Начислено / оплачено</span><span class="value">${tg0(st.charged)}</span><span class="hint">оплачено ${tg0(st.paid)} · ${st.debt > 0 ? "долг " + tg0(st.debt) : st.debt < 0 ? "переплата " + tg0(-st.debt) : "долга нет"}</span></div>
      <div class="card stat"><span class="ico">🌍</span><span class="label">Углеродный след</span><span class="value grad-eco">${nf0.format(st.co2)} кг CO₂</span><span class="hint">≈ ${nf1.format(st.co2 / CO2_PER_TREE_YEAR)} деревьев за год</span></div>
    </div>
    <div class="card mt"><h3>📈 Расход по месяцам</h3>${chartSVG(recs, F.norm, 300)}
      <div class="legend"><span><i style="background:#34d399"></i>в норме</span><span><i style="background:#ffb02e"></i>превышение из-за техники</span><span><i style="background:#ff5d6c"></i>перерасход</span><span><i style="background:#ffc83d"></i>норма семьи</span><span><i style="background:#3dd6f5"></i>среднее</span></div></div>
    <div class="card mt"><h3>🗂️ Таблица</h3><div class="table-wrap"><table>
      <tr><th>Месяц</th><th class="num">Начало</th><th class="num">Конец</th><th class="num">кВт·ч</th><th class="num">Норма</th><th class="num">Начислено</th><th class="num">Льгота</th><th class="num">К оплате</th><th class="num">Оплачено</th><th class="num">Долг</th><th></th></tr>
      ${recs.slice().reverse().map(r => `<tr><td><b>${monthLabel(r.month)}</b></td><td class="num">${nf2.format(r.start)}</td><td class="num">${nf2.format(r.end)}</td>
        <td class="num" style="color:${r.status === "bad" ? "var(--red)" : r.status === "warn" ? "var(--amber)" : "var(--green)"}">${nf1.format(r.kwh)}</td><td class="num">${r.norm ? nf0.format(r.norm) : "—"}</td>
        <td class="num">${nf2.format(r.gross)}</td><td class="num">${nf2.format(r.discount)}</td><td class="num">${nf2.format(r.charge)}</td><td class="num">${nf2.format(r.paid)}</td>
        <td class="num ${r.debt_after > 0 ? "red" : ""}">${nf2.format(r.debt_after)}</td><td><button class="btn ghost small" data-del="${r.month}" title="Удалить">${I.trash}</button></td></tr>`).join("")}
    </table></div></div>`}`;
  $$("#range button").forEach(b => b.onclick = () => { range = b.dataset.r; render(); });
  $("#csv").onclick = exportCSV;
  $("#demo").onclick = loadDemo;
  $("#clear") && ($("#clear").onclick = () => confirmBox("Удалить всю историю расчётов? Это действие нельзя отменить.", () => { S.records = []; save(); render(); }, "Удалить всё", true));
  $$("[data-del]").forEach(b => b.onclick = () => confirmBox(`Удалить запись за ${monthLabel(b.dataset.del)}?`, () => { S.records = S.records.filter(r => r.month !== b.dataset.del); save(); render(); }, "Удалить", true));
}

function chartSVG(recs, norm, height = 280) {
  if (!recs.length) return `<div class="empty">Нет данных</div>`;
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
    const c = col[r.status] || (r.kwh > (r.norm || norm) ? col.bad : col.good);
    g += `<rect x="${x}" y="${y}" width="${bw}" height="${h}" rx="8" fill="url(#bar-${r.status || "good"})"/>
      <rect x="${x}" y="${y}" width="${bw}" height="4" rx="2" fill="${c}"/>
      <text x="${x + bw / 2}" y="${y - 7}" text-anchor="middle" style="fill:#e6eaff;font-weight:700">${nf0.format(r.kwh)}</text>
      <text x="${x + bw / 2}" y="${H - 12}" text-anchor="middle">${monthShort(r.month)}</text>`;
  });
  const ln = (v, c, label, dash) => { const y = pt + ph * (1 - v / vmax); return `<line x1="${pl}" x2="${W - pr}" y1="${y}" y2="${y}" stroke="${c}" stroke-width="2" ${dash ? 'stroke-dasharray="7 5"' : ""}/><text x="${W - pr}" y="${y - 6}" text-anchor="end" style="fill:${c};font-weight:700">${label}</text>`; };
  if (norm) g += ln(norm, "#ffc83d", `норма ${nf0.format(norm)}`, false);
  g += ln(avg, "#3dd6f5", `среднее ${nf0.format(avg)}`, true);
  const defs = Object.entries(col).map(([k, c]) => `<linearGradient id="bar-${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c}" stop-opacity=".9"/><stop offset="1" stop-color="${c}" stop-opacity=".25"/></linearGradient>`).join("");
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" style="height:${height}px"><defs>${defs}</defs>${g}</svg>`;
}

function exportCSV() {
  if (!S.records.length) { toast("История пуста."); return; }
  const head = ["Месяц", "Регион", "Человек", "Начало", "Конец", "кВт·ч", "Норма", "Начислено", "Льгота", "К оплате", "Оплачено", "Долг на конец", "CO2 кг"];
  const lines = [head.join(";")].concat(S.records.map(r => [monthLabel(r.month), r.region, r.persons || "", r.start, r.end, r.kwh, r.norm || "", r.gross, r.discount, r.charge, r.paid, r.debt_after, Math.round(r.kwh * CO2_PER_KWH)].join(";").replace(/\./g, ",")));
  download("ecoquat_history.csv", "﻿" + lines.join("\r\n"), "text/csv");
}
function download(name, text, type) {
  if (window.pywebview && window.pywebview.api && window.pywebview.api.save_file) {
    window.pywebview.api.save_file(name, text).then(p => p && toast("Файл сохранён: " + esc(p), "good"));
    return;
  }
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function loadDemo() {
  const go2 = () => {
    const usage = [268, 241, 212, 187, 224, 259];
    let key = currentMonthKey();
    for (let i = 0; i < 6; i++) key = (() => { let y = +key.slice(0, 4), m = +key.slice(5) - 1; if (m < 1) { m = 12; y--; } return `${y}-${String(m).padStart(2, "0")}`; })();
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
    save(); toast("Пример за 6 месяцев загружен.", "good"); render();
  };
  if (S.records.length) confirmBox("Заменить текущую историю примером?", go2, "Заменить", true); else go2();
}

/* ================================================================ ЭКОЛОГИЯ */
function viewEco(el) {
  const last = S.records[S.records.length - 1];
  const F = familyLimits();
  const per = last ? last.kwh / (last.persons || F.p) : expectedUsage().total / F.p;
  const cls = ecoClass(per);
  const st = statsOf(S.records);
  const yearCO2 = st ? st.avg * 12 * CO2_PER_KWH : expectedUsage().total * 12 * CO2_PER_KWH;
  const goal = last ? Math.round(last.kwh * (1 - S.settings.goalPct / 100)) : Math.round(F.norm);
  const tipOfDay = GENERAL_TIPS[new Date().getDate() % GENERAL_TIPS.length];
  el.innerHTML = `
    <div class="grid g3">
      <div class="card eco span2">
        <h3>🏷️ Эко-класс вашего дома <span class="kz">${last ? "по " + monthLabel(last.month) : "по списку техники"}</span></h3>
        <div class="eco-scale">${ECO_CLASSES.map(c => `<div class="${c.cls === cls.cls ? "cur" : ""}" style="background:${c.color}">${c.cls}</div>`).join("")}</div>
        <p class="mt" style="margin-bottom:0"><b style="color:${cls.color};font-size:18px">${nf0.format(per)} кВт·ч на человека в месяц.</b> <span class="muted">${cls.text}</span></p>
      </div>
      <div class="card stat"><span class="ico">🌳</span><span class="label">CO₂ за год (прогноз)</span><span class="value grad-eco">${nf0.format(yearCO2)} кг</span>
        <span class="hint">Чтобы его поглотить, нужно ≈ <b>${nf0.format(yearCO2 / CO2_PER_TREE_YEAR)}</b> деревьев. 1 кВт·ч в РК ≈ ${CO2_PER_KWH} кг CO₂ (много угольных станций).</span></div>
    </div>
    <div class="grid g2 mt" style="align-items:start">
      <div class="card eco"><h3>🎯 Цель на следующий месяц</h3>
        <p class="sub">Снизить расход на <b>${S.settings.goalPct}%</b>: не больше <b class="green">${kwh(goal)}</b>${last ? ` (было ${kwh(last.kwh)})` : ""}.</p>
        <div class="seg" id="goal">${[5, 10, 15, 20].map(p => `<button data-g="${p}" class="${S.settings.goalPct === p ? "on" : ""}">−${p}%</button>`).join("")}</div>
        ${last ? `<p class="note mt-s">Это сэкономит ≈ <b class="green">${tg0((last.kwh - goal) * prices(F.reg, S.home.stove)[0])}</b> и <b class="green">${nf0.format((last.kwh - goal) * CO2_PER_KWH)} кг CO₂</b> в месяц.</p>` : ""}
        <div class="banner info mt"><div class="b-ico">💡</div><div><b>Совет дня</b><p>${esc(tipOfDay)}</p></div></div>
      </div>
      <div class="card"><h3>🧮 Сколько тратит прибор? <span class="kz">Калькулятор</span></h3>
        <div class="form">
          <div class="field"><label>Прибор</label><select class="input" id="c-dev"><option value="">— свой прибор —</option>
            ${[["Лампа накаливания", 60], ["LED-лампа", 9], ["Электрочайник", 2000], ["Утюг", 2000], ["Обогреватель", 1500], ["Кондиционер", 900], ["Телевизор", 100], ["Игровой ПК", 450], ["Ноутбук", 60], ["Бойлер", 1500], ["Фен", 1600], ["Стиральная машина", 2000]].map(([n, w]) => `<option value="${w}">${n} (${w} Вт)</option>`).join("")}</select></div>
          <div class="row"><div class="field"><label>Мощность</label><div class="unit"><input class="input" id="c-w" inputmode="decimal" value="60"><span>Вт</span></div></div>
            <div class="field"><label>Часов в день</label><div class="unit"><input class="input" id="c-h" inputmode="decimal" value="5"><span>ч</span></div></div></div>
          <div id="c-out"></div>
        </div></div>
    </div>
    <div class="card eco mt"><h3>🌿 Персональные советы <span class="kz">Жеке кеңестер</span></h3><div class="tips">${personalTips(last ? { status: last.status, waste: Math.max(0, last.kwh - Math.max(last.norm || 0, last.expected || 0)) } : null).map(t => `<div class="tip"><span class="em">${t.em}</span><div>${t.html}</div></div>`).join("")}</div></div>
    <div class="card mt"><h3>🏆 Достижения <span class="kz">Жетістіктер</span></h3><div class="badges">${achievements().map(a => `<div class="badge ${a.got ? "got" : ""}"><div class="em">${a.em}</div><b>${a.name}</b><small>${a.d}</small></div>`).join("")}</div></div>`;
  $$("#goal button").forEach(b => b.onclick = () => { S.settings.goalPct = +b.dataset.g; save(); render(); });
  const calc = () => {
    const out = $("#c-out");
    try {
      const w = parseNum($("#c-w").value, "Мощность"), h = parseNum($("#c-h").value, "Часов в день");
      if (h > 24) throw new Error("В сутках только 24 часа.");
      const k = w * h * 30 / 1000, p = prices(F.reg, S.home.stove)[0];
      out.innerHTML = `<div class="grid g3"><div class="stat"><span class="label">В месяц</span><span class="value amber" style="font-size:20px">${kwh(k)}</span></div>
        <div class="stat"><span class="label">Стоимость</span><span class="value" style="font-size:20px">${tg0(k * p)}</span></div>
        <div class="stat"><span class="label">CO₂</span><span class="value grad-eco" style="font-size:20px">${nf1.format(k * CO2_PER_KWH)} кг</span></div></div>`;
    } catch (e) { out.innerHTML = `<p class="red note">${esc(e.message)}</p>`; }
  };
  $("#c-dev").onchange = e => { if (e.target.value) $("#c-w").value = e.target.value; calc(); };
  $("#c-w").oninput = calc; $("#c-h").oninput = calc;
  calc();
}

/* ================================================================ ТАРИФЫ */
function viewTariffs(el) {
  el.innerHTML = `
    <div class="banner info" style="margin-bottom:18px"><div class="b-ico">ℹ️</div><div><b>Откуда цены</b>
      <p>Цены — для бытовых потребителей, ₸ за 1 кВт·ч с НДС. «Проверен» — тарифы и нормы с сайта энергосбыта (осень 2026). «Частично» — проверены цены, часть границ типовая. «Ориентир» — проверен 2-й уровень (август 2026), остальные рассчитаны. Нормы указаны на 1 человека. Если в вашей квитанции другие цифры — нажмите «Изменить».</p></div></div>
    <div class="card"><div class="table-wrap"><table>
      <tr><th>Регион</th><th>Поставщик</th><th class="num">1-й ур.</th><th class="num">2-й ур.</th><th class="num">3-й ур.</th><th class="num">Норма на чел.</th><th>Дата</th><th>Статус</th><th></th></tr>
      ${Object.keys(REGIONS).map(name => { const r = region(name); const st = S.tariffs[name] ? STATUS.user : STATUS[r.status];
        return `<tr class="${name === S.home.region ? "sel" : ""}"><td><b>${esc(name)}</b></td><td class="muted">${esc(r.supplier)}</td>
        ${r.tiers.map(p => `<td class="num">${nf2.format(p)}</td>`).join("")}<td class="num">${r.n1} / ${r.n2}<br><small class="muted">плита ${r.s1 ?? r.n1} / ${r.s2 ?? r.n2}</small></td>
        <td>${esc(r.date)}</td><td><span class="pill ${st.cls}">${st.label}</span></td>
        <td><button class="btn ghost small" data-info="${esc(name)}">Подробнее</button></td></tr>`; }).join("")}
    </table></div></div>
    <div class="card mt"><h3>🤝 Социальные льготы <span class="kz">Әлеуметтік жеңілдіктер</span></h3>
      <p class="sub">Единой «льготы на свет» в Казахстане нет — помощь даёт акимат (жилищная помощь) и отдельные решения регионов. Здесь можно задать свою скидку.</p>
      <div class="table-wrap"><table><tr><th>Категория</th><th class="num">Скидка %</th><th class="num">Норма кВт·ч/чел.</th><th></th></tr>
        ${Object.entries(S.categories).map(([n, c]) => `<tr><td>${esc(n)}</td><td class="num">${nf0.format(c.percent)}</td><td class="num">${nf0.format(c.norm)}</td>
        <td>${n !== "Без льготы" ? `<button class="btn ghost small" data-cat="${esc(n)}">Изменить</button> <button class="btn danger small" data-catdel="${esc(n)}">${I.trash}</button>` : ""}</td></tr>`).join("")}
      </table></div><button class="btn ghost mt-s" id="cat-add">${I.plus} Добавить льготу</button></div>`;
  $$("[data-info]").forEach(b => b.onclick = () => tariffModal(b.dataset.info));
  $$("[data-cat]").forEach(b => b.onclick = () => catModal(b.dataset.cat));
  $$("[data-catdel]").forEach(b => b.onclick = () => confirmBox(`Удалить льготу «${esc(b.dataset.catdel)}»?`, () => {
    delete S.categories[b.dataset.catdel]; if (S.home.category === b.dataset.catdel) S.home.category = "Без льготы"; save(); render(); }, "Удалить", true));
  $("#cat-add").onclick = () => catModal(null);
}

function tariffModal(name) {
  const r = region(name);
  modal(`<h3>${esc(name)}</h3>
    <p class="note">${esc(r.supplier)} · действует с ${esc(r.date)}<br>${esc(r.note)}<br><a href="${r.src}" target="_blank" rel="noopener">Источник</a></p>
    <div class="form mt">
      <div class="row"><div class="field"><label>1-й уровень, ₸</label><input class="input" id="t1" value="${r.tiers[0]}"></div><div class="field"><label>2-й уровень, ₸</label><input class="input" id="t2" value="${r.tiers[1]}"></div></div>
      <div class="row"><div class="field"><label>3-й уровень, ₸</label><input class="input" id="t3" value="${r.tiers[2]}"></div><div class="field"><label>Норма 1-го ур. на чел.</label><input class="input" id="n1" value="${r.n1}"></div></div>
      <div class="row"><div class="field"><label>Граница 2-го ур. на чел.</label><input class="input" id="n2" value="${r.n2}"></div><div class="field"><label>С плитой: норма / граница</label><input class="input" id="sn" value="${r.s1 ?? r.n1} / ${r.s2 ?? r.n2}"></div></div>
      <p class="red note" id="t-err"></p>
      <div class="btns"><button class="btn primary" id="t-save">${I.save} Сохранить мой тариф</button>
        ${S.tariffs[name] ? `<button class="btn ghost" id="t-reset">Вернуть исходный</button>` : ""}<button class="btn ghost" id="t-close">Закрыть</button></div>
    </div>`, m => {
    $("#t-close", m).onclick = closeModal;
    $("#t-reset", m) && ($("#t-reset", m).onclick = () => { delete S.tariffs[name]; save(); closeModal(); render(); });
    $("#t-save", m).onclick = () => {
      try {
        const t = ["t1", "t2", "t3"].map((id, i) => parseNum($("#" + id, m).value, `${i + 1}-й уровень`));
        if (t.some(x => x <= 0 || x > 500)) throw new Error("Цена должна быть от 0 до 500 ₸ за кВт·ч.");
        const n1 = parseNum($("#n1", m).value, "Норма"), n2 = parseNum($("#n2", m).value, "Граница 2-го уровня");
        if (n1 <= 0 || n2 <= n1) throw new Error("Граница 2-го уровня должна быть больше нормы 1-го уровня.");
        const sp = $("#sn", m).value.split("/").map(x => parseNum(x, "Нормы с плитой"));
        if (sp.length !== 2 || sp[1] <= sp[0]) throw new Error("Нормы с плитой введите так: 90 / 180");
        S.tariffs[name] = { tiers: t, stove: null, n1, n2, s1: sp[0], s2: sp[1], status: "user", note: "Тариф введён вручную по вашей квитанции.", date: new Date().toLocaleDateString("ru-RU") };
        save(); closeModal(); toast("Тариф сохранён.", "good"); render();
      } catch (e) { $("#t-err", m).textContent = e.message; }
    };
  });
}

function catModal(name) {
  const c = name ? S.categories[name] : { percent: 10, norm: 70 };
  modal(`<h3>${name ? "Льгота: " + esc(name) : "Новая льгота"}</h3><div class="form">
    ${name ? "" : `<div class="field"><label>Название</label><input class="input" id="c-n" placeholder="например: Пенсионер"></div>`}
    <div class="row"><div class="field"><label>Скидка, %</label><input class="input" id="c-p" value="${c.percent}"></div><div class="field"><label>Норма, кВт·ч на чел.</label><input class="input" id="c-norm" value="${c.norm}"></div></div>
    <p class="red note" id="c-err"></p><div class="btns"><button class="btn primary" id="c-ok">Сохранить</button><button class="btn ghost" id="c-x">Отмена</button></div></div>`, m => {
    $("#c-x", m).onclick = closeModal;
    $("#c-ok", m).onclick = () => {
      try {
        const n = name || ($("#c-n", m).value || "").trim();
        if (n.length < 2) throw new Error("Введите название льготы.");
        if (!name && S.categories[n]) throw new Error("Такая льгота уже есть.");
        const p = parseNum($("#c-p", m).value, "Скидка"), no = parseNum($("#c-norm", m).value, "Норма");
        if (p > 100) throw new Error("Скидка не может быть больше 100 %.");
        S.categories[n] = { percent: p, norm: no }; save(); closeModal(); render();
      } catch (e) { $("#c-err", m).textContent = e.message; }
    };
  });
}

/* ================================================================ НАСТРОЙКИ */
function settingsModal() {
  modal(`<h3>⚙️ Настройки</h3>
    <div class="form">
      <div class="field"><label>Как считать превышение нормы</label>
        <div class="seg" id="mode"><button data-m="project" class="${S.settings.mode === "project" ? "on" : ""}">Техника расширяет норму</button><button data-m="real" class="${S.settings.mode === "real" ? "on" : ""}">Строго как в квитанции</button></div>
        <span class="help">«Техника расширяет норму»: если в доме много приборов, обоснованное превышение оплачивается по 1-му уровню, а программа только предупреждает. «Как в квитанции»: любое превышение нормы — по 2-му и 3-му уровням (так считают энергосбыты РК).</span></div>
      <div class="field"><label>Уведомления</label><button class="btn ghost" id="s-notif">🔔 Разрешить уведомления о перерасходе</button></div>
      <div class="field"><label>Данные</label><div class="btns">
        <button class="btn ghost small" id="s-export">Резервная копия (JSON)</button>
        <label class="btn ghost small" style="cursor:pointer">Импорт JSON / из старой программы<input type="file" accept=".json,application/json" id="s-import" hidden></label>
        <button class="btn ghost small" id="s-onb">Пройти знакомство заново</button>
        <button class="btn danger small" id="s-reset">Сбросить всё</button></div>
        <span class="help">Импорт понимает файл electric_data.json из прошлой версии программы.</span></div>
      <p class="note">EcoҚуат 1.0 · Данные хранятся только на вашем устройстве.<br>Задание №41 «Электр энергиясын есептеу».</p>
      <button class="btn primary" id="s-close">Готово</button>
    </div>`, m => {
    $$("#mode button", m).forEach(b => b.onclick = () => { S.settings.mode = b.dataset.m; save(); $$("#mode button", m).forEach(x => x.classList.toggle("on", x === b)); render(); });
    $("#s-close", m).onclick = closeModal;
    $("#s-notif", m).onclick = async () => {
      if (!("Notification" in window)) { toast("Уведомления не поддерживаются на этом устройстве."); return; }
      const p = await Notification.requestPermission();
      toast(p === "granted" ? "Уведомления включены." : "Уведомления не разрешены.", p === "granted" ? "good" : "");
      if (p === "granted") notify("EcoҚуат", "Мы сообщим, если расход превысит норму.");
    };
    $("#s-export", m).onclick = () => download("ecoquat_backup.json", JSON.stringify(S, null, 2), "application/json");
    $("#s-import", m).onchange = e => { const f = e.target.files[0]; if (f) f.text().then(importJSON); };
    $("#s-onb", m).onclick = () => { closeModal(); onboarding(); };
    $("#s-reset", m).onclick = () => confirmBox("Удалить все данные: историю, дом и свои тарифы?", () => { localStorage.removeItem(STORE_KEY); S = defaultState(); draft = null; render(); onboarding(); }, "Сбросить", true);
  });
}

function importJSON(text) {
  try {
    const d = JSON.parse(text);
    if (d.version && d.home) {           // резервная копия EcoҚуат
      S = Object.assign(defaultState(), d);
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
    } else throw new Error("Неизвестный формат файла.");
    save(); closeModal(); toast(`Импортировано: ${S.records.length} мес.`, "good"); render();
  } catch (e) { toast("Не удалось прочитать файл: " + esc(e.message), "bad"); }
}

/* ================================================================ ЗНАКОМСТВО */
function onboarding() {
  let step = 0;
  const h = S.home;
  const ov = $("#overlay");
  const draw = () => {
    const steps = `<div class="onb-steps">${[0, 1, 2, 3].map(i => `<i class="${i <= step ? "on" : ""}"></i>`).join("")}</div>`;
    let body = "";
    if (step === 0) body = `<div class="onb-hero"><img src="icons/icon-512.png" alt=""><h2>Сәлем! Это <span class="grad-text">EcoҚуат</span></h2>
      <p class="lead">Программа считает оплату за свет по реальным тарифам вашего региона, сравнивает расход с нормой семьи и помогает беречь энергию и природу.</p>
      <div class="feature-list"><div>⚡ Расчёт по 3 уровням тарифа</div><div>👨‍👩‍👧 Норма зависит от числа людей</div><div>🔌 Учёт техники и ламп в доме</div><div>🌍 Углеродный след и эко-советы</div></div>
      <p class="note">Ответьте на 3 вопроса о доме — это займёт минуту.</p></div>`;
    if (step === 1) body = `<h2>Ваша семья и регион</h2><p class="lead">Норма электроэнергии в Казахстане считается на каждого прописанного человека.</p>
      <div class="form"><div class="field"><label>Регион</label><select class="input" id="o-reg">${Object.keys(REGIONS).map(r => `<option ${r === h.region ? "selected" : ""}>${r}</option>`).join("")}</select></div>
      <div class="field"><label>Сколько человек живёт (прописано)?</label>${stepper("persons", h.persons, 1, 20)}</div>
      <label class="switch"><input type="checkbox" id="o-stove" ${h.stove ? "checked" : ""}><span class="track"></span><span>Готовим на электроплите</span></label>
      <div class="banner info" id="o-norm"></div></div>`;
    if (step === 2) body = `<h2>Комнаты и свет</h2><p class="lead">Чем больше комнат, тем больше ламп и расхода на освещение.</p>
      <div class="form"><div class="row"><div class="field"><label>Комнат (с кухней)</label>${stepper("rooms", h.rooms, 1, 20)}</div><div class="field"><label>Ламп в комнате</label>${stepper("lampsPerRoom", h.lampsPerRoom, 1, 12)}</div></div>
      <div class="field"><label>Какие лампы?</label><div class="seg" id="o-lamp">${Object.entries(LAMP_TYPES).map(([k, v]) => `<button data-l="${k}" class="${h.lampType === k ? "on" : ""}">${v.name}</button>`).join("")}</div></div></div>`;
    if (step === 3) body = `<h2>Какая техника есть дома?</h2><p class="lead">Если техники много, превышение нормы будет считаться обоснованным.</p>
      <div class="appl-grid">${APPLIANCES.map(a => `<div class="appl ${h.appliances[a.id] ? "on" : ""}" id="oa-${a.id}"><span class="em">${a.icon}</span><div class="t"><b>${esc(a.name)}</b><small>≈ ${nf1.format(a.kwh)} кВт·ч</small></div>${stepper("ap:" + a.id, h.appliances[a.id] || 0, 0, 20)}</div>`).join("")}</div>
      <div class="banner info mt" id="o-sum"></div>`;
    ov.innerHTML = `<div class="onb"><div class="onb-box fade-in">${steps}${body}
      <div class="onb-foot">${step > 0 ? `<button class="btn ghost" id="o-back">← Назад</button>` : `<span></span>`}
      <button class="btn primary" id="o-next">${step === 3 ? "Готово ✓" : step === 0 ? "Начать →" : "Далее →"}</button></div></div></div>`;
    const box = $(".onb-box", ov);
    const info = () => {
      const F = familyLimits();
      if ($("#o-norm")) $("#o-norm").innerHTML = `<div class="b-ico">📐</div><div><b>Норма вашей семьи: ${kwh(F.norm)} в месяц</b><p>${F.p} чел. × ${F.n1} кВт·ч. Тариф 1-го уровня — ${tg(prices(F.reg, h.stove)[0])}.</p></div>`;
      if ($("#o-sum")) { const e = expectedUsage().total; $("#o-sum").innerHTML = `<div class="b-ico">🔌</div><div><b>Техника и свет ≈ ${kwh(e)} в месяц</b><p>Норма семьи — ${kwh(F.norm)}. ${e > F.norm ? "Техники много: превышение до " + kwh(e) + " будет обоснованным." : "Норма покрывает вашу технику."}</p></div>`; }
    };
    bindSteppers(box, (id, v) => { if (id.startsWith("ap:")) { h.appliances[id.slice(3)] = v; $("#oa-" + id.slice(3)).classList.toggle("on", v > 0); } else h[id] = v; info(); });
    $("#o-reg") && ($("#o-reg").onchange = e => { h.region = e.target.value; info(); });
    $("#o-stove") && ($("#o-stove").onchange = e => { h.stove = e.target.checked; info(); });
    $$("#o-lamp button").forEach(b => b.onclick = () => { h.lampType = b.dataset.l; $$("#o-lamp button").forEach(x => x.classList.toggle("on", x === b)); });
    info();
    $("#o-back") && ($("#o-back").onclick = () => { step--; draw(); });
    $("#o-next").onclick = () => {
      if (step < 3) { step++; draw(); return; }
      S.onboarded = true; save(); ov.innerHTML = ""; render(); toast("Дом настроен! Теперь сделайте первый расчёт.", "good");
    };
  };
  draw();
}

/* ================================================================ СТАРТ */
function init() {
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
