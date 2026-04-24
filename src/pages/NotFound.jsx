import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#F5F7FB] px-6 py-20 font-poppins">
      <div className="max-w-xl w-full text-center">
        {/* Ícone ou Ilustração minimalista */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <span className="text-[120px] md:text-[160px] font-black text-[#E5E7EB] leading-none select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex gap-2">
                <span className="h-3 w-3 bg-[#E5258C] rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                <span className="h-3 w-3 bg-[#00B8F1] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                <span className="h-3 w-3 bg-[#FFD400] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[#1C1C1C] mb-4 uppercase tracking-tight">
          Página não encontrada
        </h1>
        
        <p className="text-gray-600 text-[16px] md:text-[18px] leading-relaxed mb-10 max-w-md mx-auto">
          Desculpe, o conteúdo que você está procurando não existe ou foi movido para um novo endereço.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto px-8 py-3 bg-[#1C1C1C] text-white font-semibold rounded-full hover:bg-black transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            Voltar para a Home
          </Link>
          
          <Link
            to="/fale-conosco"
            className="w-full sm:w-auto px-8 py-3 bg-white text-[#1C1C1C] border-2 border-[#1C1C1C] font-semibold rounded-full hover:bg-gray-50 transition-all active:scale-95"
          >
            Fale Conosco
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-400">
            M2 Flex &copy; {new Date().getFullYear()} • Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
