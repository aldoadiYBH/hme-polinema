export default function Banner({
    src = "/assets/asset-banner-1.jpg",
    text
}: {
    src?: string,
    text?: string
}) {

    return (
        <div className="w-full relative">
            <img src={src} alt="banner" className="h-52 md:h-80 w-full object-cover grayscale-25 brightness-50" />
            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-white text-2xl md:text-4xl font-bold text-center drop-shadow-md">
                    {text ?? ""}
                </h1>
            </div>
        </div>
    )
};
