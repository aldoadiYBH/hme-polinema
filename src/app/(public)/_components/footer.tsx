export default function Footer() {
    return (
        <footer className="bg-gray-950 border-t border-gray-800 py-12">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-6 md:mb-0">
                    <h4 className="text-lg font-semibold mb-2">Kontak</h4>
                    <p className="text-sm text-gray-400">
                        Gedung AS2.08, Jl. Soekarno – Hatta No. 09<br />
                        Lowokwaru, Kota Malang
                    </p>
                </div>
                <div className="space-y-2">
                    <h4 className="text-lg font-semibold mb-2">Media Sosial</h4>
                    <div className="flex space-x-4">
                        <a href="https://www.instagram.com/hmepolinema" className="text-gray-400 hover:text-foreground transition">Instagram</a>
                        <a href="https://www.tiktok.com/@hme.polinema" className="text-gray-400 hover:text-foreground transition">TikTok</a>
                        <a href="https://www.youtube.com/@hmepolinema6144" className="text-gray-400 hover:text-foreground transition">YouTube</a>
                    </div>
                </div>
            </div>
            <div className="mt-8 text-center text-gray-600 text-sm">
                © 2025 HME POLINEMA. All rights reserved.
            </div>
        </footer>
    );
};