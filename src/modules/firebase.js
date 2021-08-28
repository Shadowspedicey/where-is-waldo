import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig =
{
	apiKey: "AIzaSyBb-62JpSPSVDuRmu9xjXSRpWbLO8BNVGo",
	authDomain: "where-is-waldo-b10c8.firebaseapp.com",
	projectId: "where-is-waldo-b10c8",
	storageBucket: "where-is-waldo-b10c8.appspot.com",
	messagingSenderId: "286537376907",
	appId: "1:286537376907:web:1d2470d2207fee098fa08e",
	measurementId: "G-QHT9H3XT9T"
};
export const app = initializeApp(firebaseConfig);

// Test mode enabled
export const db = getFirestore();
