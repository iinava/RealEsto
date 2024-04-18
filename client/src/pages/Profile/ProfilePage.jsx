import { useContext, useRef } from "react";
import Limebutton from "../../components/button/Button";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "../../pages/pages.scss";
import { AuthContext } from "../../context/AuthContext";
import userimage from "../../assets/images/userimage.jpg";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import ListSkelton from "../../components/Skeltons/ListSkelton";
import { Suspense } from "react";


function ProfilePage() {
  const navigate = useNavigate();

  const UpdateProfile = (e) => {
    e.preventDefault();
    navigate("/update");
  };

  const Listnew = (e) => {
    e.preventDefault();
    navigate("/addpost");
  };
  const savedListRef = useRef(null);
  const scrollToSavedList = () => {
    console.log("hi");
    if (savedListRef.current) {
      savedListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const data = useLoaderData();
  console.log(data, "vannu njan miyikalil");

  const { currentUser } = useContext(AuthContext);
  return (
    <div className="profilePage h-[85vh] mx-1  ">
      <div className="text-white details custom-scrollbar ">
        <div className="p-[3vw] wrapper  px-[3vw]">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">User Info</h1>
            <div className="h-5">
              <Limebutton item={"update"} onclick={UpdateProfile} />
            </div>
          </div>
          <div className="info ">
            <span>
              Avatar:
              <img
                src={currentUser.avatar ? currentUser.avatar : userimage}
                alt=""
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail:{" "}
              <b>{currentUser.email ? currentUser.email : " XXX@XX.COM"}</b>
            </span>
          </div>
          <div className="flex justify-between ">
            <h1 className="text-2xl font-bold">My List</h1>
            <div className="flex gap-2 h-20">
              {" "}
              
              <Limebutton item={"saved"} onclick={scrollToSavedList } />
              <Limebutton item={"List new"} onclick={Listnew} />
            </div>
          </div>
          <Suspense fallback={<ListSkelton />}>
            <Await
              resolve={data.PostResponse}
              errorElement={<p>Error loading posts !</p>}
            >
              {(PostResponse) => <List posts={PostResponse.data.userpost} />}
            </Await>
          </Suspense>

          <div  ref={savedListRef} id="saved">
            <h1 className="text-3xl font-bold underline underline-offset-8">
              Saved List
            </h1>
          </div>
          <Suspense fallback={<ListSkelton />}>
            <Await
              resolve={data.PostResponse}
              errorElement={<p>Error loading posts !</p>}
            >
              {(PostResponse) => <List posts={PostResponse.data.saved} />}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatContainer ">
        <div className="wrapper">
          <Suspense fallback={<ListSkelton />}>
            <Await
              resolve={data.chatresponse}
              errorElement={<p className="text-white">Error loading chats !</p>}
            >
              {(chatresponse) => <Chat chats={chatresponse.data} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
