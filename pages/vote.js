import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

const VotePage = () => {
    const [elections, setElections] = useState([]);
    const [expanded, setExpanded] = useState(null);

    useEffect(() => {
        const fetchElections = async () => {
            const querySnapshot = await getDocs(collection(db, "elections"));
            const now = new Date();
            const liveElections = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const start = data.start.toDate();
                const end = data.end.toDate();

                if (now >= start && now <= end) {
                    liveElections.push({ id: doc.id, ...data });
                }
            });

            setElections(liveElections);
        };

        fetchElections();
    }, []);

    const toggleExpand = (id) => {
        setExpanded(expanded === id ? null : id);
    };

    return (
        <PageWrapper>
            <Header>VOTE</Header>
            <CardGrid>
                {elections.length === 0 ? (
                    <p style={{ color: "#9DD0FF", fontSize: "1.2rem" }}>No current elections available.</p>
                ) : (
                    elections.map((election) => {
                        const isExpanded = expanded === election.id;
                        return (
                            <ElectionCard
                                key={election.id}
                                $expanded={isExpanded}
                                onClick={() => toggleExpand(election.id)}
                            >
                                <CardTitle>{election.title}</CardTitle>
                                <CardDescription>{election.description}</CardDescription>
                                <ExpandedSection $visible={isExpanded}>
                                    <p>Voting is open until: <strong>{election.end.toDate().toLocaleString()}</strong></p>
                                    <VoteButton disabled>Vote (Coming Soon)</VoteButton>
                                </ExpandedSection>
                            </ElectionCard>
                        );
                    })
                )}
            </CardGrid>
        </PageWrapper>
    );
};

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
    height: ${({ $expanded }) => ($expanded ? "320px" : "180px")};
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
    max-height: ${({ $visible }) => ($visible ? "200px" : "0")};
    transition: all 0.4s ease;
    overflow: hidden;
`;

const VoteButton = styled.button`
    background-color: #9DD0FF;
    color: #001E44;
    border: none;
    border-radius: 8px;
    padding: 0.6rem 1.2rem;
    font-weight: bold;
    cursor: not-allowed;
    margin-top: 0.5rem;
`;

export default VotePage;
