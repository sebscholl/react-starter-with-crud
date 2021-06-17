/**
 * This file was generated using 8base CLI.
 * 
 * To learn more about writing custom trigger functions, visit
 * the 8base documentation at:
 * 
 * https://docs.8base.com/8base-console/custom-functions/triggers
 *
 * To update this functions invocation settings, update its configuration block
 * in the projects 8base.yml file:
 *  functions:
 *    beforeTodoCreate:
 *      ...
 * 
 * Data that is sent to the function can be accessed on the event argument at:
 *  event.data[KEY_NAME]
 *
 * There are two ways to invoke this function locally:
 *  
 *  (1) Explicit file mock file path using '-p' flag:
 *    8base invoke-local beforeTodoCreate -p src/resolvers/beforeTodoCreate/mocks/request.json
 *
 *  (2) Default mock file location using -m flag:
 *    8base invoke-local beforeTodoCreate -m request
 *
 *  Add new mocks to this function to test different input arguments. Mocks can easily be generated
 *  the following generator command:
 *    8base generate mock beforeTodoCreate -m [MOCK_FILE_NAME]
 */

module.exports = async (event, ctx) => {
  if (event.data.body.length < 10) {
    return {
      data: {
        ...event.data
      },
      errors: [
        { code: "VALIDATION_ERROR", message: "Give you task more details!" }
      ]
    }; 
  }

  return {
    data: {
      ...event.data
    }
  };
};