import React, { useState, useEffect } from 'react';
import { LanguageCode, AssistantType } from './types';
import { storageService } from './services/storageService';

// Common Components
import { GovHeader } from './components/common/GovHeader';
import { RealTimeGovSyncBar } from './components/common/RealTimeGovSyncBar';
import { Navbar } from './components/common/Navbar';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { Footer } from './components/common/Footer';

// Home Page Sections
import { HeroSection } from './components/home/HeroSection';
import { NationalImpactSection } from './components/home/NationalImpactSection';
import { QuickActions } from './components/home/QuickActions';
import { MultilingualDemo } from './components/home/MultilingualDemo';
import { HowItWorks } from './components/home/HowItWorks';
import { FeaturedAssistants } from './components/home/FeaturedAssistants';
import { PlatformIntegration } from './components/home/PlatformIntegration';
import { TrustSafety } from './components/home/TrustSafety';

// Dedicated Module Pages
import { ChatInterface } from './components/chat/ChatInterface';
import { PmfbyAssistant } from './components/pmfby/PmfbyAssistant';
import { SchemeExplorer } from './components/schemes/SchemeExplorer';
import { GrievanceWizard } from './components/grievance/GrievanceWizard';
import { PacsServicesPage } from './components/pacs/PacsServicesPage';
import { AdminDashboard } from './components/admin/AdminDashboard';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [currentLang, setCurrentLang] = useState<LanguageCode>('en');
  const [fontSize, setFontSize] = useState<'small' | 'normal' | 'large' | 'xlarge'>('normal');
  const [contrast, setContrast] = useState<'normal' | 'high'>('normal');

  // Query forwarded to chat
  const [chatInitialQuery, setChatInitialQuery] = useState<string>('');
  const [chatAssistantType, setChatAssistantType] = useState<AssistantType>('general');

  // Load preferences from storage on mount
  useEffect(() => {
    const savedLang = storageService.getLanguage();
    const savedFont = storageService.getFontSize();
    const savedContrast = storageService.getContrast();

    setCurrentLang(savedLang);
    setFontSize(savedFont);
    setContrast(savedContrast);

    document.documentElement.setAttribute('data-font-size', savedFont);
    document.documentElement.setAttribute('data-contrast', savedContrast);
  }, []);

  const handleSelectLang = (lang: LanguageCode) => {
    setCurrentLang(lang);
    storageService.setLanguage(lang);
  };

  const handleChangeFontSize = (size: 'small' | 'normal' | 'large' | 'xlarge') => {
    setFontSize(size);
    storageService.setFontSize(size);
  };

  const handleToggleContrast = () => {
    const next = contrast === 'normal' ? 'high' : 'normal';
    setContrast(next);
    storageService.setContrast(next);
  };

  // Launch chat with specific query
  const handleLaunchQuery = (query: string, lang: LanguageCode) => {
    setCurrentLang(lang);
    setChatInitialQuery(query);
    setCurrentTab('chat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Launch chat with specific assistant mode
  const handleLaunchAssistant = (type: AssistantType, defaultPrompt: string) => {
    setChatAssistantType(type);
    setChatInitialQuery(defaultPrompt);
    setCurrentTab('chat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-slate-800 selection:bg-amber-100 selection:text-amber-900">
      {/* 1. Official Government Header */}
      <GovHeader
        currentLang={currentLang}
        onSelectLang={handleSelectLang}
        fontSize={fontSize}
        onChangeFontSize={handleChangeFontSize}
        contrast={contrast}
        onToggleContrast={handleToggleContrast}
      />

      {/* Real-Time Government Data Connectivity Bar */}
      <RealTimeGovSyncBar />

      {/* 2. Main Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentLang={currentLang}
      />

      {/* 3. Main Body Content Rendered per Tab */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <div>
            {/* Hero Section */}
            <HeroSection
              currentLang={currentLang}
              onSelectLang={handleSelectLang}
              onLaunchQuery={handleLaunchQuery}
              onSelectTab={setCurrentTab}
            />

            {/* National Impact Metrics & Beneficiary Stories */}
            <NationalImpactSection
              currentLang={currentLang}
              onSelectTab={setCurrentTab}
            />

            {/* Quick Actions (6 large cards) */}
            <QuickActions
              currentLang={currentLang}
              onSelectTab={setCurrentTab}
              onLaunchQuery={handleLaunchQuery}
            />

            {/* Multilingual Support Section */}
            <MultilingualDemo
              currentLang={currentLang}
              onSelectLang={handleSelectLang}
              onSelectTab={setCurrentTab}
            />

            {/* How CoopSathi AI Works (4-Step process & Architecture) */}
            <HowItWorks currentLang={currentLang} />

            {/* Featured Assistants Section */}
            <FeaturedAssistants
              currentLang={currentLang}
              onLaunchAssistant={handleLaunchAssistant}
            />

            {/* Trust & Safety Section */}
            <TrustSafety currentLang={currentLang} />

            {/* Platform Integration Section (WhatsApp, Telegram, Web) */}
            <PlatformIntegration
              currentLang={currentLang}
              onSelectTab={setCurrentTab}
            />
          </div>
        )}

        {/* Dedicated Live Chatbot Interface */}
        {currentTab === 'chat' && (
          <ChatInterface
            currentLang={currentLang}
            onSelectLang={handleSelectLang}
            initialQuery={chatInitialQuery}
            initialAssistantType={chatAssistantType}
            onSelectTab={setCurrentTab}
          />
        )}

        {/* Dedicated PMFBY Assistant Page */}
        {currentTab === 'pmfby' && (
          <PmfbyAssistant
            currentLang={currentLang}
            onSelectTab={setCurrentTab}
          />
        )}

        {/* Government Scheme Explorer */}
        {currentTab === 'schemes' && (
          <SchemeExplorer
            currentLang={currentLang}
            onLaunchQuery={handleLaunchQuery}
          />
        )}

        {/* PACS Services & Modernization */}
        {currentTab === 'pacs' && (
          <PacsServicesPage
            currentLang={currentLang}
            onOpenChat={(prompt) => handleLaunchQuery(prompt, currentLang)}
            onSelectTab={setCurrentTab}
          />
        )}

        {/* Grievance Redressal & Status Tracking */}
        {currentTab === 'grievance' && (
          <GrievanceWizard
            currentLang={currentLang}
            onSelectTab={setCurrentTab}
          />
        )}

        {/* Admin Dashboard */}
        {currentTab === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* 4. Official Footer */}
      <Footer
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentLang={currentLang}
      />

      {/* 5. Mobile Sticky Bottom Navigation */}
      <MobileBottomNav
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentLang={currentLang}
      />
    </div>
  );
};

export default App;
