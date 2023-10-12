import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";

// Add Firebase products that you want to use
import { getAuth } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  query,
  orderBy,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAawFyJSHZAWmoMA82lGpfylGhB4HTGMgo",

  authDomain: "image-store-9b0b7.firebaseapp.com",

  projectId: "image-store-9b0b7",

  storageBucket: "image-store-9b0b7.appspot.com",

  messagingSenderId: "201660619686",

  appId: "1:201660619686:web:d8a3b00bbabe1ef8a3cd67",

  measurementId: "G-557NL4K0L1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getElementById = (id) => {
  return document.getElementById(id);
};

const nameBox = getElementById("nameBox");
const urlBox = getElementById("urlBox");
const btn_save = getElementById("btn_save");
const btn_clear = getElementById("btn_clear");
const warpContainer = getElementById("warpContainer");

btn_save.addEventListener("click", async (e) => {
  e.preventDefault();
  const id = `${Date.now()}`;
  await setDoc(doc(db, "postsUpdated", id), {
    id: id,
    name: nameBox.value,
    image: urlBox.value,
  })
    .then(() => {
      nameBox.value = "";
      urlBox.value = "";
      window.location.reload();
    })
    .catch((err) => console.log(err));
});

btn_clear.addEventListener("click", (e) => {
  e.preventDefault();
  nameBox.value = "";
  urlBox.value = "";
});

const getData = async () => {
  const docRef = collection(db, "postsUpdated");
  const queryRef = query(docRef, orderBy("id", "desc"));
  warpContainer.innerHTML = "";
  await getDocs(queryRef)
    .then((querySnap) => {
      querySnap.forEach((doc) => {
        
        const data = doc.data();
        console.log("data", data);
        buildData(data);
      });
    })
    .catch((err) => console.log(err));
};

const buildData = (data) => {
  warpContainer.innerHTML += `
    <div class="w-32 h-24 flex items-center justify-center rounded-md overflow-hidden shadow-lg">
    <img src="${data?.image}"  class="w-full h-full object-cover"></img> </div>`;
};

document.addEventListener("DOMContentLoaded", () => {
  getData();
});
