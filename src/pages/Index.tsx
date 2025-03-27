
import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import Hero from "../components/Hero/Hero";
import FeatureGrid from "../components/Features/FeatureGrid";
import AIAssistant from "../components/AI/AIAssistant";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Hero />
      <FeatureGrid />
      
      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Our platform adapts to each student's needs, making learning accessible for everyone.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Personalized Assessment",
                description:
                  "We analyze your learning style, strengths, and areas for improvement.",
              },
              {
                step: "02",
                title: "Customized Learning Path",
                description:
                  "AI creates a learning journey tailored specifically to your needs and goals.",
              },
              {
                step: "03",
                title: "Interactive Learning",
                description:
                  "Engage with AI tutors, interactive content, and a supportive community.",
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="glass rounded-xl p-8 h-full">
                  <div className="text-xs font-semibold text-primary/70 mb-4">
                    STEP {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {item.description}
                  </p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-accent/50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Student Success Stories
            </h2>
            <p className="text-lg text-muted-foreground">
              Hear from students who have transformed their learning experience with our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Being able to learn in Tamil made a huge difference for me. The AI tutor explains concepts in ways I can understand easily.",
                name: "Priya S.",
                location: "Rural Tamil Nadu",
              },
              {
                quote:
                  "The personalized learning path helped me improve my math scores dramatically. The AI knew exactly where I needed help.",
                name: "Rahul M.",
                location: "Mumbai",
              },
              {
                quote:
                  "I can download lessons when I'm at school with Wi-Fi and study at home without internet. It's been a game-changer.",
                name: "Ananya K.",
                location: "Rajasthan",
              },
            ].map((testimonial, index) => (
              <div key={index} className="glass rounded-xl p-8">
                <div className="mb-6 text-primary">
                  <svg
                    width="45"
                    height="36"
                    className="fill-current opacity-30"
                    viewBox="0 0 45 36"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13.415.043c6.852 0 12.247 5.5 12.247 11.84 0 6.34-5.395 11.842-12.247 11.842C6.052 23.725 0 29.535 0 36.02H7.415c0-6.312 6.248-5.665 6-10.812 0 0-1.442.89-3.256.89-6.58 0-12.047-5.055-12.047-11.841C-1.888 7.759 5.752 2.26 13.415.044zm30.073 0c6.852 0 12.247 5.5 12.247 11.84 0 6.34-5.395 11.842-12.247 11.842-7.363 0-13.415 5.81-13.415 12.295h7.415c0-6.312 6.248-5.665 6-10.812 0 0-1.442.89-3.256.89-6.58 0-12.047-5.055-12.047-11.841 0-6.484 7.64-11.982 15.303-14.199z" />
                  </svg>
                </div>
                <blockquote className="text-lg mb-6">
                  {testimonial.quote}
                </blockquote>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="glass rounded-3xl overflow-hidden">
            <div className="px-6 py-12 md:p-12 md:flex items-center justify-between">
              <div className="md:max-w-xl mb-8 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to Transform Your Learning Experience?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Join thousands of students who are already benefiting from our AI-powered platform. Start your personalized learning journey today.
                </p>
                <ul className="space-y-2 mb-8">
                  {[
                    "Personalized learning paths",
                    "Multi-language support",
                    "AI tutoring assistance",
                    "Offline access for rural areas",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass rounded-xl p-8 md:w-96">
                <h3 className="text-xl font-semibold mb-6">Get Started Today</h3>
                <div className="space-y-4">
                  <Link
                    to="/signup"
                    className="block w-full text-center font-medium bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-full transition-colors"
                  >
                    Create Free Account
                  </Link>
                  <Link
                    to="/learn"
                    className="block w-full text-center font-medium border border-input hover:bg-accent/50 px-6 py-3 rounded-full transition-colors"
                  >
                    Explore Platform
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <AIAssistant />
    </Layout>
  );
};

export default Index;
