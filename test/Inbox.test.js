const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface, bytecode} = require('../compile');

let accounts;
let inboxContract;

const INITIALIZATION_MESSAGE = 'Hola Nico';

beforeEach(async () => {
    // Grab list of accounts
    accounts = await web3.eth.getAccounts();
    
    // Use of those accounts to deploy
    // the contract
    inboxContract = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode,
            arguments: [INITIALIZATION_MESSAGE]
        })
        .send({
            from: accounts[0],
            gas: '1000000'
        });

    inboxContract.setProvider(provider);
});

describe('Inbox Tests', () => {   

    it('Contract Deployment Test', () => {

        // Checks that the value 'address' exists
        assert.ok(inboxContract.options.address);
    });

   
    it('Deployment Initialization Test', async () => {

        const message = await inboxContract.methods.getMessage().call();
        assert.equal(message, INITIALIZATION_MESSAGE);

    });

    it('Set Message Test', async () => {

        const NEW_MESSAGE = "Hi Sophia";
        const transactionAddress = await inboxContract.methods.setMessage(NEW_MESSAGE)
            .send({
                from: accounts[0],
                gas: '1000000'
            });
        
        console.log('Transaction Number', transactionAddress);

        const message = await inboxContract.methods.getMessage().call();
        assert.equal(message, NEW_MESSAGE);
    });
    
    it('Multiply Test', async () => {

        const multiplication = await inboxContract.methods.multiply(7, 3).call();
        assert.equal(multiplication, 21);

    });
    

});



/*
class Car {
    park() {
        return 'stopped';
    }

    drive() {
        return 'vroom';
    }
}

let car;

beforeEach(() => {
    car = new Car();
});

describe('Testing Car Class', () => {   

    it('park Test', () => {
        assert.equal(car.park(), 'stopped');
    });

    it('drive Test', () => {
        assert.equal(car.drive(), 'vroom');
    });
});

*/

