import { Outlet, NavLink } from "react-router-dom"
import RollingText from "../component/RollingText"

export const MainLayout = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-white font-semibold"
      : "text-white/80 hover:text-blue-50 transition-colors"

  return (
    <div className="min-h-screen bg-black text-white">
        <div className="flex flex-row flex-between items-center justify-between px-6 border-b border-white/10 bg-black/80 backdrop-blur">
            <RollingText
                      text ="Project Sekai"
                      inView={true}
                      className="text-lg font-bold text-center"></RollingText>
            <nav className="relative top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur px-6 py-4">
                <div className="mx-auto flex max-w-6xl items-center gap-6">
                <NavLink to="/" end className={linkClass}>
                    Home
                </NavLink>

                <NavLink to="/music" className={linkClass}>
                    Music
                </NavLink>

                <NavLink to="/units" className={linkClass}>
                    Units
                </NavLink>

                <NavLink to="/characters" className={linkClass}>
                    Characters
                </NavLink>
                </div>
            </nav>
        </div>
      
      <main className="mx-auto my-auto">
        <Outlet />
      </main>
    </div>
  )
}