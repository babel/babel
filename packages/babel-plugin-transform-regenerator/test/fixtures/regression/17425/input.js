const replay = async () => {
  try {
  } catch (error) {
    return false;
  }

  throw new Error('@kira throw');
};

return expect(() => replay()).rejects.toThrow('@kira throw');
