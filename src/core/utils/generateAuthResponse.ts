export function generateAuthResponse(userData, effect, methodArn) {
  const policyDocument = generatePolicyDocument(effect, methodArn);

  return {
    principalId: userData.id,
    policyDocument,
    context: {
      userData
    }
  };
}

export function generatePolicyDocument(effect, methodArn) {
  if (!effect || !methodArn) return null;

  const policyDocument = {
    Version: "2012-10-17",
    Statement: [
      {
        Action: "execute-api:Invoke",
        Effect: effect,
        Resource: methodArn
      }
    ]
  };

  return policyDocument;
}