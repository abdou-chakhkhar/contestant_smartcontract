// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Contest {
    // creatinng structure to model the contestant
    struct Contestant {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    // use mapping to get or fetch the contestant details
    mapping(uint256 => Contestant) public contestants;

    //to save the list of users/accounts who already casted vote
    mapping(address => bool) public voters;

    // add a public state variable to keep track of contestant Count
    uint256 public contestantsCount;

    event votedEvent(uint256 indexed _contestantId);

    constructor() public {
        addContestant("Tom");
        addContestant("Jerry");
    }

    function addContestant(string memory _name) private {
        contestantsCount++;
        contestants[contestantsCount] = Contestant(contestantsCount, _name, 0);
    }

    function vote(uint256 _contestantId) public {
        // restricting the person who already casted the vote
        require(!voters[msg.sender]);

        // require that the vote is casted to a valid contestant
        require(_contestantId > 0 && _contestantId <= contestantsCount);

        //increase the contestant vote count
        contestants[_contestantId].voteCount++;

        //set the voter's status to true
        voters[msg.sender] = true;

        // trigger the vote event
        emit votedEvent(_contestantId);
    }
}
