import profilePic from './assets/profile.webp';
import carbonLogo from './assets/carbon-logo.ico';

export default function App() {
  const projects = [
    { name: "Carbon Studio", desc: "Design system and creative suite." },
    { name: "Carbon: Flux", desc: "Real-time rendering engine." },
    { name: "Folian", desc: "Minimalist productivity tool." },
    { name: "O.R.V.Y.N", desc: "Experimental AI interface." },
    { name: "Purge", desc: "System optimization utility." },
    { name: "MyClassmate", desc: "Student collaboration platform." },
  ];

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white p-8 md:p-16 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
          <img 
            src={profilePic} 
            alt="Haru Unabara" 
            className="w-48 h-48 rounded-full object-cover shadow-xl border-2 border-[#26262c]" 
          />
          <div>
            <h1 className="text-5xl font-bold mb-4 tracking-tight">Haru Unabara</h1>
            <p className="text-[#8f8c84] text-lg max-w-xl">
              Developer & Designer. Building Carbon Studio, Carbon: Flux, Folian, O.R.V.Y.N, Purge, and MyClassmate.
            </p>
          </div>
        </div>

        {/* Carbon Project Highlight */}
        <div className="flex items-center gap-6 p-6 bg-[#121215] rounded-2xl border border-[#26262c] mb-16">
          <img 
            src={carbonLogo} 
            alt="Carbon Logo" 
            className="w-16 h-16 rounded-xl shadow-md" 
          />
          <div>
            <h2 className="text-2xl font-semibold">Carbon</h2>
            <p className="text-[#8f8c84]">The core design engine powering my projects.</p>
          </div>
        </div>

        {/* Projects Grid */}
        <h2 className="text-3xl font-semibold mb-8 border-b border-[#26262c] pb-4">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="p-6 bg-[#121215] rounded-xl border border-[#26262c] hover:border-[#f3f1ec] transition-colors duration-300"
            >
              <h3 className="text-xl font-medium mb-2">{project.name}</h3>
              <p className="text-[#8f8c84]">{project.desc}</p>
            </div>
          ))}
        </div>

        {/* Glitching Text Fix applied here */}
        <div className="mt-16 text-center">
          <p className="text-[#8f8c84] antialiased transform-gpu will-change-transform backface-hidden">
            © 2026 Haru Unabara. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}