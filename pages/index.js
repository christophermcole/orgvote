import styled from "styled-components";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  return (
    <Main>
      <HeaderSection>
        <Title>Welcome to<br />OrgVote</Title>
        <Description>
          OrgVote is a decentralized voting platform designed to empower student organizations.
          Built on blockchain technology, it ensures secure, transparent, and tamper-proof
          elections for our campus community.
        </Description>
      </HeaderSection>

      <CardSection>
        <NavCard onClick={() => router.push("/create")}>Create an Election</NavCard>
        <NavCard onClick={() => router.push("/vote")}>Vote</NavCard>
        <NavCard onClick={() => router.push("/past-elections")}>Past Elections</NavCard>
      </CardSection>
    </Main>
  );
};

export default Home;

// Styled Components
const Main = styled.div`
  background-color: #001E44;
  min-height: 100vh;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem;
`;

const HeaderSection = styled.section`
  max-width: 800px;
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #c7dfff;
`;

const CardSection = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const NavCard = styled.div`
  background-color: #003366;
  padding: 2rem;
  border-radius: 12px;
  width: 220px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.3s;

  &:hover {
    transform: translateY(-5px);
    background-color: #004080;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;
