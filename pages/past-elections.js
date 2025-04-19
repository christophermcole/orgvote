import React, { useState } from "react";
import styled from "styled-components";

const pastElectionsData = [
    {
        id: 1,
        title: "Fall 2024 SGA Elections",
        description: "Elected representatives for Student Government Association.",
        results: "President: Alex Johnson (62%) | VP: Priya Desai (38%)",
    },
    {
        id: 2,
        title: "Spring 2024 Club Funding Vote",
        description: "Students voted to approve funding for clubs.",
        results: "Approved (82%) | Rejected (18%)",
    },
    {
        id: 3,
        title: "Dining Plan Feedback Poll",
        description: "Survey on proposed changes to dining plans.",
        results: "Option A: 45% | Option B: 30% | Option C: 25%",
    },
];

const PastElections = () => {
    const [expanded, setExpanded] = useState(null);

    const toggleExpand = (id) => {
        setExpanded(expanded === id ? null : id);
    };

    return (
        <PageWrapper>
            <Header>PAST ELECTIONS</Header>
            <CardGrid>
                {pastElectionsData.map((election) => {
                    const isExpanded = expanded === election.id;
                    return (
                        <ElectionCard key={election.id} $expanded={isExpanded} onClick={() => toggleExpand(election.id)}>
                            <CardTitle>{election.title}</CardTitle>
                            <CardDescription>{election.description}</CardDescription>
                            <ExpandedSection $visible={isExpanded}>
                                <p><strong>Results:</strong> {election.results}</p>
                            </ExpandedSection>
                        </ElectionCard>
                    );
                })}
            </CardGrid>
        </PageWrapper>
    );
};

export default PastElections;

// Styled Components
const PageWrapper = styled.div`
    min-height: 100vh;
    background-color: #001E44;
    padding: 2rem;
    color: white;
`;

const Header = styled.h1`
    font-size: 5rem;
    color: #9DD0FF;
    text-align: center;
    margin-bottom: 2rem;
`;

const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    max-width: 1000px;
    margin: 0 auto;
`;

const ElectionCard = styled.div`
    background-color: #002D62;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: all 0.4s ease;
    overflow: hidden;
    height: ${({ $expanded }) => ($expanded ? "280px" : "160px")};
`;

const CardTitle = styled.h2`
    margin: 0;
    font-size: 1.4rem;
    color: #9DD0FF;
`;

const CardDescription = styled.p`
    margin: 0.5rem 0 0;
`;

const ExpandedSection = styled.div`
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #9DD0FF;
    opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    max-height: ${({ $visible }) => ($visible ? "120px" : "0")};
    transition: all 0.4s ease;
    overflow: hidden;
`;

