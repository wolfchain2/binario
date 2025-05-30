
import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import PageSection from '../components/PageSection';
import { HOME_STATS } from '../constants';
import { Stat } from '../types';

// Placeholder icons (Heroicons outline style)
const UserCircleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 sm:w-6 sm:h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const ChartPieIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 sm:w-6 sm:h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" /></svg>
);
const BanknotesIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 sm:w-6 sm:h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75-.75v-.75M7.5 12h9M3.75 12h.008v.008H3.75V12zm0 3h.008v.008H3.75v-3zm0 3h.008v.008H3.75v-3z" /></svg>
);
const DocumentTextIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 sm:w-6 sm:h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
);
const UserGroupIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 sm:w-6 sm:h-6" }) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-3.741-5.757M12 12a3 3 0 100-6 3 3 0 000 6zm-7.27 7.27c-.243-.243-.494-.494-.737-.737L5.69 18.44a9.054 9.054 0 014.052-.924M18.72 18.72a9.094 9.094 0 00-.479-3.741 3 3 0 00-5.757-3.741M12 12a3 3 0 100-6 3 3 0 000 6zm0 0v2.25m0-2.25H9.75m1.75 0H12.25M12 12v9m0 0H9.75M12 21H7.5a2.25 2.25 0 01-2.25-2.25V7.5A2.25 2.25 0 017.5 5.25h9.75c1.24 0 2.25 1.01 2.25 2.25v3.75m0 0A2.25 2.25 0 0119.5 15v3.75A2.25 2.25 0 0117.25 21H12m0 0V12" /></svg>
);
const ArrowDownTrayIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 sm:w-6 sm:h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
);


const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const investorFeatures = [
    { icon: <UserCircleIcon />, title: "Crea un Perfil de Inversión", description: "Configura tu perfil de inversión y define tu apetito de riesgo." },
    { icon: <ChartPieIcon />, title: "Gestión de Cartera por IA", description: "Nuestra IA gestiona tu cartera, optimizando rendimientos y diversificación." },
    { icon: <BanknotesIcon />, title: "Obtén Rendimientos", description: "Recibe rendimientos regulares de tus inversiones a través de los pagos de los prestatarios." },
  ];

  const borrowerFeatures = [
    { icon: <DocumentTextIcon />, title: "Solicita un Préstamo", description: "Envía tu solicitud de préstamo con los detalles necesarios." },
    { icon: <UserGroupIcon />, title: "Emparejamiento por IA", description: "Nuestro algoritmo de IA te conecta con inversores adecuados según tu perfil." },
    { icon: <ArrowDownTrayIcon />, title: "Recibe los Fondos", description: "Los fondos se desembolsan en tu cuenta tras el emparejamiento exitoso." },
  ];

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Hero Section */}
      <div className="relative bg-slate-900 text-white py-16 sm:py-20 md:py-24 px-4 sm:px-6 rounded-xl sm:rounded-2xl shadow-xl text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-center bg-no-repeat" style={{backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M10 10 C 20 20, 40 20, 50 10 S 70 0, 80 10 S 100 20, 100 20\' stroke=\'rgba(255,255,255,0.3)\' stroke-width=\'1\' fill=\'none\'/%3E%3Cpath d=\'M0 30 C 10 40, 30 40, 40 30 S 60 20, 70 30 S 90 40, 100 40\' stroke=\'rgba(255,255,255,0.3)\' stroke-width=\'1\' fill=\'none\'/%3E%3Cpath d=\'M0 50 C 15 60, 35 60, 50 50 S 75 40, 85 50 S 100 60, 100 60\' stroke=\'rgba(255,255,255,0.3)\' stroke-width=\'1\' fill=\'none\'/%3E%3Cpath d=\'M0 70 C 20 80, 40 80, 50 70 S 70 60, 80 70 S 100 80, 100 80\' stroke=\'rgba(255,255,255,0.3)\' stroke-width=\'1\' fill=\'none\'/%3E%3Cpath d=\'M0 90 C 10 100, 30 100, 40 90 S 60 80, 70 90 S 90 100, 100 100\' stroke=\'rgba(255,255,255,0.3)\' stroke-width=\'1\' fill=\'none\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px sm:300px 300px' }}></div>

        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-6 leading-tight">
            Plataforma de Préstamos P2P
            <br className="block" />
            <span className="block mt-1 sm:mt-2">Impulsada por IA</span>
          </h1>
          <p className="text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl md:max-w-3xl mx-auto text-slate-300">
            Conéctese con prestatarios e inversores a través de nuestra innovadora plataforma impulsada por IA. Experimente transacciones fluidas y rendimientos optimizados.
          </p>
          <div className="space-y-3 sm:space-y-0 sm:flex sm:justify-center sm:space-x-4 md:space-x-6">
            <button
              onClick={() => navigate('/inversionistas')}
              className="w-full sm:w-auto bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 sm:py-3.5 sm:px-8 rounded-md sm:rounded-lg text-sm sm:text-base transition duration-150 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75"
              aria-label="Invertir ahora"
            >
              Invertir Ahora
            </button>
            <button
              onClick={() => navigate('/prestamos')}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 px-6 sm:py-3.5 sm:px-8 rounded-md sm:rounded-lg text-sm sm:text-base transition duration-150 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-opacity-75"
              aria-label="Pedir prestado"
            >
              Pedir Prestado
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <PageSection className="bg-teal-50/40 py-8 sm:py-12 rounded-xl sm:rounded-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {HOME_STATS.map((stat: Stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>
      </PageSection>

      {/* ¿Cómo Funciona Nuestra IA? Section */}
      <PageSection
        title="¿Cómo Funciona Nuestra IA?"
        intro="Nuestra plataforma inteligente simplifica el proceso de inversión y préstamo, conectándote de manera eficiente y segura."
        className="py-8 sm:py-12"
        titleClassName="text-2xl sm:text-3xl md:text-4xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left mt-6 sm:mt-10">
          <div className="p-4 sm:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img src="https://picsum.photos/seed/investorAnalysis/600/350" alt="Inteligencia artificial para inversores" className="w-full h-40 sm:h-48 object-cover rounded-lg mb-4 sm:mb-6 shadow-md" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3">Para Inversores</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Invierta en préstamos verificados por nuestra IA y diversifica tu cartera para obtener rendimientos atractivos y minimizar riesgos.
            </p>
          </div>
          <div className="p-4 sm:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img src="https://picsum.photos/seed/borrowerUplift/600/350" alt="Inteligencia artificial para prestatarios" className="w-full h-40 sm:h-48 object-cover rounded-lg mb-4 sm:mb-6 shadow-md" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3">Para Prestatarios</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Accede a préstamos con tasas competitivas y condiciones flexibles. Nuestra IA analiza tu perfil para ofrecerte la mejor opción.
            </p>
          </div>
        </div>
      </PageSection>

      {/* New Features List Section */}
      <PageSection className="py-12 sm:py-16 bg-gray-100/70 rounded-xl sm:rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-10 sm:gap-y-12">
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-6 sm:mb-8 text-center md:text-left">Para Inversores</h3>
            <ul className="space-y-6 sm:space-y-8">
              {investorFeatures.map((feature, index) => (
                <li key={`inv-feat-${index}`} className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-teal-500 text-white flex items-center justify-center mr-3 sm:mr-5 shadow-md">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-md sm:text-lg font-semibold text-gray-700 mb-1">{feature.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-6 sm:mb-8 text-center md:text-left">Para Prestatarios</h3>
            <ul className="space-y-6 sm:space-y-8">
              {borrowerFeatures.map((feature, index) => (
                <li key={`bor-feat-${index}`} className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-teal-500 text-white flex items-center justify-center mr-3 sm:mr-5 shadow-md">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-md sm:text-lg font-semibold text-gray-700 mb-1">{feature.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageSection>
    </div>
  );
};

export default HomePage;