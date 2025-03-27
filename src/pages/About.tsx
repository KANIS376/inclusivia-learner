
import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Lightbulb, GraduationCap, Users, ScrollText, Globe } from "lucide-react";

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Making education accessible to all students, regardless of their background, location, or learning style.
            </p>
          </div>
          
          <div className="glass rounded-xl p-8 md:p-12">
            <div className="prose prose-lg mx-auto">
              <p>
                At Inclusivia, we believe that quality education should be a right, not a privilege. Our platform 
                uses cutting-edge AI technology to break down barriers to education and create personalized 
                learning experiences that adapt to each student's unique needs.
              </p>
              <p>
                Founded in 2022, our team of educators, technologists, and accessibility experts has 
                been working tirelessly to develop a platform that serves all students, with a special 
                focus on those in rural and underserved communities.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16 bg-accent/50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Lightbulb,
                title: "Innovation",
                description: "We constantly push the boundaries of what's possible in educational technology."
              },
              {
                icon: Users,
                title: "Inclusivity",
                description: "We design with everyone in mind, ensuring no student is left behind."
              },
              {
                icon: GraduationCap,
                title: "Excellence",
                description: "We are committed to providing the highest quality educational content and experiences."
              },
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="glass rounded-xl p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                name: "Dr. Anita Sharma",
                role: "Founder & CEO",
                bio: "Former educator with 15 years of experience in EdTech",
                image: "https://i.pravatar.cc/300?img=1",
              },
              {
                name: "Rajiv Mehta",
                role: "Chief Technology Officer",
                bio: "AI specialist focused on educational applications",
                image: "https://i.pravatar.cc/300?img=4",
              },
              {
                name: "Priya Patel",
                role: "Chief Learning Officer",
                bio: "Curriculum developer specializing in personalized learning",
                image: "https://i.pravatar.cc/300?img=2",
              },
              {
                name: "Dr. Mohammed Ali",
                role: "Head of Accessibility",
                bio: "Expert in creating inclusive digital learning environments",
                image: "https://i.pravatar.cc/300?img=7",
              },
            ].map((member, index) => (
              <div key={index} className="glass rounded-xl p-6 text-center">
                <div className="mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-primary text-sm mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Impact Section */}
      <section className="py-16 md:py-24 bg-accent/50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="md:flex items-center gap-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Impact</h2>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Reaching Rural India</h3>
                    <p className="text-muted-foreground">
                      Our offline-first approach has helped reach over 50,000 students in areas with limited internet connectivity.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <ScrollText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Improved Learning Outcomes</h3>
                    <p className="text-muted-foreground">
                      Students using our platform have shown a 40% improvement in test scores across all subjects.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="glass rounded-xl p-8">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4">
                    <div className="text-3xl font-bold text-primary mb-2">200,000+</div>
                    <div className="text-sm text-muted-foreground">Active Students</div>
                  </div>
                  <div className="p-4">
                    <div className="text-3xl font-bold text-primary mb-2">15</div>
                    <div className="text-sm text-muted-foreground">Languages Supported</div>
                  </div>
                  <div className="p-4">
                    <div className="text-3xl font-bold text-primary mb-2">500+</div>
                    <div className="text-sm text-muted-foreground">Partner Schools</div>
                  </div>
                  <div className="p-4">
                    <div className="text-3xl font-bold text-primary mb-2">1M+</div>
                    <div className="text-sm text-muted-foreground">Learning Hours</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
