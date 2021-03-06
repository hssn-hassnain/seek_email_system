import _ from "lodash";
import model_rule_executor from "@app/src/model_rule_executor";
import model_rule_user from "@app/src/model_rules/user";

let executor = new model_rule_executor([new model_rule_user()]);

export default users => {
  let shadowUsers = [...users];
  let result = null;
  let changes = [];
  for (let i in shadowUsers) {
    result = executor.evaluate(shadowUsers[i]);
    if (!_.isEqual(result, shadowUsers[i])) {
      changes.push(shadowUsers[i]);
    }
    shadowUsers[i] = result;
  }

  return {
    users: shadowUsers,
    changes: changes,
  };
};
