const AssemblyHero = () => (
  <section className="w-full py-12 md:py-16">
    {/* YouTube Video */}
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/2GzS412gQU0"
          title="J&K Cabinetry Assembly Instructions"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>

    {/* Content Below Video */}
    <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
      <div className="mt-12 max-w-4xl mx-auto p-8 md:p-12">
        <p className="text-lg md:text-xl leading-relaxed text-gray-800">
          We have{" "}
          <strong className="text-primary">
            over 40+ different newly shot assembly videos
          </strong>{" "}
          that cover our entire collection of cabinetry.
        </p>
        <p className="mt-4 text-lg md:text-xl text-gray-800">
          Many of our cabinets have a variety of sizes but a lot of them follow
          the <strong>same instructions</strong>.
        </p>
        <p className="mt-6 italic text-lg text-gray-700">
          For example, a 15&ldquo; Base Cabinet follows the same step-by-step
          instructions as all sizes between 9&ldquo;–21&ldquo;
        </p>
        <p className="mt-8 text-lg text-gray-800">
          Below you will find all of our assembly videos separated into
          different categories.
        </p>
        <p className="mt-4 text-lg text-gray-800">
          If you cannot find the video you are looking for — contact your local
          J&K Cabinetry location and they will send it directly.
        </p>
      </div>
    </div>
  </section>
);

export default AssemblyHero;
