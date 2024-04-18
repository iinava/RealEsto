import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import Limebutton from "../button/Button";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Chatmodal(reciverid) {
  const navigate =useNavigate()
  const { currentUser } = useContext(AuthContext);
  
  // console.log(reciverid);
  let [isOpen, setIsOpen] = useState(false);
  const [chatid, setchatid] = useState(null);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    if (!currentUser) {
      navigate("/login");
    }
    setIsOpen(true);
  }

  const [input, setinput] = useState();
  const handleinput = (e) => {
    setinput({ [e.target.name]: e.target.value });
    console.log(input);
  };

  const handleChat = async (reciverid) => {
   

    console.log(reciverid);
    try {
      setIsLoading(true);
      const addchatResponse = await axios.post("/api/v1/chats/addchat", reciverid);
      const chatId = addchatResponse.data.id;
      setchatid(chatId);
      console.log(chatId);
  
      if (chatId) {
        const messagingResponse = await axios.post(`/api/v1/messages/addmessages/${chatId}`, input);
      
        console.log(messagingResponse.data);
        setIsLoading(false);
        closeModal()
      } else {
        console.log("No chat ID received");
        setIsLoading(false);
        closeModal()
      }
    } catch (error) {
      console.error("Error handling chat:", error);
      setIsLoading(false);
      closeModal()
    }
  };
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className="relative px-4 py-2 overflow-hidden font-medium duration-300 border border-b-4 rounded-md outline-none bg-lime-950 text-lime-400 border-lime-400 hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 group"
        >
          Message Agent 👋
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-lime-800 p-6 text-left align-middle shadow-xl transition-all">
                  <input
                    className="w-full h-9 rounded bg-lime-500 outline-none  placeholder:text-black"
                    placeholder="Enter message"
                    type="text"
                    name="text"
                    onChange={handleinput}
                  />
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 hover:bg-lime-300 px-4 py-2 text-sm font-medium text-blue-900  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => handleChat(reciverid)}
                      disabled={isLoading}
                    >
                         {isLoading ? "Sending..." : "Send message"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
