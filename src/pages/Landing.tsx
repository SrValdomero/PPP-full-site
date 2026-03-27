import { HeroSection } from '../components/landing/HeroSection'
import { AuthorityBar } from '../components/landing/AuthorityBar'
import { ServicesOverview } from '../components/landing/ServicesOverview'
import { SocialProof } from '../components/landing/SocialProof'
import { BusinessHealthPulse } from '../components/landing/BusinessHealthPulse'
import { ThoughtLeadership } from '../components/landing/ThoughtLeadership'

export function Landing() {
  return (
    <>
      <HeroSection />
      <AuthorityBar />
      <div className="section-divider" />
      <ServicesOverview />
      <div className="section-divider" />
      <SocialProof />
      <div className="section-divider" />
      <BusinessHealthPulse />
      <div className="section-divider" />
      <ThoughtLeadership />
    </>
  )
}
