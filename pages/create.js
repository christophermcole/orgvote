import React, { useState } from "react";
import styled from "styled-components";
import { getContract } from "../lib/contract";

const CreateElection = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
  });

  const [options, setOptions] = useState([""]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const contract = getContract();

      const now = Math.floor(Date.now() / 1000);
      const startTime = Math.floor(new Date(formData.start).getTime() / 1000);
      const endTime = Math.floor(new Date(formData.end).getTime() / 1000);

      if (startTime <= now) {
        alert("Start time must be in the future.");
        return;
      }
      if (endTime <= startTime) {
        alert("End time must be after start time.");
        return;
      }
      if (options.length < 2 || options.some(opt => !opt.trim())) {
        alert("Please enter at least two valid options.");
        return;
      }

      const tx = await contract.createElection(
        formData.title,
        formData.description,
        options,
        startTime,
        endTime
      );
      await tx.wait();

      alert("✅ Election created on-chain!");
      setFormData({
        title: "",
        description: "",
        start: "",
        end: "",
      });
      setOptions([""]);
    } catch (error) {
      console.error("Error creating election:", error);
      alert("Failed to create election: " + error.message);
    }
  };

  return (
    <PageWrapper>
      <FormContainer onSubmit={handleSubmit}>
        <Heading>Create an Election</Heading>

        <Label>Title:</Label>
        <Input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <Label>Description:</Label>
        <TextArea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          required
        />

        <Label>Date & Time:</Label>
        <DateTimeRow>
          <Input
            type="datetime-local"
            name="start"
            value={formData.start}
            onChange={handleChange}
            required
          />
          <span style={{ color: "#9DD0FF" }}>to</span>
          <Input
            type="datetime-local"
            name="end"
            value={formData.end}
            onChange={handleChange}
            required
          />
        </DateTimeRow>

        <Label>Options:</Label>
        {options.map((opt, index) => (
          <Input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={opt}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[index] = e.target.value;
              setOptions(newOptions);
            }}
            required
          />
        ))}
        <OptionControls>
          <AddOptionButton type="button" onClick={() => setOptions([...options, ""])}>+ Add Option</AddOptionButton>
          {options.length > 1 && (
            <AddOptionButton type="button" onClick={() => setOptions(options.slice(0, -1))}>– Remove Last</AddOptionButton>
          )}
        </OptionControls>

        <CreateButton type="submit">CREATE</CreateButton>
      </FormContainer>
    </PageWrapper>
  );
};

// Styled Components
const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #001E44;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const FormContainer = styled.form`
  background-color: #002D62;
  padding: 2.5rem;
  border-radius: 16px;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
`;

const Heading = styled.h1`
  text-align: center;
  color: #9DD0FF;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  color: #9DD0FF;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 8px;
  border: none;
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 8px;
  border: none;
`;

const DateTimeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CreateButton = styled.button`
  margin-top: 1rem;
  background-color: #9DD0FF;
  color: #001E44;
  font-weight: bold;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #b8e0ff;
  }
`;

const OptionControls = styled.div`
  display: flex;
  gap: 1rem;
`;

const AddOptionButton = styled.button`
  background-color: #004080;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #0055a5;
  }
`;


export default CreateElection;
