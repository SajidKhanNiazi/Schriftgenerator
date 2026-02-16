'use client';

import React from 'react';

const ContentSection: React.FC = () => {
    return (
        <section className="relative py-24 md:py-32 overflow-hidden bg-white dark:bg-slate-950 bg-mesh-emerald">
            <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-5xl relative z-10">

                {/* 1. Introduction Section */}
                <div className="mb-24 text-center max-w-4xl mx-auto">
                    <div className="space-y-8 text-slate-600 dark:text-slate-400 text-xl md:text-2xl leading-[1.6] font-light">
                        <p className="balance-text">
                            If you are tired and waste your time in finding the best font style which makes your online presence professional and <span className="text-slate-900 dark:text-white font-semibold">Cool</span>, so here is our <span className="text-emerald-500 font-bold underline decoration-emerald-500/20 underline-offset-8">Free Font generator</span> tool.
                        </p>
                    </div>
                </div>

                {/* 2. How to use Section */}
                <div className="mb-32 relative">
                    <div className="absolute inset-0 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />
                    <div className="glass-premium rounded-[2.5rem] p-10 md:p-16 border border-slate-200/50 dark:border-slate-800/50 relative overflow-hidden">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-10 text-center tracking-tight">
                            How to use our font generator?
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-16 text-center max-w-2xl mx-auto text-lg">
                            Our free font generator tool is simple to use even if you are not an expert. By following these short steps you can easily create a stylized and unique favorite font.
                        </p>

                        <div className="grid gap-12 md:grid-cols-3">
                            {[
                                { step: "01", title: "Enter Your text", desc: "Enter Your text in the top <strong>Input text section</strong> field." },
                                { step: "02", title: "Desired Section", desc: "Go to your desired field <strong>Section</strong> and you can see a list of different font styles." },
                                { step: "03", title: "Select & Copy", desc: "Simply select your favourite font text and click the <strong>copy button</strong>." }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center text-center group">
                                    <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-xl font-black text-emerald-500 shadow-xl shadow-emerald-500/10 mb-6 group-hover:scale-110 transition-transform duration-500">
                                        {item.step}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                        {item.title}
                                    </h3>
                                    <p
                                        className="text-slate-500 dark:text-slate-500 text-sm leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: item.desc }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. Why Best Section */}
                <div className="mb-32">
                    <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
                        <div className="flex-1">
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-none">
                                Why is our font generator <span className="text-emerald-500">the best?</span>
                            </h2>
                            <div className="w-20 h-1.5 bg-emerald-500 rounded-full mb-8" />
                            <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-relaxed font-light">
                                If you are tired of finding the best and special font styles which you can use for enhancing your search on social media like <strong>Instagram Bio and caption</strong>, <strong>Facebook post</strong>, <strong>Tiktok video</strong> and <strong>Discord profile</strong>. Our font converter has <strong>200+ different builtin fonts</strong> which are fast and free to use.
                            </p>
                        </div>
                        <div className="flex-shrink-0 w-full md:w-1/3 aspect-square glass-premium rounded-[3rem] flex items-center justify-center relative group">
                            <div className="absolute inset-4 border border-dashed border-emerald-500/20 rounded-[2.5rem] group-hover:rotate-6 transition-transform duration-700" />
                            <span className="text-5xl font-black text-emerald-500">200+</span>
                        </div>
                    </div>

                    <div className="grid gap-16">
                        {/* Advantages 1 */}
                        <div>
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-10 h-1 bg-emerald-500 rounded-full" />
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                    Advantages of our enhanced font generator
                                </h3>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[
                                    { title: "German specific", desc: "This tool is specially created for the German language which can easily transform memory." },
                                    { title: "100% Free", desc: "You can use unlimited text generation without sign in and No hidden cost." },
                                    { title: "Suitable for trends", desc: "Influencers can rely on these fonts for their content like Post and Bio captions." },
                                    { title: "Instant Result", desc: "In our tool you can preview fonts while typing your text and copy your favourite." },
                                    { title: "Mobile Friendly", desc: "All Font styles are fully optimized for mobile and do not break unicode." }
                                ].map((item, i) => (
                                    <div key={i} className="p-6 bg-slate-50/50 dark:bg-slate-900/30 rounded-3xl border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5">
                                        <span className="block font-bold text-slate-900 dark:text-white mb-2">{item.title}</span>
                                        <span className="text-sm text-slate-500 dark:text-slate-500 leading-relaxed">{item.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Advantages 2 */}
                        <div>
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-10 h-1 bg-teal-500 rounded-full" />
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                    Advantages of unique fonts and symbols
                                </h3>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[
                                    { title: "Take attention", desc: "Unique Styles make your message more attractive which help in growing your account." },
                                    { title: "Creative expression", desc: "Make a personal touch to your account and help your brand." },
                                    { title: "Increased interaction", desc: "unique, stylized, Cursive and cool font make your message more clear." }
                                ].map((item, i) => (
                                    <div key={i} className="p-6 bg-slate-50/50 dark:bg-slate-900/30 rounded-3xl border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/5">
                                        <span className="block font-bold text-slate-900 dark:text-white mb-2">{item.title}</span>
                                        <span className="text-sm text-slate-500 dark:text-slate-500 leading-relaxed">{item.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final CTA/Info */}
                <div className="text-center pt-16 mt-20 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-slate-400 dark:text-slate-600 text-lg font-light italic tracking-wide">
                        Now you are able to create a custom writing style font for your desired need.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default ContentSection;
