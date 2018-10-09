pragma solidity ^0.4.23;

contract Inbox{
    
    // This is important, member variables will be stored in the blockchain forever.
    // any changes to it implies a new block being mined and ledge
    string private message;
    address public ContractDeployer;
    
    constructor(string initialMessage) public {        
        message = initialMessage;
        ContractDeployer = msg.sender;        
    }
    
    function setMessage(string newMessage) public {
        message = newMessage;
    }
    
    function getMessage() public view returns (string) {
        return message;
    }
    
    function getCurrentCaller() public view returns (address) {
        return msg.sender;
    }
    
    function multiply(int a, int b) public pure returns (int) {
        return a * b;
    }
}