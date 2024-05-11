import { useState } from 'react';
import FeatureItem from './FeatureItem';
import { predictDetails } from '../utils/apiService';
import { featuresData } from '../mock/DummyData';

type PredictionData = {
  agify: { age: number };
  genderize: { gender: string };
  nationalize: { country: { country_id: string }[] };
};

export default function PredictionPage() {
  const [name, setName] = useState('');
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
 
   e.preventDefault();
    setLoading(true);
    try {
      // Mock predictDetails function call
      const predictionData: PredictionData = await predictDetails(name);
      setPrediction(predictionData);
    } catch (error) {
      console.error("Error predicting details:", error);
      setError("Error predicting details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Header section */}
      <header className="header">
        <div className="logo">
        <h2 style={{ color: 'white' }}>Identity Predictor</h2>
        </div>
        {/* Links for contacting admin, login/registration, and donation */}
        <nav className="nav">
          <a href="#">Contact Admin</a>
          <a href="#">Login/Register</a>
          <a href="#">Donate</a>
        </nav>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            style={{ width: '400px',height: '40px' }}
          />
          <button type="submit" disabled={loading} className="button"
           style={{width: '150px',height: '40px' }} // Adjusted style
          >
            {loading ? 'Predicting...' : 'Predict'}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {prediction && (
          <div className="prediction">
            <p>Age: {prediction.agify.age || 'Not available'}</p>
            <p>Gender: {prediction.genderize.gender || 'Not available'}</p>
            <p>
              Country: {prediction.nationalize && prediction.nationalize.country && prediction.nationalize.country.length > 0 ? prediction.nationalize.country[0].country_id : 'Not available'}
            </p>
          </div>
        )}

        <div className="features">
          <h2>Features</h2>
          <div className="features-container">
            <div className="features-row">
       
            {featuresData.map((feature, index) => (
              <FeatureItem key={index} {...feature} />
            ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer section */}
      <footer className="footer">
        <p>Contact Admin | Login/Register | Donate</p>
      </footer>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #121212;
          color: #fff;
          font-family: Arial, sans-serif;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background-color: #000;
        }

        .logo img {
          height: 40px;
        }

        .nav a {
          margin-left: 1rem;
          color: #fff;
          text-decoration: none;
        }

        .nav a:hover {
          text-decoration: underline;
        }

        main {
          flex-grow: 1;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .title {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .input {
          padding: 0.5rem;
          margin-bottom: 1rem;
          font-size: 1rem;
          border: none;
          border-radius: 5px;
          margin-right: 1rem;
        }

        .button {
          padding: 0.5rem 2rem;
          background-color: #1db954;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .button:hover {
          background-color: #1ed760;
        }

        .error {
          color: red;
          margin-top: 0.5rem;
        }

        .features {
          margin-top: 2rem;
          text-align: center;
        }

        .features h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .features-row {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
        }

        .footer {
          background-color: #000;
          padding: 1rem;
          text-align: center;
        }

        .footer p {
          margin: 0;
          color: #fff;
          font-size: 0.9rem;
        }

        .footer a {
          color: #fff;
          text-decoration: none;
        }

        .footer a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
