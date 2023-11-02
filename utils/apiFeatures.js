class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((key) => {
      delete queryObj[key];
    });

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    this.query = this.queryString.sort
      ? this.query.sort(this.queryString.sort.split(',').join(' '))
      : this.query.sort('-createdAt');
    return this;
  }
  limitFields() {
    this.query = this.queryString.fields
      ? this.query.select(this.queryString.fields.split(',').join(' '))
      : this.query.select('-__v');
    return this;
  }
  paginate() {
    this.query =
      this.queryString.page && this.queryString.limit
        ? this.query
            .skip(
              (this.queryString.page * 1 - 1) * (this.queryString.limit * 1)
            )
            .limit(this.queryString.limit * 1)
        : this.queryString.limit
        ? this.query.skip(0).limit(this.queryString.limit * 1)
        : this.query.skip(0).limit(100);

    return this;
  }
}
module.exports = APIFeatures;
