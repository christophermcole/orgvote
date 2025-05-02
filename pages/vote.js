import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getContract } from "../lib/contract";

const VotePage = () => {
    const [elections, setElections] = useState([]);
    const [expanded, setExpanded] = useState(null);
    const [walletConnected, setWalletConnected] = useState(false);

    useEffect(() => {
        const fetchElections = async () => {
          try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            if (!accounts || accounts.length === 0) {
              setWalletConnected(false);
              return;
            }
      
            setWalletConnected(true);
      
            const contract = getContract();
            const count = await contract.electionCount();
            const now = Math.floor(Date.now() / 1000);
      
            const all = [];
            for (let i = 0; i < count; i++) {
              const e = await contract.getElection(i);
              const [title, description, options, startTime, endTime] = e;
      
              if (now >= Number(startTime) && now <= Number(endTime)) {
                all.push({
                  id: i,
                  title,
                  description,
                  options,
                  startTime: Number(startTime),
                  endTime: Number(endTime),
                });
              }
            }
      
            setElections(all);
          } catch (err) {
            console.error("Error loading elections:", err);
            setWalletConnected(false);
          }
        };
      
        fetchElections();
      }, []);
      

    const toggleExpand = (id) => {
        setExpanded(expanded === id ? null : id);
    };

    const handleVote = async (electionId, option) => {
        try {
          //prompt user to connect wallet
          const [address] = await window.ethereum.request({ method: "eth_requestAccounts" });
      
          const contract = getContract();
      
          //check if this wallet has already voted in this election
          const alreadyVoted = await contract.hasVoted(electionId, address);
          if (alreadyVoted) {
            alert("❌ You have already voted in this election.");
            return;
          }
      
          //cast vote
          const tx = await contract.vote(electionId, option);
          await tx.wait();
          alert("✅ Vote submitted successfully!");
        } catch (error) {
          console.error("❌ Vote failed:", error);
          alert("Vote failed. See console for details.");
        }
      };
      
    

    return (
        <PageWrapper>
            <Header>VOTE</Header>
            {!walletConnected && (
                <WarningMessage>
                    ❌ No wallet connected. Please connect your wallet to vote.
                </WarningMessage>
                )}
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
                                <p>
                                    Voting is open until:{" "}
                                    <strong>{new Date(election.endTime * 1000).toLocaleString()}</strong>
                                </p>
                                    {election.options.map((option, i) => (
                                        <VoteButton key={i} onClick={() => handleVote(election.id, option)}>
                                            Vote for {option}
                                        </VoteButton>
                                    ))}
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
    border-radius: 10px;
    margin-right: 0.5rem;
    padding: 0.6rem 1.2rem;
    font-weight: bold;
    cursor: pointer;
    margin-top: 0.5rem;

    &:hover {
        background-color: #b8e0ff;
    }
`;

const WarningMessage = styled.p`
  text-align: center;
  color: #FFAAAA;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;


export default VotePage;
