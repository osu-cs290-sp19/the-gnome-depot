#!/bin/bash

echo "== Starting Init Script"

# Install the Node Modules

echo "==== Installing Dependencies"
npm install
echo "==== Dependencies Installed."

# Set the environment variables

if [ "$SHELL" == "/bin/bash" ]
then
	echo "==== Using /bin/bash Script"
	source ./scripts/exports.sh
else
	echo "==== Using non- /bin/bash Script"
	source ./scripts/exports.env
fi

# Start the server

echo "==== Starting Server"
npm start
