pragma solidity ^0.4.24;

contract Bounty{
    //address owner;
    bytes32 ipfs;
    uint index;
    uint denyCount;
    uint submissionTime = block.timestamp;
    uint public voteTimer;
    // uint responsibleDisclosureTimer;
    // uint responceTime;
    bool hackerVote;
    bool CompanyVote;
    bytes1 submit   = 0x01;
    bytes1 accept   = 0x02;
    bytes1 deny     = 0x03;
    bytes1 update   = 0x04;
    bytes1 message  = 0x05;
    bytes1 cancle   = 0x06;


    // temp vars will be in constructor
    address public owner = 0xca35b7d915458EF540aDE6068DFE2F44e8FA773c;
    uint public responceTime = block.timestamp + 30 seconds; // 5day is varibal from company
    uint public responsibleDisclosureTimer = block.timestamp + 1 minutes;

    // constructor(uint _index, bytes32 _ipfs) public payable {
    //     /**
    //      * set initial variables for this contract
    //      * lock is not used yet
    //      * index is the position in the bountyFactory array
    //      * owner of this contract is the origin sender as msg.sender is the bountyFactory
    //      * ipfs is the base58 decode hex with the first 2 bytes removed i.e "1220"
    //      **/
    //     lock = false;
    //     index = _index;
    //     owner = tx.origin;
    //     ipfs = _ipfs;
    // }

    /************************************
     * Structs Mappings and Array Section
     ************************************/



    struct Stage {
        bytes4 CCVE;
        address submitter;
        bytes1[] stage;
        bytes32[] messages;
        address[] lastAction;
    }

    struct BountyList {
        Stage[] bountys;
    }


    mapping (address => BountyList) internal mappingAddressToStruct; //mappingAddressToStruct
    address[] public SubmissionArray;

    /******************
     * Modifier Section
     ******************/

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    /** must be a party to this submission to continue i.e submitter/contract owner **/
    modifier party() {
        require(msg.sender == owner || msg.sender == mappingAddressToStruct[msg.sender].bountys[0].lastAction[0], "you are not a party to this contract");
        _;
    }

    /** the execution of this function requires that your responding to the action of the other party **/
    modifier turn(address submitter) {
        require(msg.sender != mappingAddressToStruct[submitter].bountys[mappingAddressToStruct[submitter].bountys.length-1].lastAction[mappingAddressToStruct[submitter].bountys[mappingAddressToStruct[submitter].bountys.length-1].lastAction.length-1], "Not your turn");
        _;
    }

    modifier allowVote() {
       if  (owner == msg.sender) {
            require(denyCount >= 6 || block.timestamp > responceTime || block.timestamp > responsibleDisclosureTimer, 'owner is not currently allowed to vote');
        }
        if (mappingAddressToStruct[msg.sender].bountys[0].lastAction[0] == msg.sender) {
            require(denyCount >= 6 || block.timestamp > responceTime || block.timestamp > responsibleDisclosureTimer, 'submitter is not currently allowed to vote');
        }
        _;
    }



    function submitVuln (bytes4 CCVE, bytes32 ipfsSubmission) public {
        // add require for bounty list limit
        Stage memory mBounty = Stage(CCVE, msg.sender, new bytes1[](0), new bytes32[](0), new address[](0));
        BountyList storage sBounty = mappingAddressToStruct[msg.sender];
        sBounty.bountys.push(mBounty);
        uint Bindex = getBountyListLength();
        sBounty.bountys[Bindex].stage.push(submit);
        sBounty.bountys[Bindex].messages.push(ipfsSubmission);
        sBounty.bountys[Bindex].lastAction.push(msg.sender);
        SubmissionArray.push(msg.sender);
    }

    function acceptVuln(address submitter, uint Bindex) public {
        BountyList storage sBounty = mappingAddressToStruct[submitter];
        sBounty.bountys[Bindex].stage.push(accept);
        sBounty.bountys[Bindex].lastAction.push(msg.sender);
        // continue to payout
    }

    function denyVuln(address submitter, uint Bindex) public  {
        BountyList storage sBounty = mappingAddressToStruct[submitter];
        require(sBounty.bountys[Bindex].stage[sBounty.bountys[Bindex].stage.length-1] != accept, "Alrady Accepted");
        sBounty.bountys[Bindex].stage.push(deny);
        sBounty.bountys[Bindex].lastAction.push(msg.sender);
        denyCount += 1;
        responceTime = block.timestamp + 5 days;
    }

    function setMessage(address submitter, bytes32 ipfsMsg, uint Bindex) public {
        BountyList storage sBounty = mappingAddressToStruct[submitter];
        sBounty.bountys[Bindex].stage.push(message);
        sBounty.bountys[Bindex].messages.push(ipfsMsg);
        // continue to payout
    }

    function updateVuln(address submitter, bytes32 ipfsMsg, bytes4 CCVE, uint Bindex) public {
        BountyList storage sBounty = mappingAddressToStruct[submitter];
        sBounty.bountys[0].stage.push(update);
        sBounty.bountys[Bindex].CCVE = CCVE;
        sBounty.bountys[Bindex].messages.push(ipfsMsg);
        responceTime = block.timestamp + 5 days;
    }

    function requireTest () public view returns(bool, bool){
        bool verdict;
        bool responceTimebool = block.timestamp > responceTime;
        bool responsibleDisclosureTimerbool = block.timestamp > responsibleDisclosureTimer;

        if ( owner == msg.sender) {
            if (denyCount >= 6 || block.timestamp > responceTime || block.timestamp > responsibleDisclosureTimer) {
                verdict =true;
            }
        }
        if (owner != msg.sender) {
            if (mappingAddressToStruct[msg.sender].bountys[0].lastAction[0] == msg.sender) {
                if (denyCount >= 6 || block.timestamp > responceTime || block.timestamp > responsibleDisclosureTimer) {
                    verdict =true;
                }
            }
        }
        return(responceTimebool, responsibleDisclosureTimerbool);
    }


    function vote () public allowVote returns(string, bool, bool, bool) {
        if  (owner == msg.sender) {
            voteTimer = block.timestamp + 30 seconds;
            return('owner',
            (owner == msg.sender),
            (block.timestamp > responceTime),
            (voteTimer > block.timestamp));
        }
        if (mappingAddressToStruct[msg.sender].bountys[0].lastAction[0] == msg.sender) {
            return('submitter',
            (mappingAddressToStruct[msg.sender].bountys[0].lastAction[0] == msg.sender),
            (block.timestamp > responceTime),
            (block.timestamp > responsibleDisclosureTimer));
        }
    }





    /**********
     * gitters
     **********/

    function getCCVE (address submitter, uint Mindex) public view returns(bytes4) {
        return(mappingAddressToStruct[submitter]
            .bountys[mappingAddressToStruct[submitter]
            .bountys.length-1].CCVE[Mindex]);
    }

    // @Dbug transaction cost 38 execution cost 38 total of 76 gas cheeper if no variables are set for the return
    function getStage(address submitter, uint Sindex) public view returns(bytes1) {
        return(mappingAddressToStruct[submitter].bountys[Sindex].stage[mappingAddressToStruct[submitter].bountys[Sindex].stage.length-1]);
    }



    function getMessage (address submitter, uint Bindex, uint Mindex) public view returns (bytes32) {
        return(mappingAddressToStruct[submitter]
            .bountys[Bindex].messages[Mindex]);
    }

    function getLastAction(address submitter) public view returns(address) {
        return(
            mappingAddressToStruct[submitter]
                .bountys[mappingAddressToStruct[submitter]
                .bountys.length-1].lastAction[
                    mappingAddressToStruct[submitter]
                        .bountys[mappingAddressToStruct[submitter]
                        .bountys.length-1
                ].lastAction.length-1]
        );
    }

    function getBountyListLength() public view returns (uint) {
        return(mappingAddressToStruct[msg.sender].bountys.length-1);
    }

    function getMessageLength(address submitter, uint Bindex) public view returns (uint) {
        return(mappingAddressToStruct[submitter].bountys[Bindex].messages.length);
    }


    function getSubmitter (address submitter) public view returns (address) {
        return(mappingAddressToStruct[submitter].bountys[0].lastAction[0]);
    }

    /**********
     * debuggers
     **********/

    function increaceDenyCount() public returns(uint){
        denyCount =6;
        return (denyCount);
    }


}

    /********************************************************
 * strings for manualy submitting function during testing
 ********************************************************

create bounty :         "0x7d5a99f603f231d53a4f39d1521f98d2e8bb279cf29bebfd0687dc98458e1234"
submitVuln:
"0x382E36", "0x1d5a99f603f231d53a4f39d1521f98d2e8bb279cf29bebfd0687dc98458e7f81"
"0x382E36", "0x2d5a99f603f231d53a4f39d1521f98d2e8bb279cf29bebfd0687dc98458e7f82"
"0x382E36", "0x3d5a99f603f231d53a4f39d1521f98d2e8bb279cf29bebfd0687dc98458e7f83"




setMessage:
"0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C","0x5d5a99f603f231d53a4f39d1521f98d2e8bb279cf29bebfd0687dc98458e2345", "0"

getMessage:
"0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C", "0"


**/
    
