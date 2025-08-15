import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CNU Flashcards - Sistema de Estudos",
  description: "Aplicação de flashcards para estudos do CNU com categorias organizadas e sistema de acompanhamento de progresso",
  keywords: ["flashcards", "estudos", "CNU", "educação", "memorização"],
  authors: [{ name: "AlmeidaFabio" }],
  creator: "AlmeidaFabio",
  publisher: "AlmeidaFabio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="pt-BR" 
      className={`${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect para otimização de performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Meta tags adicionais */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CNU Flashcards" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
      </head>
      <body 
        className={`${inter.className} antialiased min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 selection:bg-blue-200 selection:text-blue-900`}
        suppressHydrationWarning
      >
        {/* Skip to main content para acessibilidade */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Pular para o conteúdo principal
        </a>

        {/* Main Content */}
        <main 
          id="main-content" 
          className="relative z-10"
          role="main"
        >
          {children}
        </main>

        {/* Loading indicator para quando a aplicação estiver carregando */}
        <div 
          id="loading-indicator" 
          className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50 opacity-0 pointer-events-none transition-opacity duration-300"
          style={{ display: "none" }}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-purple-200 border-b-transparent rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }}></div>
            </div>
            <p className="text-white text-lg font-medium">Carregando flashcards...</p>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full opacity-5 blur-3xl"></div>
        </div>
      </body>
    </html>
  );
}