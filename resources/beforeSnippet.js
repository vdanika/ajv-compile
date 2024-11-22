#!/usr/bin/env node
function main() {
    const schemaValidator = validate20;
    const fs = require('fs');
    const files = process.argv.slice(2);
    if(files.indexOf("-h") > -1 || files.indexOf("--help") > -1) {
        console.log("Usage:");
        console.log(`    ${process.argv[1]} <json-filepaths-to-validate...>`);
        console.log(`    echo '{"jsonData":"to validate"}' | ${process.argv[1]}`);
        console.log("Schema:", JSON.stringify(schema22, null, 4));
        process.exit(0);
    }
    if(files.length === 0) {
        //if no arguments passed, read stdin
        files.push(0);
    }
    for (const file of files) {
        const rawData=fs.readFileSync(file, 'utf-8');
        const fail = (...args) => {
            console.log(...args);
            console.log(`Wrong JSON in file: "${file == 0 ? "stdin" : file}"`, rawData);
            process.exit(1);
        }
        try {
            const data = JSON.parse(rawData);
            const valid = schemaValidator(data);
            if (!valid) {
                fail('Invalid:', ...schemaValidator.errors);
            }
        } catch (e) {
            fail(`Error during schema validation`, e);
        }
    }
}
setImmediate(main);
