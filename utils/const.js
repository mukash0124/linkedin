import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import linkedin_clone from "./linkedin_clone.json";

export const CLUSTER = "devnet";

export const SOLANA_HOST = "https://api.devnet.solana.com";

export const STABLE_POOL_PROGRAM_ID = new PublicKey(
  "4KJyzRqkeDoepnXTiNqnxV8TESYat1kT3xCCPrAgD8Hr"
);

export const STABLE_POOL_IDL = linkedin_clone;
