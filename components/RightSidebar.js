import { useEffect, useState, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { SOLANA_HOST } from "../utils/const";
import { getProgramInstance } from "../utils/get-program";
import Image from "next/image";
import Contact from "./Contact";

const anchor = require("@project-serum/anchor");

const RightSidebar = ({ getUsers, users }) => {
  const style = {
    wrapper: `w-[24rem] text-lg text-white`,
    title: `text-[#afb3b8] font-semibold`,
    adsContainer: ``,
    ad: `flex items-center my-3 mr-[1rem] p-2 rounded-lg`,
    adImageContainer: `h-full w-[50%] flex items-center mr-[0.5rem]`,
    adImage: `object-cover`,
    adLink: `text-[#b0b3b8] text-sm`,
    divider: `w-[95%] border-b border-[0.5px] border-[#3e4042] my-2`,
    contact: `flex items-center my-2`,
    contactImage: `rounded-full object-cover`,
    contactName: `ml-4 text-[1rem]`,
  };

  const wallet = useWallet();
  const connection = new anchor.web3.Connection(SOLANA_HOST);
  const program = getProgramInstance(connection, wallet);

  const [allUsers, setAllUsers] = useState([]);

  const fetchAllUsers = useCallback(async () => {
    try {
      const users = await program.account.stateAccount.all();
      setAllUsers(users);
    } catch (error) {
      console.log(error);
    }
  }, [program]);

  useEffect(() => {
    const interval = setInterval(async () => {
      await fetchAllUsers();
    }, 10000);
    fetchAllUsers();
    return () => clearInterval(interval);
  }, [fetchAllUsers]);

  console.log(allUsers);

  return (
    <div className={style.wrapper}>
      <div className={style.title}>Active Users</div>
      <div className={style.adsContainer}>
        <div className={style.ad}>
          <div className={style.adImageContainer}>
            <Image
              src=""
              height={100}
              width={100}
              className={style.adImage}
              alt="..."
            />
            ˚
          </div>
          <div>
            <div>Lorem ipsum</div>
            <div className={style.adLink}>Dolor sit amet.</div>
          </div>
        </div>
        <div className={style.ad}>
          <div className={style.adImageContainer}>
            <Image
              src=""
              height={100}
              width={100}
              className={style.adImage}
              alt="..."
            />
          </div>
          <div>
            <div>Lorem ipsum</div>
            <div className={style.adLink}>Dolor sit amet.</div>
          </div>
        </div>
        <div className={style.divider} />
        <div className={style.title}>Contacts</div>
        <div className={style.contactsContainer}>
          {users.map((user) => {
            return <Contact key={user.walletAddress} user={user} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
