
pragma solidity ^0.4.24;
import "./Bounty.sol";

contract BountyFactory {
    address public owner;

    event returnBounty(address);

    address[] public bountyArray;

    constructor() public {
        owner = msg.sender;
    }

    function createBounty(bytes32 ipfs) public payable returns(address) {
        require(msg.value == 0.01 ether, "Fucntion Requires 0.01ETH");
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
