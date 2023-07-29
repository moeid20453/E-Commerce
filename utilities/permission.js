

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.role === 'admin') return;
  if (requestUser.userId === resourceUserId.toString()) return;
  else{return({error: "Unexpected Error"});}
};

module.exports = 
{checkPermissions};