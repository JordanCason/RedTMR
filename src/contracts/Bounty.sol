pragma solidity ^0.4.24;

contract Bounty{
    uint index;
    address owner;
    bytes32 ipfs;
    bool lock;
    bool votingEligible;
    bytes1 submit  = 0x01;
    bytes1 accept  = 0x02;
    bytes1 deny    = 0x03;
    bytes1 change  = 0x04;
    bytes1 vote    = 0x05;
    bytes1 update  = 0x06;
    bytes1 message = 0x07;

    constructor(uint _index, bytes32 _ipfs) public payable {
        /**
         * set initial variables for this contract
         * lock is not used yet
         * index is the position in the bountyFactory array
         * owner of this contract is the origin sender as msg.sender is the bountyFactory
         * ipfs is the base58 decode hex with the first 2 bytes removed i.e "1220"
         **/
        lock = false;
        index = _index;
        owner = tx.origin;
        ipfs = _ipfs;
    }

    /************************************
     * Structs Mappings and Array Section
     ************************************/

    struct messages {
        bytes1 action;
        address msgSender;
        bytes32[] messageArray;
    }


    struct bountyStage {
        uint index;
        address submitter;
        bytes1 stage;
        bytes4 CCVE;
        bytes32 ipfsSubmission;
        address lastActionVia;
    }

    mapping (address => bountyStage) public mappingAddressToStruct;
    address[] public SubmissionArray = [0x00];

    mapping (bytes32 => messages) public mappingIPFSToStruct;

    /******************
     * Modifier Section
     ******************/

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    /** must be a party to this submission to continue i.e submitter/contract owner **/
    modifier party(address submitter) {
        require(msg.sender == owner || msg.sender == mappingAddressToStruct[msg.sender].submitter, "you are not a party to this contract");
        _;
    }

    /** the execution of this function requires that your responding to the action of the other party **/
    modifier turn(address submitter) {
        require(msg.sender != mappingAddressToStruct[submitter].lastActionVia, "Not your turn");
        _;
    }

    /*******************
     * Contract Actions
     ******************/

    function deposit() public payable {
        require(msg.value > 0, "Value needs to be grater than 0");
    }

    function withdraw(uint amount) public onlyOwner {
        msg.sender.transfer(amount);
    }

    function arraylength() public view returns(uint) {
        return(SubmissionArray.length - 1) ;
    }


    /********************************
     * vulnerablity submition actions
     ********************************/

    function submitVuln(bytes4 CCVE, bytes32 ipfsSubmission) public {
        /**
         * Currently only one submission at a time
         * Sender cannot submit their own vulnerability
         * Lock function not enabled yet (placeholder/reminder)
         * Set the vulnerabilities details
         **/
        require(checkForCurrentSubmit() == false, "submission alrady pinding for address");
        require(msg.sender != owner, "Owner cant submit bounty to themselfs");
        require(lock == false, "require lock == false error");
        mappingAddressToStruct[msg.sender].submitter = msg.sender;
        mappingAddressToStruct[msg.sender].lastActionVia = msg.sender;
        mappingAddressToStruct[msg.sender].stage = submit;
        mappingAddressToStruct[msg.sender].CCVE = CCVE;
        mappingAddressToStruct[msg.sender].ipfsSubmission = ipfsSubmission;
        mappingAddressToStruct[msg.sender].index = SubmissionArray.push(msg.sender)-1;
    }

    function acceptVuln(address submitter) public party(submitter) turn(submitter) {
        require(mappingAddressToStruct[msg.sender].stage != accept, "alrady accepted");
        mappingAddressToStruct[submitter].stage = accept;
        mappingAddressToStruct[submitter].lastActionVia = msg.sender;
        // continue to payout
    }

    function denyVuln(address submitter) public party(submitter) turn(submitter) {
        require(mappingAddressToStruct[msg.sender].stage != accept, "alrady accepted");
        // send message
        mappingAddressToStruct[submitter].stage = deny;
        mappingAddressToStruct[submitter].lastActionVia = msg.sender;
    }

    function sendMessage (address submitter, bytes1 action, bytes32 ipfsMsg) public party(submitter) {
        /**
        * submitter is the submitter of the vulnerablity to the contract
        * the submitter inital vulnerablity ipfs address is the key for the new mapping
        * then we push the ipfsMsg hash to that array holding all messages for this vulnerablity submition
        **/
        mappingIPFSToStruct[mappingAddressToStruct[submitter].ipfsSubmission].action = action;
        mappingIPFSToStruct[mappingAddressToStruct[submitter].ipfsSubmission].msgSender = msg.sender;
        mappingIPFSToStruct[mappingAddressToStruct[submitter].ipfsSubmission].messageArray.push(ipfsMsg);
    }

    function checkForCurrentSubmit() public view returns(bool) {
        return(mappingAddressToStruct[msg.sender].submitter == msg.sender);
    }

    // function checkForCurrentSubmit() public view returns(bool) {
    //     if (mappingAddressToStruct[msg.sender].submitter == msg.sender) {
    //         return(true);
    //     } else {
    //         return(false);
    //     }
    // }

    /******************
     * contract gitters
     ******************/

    function messageArrayLengthGitter (address submitter) public view returns (uint) {
        // bytes32 test1_ipfsSubmission;
        // bytes32[] test2_ipfsSubmission_messageArray;
        // uint test3_messageArrayLength;

        // test1_ipfsSubmission = mappingAddressToStruct[submitter].ipfsSubmission;
        // test2_ipfsSubmission_messageArray = ipfsSubmission_messageArray = mappingIPFSToStruct[mappingAddressToStruct[submitter].ipfsSubmission].messageArray;
        return(mappingIPFSToStruct[mappingAddressToStruct[submitter].ipfsSubmission].messageArray.length);
    }

    function messageGitter (address submitter, uint msgindex) public view returns (bytes32) {
        return(mappingIPFSToStruct[mappingAddressToStruct[submitter].ipfsSubmission].messageArray[msgindex]);
    }

    /************************************
     * contract debuging / temp functions
     ************************************/



    //@debug
    function  ownerInfo() public view returns(uint, address, bytes32) {
        return (index, owner, ipfs);
    }

    //@debug
    function getvalue() public view returns(uint) {
        return(address(this).balance);
    }

    /**********************
     * not in use but will be
     ************************
    function updateContract(string newIpfs) public onlyOwner {
        require(SubmissionArray.length -1 == 0);
        ipfs = newIpfs;
    }

    function toggleSubmitLock() public onlyOwner {
        lock = !lock;  // @dev toggle for submitions
    }
    **/
}

/********************************************************
 * strings for manualy submitting function during testing
 ********************************************************

create bounty : "0x12347d5a99f603f231d53a4f39d1521f98d2e8bb279cf29bebfd0687dc98458e1234"
submitVuln: "0x382E36", "0x12207d5a99f603f231d53a4f39d1521f98d2e8bb279cf29bebfd0687dc98458e7f89"
setMessage: "0xd8692ff6ce6504dd0b2565364a5174510a214aef","0x07","0x23457d5a99f603f231d53a4f39d1521f98d2e8bb279cf29bebfd0687dc98458e2345"


**/
