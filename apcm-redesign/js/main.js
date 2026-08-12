/* ============================================================
   A.P.C. MAHALAXMI COLLEGE FOR WOMEN — PREMIUM REDESIGN
   Vanilla JS: data rendering + advanced interactive modules
   ============================================================ */
"use strict";

const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const store = {
  get(k, d) { try { const v = localStorage.getItem("apcm_" + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem("apcm_" + k, JSON.stringify(v)); } catch {} }
};

/* ============================================================
   DATA
   ============================================================ */
const DEPARTMENTS = [
  { ic:"i-lotus", name:"Tamil", badge:"Language", desc:"Celebrating the classical tongue — from Sangam poetics to modern criticism, nurturing scholars rooted in Tamil heritage.", ug:["B.A. Tamil"], pg:["M.A. Tamil"], phd:["Ph.D. Tamil"], estd:1974,
    label:"Tamil", streams:["arts","science","commerce"], ints:["lang","research"] },
  { ic:"i-quill", name:"English", badge:"Language", desc:"Literature, language and soft-skills training that open global doors while honing voice, confidence and critical thought.", ug:["B.A. English"], pg:["M.A. English"], phd:["Ph.D. English"], estd:1974,
    label:"English", streams:["arts","science","commerce"], ints:["lang","research"] },
  { ic:"i-scroll", name:"History", badge:"Humanities", desc:"Exploring civilisations, culture and the freedom movement of southern Tamil Nadu — producing custodians of our past.", ug:["B.A. History"], pg:[], phd:[], estd:1980,
    label:"History", streams:["arts"], ints:["society","teach"] },
  { ic:"i-pi", name:"Mathematics", badge:"Science", desc:"A legacy department with research strength in pure and applied mathematics, known for consistent university ranks.", ug:["B.Sc. Mathematics"], pg:["M.Sc. Mathematics"], phd:["M.Phil.","Ph.D."], estd:1974,
    label:"Mathematics", streams:["science","commerce"], ints:["math","research","teach"] },
  { ic:"i-atom", name:"Physics", badge:"Science", desc:"Hands-on laboratories and a culture of inquiry — from electronics to materials science and beyond.", ug:["B.Sc. Physics"], pg:["M.Sc. Physics"], phd:[], estd:1981,
    label:"Physics", streams:["science"], ints:["lab","math","research"] },
  { ic:"i-flask", name:"Chemistry", badge:"Science", desc:"Well-equipped wet and instrumental labs powering research in green chemistry, phytochemistry and materials.", ug:["B.Sc. Chemistry"], pg:["M.Sc. Chemistry"], phd:["Ph.D. Chemistry"], estd:1979,
    label:"Chemistry", streams:["science"], ints:["lab","research"] },
  { ic:"i-micro", name:"Zoology", badge:"Science", desc:"Field-to-lab learning across biodiversity, vermitech and coastal ecology of the Gulf of Mannar region.", ug:["B.Sc. Zoology"], pg:["M.Sc. Zoology"], phd:[], estd:1982,
    label:"Zoology", streams:["science"], ints:["lab","research"] },
  { ic:"i-chip", name:"Computer Science", badge:"Technology", desc:"Modern computing labs, coding clubs and industry certifications — from programming fundamentals to AI & data.", ug:["B.Sc. CS","B.C.A."], pg:["M.Sc. CS"], phd:[], estd:1994,
    label:"Computer Science", streams:["science","commerce"], ints:["tech","math"] },
  { ic:"i-coin", name:"Commerce", badge:"Commerce", desc:"Accounting, banking, taxation and entrepreneurship — with a research wing and strong professional orientation.", ug:["B.Com.","B.Com. (CA)"], pg:["M.Com."], phd:["Ph.D. Commerce"], estd:1985,
    label:"Commerce", streams:["commerce"], ints:["biz","math"] },
];

const EVENTS = [
  { d:"07", m:"Aug 2026", cat:"Inter-School Extravaganza", title:"APCian CARNIVAL 2K26", desc:"A grand inter-school extravaganza blending academics and culture — sparking knowledge, creativity, teamwork and healthy competition among young minds.", venue:"College Auditorium" },
  { d:"22", m:"Aug 2026", cat:"National Seminar", title:"Green Chemistry Frontiers", desc:"UGC-sponsored national seminar by the PG & Research Department of Chemistry with invited talks and paper presentations.", venue:"Science Block" },
  { d:"04", m:"Sep 2026", cat:"Inter-Collegiate", title:"Vaanavil Literary Fest", desc:"Departments of Tamil & English host a vibrant celebration of words — oratory, poetry, drama and creative writing.", venue:"Open-Air Theatre" },
  { d:"12", m:"Sep 2026", cat:"Workshop", title:"AI & Data Careers Bootcamp", desc:"A two-day hands-on workshop by the Department of Computer Science on machine learning tools and career pathways.", venue:"CS Laboratory" },
  { d:"10", m:"Oct 2026", cat:"Sports", title:"Annual Sports Day 2K26", desc:"Track, field and team events with the march-past, house championship and felicitation of achievers.", venue:"College Ground" },
];

const ANNOUNCEMENTS = [
  { d:"11", m:"Aug 2026", cat:"Admissions", t:"Admissions 2026–27: Round-3 counselling schedule published for UG & PG programmes", venue:"Admission Cell", fresh:true,
    body:"The third round of merit-based counselling for UG and PG programmes begins next week. Shortlisted applicants will receive SMS alerts from the admission cell with their date and time slot. Carry original marksheets, transfer certificate, community certificate and Aadhaar for verification. Seats remaining vacant after this round will be notified on the notice board and the college portal." },
  { d:"09", m:"Aug 2026", cat:"Events", t:"APCian CARNIVAL 2K26 — inter-school registrations close soon", venue:"Cultural Committee", fresh:true,
    body:"Schools across Thoothukudi district are invited to register teams for APCian CARNIVAL 2K26 — our flagship inter-school extravaganza featuring quiz, oratory, cooking-without-fire, rangoli, dance and science-model displays. Registration closes three days before the event; entry is free and certificates will be awarded to all participants." },
  { d:"08", m:"Aug 2026", cat:"Academic", t:"Odd-semester reopening — senior UG & PG classes resume; day order reset to I", venue:"Office of the Principal", fresh:true,
    body:"Classes for II- and III-year UG and II-year PG students resume this Monday. The academic day-order cycle resets to Day Order I. Students must report by 9:15 AM in uniform with their updated ID cards. Department-wise time tables are posted on the ERP and department notice boards." },
  { d:"06", m:"Aug 2026", cat:"Exams", t:"M.S. University even-semester results published — revaluation window open", venue:"Controller Section", fresh:true,
    body:"Even-semester examination results are now available on the university portal. Students seeking revaluation or photocopy of answer scripts must apply through the college controller section within 10 working days, with the prescribed fee. Supplementary exam registration for arrear papers opens simultaneously." },
  { d:"05", m:"Aug 2026", cat:"Scholarships", t:"Pudhumai Penn & Post-Matric scholarship renewal — submit documents before month-end", venue:"Scholarship Desk", fresh:false,
    body:"All eligible students receiving Pudhumai Penn (₹1,000/month), BC/MBC/DNC and SC/ST Post-Matric scholarships must submit renewal documents — Aadhaar, bank passbook copy, EMIS/UMIS ID and previous-year marksheet — at the scholarship desk before the last working day of this month. New first-year applicants will be onboarded during orientation week." },
  { d:"01", m:"Aug 2026", cat:"Admin", t:"IQAC: criteria-wise documentation drive for the upcoming NAAC cycle begins", venue:"IQAC Room", fresh:false,
    body:"The Internal Quality Assurance Cell commences its criteria-wise documentation drive in preparation for the forthcoming NAAC accreditation cycle. Department IQAC coordinators are requested to upload evidence files to the ERP repository as per the shared templates. A review meeting with all heads of departments will follow next fortnight." },
  { d:"28", m:"Jul 2026", cat:"Events", t:"Ramanujan Club guest-lecture series — registration open to all STEM students", venue:"Dept. of Mathematics", fresh:false,
    body:"The Department of Mathematics invites registrations for the Ramanujan Club guest-lecture series, featuring talks by university faculty on problem-solving, competitive examinations (TRB/NET/SET) and careers in data science. Seats are limited; inter-departmental participation is encouraged." },
  { d:"21", m:"Jul 2026", cat:"Alumni", t:"Alumnae Association annual meet — alumnae warmly invited to register online", venue:"Alumnae Cell", fresh:false,
    body:"The Alumnae Association's annual meet will be held on campus with cultural programmes, a networking hour and the felicitation of distinguished alumnae. Graduates of all batches are warmly invited; registration is open through the ERP portal. Alumnae interested in mentoring current students may indicate their interest in the form." },
];

const TESTIMONIALS = [
  { q:"The campus shaped my confidence as much as my career. The teachers saw potential in me before I saw it in myself — I walked in shy, and walked out a researcher.", w:"K. Selvi", r:"M.Sc. Chemistry, Batch of 2022 · Research Scholar" },
  { q:"Coming from a small village near Ettayapuram, everything here was a first — first lab, first stage, first leadership role. This college made a first-generation graduate bold.", w:"M. Anandhi", r:"B.A. Tamil, Batch of 2020 · Government School Teacher" },
  { q:"From coding club to placement training, the Computer Science department gave us wings. The values we imbibed — courage and discipline — stay with me at work every day.", w:"P. Ranjitha", r:"B.Sc. CS, Batch of 2023 · Software Engineer" },
];

const FAQS = [
  { q:"Which university is the college affiliated to?", a:"A.P.C. Mahalaxmi College for Women is affiliated to Manonmaniam Sundaranar University, Tirunelveli, and is recognised by the UGC under Sections 2(f) and 12(B). The college is reaccredited by NAAC with 'A+' grade (CGPA 3.42/4.00) and ranked 88th in NIRF India Rankings 2025." },
  { q:"How do I apply for admission?", a:"Applications are invited online every year after the Plus Two results. Fill the enquiry/apply form on this site or the college ERP portal, upload your documents, and provisional selection is strictly merit-based — no entrance exam for most programmes." },
  { q:"Are scholarships available for students?", a:"Yes. Eligible students benefit from Government Post-Matric scholarships, BC/MBC/DNC and SC/ST scholarships, First-Graduate fee concessions and the Tamil Nadu Government's Pudhumai Penn scheme, besides management-supported aid for deserving rural students." },
  { q:"Does the college offer research programmes?", a:"Research is a growing strength — M.Phil. and Ph.D. programmes are offered in disciplines including Mathematics, Chemistry, Commerce, Tamil and English, guided by recognised research supervisors." },
  { q:"What student support services exist on campus?", a:"Students are mentored through the tutor–ward system and supported by the Career Guidance & Placement Cell, Counselling Cell, Anti-Ragging and Grievance Redressal committees, Women Empowerment Cell, NSS, YRC, sports and fine-arts clubs." },
];

const TICKER_ITEMS = [
  "Ranked 88th in NIRF India Rankings 2025 · NAAC 'A+' Grade (CGPA 3.42/4.00)",
  "APCian CARNIVAL 2K26 — Inter-School Extravaganza on 07 Aug 2026",
  "Admissions 2026–27 · Round-3 counselling schedule published",
  "Even-semester results published — revaluation window open",
  "Pudhumai Penn & Post-Matric scholarship renewal — apply before month-end",
];

const NAV = [
  { label:"Home", href:"#home" },
  { label:"About Us", children:[
      ["Our Story","#about","i-scroll"],
      ["Vision & Mission","#about","i-star"],
      ["Leadership","#leadership","i-users"],
      ["Milestones","#legacy","i-clock"],
    ]},
  { label:"Academics", children:[
      ["Programmes Offered","#programmes","i-book"],
      ["Programme Finder","#finder","i-star"],
      ["Campus Insights","#insights","i-pi"],
      ["Academic Calendar","https://www.apcmcollege.ac.in/academic-calendar","i-cal"],
    ]},
  { label:"Departments", children:[
      ["All Departments","#programmes","i-book"],
      ["Tamil","#programmes","i-lotus"],
      ["English","#programmes","i-quill"],
      ["History","#programmes","i-scroll"],
      ["Mathematics","#programmes","i-pi"],
      ["Physics","#programmes","i-atom"],
      ["Chemistry","#programmes","i-flask"],
      ["Zoology","#programmes","i-micro"],
      ["Computer Science","#programmes","i-chip"],
      ["Commerce","#programmes","i-coin"],
    ]},
  { label:"Research", children:[
      ["APCian Research Forum","#research","i-atom"],
      ["Research Departments","#research","i-book"],
      ["Journal Publications","#research","i-quill"],
      ["IIC & EDC","#research","i-star"],
    ]},
  { label:"Student Support", children:[
      ["Student Welfare","#support","i-users"],
      ["Amenities","#support","i-pin"],
      ["Mahalaxmiammal Memorial Scholarship","#support","i-coin"],
      ["Library","#support","i-book"],
      ["Puthumai Penn Thittam","#support","i-grad"],
      ["Clubs & Cells","#support","i-star"],
      ["Extension & Outreach","#support","i-globe"],
      ["Sports","#support","i-award"],
    ]},
  { label:"Admissions", href:"#admissions" },
  { label:"Contact", href:"#contact" },
];

const FINDER_INTERESTS = [
  ["lang","Languages & Literature"], ["society","Society & History"], ["math","Numbers & Logic"],
  ["lab","Lab & Life Sciences"], ["tech","Computers & Tech"], ["biz","Business & Accounts"],
  ["research","Teaching & Research"], ["teach","Teaching & Mentoring"],
];

const CHARTS = {
  donut: [
    { label:"Science", val:46, color:"#156f82" },
    { label:"Arts & Humanities", val:26, color:"#c9962f" },
    { label:"Commerce", val:18, color:"#4f8e9e" },
    { label:"Computer Science", val:10, color:"#5d7a5d" },
  ],
  bars: [
    { y:"2021", v:985 }, { y:"2022", v:1080 }, { y:"2023", v:1150 },
    { y:"2024", v:1240 }, { y:"2025", v:1310 }, { y:"2026", v:1347 },
  ],
};

/* ============================================================
   ICON HELPER
   ============================================================ */
const icon = (id, cls = "icon") => `<svg class="${cls}" aria-hidden="true"><use href="#${id}"></use></svg>`;

/* ============================================================
   1. PRELOADER
   ============================================================ */
(function preloader() {
  const pl = $("#preloader");
  const done = () => pl.classList.add("done");
  window.addEventListener("load", () => setTimeout(done, 450));
  setTimeout(done, 3200);
})();

/* ============================================================
   2. THEME + FONT SIZE
   ============================================================ */
(function themeCtl() {
  const root = document.documentElement;
  const apply = t => { root.dataset.theme = t; $$(".theme-ic-sun").forEach(e => e.style.display = t === "dark" ? "none" : ""); $$(".theme-ic-moon").forEach(e => e.style.display = t === "dark" ? "" : "none"); };
  apply(store.get("theme", "light"));
  $$("[data-theme-toggle]").forEach(b => b.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    apply(next); store.set("theme", next);
  }));
  let fs = store.get("fs", 2);
  const setFs = v => { fs = Math.min(3, Math.max(1, v)); root.classList.remove("fs-1", "fs-3"); if (fs !== 2) root.classList.add("fs-" + fs); store.set("fs", fs); };
  setFs(fs);
  $("#fontMinus")?.addEventListener("click", () => setFs(fs - 1));
  $("#fontPlus")?.addEventListener("click", () => setFs(fs + 1));
})();

/* ============================================================
   3. NAV
   ============================================================ */
(function nav() {
  const ul = $("#navMenu");
  ul.innerHTML = NAV.map(n => n.children
    ? `<li class="drop">
         <a href="${n.children[0][1]}" aria-haspopup="true">${n.label}${icon("i-chev")}</a>
         <ul class="dd" role="menu">${n.children.map(([t, h, i]) =>
           `<li role="none"><a role="menuitem" href="${h}">${icon(i)}${t}</a></li>`).join("")}
         </ul>
       </li>`
    : `<li><a href="${n.href}" data-spy="${n.href}">${n.label}</a></li>`
  ).join("");

  const d = $("#drawerNav");
  d.innerHTML = NAV.map(n => n.children
    ? `<li>
         <a href="javascript:void(0)" class="d-parent">${n.label}${icon("i-chev")}</a>
         <ul class="sub">${n.children.map(([t, h]) => `<li><a href="${h}">${icon("i-arrow")}${t}</a></li>`).join("")}</ul>
       </li>`
    : `<li><a href="${n.href}">${n.label}${icon("i-arrow")}</a></li>`
  ).join("");
  $$(".d-parent", d).forEach(p => p.addEventListener("click", () => {
    const li = p.parentElement, was = li.classList.contains("open");
    $$("#drawerNav li").forEach(x => x.classList.remove("open"));
    if (!was) li.classList.add("open");
  }));

  const drawer = $("#drawer"), ov = $("#ov");
  const close = () => { drawer.classList.remove("open"); ov.classList.remove("on"); document.body.style.overflow = ""; };
  $("#burger").addEventListener("click", () => { drawer.classList.add("open"); ov.classList.add("on"); document.body.style.overflow = "hidden"; });
  $("#drawerClose").addEventListener("click", close);
  ov.addEventListener("click", close);
  d.addEventListener("click", e => { if (e.target.closest("a") && !e.target.closest(".d-parent")) close(); });
  drawer.addEventListener("click", e => { if (e.target.closest(".cta a, .cta button[data-apply]")) close(); });

  const header = $(".site-header");
  let lastY = 0;
  addEventListener("scroll", () => {
    const y = scrollY;
    header.classList.toggle("scrolled", y > 30);
    header.classList.toggle("hide", y > 420 && y > lastY);
    lastY = y;
    $("#toTop").classList.toggle("show", y > 700);
    $(".progress").style.width = (y / (document.body.scrollHeight - innerHeight) * 100) + "%";
  }, { passive: true });

  const secs = $$("section[id]");
  const links = $$("#navMenu a[data-spy]");
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle("active", a.dataset.spy === "#" + e.target.id));
  }), { rootMargin: "-40% 0px -55% 0px" });
  secs.forEach(s => spy.observe(s));

  $("#toTop").addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
})();

/* ============================================================
   4. DAY ORDER (shared with chatbot)
   ============================================================ */
(function dayOrder() {
  const ROMAN = ["I", "II", "III", "IV", "V", "VI"];
  const el = $("#dayOrder");
  const today = new Date(); today.setHours(0, 0, 0, 0);
  let text;
  if (today.getDay() === 0) {
    text = "Today is a holiday — Sunday";
  } else {
    let start = new Date(today.getFullYear(), 5, 15); // ≈ odd sem start (Jun 15) — configurable
    if (today < start) start = new Date(today.getFullYear() - 1, 11, 19); // even sem ≈ Dec 19
    let working = 0;
    for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) if (d.getDay() !== 0) working++;
    const dateStr = today.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" });
    text = `Day Order ${ROMAN[(working - 1) % 6]} · ${dateStr}`;
  }
  window.__dayOrderText = text;
  if (el) {
    const [bold, rest] = text.split("·").map(s => s.trim());
    el.innerHTML = rest ? `${icon("i-cal")} <b>${bold}</b> · ${rest}` : `${icon("i-cal")} ${bold}`;
  }
})();

/* ============================================================
   5. TICKER
   ============================================================ */
(function ticker() {
  const seq = TICKER_ITEMS.map(t => `<a href="#announcements"><i class="dot"></i>${t}</a>`).join("");
  $("#tickerTrack").innerHTML = seq + seq;
})();

/* ============================================================
   6. COUNTERS + REVEAL
   ============================================================ */
(function motion() {
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const count = el => {
    const target = +el.dataset.count, suffix = el.dataset.suffix || "", dur = 1600;
    const t0 = performance.now();
    (function tick(now) {
      const p = Math.min(1, (now - t0) / dur);
      el.textContent = Math.round(target * easeOut(p)).toLocaleString("en-IN");
      if (p < 1) requestAnimationFrame(tick); else if (suffix) el.insertAdjacentHTML("beforeend", `<small>${suffix}</small>`);
    })(t0);
  };
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    $$("[data-count]", e.target).forEach(count);
    if (e.target.dataset.count) count(e.target);
    io.unobserve(e.target);
  }), { threshold: .18 });
  $$("[data-reveal],[data-count]").forEach(el => io.observe(el));

  $$(".prog-grid,.tree-grid,.why-grid,.steps,.timeline,.sup-grid").forEach(g => {
    $$(":scope>*", g).forEach((c, i) => {
      c.style.setProperty("transition-delay", (i % 4) * 70 + "ms");
      new IntersectionObserver((es, i2) => es.forEach(e => {
        if (e.isIntersecting) { setTimeout(() => c.style.removeProperty("transition-delay"), 950); i2.disconnect(); }
      }), { threshold: .12 }).observe(c);
    });
  });
})();

/* ============================================================
   7. DEPARTMENTS
   ============================================================ */
(function programmes() {
  const grid = $("#progGrid");
  const card = d => `
    <article class="prog-card" data-reveal>
      <div class="pc-top">
        <span class="pc-ic">${icon(d.ic)}</span>
        <span class="pc-badge">${d.badge}</span>
      </div>
      <h3>${d.label}</h3>
      <p>${d.desc}</p>
      <div class="pc-tags">
        ${d.ug.map(p => `<span>${p}</span>`).join("")}
        ${d.pg.map(p => `<span class="pg">${p}</span>`).join("")}
        ${d.phd.map(p => `<span class="phd">${p}</span>`).join("")}
      </div>
      <div class="pc-foot">
        <span>Estd. ${d.estd} · Aided &amp; Self-Financed</span>
        <a href="#contact">Enquire ${icon("i-arrow")}</a>
      </div>
    </article>`;
  const render = f => {
    const list = DEPARTMENTS.filter(d =>
      f === "all" ? true : f === "ug" ? d.ug.length : f === "pg" ? d.pg.length : d.phd.length);
    grid.innerHTML = list.map(card).join("");
    requestAnimationFrame(() => $$(".prog-card", grid).forEach(c => c.classList.add("in")));
  };
  render("all");
  $$(".tab").forEach(t => t.addEventListener("click", () => {
    $$(".tab").forEach(x => x.classList.remove("active"));
    t.classList.add("active");
    render(t.dataset.filter);
  }));
})();

/* ============================================================
   8. PROGRAMME FINDER
   ============================================================ */
(function finder() {
  const HOST = $("#finder");
  if (!HOST) return;
  const picked = { stream: null, ints: new Set() };

  // interests chips
  $("#intChips").innerHTML = FINDER_INTERESTS.map(([v, t]) =>
    `<button type="button" class="chip-int" data-v="${v}">${t}</button>`).join("");

  $$(".stream-opt", HOST).forEach(b => b.addEventListener("click", () => {
    picked.stream = b.dataset.stream;
    $$(".stream-opt", HOST).forEach(x => x.classList.remove("on"));
    b.classList.add("on");
    HOST.classList.add("touched");
  }));
  $$(".chip-int", HOST).forEach(c => c.addEventListener("click", () => {
    const v = c.dataset.v;
    picked.ints.has(v) ? picked.ints.delete(v) : picked.ints.add(v);
    c.classList.toggle("on");
    HOST.classList.add("touched");
  }));

  const results = () => {
    if (!picked.stream) return null;
    return DEPARTMENTS.map(d => {
      let s = d.streams.includes(picked.stream) ? 45 : 0;
      picked.ints.forEach(i => { if (d.ints.includes(i)) s += d.ints.length > 2 ? 15 : 20; });
      if (!picked.ints.size) s += 10;
      return { ...d, score: Math.min(100, s) };
    }).filter(d => d.score > 0).sort((a, b) => b.score - a.score).slice(0, 4);
  };

  const OUT = $("#finderOut");
  const paint = () => {
    const r = results();
    if (!r) {
      OUT.innerHTML = `<div class="f-empty">${icon("i-star", "icon")}<b>Ready when you are</b><span>Pick your Plus-Two stream and interests to see your best-fit programmes.</span></div>`;
      return;
    }
    if (!r.length) {
      OUT.innerHTML = `<div class="f-empty">${icon("i-x", "icon")}<b>No direct match</b><span>Try adding interests — or talk to our admission cell for guidance.</span></div>`;
      return;
    }
    OUT.innerHTML = r.map((d, i) => `
      <div class="f-res" style="animation-delay:${i * 90}ms">
        <div class="f-res-h">
          <span class="pc-ic" style="width:44px;height:44px;border-radius:12px">${icon(d.ic)}</span>
          <div><b>${d.label}</b><small>${d.badge} · Estd. ${d.estd}</small></div>
          <span class="f-score">${d.score}%</span>
        </div>
        <div class="f-bar"><i style="--w:${d.score}%"></i></div>
        <div class="pc-tags" style="margin-top:.7rem">
          ${d.ug.map(p => `<span>${p}</span>`).join("")}${d.pg.map(p => `<span class="pg">${p}</span>`).join("")}
        </div>
        <button class="btn btn-primary btn-sm f-apply" data-apply data-prog="${d.ug[0] || d.pg[0]}">Apply for ${d.ug[0] || d.pg[0]} ${icon("i-arrow")}</button>
      </div>`).join("");
    requestAnimationFrame(() => $$(".f-bar i", OUT).forEach(b => b.classList.add("play")));
    $$(".f-apply", OUT).forEach(b => b.addEventListener("click", e => { e.preventDefault(); $("#applyOv").classList.add("on"); document.body.style.overflow = "hidden"; }));
  };
  $("#findBtn").addEventListener("click", () => {
    if (!picked.stream) { $("#finderOut").scrollIntoView({ behavior: "smooth", block: "center" }); }
    paint();
    if (picked.stream) OUT.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
  $("#findReset").addEventListener("click", () => {
    picked.stream = null; picked.ints.clear();
    $$(".stream-opt,.chip-int", HOST).forEach(x => x.classList.remove("on"));
    paint();
  });
  paint();
})();

/* ============================================================
   9. INSIGHTS DASHBOARD (charts animate on view)
   ============================================================ */
(function insights() {
  const donutEl = $("#donut"), barsEl = $("#barsChart");
  if (!donutEl) return;
  // donut (r=15.9155 => circumference = 100)
  let acc = 0;
  const segs = CHARTS.donut.map(s => {
    const el = `<circle class="d-seg" cx="21" cy="21" r="15.9155" fill="none" stroke="${s.color}" stroke-width="6"
      stroke-dasharray="0 100" data-final="${s.val} ${100 - s.val}" stroke-dashoffset="${25 - acc}"/>`;
    acc += s.val; return el;
  }).join("");
  donutEl.innerHTML = `
    <svg viewBox="0 0 42 42" class="donut-svg" role="img" aria-label="Students by stream">
      <circle cx="21" cy="21" r="15.9155" fill="none" stroke="var(--line)" stroke-width="6"/>
      ${segs}
    </svg>
    <div class="donut-c"><b>1,347</b><span>students</span></div>`;
  $("#donutLegend").innerHTML = CHARTS.donut.map(s =>
    `<li><i style="background:${s.color}"></i>${s.label}<b>${s.val}%</b></li>`).join("");
  // bars
  const max = Math.max(...CHARTS.bars.map(b => b.v));
  barsEl.innerHTML = CHARTS.bars.map(b => `
    <div class="bc">
      <span class="bc-v">${b.v.toLocaleString("en-IN")}</span>
      <div class="bc-bar"><i data-final="${Math.round(b.v / max * 88) + 6}"></i></div>
      <span class="bc-y">${b.y}</span>
    </div>`).join("");
  // play on view
  new IntersectionObserver((es, io) => es.forEach(e => {
    if (!e.isIntersecting) return;
    $$(".d-seg").forEach((c, i) => setTimeout(() => c.setAttribute("stroke-dasharray", c.dataset.final), 250 + i * 180));
    $$(".bc-bar i").forEach((b, i) => setTimeout(() => b.style.height = b.dataset.final + "%", 250 + i * 120));
    io.disconnect();
  }), { threshold: .35 }).observe($("#insights"));
})();

/* ============================================================
   10. EVENTS SLIDER
   ============================================================ */
(function events() {
  const track = $("#evtTrack"), dots = $("#evtDots");
  track.innerHTML = EVENTS.map(e => `
    <article class="evt-card">
      <div class="evt-head">
        <div class="evt-date"><b>${e.d}</b><span>${e.m}</span></div>
        <div><span class="evt-cat">${e.cat}</span><h3>${e.title}</h3></div>
      </div>
      <p>${e.desc}</p>
      <div class="evt-foot">
        <span>${icon("i-pin")} ${e.venue}</span>
        <a href="#contact">Details ${icon("i-arrow")}</a>
      </div>
    </article>`).join("");
  let page = 0, per = innerWidth <= 640 ? 1 : innerWidth <= 980 ? 2 : 3, timer;
  const pages = () => Math.ceil(EVENTS.length / per);
  const renderDots = () => {
    dots.innerHTML = Array.from({ length: pages() }, (_, i) =>
      `<button aria-label="Events page ${i + 1}" class="${i === page ? "on" : ""}"></button>`).join("");
    $$("button", dots).forEach((b, i) => b.addEventListener("click", () => go(i)));
  };
  function go(p) {
    page = (p + pages()) % pages();
    track.style.transform = `translateX(calc(${-page * 100}% - ${page * 1.4}rem))`;
    renderDots();
  }
  $("#evtPrev").addEventListener("click", () => go(page - 1));
  $("#evtNext").addEventListener("click", () => go(page + 1));
  const auto = () => { clearInterval(timer); timer = setInterval(() => go(page + 1), 5200); };
  $(".evt-shell").addEventListener("mouseenter", () => clearInterval(timer));
  $(".evt-shell").addEventListener("mouseleave", auto);
  addEventListener("resize", () => { const np = innerWidth <= 640 ? 1 : innerWidth <= 980 ? 2 : 3; if (np !== per) { per = np; go(0); } });
  go(0); auto();
})();

/* ============================================================
   11. ANNOUNCEMENTS CENTER (search + filter + detail modal)
   ============================================================ */
(function announcements() {
  const grid = $("#annGrid"), cats = [...new Set(ANNOUNCEMENTS.map(a => a.cat))];
  let q = "", cat = "All", shown = 4;
  $("#annChips").innerHTML = ["All", ...cats].map(c =>
    `<button class="chip-cat${c === "All" ? " on" : ""}" data-c="${c}">${c}</button>`).join("");

  const filtered = () => ANNOUNCEMENTS.filter(a =>
    (cat === "All" || a.cat === cat) &&
    (!q || (a.t + a.body + a.cat).toLowerCase().includes(q)));

  const paint = () => {
    const list = filtered();
    $("#annCount").textContent = `${list.length} notice${list.length === 1 ? "" : "s"}`;
    grid.innerHTML = list.slice(0, shown).map((a, i) => `
      <div class="ann-item" data-ix="${ANNOUNCEMENTS.indexOf(a)}" data-reveal style="animation-delay:${i * 60}ms">
        <div class="ann-date"><b>${a.d}</b><span>${a.m}</span></div>
        <div>
          <h4>${a.t}${a.fresh ? '<span class="pill-new">New</span>' : ""}</h4>
          <small>${icon("i-pin")} ${a.venue} · <em class="ann-cat">${a.cat}</em></small>
        </div>
      </div>`).join("") ||
      `<div class="f-empty" style="grid-column:1/-1">${icon("i-x","icon")}<b>Nothing found</b><span>Try a different keyword or category.</span></div>`;
    $$(".ann-item", grid).forEach(el => {
      el.classList.add("in");
      el.addEventListener("click", () => openAnn(+el.dataset.ix));
    });
    $("#annMore").style.display = list.length > shown ? "" : "none";
    $("#annMore").textContent = `Show ${Math.min(4, list.length - shown)} more (${list.length - shown} left)`;
  };

  $$("#annChips .chip-cat").forEach(b => b.addEventListener("click", () => {
    $$("#annChips .chip-cat").forEach(x => x.classList.remove("on"));
    b.classList.add("on"); cat = b.dataset.c; shown = 4; paint();
  }));
  $("#annSearch").addEventListener("input", e => { q = e.target.value.trim().toLowerCase(); shown = 4; paint(); });
  $("#annMore").addEventListener("click", () => { shown += 4; paint(); });

  // detail modal
  const ov = $("#annOv");
  function openAnn(ix) {
    const a = ANNOUNCEMENTS[ix];
    $("#annTitle").textContent = a.t;
    $("#annMeta").innerHTML = `<span class="ann-cat-pill">${a.cat}</span> ${a.d} ${a.m} · ${a.venue}`;
    $("#annBody").textContent = a.body;
    ov.classList.add("on"); document.body.style.overflow = "hidden";
  }
  $("#annClose").addEventListener("click", () => { ov.classList.remove("on"); document.body.style.overflow = ""; });
  ov.addEventListener("click", e => { if (e.target === ov) { ov.classList.remove("on"); document.body.style.overflow = ""; } });
  paint();
})();

/* ============================================================
   12. TESTIMONIALS
   ============================================================ */
(function testimonials() {
  const track = $("#tTrack"), dots = $("#tDots");
  track.innerHTML = TESTIMONIALS.map(t => `
    <div class="t-slide">
      <div class="t-stars">${icon("i-star-fill").repeat(5)}</div>
      <span class="t-quote-mark">“</span>
      <blockquote>${t.q}</blockquote>
      <div class="t-who"><b>${t.w}</b><span>${t.r}</span></div>
    </div>`).join("");
  let i = 0, tm;
  const renderDots = () => {
    dots.innerHTML = TESTIMONIALS.map((_, x) => `<button aria-label="Testimonial ${x + 1}" class="${x === i ? "on" : ""}"></button>`).join("");
    $$("button", dots).forEach((b, x) => b.addEventListener("click", () => { go(x); restart(); }));
  };
  function go(n) {
    i = (n + TESTIMONIALS.length) % TESTIMONIALS.length;
    track.style.transform = `translateX(-${i * 100}%)`;
    renderDots();
  }
  const restart = () => { clearInterval(tm); tm = setInterval(() => go(i + 1), 6000); };
  go(0); restart();
})();

/* ============================================================
   13. FAQ
   ============================================================ */
(function faq() {
  const list = $("#faqList");
  list.innerHTML = FAQS.map(f => `
    <div class="faq-item">
      <button class="faq-q" aria-expanded="false">${f.q}<span class="fx">${icon("i-plus")}</span></button>
      <div class="faq-a"><p>${f.a}</p></div>
    </div>`).join("");
  $$(".faq-q", list).forEach(b => b.addEventListener("click", () => {
    const item = b.parentElement, open = item.classList.contains("open");
    $$(".faq-item", list).forEach(x => { x.classList.remove("open"); $(".faq-a", x).style.maxHeight = null; $(".faq-q", x).setAttribute("aria-expanded", "false"); });
    if (!open) {
      item.classList.add("open");
      const a = $(".faq-a", item);
      a.style.maxHeight = a.scrollHeight + "px";
      b.setAttribute("aria-expanded", "true");
    }
  }));
})();

/* ============================================================
   14. LIGHTBOX
   ============================================================ */
(function lightbox() {
  const lb = $("#lb"), img = $("#lbImg");
  $$(".fac-item img, .about-media img").forEach(im => im.addEventListener("click", () => {
    img.src = im.src; img.alt = im.alt || "Campus image";
    lb.classList.add("on"); document.body.style.overflow = "hidden";
  }));
  const close = () => { lb.classList.remove("on"); document.body.style.overflow = ""; };
  lb.addEventListener("click", e => { if (e.target !== img) close(); });
  addEventListener("keydown", e => e.key === "Escape" && close());
})();

/* ============================================================
   15. MODAL + FORMS + TOAST
   ============================================================ */
(function forms() {
  const toast = msg => {
    const t = $("#toast");
    $("#toastMsg").textContent = msg;
    t.classList.add("show");
    clearTimeout(t._tm);
    t._tm = setTimeout(() => t.classList.remove("show"), 4200);
  };
  window.__toast = toast;

  const ov = $("#applyOv");
  const open = () => { ov.classList.add("on"); document.body.style.overflow = "hidden"; };
  const close = () => { ov.classList.remove("on"); document.body.style.overflow = ""; };
  $$("[data-apply]").forEach(b => b.addEventListener("click", e => { e.preventDefault(); open(); }));
  $("#applyClose").addEventListener("click", close);
  ov.addEventListener("click", e => { if (e.target === ov) close(); });
  addEventListener("keydown", e => e.key === "Escape" && close());
  window.__openApply = open;

  const progSel = $("#a_prog");
  const opts = DEPARTMENTS.flatMap(d => [...d.ug, ...d.pg, ...d.phd].map(p => p + (p.startsWith(d.name) ? "" : " — " + d.name)));
  progSel.innerHTML = `<option value="">Select a programme…</option>` + [...new Set(opts)].map(o => `<option>${o}</option>`).join("");

  const validate = form => {
    let ok = true;
    $$("[required]", form).forEach(f => {
      const g = f.closest(".f-group");
      const bad = !f.value.trim() || (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value)) || (f.type === "tel" && !/^[\d+\-\s]{10,14}$/.test(f.value));
      g.classList.toggle("err", bad);
      if (bad) ok = false;
    });
    return ok;
  };
  const bind = (id, okMsg) => {
    const form = $(id);
    form?.addEventListener("submit", e => {
      e.preventDefault();
      if (!validate(form)) { toast("Please fill the highlighted fields correctly."); return; }
      const data = Object.fromEntries(new FormData(form).entries());
      const saved = store.get("enquiries", []); saved.push({ ...data, at: new Date().toISOString() }); store.set("enquiries", saved);
      form.reset();
      $$(".f-group", form).forEach(g => g.classList.remove("err"));
      close();
      toast(okMsg);
    });
    form?.addEventListener("input", e => e.target.closest(".f-group")?.classList.remove("err"));
  };
  bind("#applyForm", "Application received! Our admission cell will contact you shortly.");
  bind("#contactForm", "Message sent! Thank you for reaching out to us.");
  bind("#newsForm", "Subscribed! You'll now receive APCM updates.");
})();

/* ============================================================
   16. APCM ASSIST — rule-based campus chatbot
   ============================================================ */
(function bot() {
  const fab = $("#botFab"), panel = $("#botPanel"), msgs = $("#botMsgs"), input = $("#botInput");
  if (!fab) return;
  let greeted = false;

  fab.addEventListener("click", () => {
    const open = panel.classList.toggle("on");
    fab.classList.toggle("off", open);
    if (open && !greeted) {
      greeted = true;
      say("Hello! 🙏 I'm <b>APCM Assist</b>, your campus helpdesk. Ask me about admissions, programmes, scholarships, day order, events or how to reach us — or tap a quick topic below.");
    }
    if (open) setTimeout(() => input.focus(), 350);
  });
  $("#botClose").addEventListener("click", () => { panel.classList.remove("on"); fab.classList.remove("off"); });

  const RULES = [
    { k:["naac","nirf","rank","grade","accredit"], a:"Great question to ask! 🏆 We're <b>reaccredited by NAAC with 'A+' Grade (CGPA 3.42/4.00)</b> and <b>ranked 88th in NIRF India Rankings 2025</b> — among the top colleges of Tamil Nadu. Also UGC-recognised under 2(f) & 12(B)." },
    { k:["research","arf","forum","journal","publication","phd","ph.d"], a:"The <b>APCian Research Forum (ARF)</b> — one faculty representative per discipline, led by the Research Coordinator — builds research culture: funded-project proposals, publications, FDPs and M.Phil./Ph.D. programmes in Maths, Chemistry, Commerce, Tamil & English. See the Research section on this page! 🔬" },
    { k:["library","book","opac"], a:"Our <b>Central Library</b> plus department libraries offer volumes, journals, e-resources and digital access. There's a dedicated Library page under Student Support in the menu 📚" },
    { k:["club","cell","nss","yrc","sport","kabbadi","kabaddi","ncc"], a:"Campus life is buzzing: <b>NSS, YRC, RRC</b>, fine-arts & literary clubs, quiz & eco clubs, plus Cells for counselling, anti-ragging, grievance and placement. <b>Sports</b> covers athletics, kabaddi, kho-kho and yoga 🏃‍♀️" },
    { k:["pudhumai","puthumai","scholarship","fees","fee","stipend","concession","mahalaxmi"], a:"Money should never stop your studies 💛 Support includes: <b>Puthumai Penn Thittam (₹1,000/month)</b> for govt-school students, <b>Mahalaxmiammal Memorial Scholarship</b> from our management, Post-Matric (BC/MBC/DNC) and SC/ST scholarships, plus <b>First-Graduate fee concessions</b>. Tap <b>Apply Now</b> or call 0461-2345655." },
    { k:["admission","apply","join","seat","enrol","application"], a:"Admissions for <b>2026–27</b> are merit-based — no entrance exam for most programmes. Steps: 1️⃣ Enquire/apply online, 2️⃣ upload documents, 3️⃣ merit list, 4️⃣ counselling, 5️⃣ enrol. Tap the gold <b>Apply Now</b> button (top-right) to start your application — it takes 2 minutes!" },
    { k:["day order","dayorder","order"], a:()=>`According to the current academic cycle, today is <b>${window.__dayOrderText}</b>. The six-day cycle runs Monday to Saturday; Sundays are holidays.` },
    { k:["course","programme","program","department","bsc","b.sc","bcom","b.com","bca","msc","m.sc","ma ","b.a","ba ","subjects"], a:"We have <b>9 departments</b>: Tamil, English, History, Mathematics, Physics, Chemistry, Zoology, Computer Science (B.Sc/BCA/M.Sc) and Commerce (B.Com/M.Com). PG + M.Phil./Ph.D. research programmes too. Not sure which fits you? Try the <b>Programme Finder</b> tool on this page — it's quite smart! ✨" },
    { k:["event","carnival","fest","seminar","workshop","sports day"], a:"Upcoming: <b>APCian CARNIVAL 2K26</b> (07 Aug) — inter-school extravaganza; <b>Green Chemistry National Seminar</b> (22 Aug); Vaanavil Literary Fest (04 Sep); AI & Data Bootcamp (12 Sep); Sports Day (10 Oct). Full details are in the Events section above! " },
    { k:["time","timing","hours","open","when"], a:"The college office works <b>Monday–Saturday, 9:30 AM – 4:30 PM</b>. Classes follow the six day-order cycle with Sundays off." },
    { k:["address","location","where","map","reach","bus"], a:"We're at <b>Ettayapuram Road, Thoothukudi – 628 002</b>, easy to reach by town buses on the Ettayapuram route. Tap 'Open in Google Maps' in the Contact section for directions 📍" },
    { k:["contact","phone","mail","email","office","call"], a:"Reach us at <b>0461-2345655</b> or <b>principal@apcmcollege.ac.in</b>. The office replies within two working days. You can also use the contact form on this page." },
    { k:["result","exam","revaluation","arrear"], a:"University results are published by M.S. University on their portal. Revaluation/arrear applications go through the college exam cell — check the Announcements section for the current window 📄" },
    { k:["principal","founder","management","secretary","president"], a:"Our leadership: Founder <b>Kulapathi Sri A.P.C. Veerabahu</b>, President <b>Thiru A.P.C.V. Chockalingam</b>, Secretary <b>Tmt. C. Subbulakshmi</b> and Principal <b>Dr. K. Palani</b>. Scroll to the Leadership section to meet them!" },
    { k:["hostel","stay","accommodation"], a:"For hostel and college-bus transport details, please contact the office at 0461-2345655 — they'll give you current availability and fees." },
    { k:["placement","job","career"], a:"The <b>Career Guidance & Placement Cell</b> runs soft-skills training, campus drives with regional employers, and competitive-exam coaching (TNPSC/TRB/NET). CS and Commerce students also get industry certifications!" },
    { k:["brochure","prospectus","download","pdf"], a:"You can download the <b>official Prospectus</b> (aided & self-financed programmes, eligibility, fee structure) from the Admissions section above — the gold brochure bar. Online application processing fee is just <b>₹150 for all courses</b> 📄" },
    { k:["video","youtube","tour"], a:"Watch our official campus film under <b>Discover APCM</b>, and the Student Support Services film in the Student Support section. Even more on our YouTube channel — link in the footer 🎬" },
    { k:["naan mudhalvan","naan","mudhalvan","academy"], a:"The <b>Career Guidance Cell</b>, APCM Academy and Tamil Nadu's <b>Naan Mudhalvan</b> initiative run free skill & competitive-exam training for our students. Details are on the official site's Career pages!" },
    { k:["thank","thanks"], a:"You're most welcome! 💛 Always happy to help a future APCian. Anything else?" },
    { k:["hello","hi","hey"], a:"Hello! 🙏 How can I help you today — admissions, programmes, scholarships, events?" },
  ];

  const CHIPS = ["Admissions", "Programmes", "Scholarships", "Day order", "Events", "Contact"];
  $("#botChips").innerHTML = CHIPS.map(c => `<button type="button">${c}</button>`).join("");
  $$("#botChips button").forEach(b => b.addEventListener("click", () => ask(b.textContent)));

  function bubble(html, me) {
    const d = document.createElement("div");
    d.className = "b-msg" + (me ? " me" : "");
    d.innerHTML = html;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  }
  function say(html) {
    const t = document.createElement("div");
    t.className = "b-msg typing";
    t.innerHTML = "<i></i><i></i><i></i>";
    msgs.appendChild(t); msgs.scrollTop = msgs.scrollHeight;
    setTimeout(() => { t.classList.remove("typing"); t.innerHTML = html; msgs.scrollTop = msgs.scrollHeight; }, 550 + Math.random() * 450);
  }
  function ask(text) {
    bubble(text, true);
    const low = " " + text.toLowerCase() + " ";
    const rule = RULES.find(r => r.k.some(k => low.includes(k)));
    if (rule) say(typeof rule.a === "function" ? rule.a() : rule.a);
    else say("I can help with <b>admissions, programmes, scholarships, day order, events, results, contact</b> and more. Try one of the quick topics, or call the office at <b>0461-2345655</b> for anything specific! 🙂");
  }
  $("#botForm").addEventListener("submit", e => {
    e.preventDefault();
    const v = input.value.trim();
    if (!v) return;
    input.value = "";
    ask(v);
  });
})();

/* ============================================================
   16b. YOUTUBE CLICK-TO-PLAY FACADES
   ============================================================ */
(function videos() {
  $$(".vid[data-yt]").forEach(v => {
    const play = () => {
      if (v.dataset.loaded) return;
      v.dataset.loaded = "1";
      v.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${v.dataset.yt}?autoplay=1&rel=0&modestbranding=1"
        title="APCM official video" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    };
    v.addEventListener("click", play);
    v.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); play(); } });
  });
})();

/* ============================================================
   17. CURSOR + YEAR
   ============================================================ */
(function cursor() {
  const g = $(".cursor-glow");
  if (!matchMedia("(hover:hover)").matches) return;
  let x = 0, y = 0, tx = 0, ty = 0;
  addEventListener("mousemove", e => { tx = e.clientX; ty = e.clientY; document.body.classList.add("cursor-on"); }, { passive: true });
  (function loop() {
    x += (tx - x) * .08; y += (ty - y) * .08;
    g.style.left = x + "px"; g.style.top = y + "px";
    requestAnimationFrame(loop);
  })();
})();

/* ============================================================
   18. HERO — word rotator + parallax collage
   ============================================================ */
(function heroFX() {
  const track = $("#rotTrack");
  if (track) {
    const words = track.children.length;
    let i = 0;
    setInterval(() => {
      i = (i + 1) % words;
      track.style.transform = `translateY(-${i * (100 / words)}%)`;
    }, 2600);
  }
  if (!matchMedia("(hover:hover)").matches) return;
  const hero = $(".hero"), layers = $$("[data-depth]", hero);
  if (!layers.length) return;
  hero.addEventListener("mousemove", e => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    layers.forEach(l => {
      const d = +l.dataset.depth;
      l.style.translate = `${(x * -22 * d).toFixed(1)}px ${(y * -16 * d).toFixed(1)}px`;
    });
  }, { passive: true });
  hero.addEventListener("mouseleave", () => layers.forEach(l => l.style.translate = ""));
})();

$("#year").textContent = new Date().getFullYear();
