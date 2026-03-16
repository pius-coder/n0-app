"use client";

import Script from "next/script";

export function LandingBackground() {
    return (
        <>
            <div
                className="aura-background-component fixed top-0 w-full h-screen opacity-50 -z-10 mix-blend-normal"
                data-alpha-mask="50"
                style={{
                    maskImage: "linear-gradient(to bottom, transparent, black 0%, black 50%, transparent)",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent, black 0%, black 50%, transparent)"
                }}
            >
                <div className="aura-background-component top-0 w-full -z-10 absolute h-full">
                    <div
                        data-us-project="ty3N7ZPaIU7KlWixQFIc"
                        className="absolute w-full h-full left-0 top-0 -z-10"
                    />
                </div>
            </div>
            <Script
                id="unicorn-studio"
                strategy="lazyOnload"
                dangerouslySetInnerHTML={{
                    __html: `
            !function(){if(!window.UnicornStudio){window.UnicornStudio={isInitialized:!1};var i=document.createElement("script");i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js",i.onload=function(){window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)},(document.head || document.body).appendChild(i)}}();
          `
                }}
            />
            <Script
                id="iconify-icon"
                src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"
                strategy="lazyOnload"
            />
            <Script
                id="iconify"
                src="https://code.iconify.design/3/3.1.1/iconify.min.js"
                strategy="lazyOnload"
            />
        </>
    );
}
