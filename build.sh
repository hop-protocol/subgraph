echo 'running build.sh'

if [ -z "$NETWORK" ]; then
  echo "ERROR: NETWORK environment variable required"
  exit 1
fi

echo "generating config json files"
node scripts/generate_config_json.js

npx mustache config/$NETWORK.json buildfiles.template.sh > buildfiles.sh
chmod +x buildfiles.sh

echo 'generated buildfiles.sh'
echo 'running buildfiles.sh'

./buildfiles.sh

echo 'done running buildfiles.sh'
