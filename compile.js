const path = require('path');
const fileSystem = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const sourceCode = fileSystem.readFileSync(inboxPath, 'utf8');

const compiledCode = solc.compile(sourceCode, 1);

module.exports = compiledCode.contracts[':Inbox'];