export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center md:w-3/12 mx-auto">
      <p className="text-orange-400 italic mb-2">--- {subtitle} ---</p>
      <h3 className="uppercase text-3xl border-y-4 border-gray-200 py-4">
        {title}
      </h3>
    </div>
  );
}
