import { Parallax } from "react-parallax";

export default function SectionCover({ img, title }) {
  return (
    <Parallax
      blur={{ min: -15, max: 15 }}
      bgImage={img}
      bgStyle={{ backgroundSize: "cover" }}
      bgImageAlt="the dog"
      strength={-200}
    >
      <div className="hero h-[800px] my-20">
        {/* <div className="hero-overlay"></div> */}
        <div className="hero-content text-neutral-content text-center py-24 px-36 rounded-md">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
        </div>
      </div>
      {/* <div style={{ height: "200px" }} /> */}
    </Parallax>
  );
}
