const _createRandomPassword = () => {
    let password = 'xyxxyxxxxxxyxxy'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0,
    v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    return password;
}

const _createRandomUID= () => {
  let UID = "xyyyx-yxxyx-xxxy-xyxxx".replace(/[xy]/g, (c) => {
    let r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
  return UID;
};
module.exports = {_createRandomPassword, _createRandomUID}