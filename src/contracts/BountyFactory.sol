
pragma solidity ^0.4.22;
import "./Bounty.sol";

contract BountyFactory {
    address public owner;

    event returnBounty(address);

    address[] public bountyArray;

    constructor() public {
    owner = msg.sender;
    }

    function createBounty(string ipfs) public payable returns(address) {
        require(msg.value == 0.01 ether);
        Bounty newbounty = (new Bounty).value(msg.value)(bountyArray.length, msg.sender, ipfs);
        bountyArray.push(newbounty);
        emit returnBounty(newbounty);
    }


    function getContractCount() public view returns(uint contractCount) {
        return bountyArray.length;
    }

    function getvalue() public view returns(uint) {
        return(address(this).balance);
    }

    //@dev
    function owner() public view returns(address) {
        return(owner);
    }

}
