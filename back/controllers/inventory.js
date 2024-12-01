const { app, fireStoreDb } = require("./firebase");
const { getFirestore,getDocs,  doc,addDoc, setDoc, collection } = require("firebase/firestore")

const getAllInventories = async (req, res) => {
    const result = [];
    (await getDocs(collection(fireStoreDb, "inventory"))).forEach((doc) => {
        result.push({id: doc.id, ...doc.data()})
    });
    res.json(result)
}

const addInventories = async (req, res) => {
    const {inventories} = req.body;

    try {
        for (const doc of inventories){
            const docRef = await addDoc(collection(fireStoreDb, "inventory"), doc);
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    res.send("done")
}

module.exports = {
    getAllInventories,
    addInventories
}