import "../../pages/pages.scss";
import Slider from "../../components/Slider/Slider";
import Map from "../../components/map/Map";
import size from "../../assets/images/size.png";
import bed from "../../assets/images/bed.png";
import bath from "../../assets/images/bath.png";
import school from "../../assets/images/school.png";
import pet from "../../assets/images/pet.png";
import bus from "../../assets/images/fee.png";
import fees from "../../assets/images/bus.png";
import chat from "../../assets/images/chat.png";
import save from "../../assets/images/save.png";
import pin from "../../assets/images/pin.png";
import utility from "../../assets/images/utility.png";
import restaurent from "../../assets/images/restaurant.png";
import Limebutton from "../../components/button/Button";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import userimage from "../../assets/images/userimage.jpg";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Chatmodal from "../../components/modal/Modal";

function SinglePage() {
  const Post = useLoaderData();
  // console.log(Post, "loaded  data");
  const recieverId = Post.userid
  console.log(recieverId, "userid");
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser, "current user");
  const [saved, setsaved] = useState(Post.isSaved);
  // console.log(Post.isSaved, "is saved");
  const handlesave = async () => {
    setsaved((prev) => !prev);
    if (!currentUser) {
      navigate("/login");
    }
    try {
      console.log(Post.id, "happening");
      await axios.post("/api/v1/post/save", { postId: Post.id }).then((res) => {
        console.log(res);
      });
      console.log("happened");
    } catch (error) {
      console.log(error);
      setsaved((prev) => !prev);
    }
  };

  return (
    <div className="singlePage mx-[3vw]  h-auto md:h-[85vh] lg:h-[85vh]">
      <div className="details cus-scrollbar text-white">
        <div className="wrapper ">
          <Slider images={Post.images} />
          <div className="info">
            <div className="top">
              <div className="post text-white">
                <h1>{Post.title}</h1>
                <div className="address">
                  <img src={pin} className="filter invert" alt="" />
                  <span>{Post.address}</span>
                </div>
                <div className="price text-black">$ {Post.price}</div>
              </div>

              <div className="user bg-lime-800  ">
                {Post.user.avatar ? (
                  <img src={Post.user.avatar} alt="" />
                ) : (
                  <img src={userimage} alt="" />
                )}

                <span className="text-lime-100">{Post.user.username}</span> 
              </div>
            </div>
            <div className="my-3 flex justify-between flex-wrap-reverse gap-10 ">
              <h1 className="text-3xl font-bold ">Description</h1>
              <div className="h-10 flex gap-3 justify-between ">
                <Limebutton onclick={handlesave} item={saved ? "place saved 📁" : "Save the place 📂"} />
                
                <Chatmodal recieverId={recieverId}/>
              </div>
            </div>

            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(Post.PostDetail.description),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features custom-scrollbar rounded-lg mx-1 text-black">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src={utility} alt="" />
              <div className="featureText">
                <span>Utilities</span>
                <p>{Post.PostDetail.utilities}</p>
              </div>
            </div>
            <div className="feature">
              <img src={pet} alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                <p>{Post.PostDetail.petpolicy}</p>
              </div>
            </div>
            <div className="feature">
              <img src={school} alt="" />
              <div className="featureText">
                <span>Type</span>
                <p>{Post.type}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src={size} alt="" />
              <span>{Post.PostDetail.size} meter sqr</span>
            </div>
            <div className="size">
              <img src={bed} alt="" />
              <span>{"bedroom"}</span>
              <span>{Post.bedroom}</span>
            </div>
            <div className="size">
              <img src={bath} alt="" />
              <span>{"bathroom"}</span>
              <span>{Post.bathroom}</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src={school} alt="" />
              <div className="">
                <span>School </span>
                <span className="">
                  {Post.PostDetail.school < 999
                    ? `${Post.PostDetail.school}m`
                    : `${(Post.PostDetail.school / 1000).toFixed(2)}km`}
                </span>
              </div>
            </div>
            <div className="feature">
              <img src={fees} alt="" />
              <div className="">
                <span>Bus </span>
                <span>
                  {Post.PostDetail.bus < 999
                    ? `${Post.PostDetail.bus}m`
                    : `${(Post.PostDetail.bus / 1000).toFixed(2)}km`}
                </span>
              </div>
            </div>
            <div className="feature">
              <img src={restaurent} alt="" />
              <div className="">
                <span>Hotel </span>
                <span>
                  {Post.PostDetail.restaurent < 999
                    ? `${Post.PostDetail.restaurent}m`
                    : `${(Post.PostDetail.restaurent / 1000).toFixed(2)}km`}
                </span>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[Post]} />
          </div>
      
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
