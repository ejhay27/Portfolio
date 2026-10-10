import profilePic from './assets/profile.webp';
import carbonLogo from './assets/carbon-logo.ico';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white p-10">
      {/* Profile Picture (.webp) */}
      <img 
        src={profilePic} 
        alt="Haru Unabara" 
        className="w-48 h-48 rounded-full object-cover shadow-lg mb-6" 
      />
      
      <h1 className="text-4xl font-bold mb-4">Haru Unabara</h1>
      
      {/* Carbon Logo (.ico) */}
      <div className="flex items-center gap-4 mt-8 mb-8">
        <img 
          src={carbonLogo} 
          alt="Carbon Logo" 
          className="w-12 h-12 rounded-xl" 
        />
        <h2 className="text-2xl font-semibold">Carbon</h2>
      </div>
      
      {/* Glitching Text Fix */}
      <p className="text-white antialiased transform-gpu will-change-transform backface-hidden">
        Your glitching text here
      </p>
    </div>
  );
}