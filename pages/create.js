import React, { useState } from "react";
import styled from "styled-components";
import { db } from "../lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const CreateElection = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        start: "",
        end: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("✅ Create button clicked. Submitting form...");
        try {
            await addDoc(collection(db, "elections"), {
                ...formData,
                start: Timestamp.fromDate(new Date(formData.start)),
                end: Timestamp.fromDate(new Date(formData.end)),
                createdAt: Timestamp.now()
            });

            alert("Election created successfully!");
            setFormData({
                title: "",
                description: "",
                start: "",
                end: "",
                password: ""
            });
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

                <Label>Password:</Label>
                <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <CreateButton type="button" onClick={handleSubmit}>CREATE</CreateButton>
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

export default CreateElection;
