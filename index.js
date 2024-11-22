#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Get the path to the ajv-cli executable
const ajvPath = path.join(__dirname, 'node_modules', '.bin', 'ajv');

// Forward all command-line arguments to ajv-cli
const args = process.argv.slice(2);
const outputArgIndex = args.indexOf("-o");
const outputFile = args[outputArgIndex + 1];
if(outputArgIndex === -1 || !outputFile) {
    console.error("ajv-compile requires the -o option to be specified");
    process.exit(1);
}
// Spawn ajv-cli process
const ajvProcess = spawn(ajvPath, ["compile", ...args], { stdio: 'inherit' });

// Handle process exit
ajvProcess.on('exit', (code) => {
    if(code === 0) {
        // Compile succeeded, wrap the output file
        const outputData = fs.readFileSync(outputFile, 'utf-8');
        const snippet = fs.readFileSync("resources/beforeSnippet.js", 'utf-8');

        fs.writeFileSync(outputFile, snippet+outputData, 'utf-8');
        fs.chmodSync(outputFile, "755");
    }
    process.exit(code);
});
