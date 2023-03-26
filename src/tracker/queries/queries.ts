import { Types } from 'mongoose';

export let summaryAggregationQuery = (start, end, userId) => {
  return [
    {
      $facet: {
        historyByType: [
          {
            $match: {
              $and: [
                { userId: new Types.ObjectId(userId) },
                { timestamp: { $gte: start } },
                { timestamp: { $lte: end } },
              ],
            },
          },
          {
            $group: {
              _id: '$type',
              totalAmount: { $sum: '$amount' },
              entries: {
                $push: {
                  _id: '$_id',
                  category: '$category',
                  userId: '$userId',
                  source: '$source',
                  amount: '$amount',
                  timestamp: '$timestamp',
                },
              },
            },
          },
          {
            $project: {
              type: '$_id',
              totalAmount: 1,
              entries: 1,
              _id: 0,
            },
          },
        ],
      },
    },
  ];
};
