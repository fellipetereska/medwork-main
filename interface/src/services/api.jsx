import { createClient } from "@supabase/supabase-js";
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

export const supabase = createClient(
  //URL Supabase
  "https://nekvophigswzutbkzite.supabase.co",

  //Chave Pública
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5la3ZvcGhpZ3N3enV0Ymt6aXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA1ODMzODQsImV4cCI6MjAxNjE1OTM4NH0.SRvKTxAtIavc8uRY2hdkZEB-LInQ6PA5fpIMIOq_J7g"
);


export const connect = "https://medwork-api.vercel.app";
// export const connect = "http://localhost:8800";



//FireBase Authentication
const firebaseConfig = {
  apiKey: "AIzaSyB27iQVJ8BfNZUYDpNUzHOemCqlk8uuzo8",
  authDomain: "medwork-ldn.firebaseapp.com",
  projectId: "medwork-ldn",
  storageBucket: "medwork-ldn.appspot.com",
  messagingSenderId: "433605411368",
  appId: "1:433605411368:web:f7403222c24f64d3a02b1d",
  measurementId: "G-ZV4Y4XN505"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);