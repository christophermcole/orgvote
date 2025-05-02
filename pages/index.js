import styled from "styled-components";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  //array of student org images and albels for the carousel
  const images = [
    { src: "/orgs/mocktrial.jpg", label: "Mock Trial" },
    { src: "/orgs/chess.jpg", label: "Chess Club" },
    { src: "/orgs/thon.jpg", label: "THON" },
    { src: "/orgs/climbingclub.jpg", label: "Climbing Club" },
    { src: "/orgs/concertchoir.jpg", label: "Concert Choir" },
    { src: "/orgs/esports.jpg", label: "eSports" },
    { src: "/orgs/outing club.jpg", label: "Outing Club" },
    { src: "/orgs/robotics.jpg", label: "Robotics Club" },
    { src: "/orgs/swingdance.jpg", label: "Swing Dance Club" },
    { src: "/orgs/student farm.jpg", label: "Student Farm" },
    { src: "/orgs/nittanyai.jpg", label: "Nittany AI" },
  ];

  return (
    <Main>
      <RowSection>
        <Image src="/PSU-Logo.png" alt="Penn State Logo" />
        <HeaderSection>
          <Title>Welcome to OrgVote</Title>
          <Description>
            OrgVote is a decentralized voting platform designed to empower student organizations.
            Built on blockchain technology, it ensures secure, transparent, and tamper-proof
            elections for our campus community.
          </Description>
        </HeaderSection>
      </RowSection>

      <CardSection>
        <NavCard onClick={() => router.push("/create")}>Create an Election</NavCard>
        <NavCard onClick={() => router.push("/vote")}>Vote</NavCard>
        <NavCard onClick={() => router.push("/past-elections")}>Past Elections</NavCard>
      </CardSection>

      {/* auto-scrolling image carousel */}
      <CarouselWrapper>
        <CarouselTrack>
          {images.concat(images).map((img, index) => (
            <CarouselItem key={index}>
              <CarouselImage src={img.src} alt={img.label} />
              <ImageLabel>{img.label}</ImageLabel>
            </CarouselItem>
          ))}
        </CarouselTrack>
      </CarouselWrapper>

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
  padding-top: 60px;
`;

const RowSection = styled.section`
  max-width: 800px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 325px;
  padding-right: 40px;
  border-radius: 12px;
  object-fit: contain;
`;

const HeaderSection = styled.section`
  max-width: 800px;
  text-align: center;
  margin-bottom: 1rem;
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
  font-size: 1.5rem;
  line-height: 1.6;
  color: #c7dfff;
`;

const CarouselWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  margin-top: 3rem;
`;
//animated horizontal scrolling for images
const CarouselTrack = styled.div`
  display: flex;
  animation: scroll 40s linear infinite;
  gap: 2rem;

  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`;

const CarouselItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CarouselImage = styled.img`
  height: 220px;
  width: auto;
  border-radius: 8px;
`;

const ImageLabel = styled.span`
  color: #c7dfff;
  font-size: 1.5rem;
  margin-top: 0.4rem;
  text-align: center;
`;

const CardSection = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0px;
`;

const NavCard = styled.div`
  background-color: #003366;
  padding: 2rem;
  border-radius: 12px;
  width: 350px;
  height: 125px;
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.3s;

  display: flex;                 
  justify-content: center;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
    background-color: #004080;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;
