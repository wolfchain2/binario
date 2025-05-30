
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Spinner from './Spinner';
import { AIMatchProfile } from '../types';
import { getAIMatches } from '../services/geminiService'; 

// --- SVG Icons for internal animation ---
const CogIcon: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5M12 9.75v1.5m0-1.5V6M12 12.75v1.5m0-1.5V18m4.5-4.5H15m-1.5 0H9M15 12l1.5-1.5m0 0l1.5-1.5m-3 3l-1.5-1.5m0 0l-1.5-1.5m3 3l1.5 1.5m0 0l1.5 1.5m-3-3l-1.5 1.5m0 0l-1.5-1.5" />
    </svg>
);

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
// --- End SVG Icons ---

interface AiMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchType: 'investor' | 'borrower'; 
}

const ProfileCard: React.FC<{ profile: AIMatchProfile; onInvest?: (profile: AIMatchProfile) => void; onSolicit?: (profile: AIMatchProfile) => void; matchType: 'investor' | 'borrower' }> = 
  ({ profile, onInvest, onSolicit, matchType }) => {
    const isInvestorViewingLoan = matchType === 'investor' && profile.profileType === 'borrower_loan';
    const isBorrowerViewingInvestor = matchType === 'borrower' && profile.profileType === 'investor';

    let estimatedProfit: number | null = null;
    if (isInvestorViewingLoan && profile.loanAmount && profile.loanInterestRate && profile.loanWeeks) {
        estimatedProfit = profile.loanAmount * profile.loanInterestRate * profile.loanWeeks;
    }

    return (
        <div className="border border-gray-200 p-3 sm:p-4 my-2 sm:my-3 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition-shadow space-y-1">
            <p className="font-semibold text-teal-700 text-sm sm:text-md">ID: {profile.id}</p>
            
            {isInvestorViewingLoan && (
                <>
                    {profile.loanPurpose && <p className="text-xs sm:text-sm text-gray-600">Propósito: <span className="font-medium text-gray-800">{profile.loanPurpose}</span></p>}
                    {profile.loanAmount && <p className="text-xs sm:text-sm text-gray-600">Monto Solicitado: <span className="font-medium text-green-600">${profile.loanAmount.toLocaleString('es-ES')}</span></p>}
                    {profile.loanWeeks && <p className="text-xs sm:text-sm text-gray-600">Plazo: <span className="font-medium text-gray-800">{profile.loanWeeks} semana{profile.loanWeeks > 1 ? 's' : ''}</span></p>}
                    {profile.loanInterestRate && <p className="text-xs sm:text-sm text-gray-600">Tasa Interés Semanal: <span className="font-medium text-gray-800">{(profile.loanInterestRate * 100).toFixed(0)}%</span></p>}
                    {estimatedProfit !== null && <p className="text-xs sm:text-sm text-gray-600">Ganancia Estimada: <span className="font-medium text-teal-600">${estimatedProfit.toFixed(2)}</span></p>}
                    <p className="text-xs sm:text-sm text-gray-600">Riesgo Préstamo: <span className="font-medium text-gray-800">{profile.risk}</span></p>
                    <p className="text-xs sm:text-sm text-gray-600">Calificación Prestatario: <span className="font-medium text-gray-800">{profile.level}</span></p>
                </>
            )}

            {isBorrowerViewingInvestor && (
                <>
                    <p className="text-xs sm:text-sm text-gray-600">Nivel Inversor: <span className="font-medium text-gray-800">{profile.level}</span></p>
                    <p className="text-xs sm:text-sm text-gray-600">Tolerancia al Riesgo: <span className="font-medium text-gray-800">{profile.risk}</span></p>
                    {profile.exactInvestmentAmount && (
                        <p className="text-xs sm:text-sm text-gray-600">
                            Dispuesto a invertir: <span className="font-medium text-green-600">${profile.exactInvestmentAmount.toLocaleString('es-ES')}</span>
                        </p>
                    )}
                    {profile.preferredTerms && (
                        <p className="text-xs sm:text-sm text-gray-600">
                            Términos preferidos: <span className="font-medium text-gray-800">{profile.preferredTerms.weeks} semanas con {(profile.preferredTerms.interestRate * 100).toFixed(0)}% de interés</span>
                        </p>
                    )}
                </>
            )}
            
            <p className="text-xs text-gray-500 pt-1">{profile.detail}</p>

            {isInvestorViewingLoan && onInvest && (
                <button
                    onClick={() => onInvest(profile)}
                    className="mt-2 sm:mt-3 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-1.5 px-2.5 sm:py-2 sm:px-3 rounded-md text-xs sm:text-sm transition duration-150"
                >
                    Invertir en este Préstamo
                </button>
            )}
            {isBorrowerViewingInvestor && onSolicit && (
                <button
                    onClick={() => onSolicit(profile)}
                    className="mt-2 sm:mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1.5 px-2.5 sm:py-2 sm:px-3 rounded-md text-xs sm:text-sm transition duration-150"
                >
                    Solicitar a este Inversionista
                </button>
            )}
        </div>
    );
};


const AiMatchModal: React.FC<AiMatchModalProps> = ({ isOpen, onClose, matchType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AIMatchProfile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [solicitationPhase, setSolicitationPhase] = useState<'idle' | 'thinking' | 'success'>('idle');
  const [solicitedInvestorInfo, setSolicitedInvestorInfo] = useState<AIMatchProfile | null>(null);

  const [investmentPhase, setInvestmentPhase] = useState<'idle' | 'thinking' | 'success'>('idle');
  const [investedLoanInfo, setInvestedLoanInfo] = useState<AIMatchProfile | null>(null);


  const modalTitle = matchType === 'investor' 
    ? 'Buscando Préstamos con IA...' 
    : 'Buscando Inversionistas con IA...';

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setResults([]);
      setError(null);
      setSolicitationPhase('idle'); 
      setSolicitedInvestorInfo(null);
      setInvestmentPhase('idle');
      setInvestedLoanInfo(null);
      
      getAIMatches(matchType)
        .then((data) => {
          setResults(data);
        })
        .catch((err) => {
          console.error("AI Match Error:", err);
          setError(err.message || "Error al buscar coincidencias. Intente de nuevo.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isOpen, matchType]);

  const handleInvestInLoan = (loanProfile: AIMatchProfile) => {
    setInvestedLoanInfo(loanProfile);
    setInvestmentPhase('thinking');

    setTimeout(() => {
      setInvestmentPhase('success');
    }, 1500); 

    setTimeout(() => {
      setInvestmentPhase('idle');
      setInvestedLoanInfo(null);
      onClose(); 
    }, 7000); 
  };

  const handleSolicitInvestor = (investorProfile: AIMatchProfile) => {
    setSolicitedInvestorInfo(investorProfile);
    setSolicitationPhase('thinking');

    setTimeout(() => {
      setSolicitationPhase('success');
    }, 1500);

    setTimeout(() => {
      setSolicitationPhase('idle');
      setSolicitedInvestorInfo(null);
      onClose(); 
    }, 7000); 
  };
  
  const renderSolicitationContent = () => {
    if (solicitationPhase === 'thinking') {
      return (
        <div className="text-center py-6 sm:py-8">
          <CogIcon className="w-12 h-12 sm:w-16 sm:h-16 text-teal-500 mx-auto animate-spin mb-4 sm:mb-5" />
          <h3 className="text-md sm:text-lg font-semibold text-gray-700 mb-1 sm:mb-2">Enviando Solicitud...</h3>
          <p className="text-gray-600 text-xs sm:text-sm">Conectando con el inversionista {solicitedInvestorInfo?.id}.</p>
        </div>
      );
    }
    if (solicitationPhase === 'success' && solicitedInvestorInfo) {
      return (
        <div className="text-center py-6 sm:py-8">
          <CheckCircleIcon className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-3 sm:mb-4" />
          <h3 className="text-md sm:text-lg font-semibold text-green-700 mb-2 sm:mb-3">
            ¡Préstamo Solicitado Exitosamente!
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
            Tu solicitud ha sido enviada al inversionista {solicitedInvestorInfo.id}.
          </p>
          <button
            onClick={onClose}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 sm:px-6 rounded-lg transition duration-150 text-sm"
          >
            Aceptar
          </button>
        </div>
      );
    }
    return null; 
  };
  
  const renderInvestmentContent = () => {
    if (investmentPhase === 'thinking') {
      return (
        <div className="text-center py-6 sm:py-8">
          <CogIcon className="w-12 h-12 sm:w-16 sm:h-16 text-teal-500 mx-auto animate-spin mb-4 sm:mb-5" />
          <h3 className="text-md sm:text-lg font-semibold text-gray-700 mb-1 sm:mb-2">Procesando Inversión...</h3>
          <p className="text-gray-600 text-xs sm:text-sm">Registrando su inversión en el préstamo {investedLoanInfo?.id}.</p>
        </div>
      );
    }
    if (investmentPhase === 'success' && investedLoanInfo) {
      return (
        <div className="text-center py-6 sm:py-8">
          <CheckCircleIcon className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-3 sm:mb-4" />
          <h3 className="text-md sm:text-lg font-semibold text-green-700 mb-2 sm:mb-3">
            ¡Inversión Realizada con Éxito!
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
            Has invertido en el préstamo {investedLoanInfo.id}.
          </p>
          <button
            onClick={onClose}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 sm:px-6 rounded-lg transition duration-150 text-sm"
          >
            Aceptar
          </button>
        </div>
      );
    }
    return null;
  };


  const mainContent = () => (
     <>
        {isLoading && <Spinner />}
        {!isLoading && error && (
          <div className="text-red-500 bg-red-100 p-2 sm:p-3 rounded-md text-center text-sm">
            {error}
          </div>
        )}
        {!isLoading && !error && results.length === 0 && (
          <p className="text-gray-600 text-center text-sm">No se encontraron coincidencias por el momento.</p>
        )}
        {!isLoading && !error && results.length > 0 && (
          <div>
            <h4 className="text-md sm:text-lg font-medium mt-1 sm:mt-2 mb-2 sm:mb-3 text-gray-700">Mejores Coincidencias:</h4>
            <div className="max-h-60 sm:max-h-72 md:max-h-80 overflow-y-auto pr-1 sm:pr-2"> {/* Adjusted max-h */}
              {results.map((profile) => (
                <ProfileCard 
                  key={profile.id} 
                  profile={profile} 
                  onInvest={matchType === 'investor' && profile.profileType === 'borrower_loan' ? handleInvestInLoan : undefined}
                  onSolicit={matchType === 'borrower' && profile.profileType === 'investor' ? handleSolicitInvestor : undefined}
                  matchType={matchType}
                />
              ))}
            </div>
          </div>
        )}
      </>
  );


  return (
    <Modal 
        isOpen={isOpen} 
        onClose={() => {
            if (solicitationPhase === 'idle' && investmentPhase === 'idle') {
                onClose();
            }
        }} 
        title={isLoading ? modalTitle : "Coincidencias Encontradas por IA"}
        size="lg" 
    >
      {solicitationPhase !== 'idle' ? renderSolicitationContent() :
       investmentPhase !== 'idle' ? renderInvestmentContent() :
       mainContent()
      }
    </Modal>
  );
};

export default AiMatchModal;