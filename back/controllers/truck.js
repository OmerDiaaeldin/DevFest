const { app, fireStoreDb } = require("./firebase");
const { getFirestore,getDocs,  doc,addDoc, setDoc, collection } = require("firebase/firestore")

const getAllTrucks = async (req, res) => {
    const result = [];
    (await getDocs(collection(fireStoreDb, "truck"))).forEach((doc) => {
        result.push({id: doc.id, ...doc.data()})
    });
    res.json(result)
}

const addTrucks = async (req, res) => {
    const {trucks} = req.body;
    try {
        for (const doc of trucks){
            const docRef = await addDoc(collection(fireStoreDb, "truck"), doc);
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    res.send("done")
}

module.exports = {
    getAllTrucks,
    addTrucks
}