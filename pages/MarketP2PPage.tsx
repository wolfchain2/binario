
import React, { useState, useEffect } from 'react';
import PageSection from '../components/PageSection';
import { MarketItem } from '../types';
import Modal from '../components/Modal'; 
import {
  LOAN_REQUEST_PURPOSES, LOAN_REQUEST_AMOUNTS, LOAN_REQUEST_RISKS,
  FUNDING_OFFER_INTERESTS, FUNDING_OFFER_AMOUNTS, FUNDING_OFFER_RATES
} from '../constants';

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

interface ParsedTerms {
  durationText: string; 
  weeks?: number;
  rate?: number; 
}

function parseLoanTerms(termsString: string): ParsedTerms {
  const rateAndDurationMatch = termsString.match(/(?:Tasa:\s*)?(\d+)(?:%|\s*por ciento)\s*\((\d+)\s*sem(?:ana)?s?\)/i);
  if (rateAndDurationMatch) {
    const rate = parseInt(rateAndDurationMatch[1], 10) / 100;
    const weeks = parseInt(rateAndDurationMatch[2], 10);
    return { durationText: `${weeks} semana${weeks > 1 ? 's' : ''}`, weeks, rate };
  }
  const durationOnlyMatch = termsString.match(/(\d+)\s*semana(s)?/i);
  if (durationOnlyMatch) {
    const weeks = parseInt(durationOnlyMatch[1], 10);
    return { durationText: termsString, weeks }; 
  }
  return { durationText: termsString };
}

const MarketListItem: React.FC<{ item: MarketItem; onAction: (item: MarketItem) => void }> = ({ item, onAction }) => (
  <div className="border border-gray-200 p-3 sm:p-4 rounded-md hover:shadow-lg transition-shadow bg-white">
    <p className="font-semibold text-gray-800 text-sm sm:text-base">{item.user} - <span className="text-xs sm:text-sm text-gray-500">{item.purpose}</span></p>
    <p className="my-1 text-xs sm:text-sm">
      Monto: <span className={`font-bold ${item.type === 'request' ? 'text-teal-600' : 'text-green-600'}`}>
        ${item.amount.toLocaleString('es-ES')}
      </span> - {item.type === 'request' ? 'Condiciones:' : 'Tasa/Plazo:'} <span className="text-gray-700">{item.terms}</span>
    </p>
    {item.risk && <p className="text-xs text-gray-500">Riesgo IA: {item.risk}</p>}
    <button 
      onClick={() => onAction(item)}
      className={`mt-2 sm:mt-3 w-full sm:w-auto text-white text-xs sm:text-sm py-1.5 px-3 sm:py-2 sm:px-4 rounded-md transition-colors ${
        item.type === 'request' 
          ? 'bg-green-500 hover:bg-green-600' 
          : 'bg-teal-500 hover:bg-teal-600'
      }`}
    >
      {item.type === 'request' ? 'Invertir en este préstamo' : 'Solicitar de esta oferta'}
    </button>
  </div>
);

const generateMarketItems = (count: number, type: 'request' | 'offer'): MarketItem[] => {
  const items: MarketItem[] = [];
  const validLoanRequestAmounts = LOAN_REQUEST_AMOUNTS.filter(amount => amount <= 1000); 

  for (let i = 1; i <= count; i++) {
    if (type === 'request') {
      const amount = validLoanRequestAmounts.length > 0 
        ? validLoanRequestAmounts[Math.floor(Math.random() * validLoanRequestAmounts.length)]
        : LOAN_REQUEST_AMOUNTS[Math.floor(Math.random() * LOAN_REQUEST_AMOUNTS.length)];
      
      const randomTermRate = FUNDING_OFFER_RATES[Math.floor(Math.random() * FUNDING_OFFER_RATES.length)];

      items.push({
        id: `LR${i}`,
        user: `Prestatario P${String(i).padStart(3, '0')}`,
        purpose: LOAN_REQUEST_PURPOSES[Math.floor(Math.random() * LOAN_REQUEST_PURPOSES.length)],
        amount: amount,
        terms: randomTermRate, 
        risk: LOAN_REQUEST_RISKS[Math.floor(Math.random() * LOAN_REQUEST_RISKS.length)],
        type: 'request',
      });
    } else { 
      const amount = FUNDING_OFFER_AMOUNTS.length > 0
        ? FUNDING_OFFER_AMOUNTS[Math.floor(Math.random() * FUNDING_OFFER_AMOUNTS.length)]
        : 100; 

      items.push({
        id: `FO${i}`,
        user: `Inversionista I${String(i).padStart(3, '0')}`,
        purpose: `Interesado en ${FUNDING_OFFER_INTERESTS[Math.floor(Math.random() * FUNDING_OFFER_INTERESTS.length)]}`,
        amount: amount,
        terms: FUNDING_OFFER_RATES[Math.floor(Math.random() * FUNDING_OFFER_RATES.length)],
        type: 'offer',
      });
    }
  }
  return items;
};


const MarketP2PPage: React.FC = () => {
  const [loanRequests, setLoanRequests] = useState<MarketItem[]>([]);
  const [fundingOffers, setFundingOffers] = useState<MarketItem[]>([]);

  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [selectedMarketItem, setSelectedMarketItem] = useState<MarketItem | null>(null);
  const [actionModalPhase, setActionModalPhase] = useState<'details' | 'success'>('details');

  useEffect(() => {
    setLoanRequests(generateMarketItems(8, 'request')); 
    setFundingOffers(generateMarketItems(8, 'offer'));
  }, []);

  const handleOpenActionModal = (item: MarketItem) => {
    setSelectedMarketItem(item);
    setActionModalPhase('details');
    setIsActionModalOpen(true);
  };

  const handleCloseActionModal = () => {
    setIsActionModalOpen(false);
    setSelectedMarketItem(null);
    setTimeout(() => setActionModalPhase('details'), 300);
  };

  const handleConfirmAction = () => {
    setActionModalPhase('success');
  };
  
  const getModalTitle = () => {
    if (!selectedMarketItem) return "Detalles";
    if (actionModalPhase === 'success') {
        return selectedMarketItem.type === 'request' ? "Inversión Confirmada" : "Solicitud Confirmada";
    }
    return selectedMarketItem.type === 'request' ? "Detalles del Préstamo" : "Detalles de la Oferta";
  };

  return (
    <PageSection
      title="Market P2P"
      intro="Explore solicitudes de préstamos y ofertas de financiamiento de nuestra comunidad."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-6 sm:mt-8">
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-700">Solicitudes de Préstamo</h3>
          <div className="space-y-3 sm:space-y-4 max-h-[60vh] overflow-y-auto bg-gray-100 p-3 sm:p-4 rounded-lg shadow-inner">
            {loanRequests.length > 0 ? loanRequests.map(item => (
              <MarketListItem 
                key={item.id} 
                item={item} 
                onAction={handleOpenActionModal} 
              />
            )) : <p className="text-gray-500 text-sm">No hay solicitudes de préstamo disponibles.</p>}
          </div>
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-700">Ofertas de Financiamiento</h3>
          <div className="space-y-3 sm:space-y-4 max-h-[60vh] overflow-y-auto bg-gray-100 p-3 sm:p-4 rounded-lg shadow-inner">
            {fundingOffers.length > 0 ? fundingOffers.map(item => (
              <MarketListItem 
                key={item.id} 
                item={item} 
                onAction={handleOpenActionModal}
              />
            )) : <p className="text-gray-500 text-sm">No hay ofertas de financiamiento disponibles.</p>}
          </div>
        </div>
      </div>

      {selectedMarketItem && (
        <Modal
          isOpen={isActionModalOpen}
          onClose={handleCloseActionModal}
          title={getModalTitle()}
          size="md"
        >
          {actionModalPhase === 'details' ? (
            <>
              {selectedMarketItem.type === 'request' ? (
                (() => {
                  const parsed = parseLoanTerms(selectedMarketItem.terms);
                  let estimatedProfit: number | null = null;
                  if (parsed.rate && parsed.weeks && selectedMarketItem.amount) {
                    estimatedProfit = selectedMarketItem.amount * parsed.rate * parsed.weeks;
                  }
                  return (
                    <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                      <p><span className="font-semibold text-gray-700">ID Préstamo:</span> <span className="text-gray-800">{selectedMarketItem.id}</span></p>
                      <p><span className="font-semibold text-gray-700">Prestatario:</span> <span className="text-gray-800">{selectedMarketItem.user}</span></p>
                      <p><span className="font-semibold text-gray-700">Propósito:</span> <span className="text-gray-800">{selectedMarketItem.purpose}</span></p>
                      <p><span className="font-semibold text-gray-700">Monto Solicitado:</span> <span className="font-medium text-green-600">${selectedMarketItem.amount.toLocaleString('es-ES')}</span></p>
                      <p><span className="font-semibold text-gray-700">Plazo:</span> <span className="font-medium text-gray-800">{parsed.durationText}</span></p>
                      {parsed.rate && <p><span className="font-semibold text-gray-700">Tasa Interés Semanal:</span> <span className="font-medium text-gray-800">{(parsed.rate * 100).toFixed(0)}%</span></p>}
                      {estimatedProfit !== null && <p><span className="font-semibold text-gray-700">Ganancia Estimada Inversor:</span> <span className="font-medium text-teal-600">${estimatedProfit.toFixed(2)}</span></p>}
                      {selectedMarketItem.risk && <p><span className="font-semibold text-gray-700">Riesgo Préstamo (IA):</span> <span className="font-medium text-gray-800">{selectedMarketItem.risk}</span></p>}
                    </div>
                  );
                })()
              ) : ( 
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <p><span className="font-semibold text-gray-700">Inversionista:</span> {selectedMarketItem.user}</p>
                  <p><span className="font-semibold text-gray-700">Interés Principal:</span> {selectedMarketItem.purpose}</p>
                  <p><span className="font-semibold text-gray-700">Monto Ofertado:</span> <span className={`font-bold text-green-600`}>${selectedMarketItem.amount.toLocaleString('es-ES')}</span></p>
                  <p><span className="font-semibold text-gray-700">Tasa y Plazo Ofertados:</span> {selectedMarketItem.terms}</p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4 sm:pt-5">
                <button
                  onClick={handleCloseActionModal}
                  className="w-full sm:w-auto px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                  aria-label="Cerrar modal"
                >
                  Cerrar
                </button>
                <button
                  onClick={handleConfirmAction}
                  className={`w-full sm:w-auto px-3 py-2 text-xs sm:text-sm font-medium text-white rounded-md transition-colors ${
                    selectedMarketItem.type === 'request' 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-teal-500 hover:bg-teal-600'
                  }`}
                >
                  {selectedMarketItem.type === 'request' ? 'Confirmar Inversión' : 'Confirmar Solicitud'}
                </button>
              </div>
            </>
          ) : ( 
            <div className="text-center py-3 sm:py-4 space-y-3 sm:space-y-4">
              <CheckCircleIcon className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-2 sm:mb-3" />
              <h4 className="text-md sm:text-lg font-semibold text-gray-800">
                {selectedMarketItem.type === 'request' 
                  ? "¡Inversión realizada con éxito!" 
                  : "¡Solicitud de financiamiento realizada con éxito!"}
              </h4>
              <p className="text-xs sm:text-sm text-gray-600">
                {selectedMarketItem.type === 'request'
                  ? `Has confirmado tu inversión de $${selectedMarketItem.amount.toLocaleString('es-ES')} en el préstamo para "${selectedMarketItem.purpose}".`
                  : `Has confirmado tu solicitud de financiamiento de $${selectedMarketItem.amount.toLocaleString('es-ES')} de la oferta de ${selectedMarketItem.user}.`
                }
              </p>
              <button
                onClick={handleCloseActionModal}
                className="mt-3 sm:mt-4 px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium text-white bg-teal-500 rounded-md hover:bg-teal-600 transition-colors"
              >
                Aceptar y Cerrar
              </button>
            </div>
          )}
        </Modal>
      )}
    </PageSection>
  );
};

export default MarketP2PPage;