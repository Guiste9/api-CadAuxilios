import db from "./firebase.js";
import Families from "./Families.js";

class FamilyRepository {
  constructor() {
    this.collection = db.collection("Families");
  }

  async create(family) {
    const docRef = await this.collection.add(family.toJSON());
    return docRef.id;
  }

  async getAll() {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(
      (doc) =>
        new Families(
          doc.id,
          doc.data().parents_name,
          doc.data().address,
          doc.data().number,
          doc.data().children_name,
          doc.data().children_age
        )
    );
  }

  async getById(id) {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;
    return new Families(
      doc.id,
      doc.data().parents_name,
      doc.data().address,
      doc.data().number,
      doc.data().children_name,
      doc.data().children_age
    );
  }

  async update(id, family) {
    await this.collection.doc(id).update(family.toJSON());
    return true;
  }

  async delete(id) {
    await this.collection.doc(id).delete();
    return true;
  }
}

export default FamilyRepository;
