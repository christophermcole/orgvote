import React, { useState } from "react";
import styled from "styled-components";
import { FaHistory, FaHome, FaPlus, FaVoteYea } from "react-icons/fa";
import { useWallet } from "../lib/walletcontext"; 

const Navbar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { walletAddress, setWalletAddress } = useWallet();

    const connectWallet = async () => { //uses metamask to connect to a user's wallet
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                setWalletAddress(accounts[0]);
                console.log("Connected to:", accounts[0]);
            } catch (err) {
                console.error("Wallet connection failed:", err);
            }
        } else {
            alert("Please install MetaMask!"); 
        }
    };

    return (
        <Nav
            onMouseEnter={() => setIsExpanded(true)} //expands on hover
            onMouseLeave={() => setIsExpanded(false)}
            $expanded={isExpanded}
        >
            <Logo>{isExpanded ? "OrgVote" : "OV"}</Logo>
            <NavItem href="/">
                {isExpanded && <FaHome />}
                {isExpanded && <Label>Home</Label>}
            </NavItem>
            <NavItem href="/create">
                {isExpanded && <FaPlus />}
                {isExpanded && <Label>Create</Label>}
            </NavItem>
            <NavItem href="/vote">
                {isExpanded && <FaVoteYea />}
                {isExpanded && <Label>Vote</Label>}
            </NavItem>
            <NavItem href="/past-elections">
                {isExpanded && <FaHistory />}
                {isExpanded && <Label>Past Elections</Label>}
            </NavItem>

            {isExpanded && <Spacer />}
            {isExpanded && (
                <ConnectButton onClick={connectWallet}>
                    {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...` : "Connect Wallet"} 
                </ConnectButton> //displays first bit of wallet address so users know they're signed in
            )}
        </Nav>
    );
};

export default Navbar;


// Styled Components
const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ $expanded }) => ($expanded ? "75px" : "30px")};
  background-color: #003366;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0 1rem;
  overflow: hidden;
  transition: height 0.3s ease;
  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 1.2rem;
  color: rgb(255, 255, 255);
  font-weight: bold;
`;

const NavItem = styled.a`
  color: #9DD0FF;
  text-decoration: none;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  transition: background 0.3s ease;

  &:hover {
    background-color: #003e85;
  }
`;

const Label = styled.span`
  white-space: nowrap;
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const ConnectButton = styled.button`
  background-color: #9DD0FF;
  color: #001E44;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #b8e0ff;
  }
`;
