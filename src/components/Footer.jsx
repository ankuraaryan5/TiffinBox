export default function Footer () {
    return (
        <footer className="bg-yellow-500 text-white py-6">
        <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm">© {new Date().getFullYear()} TiffinBox. All rights reserved.</p>
            <p className="text-xs mt-2">Made with ❤️ by Ankur</p>
        </div>
        </footer>
    );
}