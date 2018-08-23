pragma solidity ^0.4.22;

contract Bounty{
    uint index;
    address owner;
    string ipfs;
    bool lock;
    bool votingEligible;
    bytes1 submit = 0x01;
    bytes1 accept = 0x02;
    bytes1 deny   = 0x03;
    bytes1 change = 0x04;
    bytes1 vote   = 0x05;


    struct bountyStage {
        uint index;
        address submitter;
        bytes1 stage;
        bytes4 CCVE;
        bytes ipfsSubmission;
        address lastActionVia;
    }

    mapping (address => bountyStage) public mappingAddressToStruct;
    address[] public SubmissionArray = [0x00]; //@dev init submissionArray[0] with 0x00 to keep numbers aligned

    constructor(uint _index, address _sender, string _ipfs) public payable {    //@Update change ipfs to bytes
        lock = false;
        index = _index;             //@Dev BountyFactory array position
        owner = _sender;            //@dev msg.sender pass through from BountyFactory
        ipfs = _ipfs;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    modifier party() {
        require(msg.sender == owner || msg.sender == mappingAddressToStruct[msg.sender].submitter, "you are not a party to this contract");
        _;
    }

    modifier turn() {
        require(msg.sender != mappingAddressToStruct[msg.sender].lastActionVia, "Not your turn");
        _;
    }

    function deposit() public payable {
        require(msg.value > 0, "Value needs to be grater than 0");
    }

    function withdraw(uint amount) public onlyOwner {
        msg.sender.transfer(amount);
    }



    function submitVuln(bytes4 CCVE, bytes ipfsSubmission) public {
        // sender can only submit one vulnerablity at a time
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

    function acceptVuln(address submitter) public party turn {
        require(mappingAddressToStruct[msg.sender].stage != accept, "alrady accepted");
        mappingAddressToStruct[submitter].stage = accept;
        // continue to payout
    }


    function checkForCurrentSubmit() public view returns(bool) {
        if (mappingAddressToStruct[msg.sender].submitter == msg.sender) {
            return(true);
        } else {
            return(false);
        }
    }



    // function updateContract(string newIpfs) public onlyOwner {
    //     require(SubmissionArray.length -1 == 0);    //@dev
    //     ipfs = newIpfs;
    // }

    // function toggleSubmitLock() public onlyOwner {
    //     lock = !lock; //@dev toggle for submitions
    // }

    //@debug
    function arraylength() public view returns(uint) {
        return(SubmissionArray.length - 1) ;
    }

    //@debug
    function  ownerInfo() public view returns(uint, address, string) {
        return (index, owner, ipfs);
    }

    //@debug
    function getvalue() public view returns(uint) {
        return(address(this).balance);
    }

}
//submitVuln // "0x382E36","0x516D546643656A676F32775477716E444A73384C753170434E65437243447545344741776B6E6139337A64643764"
            //  "0x362e32","0x516d516673524761484c685858646233534336566579476d7a37457a666b6255733467747a444474463148743150"
