#Discontinued
I don't have Free anymore. Not sure this code will work.

# Description

This is an unofficial HTTP REST API for the Freebox Revolution (v6) Server.
Still a lot of work to do, might break at some point.

# Usage

## Installation

	git clone git://github.com/alram/freerev-server-api.git

	cd freerev-server-api

	npm install

	node server.js

## API Description

See the usage.txt file

## Examples with curl

Get Token

	curl -s http://localhost:3000/token -u freebox:password | json
	{
	  "token": "994e1a"
	}

Get Internet connection status

	curl -s http://localhost:3000/internet/status -H 'x-api-token: 994e1a' | json
	{
		"type": "rfc2684",
		"rate_down": 14081,
		"bytes_up": 3060590203,
		"rate_up": 3321,
		"bandwidth_up": 925584,
		"bandwidth_down": 11232000,
		"ip_address": "XX.XX.XX.XX",
		"state": "up",
		"bytes_down": 3908853655,
		"media": "adsl"
	}

Activate Wake On Lan

	curl -s http://localhost:3000/internet/wol -H 'x-api-token: 994e1a' -X POST -d 'enabled=true'
	{}

Verify Wake On Lan status

	curl -s http://localhost:3000/internet/wol -H 'x-api-token: 994e1a' | json
	{
	  "enabled": true
	}

De-activate Wake On Lan

	curl -s http://localhost:3000/internet/wol -H 'x-api-token: 994e1a' -X POST -d 'enabled=false'
	{}

# License

See LICENSE file
