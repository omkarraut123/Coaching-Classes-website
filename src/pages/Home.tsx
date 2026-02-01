import React from 'react'
import bgImage from '../assets/images/mainbanner.webp'
import { useNavigate } from 'react-router-dom'

interface Props {}

function Home(props: Props) {
   const navigate = useNavigate();
    const {} = props

    return (
        <>
    {/* Demo Content */}
      <div className="main-content" style={{
        backgroundImage: `url(${bgImage})`
      }}>
        <section className="hero">
          <h1>Welcome to EduCoach</h1>
          <p>Empowering students from Grade 7 to Grade 10 across all mediums</p>
           <button className="primary-btn" onClick={ () => {
            navigate('/contactus');
           }}>Enquire Now
              </button>
        </section>

        <section className="features">
          <div className="feature-card">
            <h3>📚 Quality Education</h3>
            <p>Expert teachers for Marathi, English, and Semi-English mediums</p>
          </div>
          <div className="feature-card">
            <h3>🎯 Personalized Learning</h3>
            <p>Tailored coaching for Grades 7-10</p>
          </div>
          <div className="feature-card">
            <h3>💯 Proven Results</h3>
            <p>Track record of excellent academic performance</p>
          </div>
        </section>
      </div>
        </>
    )
}

export default Home
