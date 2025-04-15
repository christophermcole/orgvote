import styled from "styled-components";

const Index = () => {
    return (
        <InfoRow>
            <Container>
                <Logo src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Penn_State_Nittany_Lions_logo.svg" alt="Penn State Logo" />
                <SubContainer>
                    <Header>What is OrgVotes?</Header>
                    <Description>
                        OrgVotes is a decentralized voting platform designed to empower student organizations. Built on blockchain technology, it ensures secure, transparent, and tamper-proof elections for your campus community.
                    </Description>
                </SubContainer>
            </Container>
        </InfoRow>
    );
};

// Styled Components
const InfoRow = styled.section`
    width: 100%;
    height: 100vh;
    background-color: #001E44;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    max-width: 900px;
    width: 100%;
    gap: 2rem;
    background-color: #002D62;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
`;

const Logo = styled.img`
    width: 150px;
    height: auto;
    border-radius: 8px;
    background-color: white;
    padding: 0.5rem;
`;

const SubContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Header = styled.h1`
    font-size: 2rem;
    color: #9DD0FF;
    margin: 0;
`;

const Description = styled.p`
    font-size: 1.1rem;
    color: #FFFFFF;
    line-height: 1.6;
`;

export default Index;
