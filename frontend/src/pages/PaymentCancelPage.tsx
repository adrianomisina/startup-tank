import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, RefreshCcw } from 'lucide-react';

const PaymentCancelPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
            <XCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Pagamento Cancelado
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          O processo de pagamento foi interrompido ou não pôde ser concluído. Nenhuma cobrança foi realizada.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => navigate('/settings')}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all"
          >
            Tentar Novamente
            <RefreshCcw className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium py-2 transition-all"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage;
