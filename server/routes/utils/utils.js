const { default: axios } = require("axios");
const { checkUserAuthnToken } = require("../user/isUserSessionValid");

const getTokenCount = async ({ id }) => {
  const data = await axios.post("http://localhost:4200/api/getUserTokenCount", {
    id,
  });
  console.log(data?.data);
  return data?.data?.tokenCount;
};

const checkAthnTokenAndTokenCount = async ({ iv, id, token }) => {
  const authenticated = await checkUserAuthnToken({ iv, id, token });
  let tokenCountSufficient = await getTokenCount({ iv, id, token });
  tokenCountSufficient = tokenCountSufficient < 5000 ? false : true;
  return { authenticated, tokenCountSufficient };
};

module.exports = {
  checkAthnTokenAndTokenCount,
};
