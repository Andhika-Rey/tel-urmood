import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { createEmptyAnswers } from './constants/design';
import LandingPage from './pages/LandingPage';
import TestFlowPage from './pages/TestFlowPage';
import ResultPage from './pages/ResultPage';
import PhotoboothPage from './pages/PhotoboothPage';

export default function App() {
  const [answers, setAnswers] = useState(createEmptyAnswers);
  const [userName, setUserName] = useState('');

  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/test"
          element={<TestFlowPage answers={answers} setAnswers={setAnswers} userName={userName} setUserName={setUserName} />}
        />
        <Route
          path="/result"
          element={<ResultPage answers={answers} setAnswers={setAnswers} userName={userName} />}
        />
        <Route path="/photobooth" element={<PhotoboothPage />} />
      </Routes>
    </LanguageProvider>
  );
}
