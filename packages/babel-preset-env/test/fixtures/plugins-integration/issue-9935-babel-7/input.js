class MyClass extends BaseClass {
  async loadEntity() {
    this.website = await this.loadWebsite();
    this.report.setCompany(this.website.company);
    super.loadEntity();
  }
}
