import statsService from '../services/statsService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * GET /api/admin/stats  (admin)
 * Returns aggregated dashboard statistics.
 */
export const getStats = asyncHandler(async (_req, res) => {
  const stats = await statsService.getStats();
  res.json({ success: true, stats });
});

export default { getStats };
