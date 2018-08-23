# echo "hi"
echo "Cloning LICENSE to babel packages"
cat LICENSE
ls -db */packages/*/ | egrep -v '(babylon|babel-plugin-transform-object-assign|babel-plugin-transform-object-set-prototype-of-to-assign)$' | xargs -n 1 cp LICENSE
