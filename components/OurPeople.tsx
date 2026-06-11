'use client';

interface AboutProps {
    setActiveSection: (section: string) => void;
}

export default function OurPeople({ setActiveSection }: AboutProps) {
    return (
        <section id="about" className="px-10 py-5 bg-[#FAF8F5] border-b border-studio-stone relative overflow-hidden">

            {/* Section 4B: Loyal Reconstruction of "Our People" Section from Image 2 */}
            <div className="mt-18">
                <div className="inline-block relative mb-12">
                    <div className="bg-[#DBCFB3]/50 text-studio-dark font-serif text-xl md:text-2xl px-6 py-2 pb-3 tracking-widest uppercase relative z-10 font-light pr-12 shadow-sm border-l-4 border-studio-bronze">
                        Our People
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-full h-full bg-[#E5D7BE]/30 -z-0"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">

                    {/* Leader 1 - Yuditia */}
                    <div className="flex flex-col lg:flex-row items-start gap-6 bg-studio-paper p-6 border border-studio-stone/60 group">
                        {/* Portrait container with loyal monochrome photo styling */}
                        <div className="w-full lg:w-48 aspect-square relative overflow-hidden bg-zinc-200 shrink-0 border border-studio-stone flex items-center justify-center">
                            <img
                                src="/img/yuditia.jpg"
                                alt="Yuditia portrait"
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover grayscale object-top transition-all duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-transparent group-hover:bg-[#C5A880]/10 transition-colors duration-300" />
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-baseline">
                                <h4 className="font-serif text-2xl font-semibold text-studio-dark uppercase">Yuditia</h4>
                                <span className="text-[10px] uppercase tracking-widest text-[#8D7654] font-mono">Architect & Interior Design</span>
                            </div>
                            <div className="h-[1px] w-full bg-studio-stone"></div>
                            <p className="text-xs text-neutral-600 leading-relaxed text-justify">
                                Yuditia brings over a decade of experience spanning residential, commercial, and institutional projects. Passionate from strong conceptualization to precise planning and project oversight. Committed to creating spaces that are not only aesthetically refined but functionally responsive, incorporating local microclimates and absolute structural safety.
                            </p>
                        </div>
                    </div>

                    {/* Leader 2 - Rizky Chandra */}
                    <div className="flex flex-col lg:flex-row items-start gap-6 bg-studio-paper p-6 border border-studio-stone/60 group">
                        {/* Portrait container with loyal monochrome photo styling */}
                        <div className="w-full lg:w-48 aspect-square relative overflow-hidden bg-zinc-200 shrink-0 border border-studio-stone flex items-center justify-center">
                            <img
                                src="/img/rizky-cp.png"
                                alt="Rizky Chandra portrait"
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover grayscale object-top transition-all duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-transparent group-hover:bg-[#C5A880]/10 transition-colors duration-300" />
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-baseline">
                                <h4 className="font-serif text-2xl font-semibold text-studio-dark uppercase">Rizky Chandra</h4>
                                <span className="text-[10px] uppercase tracking-widest text-[#8D7654] font-mono">Architect & Interior Design</span>
                            </div>
                            <div className="h-[1px] w-full bg-studio-stone"></div>
                            <p className="text-xs text-neutral-600 leading-relaxed text-justify">
                                Rizky Chandra has contributed to the industry through his specialized work in architecture and interior consulting, specializing in project design coordination and interior team leadership. His career reflects an agile ability to move seamlessly between heavy creative design exploration and practical management, creating magnificent functional atmospheres.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
