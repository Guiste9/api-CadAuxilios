class Families {
  constructor(id, parents_name, address, number, children_name, children_age, attendance = []) {
    this.id = id;
    this.parents_name = parents_name;
    this.address = address;
    this.number = number;
    this.children_name = children_name;
    this.children_age = children_age;
    this.attendance = attendance;
  }

  toJSON() {
    return {
      id: this.id,
      parents_name: this.parents_name,
      address: this.address,
      number: this.number,
      children_name: this.children_name,
      children_age: this.children_age,
      attendance: this.attendance
    };
  }
}

export default Families
