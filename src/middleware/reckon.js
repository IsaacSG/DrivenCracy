const reckon = 0;

const reckonVote = async (req, res, next) => {
  reckon += 1;
  next();
};


const reck = () => {
  return reckon;
};


export { reck, reckonVote };