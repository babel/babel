set -e
cd ./packages/babel-compat-data/build/compat-table
git fetch -q origin HEAD
git rev-parse FETCH_HEAD
