// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OrgVote {
    struct Election {
        string title;
        string description;
        string[] options;
        uint256 startTime;
        uint256 endTime;
        bool exists;
    }

    address public owner;
    uint256 public electionCount;
    mapping(uint256 => Election) public elections;
    mapping(uint256 => mapping(string => uint256)) public votes;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    //constructor sets the contract deployer as the owner
    constructor() {
        owner = msg.sender;
    }

    //creates a new election with the given details. Only the owner can call this.
    function createElection(
        string memory _title,
        string memory _description,
        string[] memory _options,
        uint256 _startTime,
        uint256 _endTime
    ) public {
        require(msg.sender == owner, "Only owner can create elections");
        require(_startTime < _endTime, "Start must be before end");
        require(_startTime > block.timestamp, "Start must be in the future");
        require(_options.length >= 2, "At least 2 options required");

        elections[electionCount] = Election({
            title: _title,
            description: _description,
            options: _options,
            startTime: _startTime,
            endTime: _endTime,
            exists: true
        });

        electionCount++;
    }

    //casts a vote for a specified option in a given election.
    //ensures the election exists, is active, and the voter hasn't voted in that election yet.
    function vote(uint256 _electionId, string memory _option) public {
        Election storage election = elections[_electionId];
        require(election.exists, "Election does not exist");
        require(block.timestamp >= election.startTime, "Voting not started");
        require(block.timestamp <= election.endTime, "Voting ended");
        require(!hasVoted[_electionId][msg.sender], "Already voted");

        bool validOption = false;
        for (uint256 i = 0; i < election.options.length; i++) {
            if (
                keccak256(bytes(election.options[i])) ==
                keccak256(bytes(_option))
            ) {
                validOption = true;
                break;
            }
        }

        require(validOption, "Invalid option");

        votes[_electionId][_option]++;
        hasVoted[_electionId][msg.sender] = true;
    }

    //returns the number of votes received by a specific option in an election.
    function getVotes(uint256 _electionId, string memory _option)
        public
        view
        returns (uint256)
    {
        return votes[_electionId][_option];
    }

    //retrieves the full details of a specific election by its ID.
    function getElection(uint256 _electionId)
        public
        view
        returns (
            string memory,
            string memory,
            string[] memory,
            uint256,
            uint256
        )
    {
        Election storage e = elections[_electionId];
        require(e.exists, "Election does not exist");
        return (e.title, e.description, e.options, e.startTime, e.endTime);
    }
}
