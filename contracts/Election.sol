pragma solidity >=0.4.21 <0.7.0;

contract Election {
    // CONSTANTS
    uint constant public NUMBER_OF_CANDIDATES = 3;

    // Candidate info
    struct CandidateInfo {
        string name;
        string bio;
    }
    CandidateInfo[] private candidateInfo;

    // Candidate
    struct Candidate {
        uint id;
        CandidateInfo info;
        address owner;
        uint voteCount;
    }

    // Read/Write Candidates
    mapping(uint => Candidate) candidates;

    // Store number of Candidates
    uint public candidatesCount;

    // Create candidate profiles
    function populateCandidateInfo() private {
        candidateInfo.push(CandidateInfo("Albus Dumbledore", "Archmage"));
        candidateInfo.push(CandidateInfo("Harry Potter", "Wizard"));
        candidateInfo.push(CandidateInfo("Severus Snape", "Evil"));
    }

    function addCandidate(CandidateInfo memory _info, address _owner) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _info, _owner, 0);
    }

    constructor(address[] memory _candidates) public {
        populateCandidateInfo();
        for(uint i = 0; i < NUMBER_OF_CANDIDATES; i++) {
            addCandidate(candidateInfo[i], _candidates[i]);
        }
    }

    function getCandidateName(uint id) public view returns(string memory) {
        require(id<=NUMBER_OF_CANDIDATES, "index out of bounds");
        return candidates[id].info.name;
    }

    function getCandidateBio(uint id) public view returns(string memory) {
        require(id<=NUMBER_OF_CANDIDATES, "index out of bounds");
        return candidates[id].info.bio;
    }

    function getCandidateAddress(uint id) public view returns(address) {
        require(id<=NUMBER_OF_CANDIDATES, "index out of bounds");
        return candidates[id].owner;
    }

    function getCandidateVotes(uint id) public view returns(uint) {
        require(id<=NUMBER_OF_CANDIDATES, "index out of bounds");
        return candidates[id].voteCount;
    }
}