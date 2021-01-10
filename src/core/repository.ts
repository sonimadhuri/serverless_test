export class BaseRepo {
  constructor(protected model) {
    this.model = model;
  }

  query() {
    return this.model.query();
  }

  async getId(id) {
    return await this.model.findOne({
      where: { uuid: id },
    });
  }

  async create(data) {
    try {
      return await this.model
      .query()
      .insert(data)
    } catch (err) {
      console.log(err)
      throw new Error(err);
    }
   
  }

  async getAll() {
    return await this.model.findAll();
  }
}
