
import React, { useState, useEffect } from 'react';
import PageSection from '../components/PageSection';
import TabSwitcher from '../components/TabSwitcher';
import AiMatchModal from '../components/AiMatchModal';
import SummaryCard from '../components/SummaryCard'; 
import { Loan, LoanTermOption, LoanPurpose } from '../types';
import { LOAN_TERM_OPTIONS, LOAN_PURPOSES } from '../constants';

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

const BorrowerProfileCard: React.FC = () => (
    <div className="flex flex-col sm:flex-row items-center text-center sm:text-left p-3 sm:p-4 bg-white rounded-lg shadow-sm"> {/* Removed mb-6 sm:mb-8, changed shadow */}
        <img 
            src="https://picsum.photos/seed/luciaGarcia/80/80" 
            alt="Foto de perfil Prestataria Lucia Garcia" 
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mr-0 sm:mr-5 mb-3 sm:mb-0 border-2 border-teal-500 object-cover"
        />
        <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-700">Lucia Garcia</h3>
            <p className="text-xs sm:text-sm text-gray-600">lucia.garcia@email.com</p>
            <p className="text-xs sm:text-sm text-gray-600">Miembro desde: 15/02/2023</p>
        </div>
    </div>
);

const LoansTable: React.FC<{ loans: Loan[] }> = ({ loans }) => {
    if (loans.length === 0) {
        return <p className="p-3 sm:p-4 text-xs sm:text-sm text-gray-500 bg-white rounded-md shadow">No hay préstamos para mostrar.</p>;
    }
    return (
        <div className="overflow-x-auto bg-white rounded-md shadow">
            <table className="min-w-full text-xs sm:text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-2 sm:px-3 text-left font-medium text-gray-500 uppercase tracking-wider">Propósito</th>
                        <th className="py-2 px-2 sm:px-3 text-left font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                        <th className="py-2 px-2 sm:px-3 text-left font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Inicio</th>
                        <th className="py-2 px-2 sm:px-3 text-left font-medium text-gray-500 uppercase tracking-wider">Vencim.</th>
                        <th className="py-2 px-2 sm:px-3 text-left font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {loans.map(loan => (
                        <tr key={loan.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-2.5 px-2 sm:px-3 whitespace-nowrap text-gray-700">{loan.purpose}</td>
                            <td className="py-2.5 px-2 sm:px-3 whitespace-nowrap text-gray-700">${loan.amount.toLocaleString('es-ES')}</td>
                            <td className="py-2.5 px-2 sm:px-3 whitespace-nowrap text-gray-700 hidden md:table-cell">{loan.startDate}</td>
                            <td className="py-2.5 px-2 sm:px-3 whitespace-nowrap text-gray-700">{loan.dueDate}</td>
                            <td className="py-2.5 px-2 sm:px-3 whitespace-nowrap">
                                <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    loan.status === 'Activo' ? 'bg-green-100 text-green-800' : 
                                    loan.status === 'Pagado' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                                }`}>
                                    {loan.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

interface LoanRequestDetails { amount: string; purpose: string; termLabel: string; weeklyPayment?: string; totalToPay?: string; errorMessage?: string; }

const BorrowersPage: React.FC = () => {
    const [activeLoanTab, setActiveLoanTab] = useState('enCurso');
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    
    const [loanAmount, setLoanAmount] = useState('');
    const [loanPurpose, setLoanPurpose] = useState<LoanPurpose | string>(LOAN_PURPOSES[0]);
    const [loanWeeks, setLoanWeeks] = useState<number>(LOAN_TERM_OPTIONS[0].value);

    const [showLoanRequestAnimation, setShowLoanRequestAnimation] = useState(false);
    const [loanAnimationPhase, setLoanAnimationPhase] = useState<'idle' | 'thinking' | 'success'>('idle');
    const [loanModalMessageType, setLoanModalMessageType] = useState<'success' | 'error'>('success');
    const [loanRequestDetails, setLoanRequestDetails] = useState<LoanRequestDetails | null>(null);

    const handleLoanRequestSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const amountNum = Number(loanAmount);
        if (isNaN(amountNum) || amountNum < 20 || amountNum > 1000) {
            setLoanRequestDetails({ amount: "N/A", purpose: "N/A", termLabel: "Error", errorMessage: "Monto inválido. Ingrese entre $20 y $1000." });
            setLoanModalMessageType('error'); setLoanAnimationPhase('success'); setShowLoanRequestAnimation(true); return;
        }
        const selectedTerm = LOAN_TERM_OPTIONS.find(opt => opt.value === loanWeeks);
        if (!selectedTerm) return; 
        const totalInterest = amountNum * selectedTerm.interestRate;
        const totalToPay = amountNum + totalInterest;
        const weeklyPayment = totalToPay / loanWeeks;
        setLoanRequestDetails({
            amount: `$${amountNum.toFixed(2)}`, purpose: loanPurpose as string,
            termLabel: `${selectedTerm.value} Sem. (${(selectedTerm.interestRate * 100).toFixed(0)}% int.)`,
            weeklyPayment: `$${weeklyPayment.toFixed(2)}`, totalToPay: `$${totalToPay.toFixed(2)}`
        });
        setLoanModalMessageType('success'); setLoanAnimationPhase('thinking'); setShowLoanRequestAnimation(true);
        setTimeout(() => {
            setLoanAnimationPhase('success'); setLoanAmount(''); setLoanPurpose(LOAN_PURPOSES[0]); setLoanWeeks(LOAN_TERM_OPTIONS[0].value);
        }, 2000);
        setTimeout(() => { if (showLoanRequestAnimation) { setShowLoanRequestAnimation(false); setLoanAnimationPhase('idle'); } }, 8000); 
    };
    
    const closeAnimationModal = () => { setShowLoanRequestAnimation(false); setLoanAnimationPhase('idle'); };

    const currentLoans: Loan[] = [
        { id: 'L001B', purpose: 'Mejoras Hogar', amount: 2000, startDate: '15/01/23', dueDate: '15/01/24', status: 'Activo' },
        { id: 'L002B', purpose: 'Compra PC', amount: 800, startDate: '01/03/24', dueDate: '01/09/24', status: 'Activo' },
    ];
    const pastLoans: Loan[] = [ { id: 'L003B', purpose: 'Reparación Auto', amount: 500, startDate: '10/10/22', dueDate: '10/12/22', status: 'Pagado' }, ];
    const paymentHistory = [ 
        { id: 'P001B', loanId: 'L001B', amount: 166.67, date: '15/02/23', method: 'Transfer' },
        { id: 'P002B', loanId: 'L001B', amount: 166.67, date: '15/03/23', method: 'Transfer' },
    ];

    const loanTabs = [
        { id: 'enCurso', label: 'En Curso', content: <LoansTable loans={currentLoans} /> },
        { id: 'pasados', label: 'Pasados', content: <LoansTable loans={pastLoans} /> },
        { id: 'historialPagos', label: 'Pagos', content: paymentHistory.length > 0 ? (
            <div className="overflow-x-auto bg-white rounded-md shadow">
            <table className="min-w-full text-xs sm:text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-2 sm:px-3 text-left font-medium text-gray-500 uppercase tracking-wider">ID Pago</th>
                        <th className="py-2 px-2 sm:px-3 text-left font-medium text-gray-500 uppercase tracking-wider">ID Préstamo</th>
                        <th className="py-2 px-2 sm:px-3 text-left font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                        <th className="py-2 px-2 sm:px-3 text-left font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Fecha</th>
                        <th className="py-2 px-2 sm:px-3 text-left font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Método</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {paymentHistory.map(p => (
                         <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-2.5 px-2 sm:px-3 whitespace-nowrap text-gray-700">{p.id}</td>
                            <td className="py-2.5 px-2 sm:px-3 whitespace-nowrap text-gray-700">{p.loanId}</td>
                            <td className="py-2.5 px-2 sm:px-3 whitespace-nowrap text-gray-700">${p.amount.toLocaleString('es-ES')}</td>
                            <td className="py-2.5 px-2 sm:px-3 whitespace-nowrap text-gray-700 hidden sm:table-cell">{p.date}</td>
                            <td className="py-2.5 px-2 sm:px-3 whitespace-nowrap text-gray-700 hidden md:table-cell">{p.method}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        ) : <p className="p-3 sm:p-4 text-xs sm:text-sm text-gray-500 bg-white rounded-md shadow">No hay historial de pagos.</p> },
    ];
    
    const blockStyles = "bg-slate-50 p-4 sm:p-5 md:p-6 rounded-lg shadow-md";

    return (
        <PageSection title="Panel de Préstamos" intro="Bienvenido, Lucia Garcia. Gestione sus préstamos.">
            <div className="space-y-6 sm:space-y-8"> {/* Main wrapper for blocks */}
                
                <div className={blockStyles}>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4">Resumen</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                        <SummaryCard title="Préstamos Activos" value="$5,000" />
                        <SummaryCard title="Próximos Pagos" value="$250" subtext="Vence: 30/05" />
                        <SummaryCard title="Rating Riesgo" value="Bajo" />
                        <SummaryCard title="Nivel P2PC" value="Bronce" /> 
                    </div>
                </div>

                <div className={blockStyles}>
                    <BorrowerProfileCard />
                </div>

                <div className={`${blockStyles} text-center`}>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4">Préstamo Inteligente</h3>
                    <button type="button" onClick={() => setIsAiModalOpen(true)}
                        className="w-auto bg-sky-500 hover:bg-sky-600 text-white font-semibold py-1.5 px-3 sm:py-2 sm:px-4 rounded-md text-xs sm:text-sm transition duration-150 flex items-center justify-center mx-auto">
                        <SearchIcon className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5" /> Préstamo con IA
                    </button>
                </div>
                
                <div className={blockStyles}>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4">Solicitar Préstamo</h3>
                     <form onSubmit={handleLoanRequestSubmit} className="space-y-3 sm:space-y-4">
                        <div>
                            <label htmlFor="borrowerLoanAmount" className="block text-xs sm:text-sm font-medium text-gray-700">Monto ($20 - $1000)</label>
                            <input type="number" id="borrowerLoanAmount" name="borrowerLoanAmount" min="20" max="1000" value={loanAmount}
                                onChange={(e) => setLoanAmount(e.target.value)}
                                className="mt-1 block w-full p-2 sm:p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 text-sm bg-white" placeholder="Ej: 500" required />
                        </div>
                        <div>
                            <label htmlFor="borrowerLoanPurpose" className="block text-xs sm:text-sm font-medium text-gray-700">Propósito</label>
                            <select id="borrowerLoanPurpose" name="borrowerLoanPurpose" value={loanPurpose}
                                onChange={(e) => setLoanPurpose(e.target.value as LoanPurpose)}
                                className="mt-1 block w-full p-2 sm:p-2.5 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-sm" required >
                                {LOAN_PURPOSES.map(purpose => <option key={purpose} value={purpose}>{purpose}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="borrowerLoanWeeks" className="block text-xs sm:text-sm font-medium text-gray-700">Plazo (Semanas)</label>
                            <select id="borrowerLoanWeeks" name="borrowerLoanWeeks" value={loanWeeks}
                                onChange={(e) => setLoanWeeks(Number(e.target.value))}
                                className="mt-1 block w-full p-2 sm:p-2.5 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-sm" required >
                                {LOAN_TERM_OPTIONS.map((opt: LoanTermOption) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.value} Sem. ({(opt.interestRate * 100).toFixed(0)}% Int.)
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg transition duration-150 text-sm">
                            Crear Solicitud
                        </button>
                    </form>
                </div>
                
                <div className={blockStyles}>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4">Mis Préstamos</h3>
                    <TabSwitcher tabs={loanTabs} activeTabId={activeLoanTab} onTabChange={setActiveLoanTab}
                        activeTabClassName="bg-teal-500 text-white"
                        inactiveTabClassName="bg-gray-200 text-gray-700 hover:bg-teal-100 hover:text-teal-700"
                        navClassName="flex flex-wrap space-x-1 mb-3 sm:mb-4" />
                </div>

                <div className={blockStyles}>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4">Tu Perfil P2PC-Prestatario</h3>
                    {/* Removed inner div with bg-gray-50, border, shadow. Content is now directly in the block. */}
                    <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-y-2 gap-x-4 mb-3 sm:mb-4">
                        <div className="flex items-center">
                            <StarIcon className="w-6 h-6 sm:w-7 sm:h-7 text-gray-400 mr-1.5 sm:mr-2" />
                            <span className="text-md sm:text-lg font-medium text-gray-700">Nivel: Plata</span>
                        </div>
                        <div className="flex items-center">
                            <IdentificationIcon className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600 mr-1.5 sm:mr-2" />
                            <span className="text-sm sm:text-md text-gray-600">Rating: <span className="font-semibold text-sky-700">1350</span></span>
                        </div>
                    </div>
                    <p className="text-gray-600 my-2 sm:my-3 text-xs sm:text-sm">
                        Tu perfil P2PC-Prestatario refleja tu historial crediticio. Mantener un buen perfil te ayuda a acceder a mejores condiciones.
                    </p>
                    <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                         <div className="text-sm sm:text-md text-gray-700">
                            Puntos Ganados: <span className="font-bold text-teal-600">850</span>
                        </div>
                        <button className="w-full sm:w-auto bg-teal-500 hover:bg-teal-600 text-white font-semibold py-1.5 px-3 sm:py-2 sm:px-4 rounded-md transition-colors flex items-center justify-center text-xs sm:text-sm">
                            <GiftIcon className="mr-1.5 sm:mr-2" /> Canjear Puntos
                        </button>
                    </div>
                </div>
            </div>

            {showLoanRequestAnimation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[1002] p-4">
                    <div className="bg-white p-5 sm:p-6 rounded-xl shadow-2xl text-center max-w-xs sm:max-w-sm w-full transform transition-all duration-300 ease-out scale-100 opacity-100">
                        {loanAnimationPhase === 'thinking' && (
                            <>
                                <CogIcon className="text-teal-500 mx-auto animate-spin mb-4" />
                                <h3 className="text-md sm:text-lg font-semibold text-gray-700 mb-1 sm:mb-2">Procesando...</h3>
                                <p className="text-gray-600 text-xs sm:text-sm">Verificando detalles.</p>
                            </>
                        )}
                        {loanAnimationPhase === 'success' && loanRequestDetails && (
                            <>
                                {loanModalMessageType === 'success' ? (
                                    <CheckCircleIcon className="text-green-500 mx-auto mb-3 sm:mb-4" />
                                ) : (
                                    <XCircleIcon className="text-red-500 mx-auto mb-3 sm:mb-4" />
                                )}
                                <h3 className={`text-md sm:text-lg font-semibold mb-2 sm:mb-3 ${loanModalMessageType === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                                    {loanModalMessageType === 'success' ? "¡Solicitud Enviada!" : "Error en Solicitud"}
                                </h3>
                                {loanModalMessageType === 'success' ? (
                                    <div className="text-xs sm:text-sm text-gray-600 space-y-0.5 text-left px-1 sm:px-2">
                                        <p><strong>Monto:</strong> {loanRequestDetails.amount}</p>
                                        <p><strong>Propósito:</strong> {loanRequestDetails.purpose}</p>
                                        <p><strong>Plazo:</strong> {loanRequestDetails.termLabel}</p>
                                        <p><strong>Pago Sem. Est.:</strong> {loanRequestDetails.weeklyPayment}</p>
                                        <p><strong>Total Est.:</strong> {loanRequestDetails.totalToPay}</p>
                                    </div>
                                ) : ( <p className="text-xs sm:text-sm text-red-600">{loanRequestDetails.errorMessage}</p> )}
                                <button onClick={closeAnimationModal}
                                    className="mt-4 sm:mt-5 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-1.5 px-4 sm:py-2 sm:px-5 rounded-lg transition duration-150 text-sm">
                                    Aceptar
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
            <AiMatchModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} matchType="borrower" />
        </PageSection>
    );
};

export default BorrowersPage;