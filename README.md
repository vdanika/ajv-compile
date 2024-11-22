= JSON Schema validator generator

Wraps ajv compile function to create a schema validator that can be directly use from cli. All arguments are passed to "ajv compile" function, but after generation a "cli usability" snippet is added to the generated file.

## Usage

```
npm exec --yes ajv-compile -- -s </path/to/existing/schema.json> -o </path/where/to/save/schema-validator.js>
```


## Sample

```
echo '{"jsonData":"to validate"}' > valid.json
echo '{"jsonDat":"to validate"}' > invalid.json
echo '{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
        "jsonData": {
            "type": "string"
        }
    },
    "required": ["jsonData"]
}' > schema.json
npm exec --yes ajv-compile -- -s schema.json -o validator.js

./validator.js -h

./validator.js valid.json
./validator.js valid.json invalid.json
cat invalid.json | ./validator.js
```
