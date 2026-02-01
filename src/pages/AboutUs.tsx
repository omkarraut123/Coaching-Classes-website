import React from 'react';
import type { Founder, CompanyValue, Statistic } from '../Types/abouttypes';
import '../styles/AboutUs.css';
import aniketImage from '../assets/images/aniketimage.jfif';
import omkarImage from '../assets/images/omkarimage.jpg';
import rohitImage from '../assets/images/rohitimage.jfif';

const AboutPage: React.FC = () => {
  // Founders data
  const founders: Founder[] = [
    {
      id: '1',
      name: 'Aniket Dhokane',
      designation: 'Software Engineer',
      image: aniketImage,
      bio: 'B.Tech. in Education, 5+ years of experience in Tech industry.',
      linkedin: 'https://www.linkedin.com/in/aniket-dhokane/',
      email: '',
    },
    {
      id: '2',
      name: 'Omkar Raut',
      designation: 'Software Engineer',
      image: omkarImage,
      bio: 'B.Tech. in Education, 5+ years of experience in Tech industry.',
      linkedin: 'B.Tech. in Education, 5+ years of experience in Tech industry.',
      email: 'oraut2137@gmail.com',
    },
    {
      id: '3',
      name: 'Rohit Dhabale',
      designation: 'Senior Analyst',
      image: rohitImage,
      bio: 'B.Tech. in Education, 5+ years of experience in Tech industry.',
      linkedin: 'https://www.linkedin.com/in/rohit-dhabale-a3514a198/',
      email: '',
    },
  ];

  // Company values
  const values: CompanyValue[] = [
    {
      id: '1',
      title: 'Excellence in Education',
      description: 'We are committed to providing the highest quality education to all our students.',
      icon: '🎓',
    },
    {
      id: '2',
      title: 'Student-Centric Approach',
      description: 'Every student is unique, and we tailor our teaching methods to individual needs.',
      icon: '👨‍🎓',
    },
    {
      id: '3',
      title: 'Innovation',
      description: 'We embrace modern teaching techniques and technology to enhance learning.',
      icon: '💡',
    },
    {
      id: '4',
      title: 'Integrity',
      description: 'We maintain the highest standards of honesty and ethical practices.',
      icon: '🤝',
    },
  ];

  // Statistics
  const statistics: Statistic[] = [
    {
      id: '1',
      value: '5000+',
      label: 'Students Enrolled',
      icon: '👥',
    },
    {
      id: '2',
      value: '98%',
      label: 'Success Rate',
      icon: '📊',
    },
    {
      id: '3',
      value: '50+',
      label: 'Expert Teachers',
      icon: '👨‍🏫',
    },
    {
      id: '4',
      value: '10+',
      label: 'Years of Excellence',
      icon: '⭐',
    },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About Us</h1>
          <p className="hero-subtitle">
            EduCoach is a leading online coaching platform in Maharashtra, offering quality education for students from Grade 5 to Grade 10. We teach the Maharashtra Board syllabus along with competitive exam preparation such as Navodaya, Scholarship, and Pradnyashodh. Classes are available in Marathi, English, and Semi-English mediums, focusing on simple explanations, affordable fees, and quality learning.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision-section">
        <div className="container">
          <div className="mission-vision-grid">
            <div className="mission-box">
              <div className="box-icon">🎯</div>
              <h2>Our Mission</h2>
              <p>
                To provide comprehensive, high-quality coaching that empowers students 
                from Grade 7 to 10 across all mediums, helping them achieve academic 
                excellence and build a strong foundation for their future.
              </p>
            </div>
            <div className="vision-box">
              <div className="box-icon">🔭</div>
              <h2>Our Vision</h2>
              <p>
                To be the most trusted educational partner for students in Maharashtra, 
                recognized for our commitment to personalized learning, innovative teaching 
                methods, and consistent academic results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      {/* <section className="statistics-section">
        <div className="container">
          <div className="statistics-grid">
            {statistics.map((stat) => (
              <div key={stat.id} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Founders Section */}
      <section className="founders-section">
        <div className="container">
          <div className="section-header">
            <h2>Meet Our Founders</h2>
            <p>Experienced educators dedicated to transforming lives through education</p>
          </div>

          <div className="founders-grid">
            {founders.map((founder) => (
              <div key={founder.id} className="founder-card">
                <div className="founder-image-wrapper">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="founder-image"
                  />
                </div>
                <div className="founder-info">
                  <h3 className="founder-name">{founder.name}</h3>
                  <p className="founder-designation">{founder.designation}</p>
                  {founder.bio && (
                    <p className="founder-bio">{founder.bio}</p>
                  )}
                  <div className="founder-social">
                    {founder.linkedin && (
                      <a
                        href={founder.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label="LinkedIn"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    )}
                    {founder.email && (
                      <a
                        href={`mailto:${founder.email}`}
                        className="social-link"
                        aria-label="Email"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Core Values</h2>
            <p>The principles that guide everything we do</p>
          </div>

          <div className="values-grid">
            {values.map((value) => (
              <div key={value.id} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Journey?</h2>
            <p>Join thousands of successful students who have achieved their goals with EduCoach</p>
            <button className="cta-button">Enroll Now</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;