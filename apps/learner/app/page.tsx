import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "KalviOS | Login",
  description:
    "Login to your account to access the dashboard or your learner content.",
};

export default function Home() {
  return (
    <>
    <span className="absolute top-4 z-50 left-[50%] -translate-x-[50%] border rounded-md p-1 font-semibold">
      Learner App
    </span>
      <div
        className="flex flex-col h-screen bg-white/20"
        style={{
          backgroundSize: "2.5rem 2.5rem",
          backgroundImage:
            "linear-gradient(90deg, #c0c0c099 0.063rem, #0000 0), linear-gradient(180deg, #c0c0c099 0.063rem, #0000 0)",
        }}
      >
        <div
          className="flex-1 overflow-y-auto flex flex-col justify-start"
          style={{ background: "radial-gradient(circle,#fff9 0,#fff 99%)" }}
        >
          <div className="w-full px-4 h-16 bg-white shadow shrink-0 z-30 sticky top-0 left-0 right-0">
            {/* header container */}
            <nav className="container mx-auto flex items-center justify-between h-full">
              {/* left side */}
              <div className="flex items-center gap-x-12">
                {/* LOGO */}
                <div className="h-full w-max shrink-0">
                  <img
                    src="https://assets-global.website-files.com/65af473cb793c735a7cd0e9e/65dc40ffa6da010165341d04_Group%201454.svg"
                    loading="lazy"
                    width="96"
                    alt=""
                    id="homepage"
                    className="scale-75"
                  />
                </div>
              </div>
            </nav>
          </div>

          <main className="relative isolate pt-16 h-full">
            <div className="py-24 lg:pb-40">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                  <div className="flex items-center justify-center">
                    <a
                      href="https://github.com/kalvilabs/kalvi"
                      target="_blank"
                      className="text-white rounded-full py-1 px-4 bg-[#006FEE] mb-4 flex gap-2 items-center"
                    >
                      <span></span>Star Us On GitHub
                      <span className="p-1 scale-75 bg-white rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                        >
                          <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
                        </svg>
                      </span>
                    </a>
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Open Source Infrastructure for{" "}
                    <span className="text-primary">Digital Learning</span>
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-foreground/80">
                    Free and open-source tools to build, manage, and deliver
                    engaging online learning experiences, built by and for a
                    passionate learning community.
                  </p>
                  <div className="mt-10 flex items-center justify-center gap-x-6">
                    <span className="bg-black rounded-md text-white font-semibold relative inline-flex items-center justify-center gap-x-1.5 whitespace-nowrap capitalize box-border px-3.5 py-2 text-sm">
                      Coming Soon
                    </span>
                    <a
                      href="https://www.kalvi.co/"
                      target="_blank"
                      className="border font-semibold relative inline-flex items-center justify-center gap-x-1.5 whitespace-nowrap capitalize box-border px-3.5 py-2 text-sm rounded-md hover:text-opacity-80"
                    >
                      Visit Website <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </main>
          
        </div>
      </div>
    </>
  );
}
