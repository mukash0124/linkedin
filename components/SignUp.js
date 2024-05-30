import Image from "next/image";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useEffect, useState, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { SOLANA_HOST } from "../utils/const";
import { getProgramInstance } from "../utils/get-program";
import { linkedin } from "../static/static";

const SignUp = ({ setRegistered, name, setName, url, setUrl }) => {
  const style = {
    wrapper: `flex flex-col p-4 justify-center items-center h-full w-full bg-[#252526] w-min h-min rounded-2xl`,
    title: `text-[#afb3b8] font-semibold text-lg`,
    form: `flex flex-col items-center`,
    fieldContainer: `my-4 `,
    inputTitle: `text-[#afb3b8] font-semibold mb-2 ml-3`,
    inputContainer: `flex items-center w-[20rem] bg-[#3a3b3d] rounded-full`,
    inputField: `bg-transparent flex-1 m-2 outline-none text-white px-2`,
    randomUrl: `h-full bg-[#2d2d2d] hover:bg-[#252626] text-white px-2 py-1 mx-1 hover:px-3 rounded-full cursor-pointer duration-[0.2s] ease-in-out`,
    submitButton: `bg-[#3a3b3d] text-white font-semibold px-4 py-2 hover:px-6 rounded-full cursor-pointer duration-[0.2s] ease-in-out`,
  };

  const anchor = require("@project-serum/anchor");
  const { BN, web3 } = anchor;
  const utf8 = anchor.utils.bytes.utf8;
  const { SystemProgram } = web3;
  const wallet = useWallet();
  const connection = new anchor.web3.Connection(SOLANA_HOST);
  const defaultAccounts = {
    tokenProgram: TOKEN_PROGRAM_ID,
    clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
    systemProgram: SystemProgram.programId,
  };

  const createUser = async (event) => {
    setRegistered(true);
    const program = getProgramInstance(connection, wallet);

    let [stateSigner] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode("state")],
      program.programId
    );
    const resp = await window.solana.connect();
    const walletAddress = resp.publicKey.toString();

    try {
      await program.rpc.createState(name, url, {
        accounts: {
          state: stateSigner,
          authority: wallet.publicKey,
          systemProgram: defaultAccounts.systemProgram,
          tokenProgram: defaultAccounts.tokenProgram,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const generateRandomProfileImageUrl = () =>
    setUrl(
      `https://avatars.dicebear.com/api/pixel-art-neutral/${Math.floor(
        Math.random() * 100
      )}.svg`
    );

  return (
    <div className={style.wrapper}>
      <div className={style.logoContainer}>
        <Image src={linkedin.icon} height={40} width={40} alt="facebook logo" />
      </div>
      <div className={style.title}>Please sign up</div>
      <form onSubmit={createUser} className={style.form}>
        <div className={style.fieldContainer}>
          <div className={style.inputTitle}>Name</div>
          <div className={style.inputContainer}>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className={style.inputField}
            />
          </div>
        </div>
        <div className={style.fieldContainer}>
          <div className={style.inputTitle}>Profile Image URL</div>
          <div className={style.inputContainer}>
            <input
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              required
              className={style.inputField}
            />
            <div
              className={style.randomUrl}
              onClick={() => generateRandomProfileImageUrl()}
            >
              Random
            </div>
          </div>
        </div>
        <button className={style.submitButton} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
