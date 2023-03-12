export const getQueryParam = (req: any) => {
  let {sort, page, limit} = req;
  let paramQuery: any = {};
  let offset;
  paramQuery.limit = limit
  
  // sorting
  if (sort !== '' && typeof sort !== 'undefined') {
    let query;
    if (sort.charAt(0) !== '-') {
      query = [[sort, 'ASC']];
    } else {
      query = [[sort.replace('-', ''), 'DESC']];
    }
    paramQuery.order = query;
  }

  // pagination
  if (page !== '' && typeof page !== 'undefined') {
    limit = limit ? limit : 2; // Setting default limit to 5
    offset = page * limit - limit;
    paramQuery.offset = Number(offset);
    paramQuery.limit = Number(limit);
  }

  return paramQuery;
};
