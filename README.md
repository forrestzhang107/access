# Access

Serverlessly fetch keys, passwords, and credentials using IP whitelist validation.

## Configuration

Add keys and credentials to the local store:

`node access add-cred <key> <value>`

Keys can be removed:

`node access remove-cred <key>`

To print all keys in the store:

`node access print-store`

To print all key-value pairs in the store:

`node access print-store -v`

Once you have configured your keys, add your client IPs to the whitelist:

`node access add-ip <ip>`

IPs can be removed:

`node access remove-ip <ip>`

To print whitelisted IPs:

`node access print-ips`

You can now deploy your endpoint:

`sls deploy`

## Getting Credentials

Once your serverless endpoint is deployed, you can fetch your stored credentials using GET as long as the client IP is present in the whitelist.

Retrieve a single credential:

`GET /get-value?key=KEY_ID`

Retrieve multiple credentials:

`GET /get-values?keys=KEY_1,KEY_2,KEY_3`

## Utilities

Check your IP:

`GET /get-source-ip`

Check your authentication status:

`GET /is-authenticated`
