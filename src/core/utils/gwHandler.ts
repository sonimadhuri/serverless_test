import { requestParser, res } from '@core/utils';

const asyncHandler = require('express-async-handler');

export const gwHandler = asyncHandler(async (handler, event) => {
  try {
    const inputs = requestParser(event);
    return await handler(inputs);
  } catch (e) {
    return res.error({ message: e.message });
  }
});
