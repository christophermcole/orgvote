import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

const PastElections = () => {
  const [pastElections, setPastElections] = useState([]);

  useEffect(() => {
    const fetchPastElections = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "elections"));
        const now = new Date();
        const past = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const end = data.end.toDate();

          if (now > end) {
            past.push({ id: doc.id, ...data });
          }
        });

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
                Ended: {election.end.toDate().toLocaleString()}
              </CardFooter>
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

const NoElectionsMessage = styled.p`
  color: #9DD0FF;
  font-size: 1.2rem;
  text-align: center;
`;

export default PastElections;
