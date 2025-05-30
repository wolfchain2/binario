


import React, { useState } from 'react';
import PageSection from '../components/PageSection';
import AiMatchModal from '../components/AiMatchModal';
import TabSwitcher from '../components/TabSwitcher';
import SummaryCard from '../components/SummaryCard'; 
import { LOAN_TERM_OPTIONS } from '../constants';
import { LoanTermOption } from '../types';

// --- SVG Icons ---
const StarIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 sm:w-6 sm:h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="none" className={className}> 
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.82.61l-4.725-2.885a.563.563 0 00-.652 0l-4.725 2.885a.562.562 0 01-.82-.61l1.285-5.385a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
);

const IdentificationIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 sm:w-6 sm:h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
 </svg>
);

const GiftIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4 sm:w-5 sm:h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1012 10.125A2.625 2.625 0 0012 4.875z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.125C12 10.125 12 12.75 12 12.75m0 0C11.1929 12.75 10.5 13.4429 10.5 14.25V15.75M12 12.75C12.8071 12.75 13.5 13.4429 13.5 14.25V15.75M3 10.125C3 10.125 3 12.75 3 12.75m0 0C2.19289 12.75 1.5 13.4429 1.5 14.25V15.75M3 12.75C3.80711 12.75 4.5 13.4429 4.5 14.25V15.75m18-5.625C21 10.125 21 12.75 21 12.75m0 0C21.8071 12.75 22.5 13.4429 22.5 14.25V15.75m-1.5-3C19.5 13.4429 18.8071 12.75 18 12.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5H19.5" />
 </svg>
);

const CogIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10 sm:w-12 sm:h-12" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5M12 9.75v1.5m0-1.5V6M12 12.75v1.5m0-1.5V18m4.5-4.5H15m-1.5 0H9M15 12l1.5-1.5m0 0l1.5-1.5m-3 3l-1.5-1.5m0 0l-1.5-1.5m3 3l1.5 1.5m0 0l1.5 1.5m-3-3l-1.5 1.5m0 0l-1.5-1.5" />
    </svg>
);

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10 sm:w-12 sm:h-12" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const XCircleIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10 sm:w-12 sm:h-12" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const SearchIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4 sm:w-5 sm:h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7 2a5 5 0 014.472 7.517l4.187 4.187a1 1 0 01-1.414 1.414l-4.187-4.187A5 5 0 117 2zm0 2a3 3 0 100 6 3 3 0 000-6z" clipRule="evenodd" />
    </svg>
);
// --- End SVG Icons ---


interface Investment { id: string; amount: number; rate?: string; estReturn?: number; actualReturn?: number; startDate?: string; dueDate?: string; completedDate?: string; risk?: string; status?: string; purpose?: string; }
interface Earning { investmentId: string; date: string; amount: number; type: string; }

const InvestorProfileCard: React.FC = () => (
    <div className="flex flex-col sm:flex-row items-center text-center sm:text-left p-3 sm:p-4">
        <img 
            src="https://picsum.photos/seed/smilingMan40/80/80" 
            alt="Foto de perfil Inversionista Juan Pérez" 
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mr-0 sm:mr-5 mb-3 sm:mb-0 border-2 border-teal-500 object-cover"
        />
        <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-700">Juan Pérez</h3>
            <p className="text-xs sm:text-sm text-gray-600">Miembro desde: 01/01/2023</p>
            <p className="text-xs sm:text-sm text-gray-600">Nivel: Gold</p>
            <p className="text-xs sm:text-sm text-gray-600">Perfil de Riesgo: Moderado</p>
        </div>
    </div>
);


const InvestmentsTable: React.FC<{ investments: Investment[], type: 'active' | 'completed' }> = ({ investments, type }) => {
    if (investments.length === 0) {
        return <p className="p-3 sm:p-4 text-xs sm:text-sm text-gray-500 bg-white rounded-md shadow">No hay inversiones para mostrar.</p>;
    }
    return (
        <div className="overflow-x-auto bg-white rounded-md shadow">
            <table className="min-w-full text-xs sm:text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-2 sm:px-3 text-left font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="py-2 px-2 sm:px-3 text-left font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                        {type === 'active' && <th className="py-2 px-2 sm:px-3 text-left font-medium text-gray-500 uppercase tracking-wider">Tasa</th>}
                        {type === 'active' && <th className="py-2 px-2 sm:px-3 text-left font-medium text-gray-500 uppercase tracking-wider">Ret.Est.</th>}
                        {type === 'completed' && <th className="py-2 px-2 sm:px-3 text-left font-medium text-gray-500 uppercase tracking-wider">Ret.Obt.</th>}
                        {type === 'active' && <th className="py-2 px-2 sm:px-3 text-left font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Inicio</th>}
                        <th className="py-2 px-2 sm:px-3 text-left font-medium text-gray-500 uppercase tracking-wider">{type === 'active' ? 'Vencim.' : 'Completado'}</th>
                        {type === 'active' && <th className="py-2 px-2 sm:px-3 text-left font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Riesgo</th>}
                        {type === 'active' && <th className="py-2 px-2 sm:px-3 text-left font-medium text-gray-500 uppercase tracking-wider">Estado</th>}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {investments.map(inv => (
                        <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-2.5 px-2 sm:px-3 whitespace-nowrap text-gray-700">{inv.id}</td>
                            <td className="py-2.5 px-2 sm:px-3 whitespace-nowrap text-gray-700">${inv.amount.toLocaleString('es-ES')}</td>
                            {type === 'active' && <td className="py-2.5 px-2 sm:px-3 whitespace-nowrap text-gray-700">{inv.rate}</td>}
                            {type === 'active' && <td className="py-2.5 px-2 sm:px-3 whitespace-nowrap text-green-600">${inv.estReturn?.toLocaleString('es-ES')}</td>}
                            {type === 'completed' && <td className="py-2.5 px-2 sm:px-3 whitespace-nowrap text-green-600">${inv.actualReturn?.toLocaleString('es-ES')}</td>}
                            {type === 'active' && <td className="py-2.5 px-2 sm:px-3 whitespace-nowrap text-gray-700 hidden md:table-cell">{inv.startDate}</td>}
                            <td className="py-2.5 px-2 sm:px-3 whitespace-nowrap text-gray-700">{type === 'active' ? inv.dueDate : inv.completedDate}</td>
                            {type === 'active' && <td className="py-2.5 px-2 sm:px-3 whitespace-nowrap text-gray-700 hidden sm:table-cell">{inv.risk}</td>}
                            {type === 'active' && inv.status && (
                                <td className="py-2.5 px-2 sm:px-3 whitespace-nowrap">
                                    <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        inv.status === 'Activa' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {inv.status}
                                    </span>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const EarningsHistoryTable: React.FC<{ earnings: Earning[] }> = ({ earnings }) => {
    if (earnings.length === 0) {
        return <p className="p-3 sm:p-4 text-xs sm:text-sm text-gray-500 bg-white rounded-md shadow">No hay historial de rendimientos.</p>;
    }
    return (
        <div className="overflow-x-auto bg-white rounded-md shadow">
            <table className="min-w-full text-xs sm:text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-2 sm:px-3 text-left font-medium text-gray-500 uppercase tracking-wider">ID Inversión</th>
                        <th className="py-2 px-2 sm:px-3 text-left font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                        <th className="py-2 px-2 sm:px-3 text-left font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                        <th className="py-2 px-2 sm:px-3 text-left font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Tipo</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {earnings.map(earning => (
                        <tr key={`${earning.investmentId}-${earning.date}`} className="hover:bg-gray-50 transition-colors">
                            <td className="py-2.5 px-2 sm:px-3 whitespace-nowrap text-gray-700">{earning.investmentId}</td>
                            <td className="py-2.5 px-2 sm:px-3 whitespace-nowrap text-gray-700">{earning.date}</td>
                            <td className="py-2.5 px-2 sm:px-3 whitespace-nowrap text-green-600">${earning.amount.toLocaleString('es-ES')}</td>
                            <td className="py-2.5 px-2 sm:px-3 whitespace-nowrap text-gray-700 hidden sm:table-cell">{earning.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

interface InvestmentModalDetails { amount?: string; termLabel?: string; expectedReturn?: string; errorMessage?: string; }

const InvestorsPage: React.FC = () => {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [activeInvestmentTab, setActiveInvestmentTab] = useState('activas');
  
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [investmentWeeks, setInvestmentWeeks] = useState<number>(LOAN_TERM_OPTIONS[0].value);

  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [investmentAnimationPhase, setInvestmentAnimationPhase] = useState<'idle' | 'thinking' | 'success'>('idle');
  const [investmentModalMessageType, setInvestmentModalMessageType] = useState<'success' | 'error'>('success');
  const [investmentModalDetails, setInvestmentModalDetails] = useState<InvestmentModalDetails | null>(null);

  const handleCreateInvestmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = Number(investmentAmount);
    if (isNaN(amountNum) || amountNum < 1 || amountNum > 100) {
        setInvestmentModalDetails({ errorMessage: "Monto inválido. Ingrese entre $1 y $100." });
        setInvestmentModalMessageType('error'); setInvestmentAnimationPhase('success'); setShowInvestmentModal(true); return;
    }
    const selectedTermOption = LOAN_TERM_OPTIONS.find(opt => opt.value === investmentWeeks);
    if (!selectedTermOption) { 
        setInvestmentModalDetails({ errorMessage: "Plazo inválido." });
        setInvestmentModalMessageType('error'); setInvestmentAnimationPhase('success'); setShowInvestmentModal(true); return;
    }
    const expectedReturn = amountNum * selectedTermOption.interestRate;
    setInvestmentModalDetails({
        amount: `$${amountNum.toFixed(2)}`,
        termLabel: `${selectedTermOption.value} Semana${selectedTermOption.value > 1 ? 's' : ''}`,
        expectedReturn: `$${expectedReturn.toFixed(2)} (${(selectedTermOption.interestRate * 100).toFixed(0)}%)`
    });
    setInvestmentModalMessageType('success'); setInvestmentAnimationPhase('thinking'); setShowInvestmentModal(true);
    setTimeout(() => { setInvestmentAnimationPhase('success'); setInvestmentAmount(''); setInvestmentWeeks(LOAN_TERM_OPTIONS[0].value); }, 2000);
    setTimeout(() => { if (showInvestmentModal) { setShowInvestmentModal(false); setInvestmentAnimationPhase('idle'); } }, 8000); 
  };
  
  const closeInvestmentModal = () => { setShowInvestmentModal(false); setInvestmentAnimationPhase('idle'); };

  const activeInvestments: Investment[] = [
    { id: 'L001A', purpose: 'Negocio', amount: 50, rate: '7%(3s)', estReturn: 3.5, startDate: '01/04/24', dueDate: '22/04/24', risk: 'Bajo', status: 'Activa' },
    { id: 'L002B', purpose: 'Educación', amount: 75, rate: '10%(4s)', estReturn: 7.5, startDate: '15/04/24', dueDate: '13/05/24', risk: 'Medio', status: 'Activa' },
  ];
  const completedInvestments: Investment[] = [ { id: 'L003C', amount: 90, actualReturn: 9, completedDate: '15/03/24' }, ];
  const earningsHistory: Earning[] = [
    { investmentId: 'L003C', date: '15/03/24', amount: 9, type: 'Interés' },
    { investmentId: 'L003C', date: '15/03/24', amount: 90, type: 'Capital' },
  ];

  const investmentTabs = [
    { id: 'activas', label: 'Activas', content: <InvestmentsTable investments={activeInvestments} type="active" /> },
    { id: 'completadas', label: 'Completadas', content: <InvestmentsTable investments={completedInvestments} type="completed" /> },
    { id: 'historial', label: 'Historial', content: <EarningsHistoryTable earnings={earningsHistory} /> },
  ];
  
  const blockStyles = "bg-slate-50 p-4 sm:p-5 md:p-6 rounded-lg shadow-md";

  return (
    <PageSection title="Panel de Inversionistas" intro="Bienvenido, Juan Pérez. Gestione sus inversiones.">
      <div className="space-y-6 sm:space-y-8">
        
        <div className={blockStyles}> {/* Block 1: Resumen */}
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4">Resumen</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                <SummaryCard title="Capital Activo" value="$7,500" />
                <SummaryCard title="Retornos Prox. Mes" value="$120" />
                <SummaryCard title="Nivel Inversor" value="Gold" />
                <SummaryCard title="Rating P2PC" value="1500" />
            </div>
        </div>

        <div className={blockStyles}> {/* Block 2: Profile Card */}
            <InvestorProfileCard />
        </div>
        
        <div className={`${blockStyles} text-center`}> {/* Block 3: Inversión Inteligente (Moved up) */}
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4">Inversión Inteligente</h3>
            <button type="button" onClick={() => setIsAiModalOpen(true)}
                className="w-auto bg-sky-500 hover:bg-sky-600 text-white font-semibold py-1.5 px-3 sm:py-2 sm:px-4 rounded-md text-xs sm:text-sm transition duration-150 flex items-center justify-center mx-auto">
                <SearchIcon className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5" /> Invertir con IA
            </button>
        </div>

        <div className={blockStyles}> {/* Block 4: Realizar Inversión (Moved down) */}
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4">Realizar Inversión</h3>
            <form onSubmit={handleCreateInvestmentSubmit} className="space-y-3 sm:space-y-4">
                <div>
                    <label htmlFor="investmentAmount" className="block text-xs sm:text-sm font-medium text-gray-700">Monto ($1 - $100)</label>
                    <input type="number" id="investmentAmount" name="investmentAmount" min="1" max="100" value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                        className="mt-1 block w-full p-2 sm:p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 text-sm bg-white" placeholder="Ej: 50" required />
                </div>
                <div>
                    <label htmlFor="investmentWeeks" className="block text-xs sm:text-sm font-medium text-gray-700">Plazo (Semanas)</label>
                    <select id="investmentWeeks" name="investmentWeeks" value={investmentWeeks}
                        onChange={(e) => setInvestmentWeeks(Number(e.target.value))}
                        className="mt-1 block w-full p-2 sm:p-2.5 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-sm" required >
                        {LOAN_TERM_OPTIONS.map((opt: LoanTermOption) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.value} Sem. ({(opt.interestRate * 100).toFixed(0)}% Ret.)
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg transition duration-150 text-sm">
                    Crear Inversión
                </button>
            </form>
        </div>
        
        <div className={blockStyles}> {/* Block 5: Mis Inversiones */}
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4">Mis Inversiones</h3>
            <TabSwitcher tabs={investmentTabs} activeTabId={activeInvestmentTab} onTabChange={setActiveInvestmentTab}
                activeTabClassName="bg-teal-500 text-white"
                inactiveTabClassName="bg-gray-200 text-gray-700 hover:bg-teal-100 hover:text-teal-700"
                navClassName="flex flex-wrap space-x-1 mb-3 sm:mb-4" />
        </div>

        <div className={blockStyles}> {/* Block 6: Tu Perfil P2PC-Inversor */}
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4">Tu Perfil P2PC-Inversor</h3>
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-y-2 gap-x-4 mb-3 sm:mb-4">
                <div className="flex items-center">
                    <StarIcon className="w-6 h-6 sm:w-7 sm:h-7 text-amber-500 mr-1.5 sm:mr-2" />
                    <span className="text-md sm:text-lg font-medium text-gray-700">Nivel Oro</span>
                </div>
                <div className="flex items-center">
                    <IdentificationIcon className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600 mr-1.5 sm:mr-2" />
                    <span className="text-sm sm:text-md text-gray-600">Rating: <span className="font-semibold text-sky-700">1500</span></span>
                </div>
            </div>
            <p className="text-gray-600 my-2 sm:my-3 text-xs sm:text-sm">
                Tu perfil P2PC-Inversor define tu tolerancia al riesgo y preferencias. Nuestra IA lo utiliza para optimizar tu cartera.
            </p>
            <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                    <div className="text-sm sm:text-md text-gray-700">
                    Puntos Ganados: <span className="font-bold text-teal-600">1250</span>
                </div>
                <button className="w-full sm:w-auto bg-teal-500 hover:bg-teal-600 text-white font-semibold py-1.5 px-3 sm:py-2 sm:px-4 rounded-md transition-colors flex items-center justify-center text-xs sm:text-sm">
                    <GiftIcon className="mr-1.5 sm:mr-2" /> Canjear Puntos
                </button>
            </div>
        </div>
      </div>

      {showInvestmentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[1002] p-4">
              <div className="bg-white p-5 sm:p-6 rounded-xl shadow-2xl text-center max-w-xs sm:max-w-sm w-full transform transition-all duration-300 ease-out scale-100 opacity-100">
                  {investmentAnimationPhase === 'thinking' && (
                      <>
                          <CogIcon className="text-teal-500 mx-auto animate-spin mb-4" />
                          <h3 className="text-md sm:text-lg font-semibold text-gray-700 mb-1 sm:mb-2">Procesando...</h3>
                          <p className="text-gray-600 text-xs sm:text-sm">Registrando su inversión.</p>
                      </>
                  )}
                  {investmentAnimationPhase === 'success' && investmentModalDetails && (
                      <>
                          {investmentModalMessageType === 'success' ? (
                              <CheckCircleIcon className="text-green-500 mx-auto mb-3 sm:mb-4" />
                          ) : (
                              <XCircleIcon className="text-red-500 mx-auto mb-3 sm:mb-4" />
                          )}
                          <h3 className={`text-md sm:text-lg font-semibold mb-2 sm:mb-3 ${investmentModalMessageType === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                              {investmentModalMessageType === 'success' ? "¡Inversión Realizada!" : "Error en Inversión"}
                          </h3>
                          {investmentModalMessageType === 'success' ? (
                              <div className="text-xs sm:text-sm text-gray-600 space-y-0.5 text-left px-1 sm:px-2">
                                  <p><strong>Monto:</strong> {investmentModalDetails.amount}</p>
                                  <p><strong>Plazo:</strong> {investmentModalDetails.termLabel}</p>
                                  <p><strong>Ret. Esperado:</strong> {investmentModalDetails.expectedReturn}</p>
                              </div>
                          ) : ( <p className="text-xs sm:text-sm text-red-600">{investmentModalDetails.errorMessage}</p> )}
                          <button onClick={closeInvestmentModal}
                              className="mt-4 sm:mt-5 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-1.5 px-4 sm:py-2 sm:px-5 rounded-lg transition duration-150 text-sm">
                              Aceptar
                          </button>
                      </>
                  )}
              </div>
          </div>
      )}
      <AiMatchModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} matchType="investor" />
    </PageSection>
  );
};

export default InvestorsPage;