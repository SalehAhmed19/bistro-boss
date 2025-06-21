import SectionTitle from "@/components/SectionTitle/SectionTitle";
import featured from "@/assets/home/featured.jpg";
import "./style.css";

export default function Featured() {
  return (
    <div className="featuredBg p-5 text-white bg-fixed">
      <div className="bg-slate-800/60 rounded-md">
        <SectionTitle title={"Featured Item"} subtitle={"Check it out"} />

        <div className="md:flex justify-center items-center gap-5 py-10 px-20">
          <div>
            <img src={featured} alt="" />
          </div>
          <div>
            <p>Aug 20, 2025</p>
            <p className="uppercase">Where can i get some</p>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum
              quidem tenetur nam aperiam dolore asperiores ad fugit! Et quia
              aliquid praesentium ipsam porro cupiditate accusantium! Tempore
              placeat sed odio inventore! Ipsa nihil sapiente, corporis nemo
              quam fugiat a dolorem. Repudiandae tempore, ipsam vitae fugit nemo
              nam facere distinctio facilis corporis.
            </p>

            <button className="btn btn-outline mt-5 uppercase border-0 border-b-4">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
