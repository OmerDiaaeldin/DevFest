const { app, fireStoreDb } = require("./firebase");
const { getFirestore,getDocs,updateDoc,  doc,addDoc, setDoc, collection } = require("firebase/firestore")

const getAllInventories = async (req, res) => {
    // const result = [];
    // (await getDocs(collection(fireStoreDb, "inventory"))).forEach((doc) => {
    //     result.push({id: doc.id, ...doc.data()})
    // });
    res.json([{
        h_level: 37533,
        factory: false,
        location: {
          Longitude: -5.2378,
          Latitude: 33.5557,
        },
      },
      {
        h_level: 16206,
        factory: false,
        location: {
          Longitude: -5.1714,
          Latitude: 33.5403,
        },
      },
      {
        h_level: 200000,
        factory: true,
        location: {
          Latitude: 33.4792,
          Longitude: -5.1831,
        },
      },
      {
        h_level: 7605,
        factory: false,
        location: {
          Latitude: 33.5846,
          Longitude: -5.1516,
        },
      },
      {
        h_level: 25155,
        factory: false,
        location: {
          Longitude: -5.0311,
          Latitude: 33.5016,
        },
      },
      {
        h_level: 347044,
        factory: true,
        location: {
          Longitude: -5.1654,
          Latitude: 33.5167,
        },
      },
      {
        h_level: 14503,
        factory: false,
        location: {
          Latitude: 33.5339,
          Longitude: -5.099,
        },
      },
      {
        h_level: 34553,
        factory: false,
        location: {
          Latitude: 33.5632,
          Longitude: -5.2126,
        },
      },
      {
        h_level: 5236,
        factory: false,
        location: {
          Latitude: 33.4909,
          Longitude: -5.0887,
        },
      },
      {
        h_level: 21715,
        factory: false,
        location: {
          Longitude: -5.0669,
          Latitude: 33.5617,
        },
      },
      {
        h_level: 324582,
        factory: true,
        location: {
          Longitude: -5.1197,
          Latitude: 33.5209,
        },
      }])
}

const addInventories = async (req, res) => {
    // const {inventories} = req.body;

    // try {
    //     for (const doc of inventories){
    //         const docRef = await addDoc(collection(fireStoreDb, "inventory"), doc);
    //     }
    //   } catch (e) {
    //     console.error("Error adding document: ", e);
    //   }
    res.send("done")
}

// const consumeHLevelPeriodically = async () => {
//     try {
//         // Fetch all inventories
//         const querySnapshot = await getDocs(collection(fireStoreDb, "inventory"));

//         querySnapshot.forEach(async (docSnapshot) => {
//             const data = docSnapshot.data();

//             // Ensure h_level is above 0 before consuming
//             if (data.h_level > 0) {
//                 const newHLevel = Math.max(0, data.h_level - 10); // Consume 10 units (example value)

//                 // Update the document in Firestore
//                 const docRef = doc(fireStoreDb, "inventory", docSnapshot.id);
//                 await updateDoc(docRef, { h_level: newHLevel });

//                 // console.log(`Updated h_level for ${docSnapshot.id} to ${newHLevel}`);
//             }
//         });
//     } catch (error) {
//         console.error("Error consuming h_level: ", error);
//     }
// };

// Set periodic interval (e.g., every 10 seconds)
// setInterval(consumeHLevelPeriodically, 1000); // 10,000 ms = 10 seconds

module.exports = {
    getAllInventories,
    addInventories,
    // consumeHLevelPeriodically
}