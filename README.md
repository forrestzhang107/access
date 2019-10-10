# Access

Serverlessly fetch keys, passwords, and credentials using IP whitelist validation.

## Setup

Add keys and credentials to the local store using the Access CLI:

`node run add-cred <key> <value>`

Keys can be removed:

`node run remove-cred <key>`

To print all keys in the store:

`node run print-store`

To print key-value pairs in the store:

`node run print-store -v`

Once you have configured your keys, add your client IPs to the whitelist:

`node run add-ip <ip>`

IPs can be removed:

`node run remove-ip <ip>`

To print whitelisted IPs:

`node run print-ips`

You can now deploy your endpoint:

`sls deploy`

## Getting Credentials

Once your serverless endpoint is deployed, you can fetch your stored credentials using GET as long as the client IP is present in the whitelist.

To retrieve a single credential:

`GET /get-value?key=KEY_ID`

To retrieve multiple credentials:

`GET /get-values?keys=KEY_1,KEY_2,KEY_3`

## Utilities

To check your IP:

`GET /get-source-ip`

To check your authentication status:

`GET /is-authenticated`

