import React, { useState, useMemo, useRef, useEffect } from 'react';

// ==========================================
// 📊 1. VERBATIM DATA STRUCTURE (JSON MODEL)
// ==========================================
const snsConstitutionData = [
  {
    id: "preamble",
    part: "PREAMBLE",
    title: "PREAMBLE OF THE SAMAJIK NYAY SANGH",
    clauses: [
      "We, the members of the Samajik Nyay Sangh, standing united in solemn resolve, do hereby adopt this Constitution to secure justice, equality, and fundamental rights for every section of society.",
      "Our core mission is to establish a transparent democratic framework entirely free from corruption and dynastic politics."
    ],
    category: "Preamble",
    indian_comparison_placeholder: {
      title: "Preamble to the Constitution of India",
      text: "WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens: JUSTICE, social, economic and political; LIBERTY of thought, expression, belief, faith and worship; EQUALITY of status and of opportunity; and to promote among them all FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation..."
    }
  },
  {
    id: "article-1",
    part: "PART I: ORGANIZATIONAL STRUCTURE & SUPREME LEADERSHIP",
    title: "ARTICLE 1: SUPREME LEADERSHIP & DEMOCRATIC SELECTION",
    clauses: [
      "Clause 1.1: The apex and highest position of the organization (Party President / Adhyaksh) may be held by any individual, regardless of gender (man or woman). However, it is a mandatory and absolute prerequisite that the individual must have no prior or current affiliation, membership, or relationship with any other political party or any organization directly or indirectly associated with a political party. The supreme leader must be entirely independent of the existing political establishment.",
      "Clause 1.2: The Supreme Leader shall act strictly in accordance with the core principles, ideologies, and constitutional mandates of the Samajik Nyay Sangh (SNS). The selection of the Supreme Leader shall be conducted through a transparent democratic voting process, jointly executed by the Party High Command and the active party workers (Karyakartas)."
    ],
    category: "Supreme Leadership Criteria",
    indian_comparison_placeholder: {
      title: "Article 52 & 58 / Representation of the People Act",
      text: "While the Indian Constitution outlines rules for the President (Article 52) and executive heads, intra-party democracy and complete bans on prior political affiliation are governed externally by autonomous party bylaws and the Election Commission of India's guidelines under the Representation of the People Act, 1951."
    }
  },
  {
    id: "article-2",
    part: "PART I: ORGANIZATIONAL STRUCTURE & SUPREME LEADERSHIP",
    title: "ARTICLE 2: DECENTRALIZED GOVERNANCE",
    clauses: [
      "Clause 2.1: The decision-making authority of the party shall not be concentrated within a single entity or individual. It shall remain completely data-driven, transparent, and decentralized, with established frameworks of strict accountability at every operational layer."
    ],
    category: "Supreme Leadership Criteria",
    indian_comparison_placeholder: {
      title: "Democratic Decentralization Concepts",
      text: "Reflects the foundational spirit of democratic separation of powers and decentralization visible in the 73rd and 74th Amendments (Panchayati Raj and Municipalities) of the Indian Constitution, ensuring power isn't concentrated."
    }
  },
  {
    id: "article-2a",
    part: "PART IA: LABOUR RIGHTS & WELFARE",
    title: "ARTICLE 2A: ABOLITION OF BONDED LABOUR & MINIMUM WAGES REFORM",
    clauses: [
      "Clause 2A.1: All forms of bonded labour within the country shall be permanently prohibited and eradicated. Any employer, contractor, or institution found engaging in or promoting bonded labour shall be prosecuted under severe charges equivalent to treason and subjected to maximum legal penalties.",
      "Clause 2A.2: The Minimum Wages Act shall be enforced with absolute stringency across the nation. Non-compliant employers shall face strict criminal prosecution and heavy financial penalties without any provision for leniency.",
      "Clause 2A.3: Workers across all fields and industries (including brick kiln workers, construction laborers, and agricultural workers) shall be classified into specific categories based on risk levels and occupational skills. Under no circumstance shall the base minimum wage for any category fall below ₹500 per day."
    ],
    category: "Labor Rights & Welfare",
    indian_comparison_placeholder: {
      title: "Article 23 & Article 43 of the Constitution of India",
      text: "Article 23 explicitly prohibits traffic in human beings and 'begar' (forced labor). Article 43 state policy directs the State to secure a 'living wage' and decent standard of life for all workers. The SNS clause hardcodes a strict statutory runtime statutory minimum floor of ₹500/day."
    }
  },
  {
    id: "article-3",
    part: "PART II: ANTI-DYNASTIC RULES & REPRESENTATION",
    title: "ARTICLE 3: ANTI-DYNASTIC RULE",
    clauses: [
      "Clause 3.1 (One Family, One Post): Only one individual from a single family shall be eligible to hold an organizational office or receive a party ticket for public elections. This rule serves as a strict statutory ban against dynastic succession within the party."
    ],
    category: "Anti-Dynastic Controls",
    indian_comparison_placeholder: {
      title: "Article 14 (Equality) vs Intra-Party Bylaws",
      text: "The Indian Constitution guarantees the fundamental right to contest elections under Article 14 and 19 to all citizens equally without pedigree discrimination. Anti-nepotism / Anti-dynasty frameworks are structural checks deployed at the political party level rather than constitutional bans."
    }
  },
  {
    id: "article-4",
    part: "PART II: ANTI-DYNASTIC RULES & REPRESENTATION",
    title: "ARTICLE 4: FEMALE REPRESENTATION",
    clauses: [
      "Clause 4.1 (40% Mandatory Reservation): All primary committees, core operational teams, and governing bodies within the party must maintain a minimum of 40% female representation."
    ],
    category: "Anti-Dynastic Controls",
    indian_comparison_placeholder: {
      title: "The Constitution (106th Amendment) Act, 2023",
      text: "Nari Shakti Vandan Adhiniyam mandates a 33% reservation for women in the Lok Sabha and State Legislative Assemblies. The SNS Internal Constitution goes further by demanding an absolute 40% structural floor across all administrative cadres and organizational teams."
    }
  },
  {
    id: "article-5",
    part: "PART III: ELIGIBILITY & RESTRAINTS FOR OFFICIALS",
    title: "ARTICLE 5: NET WORTH CAP",
    clauses: [
      "Clause 5.1: The total net worth of senior leaders and core operational officials of the SNS party shall not exceed ₹1 Crore. This ceiling ensures that public representatives remain genuinely aligned with the common citizenry."
    ],
    category: "Anti-Dynastic Controls",
    indian_comparison_placeholder: {
      title: "Representation of the People Act, 1951 (Affidavits)",
      text: "Indian electoral law mandates the mandatory public disclosure of assets and liabilities via affidavits under Form 26. However, there is no constitutional limit or cap on a candidate's maximum wealth. SNS establishes a rigid monetary cap."
    }
  },
  {
    id: "article-6",
    part: "PART III: ELIGIBILITY & RESTRAINTS FOR OFFICIALS",
    title: "ARTICLE 6: BUSINESS RESTRICTIONS IN CORE SECTORS",
    clauses: [
      "Clause 6.1: No leader or senior official of the party shall hold any personal business or profit-making interest within the critical public sectors of Education and Healthcare. Education and healthcare must remain strictly non-profit domains of public service rather than commercial enterprises."
    ],
    category: "Labor Rights & Welfare",
    indian_comparison_placeholder: {
      title: "Article 21A (Education) & Article 47 (Health)",
      text: "Article 21A guarantees free and compulsory education to children. Article 47 places a duty on the state to raise nutrition levels and public health. Indian jurisprudence permits private operations under non-profit trusts, but SNS eliminates conflict-of-interest by banning office bearers from commercializing these sectors."
    }
  },
  {
    id: "article-7",
    part: "PART IV: ACCOUNTABILITY, DISCIPLINE & DISMISSAL",
    title: "ARTICLE 7: ZERO TOLERANCE FOR CRIME & CORRUPTION",
    clauses: [
      "Clause 7.1: Any member or public representative of the party facing serious criminal charges or found complicit in corrupt practices shall be subject to immediate and permanent dismissal from the organization."
    ],
    category: "Anti-Dynastic Controls",
    indian_comparison_placeholder: {
      title: "Decriminalization of Politics & Article 102",
      text: "Under Article 102(1)(e) of the Indian Constitution and Section 8 of the RPA, 1951, MPs/MLAs are disqualified only *upon conviction* with a sentence of 2 years or more. SNS institutes a much stricter threshold of permanent termination immediately upon the *framing of serious charges*."
    }
  },
  {
    id: "article-8",
    part: "PART IV: ACCOUNTABILITY, DISCIPLINE & DISMISSAL",
    title: "ARTICLE 8: THE INTERNAL MONITORING BODY (PRAHARI SYSTEM)",
    clauses: [
      "Clause 8.1 (Independent Watchdog): A fully autonomous and impartial internal monitoring body, designated as the 'Prahari', shall be instituted. The Prahari shall oversee the conduct, decisions, and ethical compliance of all senior party leaders to prevent authoritarianism and internal corruption.",
      "Clause 8.2 (Grievance Redressal): The Prahari body shall investigate complaints raised by grassroots members or the general public against any party official with complete impartiality and execute definitive corrective action free from external influence."
    ],
    category: "Supreme Leadership Criteria",
    indian_comparison_placeholder: {
      title: "Lokpal and Lokayuktas / Internal Ombudsman",
      text: "Analogous to the Lokpal at the national level under the Lokpal Act, designed to check corruption in administrative branches. The Prahari framework acts as an internal autonomous judicial panel holding executive party leaders directly accountable to the public."
    }
  },
  {
    id: "article-9",
    part: "PART V: MEMBERSHIP, FUNDING & DIGITAL GOVERNANCE",
    title: "ARTICLE 9: TRANSPARENT FUNDING & MEMBERSHIP OATH",
    clauses: [
      "Clause 9.1: Every financial contribution, donation, and asset received by the party shall be recorded transparently and made completely accessible to the public domain.",
      "Clause 9.2: Upon induction, every member must take a binding oath of absolute allegiance to the Constitution of India and to this model Constitution of the SNS."
    ],
    category: "Anti-Dynastic Controls",
    indian_comparison_placeholder: {
      title: "Article 295 / Electoral Funding transparency",
      text: "Electoral finance transparency in India is regulated via Section 29C of the RPA 1951. SNS removes anonymity floors completely, bringing all transactional inflows into open-source public ledgers."
    }
  },
  {
    id: "article-10",
    part: "PART V: MEMBERSHIP, FUNDING & DIGITAL GOVERNANCE",
    title: "ARTICLE 10: DIGITAL GOVERNANCE & PUBLIC LITERACY (YOUTUBE STRATEGY)",
    clauses: [
      "Clause 10.1 (Digital Transparency): All ideological principles, core resolutions of official meetings, and the active constitution of the party shall remain permanently published online for absolute public transparency.",
      "Clause 10.2 (Mass Literacy via YouTube): The party shall operate an official YouTube platform dedicated to educating the general public regarding their fundamental rights, legal statutes, and SNS policies. All broadcasted content must remain stringently data-driven and factual.",
      "Clause 10.3 (Absolute Prohibition of Public Infrastructure for Electioneering): The utilization of any government or public infrastructure (including railway stations, bus terminals, government buildings, and national highways) built via taxpayer public funds for political campaigning, rallies, or advertisements is strictly prohibited. Furthermore, political broadcasting on state-owned media platforms (such as Doordarshan and allied state channels) shall remain suspended for election campaigns to ensure an entirely fair and level playing field for all political entities."
    ],
    category: "Industrial Waste & Environmental Laws",
    indian_comparison_placeholder: {
      title: "Article 324 & Model Code of Conduct (MCC)",
      text: "Article 324 grants power to the Election Commission of India. The ECI's Model Code of Conduct explicitly bars using official mass media and public infrastructure for partisan campaigning during elections. SNS scales this restriction into a statutory permanent absolute prohibition within its charter."
    }
  },
  {
    id: "article-11",
    part: "PART VI: ENVIRONMENTAL PROTECTION & INDUSTRIAL ACCOUNTABILITY",
    title: "ARTICLE 11: PROTECTION OF WATER BODIES & WASTE MANAGEMENT",
    clauses: [
      "Clause 11.1: Immediate statutory warnings shall be issued to all industrial units found discharging toxic or chemical effluent into any natural water body (rivers, lakes, or groundwater tables). Failure to comply shall result in severe financial punitive action and immediate sealing of the facility.",
      "Clause 11.2: The Government shall bear the absolute responsibility to construct and operate Common Effluent Treatment Plants (CETP) to process liquid waste generated by small and medium-scale industrial units, preventing ecological damage without over-burdening smaller enterprises.",
      "Clause 11.3: Large-scale corporations must establish independent, captive water treatment facilities. No industrial wastewater shall be discharged into any open channel or natural water body until it has been processed to match standard safe drinking water baselines (maintaining a normal pH level between 6.5 and 8.5).",
      "Clause 11.4 (Groundwater Extraction & Mandatory Water Tax): Any industrial facility utilizing natural groundwater for commercial production or manufacturing shall operate under strict consumption thresholds. Extraction beyond this specified volume shall attract a rigorous, mandatory Water Tax, with all collected revenue strictly funneled into national water conservation and artificial recharge initiatives."
    ],
    category: "Industrial Waste & Environmental Laws",
    indian_comparison_placeholder: {
      title: "Article 21 (Right to Clean Water) & Water Act, 1974",
      text: "The Supreme Court of India recognizes the right to clean water under the Right to Life (Article 21). Federal environmental protections are governed by the Water (Prevention and Control of Pollution) Act, 1974. SNS introduces systematic mandatory automated penalties, a baseline structural pH threshold (6.5–8.5), and dedicated ring-fenced groundwater taxes."
    }
  },
  {
    id: "article-12",
    part: "PART VI: ENVIRONMENTAL PROTECTION & INDUSTRIAL ACCOUNTABILITY",
    title: "ARTICLE 12: ANTI-MINING LAWS & ASSET SEIZURE",
    clauses: [
      "Clause 12.1: A comprehensive and absolute ban shall be instituted against all illegal mining operations. Past illegal mining activities missing from current administrative registers shall be investigated thoroughly; all associated sites, machinery, and illicit capital shall be permanently seized by the State.",
      "Clause 12.2: All illegal and benami properties owned or operated by land mafias or illicit syndicates shall be confiscated permanently by the State and repurposed exclusively for public welfare, environmental rehabilitation, and social justice programs.",
      "Clause 12.3 (Political-Mafia Nexus & Irrevocable Prosecution): All illegal or benami assets held by criminal syndicates or mafias maintaining active links with political organizations shall be immediately seized by the State. Criminal charges and police cases filed against such entities shall be legally irrevocable and immune to political intervention or withdrawal, ensuring mandatory expedited trial via fast-track judiciaries."
    ],
    category: "Industrial Waste & Environmental Laws",
    indian_comparison_placeholder: {
      title: "Benami Transactions Prohibition Act & PMLA",
      text: "The Benami Transactions (Prohibition) Act, 1988 and Prevention of Money Laundering Act (PMLA), 2002 dictate asset attachment rules. SNS adds non-withdrawable clause parameters, insulating police registers from political interference, and mandates immediate fast-track asset liquidation exclusively for public welfare."
    }
  },
  {
    id: "article-13",
    part: "PART VI: ENVIRONMENTAL PROTECTION & INDUSTRIAL ACCOUNTABILITY",
    title: "ARTICLE 13: ECOLOGICAL PROTECTION OF FORESTS",
    clauses: [
      "Clause 13.1: An absolute and permanent statutory prohibition is hereby placed on all forms of commercial, residential, or private construction within any designated forest zone, National Park, Wildlife Sanctuary, or legally protected ecological reserve.",
      "Clause 13.2: Protected forest lands shall neither be sold nor leased to private entities. Any absolutely necessary infrastructure development must be restricted strictly to areas completely external to the eco-sensitive boundaries, preserving the pristine habitat of native wildlife."
    ],
    category: "Industrial Waste & Environmental Laws",
    indian_comparison_placeholder: {
      title: "Article 48A & Forest Conservation Act, 1980",
      text: "Article 48A (Directive Principles) mandates the state to protect and improve the environment and safeguard forests. The Forest (Conservation) Act regulates diversions of forest land. SNS removes executive discretionary exceptions entirely, enforcing a zero-compromise static perimeter ban."
    }
  },
  {
    id: "article-15",
    part: "PART VII: ENFORCEMENT & CONSTITUTIONAL INTEGRITY",
    title: "ARTICLE 15: TOTAL ENFORCEMENT, LOOPHOLE REVISION & RIGOROUS PENALTIES",
    clauses: [
      "Clause 15.1: The provisions of this model Constitution of the Samajik Nyay Sangh, alongside the core tenets of the sovereign Constitution of India, shall be strictly enforced across all administrative territories with absolute compliance.",
      "Clause 15.2: A thorough legislative audit shall be conducted to identify and eliminate all structural ambiguities and legal loopholes often exploited by criminal entities, mafias, or corrupt politicians to evade justice.",
      "Clause 15.3: Any violation of the principles set forth in this Constitution shall meet swift, uncompromised prosecution. Serious offenses concerning national integrity, systemic corruption, illegal mining operations, and mafia activities shall carry mandatory sentences up to life imprisonment, coupled with comprehensive forfeiture of personal property."
    ],
    category: "Anti-Dynastic Controls",
    indian_comparison_placeholder: {
      title: "Article 256 and Fundamental Rule of Law",
      text: "Enforces judicial alignment with Article 256 and the foundational constitutional structure of the Indian Union, using life imprisonment frames and property forfeiture as an absolute deterrent against systemic statutory circumvention."
    }
  }
];

// ==========================================
// 💻 2. COMPONENT ARCHITECTURE & MAIN INTERFACE
// ==========================================
export default function App() {
  const [activeTab, setActiveTab] = useState('reader');
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedCard, setHighlightedCard] = useState(null);
  const cardRefs = useRef({});

  // Form states
  const [oathChecked, setOathChecked] = useState({ step1: false, step2: false, step3: false });
  const [oathSubmitted, setOathSubmitted] = useState(false);
  const [votingCast, setVotingCast] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState('');

  // 🔍 3. KEYWORD ACTION ROUTER ENGINE
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const lowerQuery = searchQuery.toLowerCase();
    const matchedNode = snsConstitutionData.find(item => 
      item.title.toLowerCase().includes(lowerQuery) || 
      item.part.toLowerCase().includes(lowerQuery) ||
      item.clauses.some(clause => clause.toLowerCase().includes(lowerQuery))
    );

    if (matchedNode) {
      setActiveTab('reader');
      setHighlightedCard(matchedNode.id);
      
      setTimeout(() => {
        const targetElement = cardRefs.current[matchedNode.id];
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  const handleMatrixNavigation = (categoryName) => {
    const matchedNode = snsConstitutionData.find(item => item.category === categoryName);
    if (matchedNode) {
      setHighlightedCard(matchedNode.id);
      setTimeout(() => {
        const targetElement = cardRefs.current[matchedNode.id];
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  };

  // Clear highlight animation on reset
  useEffect(() => {
    if (highlightedCard) {
      const timer = setTimeout(() => setHighlightedCard(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [highlightedCard]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col antialiased">
      
      {/* HEADER & BRANDING */}
      <header className="bg-slate-950 border-b border-amber-500/30 sticky top-0 z-50 shadow-xl backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full border-2 border-amber-500 bg-slate-900 flex items-center justify-center font-serif text-amber-500 font-bold text-xl shadow-inner">
              Ω
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold uppercase tracking-wider text-amber-500">
                Samajik Nyay Sangh <span className="text-slate-300 font-sans text-xs lowercase px-2 py-0.5 bg-slate-800 rounded border border-slate-700 ml-2">SNS Party</span>
              </h1>
              <p className="text-xs text-slate-400">National Constitutional Architecture Portal</p>
            </div>
          </div>

          {/* SMART SEARCH BAR */}
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search eg: 'Water Tax', '₹500', 'Prahari'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 text-slate-100 pl-4 pr-10 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition text-sm font-sans"
            />
            <button type="submit" className="absolute right-2 top-2.5 text-slate-400 hover:text-amber-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
          </form>
        </div>
      </header>

      {/* CORE NAVIGATION RUNTIME TABS */}
      <nav className="bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex space-x-1 md:space-x-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('reader')}
            className={`py-3 px-4 font-sans text-sm font-medium border-b-2 transition-all whitespace-nowrap ${activeTab === 'reader' ? 'border-amber-500 text-amber-500 bg-slate-900/50' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            📋 Constitutional Reader
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`py-3 px-4 font-sans text-sm font-medium border-b-2 transition-all whitespace-nowrap ${activeTab === 'matrix' ? 'border-amber-500 text-amber-500 bg-slate-900/50' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            🔄 Comparison Matrix Screen
          </button>
          <button
            onClick={() => setActiveTab('oath')}
            className={`py-3 px-4 font-sans text-sm font-medium border-b-2 transition-all whitespace-nowrap ${activeTab === 'oath' ? 'border-amber-500 text-amber-500 bg-slate-900/50' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            ⚔️ Induction Oath Module
          </button>
          <button
            onClick={() => setActiveTab('voting')}
            className={`py-3 px-4 font-sans text-sm font-medium border-b-2 transition-all whitespace-nowrap ${activeTab === 'voting' ? 'border-amber-500 text-amber-500 bg-slate-900/50' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            🗳️ Gated Voting Dashboard
          </button>
        </div>
      </nav>

      {/* APPLICATION CORE VIEWPORT */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        
        {/* TAB 1: VERBATIM CONSTITUTIONAL READER DASHBOARD */}
        {activeTab === 'reader' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-serif text-slate-100 font-bold border-b border-slate-800 pb-2 mb-4">
                SAMAJIK NYAY SANGH (SNS) — OFFICIAL MODEL CHARTER 
              </h2>
              <p className="text-sm text-slate-400 font-sans leading-relaxed">
                Below is the raw, untruncated constitutional structure of the party framework. Use the smart search bar above to query, anchor, and instantly isolate specific statutory legal components.
              </p>
            </div>

            <div className="space-y-6">
              {snsConstitutionData.map((node) => (
                <div
                  key={node.id}
                  ref={(el) => (cardRefs.current[node.id] = el)}
                  className={`bg-slate-950 border rounded-xl p-6 shadow-lg transition-all duration-700 ${
                    highlightedCard === node.id 
                      ? 'border-amber-500 ring-2 ring-amber-500/30 scale-[1.01] bg-slate-900' 
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-sans font-semibold tracking-widest text-amber-600 uppercase bg-amber-500/10 px-2 py-1 rounded inline-block mb-3">
                    {node.part}
                  </div>
                  <h3 className="text-xl font-serif font-bold text-slate-200 mb-4 border-b border-slate-900 pb-2">
                    {node.title}
                  </h3>
                  <div className="space-y-4 text-slate-300 font-serif leading-relaxed text-justify text-base">
                    {node.clauses.map((clause, idx) => (
                      <p key={idx} className="p-2 rounded hover:bg-slate-900/40 transition">
                        {clause}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: THE SIDE-BY-SIDE COMPARISON MATRIX SCREEN */}
        {activeTab === 'matrix' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Quick-Jump Anchors */}
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex flex-wrap gap-2 items-center">
              <span className="text-xs font-sans font-bold text-slate-400 uppercase tracking-wider mr-2">Jump Matrix Subject:</span>
              {['Preamble', 'Supreme Leadership Criteria', 'Labor Rights & Welfare', 'Anti-Dynastic Controls', 'Industrial Waste & Environmental Laws'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleMatrixNavigation(cat)}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-slate-900 hover:bg-amber-500/10 hover:text-amber-500 border border-slate-800 hover:border-amber-500/30 transition"
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Split Screen Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* LEFT COLUMN: CONSTITUTION OF INDIA */}
              <div className="space-y-6">
                <div className="bg-slate-950 border-t-4 border-blue-500 border-x border-b border-slate-800 p-4 rounded-xl shadow-lg sticky top-24 z-10">
                  <h3 className="text-lg font-serif font-bold text-blue-400 uppercase tracking-wide flex items-center gap-2">
                    🇮🇳 Constitution of India Baseline
                  </h3>
                  <p className="text-xs text-slate-400">Sovereign Statutory Framework & Court Precedents</p>
                </div>

                {snsConstitutionData.map((node) => (
                  <div 
                    key={`india-${node.id}`} 
                    className={`bg-slate-950 border p-5 rounded-xl shadow-md h-[280px] overflow-y-auto font-serif text-sm border-slate-800/80 transition-all ${
                      highlightedCard === node.id ? 'border-blue-500 ring-1 ring-blue-500/30 bg-slate-900' : ''
                    }`}
                  >
                    <div className="text-xs font-sans text-blue-500 font-bold mb-2 uppercase tracking-wide">
                      Ref: {node.category} Match
                    </div>
                    <h4 className="text-base text-slate-200 font-bold mb-3 font-sans pb-1 border-b border-slate-900">
                      {node.indian_comparison_placeholder.title}
                    </h4>
                    <p className="text-slate-400 leading-relaxed text-justify">
                      {node.indian_comparison_placeholder.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* RIGHT COLUMN: SNS CONSTITUTION PROPOSALS */}
              <div className="space-y-6">
                <div className="bg-slate-950 border-t-4 border-amber-500 border-x border-b border-slate-800 p-4 rounded-xl shadow-lg sticky top-24 z-10">
                  <h3 className="text-lg font-serif font-bold text-amber-500 uppercase tracking-wide flex items-center gap-2">
                    ⚜️ Samajik Nyay Sangh Charter 
                  </h3>
                  <p className="text-xs text-slate-400">Proposed High-Accountability Execution Layers</p>
                </div>

                {snsConstitutionData.map((node) => (
                  <div
                    key={`sns-${node.id}`}
                    ref={(el) => (cardRefs.current[node.id] = el)}
                    className={`bg-slate-950 border p-5 rounded-xl shadow-md h-[280px] overflow-y-auto font-serif text-sm transition-all duration-500 ${
                      highlightedCard === node.id 
                        ? 'border-amber-500 ring-1 ring-amber-500/30 bg-slate-900' 
                        : 'border-slate-800/80'
                    }`}
                  >
                    <div className="text-xs font-sans text-amber-500 font-bold mb-2 uppercase tracking-wide">
                      {node.part.split(':')[0]}
                    </div>
                    <h4 className="text-base text-slate-200 font-bold mb-3 font-sans pb-1 border-b border-slate-900">
                      {node.title}
                    </h4>
                    <div className="text-slate-300 space-y-2 text-justify">
                      {node.clauses.map((clause, idx) => (
                        <p key={idx}>{clause}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: FUNCTIONAL INTERACTIVE INDUCTION OATH MODULE */}
        {activeTab === 'oath' && (
          <div className="max-w-2xl mx-auto bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-2xl animate-fadeIn">
            <div className="border-b border-slate-800 pb-4 mb-6 text-center">
              <span className="text-3xl">⚔️</span>
              <h2 className="text-2xl font-serif font-bold text-amber-500 mt-2">Karyakarta Induction Protocol</h2>
              <p className="text-xs text-slate-400 mt-1">Official Induction Affirmation Pipeline under Article 9 [cite: 28, 29]</p>
            </div>

            {!oathSubmitted ? (
              <div className="space-y-6">
                <blockquote className="border-l-4 border-amber-500 bg-slate-900 p-4 text-base font-serif italic text-slate-300 rounded-r-lg leading-relaxed">
                  "Upon induction, every member must take a binding oath of absolute allegiance to the Constitution of India and to this model Constitution of the SNS." [cite: 29]
                </blockquote>

                <div className="space-y-4 pt-4 border-t border-slate-900">
                  <label className="flex items-start gap-3 p-3 bg-slate-900/60 border border-slate-800 rounded-lg cursor-pointer hover:border-slate-700 transition">
                    <input
                      type="checkbox"
                      checked={oathChecked.step1}
                      onChange={(e) => setOathChecked({...oathChecked, step1: e.target.checked})}
                      className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-800 text-amber-500 focus:ring-amber-500"
                    />
                    <span className="text-sm text-slate-300 font-sans">
                      I swear absolute allegiance to the sovereign <strong>Constitution of India</strong> and structural rules of the Union[cite: 29, 50].
                    </span>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-slate-900/60 border border-slate-800 rounded-lg cursor-pointer hover:border-slate-700 transition">
                    <input
                      type="checkbox"
                      checked={oathChecked.step2}
                      onChange={(e) => setOathChecked({...oathChecked, step2: e.target.checked})}
                      className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-800 text-amber-500 focus:ring-amber-500"
                    />
                    <span className="text-sm text-slate-300 font-sans">
                      I accept the absolute statutory ban on <strong>dynastic succession</strong> under Article 3, declaring that no other family member holds an office or ticket within the party[cite: 16, 17].
                    </span>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-slate-900/60 border border-slate-800 rounded-lg cursor-pointer hover:border-slate-700 transition">
                    <input
                      type="checkbox"
                      checked={oathChecked.step3}
                      onChange={(e) => setOathChecked({...oathChecked, step3: e.target.checked})}
                      className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-800 text-amber-500 focus:ring-amber-500"
                    />
                    <span className="text-sm text-slate-300 font-sans">
                      I confirm that my personal net worth does not cross the **₹1 Crore threshold**, and I hold no profitable assets inside the commercial Education and Healthcare sectors[cite: 19, 21].
                    </span>
                  </label>
                </div>

                <button
                  onClick={() => setOathSubmitted(true)}
                  disabled={!oathChecked.step1 || !oathChecked.step2 || !oathChecked.step3}
                  className={`w-full py-3 rounded-lg font-sans font-bold tracking-wide uppercase transition ${
                    oathChecked.step1 && oathChecked.step2 && oathChecked.step3
                      ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Execute Binding Induction Oath
                </button>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4 bg-slate-900/50 rounded-xl border border-amber-500/30 p-6">
                <div className="text-4xl text-amber-500">🏆</div>
                <h3 className="text-xl font-serif font-bold text-slate-200">Induction Registry Complete</h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto font-sans">
                  Your electronic oath signature has been registered and verified against the criteria of the Party High Command and the Prahari Internal Safeguard System[cite: 7, 24].
                </p>
                <button
                  onClick={() => {
                    setOathSubmitted(false);
                    setOathChecked({ step1: false, step2: false, step3: false });
                  }}
                  className="mt-4 px-4 py-2 text-xs font-sans font-medium text-amber-500 border border-amber-500/30 rounded-lg hover:bg-amber-500/10 transition"
                >
                  Register Another Member
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: FUNCTIONAL INTERACTIVE GATED VOTING DASHBOARD */}
        {activeTab === 'voting' && (
          <div className="max-w-2xl mx-auto bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-2xl animate-fadeIn">
            <div className="border-b border-slate-800 pb-4 mb-6 text-center">
              <span className="text-3xl">🗳️</span>
              <h2 className="text-2xl font-serif font-bold text-slate-100 mt-2">Party Leadership Electoral Vault</h2>
              <p className="text-xs text-slate-400 mt-1">Regulated Voting Matrix for High Command & Registered Karyakartas [cite: 7]</p>
            </div>

            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-400 font-sans mb-6 text-center">
              ⚠️ <strong>Mandatory Requirement (Article 1, Clause 1.1):</strong> Nominees must hold absolute baseline independence from any prior political establishments[cite: 4, 5].
            </div>

            {!votingCast ? (
              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-sans font-bold text-slate-300 uppercase tracking-wider mb-2">Select Valid Candidate:</h4>
                  
                  {[
                    { id: 'cand-1', name: 'Candidate Alpha (Independent Tech-Architect)', status: 'Verified Compliant' },
                    { id: 'cand-2', name: 'Candidate Beta (Grassroots Agrarian Labor Activist)', status: 'Verified Compliant' }
                  ].map((cand) => (
                    <div 
                      key={cand.id}
                      onClick={() => setSelectedCandidate(cand.id)}
                      className={`p-4 rounded-xl border flex justify-between items-center cursor-pointer transition ${
                        selectedCandidate === cand.id 
                          ? 'border-amber-500 bg-amber-500/5' 
                          : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <p className="font-serif text-slate-200 text-base">{cand.name}</p>
                        <span className="text-[11px] font-sans bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full mt-1 inline-block">
                          {cand.status}
                        </span>
                      </div>
                      <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${selectedCandidate === cand.id ? 'border-amber-500 bg-amber-500' : 'border-slate-700'}`}>
                        {selectedCandidate === cand.id && <div className="h-2.5 w-2.5 rounded-full bg-slate-950" />}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setVotingCast(true)}
                  disabled={!selectedCandidate}
                  className={`w-full py-3 rounded-lg font-sans font-bold tracking-wide uppercase transition ${
                    selectedCandidate
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Cast Cryptographic Ballot
                </button>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4 bg-slate-900/50 rounded-xl border border-emerald-500/30 p-6 animate-scaleIn">
                <div className="text-4xl text-emerald-500">🛡️</div>
                <h3 className="text-xl font-serif font-bold text-slate-200">Ballot Permanently Sealed</h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto font-sans">
                  Your distributed vote ledger entry has been recorded in full compliance with Decentralized Data Accountability Frameworks under Clause 2.1[cite: 8, 9].
                </p>
                <button
                  onClick={() => {
                    setVotingCast(false);
                    setSelectedCandidate('');
                  }}
                  className="mt-4 px-4 py-2 text-xs font-sans font-medium text-slate-400 border border-slate-800 rounded-lg hover:border-slate-700 transition"
                >
                  Return to Ballot Controls
                </button>
              </div>
            )}
          </div>
        )}

      </main>

      {/* FOOTER STATUTORY LEGAL SIGNATURE */}
      <footer className="bg-slate-950 border-t border-slate-900 py-4 px-6 text-center text-xs text-slate-500 font-sans mt-auto">
        Samajik Nyay Sangh (SNS) Document Router • Built with React & Tailwind Engine • Absolute Systemic Accountability[cite: 9, 52].
      </footer>

    </div>
  );
}
