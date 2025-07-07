import React from "react";
import styled from "styled-components";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";
import CustomButton from "../components/common/CustomButton";

const HomeContainer = styled.div<{ isAuthenticated: boolean }>`
  min-height: ${(props) =>
    props.isAuthenticated ? "calc(100vh - 80px - 48px)" : "100vh"};
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  box-sizing: border-box;
  padding: 20px;
`;

const HeroSection = styled.div`
  max-width: 800px;
  width: 100%;
  margin-bottom: 40px;
  padding: 0 10px;

  h1 {
    font-size: clamp(2rem, 8vw, 3.5rem);
    font-weight: bold;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    line-height: 1.2;
  }

  p {
    font-size: clamp(1rem, 4vw, 1.3rem);
    margin-bottom: 30px;
    opacity: 0.9;
    line-height: 1.6;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  max-width: 900px;
  width: 100%;
  margin-bottom: 40px;
  padding: 0 10px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 24px 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }

  h3 {
    font-size: clamp(1.2rem, 5vw, 1.5rem);
    margin-bottom: 12px;
    color: #fff;
  }

  p {
    font-size: clamp(0.9rem, 3vw, 1rem);
    opacity: 0.8;
    line-height: 1.5;
    margin: 0;
  }
`;

const CTASection = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 400px;

  @media (max-width: 480px) {
    gap: 12px;
  }

  button {
    min-width: 120px;

    @media (max-width: 480px) {
      width: 100%;
      max-width: 200px;
    }
  }
`;

const Home: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  // Clean URL parameters on component mount to prevent auth conflicts
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("code") || urlParams.has("state")) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleGetStarted = () => {
    if (auth.isAuthenticated) {
      navigate("/mytasks");
    } else {
      try {
        auth.signinRedirect();
      } catch (error) {
        console.error("Sign in error:", error);
      }
    }
  };

  const handleSignIn = () => {
    if (auth.isAuthenticated) {
      navigate("/mytasks");
      return;
    }

    try {
      auth.signinRedirect();
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  return (
    <HomeContainer isAuthenticated={auth.isAuthenticated}>
      <HeroSection>
        <h1>Welcome to TaskHub</h1>
        <p>
          Organize your life, boost your productivity, and achieve your goals
          with our intuitive task management platform. Simple, secure, and
          powerful.
        </p>
      </HeroSection>

      <FeatureGrid>
        <FeatureCard>
          <h3>🚀 Easy Task Creation</h3>
          <p>
            Create and organize tasks effortlessly with our intuitive interface
          </p>
        </FeatureCard>
        <FeatureCard>
          <h3>🔒 Secure Authentication</h3>
          <p>
            Your data is protected with enterprise-grade security via AWS
            Cognito
          </p>
        </FeatureCard>
        <FeatureCard>
          <h3>📱 Responsive Design</h3>
          <p>Access your tasks anywhere, anytime on any device</p>
        </FeatureCard>
      </FeatureGrid>

      <CTASection>
        <CustomButton
          onClickFn={handleGetStarted}
          buttonName={auth.isAuthenticated ? "Go to Tasks" : "Get Started"}
          height="50px"
          width="150px"
        />
        {!auth.isAuthenticated && !auth.isLoading && (
          <CustomButton
            onClickFn={handleSignIn}
            buttonName="Sign In"
            height="50px"
            width="120px"
          />
        )}
      </CTASection>
    </HomeContainer>
  );
};

export default Home;
