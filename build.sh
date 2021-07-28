echo 'running build.sh'

if [ -z "$NETWORK" ]; then
  echo "ERROR: NETWORK environment variable required"
  exit 1
fi

npx mustache config/$NETWORK.json buildfiles.template.sh > buildfiles.sh
chmod +x buildfiles.sh

echo 'generated buildfiles.sh'

./buildfiles.sh

