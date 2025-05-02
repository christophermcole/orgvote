import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getContract } from "../lib/contract";

const PastElections = () => {
  const [pastElections, setPastElections] = useState([]);

  useEffect(() => {
    //fetch and filter elections that have ended
    const fetchPastElections = async () => {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const contract = getContract();
        const count = await contract.electionCount();
        const now = Math.floor(Date.now() / 1000);

        const past = [];

        for (let i = 0; i < count; i++) {
          const e = await contract.getElection(i);
          const [title, description, options, startTime, endTime] = e;

          if (now > Number(endTime)) {
            //get vote counts
            const results = await Promise.all(
              options.map(async (option) => {
                const count = await contract.getVotes(i, option);
                return { option, count: count.toString() };
              })
            );

            past.push({
              id: i,
              title,
              description,
              endTime: Number(endTime),
              results,
            });
          }
        }

        setPastElections(past);
      } catch (error) {
        console.error("Error fetching past elections:", error);
      }
    };

    fetchPastElections();
  }, []);

  return (
    <PageWrapper>
      <Header>Past Elections</Header>
      <CardGrid>
        {pastElections.length === 0 ? (
          <NoElectionsMessage>No past elections found.</NoElectionsMessage>
        ) : (
          pastElections.map((election) => (
            <ElectionCard key={election.id}>
              <CardTitle>{election.title}</CardTitle>
              <CardDescription>{election.description}</CardDescription>
              <CardFooter>
                Ended: {new Date(election.endTime * 1000).toLocaleString()}
              </CardFooter>
              <ResultsList>
                {election.results.map((result, index) => (
                  <li key={index}>
                    {result.option}: {result.count} vote{result.count !== "1" ? "s" : ""}
                  </li>
                ))}
              </ResultsList>
            </ElectionCard>
          ))
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
  font-size: 4rem;
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
`;

const CardTitle = styled.h2`
  margin: 0;
  font-size: 1.4rem;
  color: #9DD0FF;
`;

const CardDescription = styled.p`
  margin: 0.5rem 0 0;
`;

const CardFooter = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #c7dfff;
`;

const ResultsList = styled.ul`
  margin-top: 1rem;
  list-style: none;
  padding-left: 0;
  color: #ffffff;

  li {
    margin-bottom: 0.4rem;
  }
`;

const NoElectionsMessage = styled.p`
  color: #9DD0FF;
  font-size: 1.2rem;
  text-align: center;
`;

export default PastElections;
