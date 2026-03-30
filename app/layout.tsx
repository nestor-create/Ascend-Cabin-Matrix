import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ascend Cabin Optimizer",
  description: "Identify the ideal premium cabin instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen">
        <div className="app-shell">
          <div className="airport-board-bg" aria-hidden="true">
            <div className="board-track board-track-one">
              <div className="board-row">
                ANA · THE ROOM · TOKYO HND · LONDON LHR · NEW YORK JFK · SAN FRANCISCO · CHICAGO · BOARDING
              </div>
              <div className="board-row">
                QATAR · QSUITE · DOHA · NEW YORK JFK · LONDON LHR · PARIS · SINGAPORE · SYDNEY
              </div>
              <div className="board-row">
                AIR FRANCE · LA PREMIERE · PARIS CDG · LOS ANGELES · JFK · TOKYO HND · SINGAPORE
              </div>
              <div className="board-row">
                BRITISH AIRWAYS · CLUB SUITE · LONDON LHR · NEW YORK JFK · LOS ANGELES · SAN FRANCISCO
              </div>
              <div className="board-row">
                LUFTHANSA · ALLEGRIS · MUNICH · NEW YORK JFK · CHICAGO · SAN FRANCISCO · SHANGHAI
              </div>
              <div className="board-row">
                EMIRATES · GAME CHANGER · DUBAI · BRUSSELS · GENEVA · TOKYO HND · FIRST CLASS
              </div>
            </div>

            <div className="board-track board-track-two">
              <div className="board-row">
                CATHAY PACIFIC · ARIA SUITE · HONG KONG · LONDON LHR · SYDNEY · VANCOUVER · SAN FRANCISCO
              </div>
              <div className="board-row">
                EVA AIR · ROYAL LAUREL · TAIPEI · NEW YORK JFK · LOS ANGELES · PARIS · LONDON
              </div>
              <div className="board-row">
                VIRGIN ATLANTIC · UPPER CLASS · LONDON LHR · NEW YORK JFK · LOS ANGELES · DELHI
              </div>
              <div className="board-row">
                UNITED · POLARIS · SAN FRANCISCO · SINGAPORE · NEWARK · LONDON · SYDNEY
              </div>
              <div className="board-row">
                DELTA ONE · LOS ANGELES · SYDNEY · NEW YORK JFK · LONDON · DETROIT · TOKYO HND
              </div>
              <div className="board-row">
                AMERICAN · FLAGSHIP SUITE · CHICAGO ORD · LONDON LHR · DFW · BRISBANE · AUCKLAND
              </div>
            </div>

            <div className="board-track board-track-three">
              <div className="board-row">
                SINGAPORE AIRLINES · SUITES · SINGAPORE · LONDON · SYDNEY · SHANGHAI · A380
              </div>
              <div className="board-row">
                ETIHAD · FIRST APARTMENT · ABU DHABI · LONDON HEATHROW · A380 · FIRST
              </div>
              <div className="board-row">
                JAPAN AIRLINES · SKY SUITE · TOKYO HND · SAN FRANCISCO · JFK · LONDON · DALLAS
              </div>
              <div className="board-row">
                KOREAN AIR · PRESTIGE SUITE · SEOUL ICN · PARIS CDG · JFK · LOS ANGELES · LONDON
              </div>
              <div className="board-row">
                JETBLUE · MINT STUDIO · NEW YORK JFK · PARIS · LONDON · AMSTERDAM · BOSTON
              </div>
              <div className="board-row">
                QANTAS · BUSINESS SUITE · SYDNEY · SINGAPORE · LONDON · MELBOURNE · DALLAS
              </div>
            </div>

            <div className="board-glow" />
            <div className="board-flicker" />
            <div className="board-scanlines" />
            <div className="board-vignette" />
          </div>

          <main className="content-layer">{children}</main>
        </div>
      </body>
    </html>
  );
}