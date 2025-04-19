import React, { useState } from "react";
import styled from "styled-components";
import { FaHistory, FaHome, FaPlus, FaVoteYea } from "react-icons/fa";

const Navbar = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Nav
            onMouseEnter={() => setIsExpanded(true)}
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
        </Nav>
    );
};

export default Navbar;

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
  color:rgb(255, 255, 255);
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
