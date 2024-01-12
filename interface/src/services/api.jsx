import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    //URL Supabase
    "https://nekvophigswzutbkzite.supabase.co",

    //Chave Pública
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5la3ZvcGhpZ3N3enV0Ymt6aXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA1ODMzODQsImV4cCI6MjAxNjE1OTM4NH0.SRvKTxAtIavc8uRY2hdkZEB-LInQ6PA5fpIMIOq_J7g"
);

export const connect = "https://medwork-api.vercel.app";