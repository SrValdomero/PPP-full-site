import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Player } from '@remotion/player';
import { MarthaAnimation } from '../components/Martha/MarthaAnimation';
import { Brain, Zap, Search, CheckCircle, TrendingUp, Bot, ArrowRight, Waves, Sparkles } from 'lucide-react';

const acronymData = [
  { letter: 'M', title: 'Management', desc: 'Intelligent management of complex workflows', icon: <Brain className="w-8 h-8 text-accent" /> },
  { letter: 'A', title: 'Automated', desc: 'Seamless automation of repetitive tasks and emails', icon: <Zap className="w-8 h-8 text-accent" /> },
  { letter: 'R', title: 'Resourceful', desc: 'Instant retrieval of lost files and creative solutions', icon: <Search className="w-8 h-8 text-accent" /> },
  { letter: 'T', title: 'Task', desc: 'Precision focused execution of every daily operation', icon: <CheckCircle className="w-8 h-8 text-accent" /> },
  { letter: 'H', title: 'High Impact', desc: 'Driving powerful results and persuasive presentations', icon: <TrendingUp className="w-8 h-8 text-accent" /> },
  { letter: 'A', title: 'Assistant', desc: 'Your elite AI powered partner for total business success', icon: <Bot className="w-8 h-8 text-accent" /> },
];

export function MarthaAI() {
  return (
    <div className="pt-24 min-h-screen bg-surface-dark relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[30%] h-[40%] bg-brand-light/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-12 lg:pt-20 pb-16 px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 z-10">
        <motion.div 
          className="lg:w-1/2 space-y-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-accent/20">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-sm font-semibold tracking-wider text-accent uppercase">AI Core Integration</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
            Meet <span className="gradient-text-accent">Martha</span>.<br />
            <span className="text-3xl lg:text-5xl text-text-secondary mt-2 block font-medium">Your new favorite employee.</span>
          </h1>
          <p className="text-lg text-text-muted max-w-xl leading-relaxed">
            Welcome to the future of workplace productivity. Martha isn't just a basic chatbot—she's a fully integrated, multi-functional AI assistant designed specifically to elevate your business operations. By taking over the repetitive, time-consuming tasks that drain your resources, Martha empowers your team to focus on what truly matters: strategy, creativity, and growth.
          </p>
          <div className="pt-4 flex items-center gap-6">
            <button className="btn-primary">
              Deploy Martha
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="btn-secondary">
              View Capabilities
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          className="lg:w-1/2 w-full max-w-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="glass-card p-2 md:p-4 rounded-3xl relative">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-brand-light/20 blur-xl -z-10 rounded-3xl" />
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-[#0F0A1A]">
              <Player
                component={MarthaAnimation}
                durationInFrames={1455}
                compositionWidth={1920}
                compositionHeight={1080}
                fps={30}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                controls
                autoPlay
                loop
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden lg:block">
              <div className="glass-card px-6 py-4 rounded-2xl flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="w-3 h-3 rounded-full bg-green-400 animate-ping" />
                <span className="font-medium text-sm text-text-primary uppercase tracking-widest">Martha Online</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* The MARTHA Acronym Section */}
      <section className="py-24 relative z-10 px-6 lg:px-8 max-w-7xl mx-auto border-t border-border-dark">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">The <span className="gradient-text-accent">M.A.R.T.H.A.</span> Advantage</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Discover how every aspect of our AI core is engineered to maximize your operational efficiency and unblock your team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {acronymData.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="glass-card p-8 rounded-2xl border border-border-dark/50 hover:border-accent/50 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-surface-darker border border-border-dark flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-4xl font-black text-accent/30">{item.letter}</span>
                <h3 className="text-2xl font-bold text-text-primary">{item.title}</h3>
              </div>
              <p className="text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Workflow Reimagined / Surfing the AI Wave */}
      <section className="py-24 relative z-10 px-6 lg:px-8 bg-surface-darker/50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold">Your Workflow <span className="text-brand-light">Reimagined</span></h2>
            <div className="space-y-6 text-text-muted text-lg leading-relaxed">
              <p>
                Imagine a workday where data entry handles itself, schedule conflicts are pre-emptively resolved, and lost documents are surfaced in milliseconds. By delegating the grunt work to Martha, you free your human capital to engage in high-value, strategic initiatives. 
              </p>
              <p>
                Martha integrates seamlessly into your existing systems, learning your preferences and adapting to your business logic, ultimately multiplying your team's output without adding overhead.
              </p>
            </div>
            
            <ul className="space-y-4 pt-4">
              {['Constant 24/7 Availability', 'Flawless execution without fatigue', 'Predictive workflow optimization'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-text-primary">
                  <div className="p-1 rounded-full bg-accent/20 text-accent">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <span className="font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 rounded-[2.5rem] relative overflow-hidden text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent pointer-events-none" />
            <Waves className="w-16 h-16 text-accent mx-auto mb-8" />
            <h2 className="text-3xl font-bold mb-6">Surfing the <span className="gradient-text-accent">AI Wave</span></h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              We know the sheer volume of new AI tools can feel like a tsunami. That's why we've designed Martha to be your steadfast anchor and your surfboard. Don't drown in the noise of fragmented applications. Ride the wave of innovation with a single, elite operational partner that transforms generic AI power into targeted, practical business results.
            </p>
            <Link to="/contact" className="btn-primary w-full justify-center">
              Request a Martha Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
