import Header from './components/Header';
import Footer from './components/Footer';
import ColombianMeals from './components/ColombianMeals';
import AppErrorBoundary from './components/AppErrorBoundary';

function App() {
  return (
    <div className="min-h-screen bg-[#f9fafb] text-[#1a1a1a] font-source-sans">
      <Header />
      <AppErrorBoundary>
        <ColombianMeals />
      </AppErrorBoundary>
      <Footer />
    </div>
  );
}

export default App;
