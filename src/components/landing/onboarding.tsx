"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

/* ── Corner brackets (reused from world-map) ── */
function CornerBrackets() {
  const s = "absolute h-6 w-6 border-[#4988C4]";
  return (
    <>
      <div className={`${s} left-4 top-4 border-l-2 border-t-2 opacity-40`} />
      <div className={`${s} right-4 top-4 border-r-2 border-t-2 opacity-40`} />
      <div className={`${s} left-4 bottom-4 border-l-2 border-b-2 opacity-40`} />
      <div className={`${s} right-4 bottom-4 border-r-2 border-b-2 opacity-40`} />
    </>
  );
}

/* ── Selectable card ── */
function OptionCard({
  label,
  description,
  selected,
  onSelect,
}: {
  label: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full cursor-pointer flex-col gap-1 rounded-xl border px-5 py-4 text-left transition-all duration-200 ${
        selected
          ? "border-[#4988C4] bg-[#1C4D8D]/40 shadow-[0_0_20px_rgba(73,136,196,0.2)]"
          : "border-[#4988C4]/20 bg-[#0F2854]/60 hover:border-[#4988C4]/50 hover:bg-[#1C4D8D]/20"
      }`}
    >
      <span className="text-sm font-bold uppercase tracking-wider text-white">{label}</span>
      <span className="text-xs leading-relaxed text-[#BDE8F5]/50">{description}</span>
    </button>
  );
}

/* ── Country select ── */

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria",
  "Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan",
  "Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia",
  "Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica",
  "Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt",
  "El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon",
  "Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana",
  "Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel",
  "Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos",
  "Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi",
  "Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova",
  "Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands",
  "New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Palau",
  "Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania",
  "Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","São Tomé and Príncipe","Saudi Arabia","Senegal",
  "Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea",
  "South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan",
  "Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu",
  "Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela",
  "Vietnam","Yemen","Zambia","Zimbabwe",
];

function CountrySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = query
    ? COUNTRIES.filter((c) => c.toLowerCase().includes(query.toLowerCase()))
    : COUNTRIES;

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          if (!e.target.value) onChange("");
        }}
        onFocus={() => setOpen(true)}
        placeholder="Search your country..."
        autoFocus
        className="h-14 w-full rounded-xl border border-[#4988C4]/30 bg-[#0F2854]/80 px-5 font-mono text-lg font-bold uppercase tracking-widest text-white placeholder:text-[#4988C4]/30 placeholder:normal-case placeholder:text-sm placeholder:tracking-normal focus:border-[#4988C4] focus:outline-none focus:ring-1 focus:ring-[#4988C4]"
      />
      {open && filtered.length > 0 && (
        <ul className="absolute z-50 mt-2 max-h-48 w-full overflow-y-auto rounded-xl border border-[#4988C4]/30 bg-[#0a1e3d] py-1 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
          {filtered.map((c) => (
            <li key={c}>
              <button
                type="button"
                onClick={() => {
                  onChange(c);
                  setQuery(c);
                  setOpen(false);
                }}
                className={`w-full cursor-pointer px-5 py-2 text-left font-mono text-xs font-bold uppercase tracking-wider transition-colors ${
                  value === c
                    ? "bg-[#1C4D8D]/50 text-white"
                    : "text-[#BDE8F5]/60 hover:bg-[#1C4D8D]/30 hover:text-white"
                }`}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── Step data ── */

const DIVISIONS = [
  { id: "data-eng", label: "Data Engineering", desc: "You build and maintain data pipelines" },
  { id: "data-sci", label: "Data Science", desc: "You analyze data and build models" },
  { id: "devops", label: "DevOps / Platform", desc: "You manage infrastructure and deployments" },
  { id: "swe", label: "Software Engineering", desc: "You build applications and services" },
  { id: "other", label: "Other", desc: "You're exploring new territory" },
];

const CLEARANCE_LEVELS = [
  { id: "rookie", label: "Rookie", desc: "Never touched Airflow before" },
  { id: "field-agent", label: "Field Agent", desc: "Built a few DAGs, know the basics" },
  { id: "senior-op", label: "Senior Operative", desc: "Comfortable with Airflow, want to go deeper" },
];

const OBJECTIVES = [
  { id: "career", label: "Career Advancement", desc: "Level up for a new role or promotion" },
  { id: "project", label: "Current Project", desc: "Need Airflow for something you're building now" },
  { id: "team", label: "Team Onboarding", desc: "Getting your team up to speed" },
  { id: "curiosity", label: "Curiosity", desc: "Just exploring what Airflow can do" },
];

/* ── Main onboarding component ── */

interface OnboardingProps {
  onClose: () => void;
}

interface AgentProfile {
  codename: string;
  country: string;
  division: string;
  clearance: string;
  objective: string;
}

export function Onboarding({ onClose }: OnboardingProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<AgentProfile>({
    codename: "",
    country: "",
    division: "",
    clearance: "",
    objective: "",
  });

  const totalSteps = 5;

  const canContinue =
    (step === 0 && profile.codename.trim().length > 0) ||
    (step === 1 && profile.country.trim().length > 0) ||
    (step === 2 && profile.division) ||
    (step === 3 && profile.clearance) ||
    (step === 4 && profile.objective);

  function handleContinue() {
    if (step < totalSteps - 1) {
      setStep((s) => s + 1);
    } else {
      router.push("/courses");
    }
  }

  const divisionLabel = DIVISIONS.find((d) => d.id === profile.division)?.label;
  const clearanceLabel = CLEARANCE_LEVELS.find((c) => c.id === profile.clearance)?.label;
  const objectiveLabel = OBJECTIVES.find((o) => o.id === profile.objective)?.label;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F2854]">
      <CornerBrackets />

      {/* Scanlines */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, rgba(200,200,200,0.08) 0px, rgba(200,200,200,0.08) 1px, transparent 1px, transparent 3px)`,
        }}
      />
      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-8 px-6">
        {/* Header */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#4988C4]/70">
            Classified
          </span>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#4988C4]/40 to-transparent" />
          <h2
            className="text-2xl font-extrabold uppercase tracking-wider text-white sm:text-3xl"
            style={{ textShadow: "0 0 30px rgba(73,136,196,0.4)" }}
          >
            Agent Dossier
          </h2>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-3">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step
                  ? "w-8 bg-[#4988C4]"
                  : i < step
                    ? "w-4 bg-[#4988C4]/60"
                    : "w-4 bg-[#4988C4]/20"
              }`}
            />
          ))}
          <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-[#4988C4]/50">
            Step {step + 1} of {totalSteps}
          </span>
        </div>

        {/* Step content */}
        <div className="relative z-20 w-full animate-hero-rise" key={step}>
          {step === 0 && (
            <div className="flex flex-col gap-4">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-[#BDE8F5]/60">
                Enter your agent codename
              </label>
              <input
                type="text"
                value={profile.codename}
                onChange={(e) => setProfile({ ...profile, codename: e.target.value })}
                placeholder="e.g. NIGHTHAWK"
                autoFocus
                className="h-14 w-full rounded-xl border border-[#4988C4]/30 bg-[#0F2854]/80 px-5 font-mono text-lg font-bold uppercase tracking-widest text-white placeholder:text-[#4988C4]/30 focus:border-[#4988C4] focus:outline-none focus:ring-1 focus:ring-[#4988C4]"
              />
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col gap-4">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-[#BDE8F5]/60">
                Base of operations
              </label>
              <CountrySelect
                value={profile.country}
                onChange={(v) => setProfile({ ...profile, country: v })}
              />
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#BDE8F5]/60">
                Select your division
              </span>
              {DIVISIONS.map((d) => (
                <OptionCard
                  key={d.id}
                  label={d.label}
                  description={d.desc}
                  selected={profile.division === d.id}
                  onSelect={() => setProfile({ ...profile, division: d.id })}
                />
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#BDE8F5]/60">
                What is your clearance level?
              </span>
              {CLEARANCE_LEVELS.map((c) => (
                <OptionCard
                  key={c.id}
                  label={c.label}
                  description={c.desc}
                  selected={profile.clearance === c.id}
                  onSelect={() => setProfile({ ...profile, clearance: c.id })}
                />
              ))}
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#BDE8F5]/60">
                Primary objective
              </span>
              {OBJECTIVES.map((o) => (
                <OptionCard
                  key={o.id}
                  label={o.label}
                  description={o.desc}
                  selected={profile.objective === o.id}
                  onSelect={() => setProfile({ ...profile, objective: o.id })}
                />
              ))}
            </div>
          )}
        </div>

        {/* Summary preview (on last step, after selection) */}
        {step === 4 && profile.objective && (
          <div className="w-full rounded-xl border border-[#4988C4]/20 bg-[#0F2854]/60 p-5">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4988C4]/50">
              Agent Summary
            </span>
            <div className="mt-3 grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
              <span className="text-[#BDE8F5]/40">Codename</span>
              <span className="font-mono font-bold uppercase text-white">{profile.codename}</span>
              <span className="text-[#BDE8F5]/40">Base</span>
              <span className="font-mono font-bold uppercase text-white">{profile.country}</span>
              <span className="text-[#BDE8F5]/40">Division</span>
              <span className="font-bold text-white">{divisionLabel}</span>
              <span className="text-[#BDE8F5]/40">Clearance</span>
              <span className="font-bold text-white">{clearanceLabel}</span>
              <span className="text-[#BDE8F5]/40">Objective</span>
              <span className="font-bold text-white">{objectiveLabel}</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="relative z-10 flex w-full items-center justify-between">
          <button
            type="button"
            onClick={step === 0 ? onClose : () => setStep((s) => s - 1)}
            className="cursor-pointer text-xs font-semibold uppercase tracking-[0.15em] text-[#4988C4]/60 transition-colors hover:text-[#4988C4]"
          >
            {step === 0 ? "Abort" : "Back"}
          </button>

          <button
            type="button"
            disabled={!canContinue}
            onClick={handleContinue}
            className="inline-flex h-12 cursor-pointer items-center justify-center gap-3 rounded-2xl border border-[#4988C4]/30 bg-[#0F2854]/80 px-8 text-sm font-extrabold uppercase tracking-[0.2em] text-white backdrop-blur transition-all duration-200 hover:border-[#4988C4] hover:bg-[#1C4D8D]/60 hover:shadow-[0_0_30px_rgba(73,136,196,0.3)] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-[#4988C4]/30 disabled:hover:bg-[#0F2854]/80 disabled:hover:shadow-none"
          >
            {step === totalSteps - 1 ? (
              <>
                <span className="text-lg">&#9654;</span>
                Launch Mission
              </>
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
