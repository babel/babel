if (require('whitelisted').foo != 123) {
  throw new Error('Expected babelrc.only to allow node_modules/whitelisted through');
}

try {
  require('blacklisted');
  throw new Error('Expected babelrc.only to deny node_modules/blacklisted');
} catch (error) {
  if (error.message != 'Unexpected reserved word') {
    throw error;
  }
}

console.log('✓ babelrc.only');
